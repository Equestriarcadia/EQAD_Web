const API_URL = `https://api.eqad.fun/mcsm/api/services/`;

const DISPLAY_DELAY = 1500;
const NODE_LIST = [
    "EQAD-001",
    "EQAD-002",
    "EQAD-003"
];

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
                            <div class="info-label">平台</div>
                            <div class="info-value loading-text"></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">实例总数</div>
                            <div class="info-value loading-text"></div>
                        </div>
                        <div>
                            <div class="info-label">节点版本</div>
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
                            <div class="info-label">总内存</div>
                            <div class="info-value loading-text"></div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">可用内存</div>
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
                            <div class="info-value">${node.system.type} ${node.system.release}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">平台</div>
                            <div class="info-value">${node.system.platform}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">实例总数</div>
                            <div class="info-value">${node.instance.running}/${node.instance.total}</div>
                        </div>
                        <div>
                            <div class="info-label">节点版本</div>
                            <div class="info-value">${node.version}</div>
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
                            <div class="info-label">总内存</div>
                            <div class="info-value">${formatBytes(node.system.totalmem)}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">可用内存</div>
                            <div class="info-value">${formatBytes(node.system.freemem)}</div>
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
                            <div class="info-label">平台</div>
                            <div class="info-value">-</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">实例总数</div>
                            <div class="info-value">-/-</div>
                        </div>
                        <div>
                            <div class="info-label">节点版本</div>
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
                            <div class="info-label">总内存</div>
                            <div class="info-value">-</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">可用内存</div>
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