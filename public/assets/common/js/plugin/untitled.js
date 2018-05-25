 var Pagination = (function() {
     function Pagination(element, options) {
         this.element = element;
         this.showBox = this.element.find('.ol-pagination__box'); // 存放盒子
         this.setting = $.extend(true, $.fn.Pagination.defaults, options || {});
         this.current = 1; // 当前的显示页数
         this.start = [];
         this.isLeftShow = true;
         this.isRigthShow = true;
         this.leftEllipsis = this.element.find('.ol-pagination.ellipsis.left');
         this.rightEllipsis = this.element.find('.ol-pagination.ellipsis.right');
         this.firstItem = this.element.find('.ol-pagination.firstItem');
         this.lastItem = this.element.find('.ol-pagination.lastItem');

         this.leftNext = this.element.find('.ol-pagination.prev');
         this.rightNext = this.element.find('.ol-pagination.next');

         this.init();
     }
     Pagination.prototype = {
         init: function() {
             this.lastItem.text(this.setting.total);
             this.lastItem.data('index', this.setting.total);
             this.render();
             this._isEllipsisShow();
         },
         render: function() {
             let $this = this;
             $this._allpagination($this.current);
             $this.start.forEach(function(item, index) {
                 let active = Number(item) === $this.current ? 'active' : '';
                 $(`<a href="javascript:void(0)" class="ol-pagination ${active}" data-index="${item}">${item}</a>`).appendTo($this.showBox);
             })
             $this._addEvent()
         },
         _allpagination: function() {
             //pageSize: 5,
             let left = Math.max(1, this.current - 2);
             //最右侧页码
             let right = Math.min(left + 4, this.setting.total);
             //最左侧页码
             left = Math.max(1, right - 4);
             this.start.length = 0;

             for (let i = left; i <= right; i++) {
                 this.start.push(i);
             }
         },
         _isEllipsisShow: function() {
             let offset = Math.ceil(this.setting.pageSize / 2);
             if (this.start[0] >= offset) {
                 this.leftEllipsis.show();
             } else {
                 this.leftEllipsis.hide();
             }

             if (this.start[this.start.length - 1] <= this.setting.total - offset + 1) {
                 this.rightEllipsis.show();
             } else {
                 this.rightEllipsis.hide();
             }

             if (this.start[0] >= 2) {
                 this.firstItem.show();
             } else {
                 this.firstItem.hide();
             }

             if (this.start[this.start.length - 1] <= this.setting.total - 1) {
                 this.lastItem.show();
             } else {
                 this.lastItem.hide();
             }

             if (this.current > 1) {
                 this.leftNext.show();
             } else {
                 this.leftNext.hide();
             }

             if (this.current < this.setting.total) {
                 this.rightNext.show();
             } else {
                 this.rightNext.hide();
             }
         },
         _addEvent: function() {
             let $this = this;
             $this.firstItem.click(function(event) {
                 $this._getIndexFn($(this));
             });
             $this.lastItem.click(function(event) {
                 $this._getIndexFn($(this));
             });
             $this.leftNext.click(function(event) {
                 let activeEle = $this.element.find('.ol-pagination__box').find('a.active');
                 $this._getIndexFn(activeEle.prev());
             });

             $this.rightNext.click(function(event) {
                 let activeEle = $this.element.find('.ol-pagination__box').find('a.active');
                 $this._getIndexFn(activeEle.next());
             });

             this.element.find('.ol-pagination__box').find('a').each(function(index, el) {
                 $(this).click(function(event) {
                     /* Act on the event */
                     $this._getIndexFn($(this));
                 });
             });
         },
         _getIndexFn: function(self) {
             if (Number(self.data('index')) === this.current) {
                 return true;
             }
             console.log('doingingignign')
             this.current = Number(self.data('index'));
             this._allpagination();
             this._isEllipsisShow();
             this._changeData(self);
         },
         _changeData: function(self) {
             let $this = this;
             this.element.find('.ol-pagination__box').find('a').each(function(index, el) {
                 $(this).removeClass('active');
                 $(this).data('index', $this.start[index]);
                 $(this).text($this.start[index]);
                 if ($this.start[index] === $this.current) {
                     $(this).addClass('active');
                 }
             });
         },
         /**
          * 改变订单显示的内容
          */

         _changeShowItem: function() {
             let data = {
                 current: this.current
             };
             $.ajax({
                 //指定ajax请求后台php程序
                 'url': this.setting.getOrderItemUrl,
                 //指定ajax数据发送类型
                 'type': 'GET',
                 //指定同步还是异步
                 'cache': false,
                 'async': true,
                 //向后台程序发送的数据
                 'data': data,
                 //返回值类型
                 'dataType': 'text',
                 //成功后的触发事件，参数msg接收到的后台php的返回值
                 'success': function(res) {
                     $('.order__item--warp').find('.order__item').each(function(index, el) {
                         $(this).remove();
                     });
                     data.forEach(function(item) {
                         $(`<div data-num="1" data-price="2888" data-orderid="121112" class="row order__item">
                                    <div class="col-md-10">
                                        <div class="order__show--warp clear">
                                            <a>
                                                <img src="../public/order/images/goods.png">
                                            </a>
                                            <div class="order__content">
                                                <p class="content">朗弗罗当为无货的时候请用PHP当为无货的时候请用PHP</p>
                                                <p class="type">购买类型：<span>肺笛单品</span></p>
                                                <p class="type">产品名称：<span>呼吸健康系统</span></p>
                                                <p class="type">购买日期：<span>2017年7月11日15：30    </span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="order_edit">
                                            <a class="item">再次购买</a>
                                            <a class="item">申请退款</a>
                                        </div>
                                    </div>
                                </div>`).appendTo('.order__item--warp');
                     })
                 }
             })


         }
     }
     return Pagination;
 })()


 $.fn.Pagination = function(options) {
     var $this = $(this),
         instance = $this.data('lung_Pagination');
     if (!instance) {
         instance = new Pagination($this, options);
     }
 };
 $.fn.Pagination.defaults = {
     total: 1,
     pageSize: 5
 };

 $('.ol-pagination__warp').Pagination({
     total: 10,
     pageSize: 5,
     getOrderItemUrl: '/kl'

 })