import{r as o,j as e,O as v}from"./index-Cg6e7MPW.js";import{B as h,s as x,I as E}from"./method-http.utility-DXTioPMu.js";import{S}from"./Search-DbT1vi5A.js";import{a as q,b as P,c as p,h as A}from"./port.service-Copb-ngu.js";import{F as c,I as $}from"./index-NlrsMbli.js";import{T as _}from"./index-fkpKFVCf.js";import{S as k}from"./index-XEyxeQ8u.js";import{L as T,F,M as L}from"./Table-CI96rAdm.js";import"./Private-0yptBAA-.js";const w={id_puerto:0,puerto:"",estado:!0,costo_embarque:0,costo_aduanal:0},O=({port:l,onClose:n})=>{const[i,d]=o.useState(!1),m=async a=>{try{d(!0);let r;l.id_puerto>0?r=await q({...l,...a}):r=await P(a),r.message?x.warning(r.message):(x.success(`Puerto ${l.id_puerto>0?"editada":"agregada"} correctamente`),n())}catch(r){x.error(`Error http add or edit port: ${r.message}`)}finally{d(!1)}};return e.jsxs(c,{layout:"vertical",initialValues:l,onFinish:m,children:[e.jsx(c.Item,{label:"Nombre",name:"puerto",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx($,{placeholder:"Ingrese el nombre"})}),e.jsxs("div",{className:"flex flex-md-column gap-3 justify-between",children:[e.jsx(c.Item,{className:"w-100",label:"Costo Embarque",name:"costo_embarque",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(_,{placeholder:"Ingrese el costo de embarque",min:0,formatter:a=>`$ ${a}`,className:"w-100"})}),e.jsx(c.Item,{className:"w-100",label:"Costo Aduanal (Doc/Exp)",name:"costo_aduanal",rules:[{required:!0,message:"El campo es obligatorio"}],children:e.jsx(_,{className:"w-100",placeholder:"Ingrese el costo de aduanal",min:0,formatter:a=>`$ ${a}`})})]}),e.jsx(c.Item,{name:"estado",label:"Estado",valuePropName:"checked",children:e.jsx(k,{checkedChildren:"Activo",unCheckedChildren:"Inactivo"})}),e.jsx("div",{className:"text-right",children:e.jsx(h,{type:"primary",htmlType:"submit",loading:i,disabled:i,children:"Enviar"})})]})},H=()=>{const l=v(t=>t.device),n="Puertos",[i,d]=o.useState(w),[m,a]=o.useState([]),[r,I]=o.useState([]),[C,u]=o.useState(!1),[j,f]=o.useState(!1),b=t=>{let s=[...r];t.trim()!==""&&(s=s.filter(N=>N.id_puerto===Number(t)||N.puerto.toLowerCase().indexOf(t.toLowerCase())!==-1)),a(s)},g=t=>{d(t),u(!0)},y=()=>{f(!0),A().then(t=>{a(t),I(t)}).catch(t=>x.error(`Error http get ports: ${t.message}`)).finally(()=>f(!1))};return o.useEffect(()=>{y()},[]),e.jsxs("div",{className:"h-100 flex flex-column p-3",children:[e.jsxs("div",{className:"flex flex-md-column gap-3 justify-between",children:[e.jsx("h3",{children:n}),e.jsx("div",{children:e.jsx(S,{onSearch:b,onReset:()=>b("")})}),e.jsx(h,{type:"primary",htmlType:"button",onClick:()=>{d(w),u(!0)},children:"Agregar"})]}),l?e.jsx(T,{dataSource:m,loading:j,renderItem:t=>e.jsxs("div",{className:"item-list",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Nombre: "})," ",t.puerto]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Costo Embarque: "})," $",p(t.costo_embarque)]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("strong",{children:"Costo Aduanal: "})," $",p(t.costo_aduanal)]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Estado: "})," ",t.estado?"Activo":"Inactivo"]}),e.jsx(h,{type:"link",danger:!0,htmlType:"button",icon:e.jsx(E.Edit,{}),onClick:()=>g(t),children:"Editar"})]})]},t.id_puerto)}):e.jsx(F,{size:"small",rowClassName:(t,s)=>s%2===0?"table-row-light":"table-row-dark",pagination:!1,className:"table",loading:j,showSorterTooltip:!1,rowKey:"id_subasta",dataSource:m,columns:[{title:"No",dataIndex:"id_puerto"},{title:"Nombre",dataIndex:"puerto",ellipsis:!0,sorter:!0},{title:"Costo Embarque",dataIndex:"costo_embarque",sorter:!0,render:(t,s)=>p(s.costo_embarque)},{title:"Costo Aduanal (Doc/Exp)",dataIndex:"costo_aduanal",sorter:!0,render:(t,s)=>p(s.costo_aduanal)},{title:"Estado",dataIndex:"estado",render:t=>e.jsx("span",{className:t?"text-success":"text-danger",children:t?"Actuvi":"Inactivo"})},{title:"Opciones",dataIndex:"operacion",width:80,render:(t,s)=>e.jsx("div",{className:"text-center",children:e.jsx(h,{style:{width:40},icon:e.jsx(E.Edit,{}),type:"primary",size:"small",onClick:()=>g(s)})})}]}),e.jsx(L,{open:C,title:e.jsxs("h3",{children:[i.id_puerto>0?"Editar":"Agregar"," ",n.substring(0,n.length-1)]}),footer:null,onCancel:()=>u(!1),centered:!0,destroyOnClose:!0,children:e.jsx(O,{port:i,onClose:()=>{y(),u(!1)}})})]})};export{H as Port};
