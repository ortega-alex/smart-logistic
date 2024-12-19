import{K as U,f as M,a0 as G,r as a,C as W,e as T}from"./index-DeRs25tb.js";import{g as J,m as Y,L as _,v as Z,o as ee,w as oe,M as re,W as te,N as le}from"./Icon-ZCyfFCep.js";import{u as ne,p as H}from"./Private-Bb13mkBg.js";const ae=e=>{const{paddingXXS:t,lineWidth:l,tagPaddingHorizontal:o,componentCls:r,calc:c}=e,n=c(o).sub(l).equal(),u=c(t).sub(l).equal();return{[r]:Object.assign(Object.assign({},U(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:n,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",background:e.defaultBg,border:`${M(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${r}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${r}-close-icon`]:{marginInlineStart:u,fontSize:e.tagIconSize,color:e.colorTextDescription,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},[`&${r}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]:{color:e.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${r}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:n}}),[`${r}-borderless`]:{borderColor:"transparent",background:e.tagBorderlessBg}}},I=e=>{const{lineWidth:t,fontSizeIcon:l,calc:o}=e,r=e.fontSizeSM;return Y(e,{tagFontSize:r,tagLineHeight:M(o(e.lineHeightSM).mul(r).equal()),tagIconSize:o(l).sub(o(t).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},N=e=>({defaultBg:new G(e.colorFillQuaternary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText}),L=J("Tag",e=>{const t=I(e);return ae(t)},N);var se=function(e,t){var l={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(l[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(l[o[r]]=e[o[r]]);return l};const ce=a.forwardRef((e,t)=>{const{prefixCls:l,style:o,className:r,checked:c,onChange:n,onClick:u}=e,d=se(e,["prefixCls","style","className","checked","onChange","onClick"]),{getPrefixCls:m,tag:g}=a.useContext(W),f=h=>{n==null||n(!c),u==null||u(h)},C=m("tag",l),[y,S,i]=L(C),$=T(C,`${C}-checkable`,{[`${C}-checkable-checked`]:c},g==null?void 0:g.className,r,S,i);return y(a.createElement("span",Object.assign({},d,{ref:t,style:Object.assign(Object.assign({},o),g==null?void 0:g.style),className:$,onClick:f})))}),ie=e=>Z(e,(t,l)=>{let{textColor:o,lightBorderColor:r,lightColor:c,darkColor:n}=l;return{[`${e.componentCls}${e.componentCls}-${t}`]:{color:o,background:c,borderColor:r,"&-inverse":{color:e.colorTextLightSolid,background:n,borderColor:n},[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}}),de=_(["Tag","preset"],e=>{const t=I(e);return ie(t)},N);function ge(e){return typeof e!="string"?e:e.charAt(0).toUpperCase()+e.slice(1)}const v=(e,t,l)=>{const o=ge(l);return{[`${e.componentCls}${e.componentCls}-${t}`]:{color:e[`color${l}`],background:e[`color${o}Bg`],borderColor:e[`color${o}Border`],[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}},ue=_(["Tag","status"],e=>{const t=I(e);return[v(t,"success","Success"),v(t,"processing","Info"),v(t,"error","Error"),v(t,"warning","Warning")]},N);var Ce=function(e,t){var l={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(l[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(l[o[r]]=e[o[r]]);return l};const pe=a.forwardRef((e,t)=>{const{prefixCls:l,className:o,rootClassName:r,style:c,children:n,icon:u,color:d,onClose:m,bordered:g=!0,visible:f}=e,C=Ce(e,["prefixCls","className","rootClassName","style","children","icon","color","onClose","bordered","visible"]),{getPrefixCls:y,direction:S,tag:i}=a.useContext(W),[$,h]=a.useState(!0),V=ee(C,["closeIcon","closable"]);a.useEffect(()=>{f!==void 0&&h(f)},[f]);const P=oe(d),j=re(d),x=P||j,k=Object.assign(Object.assign({backgroundColor:d&&!x?d:void 0},i==null?void 0:i.style),c),s=y("tag",l),[F,R,q]=L(s),A=T(s,i==null?void 0:i.className,{[`${s}-${d}`]:x,[`${s}-has-color`]:d&&!x,[`${s}-hidden`]:!$,[`${s}-rtl`]:S==="rtl",[`${s}-borderless`]:!g},o,r,R,q),w=b=>{b.stopPropagation(),m==null||m(b),!b.defaultPrevented&&h(!1)},[,D]=ne(H(e),H(i),{closable:!1,closeIconRender:b=>{const Q=a.createElement("span",{className:`${s}-close-icon`,onClick:w},b);return le(b,Q,p=>({onClick:B=>{var O;(O=p==null?void 0:p.onClick)===null||O===void 0||O.call(p,B),w(B)},className:T(p==null?void 0:p.className,`${s}-close-icon`)}))}}),X=typeof C.onClick=="function"||n&&n.type==="a",E=u||null,K=E?a.createElement(a.Fragment,null,E,n&&a.createElement("span",null,n)):n,z=a.createElement("span",Object.assign({},V,{ref:t,className:A,style:k}),K,D,P&&a.createElement(de,{key:"preset",prefixCls:s}),j&&a.createElement(ue,{key:"status",prefixCls:s}));return F(X?a.createElement(te,{component:"Tag"},z):z)}),be=pe;be.CheckableTag=ce;export{be as T};
