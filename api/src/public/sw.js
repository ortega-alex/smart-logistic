if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,l)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>i(s,n),o={module:{uri:n},exports:u,require:t};e[n]=Promise.all(r.map((s=>o[s]||t(s)))).then((s=>(l(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Aution-BVzqPAF1.js",revision:null},{url:"assets/aution.service-ck_K8_Mj.js",revision:null},{url:"assets/Crane-CNmZK96J.js",revision:null},{url:"assets/crane.service-DVxhzpfV.js",revision:null},{url:"assets/Customer-BBj6Kzm5.js",revision:null},{url:"assets/customer.service-DTysIvfA.js",revision:null},{url:"assets/Home-C5T6OSsm.js",revision:null},{url:"assets/index-B1FOU_Hr.js",revision:null},{url:"assets/index-B9S5XiU4.js",revision:null},{url:"assets/index-DhFeYY-4.js",revision:null},{url:"assets/index-DjMXQg2O.css",revision:null},{url:"assets/index-Fe-UtBBT.js",revision:null},{url:"assets/method-http.utility-G1MRCV-Z.js",revision:null},{url:"assets/Port-D3WH0D4j.js",revision:null},{url:"assets/port.service-6woWn53L.js",revision:null},{url:"assets/Private-DAVlFW3-.js",revision:null},{url:"assets/Profile-DD4VCYeH.js",revision:null},{url:"assets/profile.service-Wsh6YTuF.js",revision:null},{url:"assets/Quoter-85kq-TFR.js",revision:null},{url:"assets/Search-Dp0Bpc7y.js",revision:null},{url:"assets/SingIn-CgL7UijM.js",revision:null},{url:"assets/Table-BqAj_Ktx.js",revision:null},{url:"assets/type-of-customer.service-BiPXhxKc.js",revision:null},{url:"assets/type-vehicle.service-CkM71hHJ.js",revision:null},{url:"assets/TypeOfCustomer-Cc0SkaHh.js",revision:null},{url:"assets/TypeVehicle-CN6iFP_v.js",revision:null},{url:"assets/User-DwWujKwi.js",revision:null},{url:"assets/user.service-CvCtBWuV.js",revision:null},{url:"assets/validation.utility-CXE8Ejlf.js",revision:null},{url:"index.html",revision:"9323a2628bfa01c987873db3b89791c3"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"android-chrome-192x192.png",revision:"3240e7d4fa60ca9c7ba816c3150a9570"},{url:"android-chrome-512x512.png",revision:"0aa3ae02d92ac1b51f95409a9bfd30ce"},{url:"apple-touch-icon.png",revision:"d18a925647caaf02d752f043efe5c2d0"},{url:"maskable_icon.png",revision:"7366092b10f8568a7dcc13cab95d80ff"},{url:"manifest.webmanifest",revision:"5799b657385262595084398c7452f14f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
