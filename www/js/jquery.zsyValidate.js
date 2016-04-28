;
(function ($) {
  $.fn.zsyValidate = function (options) {
    var default_config = {
      submit_btn: '',
      valite_ele: '', //need valite element
      tipFunc: function () {},
      disableBrowserDefault: true,
      submitFunc: ''
    };

    var cfg = $.extend(default_config, options);
    var $this = $(this);
    var $submit_btn = $(cfg.submit_btn);
    var $input = $this.find(cfg.valite_ele);

    // handle browser default valid behavior
    if (hasFormValidation()) {
      if (cfg.disableBrowserDefault) {
        // disable
        $input.on('invalid', function (event) {
          event.preventDefault();
          return false;
        });
      } else {
        return false;
      }
    }

    $submit_btn.click(function () {
      var length = $input.length;
      $input.each(function (index, ele) {
        var cur_validate = validate(this);
        if (!cur_validate) {
          return false;
        }
        if (index == length - 1) {
          // complete all validate exec
          if (cfg.submitFunc && type(cfg.submitFunc) == 'function') {
            cfg.submitFunc();
          } else {
            $this.submit();
          }
        }
      });
    });

    $input.blur(function () {
      validate(this);
    });
    // detect browser support html5 validate
    function hasFormValidation() {
      return (typeof document.createElement('input').checkValidity == 'function');
    };

    function validate(obj) {
      if (obj.tagName === 'SELECT') {
        if (obj.selectedIndex === 0) {
          cfg.tipFunc('invalid', 'empty', obj);
          return false;
        }
      }
      if (obj.tagName === 'INPUT' || obj.tagName === 'TEXTAREA') {
        if ($(obj).is(':radio') || $(obj).is(':checkbox')) {
          var $name = $('[name="" + $(obj).attr("name") + ""]');
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
  };
}(jQuery));
