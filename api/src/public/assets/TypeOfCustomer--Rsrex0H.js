import{r,j as e,O as v}from"./index-DkWRm4Lz.js";import{B as p,s as u,I as _}from"./method-http.utility-CK_1Lx3T.js";import{S as E}from"./Search-BM54DY3F.js";import{a as N,b as O,h as T}from"./type-of-customer.service-Br3PtzvR.js";import{F as h,I}from"./index-C_mfIPH9.js";import{S as k}from"./index-Bj-RAGiz.js";import{L as A,F,M as L}from"./Table-D4K48oKf.js";import"./Private-5wZ7spZc.js";const b={id_tipo_cliente:0,tipo_cliente:"",estado:!0},z=({typeOfCustomer:a,onClose:l})=>{const[n,o]=r.useState(!1),d=async c=>{o(!0);try{o(!0);let s;a.id_tipo_cliente>0?s=await N({...a,...c}):s=await O(c),s.message?u.warning(s.message):l()}catch(s){u.error(`Error add or edit ouoter: ${s.message}`)}finally{o(!1)}};return e.jsxs(h,{layout:"vertical",initialValues:{...a},onFinish:d,children:[e.jsx(h.Item,{label:"Nombre",name:"tipo_cliente",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(I,{placeholder:"Ingrese el nombre del tipo de cliente"})}),e.jsx(h.Item,{label:"Estado",name:"estado",valuePropName:"checked",children:e.jsx(k,{checkedChildren:"Activo",unCheckedChildren:"Inactivo"})}),e.jsx("div",{className:"text-right",children:e.jsx(p,{type:"primary",htmlType:"submit",loading:n,disabled:n,children:"Enviar"})})]})},V=()=>{const a=v(t=>t.device),l="Tipos de Clientes",[n,o]=r.useState(b),[d,c]=r.useState([]),[s,S]=r.useState([]),[w,m]=r.useState(!1),[x,f]=r.useState(!1),y=t=>{let i=[...s];t.trim()!==""&&(i=i.filter(C=>C.id_tipo_cliente===Number(t)||C.tipo_cliente.toLowerCase().indexOf(t.toLowerCase())!==-1)),c(i)},j=t=>{o(t),m(!0)},g=()=>{f(!0),T().then(t=>{c(t),S(t)}).catch(t=>u.error(`Error http get type of customers: ${t.message}`)).finally(()=>f(!1))};return r.useEffect(()=>{g()},[]),e.jsxs("div",{className:"h-100 flex flex-column p-3",children:[e.jsxs("div",{className:"flex flex-md-column gap-3 justify-between",children:[e.jsx("h3",{children:l}),e.jsx("div",{children:e.jsx(E,{onSearch:y,onReset:()=>y("")})}),e.jsx(p,{type:"primary",htmlType:"button",onClick:()=>{o(b),m(!0)},children:"Agregar"})]}),a?e.jsx(A,{dataSource:d,loading:x,renderItem:t=>e.jsxs("div",{className:"item-list",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Nombre: "})," ",t.id_tipo_cliente]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Estado: "})," ",t.estado?"Activo":"Inactivo"]}),e.jsx(p,{type:"link",danger:!0,htmlType:"button",icon:e.jsx(_.Edit,{}),onClick:()=>j(t),children:"Editar"})]})]},t.id_tipo_cliente)}):e.jsx(F,{size:"small",rowClassName:(t,i)=>i%2===0?"table-row-light":"table-row-dark",pagination:{position:["none","bottomRight"],showSizeChanger:!0,pageSizeOptions:[50,100,250,500]},className:"table",loading:x,showSorterTooltip:!1,rowKey:"id_tipo_cliente",dataSource:d,columns:[{title:"No",dataIndex:"id_tipo_cliente"},{title:"Nombre",dataIndex:"tipo_cliente",ellipsis:!0,sorter:!0},{title:"Estado",dataIndex:"estado",render:t=>e.jsx("span",{className:t?"text-success":"text-danger",children:t?"Activo":"Inactivo"})},{title:"Opciones",width:80,render:(t,i)=>e.jsx("div",{className:"text-center",children:e.jsx(p,{style:{width:40},icon:e.jsx(_.Edit,{}),type:"primary",size:"small",onClick:()=>j(i)})})}]}),e.jsx(L,{open:w,title:e.jsxs("h3",{children:[n.id_tipo_cliente>0?"Editar":"Agregar"," ",l.substring(0,l.length-1)]}),footer:null,onCancel:()=>m(!1),centered:!0,destroyOnClose:!0,children:e.jsx(z,{typeOfCustomer:n,onClose:()=>{g(),m(!1)}})})]})};export{V as TypeOfCustomer};