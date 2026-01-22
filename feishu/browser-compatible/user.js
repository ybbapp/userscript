// ==UserScript==
// @name         【飞书文档】真的兼容我的浏览器 | Feishu doc is really compatible with my browser
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  隐藏“浏览器不兼容”提示 | Hide "not compatible" banner
// @author       lideming
// @match        https://*.feishu.cn/docx/*
// @match        https://*.feishu.cn/drive/*
// @match        https://*.feishu.cn/wiki/*
// @match        https://*.feishu.cn/base/*
// @icon         https://www.feishu.cn/favicon.ico
// @license      MIT
// @downloadURL https://github.com/ybbapp/userscript/raw/refs/heads/main/feishu/browser-compatible/user.js
// @updateURL https://github.com/ybbapp/userscript/raw/refs/heads/main/feishu/browser-compatible/user.js
// ==/UserScript==

(function() {
    'use strict';
    waitForElm('.not-compatible__announce').then(dom => {
        // <div class="not-compatible__announce disabled-contextmenu"><div class="ud__notice ud__notice-warning ud__notice-align-center ud__notice-closable ud__notice-banner ud__notice-showIcon ud__notice--filled" role="alert"><span class="universe-icon ud__notice__statusIcon"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="WarningFilled"><path d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11ZM12 7a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" fill="currentColor"></path></svg></span><div class="ud__notice__main ud__notice__main--no-title"><div class="ud__notice__description"><div class="ud__notice__description-content"><span class="text">此浏览器存在兼容性问题会影响你的正常使用，请访问<span class="link"><a href="https://www.feishu.cn/hc/zh-CN/articles/050253926143" target="_blank">帮助中心</a></span>了解更多</span></div></div><button type="button" class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-sm ud__notice__close"><span class="universe-icon"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="CloseOutlined"><path d="M20.207 20.207a.99.99 0 0 0 .003-1.403L13.406 12l6.804-6.804a.99.99 0 0 0-.003-1.403.99.99 0 0 0-1.403-.003L12 10.594 5.196 3.79a.99.99 0 0 0-1.403.003.99.99 0 0 0-.003 1.403L10.594 12 3.79 18.804a.99.99 0 0 0 .003 1.403.99.99 0 0 0 1.403.003L12 13.406l6.804 6.804a.99.99 0 0 0 1.403-.003Z" fill="currentColor"></path></svg></span></button></div></div></div>
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