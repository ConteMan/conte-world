import{f as d}from"./article-9ddcd5c8.js";import{d as u,q as h,t as _,v as s,x as f,C as n,b as l,F as v,z as g,e as x,D as c,o as a,y as k}from"./index-1bc46014.js";const y={flex:"~ col",p:"[2em]","md:max-w":"full","lg:max-w":"[800px]","lg:w":"[800px]","min-h":"[100vh]"},C={p:"t-4 b-[24px] x-2",flex:"","gap-2":"",text:"[18px]"},$={key:0,flex:"~ col","gap-4":""},w=["onClick"],V=u({__name:"Article",setup(b){const o=h({list:[],total:0,has_more:!0}),{list:i}=_(o);return(async()=>{const t=await d();t&&(o.list=t.items,o.has_more=t.has_more,o.total=t.total)})(),(t,r)=>{const p=c("mdi-home"),m=c("mdi-arrow-left");return a(),s("div",y,[f("div",C,[n(p,{"cursor-pointer":"",opacity:"40",hover:"opacity-100",onClick:r[0]||(r[0]=e=>t.$router.push("/root"))}),n(m,{"cursor-pointer":"",opacity:"40",hover:"opacity-100",onClick:r[1]||(r[1]=e=>t.$router.push("/root"))})]),l(i).length?(a(),s("div",$,[(a(!0),s(v,null,g(l(i),e=>(a(),s("div",{key:e.id,flex:"",justify:"start","gap-4":"","rounded-md":"",p:"2",hover:"bg-light-800","dark:hover":"text-black bg-light-800","cursor-pointer":"",onClick:L=>t.$router.push({path:`/article/${e.id}`})},k(e.title),9,w))),128))])):x("",!0)])}}});export{V as default};
