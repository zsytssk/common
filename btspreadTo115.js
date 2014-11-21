// ==UserScript==
// @name       btspread to 115
// @include     http://115.com/?tab=offline&mode=wangpan
// @include     http://www.btspread.com/magnet/detail/*
// @grant unsafeWindow
// @grant GM_setValue
// @grant GM_getValue
// @run-at document-end
// ==/UserScript==

if(location.href.indexOf('115') != -1) {
		$("iframe").eq(4).load(function() {
			setTimeout(function() {
				$("iframe")[4].contentWindow.$("#js_link_pro_btn").click();
				$('#js_offline_new_add').val(GM_getValue('ml'));
				$('.dialog-bottom .button').click();
			}, 2000);
		});
} else {
	GM_setValue('ml', $("#magnetLink").text());
	unsafeWindow.location.href = "http://115.com/?tab=offline&mode=wangpan";
}
