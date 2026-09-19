// ==UserScript==
// @name         Celestar Mod Menu v2
// @namespace    https://celestarminefun.github.io
// @version      2.1.0
// @description  Most advanced and feature-rich mod menu for MineFun.io
// @author       Celestar / thetalkingcat (@thetalkingcat8089)
// @match        https://minefun.io/*
// @match        https://sandbox.minefun.io/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      celestarminefun.github.io
// @connect      minefun.io
// @connect      sandbox.minefun.io
// ==/UserScript==

(function() {
    'use strict';
    const script = document.createElement('script');
    script.src = 'https://celestarminefun.github.io/celestar-mod-menu-v2.js';
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
})();
