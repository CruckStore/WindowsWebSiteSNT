if(!self.define){let e,r={};const c=(c,s)=>(c=new URL(c+".js",s).href,r[c]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=r,document.head.appendChild(e)}else e=c,importScripts(c),r()})).then((()=>{let e=r[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(r[n])return;let d={};const o=e=>c(e,n),f={module:{uri:n},exports:d,require:o};r[n]=Promise.all(s.map((e=>f[e]||o(e)))).then((e=>(i(...e),d)))}}define(["./workbox-87098c68"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"1cd2b26edff17c5e3ac30d31e6d7aa4b"},{url:"assets/index.3ba9eddf.css",revision:null},{url:"console.js",revision:"6271abe80422cf62499c5c1f2bb9b0e8"},{url:"dycalendar.css",revision:"c3f95b0d457fc09e1fb5cb8d40082771"},{url:"dycalendar.js",revision:"11445374a1ed092479bd7133f10b7b28"},{url:"google5c2eff7d87cfc5e5.html",revision:"225b1ad0896ac46918f0740ac7d0146a"},{url:"index.html",revision:"fc80f6bc89996a99e61c6cfec55dbc42"},{url:"react-pwa.js",revision:"98c89265d0a182bed1dd329e1bff75f9"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"script.js",revision:"de7598e75e867ada699e97f190ca890a"},{url:"serviceWorker.js",revision:"7ae89bc5caf2de9b7e82b4afc0ae2574"},{url:"style.css",revision:"34741ec84f2c05e353fbe59ad370fc66"},{url:"manifest.webmanifest",revision:"d8801b9a9a617c0234933675774554fe"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));