        const API_URL = `https://mcsm-api.eqad.fun/api/services`;

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

        function createNodeCard(node, index) {
            const cpuUsagePercent = (node.system.cpuUsage * 100).toFixed(1);
            const memUsagePercent = (node.system.memUsage * 100).toFixed(1);
            // <div class="node-title">节点 ${index + 1}: ${node.system.hostname}</div>

            return `
                <div class="node-card">
                    <div class="node-header">
                        <div class="node-title">EQAD - 00${index + 1}</div>
                    </div>
                    
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
                                <div class="info-label">节点版本</div>
                                <div class="info-value">${node.version}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">实例总数</div>
                                <div class="info-value">${node.instance.running}/${node.instance.total}</div>
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
                                    <div class="progress-bar" style="width: ${cpuUsagePercent}%"></div>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">内存使用率</div>
                                <div class="info-value">${memUsagePercent}%</div>
                                <div class="progress-container">
                                    <div class="progress-bar" style="width: ${memUsagePercent}%"></div>
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
            `;
        }

        async function fetchNodeData() {
            try {
                nodeDataContainer.innerHTML = '<div class="loader"><div class="image-loader"><img src="static/image/loading.svg"></div><div class="isloading-line"></div><p>正在获取节点数据……<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p></div>';
                
                const response = await fetch(API_URL);
                const data = await response.json();
                
                if (data.status !== 200) {
                    let errorMessage = '获取数据失败: ';
                    switch(data.status) {
                        case 400: errorMessage += '请求参数不正确'; break;
                        case 403: errorMessage += '权限不足'; break;
                        case 500: errorMessage += '服务器错误'; break;
                        default: errorMessage += `其他错误 (Code: ${data.status})`;
                    }
                    nodeDataContainer.innerHTML = `<div class="loader"><div class="image-loader"><img src="static/image/loading.svg"></div><div class="isloading-line"></div><p style="color:rgb(255, 74, 74)">${errorMessage}<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p></div>`;
                    return;
                }
                
                if (!data.data || data.data.length === 0) {
                    nodeDataContainer.innerHTML = '<div class="loader"><div class="image-loader"><img src="static/image/loading.svg"></div><div class="isloading-line"></div><p style="color:rgb(255, 74, 74)">没有可用的节点数据<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p></div>';
                    return;
                }
                
                nodeDataContainer.innerHTML = '';
                data.data.forEach((node, index) => {
                    nodeDataContainer.innerHTML += createNodeCard(node, index);
                });
                
            } catch (error) {
                console.error('获取节点数据时出错:', error);
                nodeDataContainer.innerHTML = `<div class="loader"><div class="image-loader"><img src="static/image/loading.svg"></div><div class="isloading-line"></div><p style="color:rgb(255, 74, 74)">获取节点数据时出错: ${error.message}<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p></div>`;
            }
        }

        document.addEventListener('DOMContentLoaded', fetchNodeData);
        
        refreshBtn.addEventListener('click', fetchNodeData);