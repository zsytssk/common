// ==UserScript==
// @name         DiscordOpenLast.
// @namespace    http://tampermonkey.net/
// @version      2024-04-07
// @description  打开上次关闭时的页面
// @author       You
// @match        https://discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @grant        none
// ==/UserScript==

(async function () {
  "use strict";
  if (!window.cookieStore) {
    return;
  }
  const lastInfo = await cookieStore.get("lastPage");
  if (lastInfo?.value) {
    cookieStore.delete("lastPage");
    location.href = lastInfo?.value;
  }
  navigation.addEventListener("navigate", () => {
    setTimeout(() => {
      cookieStore.set("lastPage", location.href);
    }, 1000);
  });
})();
