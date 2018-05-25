/*调查问卷*/
let Questionnaire = (function() {
  function Questionnaire(element, options) {
    this.element = element;
    this.setting = $.extend(true, $.fn.Questionnaire.defaults, options || {});
    this.allNum = 0;
    this.saveArr = [];
    this.progerItemsArr = [];
    this.init();
  }

  Questionnaire.prototype = {
    init: function() {
      this.progressBar = this.element.find('.question_progress--inner'); // 进度条
      this.tips = this.element.find('.question_progress--wap').find('li');
      this.quGroups = this.element.find('.question__group'); // 每个问卷的最外层
      this.allNumEle = this.element.find('.allnum'); // 积分器
      this.progress = this.element.find('.question__progress');
      this._progerItemsArr();
      this._showPress();

    },
    /*便利item*/
    _progerItemsArr() {
      let self = this;
      self.tips.each(function(index, el) {
        let href = $(this).find('a').attr('href').split('#')[1];
        self.progerItemsArr.push(href);
      })
      self._addEvent();
    },
    _showPress: function() {
      let resizeId,
        self = this;
      self.progress.css('left', $('.question__warp').offset().left - 72 + 'px')
      $(window).resize(function() {
        if ($(window).width() > 1109) {
          self.progress.show();
          let left = $('.question__warp').offset().left;
          self.progress.css('left', left - 72 + 'px')
        } else {
          self.progress.hide();
        }
      })
    },
    // 开始为 每个按钮添加事件
    _addEvent: function() {
      let self = this;
      this.quGroups.each(function(index, el) {
        // 增加ID
        $(this).attr('id', self.progerItemsArr[index]);
        let labels = $(this).find('label'),
          serial = Number($(this).find('.serial').text()); // 序列号
        labels.each(function(index, el) {
          $(this).on('click', function() {
            $(this).parent().siblings('.question__item').find('label').each(function(index, el) {
              $(this).removeClass('active');
            });
            $(this).addClass('active');
            let num = Number($(this).text());
            self._addNum(serial, num); // 添加数值
          })
        });

      });
    },
    _addNum: function(serial, num) {
      this.saveArr[serial - 1] = num;
      this._changeAllNum();
      this._changProgress();
    },
    /*计算总分*/
    _changeAllNum: function() {
      let num = 0
      this.allNum = 0;
      this.saveArr.forEach(function(item) {
        num += item;
      })
      this.allNum = num;
      this.allNumEle.text(this.allNum);
    },
    /*精度条的长度*/
    _changProgress: function() {
      let self = this;
      let relaHeight = self.saveArr.length / self.quGroups.length;
      self.progressBar.animate({
        height: `${relaHeight.toFixed(2) * 100}%`
      }, function() {
        self._createBlock();
      });
    },
    /*创建导航框*/
    _createBlock: function() {
      for (let i = 0; i < this.saveArr.length; i++) {
        if (this.saveArr[i] === void(0)) {
          let top = ((i + 1) / this.quGroups.length).toFixed(2) * 100 + '%';
          $(this.tips.get(i)).css('top', top).show();
        } else {
          $(this.tips.get(i)).hide();
        }
      }
    }
  }
  return Questionnaire
})()


$.fn.Questionnaire = function(options) {
  return this.each(function(index, el) {
    let $this = $(this),
      instance = $this.data('own_question');
    if (!instance) {
      $this.data('own_question', (instance = new Questionnaire($this, options)))
    }

  });
}
$.fn.Questionnaire.defaults = {
  direction: 1000
}