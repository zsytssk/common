(function ($) {
	$.fn.zsyFade = function (options) {
		var default_config = {
			first_show_index: 0, // 页面刚加载时显示元素index
			autoplay: true,
			infinite: true,
			outPagination: false,
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
					calcuIndex();
				});
			}

			if($pag.length) {
				$pag.hover(function () {
					calcuIndex($(this).index());
				});
			}

			function calcuIndex(n) {
				if(n !== undefined) {
					show_index = n;
				} else {
					show_index += direction * 1;
					if(cfg.infinite) {
						if(show_index < 0) {
							show_index = len - 1;
						} else if(show_index >= len) {
							show_index = 0;
						}
					}
				}
				fadeTo();
			}

			function play() {
				autoplayer = setInterval(function () {
					calcuIndex();
				}, 3000);
			}

			function fadeTo() {
				if(!cfg.infinite) {
					if(show_index === 0) {
						$this.find('.prev').addClass('grey');
					} else {
						$this.find('.prev').removeClass('grey');
					}
					if(show_index >= len - 1) {
						$this.find('.next').addClass('grey');
					} else {
						$this.find('.next').removeClass('grey');
					}
				}

				$pag.eq(show_index).addClass('cur').siblings('.cur').removeClass('cur');

				$li.stop().css('z-index', '10').eq(show_index).fadeIn(600, function () {
					$(this).addClass('cur').css('display', '');
				}).siblings().stop().css('z-index', '0').fadeOut(400, function () {
					$(this).css('display', '').removeClass('cur');
				});

				if(cfg.callback) {
					cfg.callback(show_index);
				}
			}
			fadeTo();
		});
	};
}(jQuery));
// .index - glr {
// 	position: relative;
// 	border-top: 3px solid #fff;
// }
// .index-glr .glr-wraper {
// 	height: 650px;
// }
// .index-glr .glr-wraper li {
// 	height: 650px;
// 	background-color: transparent;
// 	background-position: center 0;
// 	background-repeat: no-repeat;
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	display: none;
// }
// .index-glr .glr-wraper li.cur {
// 	display: block;
// }
// .index-glr .pagination {
// 	position: absolute;
// 	bottom: 10px;
// 	left: 0;
// 	width: 100%;
// 	text-align: center;
// 	z-index: 100;
// }
// .index-glr .pagination a {
// 	display: inline-block;
// 	width: 10px;
// 	height: 10px;
// 	background-color: #fff;
// 	margin-right: 10px;
// 	cursor: pointer;
// 	border-radius: 10px;
// }
// .index-glr .pagination .cur {
// 	background-color: #444;
// }
