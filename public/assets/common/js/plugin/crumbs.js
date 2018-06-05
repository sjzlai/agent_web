/**
 * 获取路由
 * @Author   iSAM
 * @DateTime 2017-08-30T10:32:58+0800
 * @return   {arr}                 [{name:'str', url: 'index'}]
 */
var getrouter = function(routerArr, urlArr, index, totalArr) {
    if (routerArr === void(0)) {
        return totalArr;
    }
    routerArr.forEach(function(item) {
        if ((Object.keys(item).includes(urlArr[index]))) {
            var obj = {},
                item = item[urlArr[index]];
            obj['name'] = item['name'];
            obj['url'] = item['url'];
            totalArr.push(obj);
            getrouter(item.children, urlArr, index + 1, totalArr)
        }

    })
    return totalArr;
}

/* 面包屑*/
var crumbs = function() {
    var router = [{
        index: {
            name: '首页',
            url: '/index.blade.php',
            children: [{
                personal: {
                    name: '个人中心',
                    url: '/personal/infor.html',
                    children: [{
                        infor: {
                            name: '个人资料',
                            url: '/personal/infor.html',
                        }
                    }, {
                        registerpro: {
                            name: '产品注册',
                            url: '/personal/registerpro.html',
                        }
                    }, {
                        ownpro: {
                            name: '我的产品',
                            url: '/personal/ownpro.html',
                        }
                    }, {
                        samplelist: {
                            name: '邮寄订单',
                            url: '/personal/samplelist.html',
                        }
                    }, {
                        orderindex: {
                            name: '已完成订单',
                            url: '/personal/orderindex.html',
                        }
                    }, {
                        orderready: {
                            name: '待付款',
                            url: '/personal/orderready.html',
                        }
                    }, {
                        readygo: {
                            name: '待发货',
                            url: '/personal/readygo.html',
                        }
                    }, {
                        readyfinish: {
                            name: '待接收',
                            url: '/personal/readyfinish.html',
                        }
                    }, {
                        changepass: {
                            name: '修改密码',
                            url: '/personal/changepass.html',
                        }
                    }, {
                        changetel: {
                            name: '修改手机号',
                            url: '/personal/changetel.html',
                        }
                    }, {
                        problem: {
                            name: '常见问题',
                            url: '/personal/problem.html',
                        }
                    }]
                }
            }]
        }
    }]



    var urlArr = document.URL.split('/').splice(3),
        routersArr = '';
    // 格式化代码
    urlArr.forEach(function(item, index) {
        if (item.includes('.')) {
            urlArr[index] = item.split('.')[0]
        }
    })
    urlArr.unshift('index');
    routersArr = getrouter(router, urlArr, 0, []);

    routersArr.forEach(function(item, index) {
        if (index + 1 === routersArr.length) {
            $(`<a href="${item.url}" class="active">${item.name}</a>`).appendTo('.crumbs_warp')
        } else {
            $(`<a href="${item.url}">${item.name} &gt;</a>`).appendTo('.crumbs_warp')
        }
    })


}
module.exports = crumbs;