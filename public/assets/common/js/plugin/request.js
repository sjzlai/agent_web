const __ajax = function(type, url, data, fn, key) {
    $('#loading__warp').show();

    var datas = type === 'get' ? {
        params: data
    } : data;
    $.ajax({
        //指定ajax请求后台php程序
        'url': "/order/adressEdit",
        //指定ajax数据发送类型
        'type': type,
        //指定同步还是异步
        'cache': false,
        'async': true,
        //向后台程序发送的数据
        'data': data,
        //返回值类型
        'dataType': 'text',
        //成功后的触发事件，参数msg接收到的后台php的返回值
        'success': function(res) {
            $('#loading__warp').hide();
            fn(res.data);
        }
    })

}



module.exports = __ajax;