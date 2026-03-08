// ==UserScript==
// @name         Keystrokes Mod | Celestar
// @author       thetalkingcat
// @description  A keystrokes mod for MineFun.io
// @namespace    celestarminefun.github.io
// @version      1.0
// @match        *://minefun.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const script = document.createElement('script');
    script.src = 'https://celestarminefun.github.io/mods/keystrokes.js';
    script.type = 'text/javascript';
    script.async = true;

    document.head.appendChild(script);
})();
