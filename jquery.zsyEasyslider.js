;(function ($) {
	$.fn.zsyEasyslider = function (options) {
		var $this = $(this);
		var $pagP = $(this).find('.pagination');
		var $pagi = $(this).find('.pagination a');
		var $pag = $(this).find('.pagination');
		var $li = $(this).find('.glr-wraper li');
		var show_index = 0, drct = 1, autoPlay = true, autoP;

		//autoplay
		if (autoPlay) {
			autoP = setInterval(function() {
				show_index += drct;
				indexSlider();
			}, 2000);
		}
		$pagP.hover(function() {
			clearInterval(autoP);
		}, function() {
			autoP = setInterval(function() {
				show_index += drct;
				indexSlider();
			}, 2000);
		});

		//trigger
		$pagi.hover(function() {
			show_index = $(this).index();
			indexSlider();
		})

		function indexSlider() {
			if (show_index <= -1) {
				show_index = $li.length -1;
			}
			if (show_index >= $li.length) {
				show_index = 0;
			}

			$pagi.eq(show_index).addClass('cur').siblings('.cur').removeClass('cur');
			$li.stop().css("z-index", "10").eq(show_index).fadeIn(600, function() {
				$(this).addClass('cur').css("display", "");
			}).siblings().stop().css("z-index", "0").fadeOut(400, function() {
				$(this).css("display", "").removeClass('cur');
			});
		}
	}
}(jQuery))
