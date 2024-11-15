import{r,j as e,O as N}from"./index-Cg6e7MPW.js";import{B as m,s as u,I as _}from"./method-http.utility-DXTioPMu.js";import{S as C}from"./Search-DbT1vi5A.js";import{a as I,b as E,h as T}from"./type-vehicle.service-CbkYHUQf.js";import{F as p,I as V}from"./index-NlrsMbli.js";import{T as k}from"./index-fkpKFVCf.js";import{S as A}from"./index-XEyxeQ8u.js";import{L as F,F as L,M as O}from"./Table-CI96rAdm.js";import"./Private-0yptBAA-.js";const b={id_tipo_vehiculo:0,tipo_vehiculo:"",estado:!0,porcentaje_costo:0},$=({typeVehicle:a,onClose:l})=>{const[c,n]=r.useState(!1),d=async o=>{try{n(!0);let s;a.id_tipo_vehiculo>0?s=await I({...a,...o}):s=await E(o),s.message?u.warning(s.message):(u.success(`Puerto ${a.id_tipo_vehiculo>0?"editada":"agregada"} correctamente`),l())}catch(s){u.error(`Error http add or edit port: ${s.message}`)}finally{n(!1)}};return e.jsxs(p,{layout:"vertical",initialValues:a,onFinish:d,children:[e.jsx(p.Item,{label:"Nombre",name:"tipo_vehiculo",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(V,{placeholder:"Ingrese el nombre"})}),e.jsx(p.Item,{label:"Costo",name:"porcentaje_costo",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(k,{className:"w-100",min:0,max:100,formatter:o=>`${o}%`})}),e.jsx(p.Item,{name:"estado",label:"Estado",valuePropName:"checked",children:e.jsx(A,{checkedChildren:"Activo",unCheckedChildren:"Inactivo"})}),e.jsx("div",{className:"text-right",children:e.jsx(m,{type:"primary",htmlType:"submit",loading:c,disabled:c,children:"Enviar"})})]})},D=()=>{const a=N(t=>t.device),l="Tipos de Vehiculos",[c,n]=r.useState(b),[d,o]=r.useState([]),[s,S]=r.useState([]),[w,h]=r.useState(!1),[x,j]=r.useState(!1),f=t=>{let i=[...s];t.trim()!==""&&(i=i.filter(v=>v.id_tipo_vehiculo===Number(t)||v.tipo_vehiculo.toLowerCase().indexOf(t.toLowerCase())!==-1)),o(i)},g=t=>{n(t),h(!0)},y=()=>{j(!0),T().then(t=>{o(t),S(t)}).catch(t=>u.error(`Error http get ports: ${t.message}`)).finally(()=>j(!1))};return r.useEffect(()=>{y()},[]),e.jsxs("div",{className:"h-100 flex flex-column p-3",children:[e.jsxs("div",{className:"flex flex-md-column gap-3 justify-between",children:[e.jsx("h3",{children:l}),e.jsx("div",{children:e.jsx(C,{onSearch:f,onReset:()=>f("")})}),e.jsx(m,{type:"primary",htmlType:"button",onClick:()=>{n(b),h(!0)},children:"Agregar"})]}),a?e.jsx(F,{dataSource:d,loading:x,renderItem:t=>e.jsxs("div",{className:"item-list",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Nombre: "})," ",t.tipo_vehiculo]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Costo: "})," ",t.porcentaje_costo,"%"]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Estado: "})," ",t.estado?"Activo":"Inactivo"]}),e.jsx(m,{type:"link",danger:!0,htmlType:"button",icon:e.jsx(_.Edit,{}),onClick:()=>g(t),children:"Editar"})]})]},t.id_tipo_vehiculo)}):e.jsx(L,{size:"small",rowClassName:(t,i)=>i%2===0?"table-row-light":"table-row-dark",pagination:{position:["none","bottomRight"],showSizeChanger:!0,pageSizeOptions:[50,100,250,500]},className:"table",loading:x,showSorterTooltip:!1,rowKey:"id_tipo_vehiculo",dataSource:d,columns:[{title:"No",dataIndex:"id_tipo_vehiculo"},{title:"Nombre",dataIndex:"tipo_vehiculo",ellipsis:!0,sorter:!0},{title:"Costo",dataIndex:"porcentaje_costo",sorter:!0,render:t=>`${t}%`},{title:"Estado",dataIndex:"estado",render:t=>e.jsx("span",{className:t?"text-success":"text-danger",children:t?"Actuvi":"Inactivo"})},{title:"Opciones",dataIndex:"operacion",width:80,render:(t,i)=>e.jsx("div",{className:"text-center",children:e.jsx(m,{style:{width:40},icon:e.jsx(_.Edit,{}),type:"primary",size:"small",onClick:()=>g(i)})})}]}),e.jsx(O,{open:w,title:e.jsxs("h3",{children:[c.id_tipo_vehiculo>0?"Editar":"Agregar"," ",l.substring(0,l.length-1)]}),footer:null,onCancel:()=>h(!1),centered:!0,destroyOnClose:!0,children:e.jsx($,{typeVehicle:c,onClose:()=>{y(),h(!1)}})})]})};export{D as TypeVehicle};
