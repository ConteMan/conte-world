(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-315de800"],{"03cd":function(t,e,a){},"1af6":function(t,e,a){var r=a("63b6");r(r.S,"Array",{isArray:a("9003")})},"2ed4":function(t,e,a){"use strict";var r=a("03cd"),o=a.n(r);o.a},"5eab":function(t,e,a){"use strict";var r=a("736c"),o=a.n(r);o.a},"5ed4":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-card",{staticClass:"card",attrs:{title:"仓库管理",bordered:!1}},[a("repository-form",{ref:"repository",attrs:{showSubmit:!1}})],1),a("a-card",{staticClass:"card",attrs:{title:"任务管理",bordered:!1}},[a("task-form",{ref:"task",attrs:{showSubmit:!1}})],1),a("a-card",{attrs:{title:"用户管理",bordered:!1}},[a("table-form")],1),a("footer-tool-bar",[a("a-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.validate}},[t._v("提交")])],1)],1)},o=[],s=function(){var t=this,e=this,a=e.$createElement,r=e._self._c||a;return r("a-form",{staticClass:"form",attrs:{autoFormCreate:function(e){return t.form=e}},on:{submit:e.handleSubmit}},[r("a-row",{staticClass:"form-row"},[r("a-col",{attrs:{lg:6,md:12,sm:24}},[r("a-form-item",{attrs:{label:"仓库名",fieldDecoratorId:"repository.name",fieldDecoratorOptions:{rules:[{required:!0,message:"请输入仓库名称",whitespace:!0}]}}},[r("a-input",{attrs:{placeholder:"请输入仓库名称"}})],1)],1),r("a-col",{attrs:{xl:{span:6,offset:2},lg:{span:8},md:{span:12},sm:24}},[r("a-form-item",{attrs:{label:"仓库域名",fieldDecoratorId:"repository.domain",fieldDecoratorOptions:{rules:[{required:!0,message:"请输入仓库域名",whitespace:!0},{validator:e.validate}]}}},[r("a-input",{attrs:{addonBefore:"http://",addonAfter:".github.io",placeholder:"请输入"}})],1)],1),r("a-col",{attrs:{xl:{span:8,offset:2},lg:{span:10},md:{span:24},sm:24}},[r("a-form-item",{attrs:{label:"仓库管理员",fieldDecoratorId:"repository.manager",fieldDecoratorOptions:{rules:[{required:!0,message:"请选择管理员"}]}}},[r("a-select",{attrs:{placeholder:"请选择管理员"}},[r("a-select-option",{attrs:{value:"王同学"}},[e._v("王同学")]),r("a-select-option",{attrs:{value:"李同学"}},[e._v("李同学")]),r("a-select-option",{attrs:{value:"黄同学"}},[e._v("黄同学")])],1)],1)],1)],1),r("a-row",{staticClass:"form-row"},[r("a-col",{attrs:{lg:6,md:12,sm:24}},[r("a-form-item",{attrs:{label:"审批人",fieldDecoratorId:"repository.auditor",fieldDecoratorOptions:{rules:[{required:!0,message:"请选择审批员"}]}}},[r("a-select",{attrs:{placeholder:"请选择审批员"}},[r("a-select-option",{attrs:{value:"王晓丽"}},[e._v("王晓丽")]),r("a-select-option",{attrs:{value:"李军"}},[e._v("李军")])],1)],1)],1),r("a-col",{attrs:{xl:{span:6,offset:2},lg:{span:8},md:{span:12},sm:24}},[r("a-form-item",{attrs:{label:"生效日期",fieldDecoratorId:"repository.effectiveDate",fieldDecoratorOptions:{rules:[{required:!0,message:"请选择生效日期"}]}}},[r("a-range-picker",{staticStyle:{width:"100%"}})],1)],1),r("a-col",{attrs:{xl:{span:8,offset:2},lg:{span:10},md:{span:24},sm:24}},[r("a-form-item",{attrs:{label:"仓库类型",fieldDecoratorId:"repository.type",fieldDecoratorOptions:{rules:[{required:!0,message:"请选择仓库类型"}]}}},[r("a-select",{attrs:{placeholder:"请选择仓库类型"}},[r("a-select-option",{attrs:{value:"公开"}},[e._v("公开")]),r("a-select-option",{attrs:{value:"私密"}},[e._v("私密")])],1)],1)],1)],1),e.showSubmit?r("a-form-item",[r("a-button",{attrs:{htmlType:"submit"}},[e._v("Submit")])],1):e._e()],1)},n=[],i={name:"RepositoryForm",props:["showSubmit"],methods:{handleSubmit:function(t){t.preventDefault(),this.form.validateFields(function(t,e){t||console.log("Received values of form: ",e)})},validate:function(t,e,a){void 0!==e&&"iczer"!==e&&a("输入'iczer'试下？"),a()}}},l=i,c=(a("8524"),a("2877")),d=Object(c["a"])(l,s,n,!1,null,"5afe0544",null),u=d.exports,f=function(){var t=this,e=this,a=e.$createElement,r=e._self._c||a;return r("a-form",{staticClass:"form",attrs:{autoFormCreate:function(e){return t.form=e}},on:{submit:e.handleSubmit}},[r("a-row",{staticClass:"form-row"},[r("a-col",{attrs:{lg:6,md:12,sm:24}},[r("a-form-item",{attrs:{label:"任务名",fieldDecoratorId:"task.name",fieldDecoratorOptions:{rules:[{required:!0,message:"请输入任务名称",whitespace:!0}]}}},[r("a-input",{attrs:{placeholder:"请输入任务名称"}})],1)],1),r("a-col",{attrs:{xl:{span:6,offset:2},lg:{span:8},md:{span:12},sm:24}},[r("a-form-item",{attrs:{label:"任务描述",fieldDecoratorId:"task.description",fieldDecoratorOptions:{rules:[{required:!0,message:"请输入任务描述",whitespace:!0}]}}},[r("a-input",{attrs:{placeholder:"请输入任务描述"}})],1)],1),r("a-col",{attrs:{xl:{span:8,offset:2},lg:{span:10},md:{span:24},sm:24}},[r("a-form-item",{attrs:{label:"执行人",fieldDecoratorId:"task.executor",fieldDecoratorOptions:{rules:[{required:!0,message:"请选择执行人"}]}}},[r("a-select",{attrs:{placeholder:"请选择执行人"}},[r("a-select-option",{attrs:{value:"黄丽丽"}},[e._v("黄丽丽")]),r("a-select-option",{attrs:{value:"李大刀"}},[e._v("李大刀")])],1)],1)],1)],1),r("a-row",{staticClass:"form-row"},[r("a-col",{attrs:{lg:6,md:12,sm:24}},[r("a-form-item",{attrs:{label:"责任人",fieldDecoratorId:"task.manager",fieldDecoratorOptions:{rules:[{required:!0,message:"请选择责任人"}]}}},[r("a-select",{attrs:{placeholder:"请选择责任人"}},[r("a-select-option",{attrs:{value:"王伟"}},[e._v("王伟")]),r("a-select-option",{attrs:{value:"李红军"}},[e._v("李红军")])],1)],1)],1),r("a-col",{attrs:{xl:{span:6,offset:2},lg:{span:8},md:{span:12},sm:24}},[r("a-form-item",{attrs:{label:"提醒时间",fieldDecoratorId:"task.time",fieldDecoratorOptions:{rules:[{required:!0,message:"请选择提醒时间"}]}}},[r("a-time-picker",{staticStyle:{width:"100%"}})],1)],1),r("a-col",{attrs:{xl:{span:8,offset:2},lg:{span:10},md:{span:24},sm:24}},[r("a-form-item",{attrs:{label:"任务类型",fieldDecoratorId:"task.type",fieldDecoratorOptions:{rules:[{required:!0,message:"请选择任务类型"}]}}},[r("a-select",{attrs:{placeholder:"请选择任务类型"}},[r("a-select-option",{attrs:{value:"定时执行"}},[e._v("定时执行")]),r("a-select-option",{attrs:{value:"周期执行"}},[e._v("周期执行")])],1)],1)],1)],1),e.showSubmit?r("a-form-item",[r("a-button",{attrs:{htmlType:"submit"}},[e._v("Submit")])],1):e._e()],1)},m=[],p={name:"TaskForm",props:["showSubmit"],methods:{handleSubmit:function(t){t.preventDefault(),this.form.validateFields(function(t,e){t||console.log("Received values of form: ",e)})}}},v=p,b=(a("be9e"),Object(c["a"])(v,f,m,!1,null,"11a854eb",null)),h=b.exports,y=function(){var t=this,e=this,a=e.$createElement,r=e._self._c||a;return r("form",{attrs:{autoFormCreate:function(e){return t.form=e}}},[r("a-table",{attrs:{columns:e.columns,dataSource:e.dataSource,pagination:!1},scopedSlots:e._u([e._l(["name","workId","department"],function(t,a){return{key:t,fn:function(o,s,n){return[s.editable?r("a-input",{key:t,staticStyle:{margin:"-5px 0"},attrs:{value:o,placeholder:e.columns[a].title},on:{change:function(a){return e.handleChange(a.target.value,s.key,t)}}}):[e._v(e._s(o))]]}}}),{key:"operation",fn:function(t,a,o){return[a.editable?[a.isNew?r("span",[r("a",{on:{click:function(t){return e.saveRow(a.key)}}},[e._v("添加")]),r("a-divider",{attrs:{type:"vertical"}}),r("a-popconfirm",{attrs:{title:"是否要删除此行？"},on:{confirm:function(t){return e.remove(a.key)}}},[r("a",[e._v("删除")])])],1):r("span",[r("a",{on:{click:function(t){return e.saveRow(a.key)}}},[e._v("保存")]),r("a-divider",{attrs:{type:"vertical"}}),r("a",{on:{click:function(t){return e.cancle(a.key)}}},[e._v("取消")])],1)]:r("span",[r("a",{on:{click:function(t){return e.toggle(a.key)}}},[e._v("编辑")]),r("a-divider",{attrs:{type:"vertical"}}),r("a-popconfirm",{attrs:{title:"是否要删除此行？"},on:{confirm:function(t){return e.remove(a.key)}}},[r("a",[e._v("删除")])])],1)]}}],null,!0)}),r("a-button",{staticStyle:{width:"100%","margin-top":"16px","margin-bottom":"8px"},attrs:{type:"dashed",icon:"plus"},on:{click:e.newMeber}},[e._v("新增成员")])],1)},k=[],g=a("a745"),w=a.n(g);function _(t){if(w()(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}var S=a("774e"),D=a.n(S),x=a("c8bb"),I=a.n(x);function O(t){if(I()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return D()(t)}function F(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function C(t){return _(t)||O(t)||F()}var R=[{title:"成员姓名",dataIndex:"name",key:"name",width:"20%",scopedSlots:{customRender:"name"}},{title:"工号",dataIndex:"workId",key:"workId",width:"20%",scopedSlots:{customRender:"workId"}},{title:"所属部门",dataIndex:"department",key:"department",width:"40%",scopedSlots:{customRender:"department"}},{title:"操作",key:"action",scopedSlots:{customRender:"operation"}}],q=[{key:"1",name:"小明",workId:"001",editable:!1,department:"行政部"},{key:"2",name:"李莉",workId:"002",editable:!1,department:"IT部"},{key:"3",name:"王小帅",workId:"003",editable:!1,department:"财务部"}],T={name:"TableForm",data:function(){return{columns:R,dataSource:q}},methods:{handleSubmit:function(t){t.preventDefault()},newMeber:function(){this.dataSource.push({key:"99",name:"",workId:"",department:"",editable:!0,isNew:!0})},remove:function(t){var e=this.dataSource.filter(function(e){return e.key!==t});this.dataSource=e},saveRow:function(t){var e=this.dataSource.filter(function(e){return e.key===t})[0];e.editable=!1,e.isNew=!1},toggle:function(t){var e=this.dataSource.filter(function(e){return e.key===t})[0];e.editable=!e.editable},getRowByKey:function(t,e){var a=this.dataSource;return(e||a).filter(function(e){return e.key===t})[0]},cancle:function(t){var e=this.dataSource.filter(function(e){return e.key===t})[0];e.editable=!1},handleChange:function(t,e,a){var r=C(this.dataSource),o=r.filter(function(t){return e===t.key})[0];o&&(o[a]=t,this.dataSource=r)}}},j=T,A=Object(c["a"])(j,y,k,!1,null,"4fdaa778",null),$=A.exports,E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"toolbar"},[a("div",{staticStyle:{float:"left"}},[t._t("extra")],2),a("div",{staticStyle:{float:"right"}},[t._t("default")],2)])},B=[],N={name:"FooterToolBar"},z=N,J=(a("2ed4"),Object(c["a"])(z,E,B,!1,null,"ba2c64e2",null)),M=J.exports,K={name:"AdvancedForm",components:{FooterToolBar:M,TableForm:$,TaskForm:h,RepositoryForm:u},data:function(){return{desc:"高级表单常见于一次性输入和提交大批量数据的场景。",loading:!1}},methods:{validate:function(){this.$refs.repository.form.validateFields(function(t,e){t||console.log("Received values of form: ",e)}),this.$refs.task.form.validateFields(function(t,e){t||console.log("Received values of form: ",e)})}}},G=K,H=(a("5eab"),Object(c["a"])(G,r,o,!1,null,"ed2b367c",null));e["default"]=H.exports},"736c":function(t,e,a){},"774e":function(t,e,a){t.exports=a("d2d5")},8524:function(t,e,a){"use strict";var r=a("88bf"),o=a.n(r);o.a},"88bf":function(t,e,a){},a745:function(t,e,a){t.exports=a("f410")},b688:function(t,e,a){},be9e:function(t,e,a){"use strict";var r=a("b688"),o=a.n(r);o.a},c8bb:function(t,e,a){t.exports=a("54a1")},f410:function(t,e,a){a("1af6"),t.exports=a("584a").Array.isArray}}]);