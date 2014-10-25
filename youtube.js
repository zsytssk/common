// ==UserScript==
// @name       youtube 调节字幕
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  学习英语,让youtube 视频 字幕可选择, ctrl键控制字幕显隐, 空格控制暂停播放
// @match     https://*.youtube.com/*
// @copyright  2014+, You
// @run-at document-end
// ==/UserScript==
var inWrite = false;
var firstLoad = true;
document.onkeydown=function(e) {
    var ekc= e.keyCode;
    if(inWrite || ekc != '32' || !document.querySelector('#movie_player')) return;
    e.preventDefault();
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

    if (e.ctrlKey == false) {
        document.querySelector('video').click();
    }
    if (e.ctrlKey == true) {
        document.querySelector('#subtitles_button').click();
    }
}
console.log('&search_sort=video_date_uploaded');