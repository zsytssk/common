//$('.form_class').zsyValidate({
//	submit_btn: '.submit_btn_class'
//})
// 适用: input(text, password, checkbox, radio) select
// 实例: <input type='text' required class='required' title='提示文字' pattern='正则表达式'>
//css /* form validate tip */ .ie-validator {background-color: #f5f5f5; border: 1px solid #b2b2b2; font-size: 14px; height: 20px; line-height: 20px; padding: 10px 20px 10px 33px; position: absolute; visibility: hidden; } .ie-validator .corner-box {left: 6px; position: absolute; top: -11px; _top: -9px; font-size: 25px; } .ie-validator .corner-bd {color: #b2b2b2; } .ie-validator .corner-bg {color: #f5f5f5; left: 0; } .ie-validator i {left: 10px; position: absolute; top: 13px; } .icon-warning {background-image: url(../images/icon-warning.png); margin: 0 4px; height: 16px; vertical-align: middle; width: 16px; }
;(function($) {
	$.fn.zsyValidate = function(options) {
		var default_config = {
			submit_btn: ''
		};
		var cfg = $.extend(default_config, options);

		var $this = $(this);
		var result_validate;
		var $submit_btn = $(cfg.submit_btn);
		var $input = ('required' in document.createElement('input') ? $(':required', this): $('.required', this));
		var $validate_tip = $('<div class="ie-validator"> <span class="corner-box"><span class="corner-bd">&#x25C6;</span><span class="corner-bg">&#x25C6;</span></span> <i class="icon-warning"></i><div class="txt"></div> </div>');
		$validate_tip.appendTo('body');

		$submit_btn.click(function() {
			$input.each(function() {
					return jQuery.fn.zsyValidate.validate(this);
			});
			if (result_validate) {
				$this.submit();
			}
		});

		$input.blur(function () {
			jQuery.fn.zsyValidate.validate(this);
		});
	};
}(jQuery));

jQuery.fn.zsyValidate.validate = function(obj) {
	if ( $(obj).attr('validatefun') && !eval($(obj).attr('validatefun')) ) {
		$('.ie-validator .txt').html('请输入正确的：' + $(obj).attr('title') + '！');
		return jQuery.fn.zsyValidate.show_tip(obj);
	}
	if (obj.tagName === 'SELECT') {
		if (obj.selectedIndex === 0) {
			$('.ie-validator .txt').html('请选择！');
			return jQuery.fn.zsyValidate.show_tip(obj);
		}
	}
	if (obj.tagName === 'INPUT') {
		if($(obj).is(':radio') || $(obj).is(':checkbox')) {
			var $name = $('[name="" + $(obj).attr("name") + ""]');
			if ( !$name.is(':checked') ) {
				$('.ie-validator .txt').html('请选择！');
				return jQuery.fn.zsyValidate.show_tip($name[0]);
			}
		}else if ($(obj).val() === '') {
			$('.ie-validator .txt').html('请输入：' + $(obj).attr('title') + '！');
			return jQuery.fn.zsyValidate.show_tip(obj);
		}else {
			var regexp = new RegExp($(obj).attr('pattern'));
			if ( regexp && !$(obj).val().match(regexp) ) {
				$('.ie-validator .txt').html('请输入正确的：' + $(obj).attr('title') + '！');
				return jQuery.fn.zsyValidate.show_tip(obj);
			}
		}
	}
	return jQuery.fn.zsyValidate.hide_tip();
};

jQuery.fn.zsyValidate.hide_tip = function () {
	$('.ie-validator').css({
		visibility: 'hidden'
	});
	return true;
};

jQuery.fn.zsyValidate.show_tip = function (obj) {
	if ( $(obj).offset().top - $(window).scrollTop() > $(window).height() || $(obj).offset().top < $(window).scrollTop() + 10) {
		obj.scrollIntoView();
	}
	$('.ie-validator').css({
		left: $(obj).offset().left,
		top: $(obj).offset().top + $(obj).outerHeight() + 10,
		visibility: 'visible'
	});
	return false;
};