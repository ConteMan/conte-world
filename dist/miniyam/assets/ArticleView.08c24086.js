import{b as m,_ as d,a as f}from"./article.e4516b21.js";import{j as h,z as v,A as w,k as x,t as g,c as k,a as c,y as i,u as A,o as y,_ as V}from"./index.85ced484.js";const b={flex:"~ col","md:max-w":"full","lg:max-w":"[800px]","lg:w":"[800px]","min-h":"[100vh]",p:"[2em]"},C={p:"t-4 b-[24px] x-2",flex:"","gap-2":"",text:"[18px]"},$=["innerHTML"],B=h({__name:"ArticleView",setup(M){const o=v(),n=w(),s=n.params.id?Number(n.params.id):0;s||o.push({path:"/article"});const r=x({content:null}),{content:p}=g(r);return(async t=>{const e=await m(t);e?r.content=e:o.push({path:"/article"})})(s),(t,e)=>{var a;const l=d,_=f;return y(),k("div",b,[c("div",C,[i(l,{"cursor-pointer":"",opacity:"40",hover:"opacity-100",onClick:e[0]||(e[0]=u=>t.$router.push("/root"))}),i(_,{"cursor-pointer":"",opacity:"40",hover:"opacity-100",onClick:e[1]||(e[1]=u=>t.$router.push("/article"))})]),c("div",{class:"global-markdown p-2",innerHTML:(a=A(p))==null?void 0:a.content_html},null,8,$)])}}}),H=V(B,[["__file","/Users/ConteMan/Desktop/project/conte-world/src/views/article/ArticleView.vue"]]);export{H as default};