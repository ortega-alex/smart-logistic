if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const o=s=>i(s,n),t={module:{uri:n},exports:u,require:o};e[n]=Promise.all(l.map((s=>t[s]||o(s)))).then((s=>(r(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Aution-O7NNAvWN.js",revision:null},{url:"assets/aution.service-ZfNdpYHZ.js",revision:null},{url:"assets/Crane-C5TInkaM.js",revision:null},{url:"assets/crane.service-BduEAqV-.js",revision:null},{url:"assets/Customer-Du9B89WW.js",revision:null},{url:"assets/customer.service-C9wCWsnd.js",revision:null},{url:"assets/CustomerOrderDetail-D10D2Emg.js",revision:null},{url:"assets/DownOutlined-CODLCnfK.js",revision:null},{url:"assets/fade-R8mJI5-o.js",revision:null},{url:"assets/ForgotPass-C89s4UFr.js",revision:null},{url:"assets/Home-C5-yzuNJ.js",revision:null},{url:"assets/import-history.service-lmvZ93oN.js",revision:null},{url:"assets/import-state.service-BH5L0W2T.js",revision:null},{url:"assets/index-BcXGHYZS.js",revision:null},{url:"assets/index-BKdQ44jl.js",revision:null},{url:"assets/index-CCcnvYN1.js",revision:null},{url:"assets/index-CfEI7y9b.js",revision:null},{url:"assets/index-CWLbX5eI.js",revision:null},{url:"assets/index-DNSfZAjo.js",revision:null},{url:"assets/index-DS8sFBs_.js",revision:null},{url:"assets/index-DwO6ZV5d.css",revision:null},{url:"assets/index-DZj02Egy.js",revision:null},{url:"assets/index-eXAvDtw2.js",revision:null},{url:"assets/index-fBuO0l8w.js",revision:null},{url:"assets/index-O_xYGJnl.js",revision:null},{url:"assets/logo-CRNJV_XG.js",revision:null},{url:"assets/method-http.utility-CM8CHeIw.js",revision:null},{url:"assets/Notification-BI9cwgRy.js",revision:null},{url:"assets/Port-C-ntow3z.js",revision:null},{url:"assets/port.service-CP4p7OAx.js",revision:null},{url:"assets/Private-DSJudlqf.js",revision:null},{url:"assets/PrivateCustomer-BcejMn6l.js",revision:null},{url:"assets/Profile-BfGtrGCc.js",revision:null},{url:"assets/profile.service-BwObWhY-.js",revision:null},{url:"assets/progress-CrTmyKDp.js",revision:null},{url:"assets/Quoter-BTwqOoio.js",revision:null},{url:"assets/row-BIFJ6Q4x.js",revision:null},{url:"assets/Search-Cy_uaIq-.js",revision:null},{url:"assets/SingIn-BQ5Pm6yI.js",revision:null},{url:"assets/SingInCustomer-BfuRg7sv.js",revision:null},{url:"assets/Table-CYsj1JvR.js",revision:null},{url:"assets/type-of-customer.service-Cya2gNst.js",revision:null},{url:"assets/type-vehicle.service-xkQxOt2N.js",revision:null},{url:"assets/TypeOfCustomer-CYvqFFDg.js",revision:null},{url:"assets/TypeVehicle-Bd61AhyO.js",revision:null},{url:"assets/User-CGee--4q.js",revision:null},{url:"assets/user.service-BOcMb7XX.js",revision:null},{url:"assets/Utilityes.d-EXBqBskY.js",revision:null},{url:"assets/Vehicles-tzwUeUr9.js",revision:null},{url:"assets/vehicles.service-CBPKl_Fy.js",revision:null},{url:"assets/ViewFiles-D_ew37xf.js",revision:null},{url:"firebase-messaging-sw.js",revision:"1327ac17f63b0007b0e31375baa39bee"},{url:"index.html",revision:"e2eaf19d56116660060854258c1cc0d5"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"android-chrome-192x192.png",revision:"3240e7d4fa60ca9c7ba816c3150a9570"},{url:"android-chrome-512x512.png",revision:"0aa3ae02d92ac1b51f95409a9bfd30ce"},{url:"apple-touch-icon.png",revision:"d18a925647caaf02d752f043efe5c2d0"},{url:"maskable_icon.png",revision:"7366092b10f8568a7dcc13cab95d80ff"},{url:"manifest.webmanifest",revision:"5799b657385262595084398c7452f14f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
