if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,l)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const o=s=>i(s,n),t={module:{uri:n},exports:u,require:o};e[n]=Promise.all(r.map((s=>t[s]||o(s)))).then((s=>(l(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Aution-Db6h2Aas.js",revision:null},{url:"assets/aution.service-HvsVOb2j.js",revision:null},{url:"assets/Crane-BupeenvE.js",revision:null},{url:"assets/crane.service-CUx0IAVy.js",revision:null},{url:"assets/Customer-8KL9B7HP.js",revision:null},{url:"assets/customer.service-Cva9WcOB.js",revision:null},{url:"assets/Home-DrKGU-67.js",revision:null},{url:"assets/index-Cg6e7MPW.js",revision:null},{url:"assets/index-DjMXQg2O.css",revision:null},{url:"assets/index-fkpKFVCf.js",revision:null},{url:"assets/index-NlrsMbli.js",revision:null},{url:"assets/index-XEyxeQ8u.js",revision:null},{url:"assets/method-http.utility-DXTioPMu.js",revision:null},{url:"assets/Port-BwNrhtFw.js",revision:null},{url:"assets/port.service-Copb-ngu.js",revision:null},{url:"assets/Private-0yptBAA-.js",revision:null},{url:"assets/Profile-B1fJCapk.js",revision:null},{url:"assets/profile.service-bybNvX9e.js",revision:null},{url:"assets/Quoter-BnpfYvdS.js",revision:null},{url:"assets/Search-DbT1vi5A.js",revision:null},{url:"assets/SingIn-DewLCP_q.js",revision:null},{url:"assets/Table-CI96rAdm.js",revision:null},{url:"assets/type-of-customer.service--b4sa2Xa.js",revision:null},{url:"assets/type-vehicle.service-CbkYHUQf.js",revision:null},{url:"assets/TypeOfCustomer-D04lv80y.js",revision:null},{url:"assets/TypeVehicle-B1olMhX4.js",revision:null},{url:"assets/User-BmjMjYSo.js",revision:null},{url:"assets/user.service-Dcl-Y8FN.js",revision:null},{url:"assets/validation.utility-CXE8Ejlf.js",revision:null},{url:"index.html",revision:"2c8edc15d2ad5c1cfb73eb26ce028c8c"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"android-chrome-192x192.png",revision:"3240e7d4fa60ca9c7ba816c3150a9570"},{url:"android-chrome-512x512.png",revision:"0aa3ae02d92ac1b51f95409a9bfd30ce"},{url:"apple-touch-icon.png",revision:"d18a925647caaf02d752f043efe5c2d0"},{url:"maskable_icon.png",revision:"7366092b10f8568a7dcc13cab95d80ff"},{url:"manifest.webmanifest",revision:"5799b657385262595084398c7452f14f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
