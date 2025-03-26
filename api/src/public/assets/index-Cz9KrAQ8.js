import{r as u,_ as W,h as L,g as q,k as z,f as A,n as $,D as R,o as X,ab as K,m as V,H as _}from"./index-BKeSh-za.js";import{Y as D,K as H,g as B,m as F,f as G,ag as Q,w as Y}from"./method-http.utility-BqWs-HUi.js";var J=["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"],N=u.forwardRef(function(e,n){var c,a=e.prefixCls,l=a===void 0?"rc-switch":a,r=e.className,o=e.checked,t=e.defaultChecked,i=e.disabled,d=e.loadingIcon,s=e.checkedChildren,g=e.unCheckedChildren,I=e.onClick,p=e.onChange,b=e.onKeyDown,M=W(e,J),v=D(!1,{value:o,defaultValue:t}),y=L(v,2),C=y[0],S=y[1];function w(h,k){var f=C;return i||(f=h,S(f),p==null||p(f,k)),f}function x(h){h.which===H.LEFT?w(!1,h):h.which===H.RIGHT&&w(!0,h),b==null||b(h)}function m(h){var k=w(!C,h);I==null||I(k,h)}var E=q(l,r,(c={},z(c,"".concat(l,"-checked"),C),z(c,"".concat(l,"-disabled"),i),c));return u.createElement("button",A({},M,{type:"button",role:"switch","aria-checked":C,disabled:i,className:E,ref:n,onKeyDown:x,onClick:m}),d,u.createElement("span",{className:"".concat(l,"-inner")},u.createElement("span",{className:"".concat(l,"-inner-checked")},s),u.createElement("span",{className:"".concat(l,"-inner-unchecked")},g)))});N.displayName="Switch";const U=e=>{const{componentCls:n,trackHeightSM:c,trackPadding:a,trackMinWidthSM:l,innerMinMarginSM:r,innerMaxMarginSM:o,handleSizeSM:t,calc:i}=e,d=`${n}-inner`,s=$(i(t).add(i(a).mul(2)).equal()),g=$(i(o).mul(2).equal());return{[n]:{[`&${n}-small`]:{minWidth:l,height:c,lineHeight:$(c),[`${n}-inner`]:{paddingInlineStart:o,paddingInlineEnd:r,[`${d}-checked, ${d}-unchecked`]:{minHeight:c},[`${d}-checked`]:{marginInlineStart:`calc(-100% + ${s} - ${g})`,marginInlineEnd:`calc(100% - ${s} + ${g})`},[`${d}-unchecked`]:{marginTop:i(c).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},[`${n}-handle`]:{width:t,height:t},[`${n}-loading-icon`]:{top:i(i(t).sub(e.switchLoadingIconSize)).div(2).equal(),fontSize:e.switchLoadingIconSize},[`&${n}-checked`]:{[`${n}-inner`]:{paddingInlineStart:r,paddingInlineEnd:o,[`${d}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${d}-unchecked`]:{marginInlineStart:`calc(100% - ${s} + ${g})`,marginInlineEnd:`calc(-100% + ${s} - ${g})`}},[`${n}-handle`]:{insetInlineStart:`calc(100% - ${$(i(t).add(a).equal())})`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${d}`]:{[`${d}-unchecked`]:{marginInlineStart:i(e.marginXXS).div(2).equal(),marginInlineEnd:i(e.marginXXS).mul(-1).div(2).equal()}},[`&${n}-checked ${d}`]:{[`${d}-checked`]:{marginInlineStart:i(e.marginXXS).mul(-1).div(2).equal(),marginInlineEnd:i(e.marginXXS).div(2).equal()}}}}}}},Z=e=>{const{componentCls:n,handleSize:c,calc:a}=e;return{[n]:{[`${n}-loading-icon${e.iconCls}`]:{position:"relative",top:a(a(c).sub(e.fontSize)).div(2).equal(),color:e.switchLoadingIconColor,verticalAlign:"top"},[`&${n}-checked ${n}-loading-icon`]:{color:e.switchColor}}}},ee=e=>{const{componentCls:n,trackPadding:c,handleBg:a,handleShadow:l,handleSize:r,calc:o}=e,t=`${n}-handle`;return{[n]:{[t]:{position:"absolute",top:c,insetInlineStart:c,width:r,height:r,transition:`all ${e.switchDuration} ease-in-out`,"&::before":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,backgroundColor:a,borderRadius:o(r).div(2).equal(),boxShadow:l,transition:`all ${e.switchDuration} ease-in-out`,content:'""'}},[`&${n}-checked ${t}`]:{insetInlineStart:`calc(100% - ${$(o(r).add(c).equal())})`},[`&:not(${n}-disabled):active`]:{[`${t}::before`]:{insetInlineEnd:e.switchHandleActiveInset,insetInlineStart:0},[`&${n}-checked ${t}::before`]:{insetInlineEnd:0,insetInlineStart:e.switchHandleActiveInset}}}}},ne=e=>{const{componentCls:n,trackHeight:c,trackPadding:a,innerMinMargin:l,innerMaxMargin:r,handleSize:o,calc:t}=e,i=`${n}-inner`,d=$(t(o).add(t(a).mul(2)).equal()),s=$(t(r).mul(2).equal());return{[n]:{[i]:{display:"block",overflow:"hidden",borderRadius:100,height:"100%",paddingInlineStart:r,paddingInlineEnd:l,transition:`padding-inline-start ${e.switchDuration} ease-in-out, padding-inline-end ${e.switchDuration} ease-in-out`,[`${i}-checked, ${i}-unchecked`]:{display:"block",color:e.colorTextLightSolid,fontSize:e.fontSizeSM,transition:`margin-inline-start ${e.switchDuration} ease-in-out, margin-inline-end ${e.switchDuration} ease-in-out`,pointerEvents:"none",minHeight:c},[`${i}-checked`]:{marginInlineStart:`calc(-100% + ${d} - ${s})`,marginInlineEnd:`calc(100% - ${d} + ${s})`},[`${i}-unchecked`]:{marginTop:t(c).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},[`&${n}-checked ${i}`]:{paddingInlineStart:l,paddingInlineEnd:r,[`${i}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${i}-unchecked`]:{marginInlineStart:`calc(100% - ${d} + ${s})`,marginInlineEnd:`calc(-100% + ${d} - ${s})`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${i}`]:{[`${i}-unchecked`]:{marginInlineStart:t(a).mul(2).equal(),marginInlineEnd:t(a).mul(-1).mul(2).equal()}},[`&${n}-checked ${i}`]:{[`${i}-checked`]:{marginInlineStart:t(a).mul(-1).mul(2).equal(),marginInlineEnd:t(a).mul(2).equal()}}}}}},ie=e=>{const{componentCls:n,trackHeight:c,trackMinWidth:a}=e;return{[n]:Object.assign(Object.assign(Object.assign(Object.assign({},R(e)),{position:"relative",display:"inline-block",boxSizing:"border-box",minWidth:a,height:c,lineHeight:$(c),verticalAlign:"middle",background:e.colorTextQuaternary,border:"0",borderRadius:100,cursor:"pointer",transition:`all ${e.motionDurationMid}`,userSelect:"none",[`&:hover:not(${n}-disabled)`]:{background:e.colorTextTertiary}}),X(e)),{[`&${n}-checked`]:{background:e.switchColor,[`&:hover:not(${n}-disabled)`]:{background:e.colorPrimaryHover}},[`&${n}-loading, &${n}-disabled`]:{cursor:"not-allowed",opacity:e.switchDisabledOpacity,"*":{boxShadow:"none",cursor:"not-allowed"}},[`&${n}-rtl`]:{direction:"rtl"}})}},ae=e=>{const{fontSize:n,lineHeight:c,controlHeight:a,colorWhite:l}=e,r=n*c,o=a/2,t=2,i=r-t*2,d=o-t*2;return{trackHeight:r,trackHeightSM:o,trackMinWidth:i*2+t*4,trackMinWidthSM:d*2+t*2,trackPadding:t,handleBg:l,handleSize:i,handleSizeSM:d,handleShadow:`0 2px 4px 0 ${new K("#00230b").setAlpha(.2).toRgbString()}`,innerMinMargin:i/2,innerMaxMargin:i+t+t*2,innerMinMarginSM:d/2,innerMaxMarginSM:d+t+t*2}},te=B("Switch",e=>{const n=F(e,{switchDuration:e.motionDurationMid,switchColor:e.colorPrimary,switchDisabledOpacity:e.opacityLoading,switchLoadingIconSize:e.calc(e.fontSizeIcon).mul(.75).equal(),switchLoadingIconColor:`rgba(0, 0, 0, ${e.opacityLoading})`,switchHandleActiveInset:"-30%"});return[ie(n),ne(n),ee(n),Z(n),U(n)]},ae);var ce=function(e,n){var c={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(c[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,a=Object.getOwnPropertySymbols(e);l<a.length;l++)n.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(c[a[l]]=e[a[l]]);return c};const le=u.forwardRef((e,n)=>{const{prefixCls:c,size:a,disabled:l,loading:r,className:o,rootClassName:t,style:i,checked:d,value:s,defaultChecked:g,defaultValue:I,onChange:p}=e,b=ce(e,["prefixCls","size","disabled","loading","className","rootClassName","style","checked","value","defaultChecked","defaultValue","onChange"]),[M,v]=D(!1,{value:d??s,defaultValue:g??I}),{getPrefixCls:y,direction:C,switch:S}=u.useContext(V),w=u.useContext(_),x=(l??w)||r,m=y("switch",c),E=u.createElement("div",{className:`${m}-handle`},r&&u.createElement(Y,{className:`${m}-loading-icon`})),[h,k,f]=te(m),P=G(a),O=q(S==null?void 0:S.className,{[`${m}-small`]:P==="small",[`${m}-loading`]:r,[`${m}-rtl`]:C==="rtl"},o,t,k,f),T=Object.assign(Object.assign({},S==null?void 0:S.style),i),j=function(){v(arguments.length<=0?void 0:arguments[0]),p==null||p.apply(void 0,arguments)};return h(u.createElement(Q,{component:"Switch"},u.createElement(N,Object.assign({},b,{checked:M,onChange:j,prefixCls:m,className:O,style:T,disabled:x,ref:n,loadingIcon:E}))))}),de=le;de.__ANT_SWITCH=!0;export{de as S};
