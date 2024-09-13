import{r as l,j as e,O as y}from"./index-CmnY-2zJ.js";import{s as f,B as h,I}from"./method-http.utility-Ctcdl8Wi.js";import{a as N,b as S,c as w}from"./user.service--LKe6yst.js";import{h as v}from"./profile.service-CMWlamOx.js";import{F as i,I as u}from"./index-BRusVNPc.js";import{S as _,a as C,L as U,F as k,M as T}from"./Table-BkgG8NCi.js";import"./Private-UbTsyjO7.js";const E={id_usuario:0,correo:"",estado:!0,nombre:"",telefono:"",usuario:""},A=({user:o,onClose:n})=>{const[m,p]=l.useState([]),[d,c]=l.useState(!1),x=async r=>{try{c(!0);let a;o.id_usuario>0?a=await N({...o,...r}):a=await S(r),a.message?f.warning(a.message):n()}catch(a){f.error(`Error http add user: ${a.message}`)}finally{c(!1)}};return l.useEffect(()=>{v().then(r=>p(r)).catch(r=>f.error(`Erro http get profiles: ${r.message}`))},[]),e.jsxs(i,{layout:"vertical",initialValues:o,onFinish:x,children:[e.jsx(i.Item,{label:"Nombre completo",name:"nombre",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(u,{placeholder:"Ingrese el nombre"})}),e.jsx(i.Item,{label:"Tipo de perfil",name:"id_perfil",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(_,{className:"w-100",placeholder:"Seleccione una opción",options:m.filter(r=>r.estado).map(r=>({value:r.id_perfil,label:r.perfil}))})}),e.jsx(i.Item,{label:"Teléfono",name:"telefono",className:"flex-1",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(u,{placeholder:"Ingrese un número de teléfono"})}),e.jsx(i.Item,{label:"Correo",name:"correo",className:"flex-1",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(u,{placeholder:"Ingrese un email"})}),e.jsx(i.Item,{label:"Usuario",name:"usuario",className:"flex-1",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(u,{placeholder:"Ingrese un usuario",disabled:o.id_usuario>0})}),e.jsx(i.Item,{name:"estado",label:"Estado",valuePropName:"checked",children:e.jsx(C,{checkedChildren:"Activo",unCheckedChildren:"Inactivo"})}),e.jsx("div",{className:"text-right",children:e.jsx(h,{type:"primary",htmlType:"submit",loading:d,disabled:d,children:"Enviar"})})]})},O=()=>{const o=y(s=>s.device),n="Usuarios",[m,p]=l.useState([]),[d,c]=l.useState(E),[x,r]=l.useState(!1),[a,j]=l.useState(!1),g=()=>{j(!0),w().then(s=>p(s)).catch(s=>`Error http get users: ${s.message}`).finally(()=>j(!1))},b=s=>{var t;c({...s,id_perfil:(t=s.perfil)==null?void 0:t.id_perfil}),r(!0)};return l.useEffect(()=>{g()},[]),e.jsxs("div",{className:"h-100 flex flex-column p-3",children:[e.jsxs("div",{className:"flex flex-md-column gap-3 justify-between",children:[e.jsx("h3",{children:n}),e.jsx("div",{children:e.jsx(u.Search,{placeholder:"Buscar",onSearch:()=>{},enterButton:!0})}),e.jsx(h,{type:"primary",htmlType:"button",onClick:()=>{c(E),r(!0)},children:"Agregar"})]}),o?e.jsx(U,{dataSource:m,renderItem:s=>{var t;return e.jsxs("div",{className:"item-list",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Nombre: "})," ",s.nombre]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Perfil: "})," ",(t=s.perfil)==null?void 0:t.perfil]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Usuario: "})," ",s.usuario]})]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Estado: "})," ",s.estado?"Activo":"Inactivo"]}),e.jsx(h,{type:"link",danger:!0,htmlType:"button",icon:e.jsx(I.Edit,{}),onClick:()=>b(s),children:"Editar"})]})]},s.id_usuario)}}):e.jsx(k,{size:"small",rowClassName:(s,t)=>t%2===0?"table-row-light":"table-row-dark",pagination:{position:["none","bottomRight"],showSizeChanger:!0,pageSizeOptions:[50,100,250,500]},className:"table",loading:a,showSorterTooltip:!1,rowKey:"id_usuario",dataSource:m,columns:[{title:"No",dataIndex:"id_usuario"},{title:"Nombre",dataIndex:"nombre",ellipsis:!0,sorter:!0},{title:"Perfil",dataIndex:"perfil",ellipsis:!0,sorter:!0,render:s=>e.jsx("span",{children:s==null?void 0:s.perfil})},{title:"Usuario",dataIndex:"usuario",sorter:!0},{title:"Estado",dataIndex:"estado",render:s=>e.jsx("span",{className:s?"text-success":"text-danger",children:s?"Actuvi":"Inactivo"})},{title:"Opciones",dataIndex:"operacion",width:80,render:(s,t)=>e.jsx("div",{className:"text-center",children:e.jsx(h,{style:{width:40},icon:e.jsx(I.Edit,{}),type:"primary",size:"small",onClick:()=>b(t)})})}]}),e.jsx(T,{open:x,title:e.jsxs("h3",{children:[d.id_usuario>0?"Editar":"Agregar"," ",n.substring(0,n.length-1)]}),footer:null,onCancel:()=>r(!1),centered:!0,destroyOnClose:!0,children:e.jsx(A,{user:d,onClose:()=>{g(),r(!1)}})})]})};export{O as User};
