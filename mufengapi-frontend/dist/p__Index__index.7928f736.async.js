"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[500],{33786:function($,v,r){r.r(v);var y=r(15009),u=r.n(y),U=r(99289),s=r.n(U),S=r(5574),i=r.n(S),o=r(51522),A=r(11774),m=r(45360),g=r(2487),f=r(67294),d=r(85893),h=function(){var I=(0,f.useState)(!1),C=i()(I,2),P=C[0],D=C[1],E=(0,f.useState)([]),M=i()(E,2),T=M[0],R=M[1],b=(0,f.useState)(0),j=i()(b,2),O=j[0],t=j[1],n=function(){var a=s()(u()().mark(function _(){var e,G,B,L,K,W,p,c=arguments;return u()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return e=c.length>0&&c[0]!==void 0?c[0]:1,G=c.length>1&&c[1]!==void 0?c[1]:8,D(!0),l.prev=3,l.next=6,(0,o.Kz)({current:e,pageSize:G});case 6:p=l.sent,R((B=p==null||(L=p.data)===null||L===void 0?void 0:L.records)!==null&&B!==void 0?B:[]),t((K=p==null||(W=p.data)===null||W===void 0?void 0:W.total)!==null&&K!==void 0?K:0),l.next=14;break;case 11:l.prev=11,l.t0=l.catch(3),m.ZP.error("\u52A0\u8F7D\u6570\u636E\u5931\u8D25");case 14:D(!1);case 15:case"end":return l.stop()}},_,null,[[3,11]])}));return function(){return a.apply(this,arguments)}}();return(0,f.useEffect)(function(){n()},[]),(0,d.jsx)(A._z,{title:"\u5728\u7EBFAPI\u5F00\u653E\u5E73\u53F0",children:(0,d.jsx)(g.Z,{className:"my-list",loading:P,itemLayout:"horizontal",dataSource:T,renderItem:function(_){var e="/interface_info/".concat(_.id);return(0,d.jsx)(g.Z.Item,{actions:[(0,d.jsx)("a",{href:e,children:"\u67E5\u770B"},_.id)],children:(0,d.jsx)(g.Z.Item.Meta,{title:(0,d.jsx)("a",{href:e,children:_.name}),description:_.description})})},pagination:{showTotal:function(_){return"\u603B\u6570:"+_},pageSize:8,total:O,onChange:function(_,e){n(_,e)}}})})};v.default=h},51522:function($,v,r){r.d(v,{GC:function(){return R},Kz:function(){return D},Lu:function(){return w},T7:function(){return j},US:function(){return d},XG:function(){return g},Y4:function(){return A},zr:function(){return M}});var y=r(15009),u=r.n(y),U=r(97857),s=r.n(U),S=r(99289),i=r.n(S),o=r(35312);function A(t,n){return m.apply(this,arguments)}function m(){return m=i()(u()().mark(function t(n,a){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)("/api/interfaceInfo/add",s()({method:"POST",headers:{"Content-Type":"application/json"},data:n},a||{})));case 1:case"end":return e.stop()}},t)})),m.apply(this,arguments)}function g(t,n){return f.apply(this,arguments)}function f(){return f=i()(u()().mark(function t(n,a){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)("/api/interfaceInfo/delete",s()({method:"POST",headers:{"Content-Type":"application/json"},data:n},a||{})));case 1:case"end":return e.stop()}},t)})),f.apply(this,arguments)}function d(t,n){return h.apply(this,arguments)}function h(){return h=i()(u()().mark(function t(n,a){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)("/api/interfaceInfo/get",s()({method:"GET",params:s()({},n)},a||{})));case 1:case"end":return e.stop()}},t)})),h.apply(this,arguments)}function w(t,n){return I.apply(this,arguments)}function I(){return I=i()(u()().mark(function t(n,a){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)("/api/interfaceInfo/invoke",s()({method:"POST",headers:{"Content-Type":"application/json"},data:n},a||{})));case 1:case"end":return e.stop()}},t)})),I.apply(this,arguments)}function C(t,n){return P.apply(this,arguments)}function P(){return P=_asyncToGenerator(_regeneratorRuntime().mark(function t(n,a){return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",request("/api/interfaceInfo/list",_objectSpread({method:"GET",params:_objectSpread({},n)},a||{})));case 1:case"end":return e.stop()}},t)})),P.apply(this,arguments)}function D(t,n){return E.apply(this,arguments)}function E(){return E=i()(u()().mark(function t(n,a){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)("/api/interfaceInfo/list/page",s()({method:"GET",params:s()({},n)},a||{})));case 1:case"end":return e.stop()}},t)})),E.apply(this,arguments)}function M(t,n){return T.apply(this,arguments)}function T(){return T=i()(u()().mark(function t(n,a){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)("/api/interfaceInfo/offline",s()({method:"POST",headers:{"Content-Type":"application/json"},data:n},a||{})));case 1:case"end":return e.stop()}},t)})),T.apply(this,arguments)}function R(t,n){return b.apply(this,arguments)}function b(){return b=i()(u()().mark(function t(n,a){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)("/api/interfaceInfo/online",s()({method:"POST",headers:{"Content-Type":"application/json"},data:n},a||{})));case 1:case"end":return e.stop()}},t)})),b.apply(this,arguments)}function j(t,n){return O.apply(this,arguments)}function O(){return O=i()(u()().mark(function t(n,a){return u()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)("/api/interfaceInfo/update",s()({method:"POST",headers:{"Content-Type":"application/json"},data:n},a||{})));case 1:case"end":return e.stop()}},t)})),O.apply(this,arguments)}}}]);
