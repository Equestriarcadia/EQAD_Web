const API_URL = `https://api.eqad.fun/mcsm/api/services/`;

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
const refreshBtn = document.getElementById('refreshBtn');

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

document.addEventListener('DOMContentLoaded', fetchNodeData);

refreshBtn.addEventListener('click', fetchNodeData);
