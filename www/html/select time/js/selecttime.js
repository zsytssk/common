// 用top代替scrollTop
// 最后可以用 css animate 实现平滑滚动
// 自定义时间 天数 小时 分钟

NodeList.prototype.forEach = Array.prototype.forEach;

var _stItems = document.querySelectorAll('.st-item');
var _stItem_lis = document.querySelector('.pop-selecttime .st-list .st-item li');
_stItems.forEach(function (element) {
	var touchY = 0;
	var deltaY = 0;
	var itemH = _stItem_lis.offsetHeight;
	var _inner;

	element.addEventListener('touchstart', function (event) {
		var touch = event.touches[0] || event.changedTouches[0];

		this.classList.add('touchstart');
		_inner = this.querySelector('.inner');
		touchY = touch.pageY;
	});

	element.addEventListener('touchmove', function (event) {
		if(!this.classList.contains('touchstart') && !this.classList.contains('touchmove')) {
			return true;
		}
		var touch = event.touches[0] || event.changedTouches[0];
		event.preventDefault();
		if(this.classList.contains('touchstart')) {
			this.classList.add('touchmove');
			this.classList.remove('touchstart');
		}
		var clientY = touch.clientY;
		deltaY = clientY - touchY;
		touchY = clientY;
		_inner.scrollTop -= deltaY;

	});

	element.addEventListener('touchend', function (event) {
		this.classList.remove('touchmove');
		inittouch();
	});

	function inittouch() {
		var scrollTop = itemH * (Math.round(_inner.scrollTop / itemH));

		scrollTo(_inner, scrollTop, 300);
		_inner = '';
		element.classList.remove('touchmove');
		touchY = 0;
		deltaY = 0;
	}

	function scrollTo(element, to, duration) {
		if(duration <= 0) {
			return;
		}
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;

		setTimeout(function () {
			element.scrollTop = element.scrollTop + perTick;
			if(element.scrollTop == to) {
				return;
			}
			scrollTo(element, to, duration - 10);
		}, 10);
	}
});
