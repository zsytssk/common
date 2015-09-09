// 如何在 动画结束之后 取消绑定 $(window).scroll
$(document).ready(function () {
	setTimeout(animate, 200);
	$(document).on('click', '.tabs-box .trigger a', function (event) {
		setTimeout(animate, 200);
	});
});

function animate() {
	var $animates = $('.animate');

	$animates.each(function (index, el) {
		var $self = $(el);

		function removeClass() {
			var animateType = $self.attr('class').match(/animate\-(\w+)/);
			if (!animateType || $self.is(':hidden')) return;

			animateType = animateType[0];
			var offsetTop = $self.parent().offset().top;

			if ($(window).scrollTop() + $(window).height() > offsetTop + 200) {
				$self.removeClass(animateType);
			}
			return;
		}

		removeClass();
		$(window).scroll(removeClass);
	});
}
