if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,l)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const o=s=>i(s,n),t={module:{uri:n},exports:u,require:o};e[n]=Promise.all(r.map((s=>t[s]||o(s)))).then((s=>(l(...s),u)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/Aution-CsKoyUrh.js",revision:null},{url:"assets/aution.service-C6wZZJjZ.js",revision:null},{url:"assets/Crane-CsEptPsv.js",revision:null},{url:"assets/crane.service-D1AczQ14.js",revision:null},{url:"assets/Customer-MQtFWl7u.js",revision:null},{url:"assets/customer.service-NHd4Dtgr.js",revision:null},{url:"assets/Home-ByeeN-3Z.js",revision:null},{url:"assets/index-BgKZLIBx.js",revision:null},{url:"assets/index-BiKrhPYi.js",revision:null},{url:"assets/index-BnxruwL2.css",revision:null},{url:"assets/index-BXumeLIB.js",revision:null},{url:"assets/index-CGs_ZjVa.js",revision:null},{url:"assets/method-http.utility-lkVWYHRi.js",revision:null},{url:"assets/Port-CoERsK8F.js",revision:null},{url:"assets/port.service-qwfx21y_.js",revision:null},{url:"assets/Private-D3zam9Kl.js",revision:null},{url:"assets/Profile-gWvMEbpK.js",revision:null},{url:"assets/profile.service-Dsr95iVT.js",revision:null},{url:"assets/Quoter-B-Fsve5x.js",revision:null},{url:"assets/Search-YsuBkCy3.js",revision:null},{url:"assets/SingIn-kIIJzKOU.js",revision:null},{url:"assets/Table-B6Xee3V1.js",revision:null},{url:"assets/type-of-customer.service-DkSoE1QJ.js",revision:null},{url:"assets/type-vehicle.service-Bf-e89OY.js",revision:null},{url:"assets/TypeOfCustomer-DV4IITR_.js",revision:null},{url:"assets/TypeVehicle-FC08UZhX.js",revision:null},{url:"assets/User-F0gK5PuG.js",revision:null},{url:"assets/user.service-CiygyGxT.js",revision:null},{url:"assets/validation.utility-BMdB_7SG.js",revision:null},{url:"index.html",revision:"62e9ee3754462614d83a947230fc284b"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"android-chrome-192x192.png",revision:"3240e7d4fa60ca9c7ba816c3150a9570"},{url:"android-chrome-512x512.png",revision:"0aa3ae02d92ac1b51f95409a9bfd30ce"},{url:"apple-touch-icon.png",revision:"d18a925647caaf02d752f043efe5c2d0"},{url:"maskable_icon.png",revision:"7366092b10f8568a7dcc13cab95d80ff"},{url:"manifest.webmanifest",revision:"5799b657385262595084398c7452f14f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
