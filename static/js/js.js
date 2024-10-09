/*
 * Author : Peter1303
 * Date: 2020/8/10
 */

// 获取
$.ajax({
    type: 'POST',
    url: 'https://pdev.top/api/mcping.php',
    timeout: 20000,
    data: {
        ip: server
    },
    dataType: 'json',
    beforeSend: function beforeSend() {
    },
    success: function success(result) {
        console.log(result);
        var msg = result.msg;
        if (result.code === 200) {
            var name = msg.name;
            var max = msg.max;
            var online = msg.online;
            $('#server-status').html((showServerName ? ('<p>' + name + '</p>') : '') + '<p>人数：' + online + ' / ' + max + '</p>');
        }
    },
    error: function error(e, t) {
    },
    complete: function complete() {
    }
});

var clipboard = new ClipboardJS('#copy', {
    text: function() {
        return server + ':' + port;
    }
});
clipboard.on('success', function(e) {
    alert('已复制');
});