(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[95],{96540:function(e,t,n){"use strict";var s=n(64836);t.Z=void 0;var r=s(n(64938)),a=n(85893);t.Z=(0,r.default)((0,a.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},48625:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ticket/[projectId]",function(){return n(69964)}])},69964:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var s=n(91309),r=n(85893),a=n(67294),i=n(82607),c=n(96540);n(5786);var d=n(11010),l=n(72253),u=n(14932),o=n(97582);n(64046);var h=n(87066);function p(e){var t=e.id,n=e.title,i=e.start,c=e.end,p=e.urgence,_=e.updated_at,x=e.status,j=e.planningId,v=e.userData,g=e.description,f=(0,s._)((0,a.useState)({start_date:i,end_date:c,planningId:j,userId:v.user.id,title:n,urgenceId:p,description:g,status:x}),2),m=f[0],N=f[1],k=(0,s._)((0,a.useState)(!1),2),y=k[0],I=k[1],b=new Date,C=new Date(_),w=Number(b)-Number(C);function D(){return(D=(0,d._)(function(){return(0,o.Jh)(this,function(e){switch(e.label){case 0:return[4,h.Z.patch("http://localhost:8000/api/ticket/"+t,m,{headers:{Authorization:"Bearer ".concat(v.user.token)}})];case 1:return 200==e.sent().status&&window.location.reload(),[2]}})})).apply(this,arguments)}function S(){return(S=(0,d._)(function(){return(0,o.Jh)(this,function(e){switch(e.label){case 0:return[4,h.Z.delete("http://localhost:8000/api/ticket/"+t,{headers:{Authorization:"Bearer ".concat(v.user.token)}})];case 1:return 200==e.sent().status&&window.location.reload(),[2]}})})).apply(this,arguments)}return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{"data-cy":"box_ticket_card",className:"card",style:{borderLeft:"7px solid "+({0:"#8BC729",1:"#0083E1",2:"#ffa60063",3:"#ff000038"})[m.urgenceId],cursor:"pointer"},onClick:function(){return I(!0)},children:[(0,r.jsx)("h3",{"data-cy":"name_ticket_card",children:n}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{"data-cy":"period_ticket_card",children:[i.substring(0,10)," - ",c.substring(0,10)]}),(0,r.jsxs)("p",{"data-cy":"urgence_ticket_card",children:["Status : ",x]})]}),(0,r.jsxs)("p",{"data-cy":"maj_ticket_card",className:"card_date",children:["Dernier maj : ",(0,r.jsxs)("strong",{children:["il y a ",(w/864e5).toString().split(".")[0]," jours"]})]})]}),y?(0,r.jsx)("div",{className:"ticket_modal",children:(0,r.jsxs)("div",{className:"ticket_main_modal",children:[(0,r.jsx)("img",{src:"/assets/icons/icon-cross.svg",alt:"",className:"cross",onClick:function(){return I(!1)}}),(0,r.jsxs)("div",{className:"ticket_form",children:[(0,r.jsx)("h3",{children:"Modifier votre ticket"}),(0,r.jsxs)("div",{className:"same_line",children:[(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Titre *"}),(0,r.jsx)("input",{type:"text",placeholder:"Cr\xe9ation du ticket",value:m.title,onChange:function(e){return N((0,u._)((0,l._)({},m),{title:e.target.value}))}})]}),(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Date de d\xe9but"}),(0,r.jsx)("input",{type:"date",placeholder:"Date de d\xe9but",value:m.start_date.substring(0,10),onChange:function(e){return N((0,u._)((0,l._)({},m),{start_date:e.target.value.trim()}))}})]}),(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Date de fin"}),(0,r.jsx)("input",{type:"date",placeholder:"Date de fin",value:m.end_date.substring(0,10),onChange:function(e){return N((0,u._)((0,l._)({},m),{end_date:e.target.value.trim()}))}})]})]}),(0,r.jsxs)("div",{className:"second_line",children:[(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Status"}),(0,r.jsxs)("select",{onChange:function(e){var t=e.target.value.trim();N((0,u._)((0,l._)({},m),{status:t}))},required:!0,children:[(0,r.jsx)("option",{value:"a faire",selected:"a faire"===m.status,children:"\xc0 faire"}),(0,r.jsx)("option",{value:"en cours",selected:"en cours"===m.status,children:"En cours"}),(0,r.jsx)("option",{value:"en retard",selected:"en retard"===m.status,children:"En retard"}),(0,r.jsx)("option",{value:"r\xe9solu",selected:"r\xe9solu"===m.status,children:"R\xe9solu"})]})]}),(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Urgence"}),(0,r.jsxs)("select",{onChange:function(e){var t=parseInt(e.target.value);N((0,u._)((0,l._)({},m),{urgenceId:t}))},required:!0,children:[(0,r.jsx)("option",{value:0,selected:0===m.urgenceId,children:"Mineur"}),(0,r.jsx)("option",{value:1,selected:1===m.urgenceId,children:"Moyen"}),(0,r.jsx)("option",{value:2,selected:2===m.urgenceId,children:"Majeur"}),(0,r.jsx)("option",{value:3,selected:3===m.urgenceId,children:"Urgent"})]})]})]}),(0,r.jsx)("div",{className:"third_line",children:(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Description"}),(0,r.jsx)("textarea",{value:m.description,onChange:function(e){return N((0,u._)((0,l._)({},m),{description:e.target.value}))}})]})}),(0,r.jsxs)("div",{className:"buttn_container",children:[(0,r.jsx)("button",{className:"next_btn",onClick:function(){return D.apply(this,arguments)},children:"Valider"}),(0,r.jsx)("button",{className:"delete_btn",onClick:function(){return S.apply(this,arguments)},children:"Supprimer"})]})]})]})}):null]})}n(87520);var _=function(e){var t=e.userData,n=e.selectedProject,i=(0,s._)((0,a.useState)({start_date:new Date().toISOString().split("T")[0],end_date:new Date().toISOString().split("T")[0],planningId:n.ticket.planning[0].id,userId:t.user.id,title:"",urgenceId:0,description:"",status:"a faire"}),2),c=i[0],p=i[1];function _(){return(_=(0,d._)(function(){return(0,o.Jh)(this,function(e){switch(e.label){case 0:return[4,h.Z.post("http://localhost:8000/api/ticket",c,{headers:{Authorization:"Bearer ".concat(t.user.token)}})];case 1:return e.sent(),window.location.reload(),[2]}})})).apply(this,arguments)}return(0,r.jsxs)("div",{className:"ticket_form",children:[(0,r.jsx)("h3",{children:"Cr\xe9ez votre ticket"}),(0,r.jsxs)("div",{className:"same_line",children:[(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Titre *"}),(0,r.jsx)("input",{type:"text",placeholder:"Cr\xe9ation du ticket",name:"",id:"",onChange:function(e){return p((0,u._)((0,l._)({},c),{title:e.target.value.trim()}))}})]}),(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Date de d\xe9but"}),(0,r.jsx)("input",{type:"date",placeholder:"Date de d\xe9but",onChange:function(e){return p((0,u._)((0,l._)({},c),{start_date:e.target.value.trim()}))}})]}),(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Date de fin"}),(0,r.jsx)("input",{type:"date",placeholder:"Date de fin",onChange:function(e){return p((0,u._)((0,l._)({},c),{end_date:e.target.value.trim()}))}})]})]}),(0,r.jsxs)("div",{className:"second_line",children:[(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Status"}),(0,r.jsxs)("select",{onChange:function(e){return p((0,u._)((0,l._)({},c),{status:e.target.value.trim()}))},required:!0,children:[(0,r.jsx)("option",{value:"a faire",children:"\xc0 faire"}),(0,r.jsx)("option",{value:"en cours",children:"En cours"}),(0,r.jsx)("option",{value:"en retard",children:"En retard"}),(0,r.jsx)("option",{value:"r\xe9solu",children:"R\xe9solu"})]})]}),(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Urgence"}),(0,r.jsxs)("select",{onChange:function(e){return p((0,u._)((0,l._)({},c),{urgenceId:parseInt(e.target.value)}))},required:!0,children:[(0,r.jsx)("option",{value:0,children:"Mineur"}),(0,r.jsx)("option",{value:1,children:"Moyen"}),(0,r.jsx)("option",{value:2,children:"Majeur"}),(0,r.jsx)("option",{value:3,children:"Urgent"})]})]})]}),(0,r.jsx)("div",{className:"third_line",children:(0,r.jsxs)("div",{className:"input_grp",children:[(0,r.jsx)("p",{children:"Description"}),(0,r.jsx)("textarea",{name:"",id:"",onChange:function(e){return p((0,u._)((0,l._)({},c),{description:e.target.value}))}})]})}),(0,r.jsx)("button",{className:"next_btn",onClick:function(){return function(){return _.apply(this,arguments)}()},children:"Valider"})]})};function x(e){var t=e.userData;e.updateUserData;var n=(0,s._)((0,a.useState)(!1),2),d=n[0],l=n[1],u=(0,s._)((0,a.useState)({}),2),o=u[0],h=u[1],x=(0,s._)((0,a.useState)({todo:[],inprogress:[],late:[],done:[]}),2),j=x[0],v=x[1];return(0,a.useEffect)(function(){var e={todo:[],inprogress:[],late:[],done:[]},n=!0,s=!1,r=void 0;try{for(var a,i=t.project[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){var c=a.value;if(c.id==new URL(window.location.href).pathname.split("/")[2]){h(c);var d=!0,l=!1,u=void 0;try{for(var o,p=c.ticket.ticket[Symbol.iterator]();!(d=(o=p.next()).done);d=!0){var _=o.value;"a faire"===_.status?e.todo.push(_):"r\xe9solu"===_.status?e.done.push(_):"en retard"===_.status?e.late.push(_):"en cours"===_.status&&e.inprogress.push(_)}}catch(e){l=!0,u=e}finally{try{d||null==p.return||p.return()}finally{if(l)throw u}}}}}catch(e){s=!0,r=e}finally{try{n||null==i.return||i.return()}finally{if(s)throw r}}v(e)},[t]),console.log(j),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"ticketPage",children:[(0,r.jsxs)("div",{className:"header",children:[(0,r.jsx)("h1",{children:"Gestion des tickets"}),(0,r.jsx)(i.Z,{onClick:function(){return l(!0)},children:(0,r.jsx)(c.Z,{fontSize:"medium",sx:{color:"#000000"}})})]}),(0,r.jsx)("hr",{style:{marginLeft:0}}),(0,r.jsxs)("div",{className:"ticket_container",children:[(0,r.jsxs)("div",{className:"debut_container",children:[(0,r.jsxs)("div",{className:"todo_container",children:[(0,r.jsx)("h2",{children:"A faire"}),(0,r.jsx)("div",{className:"card_container",children:j.todo.map(function(e){return(0,r.jsx)(p,{id:e.id,title:e.title,start:e.start_date,end:e.end_date,urgence:e.urgenceId,status:e.status,planningId:e.planningId,updated_at:e.updated_at,userData:t,description:e.description},e.id)})})]}),(0,r.jsxs)("div",{className:"inprogress_container",children:[(0,r.jsx)("h2",{children:"En cours"}),(0,r.jsx)("div",{className:"card_container",children:j.inprogress.map(function(e){return(0,r.jsx)(p,{id:e.id,title:e.title,start:e.start_date,end:e.end_date,urgence:e.urgenceId,status:e.status,planningId:e.planningId,updated_at:e.updated_at,userData:t,description:e.description},e.id)})})]})]}),(0,r.jsxs)("div",{className:"fin_container",children:[(0,r.jsxs)("div",{className:"late_container",children:[(0,r.jsx)("h2",{children:"En retard"}),(0,r.jsx)("div",{className:"card_container",children:j.late.map(function(e){return(0,r.jsx)(p,{id:e.id,title:e.title,start:e.start_date,end:e.end_date,urgence:e.urgenceId,status:e.status,planningId:e.planningId,updated_at:e.updated_at,userData:t,description:e.description},e.id)})})]}),(0,r.jsxs)("div",{className:"done_container",children:[(0,r.jsx)("h2",{children:"R\xe9solu"}),(0,r.jsx)("div",{className:"card_container",children:j.done.map(function(e){return(0,r.jsx)(p,{id:e.id,title:e.title,start:e.start_date,end:e.end_date,urgence:e.urgenceId,status:e.status,planningId:e.planningId,updated_at:e.updated_at,userData:t,description:e.description},e.id)})})]})]})]}),d?(0,r.jsx)("div",{className:"ticket_modal",children:(0,r.jsxs)("div",{className:"ticket_main_modal",children:[(0,r.jsx)("img",{src:"/assets/icons/icon-cross.svg",alt:"",className:"cross",onClick:function(){l(!1)}}),(0,r.jsx)(_,{userData:t,selectedProject:o})]})}):null]})})}},64046:function(){},87520:function(){},5786:function(){}},function(e){e.O(0,[607,774,888,179],function(){return e(e.s=48625)}),_N_E=e.O()}]);