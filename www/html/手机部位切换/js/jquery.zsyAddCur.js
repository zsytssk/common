// if (jQuery.fn.zsyAddCur) {}
// callback($self) 会将当前单机的元素传递过去
// 这样 bind_element 视乎就没有必要存在了
;
(function ($) {
	$.fn.zsyAddCur = function (options) {
		var default_config = {
			bind_event: 'click', // 绑定事件
			bind_class: 'cur', // 绑定class
			off: false,
			bind_element: false, // 相应变化元素
			callback: false, // 执行完成callback
		};

		var cfg = $.extend(default_config, options);

		if($(this).length === 0) {
			return false;
		}
		var selectors = $(this).selector.split(',');
		if(selectors.length === 0) {
			return false;
		}

		$.each(selectors, function (index, val) {
			var $selfs = $(val);
			if(cfg.off) {
				$selfs.off(cfg.bind_event, zsyAddCurbing);
			} else {
				$selfs.on(cfg.bind_event, zsyAddCurbing);
			}
		});

		function zsyAddCurbing() {
			event.preventDefault();
			$(this).addClass(cfg.bind_class).siblings('.' + cfg.bind_class).removeClass(cfg.bind_class);

			if(cfg.bind_element) {
				var $bind_element = eval(cfg.bind_element);
				$bind_element.eq($(this).index()).addClass(cfg.bind_class).siblings('.' + cfg.bind_class).removeClass(cfg.bind_class);
			}
			if(cfg.callback) {
				cfg.callback($(this));
			}
		}
	};
}(jQuery));
