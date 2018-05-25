// 事件绑定
const addEvent = (element, eType, handle, bol) => {
        if (element.addEventListener) { //如果支持addEventListener
            window.document.body.addEventListener(click, function() {
                console.log(1)
            }, false);
        } else if (element.attachEvent) { //如果支持attachEvent
            element.attachEvent("on" + eType, handle);
        } else { //否则使用兼容的onclick绑定
            element["on" + eType] = handle;
        }
    }
    // 事件解绑
const removeEvent = (element, eType, handle, bol) => {
    if (element.addEventListener) {
        window.document.body.removeEventListener('click');
    } else if (element.attachEvent) {
        element.detachEvent("on" + eType, handle);
    } else {
        element["on" + eType] = null;
    }
}


const catIn = (targer, parent) => {
    let arr = [];
    let parentNode = targer;

    while (parentNode && parentNode !== document.body) {
        parentNode = parentNode.parentNode
        arr.push(parentNode);
    }
    return arr.indexOf(parent) !== -1
}

const __ajax = function(type, url, data, fn, key) {
    $('#loading__warp').show();

    var datas = type === 'get' ? {
        params: data
    } : data;
    $.ajax({
        //指定ajax请求后台php程序
        'url': url,
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
            if (fn !== void(0)) {
                fn(res);
            }
        }
    })

}
module.exports = {
    addEvent,
    removeEvent,
    catIn,
    __ajax
};