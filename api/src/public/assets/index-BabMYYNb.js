import{m as R,b as h,r as i,C as B,c as E,T as Z}from"./index-DUTae07C.js";import{g as L,m as A,Q as V,w as K,o as ee,x as te,S as re,W as oe,U as ne}from"./method-http.utility-DTRIZLiH.js";import{u as ae,p as G}from"./Private-XhUdaezg.js";const Oe={id_cotizacion:0,id_cliente:0,id_vendedor:0,id_tipo_vehiculo:0,marca:"",modelo:"",anio:"",id_puerto:0,estado:!0};var ie=(e=>(e.USD="Grua EE.UU",e.GTQ="Grua GT",e.PORT_SHIPPING="Embarque",e.PORT_DOCUMENT_OR_EXP="ADUANA Y DOCS. EXP",e))(ie||{});const we={nombre:"",moneda:"",valor:0},le=e=>{const{componentCls:r,sizePaddingEdgeHorizontal:n,colorSplit:t,lineWidth:o,textPaddingInline:c,orientationMargin:a,verticalMarginInline:l}=e;return{[r]:Object.assign(Object.assign({},R(e)),{borderBlockStart:`${h(o)} solid ${t}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:l,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${h(o)} solid ${t}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${h(e.dividerHorizontalGutterMargin)} 0`},[`&-horizontal${r}-with-text`]:{display:"flex",alignItems:"center",margin:`${h(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${t}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${h(o)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${r}-with-text-left`]:{"&::before":{width:`calc(${a} * 100%)`},"&::after":{width:`calc(100% - ${a} * 100%)`}},[`&-horizontal${r}-with-text-right`]:{"&::before":{width:`calc(100% - ${a} * 100%)`},"&::after":{width:`calc(${a} * 100%)`}},[`${r}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:c},"&-dashed":{background:"none",borderColor:t,borderStyle:"dashed",borderWidth:`${h(o)} 0 0`},[`&-horizontal${r}-with-text${r}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${r}-dashed`]:{borderInlineStartWidth:o,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:t,borderStyle:"dotted",borderWidth:`${h(o)} 0 0`},[`&-horizontal${r}-with-text${r}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${r}-dotted`]:{borderInlineStartWidth:o,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${r}-with-text`]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},[`&-horizontal${r}-with-text-left${r}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${r}-inner-text`]:{paddingInlineStart:n}},[`&-horizontal${r}-with-text-right${r}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${r}-inner-text`]:{paddingInlineEnd:n}}})}},se=e=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:e.marginXS}),ce=L("Divider",e=>{const r=A(e,{dividerHorizontalWithTextGutterMargin:e.margin,dividerHorizontalGutterMargin:e.marginLG,sizePaddingEdgeHorizontal:0});return[le(r)]},se,{unitless:{orientationMargin:!0}});var de=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)r.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n};const ze=e=>{const{getPrefixCls:r,direction:n,divider:t}=i.useContext(B),{prefixCls:o,type:c="horizontal",orientation:a="center",orientationMargin:l,className:p,rootClassName:m,children:g,dashed:f,variant:b="solid",plain:y,style:x}=e,u=de(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style"]),s=r("divider",o),[$,P,w]=ce(s),O=!!g,v=a==="left"&&l!=null,z=a==="right"&&l!=null,d=E(s,t==null?void 0:t.className,P,w,`${s}-${c}`,{[`${s}-with-text`]:O,[`${s}-with-text-${a}`]:O,[`${s}-dashed`]:!!f,[`${s}-${b}`]:b!=="solid",[`${s}-plain`]:!!y,[`${s}-rtl`]:n==="rtl",[`${s}-no-default-orientation-margin-left`]:v,[`${s}-no-default-orientation-margin-right`]:z},p,m),T=i.useMemo(()=>typeof l=="number"?l:/^\d+$/.test(l)?Number(l):l,[l]),N=Object.assign(Object.assign({},v&&{marginLeft:T}),z&&{marginRight:T});return $(i.createElement("div",Object.assign({className:d,style:Object.assign(Object.assign({},t==null?void 0:t.style),x)},u,{role:"separator"}),g&&c!=="vertical"&&i.createElement("span",{className:`${s}-inner-text`,style:N},g)))},ge=e=>{const{paddingXXS:r,lineWidth:n,tagPaddingHorizontal:t,componentCls:o,calc:c}=e,a=c(t).sub(n).equal(),l=c(r).sub(n).equal();return{[o]:Object.assign(Object.assign({},R(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:a,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",background:e.defaultBg,border:`${h(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${o}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${o}-close-icon`]:{marginInlineStart:l,fontSize:e.tagIconSize,color:e.colorTextDescription,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},[`&${o}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]:{color:e.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${o}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:a}}),[`${o}-borderless`]:{borderColor:"transparent",background:e.tagBorderlessBg}}},M=e=>{const{lineWidth:r,fontSizeIcon:n,calc:t}=e,o=e.fontSizeSM;return A(e,{tagFontSize:o,tagLineHeight:h(t(e.lineHeightSM).mul(o).equal()),tagIconSize:t(n).sub(t(r).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},_=e=>({defaultBg:new Z(e.colorFillQuaternary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText}),U=L("Tag",e=>{const r=M(e);return ge(r)},_);var ue=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)r.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n};const pe=i.forwardRef((e,r)=>{const{prefixCls:n,style:t,className:o,checked:c,onChange:a,onClick:l}=e,p=ue(e,["prefixCls","style","className","checked","onChange","onClick"]),{getPrefixCls:m,tag:g}=i.useContext(B),f=$=>{a==null||a(!c),l==null||l($)},b=m("tag",n),[y,x,u]=U(b),s=E(b,`${b}-checkable`,{[`${b}-checkable-checked`]:c},g==null?void 0:g.className,o,x,u);return y(i.createElement("span",Object.assign({},p,{ref:r,style:Object.assign(Object.assign({},t),g==null?void 0:g.style),className:s,onClick:f})))}),be=e=>K(e,(r,n)=>{let{textColor:t,lightBorderColor:o,lightColor:c,darkColor:a}=n;return{[`${e.componentCls}${e.componentCls}-${r}`]:{color:t,background:c,borderColor:o,"&-inverse":{color:e.colorTextLightSolid,background:a,borderColor:a},[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}}),he=V(["Tag","preset"],e=>{const r=M(e);return be(r)},_);function me(e){return typeof e!="string"?e:e.charAt(0).toUpperCase()+e.slice(1)}const I=(e,r,n)=>{const t=me(n);return{[`${e.componentCls}${e.componentCls}-${r}`]:{color:e[`color${n}`],background:e[`color${t}Bg`],borderColor:e[`color${t}Border`],[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}},fe=V(["Tag","status"],e=>{const r=M(e);return[I(r,"success","Success"),I(r,"processing","Info"),I(r,"error","Error"),I(r,"warning","Warning")]},_);var Ce=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)r.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n};const $e=i.forwardRef((e,r)=>{const{prefixCls:n,className:t,rootClassName:o,style:c,children:a,icon:l,color:p,onClose:m,bordered:g=!0,visible:f}=e,b=Ce(e,["prefixCls","className","rootClassName","style","children","icon","color","onClose","bordered","visible"]),{getPrefixCls:y,direction:x,tag:u}=i.useContext(B),[s,$]=i.useState(!0),P=ee(b,["closeIcon","closable"]);i.useEffect(()=>{f!==void 0&&$(f)},[f]);const w=te(p),O=re(p),v=w||O,z=Object.assign(Object.assign({backgroundColor:p&&!v?p:void 0},u==null?void 0:u.style),c),d=y("tag",n),[T,N,X]=U(d),q=E(d,u==null?void 0:u.className,{[`${d}-${p}`]:v,[`${d}-has-color`]:p&&!v,[`${d}-hidden`]:!s,[`${d}-rtl`]:x==="rtl",[`${d}-borderless`]:!g},t,o,N,X),H=S=>{S.stopPropagation(),m==null||m(S),!S.defaultPrevented&&$(!1)},[,F]=ae(G(e),G(u),{closable:!1,closeIconRender:S=>{const J=i.createElement("span",{className:`${d}-close-icon`,onClick:H},S);return ne(S,J,C=>({onClick:D=>{var j;(j=C==null?void 0:C.onClick)===null||j===void 0||j.call(C,D),H(D)},className:E(C==null?void 0:C.className,`${d}-close-icon`)}))}}),Q=typeof b.onClick=="function"||a&&a.type==="a",W=l||null,Y=W?i.createElement(i.Fragment,null,W,a&&i.createElement("span",null,a)):a,k=i.createElement("span",Object.assign({},P,{ref:r,className:q,style:z}),Y,F,w&&i.createElement(he,{key:"preset",prefixCls:d}),O&&i.createElement(fe,{key:"status",prefixCls:d}));return T(Q?i.createElement(oe,{component:"Tag"},k):k)}),ve=$e;ve.CheckableTag=pe;export{ze as D,we as E,ie as K,ve as T,Oe as a};