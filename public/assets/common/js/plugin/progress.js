/*进度条*/
(function($) {
    var Progress = (function() {
        function Progress(element, options) {
            this.element = element;
            this.threshold = 1; // 最近的一个提示语
            this.setting = $.extend(true, $.fn.Progress.defaults, options || {});
            this.element.append(`<div class="ownpro__progress--wap">
                                  <div class="ownpro__progress--item item_1"></div>
                                  <div class="ownpro__progress--item item_2"></div>
                                  <div class="ownpro__progress--item item_3"></div>
                                  <div class="ownpro__progress--item item_4"></div>
                                  <div class="ownpro__progress--item item_5"></div>
                                  <div class="ownpro__progress--item item_6"></div>
                                  <div class="ownpro__progress--item item_7"></div>
                                  <div class="ownpro__progress--item item_8"></div>
                                  <div class="ownpro__progress--item item_9"></div>
                                  <div class="ownpro__progress--item item_10"></div>
                                  <div class="ownpro__progress--item item_11"></div>
                                  <div class="ownpro__progress--item item_12"></div>
                                  <div class="ownpro__progress--inner"></div>
                                  <div class="title">
                                      <div class="content">
                                      </div>
                                  </div>
                              </div>`)
            this.init();
        }

        Progress.prototype = {
            init: function() {
                this.progressBar = this.element.find('.ownpro__progress--inner');
                this.tips = this.element.find('.ownpro__progress--item');
                this.title = this.element.find('.title');

                this.beginTime = Number(this.element.data('ownpro__progress')); //开始使用时间
                this.days = Math.floor(((new Date().getTime()) - this.beginTime * 1000) / (1000 * 60 * 60 * 24)) + 1; // 天数
                this.width = ((this.days / 168) * 100).toFixed(2);
                if (this.width > 100) {
                    this.width = 100;
                }

                if (this.width < 0 || this.width > 100) {
                    console.log('数值为1-100');
                    return false;
                }

                this.tipsWordArr = [{ // 提示语
                    name: '换哨片',
                    width: 140
                }, {
                    name: '取痰+换哨片',
                    width: 190
                }, {
                    name: '复查更换新的肺笛',
                    width: 192
                }];
                this.slide();
            },
            //开始滑动
            slide: function() {
                var $this = this;
                var relaWidth = 0;
                relaWidth = $this.width === 100 ? this.width : this.width - 1.2;
                if (relaWidth <= 0) {
                    relaWidth = this.width;
                }
                $this.progressBar.animate({
                    width: `${relaWidth}%`
                }, $this.setting.direction, function() {
                    $this.showItem();
                });
            },
            // showitem
            showItem: function() {
                var $this = this;
                $this.tips.each(function(index, el) {
                    if (((((index + 1) * 2) / 24) * 100) <= $this.width) {
                        $this.threshold = (index + 2) >= 13 ? 12 : index + 2;
                        $(this).addClass('active');
                        $(this).show(1000);
                    } else {
                        $(this).show(1000);
                    }
                });
                $this.showTitle();
            },
            // 显示提示语
            showTitle() {
                let left = ((this.threshold * 2) / 24) * 100 - 3;
                let index = (this.threshold % 12 === 0) ? 2 : (this.threshold % 8 === 0) ? 1 : 0;

                this.title.css({
                    left: `${left.toFixed(2)}%`,
                }).find('.content').css({
                    width: `${this.tipsWordArr[index]['width']}px`,
                    left: `${-(this.tipsWordArr[index]['width']) / 2}px`
                }).text(`${this.threshold * 2} weeks ${this.tipsWordArr[index]['name']}`)

                this.title.show();
            }

        }

        return Progress
    })()


    $.fn.Progress = function(options) {
        return this.each(function(index, el) {
            var $this = $(this),
                instance = $this.data('progress');
            if (!instance) {
                $this.data('ownpro__progress', (instance = new Progress($this, options)))
            }

        });
    }
    $.fn.Progress.defaults = {
        direction: 1000
    }


})(jQuery)