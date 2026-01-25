const API_URL = `https://api.eqad.fun/mcsm/api/services`;
const AVAILABILITY_API_URL = 'https://api.eqad.fun/monitor';

const MAX_HISTORY_POINTS = 96;
const DISPLAY_DELAY = 1500;
const NODE_LIST = [
    "EQAD-001",
    "EQAD-002",
    "EQAD-003"
];

const NODE_CPU_INFO = {
    "EQAD-001": "AMD Ryzen 9 9900X",
    "EQAD-002": "Intel Core i9-13900K",
    "EQAD-003": "AMD Ryzen 7 5800X"
};

const nodeDataContainer = document.getElementById('nodeData');
const availabilityContainer = document.getElementById('availabilityData');
let refreshInterval;

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
            
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
            
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatTimestamp(timestamp) {
    if (!timestamp) return '-';
    
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatLoadAvg(loadavg) {
    if (!loadavg || !Array.isArray(loadavg) || loadavg.length < 3 || 
        (loadavg[0] === 0 && loadavg[1] === 0 && loadavg[2] === 0)) {
        return '-';
    }
    return `${loadavg[0].toFixed(2)}, ${loadavg[1].toFixed(2)}, ${loadavg[2].toFixed(2)}`;
}

function formatDuration(minutes) {
    if (minutes < 60) return `${minutes} 分钟`;
    const hours = minutes / 60;
    if (hours < 24) return `${hours % 1 === 0 ? hours : hours.toFixed(1)} 小时`;
    const days = minutes / 1440;
    return `${days % 1 === 0 ? days : days.toFixed(1)} 天`;
}

function createLoadingNodeCard(nodeName) {
    return `
        <div class="node-card">
            <div class="node-header">
                <div class="node-title">${nodeName}</div>
            </div>
            
            <div class="info-sections">
                <div class="info-section">
                    <div class="info-title">系统信息</div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">系统类型</div>
                            <div class="info-value loading-text"></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">CPU</div>
                            <div class="info-value loading-text"></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">实例总数</div>
                            <div class="info-value loading-text"></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">服务器时间</div>
                            <div class="info-value loading-text"></div>
                        </div>
                    </div>
                </div>
                
                <div class="info-section">
                    <div class="info-title">系统资源</div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">CPU 使用率</div>
                            <div class="info-value loading-text"></div>
                            <div class="progress-container">
                                <div class="progress-bar loading-bar"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">内存使用率</div>
                            <div class="info-value loading-text"></div>
                            <div class="progress-container">
                                <div class="progress-bar loading-bar"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">系统负载</div>
                            <div class="info-value loading-text"></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">总内存</div>
                            <div class="info-value loading-text"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="node-footer">
                <span class="node-status-indicator status-inloading"></span>
                <span class="node-status-text">正在获取</span>
            </div>
        </div>
    `;
}

function createNodeCard(node) {
    const cpuUsagePercent = (node.system.cpuUsage * 100).toFixed(1);
    const memUsagePercent = (node.system.memUsage * 100).toFixed(1);
    
    const cpuBarColor = cpuUsagePercent > 80 ? "background-color: #e74c3c;" : "";
    const memBarColor = memUsagePercent > 80 ? "background-color: #e74c3c;" : "";

    const cpuInfo = NODE_CPU_INFO[node.nickname] || "-";
    const lastUpdateTime = formatTimestamp(node.timestamp);
    const loadAvgInfo = formatLoadAvg(node.system.loadavg);

    return `
        <div class="node-card">
            <div class="node-header">
                <div class="node-title">${node.nickname}</div>
            </div>
            
            <div class="info-sections">
                <div class="info-section">
                    <div class="info-title">系统信息</div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">系统类型</div>
                            <div class="info-value">${node.system.type}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">CPU</div>
                            <div class="info-value">${cpuInfo}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">实例总数</div>
                            <div class="info-value">${node.instance.running}/${node.instance.total}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">服务器时间</div>
                            <div class="info-value">${lastUpdateTime}</div>
                        </div>
                    </div>
                </div>
                
                <div class="info-section">
                    <div class="info-title">系统资源</div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">CPU 使用率</div>
                            <div class="info-value">${cpuUsagePercent}%</div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: ${cpuUsagePercent}%; ${cpuBarColor}"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">内存使用率</div>
                            <div class="info-value">${memUsagePercent}%</div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: ${memUsagePercent}%; ${memBarColor}"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">系统负载</div>
                            <div class="info-value">${loadAvgInfo}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">总内存</div>
                            <div class="info-value">${formatBytes(node.system.totalmem)}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="node-footer">
                <span class="node-status-indicator status-online"></span>
                <span class="node-status-text">在线</span>
            </div>
        </div>
    `;
}

function createLoadingAvailabilityCard(nodeName) {
    return `
        <div class="uptime-card">
            <div class="uptime-header">
                <div class="uptime-title">${nodeName}</div>
                <div class="uptime-pct loading-text" style="width: 50px;"></div>
            </div>
            <div class="uptime-bar">
                <div class="loading-bar" style="height: 100%; border-radius: 3px;"></div>
            </div>
            <div class="uptime-footer">
                <span>${formatDuration(MAX_HISTORY_POINTS * 15)}前</span>
                <span>最近</span>
                <span>现在</span>
            </div>
        </div>
    `;
}

function createOfflineNodeCard(nodeName) {
    return `
        <div class="node-card">
            <div class="node-header">
                <div class="node-title">${nodeName}</div>
            </div>
            
            <div class="info-sections">
                <div class="info-section">
                    <div class="info-title">系统信息</div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">系统类型</div>
                            <div class="info-value">-</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">CPU</div>
                            <div class="info-value">-</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">实例总数</div>
                            <div class="info-value">-/-</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">服务器时间</div>
                            <div class="info-value">-</div>
                        </div>
                    </div>
                </div>
                
                <div class="info-section">
                    <div class="info-title">系统资源</div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">CPU 使用率</div>
                            <div class="info-value">-</div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 0%"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">内存使用率</div>
                            <div class="info-value">-</div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: 0%"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">系统负载</div>
                            <div class="info-value">-</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">总内存</div>
                            <div class="info-value">-</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="node-footer">
                <span class="node-status-indicator status-offline"></span>
                <span class="node-status-text">离线</span>
            </div>
        </div>
    `;
}

async function fetchNodeData() {
    try {
        nodeDataContainer.innerHTML = '';
        NODE_LIST.forEach(nodeName => {
            nodeDataContainer.innerHTML += createLoadingNodeCard(nodeName);
        });

        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.status !== 200) {
            setTimeout(() => {
                nodeDataContainer.innerHTML = '';
                NODE_LIST.forEach(nodeName => {
                    nodeDataContainer.innerHTML += createOfflineNodeCard(nodeName);
                });
            }, DISPLAY_DELAY);
            return;
        }
        
        const nodeMap = {};
        if (data.data && data.data.length > 0) {
            data.data.forEach(node => {
                nodeMap[node.nickname] = node;
            });
        }
        
        setTimeout(() => {
            nodeDataContainer.innerHTML = '';
            NODE_LIST.forEach(nodeName => {
                if (nodeMap[nodeName]) {
                    nodeDataContainer.innerHTML += createNodeCard(nodeMap[nodeName]);
                } else {
                    nodeDataContainer.innerHTML += createOfflineNodeCard(nodeName);
                }
            });
        }, DISPLAY_DELAY);
        
    } catch (error) {
        setTimeout(() => {
            nodeDataContainer.innerHTML = '';
            NODE_LIST.forEach(nodeName => {
                nodeDataContainer.innerHTML += createOfflineNodeCard(nodeName);
            });
        }, DISPLAY_DELAY);
    }
}

function initPagination() {
    const pageBtns = document.querySelectorAll('.page-btn');
    const pages = document.querySelectorAll('.status-page');

    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            const pageNum = btn.getAttribute('data-page');
            const targetPage = document.getElementById(`status-page-${pageNum}`);
            const currentPage = document.querySelector('.status-page.active');
            
            pageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (currentPage) {
                currentPage.classList.add('fadeOut');
                
                setTimeout(() => {
                    currentPage.classList.remove('active', 'fadeOut');
                    targetPage.classList.add('active');
                    
                    if (pageNum === '1') {
                        fetchNodeData();
                    } else if (pageNum === '2') {
                        renderAvailability();
                    }
                    resetRefreshTimer();
                }, 300);
            } else {
                targetPage.classList.add('active');
                if (pageNum === '1') {
                    fetchNodeData();
                } else if (pageNum === '2') {
                    renderAvailability();
                }
                resetRefreshTimer();
            }
        });
    });
}

async function renderAvailability() {
    if (!availabilityContainer) return;

    try {
        availabilityContainer.innerHTML = '';
        NODE_LIST.forEach(nodeName => {
            availabilityContainer.innerHTML += createLoadingAvailabilityCard(nodeName);
        });

        const response = await fetch(AVAILABILITY_API_URL);
        const allHistory = await response.json();

        let html = '';

        setTimeout(() => {
            for (const nodeName in allHistory) {
            const history = allHistory[nodeName];
            if (!history || history.length === 0) continue;

            const onlineCount = history.filter(h => h.status === 'online').length;
            const uptimePct = ((onlineCount / history.length) * 100).toFixed(1);

            let pctColor = '#2ecc71';
            const pctValue = parseFloat(uptimePct);
            if (pctValue <= 20) {
                pctColor = '#e74c3c';
            } else if (pctValue < 90) {
                pctColor = '#dfb50d';
            }

            let segmentsHtml = '';
            const emptyPoints = MAX_HISTORY_POINTS - history.length;
            for (let i = 0; i < emptyPoints; i++) {
                segmentsHtml += '<div class="uptime-segment none"><span class="tooltip-text">无数据</span></div>';
            }

            history.forEach(point => {
                const timeStr = formatTimestamp(point.time);
                const statusText = point.status === 'online' ? '正常' : '离线';
                const statusClass = point.status === 'online' ? '' : 'down';
                segmentsHtml += `
                    <div class="uptime-segment ${statusClass}">
                        <span class="tooltip-text">${timeStr}<br>状态: ${statusText}</span>
                    </div>
                `;
            });

            html += `
                <div class="uptime-card">
                    <div class="uptime-header">
                        <div class="uptime-title">${nodeName}</div>
                        <div class="uptime-pct" style="color: ${pctColor}">${uptimePct}%</div>
                    </div>
                    <div class="uptime-bar">
                        ${segmentsHtml}
                    </div>
                    <div class="uptime-footer">
                        <span>${formatDuration(MAX_HISTORY_POINTS * 15)}前</span>
                        <span>最近</span>
                        <span>现在</span>
                    </div>
                </div>
            `;
            }
            availabilityContainer.innerHTML = html || '<div class="loading">暂无数据...</div>';
        }, DISPLAY_DELAY);

    } catch (error) {
        setTimeout(() => {
            availabilityContainer.innerHTML = '<div class="loading">加载失败</div>';
        }, DISPLAY_DELAY);
    }
}

function resetRefreshTimer() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }

    refreshInterval = setInterval(() => {
        if (document.getElementById('status-page-1').classList.contains('active')) {
            fetchNodeData();
        } else if (document.getElementById('status-page-2').classList.contains('active')) {
            renderAvailability();
        }
    }, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchNodeData();
    initPagination();
    renderAvailability();
    resetRefreshTimer();
});
