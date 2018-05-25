/*购物车计算*/
var calculation = function() {
    (function($) {
        var Calculation = function() {
            function Calculation(element, options) {
                this.element = element;
                this.setting = $.extend(true, $.fn.Calculation.defaults, options || {});
                this.init();
            }

            Calculation.prototype = {
                init: function init() {
                    this.ItemWarp = this.element.find('.buycar__item--warp'); //item 的盒子
                    this.totalWarp = this.element.find('.buycar__total--warp'); //统计数据盒子，包含每条数据
                    this.buycarChoseAlls = this.element.find('.buycar__chose--all'); // 两个全选按钮
                    this.counters = this.ItemWarp.find('.buycar__changeNum'); // 计数器
                    this.num = this.totalWarp.find('.num'); // 件数
                    this.money = this.totalWarp.find('.money'); // 钱数
                    this.submit = this.totalWarp.find('.submit'); // 钱数
                    this.deleteAll = this.totalWarp.find('.delete');
                    this.notDisableItems = 0; //记录没有被禁用的项目
                    this.goods = 0; // 共计选择的件数
                    this.isChoseAll = true; // 是否全选
                    this.dataObj = {

                        total: {}, // url
                        source: []
                    };
                    this._addChoseEvent();
                    this._addDeleteItemEvent();
                    this._addCountersEvent();
                    this._checkChoseAll();
                    this._choseAllInputEvent();
                    this._addAllDelete();
                },
                /**
                 * 每个按钮 单选input添加选择事件
                 */
                _addChoseEvent: function _addChoseEvent() {
                    var self = this;
                    self.ItemWarp.find('label').each(function(index, el) {
                        if (self._parentDisable($(this))) {
                            // 没有被禁用
                            $(this).click(function(event) {
                                if ($(this).next('input').is(':checked')) {
                                    self._removeClass($(this));
                                } else {
                                    self._addClass($(this));
                                }
                                self._checkChoseAll();
                                self.getAllMoney();
                            });
                        }
                    });
                },
                /**
                 *为每个项目添加删除事件
                 * @Author   iSAM
                 * @DateTime 2017-08-11T13:58:10+0800
                 */
                _addDeleteItemEvent: function _addDeleteItemEvent() {
                    var self = this;
                    self.ItemWarp.find('.item-delete').each(function(index, el) {
                        $(this).click(function(event) {
                            let $this = $(this);
                            let goodsid = $(this).parents('.buycar__item').data('goodsid');
                            let fn = function() {
                                $this.parents('.buycar__item').remove();
                                self._checkChoseAll();
                                self.getAllMoney();
                            }
                            let deleteAjaxfn = function() {
                                let url = self.setting.deleteAjax;
                                self._ajax(goodsid, url, fn);

                            };

                            $.$modal({}, deleteAjaxfn);
                        });
                    });
                },


                _addCountersEvent: function _addCountersEvent() {
                    var self = this;
                    self.counters.each(function(index, el) {
                        if (self._parentDisable($(this))) {
                            // 没有被禁用
                            var allNumBox = $(this).find('.allNum'),
                                // 计数盒子
                                allNum = Number(allNumBox.text()),
                                goodsId = $(this).parents('.buycar__item').data('goodsid'); // 数字


                            // 增加
                            $(this).find('.plus').click(function(event) {
                                allNum += 1;
                                self._showNum($(this), allNum, allNumBox);
                                self._addGoodsNum(allNum, goodsId)
                            });
                            // 减少
                            $(this).find('.reduce').click(function(event) {
                                if (allNum <= 1) {
                                    allNumBox.text(1);
                                    return false;
                                } else {
                                    allNum -= 1;
                                }
                                self._showNum($(this), allNum, allNumBox);
                                self._addGoodsNum(allNum, goodsId)
                            });
                        }
                    });
                },
                /**
                 * 计数器改变，触发的事件
                 * @Author   iSAM
                 * @param    {[type]}                 allNum  [description]
                 * @param    {[type]}                 goodsId [description]
                 */
                _addGoodsNum: function _addGoodsNum(allNum, goodsId) {

                    let url = this.setting.changCountAjax;
                    let fn = "";
                    this._ajax(goodsId, url, fn, allNum);
                },


                /**
                 * 计算价钱总数，并且显示
                 * @Author   iSAM
                 * @DateTime 2017-08-10T17:24:00+0800
                 * @param    {obj}                 item      [计数器]
                 * @param    {number}              allNum    [数量]
                 * @param    {obj}                 allNumBox [显示的容器]
                 */
                _showNum: function _showNum(item, allNum, allNumBox) {
                    var parent = item.parents('.buycar__item'),
                        // 顶级父亲元素
                        dataPrice = Number(parent.data('price')),
                        // 价格
                        total = parent.find('.total'),
                        money = 0; // 单项价格
                    // 计算总数
                    money = this._allMoney(allNum, dataPrice);
                    allNumBox.text(allNum);
                    total.text(this._addzero(money));
                    parent.data('num', allNum);
                    this.getAllMoney();
                },
                /**
                 * 检查是否选择了所有的产品
                 * @DateTime 2017-08-10T10:25:02+0800
                 */
                _checkChoseAll: function _checkChoseAll() {
                    var self = this;
                    self.notDisableItems = 0;
                    self.ItemWarp.find('label').each(function(index, el) {
                        var key = self._parentDisable($(this)); // 记录没有被禁用的项目
                        if (key) {
                            self.notDisableItems += 1;
                        };
                        if (self._parentDisable($(this)) && !$(this).next().is(':checked')) {
                            // 没有被选中的
                            self.isChoseAll = false;
                        }
                    });
                    self._choseAllInput();
                    self._showNoneCart(); // 检查没有项目
                },
                /**
                 * 检查没有项目
                 * @DateTime 2017-08-10T10:25:02+0800
                 */
                _showNoneCart: function _checkChoseAll() {

                    var length = this.ItemWarp.find('.buycar__item').length;
                    if (length === 0) {
                        this.element.hide();
                        $('#nogoods').show();
                    } else {
                        this.element.show();
                        $('#nogoods').hide();
                    }
                },
                /**
                 * 选择全选按钮
                 */
                _choseAllInput: function _choseAllInput() {
                    var self = this;

                    self.buycarChoseAlls.each(function(index, el) {
                        if (self.isChoseAll && self.notDisableItems) {
                            // 全选并且没有禁用的项目
                            self._addClass($(this));
                        } else {
                            self._removeClass($(this));
                        }
                    });

                    self.isChoseAll = true;
                },
                /**
                 * 全选按钮事件
                 * @Author   iSAM
                 */
                _choseAllInputEvent: function _choseAllInputEvent() {
                    var self = this;
                    self.buycarChoseAlls.each(function(index, el) {
                        $(this).click(function(event) {

                            if (self.notDisableItems === 0) {
                                // 如果没有 可用项目就不用进行
                                return false;
                            }
                            if ($(this).next('input').is(':checked')) {
                                self._removeClass($(this));
                                self._removeClass(self.buycarChoseAlls.eq(1 - index));
                                self._changInputClass(false);
                            } else {
                                self._addClass($(this));
                                self._addClass(self.buycarChoseAlls.eq(1 - index));

                                self._changInputClass(true);
                            }
                        });
                    });
                },

                /**
                 * 全选和全不选
                 * @Author   iSAM
                 * @DateTime 2017-08-10T11:24:23+0800
                 */

                _changInputClass: function _changInputClass(key) {
                    var self = this;
                    self.ItemWarp.find('label').each(function(index, el) {
                        if (self._parentDisable($(this))) {
                            // 没有被禁用
                            if (key) {
                                // 全选
                                self._addClass($(this));
                                this.isChoseAll = true;
                            } else {
                                // 全不选
                                self._removeClass($(this));
                                this.isChoseAll = false;
                            }
                        }
                    });

                    self.getAllMoney();
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
                    self.ItemWarp.find('label').each(function(index, el) {
                        if (self._parentDisable($(this)) && $(this).next('input').is(':checked')) {
                            // 没有被禁用 并且被选中
                            var parent = $(this).parents('.buycar__item'),
                                // 顶级父亲元素
                                dataPrice = Number(parent.data('price')),
                                dataType = Number(parent.data('type')),
                                // 单项价格
                                dataNum = Number(parent.data('num')),
                                dataGoodsId = Number(parent.data('goodsid')),
                                money = 0,
                                _obj = {};

                            self.goods += dataNum;
                            money = self._allMoney(dataNum, dataPrice);
                            allMoney += money;
                            var data = {
                                goodsId: '',
                                goodsType: ''
                            }
                            data.goodsId = dataGoodsId;
                            data.goodsType = dataType;
                            goodsArr.push(data);


                            // 存储数据
                            _obj['goodsId'] = dataGoodsId;
                            _obj['num'] = dataNum;
                            _obj['price'] = dataPrice;
                            self.dataObj.source.push(_obj);

                            self.num.text(self.goods);
                            self.money.text('￥' + self._addzero(allMoney));
                            self._showAllDelete();
                        }
                    });

                    obj['price'] = allMoney;
                    obj['num'] = self.goods;
                    obj['goodsData'] = goodsArr;
                    this.dataObj.total = obj;

                    if (!self.goods) {
                        self.num.text(0);
                        self.money.text('￥' + '0');
                        self._showAllDelete();
                    }
                },
                /**
                 * 结算接口
                 * @Author   iSAM
                 * @DateTime 2017-08-11T14:17:25+0800
                 * @param    {string}
                 * @return   {[type]}                 [description]
                 */
                gotochange: function gotochange() {
                    return this.dataObj;
                },
                _showAllDelete: function _showAllDelete() {
                    if (this.goods) {
                        this.deleteAll.css({
                            visibility: 'visible'
                        });
                    } else {
                        this.deleteAll.css({
                            visibility: 'hidden'
                        });
                    }
                },

                /**
                 * 全部删除按钮
                 * @Author   iSAM
                 * @DateTime 2017-08-11T09:29:23+0800
                 */
                _addAllDelete: function _addAllDelete() {
                    let self = this;
                    this.deleteAll.click(function() {
                        let ids = '';
                        self.ItemWarp.find('label').each(function(index, el) {
                            if (self._parentDisable($(this)) && $(this).next('input').is(':checked')) {
                                let goodsid = $(this).parents('.buycar__item').data('goodsid');
                                ids += `${goodsid},`
                            }
                        });
                        let idsArr = ids.split(',')
                        idsArr.pop()
                        let newstring = idsArr.join(',');
                        let fn = function() {
                            self._deleteAllItem();
                            self._checkChoseAll();
                            self.getAllMoney();
                        }
                        let deleteAjaxfn = function() {
                            let url = self.setting.deleteAjax;
                            self._ajax(newstring, url, fn);

                        };

                        $.$modal({}, deleteAjaxfn);
                    });
                },
                _deleteAllItem: function _deleteAllItem() {
                    let self = this;
                    self.ItemWarp.find('label').each(function(index, el) {
                        if (self._parentDisable($(this)) && $(this).next('input').is(':checked')) {
                            $(this).parents('.buycar__item').remove();
                        }
                    });
                },
                /**
                 * 为label input 添加class
                 */
                _addClass: function _addClass(self) {
                    self.addClass('active').next().prop('checked', true);
                    self.parents('.buycar__item').addClass('active');
                },
                _removeClass: function _removeClass(self) {
                    self.removeClass('active').next().prop('checked', false);
                    self.parents('.buycar__item').removeClass('active');
                },
                /**
                 * 判断buycar__item 是否被禁用
                 * @Author   iSAM
                 * @DateTime 2017-08-10T13:30:57+0800
                 * @return   {Boolean}  [父元素没有货被]           
                 */
                _parentDisable: function _parentDisable(item) {
                    return !item.parents('.buycar__item').hasClass('disable');
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

                    if (!(num + '').includes('.')) {
                        return num = num + '.00';
                    }
                    var str = (num + '').split('.')[1];
                    if (str.length === 1) {
                        return num + '0';
                    }
                    if (str.length === 2) {
                        return str;
                    }
                },
                _ajax: function _ajax(ids, url, fn, allNum) {
                    let data = {};
                    if (allNum !== void(0)) {
                        data['num'] = allNum;
                    }

                    data['ids'] = ids + '';
                    $.ajax({
                        type: 'GET',
                        url: url,
                        data: data,
                        dataType: 'json',
                        success: function(data) {
                            if (data.status == 1) {
                                if (allNum === void(0)) {
                                    fn();
                                }
                            } else {

                            }
                        },
                        error: function() {}
                    });

                }
            };
            return Calculation;
        }();

        $.fn.Calculation = function(options) {
            var $this = $(this),
                instance = $this.data('buycar-calculation');
            if (!instance) {
                $this.data('buycar-calculation', instance = new Calculation($this, options));
            }
            return instance;
        };
        $.fn.Calculation.defaults = {
            direction: 1000
        };
    })(jQuery);
}

module.exports = calculation;