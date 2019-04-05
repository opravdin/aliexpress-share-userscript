// ==UserScript==
// @name         Aliexpress short link share button
// @namespace    opravdin.aliexpress
// @version      1.0
// @description  Adds short link share button on Aliexpress without annoying query params. Check it out near item raiting & order counter!
// @homepageURL  https://github.com/opravdin/aliexpress-share-userscript
// @author       Oleg Pravdin aka opravdin
// @match        *://*.aliexpress.com/item/*
// @match        *://aliexpress.com/item/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Settings
    var hostname = 'aliexpress.com'
    // uncomment line below to copy localized host instead of global
    // hostname = window.location.host
    var buttonText = `Copy product link`
    var buttonOnCopyText = `Copied?`


    const regex = /\/item\/(?:[^\/]*)\/([^?]*)/gm;
    let m;
    if ((m = regex.exec(window.location.href)) !== null) {
        // Appending CSS rules
        var css = document.createElement("style")
        css.type = "text/css"
        css.innerHTML = `.opravdin.share-link-button {
float: right;
border: 1px solid #e9e9e9;
padding: 0 10px;
margin: 0 20px;
border-radius: 3px;
cursor: pointer;}";`
        document.body.appendChild(css)

        // Generating button
        var mybtn = document.createElement("span")
        mybtn.className = "opravdin share-link-button"
        mybtn.innerHTML = buttonText
        document.getElementsByClassName("product-star-order")[0].appendChild(mybtn);

        // Adding handler
        var handler = function (event) {
            var link = `https://${hostname}/item/-/${m[1]}`
            const el = document.createElement('textarea');
            el.value = link;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            mybtn.innerHTML = buttonOnCopyText
            setTimeout(function () {mybtn.innerHTML = buttonText}, 500)
        }
        mybtn.addEventListener("click", handler)
    }
})();