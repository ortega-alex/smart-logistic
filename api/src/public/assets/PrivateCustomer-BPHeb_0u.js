const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-iG3EU6rF.js","./index-DeRs25tb.js","./index-B0k3wm-k.css","./Icon-ZCyfFCep.js","./Search-DWezstAv.js","./index-gyB3Elxo.js","./method-http.utility-CuofCWHh.js","./format.utility-DkVYUxV5.js","./vehicles.service-M8jK2tQK.js","./index-JgT2oeId.js","./Table-B2h2cI4i.js","./fuctions.utility-D0ENTGxM.js","./row-Dx3yH235.js","./index-BnQTAwiB.js","./progress-D11ttJlT.js","./CustomerOrderDetail-D42Fbfop.js","./Vehicles-De_A1J7k.js","./index-jHC0o-m8.js"])))=>i.map(i=>d[i]);
import{r as o,A as c,v as d,u as p,a as x,j as e,L as h,b as a,D as v,E as i,N as j,G as E,p as R,F as _}from"./index-DeRs25tb.js";import{i as g,B as C,D as N,A as O,c as f}from"./fuctions.utility-D0ENTGxM.js";import{I as l}from"./Icon-ZCyfFCep.js";const D=o.lazy(()=>c(()=>import("./index-iG3EU6rF.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url).then(s=>({default:s.CustomerOrders}))),S=o.lazy(()=>c(()=>import("./CustomerOrderDetail-D42Fbfop.js"),__vite__mapDeps([15,1,2,3,16,17,7,6,8,10,11,5,14]),import.meta.url).then(s=>({default:s.CustomerOrderDetail}))),y=()=>{const s=d(t=>t.session_customer),n=p(),m=x(),u=t=>{t.key==="1"&&(n(E()),m(`/${R.SING_IN_CUSTOMER}`,{replace:!0}))},r=()=>{const t=f();n(_(t))};return o.useEffect(()=>(window.addEventListener("resize",r),r(),()=>window.removeEventListener("resize",r)),[]),e.jsxs("div",{className:"flex flex-column vh-100",children:[e.jsxs("nav",{className:"navbar bg-primary",children:[e.jsx("div",{className:"flex",style:{height:80},children:e.jsx(h,{to:`/${a.PRIVATE_CUSTOMER}`,className:"navbar-brand",children:e.jsx("img",{src:g,height:"80",className:"d-inline-block align-top",alt:""})})}),e.jsxs("div",{className:"navbar-nav",children:[e.jsx(C,{count:"1",className:"mr-3",children:e.jsx(l.Bell,{color:"white",size:32})}),e.jsx(N,{menu:{items:[{key:"1",label:e.jsxs("span",{children:[e.jsx(l.Logout,{})," Cerrar Sesión"]})}],onClick:u},placement:"bottomLeft",arrow:!0,children:e.jsx(O,{gap:3,size:50,className:"bg-secondary",children:String(s.cliente).substring(0,2).toUpperCase()})})]})]}),e.jsxs(v,{children:[e.jsx(i,{path:"/",element:e.jsx(j,{to:a.CUSTOMER_ORDER})}),e.jsx(i,{path:a.CUSTOMER_ORDER,element:e.jsx(D,{})}),e.jsx(i,{path:`${a.CUSTOMER_ORDER_DETAIL}/:id`,element:e.jsx(S,{})})]})]})};export{y as PrivateCustomer};
