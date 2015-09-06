(function ($) {
	$.fn.zsySlider = function (options) {
		var default_config = {
			autoplay: false, // 自动播放
			first_show_index: 0, // 页面刚加载时显示元素index
			switch_num: 1, // 每次切换的个数
			time: 500, // 动画时间
			outPagination: false,
			view_num: 1, // 同时展示的元素个数
			callback: false
		};
		var cfg = $.extend(default_config, options);

		if($(this).length === 0) {
			return false;
		}
		$(this).each(function (index, el) {
			var $this = $(el),
				$pag;
			var show_index = cfg.first_show_index;

			var $ul = $this.find('.glr-wraper>ul');
			var $li = $this.find('.glr-wraper>ul>li');
			var $trigger = $this.find('.switch a');
			var direction = 1;
			var len = $li.length;

			if(len === 0) {
				return false;
			}

			if(cfg.outPagination) {
				$pag = $(cfg.outPagination);
			} else {
				if(len > 1) {
					for(var i = 0; i < len; i++) {
						$this.find('.pagination').append('<a></a>');
					}
				}
				$pag = $this.find('.pagination a');
			}

			var max_index = (cfg.view_num === 1) ? (len - cfg.view_num) : (len - cfg.view_num + 1);

			if(cfg.autoplay) {
				var autoplayer;
				$pag.add($trigger).hover(function () {
					clearTimeout(autoplayer);
				}, function () {
					play();
				});
				play();
			}

			if($trigger.length) {
				$trigger.mousedown(function (e) {
					e.preventDefault();
				});
				$trigger.click(function () {
					if($(this).hasClass('grey')) {
						return false;
					}
					if($(this).hasClass('prev')) {
						direction = -1;
					} else {
						direction = 1;
					}
					leftIs();
				});
			}

			if($pag.length) {
				$pag.hover(function () {
					leftIs($(this).index());
				});
			}

			function play() {
				autoplayer = setInterval(function () {
					leftIs();
				}, 3000);
			}

			function leftIs(n) {
				show_index += direction * cfg.switch_num;
				if(n !== undefined) {
					show_index = n * cfg.view_num;
				}
				moveTo();
			}

			function moveTo() {
				if(show_index <= 0) {
					show_index = 0;
					$this.find('.prev').addClass('grey');
				} else {
					$this.find('.prev').removeClass('grey');
				}
				if(show_index >= max_index) {
					show_index = max_index;
					$this.find('.next').addClass('grey');
				} else {
					$this.find('.next').removeClass('grey');
				}

				$ul.stop(true).animate({
					left: -$li.eq(show_index).position().left
				}, cfg.time);

				$pag.eq(show_index).addClass('cur').siblings('.cur').removeClass('cur');

				if(cfg.callback) {
					cfg.callback(show_index);
				}
			}
			leftIs(0);
		});
	};
}(jQuery));
