if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>i(s,n),o={module:{uri:n},exports:u,require:t};e[n]=Promise.all(l.map((s=>o[s]||t(s)))).then((s=>(r(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Aution-DlrI54eQ.js",revision:null},{url:"assets/aution.service-xovP4dk8.js",revision:null},{url:"assets/Crane-Bk9KtQtj.js",revision:null},{url:"assets/crane.service-iAeECKub.js",revision:null},{url:"assets/Customer-UB30NGQa.js",revision:null},{url:"assets/customer.service-C1FUs8Oh.js",revision:null},{url:"assets/Home-DSEpM7we.js",revision:null},{url:"assets/index-B5MkH4Rf.js",revision:null},{url:"assets/index-BrEFXvTh.js",revision:null},{url:"assets/index-CMWa6IZF.js",revision:null},{url:"assets/index-DjMXQg2O.css",revision:null},{url:"assets/index-gWLPH9g9.js",revision:null},{url:"assets/method-http.utility-xxzIJd5f.js",revision:null},{url:"assets/Port-DJ73GqZf.js",revision:null},{url:"assets/port.service--gdol6R4.js",revision:null},{url:"assets/Private-BHZhaNq0.js",revision:null},{url:"assets/Profile-B8kXEh17.js",revision:null},{url:"assets/profile.service-sxjdKcfL.js",revision:null},{url:"assets/Quoter-BlS1HbkA.js",revision:null},{url:"assets/Search-C8GM3A6B.js",revision:null},{url:"assets/SingIn-BC4eDpvv.js",revision:null},{url:"assets/Table-D8RmbYQ4.js",revision:null},{url:"assets/type-of-customer.service-CAguK0Cb.js",revision:null},{url:"assets/type-vehicle.service-DT1kbNW6.js",revision:null},{url:"assets/TypeOfCustomer-g6ihA706.js",revision:null},{url:"assets/TypeVehicle-57Zs_LoU.js",revision:null},{url:"assets/User-DJYy_H8B.js",revision:null},{url:"assets/user.service-BEcJ7e4P.js",revision:null},{url:"assets/Utilityes.d-EXBqBskY.js",revision:null},{url:"assets/validation.utility-CXE8Ejlf.js",revision:null},{url:"index.html",revision:"89dd3bde4485ed893d3f957b34704f28"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"android-chrome-192x192.png",revision:"3240e7d4fa60ca9c7ba816c3150a9570"},{url:"android-chrome-512x512.png",revision:"0aa3ae02d92ac1b51f95409a9bfd30ce"},{url:"apple-touch-icon.png",revision:"d18a925647caaf02d752f043efe5c2d0"},{url:"maskable_icon.png",revision:"7366092b10f8568a7dcc13cab95d80ff"},{url:"manifest.webmanifest",revision:"5799b657385262595084398c7452f14f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
