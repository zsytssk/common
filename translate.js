// ==UserScript==
// @name       translate.google 空格 自动发音
// @namespace   https://raw.githubusercontent.com/zsytssk/common/master/
// @updateURL   https://raw.githubusercontent.com/zsytssk/common/master/youtube.js
// @downloadURL https://raw.githubusercontent.com/zsytssk/common/master/youtube.js
// @version    0.1
// @description  学习英语,让youtube 视频 字幕可选择, ctrl键控制字幕显隐, 空格控制暂停播放
// @include     https://translate.google.com/*
// @date        2014/10/31 10:30
// @modified    2014/10/31 10:30
// @copyright  2014+, zsytssk@gmail.com
// @run-at document-end
// ==/UserScript==

var inWrite = false;
var cb = document.getElementById('gt-src-listen');

document.onkeydown=function(e) {
    var ekc= e.keyCode;
    if( inWrite || ekc != '32') return;
    e.preventDefault();
    simulateMousedown();
}
document.onkeyup=function(e) {
    var ekc= e.keyCode;
    if( inWrite || ekc != '32') return;
    e.preventDefault();
    simulateMouseup();
}

// 打字 禁用上面快捷键
var $inputs = document.querySelectorAll('input, textarea');
for (var i = 0; i < $inputs.length; i++) {
    $inputs[i].onfocus = function () {
        inWrite = true;
    }
    $inputs[i].onblur = function () {
        inWrite = false;
    }
};

function simulateMousedown() {
	var event1 = new MouseEvent('mousedown', {
		'view': window,
		'bubbles': true,
		'cancelable': true
	});

	cb.dispatchEvent(event1);
}

function simulateMouseup() {
	var event2 = new MouseEvent('mouseup', {
		'view': window,
		'bubbles': true,
		'cancelable': true
	});

	cb.dispatchEvent(event2);
}
