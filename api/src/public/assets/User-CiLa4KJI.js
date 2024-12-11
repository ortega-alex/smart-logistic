import{r as o,j as e,v as y}from"./index-DeRs25tb.js";import{B as x,I as N}from"./Icon-ZCyfFCep.js";import{a as E,b as S,c as v}from"./user.service-Dnl2prAi.js";import{V as f}from"./Utilityes.d-EXBqBskY.js";import{p as _,m as C}from"./validation.utility-CXE8Ejlf.js";import{h as U}from"./profile.service-tSHmnKjB.js";import{s as b}from"./method-http.utility-CuofCWHh.js";import{F as n}from"./index-C8MC8u8w.js";import{I as h}from"./index-gyB3Elxo.js";import{S as k,F as P}from"./Table-B2h2cI4i.js";import{S as T}from"./index-CTn83WAl.js";import{L as A}from"./index-JgT2oeId.js";import{M as F}from"./index-CWRTqrJg.js";import"./row-Dx3yH235.js";import"./fuctions.utility-D0ENTGxM.js";import"./Private-Bb13mkBg.js";const w={id_usuario:0,correo:"",estado:!0,nombre:"",telefono:"",usuario:""},M=({user:d,onClose:c})=>{const[p,j]=o.useState([]),[m,u]=o.useState(!1),g=async s=>{try{u(!0);let t;d.id_usuario>0?t=await E({...d,...s}):t=await S(s),t.message?b.warning(t.message):c()}catch(t){b.error(`Error http add user: ${t.message}`)}finally{u(!1)}},l=async(s,t)=>{let i=null;if(t&&t.trim()===""?i="El campo es obligatorio":s===f.PhoneNumber?i=await _(t):s===f.Mail&&(i=await C(t)),i)throw new Error(i)};return o.useEffect(()=>{U().then(s=>j(s)).catch(s=>b.error(`Erro http get profiles: ${s.message}`))},[]),e.jsxs(n,{layout:"vertical",initialValues:d,onFinish:g,children:[e.jsx(n.Item,{label:"Nombre completo",name:"nombre",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(h,{placeholder:"Ingrese el nombre"})}),e.jsx(n.Item,{label:"Tipo de perfil",name:"id_perfil",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(k,{className:"w-100",placeholder:"Seleccione una opción",options:p.filter(s=>s.estado).map(s=>({value:s.id_perfil,label:s.perfil}))})}),e.jsx(n.Item,{label:"Teléfono",name:"telefono",className:"flex-1",rules:[{required:!0,validator:(s,t)=>l(f.PhoneNumber,t)}],children:e.jsx(h,{placeholder:"Ingrese un número de teléfono"})}),e.jsx(n.Item,{label:"Correo",name:"correo",className:"flex-1",rules:[{required:!0,validator:(s,t)=>l(f.Mail,t)}],children:e.jsx(h,{placeholder:"Ingrese un email"})}),e.jsx(n.Item,{label:"Usuario",name:"usuario",className:"flex-1",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(h,{placeholder:"Ingrese un usuario",disabled:d.id_usuario>0})}),e.jsx(n.Item,{name:"estado",label:"Estado",valuePropName:"checked",children:e.jsx(T,{checkedChildren:"Activo",unCheckedChildren:"Inactivo"})}),e.jsx("div",{className:"text-right",children:e.jsx(x,{type:"primary",htmlType:"submit",loading:m,disabled:m,children:"Enviar"})})]})},Y=()=>{const d=y(r=>r.device),c="Usuarios",[p,j]=o.useState([]),[m,u]=o.useState(w),[g,l]=o.useState(!1),[s,t]=o.useState(!1),i=()=>{t(!0),v().then(r=>j(r)).catch(r=>`Error http get users: ${r.message}`).finally(()=>t(!1))},I=r=>{var a;u({...r,id_perfil:(a=r.perfil)==null?void 0:a.id_perfil}),l(!0)};return o.useEffect(()=>{i()},[]),e.jsxs("div",{className:"h-100 flex flex-column p-3",children:[e.jsxs("div",{className:"flex flex-md-column gap-3 justify-between",children:[e.jsx("h3",{children:c}),e.jsx("div",{children:e.jsx(h.Search,{placeholder:"Buscar",onSearch:()=>{},enterButton:!0})}),e.jsx(x,{type:"primary",htmlType:"button",onClick:()=>{u(w),l(!0)},children:"Agregar"})]}),d?e.jsx(A,{dataSource:p,renderItem:r=>{var a;return e.jsxs("div",{className:"item-list",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Nombre: "})," ",r.nombre]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Perfil: "})," ",(a=r.perfil)==null?void 0:a.perfil]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Usuario: "})," ",r.usuario]})]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Estado: "})," ",r.estado?"Activo":"Inactivo"]}),e.jsx(x,{type:"link",danger:!0,htmlType:"button",icon:e.jsx(N.Edit,{}),onClick:()=>I(r),children:"Editar"})]})]},r.id_usuario)}}):e.jsx(P,{size:"small",rowClassName:(r,a)=>a%2===0?"table-row-light":"table-row-dark",pagination:{position:["none","bottomRight"],showSizeChanger:!0,pageSizeOptions:[50,100,250,500]},className:"table",loading:s,showSorterTooltip:!1,rowKey:"id_usuario",dataSource:p,columns:[{title:"No",dataIndex:"id_usuario"},{title:"Nombre",dataIndex:"nombre",ellipsis:!0,sorter:!0},{title:"Perfil",dataIndex:"perfil",ellipsis:!0,sorter:!0,render:r=>e.jsx("span",{children:r==null?void 0:r.perfil})},{title:"Usuario",dataIndex:"usuario",sorter:!0},{title:"Estado",dataIndex:"estado",render:r=>e.jsx("span",{className:r?"text-success":"text-danger",children:r?"Actuvi":"Inactivo"})},{title:"Opciones",dataIndex:"operacion",width:80,render:(r,a)=>e.jsx("div",{className:"text-center",children:e.jsx(x,{style:{width:40},icon:e.jsx(N.Edit,{}),type:"primary",size:"small",onClick:()=>I(a)})})}]}),e.jsx(F,{open:g,title:e.jsxs("h3",{children:[m.id_usuario>0?"Editar":"Agregar"," ",c.substring(0,c.length-1)]}),footer:null,onCancel:()=>l(!1),centered:!0,destroyOnClose:!0,children:e.jsx(M,{user:m,onClose:()=>{i(),l(!1)}})})]})};export{Y as User};