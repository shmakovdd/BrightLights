!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t),t.default=n.p+"cc109e63dc099ca888ddd8f7338cf425.mp3"},function(e,t,n){"use strict";n.r(t);n(0);n(1),function(){var e,t,n=document.querySelector(".slider__wrapper"),r=document.querySelector(".slider__list"),o=document.querySelectorAll(".slider__item"),i=document.querySelector(".tours__arrow-right"),c=document.querySelector(".tours__arrow-left");i.addEventListener("click",(function(){t=-1,r.style.transform="translateX(-".concat(e,"px)")})),setTimeout((function(){r.addEventListener("transitionend",(function(){-1===t&&(r.appendChild(r.firstElementChild),r.style.transition="none",r.style.transform="translate(0)",setTimeout((function(){r.style.transition="all .4s"})))}))}),1e3),c.addEventListener("click",(function(){t=1,r.style.transition="none",r.style.transform="translateX(-".concat(e,"px)"),r.prepend(r.lastElementChild),setTimeout((function(){r.style.transition="all .4s",r.style.transform="translateX(0)"}),100)})),function(){var t=parseFloat(getComputedStyle(r.firstChild).getPropertyValue("margin-right")),i=n.offsetWidth,c="".concat((i-2*parseFloat(t))/3,"px");window.innerWidth<961&&(c="".concat((i-parseFloat(t))/2,"px")),window.innerWidth<560&&(c="".concat(i,"px"));for(var l=0;l<o.length;l++)o[l].style.width=c;e=t+parseFloat(c),r.style.width="".concat(e*o.length,"px")}()}(),function(){var e=document.querySelector(".burger"),t=document.querySelector(".hidden"),n=document.querySelector("body"),r=document.querySelectorAll("[data-hidden='hidden']");function o(){e.classList.toggle("burger--active"),n.classList.toggle("body--active"),t.classList.toggle("hidden--active")}console.log(r),t.addEventListener("click",(function(e){console.log(e.target)})),r.forEach((function(e){e.addEventListener("click",o)})),e.addEventListener("click",o)}(),function(){document.querySelector(".audio");var e=document.querySelector(".audiobar__play"),t=new Audio("/src/images/content/blind.mp3");e.addEventListener("click",(function(){t.play()}))}()}]);