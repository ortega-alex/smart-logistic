if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,n)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let o={};const t=s=>i(s,l),u={module:{uri:l},exports:o,require:t};e[l]=Promise.all(r.map((s=>u[s]||t(s)))).then((s=>(n(...s),o)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/Aution-C4ww7bB1.js",revision:null},{url:"assets/aution.service-Cwp0IzNc.js",revision:null},{url:"assets/Crane-BL53oatr.js",revision:null},{url:"assets/Customer-D2eBQhKP.js",revision:null},{url:"assets/Home-fyp6759y.js",revision:null},{url:"assets/index-DQcowdgb.js",revision:null},{url:"assets/index-DrEstINF.css",revision:null},{url:"assets/index-DZpWEe9a.js",revision:null},{url:"assets/method-http.utility-Ctj9xTxi.js",revision:null},{url:"assets/Port-BVOvqxSW.js",revision:null},{url:"assets/Private-QHw4bS4s.js",revision:null},{url:"assets/Profile-BzHf-QBM.js",revision:null},{url:"assets/profile.service-BdVa5Srp.js",revision:null},{url:"assets/SingIn-lv575wDE.js",revision:null},{url:"assets/Table-Cmr0fV_n.js",revision:null},{url:"assets/TypeVehicle-DDT07_x9.js",revision:null},{url:"assets/User-GMSZtacJ.js",revision:null},{url:"assets/user.service-Dawv7y0W.js",revision:null},{url:"index.html",revision:"6100c9becd9369b09f916f2bbf53fa8d"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"android-chrome-192x192.png",revision:"3240e7d4fa60ca9c7ba816c3150a9570"},{url:"android-chrome-512x512.png",revision:"0aa3ae02d92ac1b51f95409a9bfd30ce"},{url:"apple-touch-icon.png",revision:"d18a925647caaf02d752f043efe5c2d0"},{url:"maskable_icon.png",revision:"7366092b10f8568a7dcc13cab95d80ff"},{url:"manifest.webmanifest",revision:"5799b657385262595084398c7452f14f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
