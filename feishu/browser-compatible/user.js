// ==UserScript==
// @name         【飞书文档】真的兼容我的浏览器 | Feishu doc is really compatible with my browser
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  隐藏“浏览器不兼容”提示 | Hide "not compatible" banner
// @author       lideming
// @match        https://*.feishu.cn/docx/*
// @match        https://*.feishu.cn/drive/*
// @match        https://*.feishu.cn/wiki/*
// @icon         https://www.feishu.cn/favicon.ico
// @license      MIT
// @downloadURL https://github.com/ybbapp/userscript/raw/refs/heads/main/feishu/browser-compatible/user.js
// @updateURL https://github.com/ybbapp/userscript/raw/refs/heads/main/feishu/browser-compatible/user.js
// ==/UserScript==

(function() {
    'use strict';
    waitForElm('.not-compatible__announce').then(dom => {
        // dom.querySelector('.not-compatible__announce .ud__notice__close').click();
        dom.hidden = true;
        console.log('not-compatible__announce hidden', dom)
    });

    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            let found = false;
            const timer = setTimeout(() => {
                observer.disconnect();
                console.error("waitForElm timeout");
                // not resolving/rejecting
            }, 30000); // ms
            const observer = new MutationObserver(mutations => {
                for (const m of mutations) {
                    for (const node of m.addedNodes) {
                        if (node.matches(selector)) {
                            clearTimeout(timer);
                            found = true;
                            observer.disconnect();
                            return resolve(node);
                        }
                    }
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
})();