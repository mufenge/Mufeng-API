"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[703],{62552:function(P,l,t){t.r(l),t.d(l,{default:function(){return j}});var v=t(5574),u=t.n(v),c=t(11774),m=t(39048),e=t(67294),h=t(15009),d=t.n(h),g=t(97857),p=t.n(g),y=t(99289),T=t.n(y),S=t(35312);function A(s){return r.apply(this,arguments)}function r(){return r=T()(d()().mark(function s(o){return d()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.abrupt("return",(0,S.request)("/api/analysis/top/interfaceInvoke/",p()({method:"GET"},o||{})));case 1:case"end":return a.stop()}},s)})),r.apply(this,arguments)}var f=t(85893),I=function(){var o=(0,e.useState)([]),i=u()(o,2),a=i[0],G=i[1],C=(0,e.useState)(!0),E=u()(C,1),x=E[0];(0,e.useEffect)(function(){try{A().then(function(n){n.data&&G(n.data)})}catch(n){}},[]);var O=a.map(function(n){return{value:n.totalNum,name:n.name}}),D={title:{text:"\u8C03\u7528\u63A5\u53E3\u6B21\u6570TOP3",left:"center"},tooltip:{trigger:"item"},legend:{orient:"vertical",left:"left"},series:[{name:"\u63A5\u53E3\u4FE1\u606F",type:"pie",radius:"50%",data:O,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};return(0,f.jsx)(c._z,{children:(0,f.jsx)(m.Z,{loadingOption:{showLoading:x},option:D})})},j=I}}]);