document.addEventListener('DOMContentLoaded', function() {
    const serverStatusElements = document.querySelectorAll('.server-status');

    serverStatusElements.forEach(element => {
        const server = element.getAttribute('data-server');
        const port = element.getAttribute('data-port') || 25565;
        
        element.classList.add('inloading');
        element.innerHTML = `
            <div class="server-status-content">
                <div class="server-status-details">
                    <div class="server-status-title">
                    <span class="status-indicator inloading"></span>
                    -
                    </div>
                </div>
            </div>
        `;
        
        fetchServerStatus(server, port)
            .then(data => {
                if (data.online) {
                    element.classList.remove('inloading');
                    element.classList.add('online');
                    element.innerHTML = `
                        <div class="server-status-content">
                            <div class="server-status-details">
                                <div class="server-status-title">
                                    <span class="status-indicator online"></span>
                                    ${server} - 玩家: ${data.players.online}/${data.players.max}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    element.classList.remove('inloading');
                    element.classList.add('offline');
                    element.innerHTML = `
                        <div class="server-status-content">
                            <div class="server-status-details">
                                <div class="server-status-title">
                                    <span class="status-indicator offline"></span>
                                    ${server} - 无法获取目标服务器信息
                                </div>
                            </div>
                        </div>
                    `;
                }
            })
            .catch(error => {
                element.classList.remove('inloading');
                element.classList.add('offline');
                element.innerHTML = `
                    <div class="server-status-content">
                        <div class="server-status-details">
                            <div class="server-status-title">
                                <span class="status-indicator offline"></span>
                                获取API数据时出现错误
                            </div>
                        </div>
                    </div>
                `;
            });
    });
});

function fetchServerStatus(host, port) {
    return fetch(`https://api.eqad.fun/mc-status/ping-mc?host=${host}&port=${port}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            return data;
        })
        .catch(error => {
            return {
                online: false,
                host: host,
                port: port,
                error: error.message
            };
        });
}