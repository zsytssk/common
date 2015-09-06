// 正式插件 需要 css dom 的配合
// .img-box>img[src="" data-bgimg=""]
// $(".img-box").zsyZoom();
;(function($) {
	$.fn.zsyZoom = function(options) {
		var default_config = {
			zoombox: '.zsyzoom-box' // zoom-result-box append 的位置
		};
		var cfg = $.extend(default_config, options);

		var $oi = $(this);
		var $bi, $zp, $zr;
		var scale = 0, moveScale = 0;

		$oi.mouseenter(function(event) {
			$oi.append('<span class="zsyzoomPup"></span>');
			$(cfg.zoombox).append('<div class="zsyzoom-result-box"><img src="' + $oi.find('img').data('bgimg') + '" alt="" /></div>');

			$bi = $('.zsyzoom-result-box img');
			$zp = $('.zsyzoomPup');
			$zr = $('.zsyzoom-result-box');

			scale = $bi.width() / $zr.width();

			$zp.width($oi.width() / scale);
			$zp.height($oi.height() / scale);

			moveScale = ($bi.width() - $zr.width()) / ($oi.width() - $zp.width());
		});

		$oi.mouseleave(function(event) {
			$zp.add($zr).remove();
		});

		$oi.mousemove(function(event) {
			// zoomPup
			if (!$zp) {
				return;
			}
			var cur_pX = event.pageX - $oi.offset().left - $zp.width() / 2;
			var cur_pY = event.pageY - $oi.offset().top - $zp.height() / 2;

			var cur_maX = $oi.width() - $zp.width();
			var cur_maY = $oi.width() - $zp.width();
			// zoomPup超过边界 处理
			if (cur_pX < 0) {
				cur_pX = 0;
			} else if (cur_pX > cur_maX) {
				cur_pX = cur_maX;
			}
			if (cur_pY < 0) {
				cur_pY = 0;
			} else if (cur_pY > cur_maX) {
				cur_pY = cur_maY;
			}

			$zp.css({
				left: cur_pX,
				top: cur_pY
			});

			// 定位大图
			$bi.css({
				left: -cur_pX * moveScale,
				top: -cur_pY * moveScale
			});
		});
	};
}(jQuery));
