import{aH as e}from"./index-BJCXvgwd.js";import{N as a}from"./method-http.utility-Cwrgy71v.js";const d=t=>{for(t=parseFloat(String(t)).toFixed(2);/(\d+)(\d{3})/.test(t);)t=String(t).replace(/(\d+)(\d{3})/,"$1,$2");return t},c=(t,s)=>e(t??void 0).format(s),o="/port",h=async()=>await a({path:o,method:"GET"}),i=async t=>await a({path:o,method:"POST",data:t}),m=async t=>await a({path:`${o}/${t.id_puerto}`,method:"PUT",data:t});export{m as a,i as b,d as c,c as g,h};
