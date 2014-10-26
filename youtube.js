// ==UserScript==
// @name       youtube 调节字幕
// @namespace   https://raw.githubusercontent.com/zsytssk/common/master/
// @updateURL   https://raw.githubusercontent.com/zsytssk/common/master/youtube.js
// @downloadURL https://raw.githubusercontent.com/zsytssk/common/master/youtube.js
// @version    0.1
// @description  学习英语,让youtube 视频 字幕可选择, ctrl键控制字幕显隐, 空格控制暂停播放
// @include     https://*.youtube.com/*
// @date        2014/10/25
// @modified    2014/10/25
// @copyright  2014+, zsytssk@gmail.com
// @run-at document-end
// ==/UserScript==
var inWrite = false;
var firstLoad = true;
document.onkeydown=function(e) {
    var ekc= e.keyCode;
    if (!document.querySelector('#movie_player')) return;
    if (firstLoad) {
        document.querySelector('#movie_player').style.webkitUserSelect = 'text';
        // 处理空格在打字事后的冲突
        var $inputs = document.querySelectorAll('input, textarea');
        for (var i = 0; i < $inputs.length; i++) {
            $inputs[i].onfocus = function () {
                inWrite = true;
            }
            $inputs[i].onblur = function () {
                inWrite = false;
            }
        };

        firstLoad = false;
    }

    if(inWrite || ekc != '32') return;
    e.preventDefault();
    if (e.ctrlKey == false) {
        document.querySelector('video').click();
    }
    if (e.ctrlKey == true) {
        document.querySelector('#subtitles_button').click();
    }
}
console.log('&search_sort=video_date_uploaded');