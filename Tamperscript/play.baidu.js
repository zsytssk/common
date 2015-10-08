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
// @run-at document-end
// ==/UserScript==

var inWrite = false;
var firstType = true;
GM_addStyle('\
    #movie_player {-webkit-user-select: all !important;} \
    .ytp-subtitles-player-content {z-index: 998 !important;} \
    .caption-window { pointer-events: auto !important;} \
    .html5-video-controls {z-index: 999 !important}\
    .ytp-dialog-holder {z-index: 1000 !important}\
')

document.onkeydown = function (e) {
    var _movie_player = document.getElementById('movie_player');
    var ekc = e.keyCode;
    if(!_movie_player || inWrite || ekc != '32') return;
    if(firstType) {
        firstType = false;
    }
    e.preventDefault();
    if(e.ctrlKey == false) {
        document.querySelector('video').click();
    }
    if(e.ctrlKey == true) {
        document.querySelector('#subtitles_button').click();
    }
}

// 打字 禁用上面快捷键
var $inputs = document.querySelectorAll('input, textarea');
for(var i = 0; i < $inputs.length; i++) {
    $inputs[i].onfocus = function () {
        inWrite = true;
    }
    $inputs[i].onblur = function () {
        inWrite = false;
    }
};
