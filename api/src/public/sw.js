if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,n)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let u={};const o=s=>i(s,l),t={module:{uri:l},exports:u,require:o};e[l]=Promise.all(r.map((s=>t[s]||o(s)))).then((s=>(n(...s),u)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/Aution-BJwjfJwY.js",revision:null},{url:"assets/aution.service-CQxlsBzs.js",revision:null},{url:"assets/Crane-DZ4gRuUi.js",revision:null},{url:"assets/Customer-C697zaqJ.js",revision:null},{url:"assets/Home-DTHLG3VR.js",revision:null},{url:"assets/index-D1AYOONJ.js",revision:null},{url:"assets/index-DrEstINF.css",revision:null},{url:"assets/index-v4TgjM65.js",revision:null},{url:"assets/method-http.utility-Yd4-WvwD.js",revision:null},{url:"assets/Port-CWXZpeZO.js",revision:null},{url:"assets/Private-XkMrUoZW.js",revision:null},{url:"assets/Profile-9mQb_nsN.js",revision:null},{url:"assets/profile.service-Cp6N78PK.js",revision:null},{url:"assets/SingIn-C1hY1EF_.js",revision:null},{url:"assets/Table-zb71sDZt.js",revision:null},{url:"assets/TypeVehicle-WzO4RkZc.js",revision:null},{url:"assets/User-daaQtxHs.js",revision:null},{url:"assets/user.service-Bv181S8u.js",revision:null},{url:"index.html",revision:"c70b087eaa2cec14c4d3e88de2514a93"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"android-chrome-192x192.png",revision:"3240e7d4fa60ca9c7ba816c3150a9570"},{url:"android-chrome-512x512.png",revision:"0aa3ae02d92ac1b51f95409a9bfd30ce"},{url:"apple-touch-icon.png",revision:"d18a925647caaf02d752f043efe5c2d0"},{url:"maskable_icon.png",revision:"7366092b10f8568a7dcc13cab95d80ff"},{url:"manifest.webmanifest",revision:"5799b657385262595084398c7452f14f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
