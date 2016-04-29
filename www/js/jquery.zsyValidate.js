;
(function ($) {
  $.fn.zsyValidate = function (options) {
    var default_config = {
      submit_btn: '',
      valite_ele: '', //need valite element
      tipFunc: function () {},
      disableBrowserDefaultValidate: true,
      submitFunc: ''
    };

    var cfg = $.extend(default_config, options);
    var $this = $(this);
    var $submit_btn = $(cfg.submit_btn);
    var input = cfg.valite_ele;
    var input_length = $this.find(input).length;
    // handle browser default valid behavior
    if (hasFormValidation()) {
      if (cfg.disableBrowserDefaultValidate) {
        // disable
        disabledH5Validate();
      } else {
        return false;
      }
    }

    $submit_btn.click(function () {
      if (length != $this.find(input).length) {
        // 如果元素该
      }
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

    $this.on('blur', input, function () {
      validate(this);
    });

    function validate(obj) {
      if (obj.tagName === 'SELECT') {
        if (obj.selectedIndex === 0) {
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

    function disabledH5Validate() {
      $this.find('input, select, textarea').on('invalid', function (event) {
        event.preventDefault();
        return false;
      });
    }

  };
}(jQuery));
