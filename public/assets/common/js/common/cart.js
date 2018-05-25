(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
    var CalculationCar = function () {
        function CalculationCar(element, options) {
            this.element = element;
            this.setting = $.extend(true, $.fn.CalculationCar.defaults, options || {});
            this.init();
        }

        CalculationCar.prototype = {
            init: function init() {
                this.ItemWarp = this.element.find('.lung_buycar--item'); //item 的盒
                this.num = this.element.find('.number'); // 件数
                this.money = this.element.find('.price'); // 钱数
                this.goods = 0; // 共计选择的件数
                this.dataObj = {
                    total: {}, // url
                    source: []
                };
                this.showAllItemCar();
                this.getAllMoney();
                this._addDeleteItemEvent();
            },
            // 查询条目
            showAllItemCar: function showAllItemCar() {
                var self = this;
                self.element.parent('.social').mouseover(function () {
                    self.element.show();
                });
                self.element.mouseout(function () {
                    $(this).hide();
                });
            },

            /**
             * 获取总价钱
             * @Author   iSAM
             * @DateTime 2017-08-10T14:50:32+0800
             * @return   [获取总价钱和数据数组]
             */
            getAllMoney: function getAllMoney() {
                var self = this,
                    allMoney = 0,
                    obj = {},
                    goodsArr = [];

                self.goods = 0; // 件数清零
                self.dataObj.source.length = 0;
                if (this.element.find('.lung_buycar--item').length === 0) {
                    $('.lung_buycar--content').text('您的购物车没有商品，快去购物吧');
                    self.num.text('0');
                    self.money.text('0');
                    return;
                }
                this.element.find('.lung_buycar--item').each(function (index, el) {
                    // 没有被禁用 并且被选中
                    var
                    // 顶级父亲元素
                    dataPrice = Number($(this).data('price')),
                        dataType = Number($(this).data('type')),

                    // 单项价格
                    dataNum = Number($(this).data('num')),
                        dataGoodsId = Number($(this).data('goodsid')),
                        money = 0;
                    self.goods += dataNum;
                    money = self._allMoney(dataNum, dataPrice);
                    allMoney += money;

                    self.num.text(self.goods);
                    self.money.text('￥' + self._addzero(allMoney));
                    // self._showAllDelete();
                });
            },

            /**
             *为每个项目添加删除事件
             * @Author   iSAM
             * @DateTime 2017-08-11T13:58:10+0800
             */
            _addDeleteItemEvent: function _addDeleteItemEvent() {
                var self = this;
                self.ItemWarp.each(function (index, el) {
                    var parent = $(this);

                    $(this).find('.order__delete').click(function (event) {
                        var $this = $(this);
                        var goodsid = parent.data('goodsid');

                        var url = self.setting.deleteAjax;

                        parent.remove();
                        self.getAllMoney();
                        self._ajax(goodsid, url);
                    });
                });
            },

            /**
             * 计算价钱
             * @Author   iSAM
             * @DateTime 2017-08-10T14:21:20+0800
             * @param    {number}      num [数量]
             * @param    {number}      pri [单价]
             * @return   {number}          [总价]
             */
            _allMoney: function _allMoney(num, pri) {
                return Number((num * pri).toFixed(2));
            },
            _addzero: function _addzero(num) {

                if ((num + '').indexOf('.') === -1) {
                    return num = num + '.00';
                }
                var str = (num + '').split('.')[1];
                if (str.length === 1) {
                    return num + '0';
                }
                if (str.length === 2) {
                    return num;
                }
            },
            _ajax: function _ajax(ids, url, fn) {
             var data = {ids: ids};
                $.ajax({
                    type: 'GET',
                    url: '/Cart/del',
                    data: data,
                    dataType: 'json',
                    success: function success(data) {
                                fn();
                    },
                    error: function error() {}
                });
            }
        };
        return CalculationCar;
    }();

    $.fn.CalculationCar = function (options) {
        var $this = $(this),
            instance = $this.data('buycar-calculation');
        if (!instance) {
            $this.data('buycar-calculation', instance = new CalculationCar($this, options));
        }
        return instance;
    };
    $.fn.CalculationCar.defaults = {
        direction: 1000
    };

    var obj = $('#lung_buycar').CalculationCar({
        deleteAjax: '/cart/del',
        changCountAjax: '/cart/changeNumber'
    });
});

},{}]},{},[1])

//# sourceMappingURL=index.js.map
