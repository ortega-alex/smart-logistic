import{r as c,j as e}from"./index-DeRs25tb.js";import{I as a,B as l}from"./Icon-ZCyfFCep.js";import{I as x}from"./index-gyB3Elxo.js";const m=({onSearch:o,onReset:n})=>{const[s,t]=c.useState("");return e.jsx(x,{prefix:e.jsx(a.Search,{}),placeholder:"Buscar",value:s,className:"search",onChange:r=>t(r.target.value),onKeyDown:r=>{r.key==="Enter"&&o(s)},suffix:s?e.jsx(l,{size:"small",type:"text",icon:e.jsx(a.Close,{}),onClick:()=>{t(""),n()}}):null})};export{m as S};
