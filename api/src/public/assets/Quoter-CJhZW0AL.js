import{m as me,b as B,r as d,C as oe,c as K,T as ve,j as t,S as se,O as ie,a as ye,p as le}from"./index-C_I45hcy.js";import{g as pe,m as he,Q as ge,w as je,o as Ce,x as Se,S as _e,W as we,U as $e,N as L,B as T,I as z,s as P,T as W}from"./method-http.utility-DRGzK4dc.js";import{S as Ie}from"./Search-DSw0sd9I.js";import{c as M,g as Te}from"./format.utility-B-GMUqP5.js";import{h as Ne}from"./customer.service-CzesvJdQ.js";import{M as k}from"./Utilityes.d-EXBqBskY.js";import{h as Ee}from"./aution.service-BC8CAEG9.js";import{h as Oe}from"./crane.service-DLvrehRJ.js";import{h as ze}from"./port.service-B0DjroWY.js";import{h as Pe}from"./type-vehicle.service-B8tMX66T.js";import{M as te}from"./index-CKyuLA3S.js";import{F as I}from"./index-DaI31ieK.js";import{I as Q}from"./index-C0Q_eWM9.js";import{S as A,L as De,F as Me}from"./Table-C1au93bv.js";import{T as Ge}from"./index-D0b9nMse.js";import{u as ke,p as ce}from"./Private-BjoEPDeC.js";const de={id_cotizacion:0,id_cliente:0,id_vendedor:0,id_tipo_vehiculo:0,marca:"",modelo:"",anio:"",id_puerto:0,estado:!0};var D=(e=>(e.USD="Grua EE.UU",e.GTQ="Grua GT",e.PORT_SHIPPING="Embarque",e.PORT_DOCUMENT_OR_EXP="ADUANA Y DOCS. EXP",e))(D||{});const Be={nombre:"",moneda:"",valor:0},Ue=e=>{const{componentCls:a,sizePaddingEdgeHorizontal:c,colorSplit:r,lineWidth:i,textPaddingInline:g,orientationMargin:u,verticalMarginInline:p}=e;return{[a]:Object.assign(Object.assign({},me(e)),{borderBlockStart:`${B(i)} solid ${r}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:p,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${B(i)} solid ${r}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${B(e.dividerHorizontalGutterMargin)} 0`},[`&-horizontal${a}-with-text`]:{display:"flex",alignItems:"center",margin:`${B(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${r}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${B(i)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${a}-with-text-left`]:{"&::before":{width:`calc(${u} * 100%)`},"&::after":{width:`calc(100% - ${u} * 100%)`}},[`&-horizontal${a}-with-text-right`]:{"&::before":{width:`calc(100% - ${u} * 100%)`},"&::after":{width:`calc(${u} * 100%)`}},[`${a}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:g},"&-dashed":{background:"none",borderColor:r,borderStyle:"dashed",borderWidth:`${B(i)} 0 0`},[`&-horizontal${a}-with-text${a}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${a}-dashed`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:r,borderStyle:"dotted",borderWidth:`${B(i)} 0 0`},[`&-horizontal${a}-with-text${a}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${a}-dotted`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${a}-with-text`]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},[`&-horizontal${a}-with-text-left${a}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${a}-inner-text`]:{paddingInlineStart:c}},[`&-horizontal${a}-with-text-right${a}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${a}-inner-text`]:{paddingInlineEnd:c}}})}},Ae=e=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:e.marginXS}),Re=pe("Divider",e=>{const a=he(e,{dividerHorizontalWithTextGutterMargin:e.margin,dividerHorizontalGutterMargin:e.marginLG,sizePaddingEdgeHorizontal:0});return[Ue(a)]},Ae,{unitless:{orientationMargin:!0}});var Ve=function(e,a){var c={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(c[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)a.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(c[r[i]]=e[r[i]]);return c};const q=e=>{const{getPrefixCls:a,direction:c,divider:r}=d.useContext(oe),{prefixCls:i,type:g="horizontal",orientation:u="center",orientationMargin:p,className:m,rootClassName:j,children:_,dashed:C,variant:$="solid",plain:w,style:N}=e,b=Ve(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style"]),x=a("divider",i),[E,O,G]=Re(x),n=!!_,h=u==="left"&&p!=null,S=u==="right"&&p!=null,f=K(x,r==null?void 0:r.className,O,G,`${x}-${g}`,{[`${x}-with-text`]:n,[`${x}-with-text-${u}`]:n,[`${x}-dashed`]:!!C,[`${x}-${$}`]:$!=="solid",[`${x}-plain`]:!!w,[`${x}-rtl`]:c==="rtl",[`${x}-no-default-orientation-margin-left`]:h,[`${x}-no-default-orientation-margin-right`]:S},m,j),v=d.useMemo(()=>typeof p=="number"?p:/^\d+$/.test(p)?Number(p):p,[p]),o=Object.assign(Object.assign({},h&&{marginLeft:v}),S&&{marginRight:v});return E(d.createElement("div",Object.assign({className:f,style:Object.assign(Object.assign({},r==null?void 0:r.style),N)},b,{role:"separator"}),_&&g!=="vertical"&&d.createElement("span",{className:`${x}-inner-text`,style:o},_)))},Qe=e=>{const{paddingXXS:a,lineWidth:c,tagPaddingHorizontal:r,componentCls:i,calc:g}=e,u=g(r).sub(c).equal(),p=g(a).sub(c).equal();return{[i]:Object.assign(Object.assign({},me(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:u,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",background:e.defaultBg,border:`${B(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${i}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${i}-close-icon`]:{marginInlineStart:p,fontSize:e.tagIconSize,color:e.colorTextDescription,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},[`&${i}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]:{color:e.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${i}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:u}}),[`${i}-borderless`]:{borderColor:"transparent",background:e.tagBorderlessBg}}},re=e=>{const{lineWidth:a,fontSizeIcon:c,calc:r}=e,i=e.fontSizeSM;return he(e,{tagFontSize:i,tagLineHeight:B(r(e.lineHeightSM).mul(i).equal()),tagIconSize:r(c).sub(r(a).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},ae=e=>({defaultBg:new ve(e.colorFillQuaternary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText}),fe=pe("Tag",e=>{const a=re(e);return Qe(a)},ae);var qe=function(e,a){var c={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(c[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)a.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(c[r[i]]=e[r[i]]);return c};const Fe=d.forwardRef((e,a)=>{const{prefixCls:c,style:r,className:i,checked:g,onChange:u,onClick:p}=e,m=qe(e,["prefixCls","style","className","checked","onChange","onClick"]),{getPrefixCls:j,tag:_}=d.useContext(oe),C=E=>{u==null||u(!g),p==null||p(E)},$=j("tag",c),[w,N,b]=fe($),x=K($,`${$}-checkable`,{[`${$}-checkable-checked`]:g},_==null?void 0:_.className,i,N,b);return w(d.createElement("span",Object.assign({},m,{ref:a,style:Object.assign(Object.assign({},r),_==null?void 0:_.style),className:x,onClick:C})))}),He=e=>je(e,(a,c)=>{let{textColor:r,lightBorderColor:i,lightColor:g,darkColor:u}=c;return{[`${e.componentCls}${e.componentCls}-${a}`]:{color:r,background:g,borderColor:i,"&-inverse":{color:e.colorTextLightSolid,background:u,borderColor:u},[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}}),We=ge(["Tag","preset"],e=>{const a=re(e);return He(a)},ae);function Le(e){return typeof e!="string"?e:e.charAt(0).toUpperCase()+e.slice(1)}const Z=(e,a,c)=>{const r=Le(c);return{[`${e.componentCls}${e.componentCls}-${a}`]:{color:e[`color${c}`],background:e[`color${r}Bg`],borderColor:e[`color${r}Border`],[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}},Xe=ge(["Tag","status"],e=>{const a=re(e);return[Z(a,"success","Success"),Z(a,"processing","Info"),Z(a,"error","Error"),Z(a,"warning","Warning")]},ae);var Ye=function(e,a){var c={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(c[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)a.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(c[r[i]]=e[r[i]]);return c};const Je=d.forwardRef((e,a)=>{const{prefixCls:c,className:r,rootClassName:i,style:g,children:u,icon:p,color:m,onClose:j,bordered:_=!0,visible:C}=e,$=Ye(e,["prefixCls","className","rootClassName","style","children","icon","color","onClose","bordered","visible"]),{getPrefixCls:w,direction:N,tag:b}=d.useContext(oe),[x,E]=d.useState(!0),O=Ce($,["closeIcon","closable"]);d.useEffect(()=>{C!==void 0&&E(C)},[C]);const G=Se(m),n=_e(m),h=G||n,S=Object.assign(Object.assign({backgroundColor:m&&!h?m:void 0},b==null?void 0:b.style),g),f=w("tag",c),[v,o,s]=fe(f),l=K(f,b==null?void 0:b.className,{[`${f}-${m}`]:h,[`${f}-has-color`]:m&&!h,[`${f}-hidden`]:!x,[`${f}-rtl`]:N==="rtl",[`${f}-borderless`]:!_},r,i,o,s),y=V=>{V.stopPropagation(),j==null||j(V),!V.defaultPrevented&&E(!1)},[,U]=ke(ce(e),ce(b),{closable:!1,closeIconRender:V=>{const xe=d.createElement("span",{className:`${f}-close-icon`,onClick:y},V);return $e(V,xe,R=>({onClick:ne=>{var ee;(ee=R==null?void 0:R.onClick)===null||ee===void 0||ee.call(R,ne),y(ne)},className:K(R==null?void 0:R.className,`${f}-close-icon`)}))}}),Y=typeof $.onClick=="function"||u&&u.type==="a",F=p||null,J=F?d.createElement(d.Fragment,null,F,u&&d.createElement("span",null,u)):u,H=d.createElement("span",Object.assign({},O,{ref:a,className:l,style:S}),J,U,G&&d.createElement(We,{key:"preset",prefixCls:f}),n&&d.createElement(Xe,{key:"status",prefixCls:f}));return v(Y?d.createElement(we,{component:"Tag"},H):H)}),be=Je;be.CheckableTag=Fe;const Ze=(e,a)=>{const c=window.URL.createObjectURL(new Blob([e])),r=document.createElement("a");r.href=c,r.setAttribute("download",a),document.body.appendChild(r),r.click()},X="/quoter",Ke=async e=>await L({path:`${X}/${e}`,method:"GET"}),et=async e=>await L({path:X,method:"POST",data:e}),ue=async e=>await L({path:`${X}/${e.id_cotizacion}`,method:"PUT",data:e}),tt=async e=>await L({path:`${X}/invoice/${e}`,method:"GET",responseType:"blob"}),ot=async e=>await L({path:`${X}/pagination`,method:"POST",data:e}),rt=({details:e,onSubmit:a})=>{const[c,r]=d.useState(Be),[i,g]=d.useState(!1),u=async m=>{const j=[...e];j.push({...m,valor:M(m.valor??"")}),a(j),g(!1)},p=m=>t.jsx(t.Fragment,{children:m.map((j,_)=>t.jsxs("div",{className:"flex flex-row justify-between gap-3 items-center",children:[t.jsxs("strong",{className:"flex-1",children:[j.nombre,": "]}),t.jsx("span",{children:j.moneda}),t.jsx("span",{children:M(j.valor??0)}),t.jsxs("div",{children:[t.jsx(T,{type:"link",htmlType:"button",size:"small",icon:t.jsx(z.Edit,{}),onClick:()=>{r({...j,index:_}),g(!0)}}),t.jsx(T,{danger:!0,type:"link",size:"small",htmlType:"button",icon:t.jsx(z.Trash,{}),onClick:()=>{const C=e.filter(w=>w.moneda!==j.moneda),$=m.filter((w,N)=>N!==_);a([...C,...$])}})]})]},_))});return t.jsxs(t.Fragment,{children:[e.some(m=>m.moneda===k.USD)&&t.jsx(q,{orientation:"left",children:"Costos USD"}),p(e.filter(m=>m.moneda===k.USD)),e.some(m=>m.moneda===k.GTQ)&&t.jsx(q,{orientation:"left",children:"Costos GTQ"}),p(e.filter(m=>m.moneda===k.GTQ)),t.jsx("div",{className:"text-right mt-3",children:t.jsx(T,{type:"primary",style:{color:se.secondary,borderColor:se.secondary},ghost:!0,size:"small",htmlType:"button",icon:t.jsx(z.Plus,{}),onClick:()=>g(!0),children:"Agregar"})}),t.jsx(te,{open:i,onCancel:()=>g(!1),footer:null,title:"Editar",destroyOnClose:!0,children:t.jsxs(I,{layout:"vertical",initialValues:c,onFinish:u,children:[t.jsx(I.Item,{label:"Titulo",name:"nombre",rules:[{required:!0,message:"El campo es requerido"}],children:t.jsx(Q,{placeholder:"Ingrese un titulo"})}),t.jsx(I.Item,{label:"Moneda",name:"moneda",rules:[{required:!0,message:"El campo es requerido"}],children:t.jsx(A,{allowClear:!0,className:"w-100",placeholder:"Selecciones una opción",options:Object.keys(k).map(m=>({label:m,value:k[m]}))})}),t.jsx(I.Item,{label:"Valor",name:"valor",rules:[{required:!0,message:"El campo es requerido"}],children:t.jsx(Ge,{placeholder:"Ingrese un valor",className:"w-100",formatter:m=>M(m??"")})}),t.jsx("div",{className:"text-right mt-3",children:t.jsx(T,{type:"primary",htmlType:"submit",children:"Guardar"})})]})})]})},at=({quoter:e,loading:a,customers:c,onSubmit:r,onDownloadInvoice:i,onAproveQuoter:g})=>{var G;const u=d.useRef(null),[p,m]=d.useState([]),[j,_]=d.useState([]),[C,$]=d.useState([]),[w,N]=d.useState({USD:[],GTQ:[],all:[]}),[b,x]=d.useState([]),E=n=>{var f;const[h,S]=Object.entries(n)[0];if(h==="id_subasta"){const v=w.all.filter(o=>{var s;return((s=o.subasta)==null?void 0:s.id_subasta)===S&&o.estado});v&&N({...w,USD:v}),(f=u.current)==null||f.setFieldValue("id_grua_usd",void 0)}O()},O=()=>{var h;const n=(h=u.current)==null?void 0:h.getFieldsValue();if(n&&n.id_cliente){let S=[...b];const f=c.find(o=>o.id_cliente===n.id_cliente),v=p.find(o=>o.id_puerto===n.id_puerto);if(v){const o=b.findIndex(l=>l.nombre===D.PORT_DOCUMENT_OR_EXP);if(o>-1){const l=b[o];l.valor=M(v.costo_aduanal)}else S.push({nombre:D.PORT_DOCUMENT_OR_EXP,moneda:k.USD,valor:M(v.costo_aduanal)});const s=j.find(l=>l.id_tipo_vehiculo===n.id_tipo_vehiculo);if(s){const l=b.findIndex(U=>U.nombre===D.PORT_SHIPPING),y=Number(v.costo_embarque)+Number(v.costo_embarque)*(Number(s.porcentaje_costo)/100);if(l>-1){const U=b[l];U.valor=M(y)}else S.push({nombre:D.PORT_SHIPPING,moneda:k.USD,valor:M(y)})}}if(f){if(n.id_grua_usd){const o=w.USD.find(s=>s.id_grua===n.id_grua_usd);if(o&&o.costo>0){const s=Number(o.costo)+Number(o.costo)*(Number(f.porcentaje_costo)/100),l=b.findIndex(y=>y.nombre===D.USD);if(l>-1){const y=b[l];y.valor=M(s)}else S.push({nombre:D.USD,moneda:o.moneda,valor:M(s)})}}else S=S.filter(o=>o.nombre!==D.USD);if(n.id_grua_gt){const o=w.GTQ.find(s=>s.id_grua===n.id_grua_gt);if(o&&o.costo>0){const s=Number(o.costo)+Number(o.costo)*(Number(f.porcentaje_costo)/100),l=b.findIndex(y=>y.nombre===D.GTQ);if(l>-1){const y=b[l];y.valor=M(s)}else S.push({nombre:D.GTQ,moneda:o.moneda,valor:M(s)})}}else S=S.filter(o=>o.nombre!==D.GTQ)}x(S)}};return d.useEffect(()=>{e.details&&x(e.details.map(n=>({...n,id:Math.random().toString()}))),ze().then(n=>m(n==null?void 0:n.filter(h=>h.estado))).catch(n=>P.error(`Error http get ports: ${n.message}}`)),Pe().then(n=>_(n==null?void 0:n.filter(h=>h.estado))).catch(n=>P.error(`Error http get type of vehicles: ${n.message}}`)),Ee().then(n=>$(n==null?void 0:n.filter(h=>h.estado))).catch(n=>P.error(`Error http get autions: ${n.message}}`)),Oe().then(n=>{const h=n==null?void 0:n.filter(v=>v.estado),S=h==null?void 0:h.filter(v=>v.moneda===k.GTQ),f=h==null?void 0:h.filter(v=>{var o;return v.moneda===k.USD&&((o=v.subasta)==null?void 0:o.id_subasta)===e.id_subasta});N({...w,GTQ:S,all:h,USD:f})}).catch(n=>P.error(`Error http get cranes: ${n.message}}`))},[]),t.jsx(t.Fragment,{children:t.jsxs(I,{ref:u,initialValues:e.id_cotizacion===0?{}:e,layout:"vertical",onFinish:n=>r(n,b),onValuesChange:E,children:[t.jsx("div",{className:"vhm-75 overflow-y",children:t.jsxs("div",{className:"flex flex-md-column justify-between",children:[t.jsxs("div",{className:"flex-1 p-3",children:[t.jsx(q,{orientation:"left",children:"Información del Cliente/Puerto"}),t.jsx(I.Item,{label:"Cliente",name:"id_cliente",rules:[{required:!0,message:"El campo es obligatorio"}],children:t.jsx(A,{className:"w-100",placeholder:"Selecciones una opción",options:c.map(n=>({label:n.cliente,value:n.id_cliente}))})}),t.jsx(I.Item,{label:"Puerto",name:"id_puerto",rules:[{required:!0,message:"El campo es obligatorio"}],children:t.jsx(A,{className:"w-100",placeholder:"Selecciones una opción",options:p.map(n=>({label:n.puerto,value:n.id_puerto}))})}),t.jsx(q,{orientation:"left",children:"Información del vehículo"}),t.jsxs("div",{className:"flex flex-md-column gap-3 justify-between item-end",children:[t.jsx(I.Item,{label:"Tipo de Vehículo",name:"id_tipo_vehiculo",rules:[{required:!0,message:"El campo es requerido"}],className:"w-100",children:t.jsx(A,{className:"w-100",placeholder:"Selecciones una opción",options:j.map(n=>({label:n.tipo_vehiculo,value:n.id_tipo_vehiculo}))})}),t.jsx(I.Item,{label:"Año",name:"anio",rules:[{required:!0,message:"El campo es requerido"}],className:"w-100",children:t.jsx(Q,{placeholder:"Ingrese un año"})})]}),t.jsxs("div",{className:"flex flex-md-column gap-3 justify-between item-end",children:[t.jsx(I.Item,{label:"Marca",name:"marca",rules:[{required:!0,message:"El campo es requerido"}],className:"w-100",children:t.jsx(Q,{placeholder:"Ingrese una Marca"})}),t.jsx(I.Item,{label:"Modelo",name:"modelo",rules:[{required:!0,message:"El campo es requerido"}],className:"w-100",children:t.jsx(Q,{placeholder:"Ingrese un Modelo"})})]}),t.jsxs("div",{className:"flex flex-md-column gap-3 justify-between item-end",children:[t.jsx(I.Item,{label:"Serie",name:"serie",rules:[{required:!0,message:"El campo es requerido"}],className:"w-100",children:t.jsx(Q,{placeholder:"Ingrese una Serie"})}),t.jsx(I.Item,{label:"VIN",name:"vin",rules:[{required:!0,message:"El campo es requerido"}],className:"w-100",children:t.jsx(Q,{placeholder:"Ingrese un VIN"})})]})]}),t.jsxs("div",{className:"flex-1 p-3",children:[t.jsx(q,{orientation:"left",children:"Tramites EE. UU"}),t.jsx(I.Item,{label:"Subasta (optional)",name:"id_subasta",children:t.jsx(A,{allowClear:!0,className:"w-100",placeholder:"Selecciones una opción",options:C.map(n=>({label:n.subasta,value:n.id_subasta}))})}),t.jsx(I.Item,{label:"Grua (optional)",name:"id_grua_usd",children:t.jsx(A,{allowClear:!0,className:"w-100",placeholder:"Selecciones una opción",options:(G=w.USD)==null?void 0:G.map(n=>({label:n.grua,value:n.id_grua}))})}),t.jsx(q,{orientation:"left",children:"Tramites GT"}),t.jsx(I.Item,{label:"Grua (optional)",name:"id_grua_gt",children:t.jsx(A,{allowClear:!0,className:"w-100",placeholder:"Selecciones una opción",options:w.GTQ.map(n=>({label:n.grua,value:n.id_grua}))})}),t.jsx(rt,{details:b,onSubmit:n=>x(n)})]})]})}),t.jsxs("div",{className:"flex flex-row justify-end gap-2",children:[t.jsx(T,{type:"link",htmlType:"button",loading:a,disabled:a||e.id_cotizacion===0,icon:t.jsx(z.Download,{}),onClick:()=>i(e),children:"Descargar"}),t.jsx(T,{type:"dashed",htmlType:"button",loading:a,disabled:a||e.id_cotizacion===0,icon:t.jsx(z.EMail,{}),children:"Enviar Correo"}),!e.aprobada&&t.jsx(T,{type:"primary",ghost:!0,htmlType:"button",loading:a,disabled:a||e.id_cotizacion===0,icon:t.jsx(z.Done,{}),onClick:()=>g(e),children:"Aprobar"}),t.jsx(T,{type:"primary",htmlType:"submit",icon:t.jsx(z.Save,{}),loading:a,disabled:a||e.aprobada,children:"Guardar"})]})]})})},jt=()=>{const e=ie(o=>o.device),a=ie(o=>o.session),c=ye(),[r,i]=d.useState([]),[g,u]=d.useState(de),[p,m]=d.useState({data:!1,services:!1}),[j,_]=d.useState({form:!1,preview:!1}),[C,$]=d.useState({pagination:{current:1,pageSize:250}}),[w,N]=d.useState(""),[b,x]=d.useState([]),E=(o,s=!0)=>_({[o]:s}),O=(o,s)=>m({...p,[o]:s}),G=o=>{Ke(o).then(s=>{var l,y,U,Y,F,J,H;u({...s,id_cliente:(l=s.cliente)==null?void 0:l.id_cliente,id_vendedor:(y=s.vendedor)==null?void 0:y.id_usuario,id_tipo_vehiculo:(U=s.tipo_veniculo)==null?void 0:U.id_tipo_vehiculo,id_puerto:(Y=s.puerto)==null?void 0:Y.id_puerto,id_subasta:(F=s.subasta)==null?void 0:F.id_subasta,id_grua_usd:(J=s.grua_usd)==null?void 0:J.id_grua,id_grua_gt:(H=s.grua_gt)==null?void 0:H.id_grua}),E("form")}).catch(s=>P.error(`Error http get quoters: ${s.message}`))},n=async(o,s)=>{try{O("services",!0);let l;const y={...g,...o,detalles:s};g.id_cotizacion===0?l=await et({...y,id_vendedor:a.id_sesion}):l=await ue(y),l.message?P.warning(l.message):(f(),E("form",!1))}catch(l){P.error(`Error add or edit ouoter: ${l.message}`)}finally{O("services",!1)}},h=async o=>{O("services",!0),tt(o.id_cotizacion).then(s=>{var l;return Ze(s,`${((l=o.cliente)==null?void 0:l.cliente)??"cotizacion"}-invoice.zip`)}).catch(s=>P.error(`Error http download invoice: ${s.message}`)).finally(()=>O("services",!1))},S=async o=>{te.confirm({title:"¿Estás seguro de aprobar esta cotización?",content:"Esta acción no se puede deshacer",okText:"Si",cancelText:"No",onOk:()=>{O("services",!0),ue({...o,aprobada:!0}).then(s=>{P[s.error?"warning":"success"](s.message),s.error||(f(),E("form",!1))}).catch(s=>P.error(`Error http approve quoter: ${s.message}`)).finally(()=>O("services",!1))}})},f=()=>{var o,s;O("data",!0),ot({...C,current:(o=C.pagination)==null?void 0:o.current,pageSize:(s=C.pagination)==null?void 0:s.pageSize,filter:w,sortOrder:C.sortOrder==="descend"?"DESC":"ASC"}).then(l=>{i(l.data),$({...C,pagination:{...C.pagination,total:l.total}})}).catch(l=>P.error(`Error http get quoters: ${l.message}`)).finally(()=>O("data",!1))},v=(o,s,l)=>{var y;$({pagination:o,filters:s,sortOrder:Array.isArray(l)?void 0:l.order,sortField:Array.isArray(l)?void 0:l.field}),o.pageSize!==((y=C.pagination)==null?void 0:y.pageSize)&&i([])};return d.useEffect(()=>{Ne().then(o=>x(o==null?void 0:o.filter(s=>s.estado))).catch(o=>P.error(`Error http get customers: ${o.message}}`))},[]),d.useEffect(()=>{f()},[JSON.stringify(C),w]),t.jsxs("div",{className:"h-100 flex flex-column p-3",children:[t.jsxs("div",{className:"flex flex-md-column gap-3 justify-between items-end mb-3",children:[t.jsxs("div",{className:"flex flex-column",children:[t.jsx("label",{htmlFor:"cliente",children:"Cliente"}),t.jsx(A,{placeholder:"Selecciones una opción",options:b.filter(o=>o.estado).map(o=>({label:o.cliente,value:o.id_cliente})),onChange:o=>N(o),allowClear:!0,style:{minWidth:200}})]}),t.jsxs("div",{className:"flex flex-row gap-2 items-center",children:[t.jsx(W,{title:"Recargar",children:t.jsx(T,{type:"text",htmlType:"button",icon:t.jsx(z.Reload,{}),onClick:()=>f()})}),t.jsx(Ie,{onSearch:o=>N(o),onReset:()=>N("")})]}),t.jsx(T,{type:"primary",htmlType:"button",onClick:()=>{u(de),E("form")},children:"Agregar"})]}),e?t.jsx(De,{dataSource:r,loading:p.data,renderItem:o=>{var s,l;return t.jsxs("div",{className:"item-list",children:[t.jsxs("div",{className:"flex-1",children:[t.jsx("strong",{children:"Cliente: "})," ",(s=o.cliente)==null?void 0:s.cliente]}),t.jsxs("div",{className:"flex-1",children:[t.jsx("strong",{children:"Vendedor: "})," ",(l=o.vendedor)==null?void 0:l.nombre]}),t.jsxs("div",{className:"flex flex-row justify-between",children:[t.jsxs("div",{children:[t.jsx("strong",{children:"Estado: "})," ",o.estado?"Activo":"Inactivo"]}),t.jsx(T,{type:"link",danger:!0,htmlType:"button",icon:t.jsx(z.Edit,{}),onClick:()=>G(o.id_cotizacion),children:"Editar"})]})]},o.id_cotizacion)}}):t.jsx(Me,{size:"small",rowClassName:(o,s)=>s%2===0?"table-row-light":"table-row-dark",pagination:{position:["none","bottomRight"],...C.pagination,showSizeChanger:!0,pageSizeOptions:[50,100,250,500]},onChange:v,className:"table",loading:p.data,showSorterTooltip:!1,rowKey:"id_cotizacion",dataSource:r,columns:[{title:"No",dataIndex:"id_cotizacion",sorter:!0},{title:"Fecha",dataIndex:"fecha_creacion",ellipsis:!0,sorter:!0,render:o=>t.jsx("span",{children:Te(o,"DD/MM/YYYY")})},{title:"Vendedor",dataIndex:"vendedor",ellipsis:!0,sorter:!0,render:o=>t.jsx("span",{children:o.nombre})},{title:"Cliente",dataIndex:"cliente",ellipsis:!0,sorter:!0,render:o=>t.jsx("span",{children:o.cliente})},{title:"Marca",dataIndex:"marca",ellipsis:!0},{title:"Modelo",dataIndex:"modelo",ellipsis:!0},{title:"Aprobada",dataIndex:"aprobada",sorter:!0,align:"center",render:o=>t.jsx("span",{className:o?"text-success":"text-danger",children:t.jsx(be,{color:o?"success":"error",children:o?"Sí":"No"})})},{title:"Opciones",dataIndex:"operacion",width:80,render:(o,s)=>t.jsxs("div",{className:"flex flex-row gap-1",children:[t.jsx(W,{title:"Editar",children:t.jsx(T,{style:{width:40},icon:t.jsx(z.Edit,{}),type:"text",size:"small",onClick:()=>G(s.id_cotizacion)})}),t.jsx(W,{title:"Descargar",children:t.jsx(T,{style:{width:40},icon:t.jsx(z.Download,{}),type:"text",size:"small",onClick:()=>h(s),disabled:p.services})}),!s.aprobada&&t.jsx(W,{title:"Aprobar",children:t.jsx(T,{style:{width:40},icon:t.jsx(z.Done,{}),type:"text",size:"small",onClick:()=>S(s),disabled:p.services})}),s.aprobada&&t.jsx(W,{title:"Ir a Vehiculos",children:t.jsx(T,{style:{width:40},icon:t.jsx(z.Workspace,{}),type:"text",size:"small",onClick:()=>c(`/${le.PRIVATE}/${le.VEHICLES}/${s.id_cotizacion}`),disabled:p.services})})]})}]}),t.jsx(te,{open:j.form,title:t.jsxs("h3",{children:[g.id_cotizacion>0?"Editar":"Agregar"," Cotización"]}),footer:null,onCancel:()=>E("form",!1),centered:!0,destroyOnClose:!0,width:1200,children:t.jsx(at,{quoter:g,loading:p.services,customers:b,onSubmit:n,onDownloadInvoice:h,onAproveQuoter:S})})]})};export{jt as Quoter};