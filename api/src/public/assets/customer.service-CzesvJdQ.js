import"./index-C_I45hcy.js";import{N as a}from"./method-http.utility-DRGzK4dc.js";const s="/customer",p=async t=>await a({path:s,method:"POST",data:t,type:"multipart"}),h=async()=>await a({path:s,method:"GET"}),i=async t=>await a({path:`${s}/${t}`,method:"GET"}),m=async t=>await a({path:`${s}/${t.id_cliente}`,method:"PUT",data:t,type:"multipart"}),n=async t=>await a({path:`${s}/pagination`,method:"POST",data:t});export{m as a,p as b,n as c,i as d,h};