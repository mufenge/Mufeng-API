"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[902],{64674:function(ve,w,r){r.r(w),r.d(w,{default:function(){return ne}});var G=r(97857),T=r.n(G),L=r(15009),t=r.n(L),N=r(99289),m=r.n(N),k=r(5574),x=r.n(k),M=r(78721),B=r(5914),h=r(67294),n=r(85893),H=function(l){var c=l.visible,C=l.columns,i=l.onCancel,p=l.onSubmit,y=(0,h.useRef)();return(0,n.jsx)(B.Z,{open:c,onCancel:function(){return i==null?void 0:i()},footer:null,children:(0,n.jsx)(M.QV,{type:"form",columns:C,formRef:y,onSubmit:function(){var g=m()(t()().mark(function d(I){return t()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:p==null||p(I);case 1:case"end":return Z.stop()}},d)}));return function(d){return g.apply(this,arguments)}}()})})},J=H,W=function(l){var c=l.values,C=l.visible,i=l.columns,p=l.onCancel,y=l.onSubmit,g=(0,h.useRef)();return(0,h.useEffect)(function(){if(g){var d;(d=g.current)===null||d===void 0||d.setFieldsValue(c)}},[c]),(0,n.jsx)(B.Z,{open:C,onCancel:function(){return p==null?void 0:p()},footer:null,children:(0,n.jsx)(M.QV,{type:"form",columns:i,formRef:g,onSubmit:function(){var d=m()(t()().mark(function I(P){return t()().wrap(function(F){for(;;)switch(F.prev=F.next){case 0:y==null||y(P);case 1:case"end":return F.stop()}},I)}));return function(I){return d.apply(this,arguments)}}()})})},X=W,$=r(82195);function Y(S,l){return b.apply(this,arguments)}function b(){return b=m()(t()().mark(function S(l,c){return t()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.abrupt("return",(0,$.request)("/api/apply",T()({method:"POST",headers:{"Content-Type":"application/json"},data:l},c||{})));case 1:case"end":return i.stop()}},S)})),b.apply(this,arguments)}var R=r(45057),q=r(11774),_=r(91677),j=r(45360),O=r(42075),U=r(4393),f=r(66828),z=r(71577),E=_.Z.Paragraph,ee=function(){var l,c,C=(0,h.useState)(!1),i=x()(C,2),p=i[0],y=i[1],g=(0,$.useModel)("@@initialState"),d=g.initialState,I=(0,h.useState)(),P=x()(I,2),Z=P[0],F=P[1],ae=(0,h.useState)(!1),K=x()(ae,2),re=K[0],A=K[1],ue=(0,h.useState)(!1),Q=x()(ue,2),le=Q[0],V=Q[1],te=[{title:"\u63A5\u53E3\u540D\u79F0\uFF1A",dataIndex:"InterfaceName",valueType:"text"},{title:"\u8054\u7CFB\u65B9\u5F0F\uFF1A",dataIndex:"contact",valueType:"text",formItemProps:{rules:[{required:!0}]}},{title:"\u63A5\u53E3\u5730\u5740\uFF1A",dataIndex:"address",valueType:"text"},{title:"\u7533\u8BF7\u63A5\u53E3\u4ECB\u7ECD\uFF1A",dataIndex:"introduction",valueType:"text",formItemProps:{rules:[{required:!0}]}}],se=[{title:"\u65B0\u5BC6\u7801",dataIndex:"userPassword",valueType:"password",formItemProps:{rules:[{required:!0,pattern:/^.{6,16}$/,message:"\u5BC6\u7801\u5FC5\u987B\u5927\u4E8E6\u4E2A\u5B57\u7B26\u4E14\u5C0F\u4E8E16\u4E2A\u5B57\u7B26\uFF01"}]}},{title:"\u786E\u8BA4\u5BC6\u7801",dataIndex:"checkPassword",valueType:"password",formItemProps:{rules:[{required:!0,pattern:/^.{6,16}$/,message:"\u5BC6\u7801\u5FC5\u987B\u5927\u4E8E6\u4E2A\u5B57\u7B26\u4E14\u5C0F\u4E8E16\u4E2A\u5B57\u7B26\uFF01"}]}}],u=d.loginUser,ie=function(){var o=m()(t()().mark(function s(){return t()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return y(!0),a.prev=1,a.next=4,(0,R.Qq)({});case 4:F(u),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(1),j.ZP.error("\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF0C"+a.t0.message);case 10:return y(!1),a.abrupt("return");case 12:case"end":return a.stop()}},s,null,[[1,7]])}));return function(){return o.apply(this,arguments)}}(),oe=function(){var o=m()(t()().mark(function s(v){var a;return t()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=j.ZP.loading("\u7533\u8BF7\u4E2D\uFF01"),e.prev=1,e.next=4,Y(T()({userAccount:u.userAccount},v));case 4:return a(),j.ZP.success("\u7533\u8BF7\u6210\u529F\uFF01"),e.abrupt("return",!0);case 9:return e.prev=9,e.t0=e.catch(1),a(),j.ZP.error("\u7533\u8BF7\u5931\u8D25\uFF01"),e.abrupt("return",!1);case 14:case"end":return e.stop()}},s,null,[[1,9]])}));return function(v){return o.apply(this,arguments)}}(),de=function(){var o=m()(t()().mark(function s(v){var a;return t()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=j.ZP.loading("\u4FEE\u6539\u4E2D"),e.prev=1,e.next=4,(0,R.I)(T()({Id:u.id},v));case 4:return a(),j.ZP.success("\u4FEE\u6539\u6210\u529F"),e.abrupt("return",!0);case 9:return e.prev=9,e.t0=e.catch(1),a(),j.ZP.error("\u4FEE\u6539\u5931\u8D25"),e.abrupt("return",!1);case 14:case"end":return e.stop()}},s,null,[[1,9]])}));return function(v){return o.apply(this,arguments)}}(),ce=`<dependency>
  <groupId>io.github.mufenge</groupId>
  <artifactId>mufengapi-clientsdk</artifactId>
  <version>1.0</version>
</dependency>`;return(0,h.useEffect)(function(){ie()},[]),(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(q._z,{title:"\u4E2A\u4EBA\u4E2D\u5FC3",loading:p,children:[(0,n.jsxs)(O.Z,{direction:"vertical",size:"middle",style:{display:"flex"},children:[(0,n.jsx)(U.Z,{children:(0,n.jsxs)(f.Z,{column:4,title:"\u4E2A\u4EBA\u4FE1\u606F",size:"default",layout:"horizontal",extra:(0,n.jsx)(z.ZP,{type:"primary",onClick:function(){A(!0)},children:"\u4FEE\u6539\u5BC6\u7801"},"primary"),children:[(0,n.jsx)(f.Z.Item,{label:"\u540D\u79F0",children:u==null?void 0:u.userAccount}),(0,n.jsx)(f.Z.Item,{label:"\u6027\u522B",children:(u==null?void 0:u.gender)===((l="0")!==null&&l!==void 0?l:null)?"\u5973":"\u7537"}),(0,n.jsx)(f.Z.Item,{label:"\u8EAB\u4EFD",children:(c=u==null?void 0:u.userRole)!==null&&c!==void 0&&c?"\u7BA1\u7406\u5458":"\u666E\u901A\u7528\u6237"}),(0,n.jsx)(f.Z.Item,{label:"\u521B\u5EFA\u65F6\u95F4",children:u==null?void 0:u.createTime})]})}),(0,n.jsx)(U.Z,{title:"\u5F00\u53D1\u8005\u5BC6\u94A5\uFF08\u5BFC\u5165sdk\u914D\u7F6Eak\u3001sk\u5373\u53EF\u8C03\u7528\u63A5\u53E3\uFF09",extra:(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(O.Z,{children:(0,n.jsx)(z.ZP,{type:"primary",onClick:function(){V(!0)},children:"\u6B22\u8FCE\u7533\u8BF7\u6DFB\u52A0\u63A5\u53E3"})})}),children:(0,n.jsxs)(f.Z,{column:1,bordered:!0,size:"small",layout:"vertical",children:[(0,n.jsx)(f.Z.Item,{label:"accessKey",children:(0,n.jsx)(E,{copyable:{tooltips:!1},children:u==null?void 0:u.accessKey})}),(0,n.jsx)(f.Z.Item,{label:"secretKey",children:(0,n.jsx)(E,{copyable:{tooltips:!1},children:u==null?void 0:u.secretKey})}),(0,n.jsx)(f.Z.Item,{label:"maven\u4F9D\u8D56",children:(0,n.jsx)(E,{copyable:{tooltips:!1},children:ce})})]})})]}),(0,n.jsx)(X,{columns:se,onSubmit:function(){var o=m()(t()().mark(function s(v){var a;return t()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,de(v);case 2:a=e.sent,a&&A(!1);case 4:case"end":return e.stop()}},s)}));return function(s){return o.apply(this,arguments)}}(),onCancel:function(){A(!1)},visible:re}),(0,n.jsx)(J,{columns:te,onCancel:function(){V(!1)},onSubmit:function(){var o=m()(t()().mark(function s(v){var a;return t()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe(v);case 2:a=e.sent,a&&A(!1);case 4:case"end":return e.stop()}},s)}));return function(s){return o.apply(this,arguments)}}(),visible:le}),(0,n.jsx)("br",{})]})})},ne=ee}}]);
