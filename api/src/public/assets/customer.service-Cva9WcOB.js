import"./index-Cg6e7MPW.js";import{N as a}from"./method-http.utility-DXTioPMu.js";const s="/customer",p=async t=>await a({path:s,method:"POST",data:t,type:"multipart"}),h=async()=>await a({path:s,method:"GET"}),i=async t=>await a({path:`${s}/${t}`,method:"GET"}),m=async t=>await a({path:`${s}/${t.id_cliente}`,method:"PUT",data:t,type:"multipart"}),n=async t=>await a({path:`${s}/pagination`,method:"POST",data:t});export{m as a,p as b,n as c,i as d,h};
