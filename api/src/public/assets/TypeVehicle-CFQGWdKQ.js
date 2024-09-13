import{r as a,j as e,O as E}from"./index-CmnY-2zJ.js";import{N as x,B as h,s as p,I as _}from"./method-http.utility-Ctcdl8Wi.js";import{F as m,I as w}from"./index-BRusVNPc.js";import{a as S,L as T,F as N,M as I}from"./Table-BkgG8NCi.js";import"./Private-UbTsyjO7.js";const b={id_tipo_vehiculo:0,tipo_vehiculo:"",estado:!0},j="/type-vehicle",C=async()=>await x({path:j,method:"GET"}),V=async s=>await x({path:j,method:"POST",data:s}),k=async s=>await x({path:`${j}/${s.id_tipo_vehiculo}`,method:"PUT",data:s}),A=({typeVehicle:s,onClose:o})=>{const[r,l]=a.useState(!1),c=async n=>{try{l(!0);let i;s.id_tipo_vehiculo>0?i=await k({...s,...n}):i=await V(n),i.message?p.warning(i.message):(p.success(`Puerto ${s.id_tipo_vehiculo>0?"editada":"agregada"} correctamente`),o())}catch(i){p.error(`Error http add or edit port: ${i.message}`)}finally{l(!1)}};return e.jsxs(m,{layout:"vertical",initialValues:s,onFinish:c,children:[e.jsx(m.Item,{label:"Nombre",name:"tipo_vehiculo",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(w,{placeholder:"Ingrese el nombre"})}),e.jsx(m.Item,{name:"estado",label:"Estado",valuePropName:"checked",children:e.jsx(S,{checkedChildren:"Activo",unCheckedChildren:"Inactivo"})}),e.jsx("div",{className:"text-right",children:e.jsx(h,{type:"primary",htmlType:"submit",loading:r,disabled:r,children:"Enviar"})})]})},L=()=>{const s=E(t=>t.device),o="Tipos de Vehiculos",[r,l]=a.useState(b),[c,n]=a.useState([]),[i,d]=a.useState(!1),[g,y]=a.useState(!1),v=t=>{l(t),d(!0)},f=()=>{y(!0),C().then(t=>n(t)).catch(t=>p.error(`Error http get ports: ${t.message}`)).finally(()=>y(!1))};return a.useEffect(()=>{f()},[]),e.jsxs("div",{className:"h-100 flex flex-column p-3",children:[e.jsxs("div",{className:"flex flex-md-column gap-3 justify-between",children:[e.jsx("h3",{children:o}),e.jsx("div",{children:e.jsx(w.Search,{placeholder:"Buscar",onSearch:()=>{},enterButton:!0})}),e.jsx(h,{type:"primary",htmlType:"button",onClick:()=>{l(b),d(!0)},children:"Agregar"})]}),s?e.jsx(T,{dataSource:c,loading:g,renderItem:t=>e.jsxs("div",{className:"item-list",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Nombre: "})," ",t.tipo_vehiculo]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Estado: "})," ",t.estado?"Activo":"Inactivo"]}),e.jsx(h,{type:"link",danger:!0,htmlType:"button",icon:e.jsx(_.Edit,{}),onClick:()=>v(t),children:"Editar"})]})]},t.id_tipo_vehiculo)}):e.jsx(N,{size:"small",rowClassName:(t,u)=>u%2===0?"table-row-light":"table-row-dark",pagination:{position:["none","bottomRight"],showSizeChanger:!0,pageSizeOptions:[50,100,250,500]},className:"table",loading:g,showSorterTooltip:!1,rowKey:"id_tipo_vehiculo",dataSource:c,columns:[{title:"No",dataIndex:"id_tipo_vehiculo"},{title:"Nombre",dataIndex:"tipo_vehiculo",ellipsis:!0,sorter:!0},{title:"Estado",dataIndex:"estado",render:t=>e.jsx("span",{className:t?"text-success":"text-danger",children:t?"Actuvi":"Inactivo"})},{title:"Opciones",dataIndex:"operacion",width:80,render:(t,u)=>e.jsx("div",{className:"text-center",children:e.jsx(h,{style:{width:40},icon:e.jsx(_.Edit,{}),type:"primary",size:"small",onClick:()=>v(u)})})}]}),e.jsx(I,{open:i,title:e.jsxs("h3",{children:[r.id_tipo_vehiculo>0?"Editar":"Agregar"," ",o.substring(0,o.length-1)]}),footer:null,onCancel:()=>d(!1),centered:!0,destroyOnClose:!0,children:e.jsx(A,{typeVehicle:r,onClose:()=>{f(),d(!1)}})})]})};export{L as TypeVehicle};
