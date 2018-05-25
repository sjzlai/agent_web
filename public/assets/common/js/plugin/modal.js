var modal = function() {

    (function($) {
        var $modal = (function() {
            function $modal(options, deleteAjaxfn) {
                this.element = $('body');
                this.deleteAjaxfn = deleteAjaxfn;

                this.setting = $.extend(true, this.defaults, options || {});
                let str = '<button class="btn btn-primary close">取消</button>';
                if (!this.setting.isSingle) {
                    str = '';
                }
                this.element.append(`<div class="ol-modal-container" >
                                    <div class="ol-modal">
                                        <span class="ol-modal-icon" @click="closeModal"> <i class=" am-close am-close-spin">×</i>
                                        </span>
                                        <div class="ol-modal-title">温馨提示</div>
                                        <p class="ol-modal-content">${this.setting.title}</p>
                                        <div class="ol-modal-close">
                                            <button class="btn btn-primary success">确定</button>
                                            ${str}
                                        </div>
                                    </div>
                                </div>`)
                this.init();

            }

            $modal.prototype = {
                defaults: {
                    title: 'title',
                    isSingle: false,
                },
                init: function() {
                    this.$modal = this.element.find('.ol-modal-container');
                    this.closeIcon = this.$modal.find('.ol-modal-icon');
                    this.successBtn = this.$modal.find('.success');
                    this.closeBtn = this.$modal.find('.close');

                    this._addCloseIconEven();

                },
                _addCloseIconEven: function() {
                    let self = this;
                    self.closeIcon.click(function(event) {
                        self.$modal.remove();
                    });

                    self.successBtn.click(function(event) {
                        self.$modal.remove();
                        if (self.deleteAjaxfn !== void(0)) {
                            self.deleteAjaxfn();
                        }
                    });
                    self.closeBtn.click(function(event) {
                        self.$modal.remove();
                    });

                }
            }

            return $modal
        })()

        $.extend({
            $modal: function(options, deleteAjaxfn) {
                var instance = new $modal(options, deleteAjaxfn);

            }
        })


    })(jQuery)

}

module.exports = modal;