// ==UserScript==
// @name         Celestar Mod Menu | Celestar
// @namespace    celestarminefun.github.io
// @version      1.0
// @description  A MineFun add-on, making your MineFun experience better
// @author       thetalkingcat
// @match        *://minefun.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const script = document.createElement('script');
    script.src = 'https://celestarminefun.github.io/mods/modmenu.js';
    script.type = 'text/javascript';
    script.async = true;

    document.head.appendChild(script);
})();
