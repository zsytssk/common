// html5 invalid can't disalbe append element
;
(function ($) {
  $.fn.zsyValidate = function (options) {
    var default_config = {
      submit_btn: '',
      valite_ele: '', //need valite element
      tipFunc: function () {},
      disableBrowserDefaultValidate: true,
      disableBrowserDefaultSubmit: true,
      selectPlaceholder: '请选择', // select 一般需要一个提示占位符, 在这里填上
      submitFunc: ''
    };

    var cfg = $.extend(default_config, options);
    var $this = $(this);
    var $submit_btn = $(cfg.submit_btn);
    var input = cfg.valite_ele;
    // handle browser default valid behavior
    if (hasFormValidation()) {
      if (cfg.disableBrowserDefaultValidate) {
        // disable
        $this.find('input, select, textarea').on('invalid', function (event) {
          event.preventDefault();
          return false;
        });
      } else {
        return false;
      }
    }

    $submit_btn.click(function () {
      var length = $this.find(input).length;
      $this.find(input).each(function (index, ele) {
        var cur_validate = validate(this);
        if (!cur_validate) {
          return false;
        }
        if (index == length - 1) {
          // complete all validate exec
          if (cfg.submitFunc && typeof (cfg.submitFunc) == 'function') {
            cfg.submitFunc();
          } else {
            $this.submit();
          }
        }
      });
    });
    bindInputEvent();

    // 绑定事件
    function bindInputEvent() {
      $input.off('blur', bindBlur);
      $input.on('blur', bindBlur);
    }
    // inp blur event
    function bindBlur() {
      validate(this);
    }

    function validate(obj) {
      if (obj.tagName === 'SELECT') {
        if (obj.selectedIndex === 0 && obj.value === cfg.selectPlaceholder) {
          cfg.tipFunc('invalid', 'empty', obj);
          return false;
        }
      }
      if (obj.tagName === 'INPUT' || obj.tagName === 'TEXTAREA') {
        if ($(obj).is(':radio') || $(obj).is(':checkbox')) {
          var $name = $('[name="' + $(obj).attr("name") + '"]');
          if (!$name.is(':checked')) {
            cfg.tipFunc('invalid', 'empty', $name[0]);
            return false;
          }
        }
        if ($(obj).val() === '') {
          cfg.tipFunc('invalid', 'empty', obj);
          return false;
        }
        var regexp = new RegExp($(obj).attr('pattern'));
        if (regexp && !$(obj).val().match(regexp)) {
          cfg.tipFunc('invalid', 'patternErr', obj);
          return false;
        }
      }
      cfg.tipFunc('success', '', obj);
      return true;
    };

    // detect browser support html5 validate
    function hasFormValidation() {
      return (typeof document.createElement('input').checkValidity == 'function');
    };

    this.updateInp = function () {
      // 如果页面的input发生改变 比方说新添加input... 需要使用这个函数更新下$input
      // 和相应的事件绑定
      $input = $this.find(cfg.valite_ele);
      bindInputEvent();
    }
    return this;
  };
}(jQuery || Zepto));
