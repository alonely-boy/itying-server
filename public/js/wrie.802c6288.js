(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["wrie"],{"145e":function(e,t,r){"use strict";var a=r("d096"),i=r.n(a);i.a},d096:function(e,t,r){},ed6a:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("nav-bar",{attrs:{subtitle:"写文章"}}),r("div",{staticClass:"content"},[r("div",{staticClass:"help"},[r("el-button",{attrs:{type:"text"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("帮助")]),r("el-dialog",{attrs:{title:"帮助",modal:!1,visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("div",[r("ul",{staticStyle:{color:"#e83e8c"}},[r("li",[e._v("当你切换页面时，草稿会存到浏览器缓存里 (并不保险)")]),r("br"),r("li",[e._v("文章标题为2-30个字")]),r("br"),r("li",[e._v("文章二级分类（可选）为自定义标签，最多定义4个")]),r("br"),r("li",[e._v("题图（可选）图片会展示在首页右侧缩略图和文章开头")]),r("br"),r("li",[e._v("所有图片建议比例为2:3至3:2之间，大小不能超过2MB")])])]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1),r("div",{staticClass:"xieyi"},[r("el-button",{attrs:{type:"text"},on:{click:function(t){e.dialogVisible1=!0}}},[e._v("用户协议")]),r("el-dialog",{attrs:{title:"用户协议",modal:!1,visible:e.dialogVisible1,width:"50%"},on:{"update:visible":function(t){e.dialogVisible1=t}}},[r("div",[r("ul",{staticStyle:{color:"#e83e8c"}},[r("li",[e._v("用户不得发布色情，暴力等各种法律禁止的内容")]),r("br"),r("li",[e._v("用户在本站发布的文章，管理者有权力建议修改，修改，删除其中内容，使得文章符合规范")]),r("br"),r("li",[e._v("转载等文章需符合转载规范")])])]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible1=!1}}},[e._v("确 定")])],1)])],1),r("el-form",{ref:"ruleForm",attrs:{"label-position":"left",model:e.form,"label-width":"80px",rules:e.rules}},[r("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("el-form-item",{attrs:{label:"文章分类",prop:"category"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.category.value,callback:function(t){e.$set(e.form.category,"value",t)},expression:"form.category.value"}},e._l(e.options,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"二级分类"}},[e._l(e.form.category.children,(function(t,a){return r("el-tag",{key:a,attrs:{closable:"","disable-transitions":!1},on:{close:function(r){return e.handleClose(t)}}},[e._v(e._s(t))])})),e.inputVisible?r("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small",disabled:4==e.form.category.children.length},on:{blur:e.handleInputConfirm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleInputConfirm(t)}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}):r("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:e.showInput}},[e._v("+ New Tag")])],2),r("el-form-item",{attrs:{label:"添加题图"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://localhost:3000/server/api/upload","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.form.icon?r("img",{staticClass:"useravatar",attrs:{src:e.form.icon}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),r("el-form-item",{attrs:{label:"文章内容",prop:"content","label-width":"80px"}},[r("vue-editor",{attrs:{useCustomImageHandler:""},on:{"image-added":e.handleImageAdded},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即发布")]),r("el-button",{staticStyle:{float:"right"},on:{click:e.cancle}},[e._v("清空")])],1)],1)],1)],1)},i=[],n=(r("c975"),r("a434"),r("96cf"),r("1da1")),o=r("d000"),l=r("5873"),s={name:"Write",data:function(){return{dialogVisible:!1,dialogVisible1:!1,rules:{title:[{required:!0,message:"请输入文章标题",trigger:"blur"},{min:2,max:30,message:"标题长度为2-30个字符",trigger:"blur"}],category:[{required:!0,message:"请选择文章分类",trigger:"blur"}],content:[{required:!0,message:"请输入文章内容",trigger:"blur"},{min:15,message:"文章内容不少于15个字",trigger:"blur"}]},options:[{value:"IT技术",label:"IT技术"},{value:"校园生活",label:"校园生活"},{value:"经验分享",label:"经验分享"},{value:"论坛提问",label:"论坛提问"}],inputVisible:!1,inputValue:"",form:{category:{value:"IT技术",children:[]},title:"",content:"",icon:""},logined:!0}},methods:{cancle:function(){var e=this;this.$confirm("确定清空当前内容和草稿?","确认操作",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.form.icon="",localStorage.form="",e.$refs.ruleForm.resetFields()})).catch((function(){}))},handleClose:function(e){this.form.category.children.splice(this.form.category.children.indexOf(e))},showInput:function(){var e=this;this.inputVisible=!0,this.$nextTick((function(t){e.$refs.saveTagInput.$refs.input.focus()}))},handleInputConfirm:function(){var e=this.inputValue;e&&this.form.category.children.push(e),this.inputVisible=!1,this.inputValue=""},handleAvatarSuccess:function(e){this.form.icon=e.url},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type,r=e.size/1024/1024<=2;return t||this.$message.error("上传头像图片只能是 JPG或者PNG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&r},onSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.ruleForm.validate(function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return");case 2:e.$confirm("确定发布?","确认操作",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.form.time=(new Date).getTime(),t.next=3,e.$http.post("/",e.form);case 3:t.sent,e.$message.success("发布成功"),e.form.icon="",localStorage.form="",e.$refs.ruleForm.resetFields(),e.$router.push("/");case 9:case"end":return t.stop()}}),t)})))).catch((function(){}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},handleImageAdded:function(e,t,r,a){var i=this;return Object(n["a"])(regeneratorRuntime.mark((function n(){var o,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!(e.size>=2306867.2)){n.next=5;break}return i.$message.error("图片大小不能超过2MB"),n.abrupt("return");case 5:if("image/jpeg"==e.type||"image/jpg"==e.type||"image/png"==e.type){n.next=9;break}i.$message.error("图片必须是JPG或者PNG格式"),n.next=16;break;case 9:return o=new FormData,o.append("file",e),n.next=13,i.$http.post("upload",o);case 13:l=n.sent,t.insertEmbed(r,"image",l.data.url),a();case 16:case"end":return n.stop()}}),n)})))()}},components:{NavBar:o["a"],VueEditor:l["a"]},mounted:function(){localStorage.form&&(this.form=JSON.parse(localStorage.form))},beforeRouteLeave:function(e,t,r){(this.form.title||this.form.content)&&window.localStorage.setItem("form",JSON.stringify(this.form)),r()}},c=s,u=(r("145e"),r("2877")),f=Object(u["a"])(c,a,i,!1,null,"4634dc28",null);t["default"]=f.exports}}]);