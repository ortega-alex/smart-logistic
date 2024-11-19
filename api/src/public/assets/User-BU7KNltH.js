import{r as l,j as e,O as y}from"./index-DUTae07C.js";import{s as b,B as f,I as N}from"./method-http.utility-DTRIZLiH.js";import{a as E,b as S,c as v}from"./user.service-D8Xocg4I.js";import{V as x}from"./Utilityes.d-EXBqBskY.js";import{p as _,m as C}from"./validation.utility-CXE8Ejlf.js";import{h as U}from"./profile.service-B-TBrMhv.js";import{F as n}from"./index-ClDAYrEx.js";import{I as h}from"./index-DmcKSry_.js";import{S as k,L as P,F as T,M as A}from"./Table-DFuZ754j.js";import{S as F}from"./index-DoxCpW_e.js";import"./Private-XhUdaezg.js";const w={id_usuario:0,correo:"",estado:!0,nombre:"",telefono:"",usuario:""},M=({user:d,onClose:c})=>{const[p,j]=l.useState([]),[m,u]=l.useState(!1),g=async r=>{try{u(!0);let t;d.id_usuario>0?t=await E({...d,...r}):t=await S(r),t.message?b.warning(t.message):c()}catch(t){b.error(`Error http add user: ${t.message}`)}finally{u(!1)}},o=async(r,t)=>{let i=null;if(t&&t.trim()===""?i="El campo es obligatorio":r===x.PhoneNumber?i=await _(t):r===x.Mail&&(i=await C(t)),i)throw new Error(i)};return l.useEffect(()=>{U().then(r=>j(r)).catch(r=>b.error(`Erro http get profiles: ${r.message}`))},[]),e.jsxs(n,{layout:"vertical",initialValues:d,onFinish:g,children:[e.jsx(n.Item,{label:"Nombre completo",name:"nombre",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(h,{placeholder:"Ingrese el nombre"})}),e.jsx(n.Item,{label:"Tipo de perfil",name:"id_perfil",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(k,{className:"w-100",placeholder:"Seleccione una opción",options:p.filter(r=>r.estado).map(r=>({value:r.id_perfil,label:r.perfil}))})}),e.jsx(n.Item,{label:"Teléfono",name:"telefono",className:"flex-1",rules:[{required:!0,validator:(r,t)=>o(x.PhoneNumber,t)}],children:e.jsx(h,{placeholder:"Ingrese un número de teléfono"})}),e.jsx(n.Item,{label:"Correo",name:"correo",className:"flex-1",rules:[{required:!0,validator:(r,t)=>o(x.Mail,t)}],children:e.jsx(h,{placeholder:"Ingrese un email"})}),e.jsx(n.Item,{label:"Usuario",name:"usuario",className:"flex-1",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(h,{placeholder:"Ingrese un usuario",disabled:d.id_usuario>0})}),e.jsx(n.Item,{name:"estado",label:"Estado",valuePropName:"checked",children:e.jsx(F,{checkedChildren:"Activo",unCheckedChildren:"Inactivo"})}),e.jsx("div",{className:"text-right",children:e.jsx(f,{type:"primary",htmlType:"submit",loading:m,disabled:m,children:"Enviar"})})]})},H=()=>{const d=y(s=>s.device),c="Usuarios",[p,j]=l.useState([]),[m,u]=l.useState(w),[g,o]=l.useState(!1),[r,t]=l.useState(!1),i=()=>{t(!0),v().then(s=>j(s)).catch(s=>`Error http get users: ${s.message}`).finally(()=>t(!1))},I=s=>{var a;u({...s,id_perfil:(a=s.perfil)==null?void 0:a.id_perfil}),o(!0)};return l.useEffect(()=>{i()},[]),e.jsxs("div",{className:"h-100 flex flex-column p-3",children:[e.jsxs("div",{className:"flex flex-md-column gap-3 justify-between",children:[e.jsx("h3",{children:c}),e.jsx("div",{children:e.jsx(h.Search,{placeholder:"Buscar",onSearch:()=>{},enterButton:!0})}),e.jsx(f,{type:"primary",htmlType:"button",onClick:()=>{u(w),o(!0)},children:"Agregar"})]}),d?e.jsx(P,{dataSource:p,renderItem:s=>{var a;return e.jsxs("div",{className:"item-list",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Nombre: "})," ",s.nombre]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Perfil: "})," ",(a=s.perfil)==null?void 0:a.perfil]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Usuario: "})," ",s.usuario]})]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Estado: "})," ",s.estado?"Activo":"Inactivo"]}),e.jsx(f,{type:"link",danger:!0,htmlType:"button",icon:e.jsx(N.Edit,{}),onClick:()=>I(s),children:"Editar"})]})]},s.id_usuario)}}):e.jsx(T,{size:"small",rowClassName:(s,a)=>a%2===0?"table-row-light":"table-row-dark",pagination:{position:["none","bottomRight"],showSizeChanger:!0,pageSizeOptions:[50,100,250,500]},className:"table",loading:r,showSorterTooltip:!1,rowKey:"id_usuario",dataSource:p,columns:[{title:"No",dataIndex:"id_usuario"},{title:"Nombre",dataIndex:"nombre",ellipsis:!0,sorter:!0},{title:"Perfil",dataIndex:"perfil",ellipsis:!0,sorter:!0,render:s=>e.jsx("span",{children:s==null?void 0:s.perfil})},{title:"Usuario",dataIndex:"usuario",sorter:!0},{title:"Estado",dataIndex:"estado",render:s=>e.jsx("span",{className:s?"text-success":"text-danger",children:s?"Actuvi":"Inactivo"})},{title:"Opciones",dataIndex:"operacion",width:80,render:(s,a)=>e.jsx("div",{className:"text-center",children:e.jsx(f,{style:{width:40},icon:e.jsx(N.Edit,{}),type:"primary",size:"small",onClick:()=>I(a)})})}]}),e.jsx(A,{open:g,title:e.jsxs("h3",{children:[m.id_usuario>0?"Editar":"Agregar"," ",c.substring(0,c.length-1)]}),footer:null,onCancel:()=>o(!1),centered:!0,destroyOnClose:!0,children:e.jsx(M,{user:m,onClose:()=>{i(),o(!1)}})})]})};export{H as User};
