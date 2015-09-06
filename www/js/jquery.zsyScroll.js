// 自定义滚动条样式
// 需要: jquery.mousewheel.js
// [DOM] scroll-wraper > .scroll-bar + .scroll-box > .scroll-con
;(function ($) {
	$.zsyScroll = function(options) {
		var default_config = {
			scrollBar: ".scroll-bar", // 滚动条
			scrollBox: ".scroll-box", // 滚动框
			scrollCon: ".scroll-con", // 滚动区域
			scrollBarMiniHeight: 30 //滚动条最小高度
		}


		cfgs = $.extend(default_config, options);
		var $scrollWraper = this;
			var $scrollBox = $(cfgs.scrollBox, this);
			var $scrollBar = $(cfgs.scrollBar, this);
			var $scrollCon = $(cfgs.scrollCon, this);
			var mh = cfgs.scrollBarMiniHeight;
			var y;
			var top;
			var radio;


		$scrollWraper[0].init = function() {
			radio = $scrollBox.outerHeight()/$scrollCon.outerHeight();
			// 判断滚动条是否出现
			if ( radio >= 1 && $scrollBar.is(":visible") ) {
				$scrollBar.hide();
				return false;
			} else if (radio < 1 && $scrollBar.is(":hidden")){
				$scrollBar.show();
			}
			// 滚动条的最小高度
			if ($scrollBox.outerHeight()*radio < mh) {
				$scrollBar.css('height', mh);
				radio = ($scrollBox.outerHeight() - mh)/ ($scrollCon.outerHeight() - $scrollBox.outerHeight())
			} else {
				$scrollBar.css('height', $scrollBox.outerHeight()*radio);
			}

			$scrollBar.css('top', $scrollBox.scrollTop()*radio);

			// 事件绑定
			$scrollBar.mousedown(function(e) {/* 按住滚动条 */
				$(this).addClass('drag');
				y = e.pageY -  $(this).position().top;
			});

			$scrollWraper.on("mouseup mouseleave", function() {/* 放开滚动条 */
				$scrollBar.removeClass('drag');
			});

			$scrollWraper.mousemove(function(e) {/* 拖动滚动条 */
				if( $scrollBar.hasClass('drag') ) {
					e.preventDefault(); //禁止此时鼠标选中文本
					top = e.pageY -  y;
					if (top >= 0 && top <= $scrollBox.height() - $scrollBar.height() ) {
						$scrollBar.css("top", top);
						$scrollBox.scrollTop(top/radio);
					}
				}
			});

			// 关联 区域<-->滚动条
			$scrollBox.scroll(function(e) {
				$scrollBox.off('mousewheel');
				$scrollBar.css('top', $(this).scrollTop()*radio);

				$scrollBox.on('mousewheel',function(e, delta) {
					$scrollBox.scrollTop($scrollBox.scrollTop() - delta*50);
				});
			});

			$scrollBox.on('mousewheel',function(e, delta) {
				$scrollBox.scrollTop($scrollBox.scrollTop() - delta*50);
			});
		}

		$scrollWraper[0].init();
		$(window).resize(function() {
			$scrollWraper[0].init();
		});
	}

	$.fn.zsyScroll = function (options) {
		if (options == undefined || typeof(options) == "object") {
			$.zsyScroll.call(this, options);
		} else if(options == "init") {
			this[0].init();
		}
	}
}(jQuery))
