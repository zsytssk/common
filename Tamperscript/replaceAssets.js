// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at      document-idle
// @match        https://fat1.testbitgame.com/game/details?gameNo=10001
// ==/UserScript==

async function main() {
    'use strict';
    let cssList = document.getElementsByTagName('link');
    let scriptList = document.getElementsByTagName('script');
    console.log(`test:>`, [...scriptList].length);
    [...cssList].map(filterCss);
    [...scriptList].map(filterJs);

    const assets = await getLocalAssets();
    const root = document.getElementById('root');
    root.parentNode.removeChild(root);

    const new_root = document.createElement('div');
    new_root.id = 'root';
    document.body.appendChild(new_root);
    for (const item of assets) {
        if (item.type === 'css') {
            const link = document.createElement('link');
            link.href = `https://www.local.devbitgame.com:3020${item.file}`;
            link.rel = "stylesheet";
           document.body.appendChild(link)
        } else if (item.type === 'js') {
            const script = document.createElement('script');
            script.async = false;
            script.src = `https://www.local.devbitgame.com:3020${item.file}`;
            document.body.appendChild(script);
        }
    }
}

main();


async function getLocalAssets() {
    const data = await fetch('https://www.local.devbitgame.com:3020/');
    const text = await data.text();
    const matches = text.matchAll(/(\/wap\.app\.\d*[^"]+)/g);
    const assets = [];
    for (let item of matches) {
        const file = item[0];
        if (file.indexOf('.css') === file.length - 4) {
            assets.push({type: 'css', file});
        } else if (file.indexOf('.js') === file.length - 3) {
            assets.push({type: 'js', file});
        }
    }
    return assets;
}

function filterCss(item) {
   if (item.href.indexOf('wap.app') !== -1) {
       item.parentNode.removeChild(item);
    }
}

function filterJs(item) {
    console.log(`test:>`, item.src);
   if (item.src.indexOf('wap.app') !== -1) {
       item.parentNode.removeChild(item);
    }
}
