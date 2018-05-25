/*步骤条*/
let step = function() {


    var Step = (function() {
        function Step(element, options) {
            this.setting = $.extend(true, $.fn.Step.default, options || {});
            this.element = element;
            this.sortNumber = -1;
            this.allNumber = 0;
            this.init();
        }
        Step.prototype = {
            init: function() {
                var $this = this;

                $this.stepTitleItems = $this.element.find('.step__title--item');
                $this.stepContentWarps = $this.element.find('.step__content--warp');
                if ($this.stepTitleItems.length !== $this.stepContentWarps.length) {
                    console.log('标题数量和内容数量不同');
                    return false;

                }
                $this.allNumber = $this.stepContentWarps.length;
                $this.step();
            },
            step: function() {
                var $this = this;
                $this.sortNumber += 1;
                if ($this.sortNumber >= $this.allNumber) {
                    console.log('步骤结束了');
                    return false;
                }
                $this.stepContentWarps.each(function(index, item) {
                    if (index === $this.sortNumber) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                })

                $this.stepTitleItems.each(function(index, el) {
                    if ((index == $this.sortNumber) || (index < $this.sortNumber)) {
                        $(this).addClass('active');
                    }
                });


            }
        }

        return Step;
    })()

    $.fn.Step = function(options) {
        var $this = $(this),
            instate = $this.data('Step');
        if (!instate) {
            $this.data('Step', (instate = new Step($this, options)))
        }
        return instate;
    }

    $.fn.Step.default = {};
}


module.exports = step;