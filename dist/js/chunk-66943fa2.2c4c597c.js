(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66943fa2"],{"326a":function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"result"},[e("div",[e("a-icon",{class:[t.isSuccess?"success":"error","icon"],attrs:{type:t.isSuccess?"check-circle":"close-circle"}})],1),t.title?e("div",{staticClass:"title"},[t._v(t._s(t.title))]):t._e(),t.description?e("div",{staticClass:"desc"},[t._v(t._s(t.description))]):t._e(),e("div",{staticClass:"content"},[t._t("default")],2),e("div",{staticClass:"action"},[t._t("action")],2)])},c=[],a={name:"Result",props:["isSuccess","title","description"]},n=a,r=(e("905e"),e("2877")),o=Object(r["a"])(n,s,c,!1,null,"56f6d1c0",null);i["a"]=o.exports},"905e":function(t,i,e){"use strict";var s=e("b227"),c=e.n(s);c.a},b227:function(t,i,e){},fdc1:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("a-card",{attrs:{bordered:!1}},[e("result",{staticStyle:{"margin-bottom":"16px","margin-top":"48px"},attrs:{"is-success":!1,title:t.title,description:t.description}},[e("template",{slot:"action"},[e("a-button",{attrs:{type:"primary"}},[t._v("返回修改")])],1),e("div",[e("div",{staticStyle:{fontSize:"16px",color:"rgba(0, 0, 0, 0.85)",fontWeight:"500",marginBottom:"16px"}},[t._v("\n        您提交的内容有如下错误：\n      ")]),e("div",{staticStyle:{"margin-bottom":"16px"}},[e("a-icon",{staticStyle:{color:"#f5222d","margin-right":"8px"},attrs:{type:"close-circle-o"}}),t._v("\n        您的账户已被冻结\n        "),e("a",{staticStyle:{"margin-left":"16px"}},[t._v("立即解冻 "),e("a-icon",{attrs:{type:"right"}})],1)],1),e("div",[e("a-icon",{staticStyle:{color:"#f5222d","margin-right":"8px"},attrs:{type:"close-circle-o"}}),t._v("\n        您的账户还不具备申请资格\n        "),e("a",{staticStyle:{"margin-left":"16px"}},[t._v("立即升级 "),e("a-icon",{attrs:{type:"right"}})],1)],1)])],2)],1)},c=[],a=e("326a"),n={name:"Error",components:{Result:a["a"]},data:function(){return{title:"提交失败",description:"请核对并修改以下信息后，再重新提交。"}}},r=n,o=e("2877"),l=Object(o["a"])(r,s,c,!1,null,"a432d5ce",null);i["default"]=l.exports}}]);