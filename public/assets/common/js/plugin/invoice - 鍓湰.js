 let commonfn = require('./commonfn.js');
 let __ajax = commonfn.__ajax;
 let Invoice = function() {
     (function($) {

         var Invoice = (function() {

             function Invoice(element, options) {
                 this.element = element;
                 this.person = this.element.find('.person');
                 this.setting = $.extend(true, $.fn.Invoice.defaults, options || {});
                 this.init();
             }
             Invoice.prototype = {
                 init: function init() {
                     this.comContentWarp = this.element.find('.company__content--warp'); // 发票盒子
                     this.addbtn = this.element.find('.add__btn').find('a'); // 增加发票
                     this.saveBtn = this.element.find('.success') // 保存发票
                     this.identifierWarp = this.element.find('.identifier_warp'); // 纳税人识别号
                     this.inputEle = this.identifierWarp.find('.identifierInput');
                     this.isEdit = false; // 是否在编辑
                     this.isHasInvoice = true; // 普通配发票下，是存在不开发票的
                     this.noticeContent = $('.notice-content'); // 发票信息show
                     this.defaultType = ''; // 默认发票类型  普通发票-》不开发票(false)+ 其他（other）   电子发票-》详细(detail)
                     this.iselectro = this.setting.electro; // 是电子发票

                     this.render();

                 },
                 render: function() {
                     let $this = this,
                         length = 0;

                     if ($this.iselectro) {
                         // 电子发票
                         $this.defaultType = 'detail';
                         this.comContentWarp.find('.company__item').each(function(index, el) {
                             length += 1;
                         })
                         if (length >= 2) {
                             this.addbtn.hide();
                         }
                     } else {
                         $this.defaultType = false;
                         // 普通发票下 选择 不开发票和 其他类型发票
                         // $this.changType();
                     }

                     $('.am-modal-dialog').click(function(event) { // 当input 失去了光标的时候
                         /* Act on the event */
                         $this._inputBlur(event.target);
                     });

                     $this._companyItemEvent(); // 为每个条目添加点击事件
                     $this._changType(); // 为普通发票选择 不同类型
                     $this._companyItemDelAddEvent(); // 为每个条目中的 编辑 和 删除 事件
                     $this._companyNewSaveEvent(); // 保存按钮事件
                     $this._companyItemAddEvent();
                 },
                 /**
                  * 为每个发票item 添加 点击事件
                  * @return {[type]} [description]
                  */
                 _companyItemEvent: function() {
                     let $this = this;
                     $this.comContentWarp.find('.company__item').each(function(index, el) {
                         if ($(this).hasClass('active') && $(this).data('invoicenum') !== void(0)) {
                             $this.inputEle.val($(this).data('invoicenum'))
                             $this.identifierWarp.show();
                         }
                         $(this).on('click', function(event) {
                             event.stopPropagation();
                             $this._addItemFn($(this));
                         });
                     })
                 },

                 /**
                  * 为每条项目点击fn
                  * self  company__item
                  */
                 _addItemFn: function(self) {
                     this._recoverystatus(self);

                     let dataNum = self.data('invoicenum'); // 纳税人识别号
                     self.siblings('.company__item').each(function(index, el) {
                         $(this).removeClass('active');
                         $(this).removeClass('add__invoice');
                     });
                     self.addClass('active');
                     this.element.data('companyname', self.data('text'));
                     this.element.data('invoiceid', self.data('invoiceid'));

                     if (dataNum === void(0)) {
                         // 是个人的时候，需要隐藏纳税人识别号
                         this.identifierWarp.hide();
                     } else {
                         this.inputEle.val(dataNum);
                         this.identifierWarp.show();
                     }
                 },
                 /**
                  * 普通发票下的类型选择
                  */
                 _changType: function() {
                     let $this = this;
                     $this.element.find('.content').each(function(index, el) {
                         $(this).click(function() {
                             $(this).addClass('active').siblings().removeClass('active');
                             let type = $(this).data("type");

                             if (type === 'no') {
                                 $this.defaultType = false;
                             } else {
                                 $this.defaultType = 'other';
                             }

                         });
                     });
                 },

                 /**
                  * 为每个条目中的 编辑 和 删除 事件
                  * @return {[type]} [description]
                  */
                 _companyItemDelAddEvent: function() {
                     // 为每条项目的 编辑和 删除添加事件
                     let $this = this;
                     this.comContentWarp.find('.company__item').each(function(index, el) {
                         let self = $(this);
                         let edit = $(this).find('.edit'); // 次按钮的作用是编辑和保存
                         let deletebtn = $(this).find('.delete'); // 删除按钮

                         // 删除事件
                         deletebtn.on('click', function(event) {
                             event.stopPropagation();
                             $this._addDeleteItemFn(self);
                         });
                         // 修改事件
                         edit.on('click', function(event) {
                             event.stopPropagation();
                             $this._addEditItemEvent(self);
                         });

                     });
                 },

                 /**
                  * 为每条数据  删除 事件
                  * self  company__item
                  */
                 _addDeleteItemFn: function(self) {
                     let $this = this,
                         data = {
                             invoiceid: self.data('invoiceid'),
                         },
                         fn = function() {

                             $this.person.addClass('active'); // 默认选择个人
                             $this.identifierWarp.hide();
                             self.remove();
                         },
                         url = $this.setting.deleteItemAjax;
                     console.log(data);
                     __ajax('GET', url, data, fn)

                 },
                 /**
                  * 为每条数据 编辑按钮 事件
                  * parent  company__item
                  * edit   编辑按钮
                  */
                 _addEditItemEvent: function(self) {
                     let valueBox = self.find('.value'),
                         edit = self.find('.edit'),
                         num = self.data('invoicenum'),
                         inputObj = $(`<input type="text"  value=""/>`);

                     inputObj.click(function(event) {
                         event.stopPropagation();
                     });

                     this.inputEle.val(num);
                     valueBox.text('');
                     edit.text('保存').off();

                     console.log(self.data('text'))
                     console.log(self)
                         // 
                     self
                         .removeClass('active')
                         .addClass('add__invoice')
                         .append(inputObj)
                         .off(); // 父元素消失
                     inputObj.val("").focus().val(self.data('text'));

                     this._recoverystatus(self); //恢复兄弟兄弟
                     this._saveCompanyEdit(self, inputObj); //每条数据保存事件
                 },

                 /**
                  * 在编辑状态下没有，恢复原有状态
                  * self
                  */
                 _recoverystatus: function(self) {
                     let $this = this,
                         element = null;
                     if (self != void(0)) {
                         element = self.siblings('.company__item');
                     } else {
                         element = $('.company__item')
                     }
                     element.each(function(index, el) {
                         //$(this).removeClass('active');
                         //
                         let self = $(this);
                         if ($(this).hasClass('add__invoice') && !$(this).hasClass('adding')) {
                             $(this)
                                 .removeClass('add__invoice')
                                 .off('click')
                                 .on('click', function(event) {
                                     event.stopPropagation();
                                     $this._addItemFn($(this));
                                 })
                                 .find('.value')
                                 .text($(this).data('text'));

                             $(this).find('.edit').off('click').on('click', function(event) {
                                 event.stopPropagation();
                                 $this._addEditItemEvent(self);
                             }).text('编辑');
                             $(this).find('input').remove();
                         } else if ($(this).hasClass('adding')) { // 在新增的时候的item
                             $(this).remove();
                             $this.addbtn.show();
                         }

                     });
                 },

                 /**
                  * [保存事件]
                  * @DateTime 2017-08-18T15:28:44+0800
                  * @param    {[type]}                 self   [company__item]
                  * @param    {[type]}                 inputObj [edit 中的input]
                  */
                 _saveCompanyEdit: function(self, inputObj) {
                     let $this = this,
                         edit = self.find('.edit'),
                         invoiceid = self.data('invoiceid'),
                         url = $this.setting.saveItemAjax;

                     edit.off('click').on('click', function(event) {
                         event.stopPropagation();
                         let text = inputObj.val(),
                             data = {
                                 invoiceid,
                                 text,
                             };
                         self.find('.value').text(text).removeClass('add__invoice');
                         $(this).text('编辑');
                         inputObj.remove();
                         $this._changeEditEvent($(this), self); // 把edit 的事件修复
                         __ajax('GET', url, data);
                     });


                 },
                 _changeEditEvent: function(edit, self) {
                     let $this = this;
                     edit.off('click').on('click', function() {
                         $this._addEditItemEvent(self);
                     })
                 },
                 /**
                  *  保存 btn 是修改默认选项的
                  */
                 _companyNewSaveEvent: function() {
                     let $this = this;
                     $this.saveBtn.click(function(event) {
                         let key = true;
                         if ($this.isEdit) {
                             alert('还在编辑状态');
                             return;
                         }
                         $this.comContentWarp.find('.company__item').each(function(index, el) {
                             if ($(this).hasClass('active')) {
                                 key = false
                             }
                         });
                         if (key) {
                             alert('请选择一个发票');
                             return;
                         }

                         if ($this.iselectro) {
                             //电子发票
                             let companyname = $this.element.data('companyname');
                             $this.noticeContent.text(`普通发票(电子) ${companyname}`);
                             $('#submit_invoice_id').val($this.element.data('invoiceid'));
                         } else {
                             if (!$this.defaultType) {
                                 // 普通发票 -》 不开
                                 $this.noticeContent.text('不开发票');
                                 $('#submit_invoice_id').val(-1);
                             } else {
                                 // 普通发票 -》  其他类型
                                 let companyname = $this.element.data('companyname');
                                 $this.noticeContent.text(`普通发票(纸质) ${companyname}`);
                                 $('#submit_invoice_id').val($this.element.data('invoiceid'));
                             }
                         }
                         // 发票小类型
                         $('#submit_invoice_type').val($this.defaultType);
                         $('#doc-modal-invoice').modal('close');
                     });
                 },
                 /**
                  * 添加新的税务item
                  * @return {[type]} [description]
                  */
                 _companyItemAddEvent: function() {
                     // 添加公司 新抬头
                     let $this = this;
                     $this.addbtn.click(function(event) {
                         event.stopPropagation();
                         $this._recoverystatus();
                         $this.isEdit = true;

                         $(`<div class="company__item add__invoice adding"><input type='text' placeholder="新增单位发票抬头"><a class="saveadd">保存</a></div>`).appendTo($this.comContentWarp);
                         $this.inputEle.val('');
                         $this.comContentWarp.scrollTop($this.comContentWarp[0].scrollHeight);

                         $(this).hide();

                         $this.identifierWarp.show();
                         $this._companyItemSaveEvent();
                     });
                 },

                 /**
                  * 
                  * @Author   编辑框中的保存-》保存事件
                  * @DateTime 2017-08-22T09:56:40+0800
                  * @param    {string}
                  * @return   {[type]}                 [description]
                  */
                 _companyItemSaveEvent: function() {
                     let $this = this,
                         btn = $('.saveadd');
                     btn.click(function(event) {
                         /* Act on the event */
                         let addInvoice = $this.element.find('.add__invoice'),
                             name = addInvoice.find('input').val(),
                             num = $this.inputEle.val(),
                             url = $this.setting.addNewInvoice;
                         console.log($this.setting)
                         if (name === '' || num === void(0) || num === '' || name === void(0)) {
                             alert('请填写完全公司名和纳税号');
                             return;
                         }

                         /*  $('#doc-modal-invoice').modal('close');*/
                         $this.element.data('invoiceid', 1212);
                         $this.isEdit = false;
                         $this.addbtn.show();
                         addInvoice.remove();

                         let data = {
                                 name,
                                 num
                             },
                             fn = function(res, name, num) {

                                 let newEle = $(`<li data-invoicenum="${num}" data-invoiceid="${res.data.id}"  data-text="${name}"  class="company__item ellipsis active"> <span class="value">${name}</span><a class="item edit">编辑</a><a class="item delete">删除</a></li>`)
                                 newEle.appendTo($this.comContentWarp);
                                 newEle.on('click', function(event) {
                                     event.stopPropagation();
                                     $this.identifierWarp.show();
                                     $this._addItemFn($(this));

                                 });

                                 let edit = newEle.find('.edit'), // 次按钮的作用是编辑和保存
                                     deletebtn = newEle.find('.delete'); // 删除按钮

                                 // 删除事件
                                 deletebtn.on('click', function(event) {
                                     event.stopPropagation();
                                     $this._addDeleteItemFn(newEle);
                                 });

                                 // 修改事件
                                 edit.on('click', function(event) {
                                     event.stopPropagation();
                                     $this._addEditItemEvent(newEle);
                                 });
                             }

                         /*************************************************************从新构建*******************/
                         console.log(url);
                         __ajax("POST", url, data, fn);
                     });
                 },
                 /**
                  * input 失去光标
                  * @DateTime 2017-08-18T15:28:44+0800
                  * @param    {[type]}                 parent   [company__item]
                  * @param    {[type]}                 self     [eidt]
                  * @param    {[type]}                 inputObj [edit 中的input]
                  * @param    {[type]}                 text     [parent 的text]
                  */
                 _inputBlur: function(target) {
                     let $this = this;
                     let isCatIn = commonfn.catIn(target, $this.comContentWarp[0]);
                     console.log(isCatIn)
                     if (!isCatIn) {
                         $this.comContentWarp.find('.company__item').each(function(index, el) {
                             let self = $(this);
                             if (self.hasClass('add__invoice') && !$this.isEdit) {
                                 self
                                     .removeClass('add__invoice')
                                     .off('click')
                                     .on('click', function(event) {
                                         event.stopPropagation();
                                         $this._addItemFn($(this));
                                     })
                                     .find('.value')
                                     .text(self.data('text'));

                                 self.find('.edit').off('click').on('click', function(event) {
                                     event.stopPropagation();
                                     $this._addEditItemEvent(self);
                                 }).text('编辑');
                                 self.find('input').remove();

                             }

                         });
                     }
                 },
             }
             return Invoice;
         })()


         $.fn.Invoice = function(options) {
             var $this = $(this),
                 instance = new Invoice($this, options);
         };
         $.fn.Invoice.defaults = {
             deleteItemAjax: 'deltete'
         };

         /***************************************/
     })(jQuery);
 }

 module.exports = Invoice;