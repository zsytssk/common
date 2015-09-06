// ==UserScript==
// @name       youtube 调节字幕
// @namespace   https://raw.githubusercontent.com/zsytssk/common/master/
// @updateURL   https://raw.githubusercontent.com/zsytssk/common/master/youtube.js
// @downloadURL https://raw.githubusercontent.com/zsytssk/common/master/youtube.js
// @version    0.1
// @description  学习英语,让youtube 视频 字幕可选择, ctrl键控制字幕显隐, 空格控制暂停播放
// @include     https://*.youtube.com/*
// @grant GM_addStyle
// @date        2015/04/13 10:15
// @modified    2015/04/13 10:15
// @copyright  2014+, zsytssk@gmail.com
// @run-at document-idle
// ==/UserScript==

GM_addStyle('\
    #movie_player {-webkit-user-select: all !important;} \
    .caption-window { pointer-events: auto !important;} \
    .html5-video-controls {z-index: 999 !important}\
    .ytp-dialog-holder {z-index: 1000 !important}\
');

var inWrite = false;
var firstType = true;

var dom_video = document.querySelector('video');
var dom_subtitles = document.querySelector('.ytp-subtitles-player-content');
var dom_subtitles_button = document.querySelector('.ytp-subtitles-button');
var dom_player = document.getElementById('movie_player');

document.onkeydown = function (e) {
	var ekc = e.keyCode;
	if(!dom_player || inWrite || ekc !== 32) {
		return;
	}
	if(firstType) {
		firstType = false;
	}
	e.preventDefault();
	if(e.ctrlKey === false) {
		dom_video.click();
	}
	if(e.ctrlKey === true) {
		toggleSubtitles();
	}
};

// 打字 禁用上面快捷键
var $inputs = document.querySelectorAll('input, textarea');
for(var i = 0; i < $inputs.length; i++) {
	$inputs[i].onfocus = function () {
		inWrite = true;
	};
	$inputs[i].onblur = function () {
		inWrite = false;
	};
}

function toggleSubtitles() {
	dom_subtitles_button.click();
	setTimeout(function () {
		if(dom_subtitles.childNodes.length) {
			dom_subtitles.style.zIndex = '998';
		} else {
			dom_subtitles.style.zIndex = '0';
		}
	}, 1000);
}
