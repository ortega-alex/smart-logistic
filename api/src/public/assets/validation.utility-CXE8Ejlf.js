const m=t=>{if(!t||String(t).trim()==="")return"CUI vacío";if(!/^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/.test(t))return"CUI con formato inválido";t=String(t).replace(/\s/,"").replace(/ /g,"");const r=parseInt(t.substring(9,11),10),o=parseInt(t.substring(11,13)),c=t.substring(0,8),s=parseInt(t.substring(8,9)),n=[17,8,16,16,13,14,19,8,24,21,9,30,32,21,8,17,14,5,11,11,7,17];if(r===0||o===0)return"CUI con código de municipio o departamento inválido.";if(r>n.length)return"CUI con código de departamento inválido.";if(o>n[r-1])return"CUI con código de municipio inválido.";let i=0;for(let e=0;e<c.length;e++)i+=Number(c[e])*(e+2);return i%11!==s?"No valido":null},p=t=>{if(t.toUpperCase()==="CF")return null;if(!t||String(t).trim()==="")return"NIT vacío";if(!/^[0-9]+(-?[0-9kK])?$/.test(t))return"Nit con formato invalido";t=String(t).replace(/-/,"");const r=t.length-1,o=t.substring(0,r),c=t.substring(r,r+1).toLowerCase();let s=o.length+1,n=0;for(let e=0;e<o.length;e++){const a=o.substring(e,e+1),g=parseInt(a,10);n+=g*s,s=s-1}const i=(11-n%11)%11,u=i===10?"k":i.toString();return/\s/.test(t)||t.includes("-")?"No se aceptan espacios ni guiones.":c===u?null:"NIT Inválido."},d=t=>!t||String(t).trim()===""?"Correo vacío":/^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/.test(t.trim())?null:"Correo no valido.",f=t=>!t||String(t).trim()===""?"Número de teléfono vacio":/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2,6}$/im.test(t)?null:"Número de teléfono no es valido";export{m as a,d as m,p as n,f as p};