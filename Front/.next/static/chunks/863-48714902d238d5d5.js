"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[863],{5616:function(e,t,r){r.d(t,{Z:function(){return y}});var o=r(87462),n=r(63366),a=r(67294),i=r(90512),l=r(63390),s=r(86523),d=r(39707),c=r(79718),u=r(85893);let p=["className","component"];var h=r(37078),f=r(21265),m=r(10606),v=r(1588);let g=(0,v.Z)("MuiBox",["root"]),b=(0,f.Z)(),x=function(e={}){let{themeId:t,defaultTheme:r,defaultClassName:h="MuiBox-root",generateClassName:f}=e,m=(0,l.default)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(s.Z),v=a.forwardRef(function(e,a){let l=(0,c.Z)(r),s=(0,d.Z)(e),{className:v,component:g="div"}=s,b=(0,n.Z)(s,p);return(0,u.jsx)(m,(0,o.Z)({as:g,ref:a,className:(0,i.Z)(v,f?f(h):h),theme:t&&l[t]||l},b))});return v}({themeId:m.Z,defaultTheme:b,defaultClassName:g.root,generateClassName:h.Z.generate});var y=x},68540:function(e,t,r){r.d(t,{Z:function(){return w}});var o=r(63366),n=r(87462),a=r(67294),i=r(90512),l=r(94780),s=r(2101),d=r(98216),c=r(90948),u=r(85845),p=r(1588),h=r(34867);function f(e){return(0,h.ZP)("MuiButtonGroup",e)}let m=(0,p.Z)("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","firstButton","fullWidth","vertical","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary","lastButton","middleButton"]);var v=r(98363),g=r(93326),b=r(85893);let x=["children","className","color","component","disabled","disableElevation","disableFocusRipple","disableRipple","fullWidth","orientation","size","variant"],y=e=>{let{classes:t,color:r,disabled:o,disableElevation:n,fullWidth:a,orientation:i,variant:s}=e,c={root:["root",s,"vertical"===i&&"vertical",a&&"fullWidth",n&&"disableElevation"],grouped:["grouped",`grouped${(0,d.Z)(i)}`,`grouped${(0,d.Z)(s)}`,`grouped${(0,d.Z)(s)}${(0,d.Z)(i)}`,`grouped${(0,d.Z)(s)}${(0,d.Z)(r)}`,o&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return(0,l.Z)(c,f,t)},Z=(0,c.ZP)("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[{[`& .${m.grouped}`]:t.grouped},{[`& .${m.grouped}`]:t[`grouped${(0,d.Z)(r.orientation)}`]},{[`& .${m.grouped}`]:t[`grouped${(0,d.Z)(r.variant)}`]},{[`& .${m.grouped}`]:t[`grouped${(0,d.Z)(r.variant)}${(0,d.Z)(r.orientation)}`]},{[`& .${m.grouped}`]:t[`grouped${(0,d.Z)(r.variant)}${(0,d.Z)(r.color)}`]},{[`& .${m.firstButton}`]:t.firstButton},{[`& .${m.lastButton}`]:t.lastButton},{[`& .${m.middleButton}`]:t.middleButton},t.root,t[r.variant],!0===r.disableElevation&&t.disableElevation,r.fullWidth&&t.fullWidth,"vertical"===r.orientation&&t.vertical]}})(({theme:e,ownerState:t})=>(0,n.Z)({display:"inline-flex",borderRadius:(e.vars||e).shape.borderRadius},"contained"===t.variant&&{boxShadow:(e.vars||e).shadows[2]},t.disableElevation&&{boxShadow:"none"},t.fullWidth&&{width:"100%"},"vertical"===t.orientation&&{flexDirection:"column"},{[`& .${m.grouped}`]:(0,n.Z)({minWidth:40,"&:hover":(0,n.Z)({},"contained"===t.variant&&{boxShadow:"none"})},"contained"===t.variant&&{boxShadow:"none"}),[`& .${m.firstButton},& .${m.middleButton}`]:(0,n.Z)({},"horizontal"===t.orientation&&{borderTopRightRadius:0,borderBottomRightRadius:0},"vertical"===t.orientation&&{borderBottomRightRadius:0,borderBottomLeftRadius:0},"text"===t.variant&&"horizontal"===t.orientation&&{borderRight:e.vars?`1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${"light"===e.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${m.disabled}`]:{borderRight:`1px solid ${(e.vars||e).palette.action.disabled}`}},"text"===t.variant&&"vertical"===t.orientation&&{borderBottom:e.vars?`1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${"light"===e.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${m.disabled}`]:{borderBottom:`1px solid ${(e.vars||e).palette.action.disabled}`}},"text"===t.variant&&"inherit"!==t.color&&{borderColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.5)`:(0,s.Fq)(e.palette[t.color].main,.5)},"outlined"===t.variant&&"horizontal"===t.orientation&&{borderRightColor:"transparent"},"outlined"===t.variant&&"vertical"===t.orientation&&{borderBottomColor:"transparent"},"contained"===t.variant&&"horizontal"===t.orientation&&{borderRight:`1px solid ${(e.vars||e).palette.grey[400]}`,[`&.${m.disabled}`]:{borderRight:`1px solid ${(e.vars||e).palette.action.disabled}`}},"contained"===t.variant&&"vertical"===t.orientation&&{borderBottom:`1px solid ${(e.vars||e).palette.grey[400]}`,[`&.${m.disabled}`]:{borderBottom:`1px solid ${(e.vars||e).palette.action.disabled}`}},"contained"===t.variant&&"inherit"!==t.color&&{borderColor:(e.vars||e).palette[t.color].dark},{"&:hover":(0,n.Z)({},"outlined"===t.variant&&"horizontal"===t.orientation&&{borderRightColor:"currentColor"},"outlined"===t.variant&&"vertical"===t.orientation&&{borderBottomColor:"currentColor"})}),[`& .${m.lastButton},& .${m.middleButton}`]:(0,n.Z)({},"horizontal"===t.orientation&&{borderTopLeftRadius:0,borderBottomLeftRadius:0},"vertical"===t.orientation&&{borderTopRightRadius:0,borderTopLeftRadius:0},"outlined"===t.variant&&"horizontal"===t.orientation&&{marginLeft:-1},"outlined"===t.variant&&"vertical"===t.orientation&&{marginTop:-1})})),M=a.forwardRef(function(e,t){let r=(0,u.i)({props:e,name:"MuiButtonGroup"}),{children:l,className:s,color:d="primary",component:c="div",disabled:p=!1,disableElevation:h=!1,disableFocusRipple:f=!1,disableRipple:m=!1,fullWidth:M=!1,orientation:w="horizontal",size:C="medium",variant:k="outlined"}=r,R=(0,o.Z)(r,x),B=(0,n.Z)({},r,{color:d,component:c,disabled:p,disableElevation:h,disableFocusRipple:f,disableRipple:m,fullWidth:M,orientation:w,size:C,variant:k}),P=y(B),S=a.useMemo(()=>({className:P.grouped,color:d,disabled:p,disableElevation:h,disableFocusRipple:f,disableRipple:m,fullWidth:M,size:C,variant:k}),[d,p,h,f,m,M,C,k,P.grouped]),$=a.Children.toArray(l).filter(e=>a.isValidElement(e)),T=$.length,z=e=>{let t=0===e,r=e===T-1;return t&&r?"":t?P.firstButton:r?P.lastButton:P.middleButton};return(0,b.jsx)(Z,(0,n.Z)({as:c,role:"group",className:(0,i.Z)(P.root,s),ref:t,ownerState:B},R,{children:(0,b.jsx)(v.Z.Provider,{value:S,children:$.map((e,t)=>(0,b.jsx)(g.Z.Provider,{value:z(t),children:e},t))})}))});var w=M},93326:function(e,t,r){var o=r(67294);let n=o.createContext(void 0);t.Z=n},98363:function(e,t,r){var o=r(67294);let n=o.createContext({});t.Z=n},85071:function(e,t,r){r.d(t,{Z:function(){return O}});var o=r(63366),n=r(87462),a=r(67294),i=r(90512),l=r(94780),s=r(2101),d=r(98216),c=r(90948),u=r(86206),p=r(72021),h=r(74423),f=r(82607),m=r(1588),v=r(34867);function g(e){return(0,v.ZP)("PrivateSwitchBase",e)}(0,m.Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var b=r(85893);let x=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],y=e=>{let{classes:t,checked:r,disabled:o,edge:n}=e,a={root:["root",r&&"checked",o&&"disabled",n&&`edge${(0,d.Z)(n)}`],input:["input"]};return(0,l.Z)(a,g,t)},Z=(0,c.ZP)(f.Z)(({ownerState:e})=>(0,n.Z)({padding:9,borderRadius:"50%"},"start"===e.edge&&{marginLeft:"small"===e.size?-3:-12},"end"===e.edge&&{marginRight:"small"===e.size?-3:-12})),M=(0,c.ZP)("input",{shouldForwardProp:u.Z})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),w=a.forwardRef(function(e,t){let{autoFocus:r,checked:a,checkedIcon:l,className:s,defaultChecked:d,disabled:c,disableFocusRipple:u=!1,edge:f=!1,icon:m,id:v,inputProps:g,inputRef:w,name:C,onBlur:k,onChange:R,onFocus:B,readOnly:P,required:S=!1,tabIndex:$,type:T,value:z}=e,N=(0,o.Z)(e,x),[E,F]=(0,p.Z)({controlled:a,default:!!d,name:"SwitchBase",state:"checked"}),I=(0,h.Z)(),j=c;I&&void 0===j&&(j=I.disabled);let O="checkbox"===T||"radio"===T,A=(0,n.Z)({},e,{checked:E,disabled:j,disableFocusRipple:u,edge:f}),L=y(A);return(0,b.jsxs)(Z,(0,n.Z)({component:"span",className:(0,i.Z)(L.root,s),centerRipple:!0,focusRipple:!u,disabled:j,tabIndex:null,role:void 0,onFocus:e=>{B&&B(e),I&&I.onFocus&&I.onFocus(e)},onBlur:e=>{k&&k(e),I&&I.onBlur&&I.onBlur(e)},ownerState:A,ref:t},N,{children:[(0,b.jsx)(M,(0,n.Z)({autoFocus:r,checked:a,defaultChecked:d,className:L.input,disabled:j,id:O?v:void 0,name:C,onChange:e=>{if(e.nativeEvent.defaultPrevented)return;let t=e.target.checked;F(t),R&&R(e,t)},readOnly:P,ref:w,required:S,ownerState:A,tabIndex:$,type:T},"checkbox"===T&&void 0===z?{}:{value:z},g)),E?l:m]}))});var C=r(88169),k=(0,C.Z)((0,b.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),R=(0,C.Z)((0,b.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),B=(0,C.Z)((0,b.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),P=r(85845);function S(e){return(0,v.ZP)("MuiCheckbox",e)}let $=(0,m.Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),T=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],z=e=>{let{classes:t,indeterminate:r,color:o,size:a}=e,i={root:["root",r&&"indeterminate",`color${(0,d.Z)(o)}`,`size${(0,d.Z)(a)}`]},s=(0,l.Z)(i,S,t);return(0,n.Z)({},t,s)},N=(0,c.ZP)(w,{shouldForwardProp:e=>(0,u.Z)(e)||"classes"===e,name:"MuiCheckbox",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.indeterminate&&t.indeterminate,t[`size${(0,d.Z)(r.size)}`],"default"!==r.color&&t[`color${(0,d.Z)(r.color)}`]]}})(({theme:e,ownerState:t})=>(0,n.Z)({color:(e.vars||e).palette.text.secondary},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${"default"===t.color?e.vars.palette.action.activeChannel:e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,s.Fq)("default"===t.color?e.palette.action.active:e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==t.color&&{[`&.${$.checked}, &.${$.indeterminate}`]:{color:(e.vars||e).palette[t.color].main},[`&.${$.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),E=(0,b.jsx)(R,{}),F=(0,b.jsx)(k,{}),I=(0,b.jsx)(B,{}),j=a.forwardRef(function(e,t){var r,l;let s=(0,P.i)({props:e,name:"MuiCheckbox"}),{checkedIcon:d=E,color:c="primary",icon:u=F,indeterminate:p=!1,indeterminateIcon:h=I,inputProps:f,size:m="medium",className:v}=s,g=(0,o.Z)(s,T),x=p?h:u,y=p?h:d,Z=(0,n.Z)({},s,{color:c,indeterminate:p,size:m}),M=z(Z);return(0,b.jsx)(N,(0,n.Z)({type:"checkbox",inputProps:(0,n.Z)({"data-indeterminate":p},f),icon:a.cloneElement(x,{fontSize:null!=(r=x.props.fontSize)?r:m}),checkedIcon:a.cloneElement(y,{fontSize:null!=(l=y.props.fontSize)?l:m}),ownerState:Z,ref:t,className:(0,i.Z)(M.root,v)},g,{classes:M}))});var O=j},65582:function(e,t,r){r.d(t,{Z:function(){return w}});var o=r(63366),n=r(87462),a=r(67294),i=r(90512),l=r(34867),s=r(94780),d=r(14142),c=r(65149),u=r(45098),p=r(17172),h=r(85893);let f=["className","component","disableGutters","fixed","maxWidth","classes"],m=(0,p.Z)(),v=(0,u.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`maxWidth${(0,d.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),g=e=>(0,c.Z)({props:e,name:"MuiContainer",defaultTheme:m}),b=(e,t)=>{let{classes:r,fixed:o,disableGutters:n,maxWidth:a}=e,i={root:["root",a&&`maxWidth${(0,d.Z)(String(a))}`,o&&"fixed",n&&"disableGutters"]};return(0,s.Z)(i,e=>(0,l.ZP)(t,e),r)};var x=r(98216),y=r(90948),Z=r(85845);let M=function(e={}){let{createStyledComponent:t=v,useThemeProps:r=g,componentName:l="MuiContainer"}=e,s=t(({theme:e,ownerState:t})=>(0,n.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}}),({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce((t,r)=>{let o=e.breakpoints.values[r];return 0!==o&&(t[e.breakpoints.up(r)]={maxWidth:`${o}${e.breakpoints.unit}`}),t},{}),({theme:e,ownerState:t})=>(0,n.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}})),d=a.forwardRef(function(e,t){let a=r(e),{className:d,component:c="div",disableGutters:u=!1,fixed:p=!1,maxWidth:m="lg"}=a,v=(0,o.Z)(a,f),g=(0,n.Z)({},a,{component:c,disableGutters:u,fixed:p,maxWidth:m}),x=b(g,l);return(0,h.jsx)(s,(0,n.Z)({as:c,ownerState:g,className:(0,i.Z)(x.root,d),ref:t},v))});return d}({createStyledComponent:(0,y.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`maxWidth${(0,x.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,Z.i)({props:e,name:"MuiContainer"})});var w=M},66836:function(e,t,r){r.d(t,{Z:function(){return O}});var o=r(63366),n=r(87462),a=r(67294),i=r(90512),l=r(94780),s=r(74423),d=r(4953),c=r(34867),u=r(45098),p=r(65149),h=r(39707),f=r(17172),m=r(95408),v=r(98700),g=r(85893);let b=["component","direction","spacing","divider","children","className","useFlexGap"],x=(0,f.Z)(),y=(0,u.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function Z(e){return(0,p.Z)({props:e,name:"MuiStack",defaultTheme:x})}let M=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],w=({ownerState:e,theme:t})=>{let r=(0,n.Z)({display:"flex",flexDirection:"column"},(0,m.k9)({theme:t},(0,m.P$)({values:e.direction,breakpoints:t.breakpoints.values}),e=>({flexDirection:e})));if(e.spacing){let o=(0,v.hB)(t),n=Object.keys(t.breakpoints.values).reduce((t,r)=>(("object"==typeof e.spacing&&null!=e.spacing[r]||"object"==typeof e.direction&&null!=e.direction[r])&&(t[r]=!0),t),{}),a=(0,m.P$)({values:e.direction,base:n}),i=(0,m.P$)({values:e.spacing,base:n});"object"==typeof a&&Object.keys(a).forEach((e,t,r)=>{let o=a[e];if(!o){let o=t>0?a[r[t-1]]:"column";a[e]=o}}),r=(0,d.Z)(r,(0,m.k9)({theme:t},i,(t,r)=>e.useFlexGap?{gap:(0,v.NA)(o,t)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${M(r?a[r]:e.direction)}`]:(0,v.NA)(o,t)}}))}return(0,m.dt)(t.breakpoints,r)};var C=r(90948),k=r(85845);let R=function(e={}){let{createStyledComponent:t=y,useThemeProps:r=Z,componentName:s="MuiStack"}=e,d=()=>(0,l.Z)({root:["root"]},e=>(0,c.ZP)(s,e),{}),u=t(w),p=a.forwardRef(function(e,t){let l=r(e),s=(0,h.Z)(l),{component:c="div",direction:p="column",spacing:f=0,divider:m,children:v,className:x,useFlexGap:y=!1}=s,Z=(0,o.Z)(s,b),M=d();return(0,g.jsx)(u,(0,n.Z)({as:c,ownerState:{direction:p,spacing:f,useFlexGap:y},ref:t,className:(0,i.Z)(M.root,x)},Z,{children:m?function(e,t){let r=a.Children.toArray(e).filter(Boolean);return r.reduce((e,o,n)=>(e.push(o),n<r.length-1&&e.push(a.cloneElement(t,{key:`separator-${n}`})),e),[])}(v,m):v}))});return p}({createStyledComponent:(0,C.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,k.i)({props:e,name:"MuiStack"})});var B=r(15861),P=r(98216),S=r(1588);function $(e){return(0,c.ZP)("MuiFormControlLabel",e)}let T=(0,S.Z)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]);var z=r(15704);let N=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],E=e=>{let{classes:t,disabled:r,labelPlacement:o,error:n,required:a}=e,i={root:["root",r&&"disabled",`labelPlacement${(0,P.Z)(o)}`,n&&"error",a&&"required"],label:["label",r&&"disabled"],asterisk:["asterisk",n&&"error"]};return(0,l.Z)(i,$,t)},F=(0,C.ZP)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[{[`& .${T.label}`]:t.label},t.root,t[`labelPlacement${(0,P.Z)(r.labelPlacement)}`]]}})(({theme:e,ownerState:t})=>(0,n.Z)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${T.disabled}`]:{cursor:"default"}},"start"===t.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===t.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===t.labelPlacement&&{flexDirection:"column",marginLeft:16},{[`& .${T.label}`]:{[`&.${T.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),I=(0,C.ZP)("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,t)=>t.asterisk})(({theme:e})=>({[`&.${T.error}`]:{color:(e.vars||e).palette.error.main}})),j=a.forwardRef(function(e,t){var r,l;let d=(0,k.i)({props:e,name:"MuiFormControlLabel"}),{className:c,componentsProps:u={},control:p,disabled:h,disableTypography:f,label:m,labelPlacement:v="end",required:b,slotProps:x={}}=d,y=(0,o.Z)(d,N),Z=(0,s.Z)(),M=null!=(r=null!=h?h:p.props.disabled)?r:null==Z?void 0:Z.disabled,w=null!=b?b:p.props.required,C={disabled:M,required:w};["checked","name","onChange","value","inputRef"].forEach(e=>{void 0===p.props[e]&&void 0!==d[e]&&(C[e]=d[e])});let P=(0,z.Z)({props:d,muiFormControl:Z,states:["error"]}),S=(0,n.Z)({},d,{disabled:M,labelPlacement:v,required:w,error:P.error}),$=E(S),T=null!=(l=x.typography)?l:u.typography,j=m;return null==j||j.type===B.Z||f||(j=(0,g.jsx)(B.Z,(0,n.Z)({component:"span"},T,{className:(0,i.Z)($.label,null==T?void 0:T.className),children:j}))),(0,g.jsxs)(F,(0,n.Z)({className:(0,i.Z)($.root,c),ownerState:S,ref:t},y,{children:[a.cloneElement(p,C),w?(0,g.jsxs)(R,{display:"block",children:[j,(0,g.jsxs)(I,{ownerState:S,"aria-hidden":!0,className:$.asterisk,children:[" ","*"]})]}):j]}))});var O=j},47167:function(e,t,r){var o=r(67294);let n=o.createContext(void 0);t.Z=n},15704:function(e,t,r){r.d(t,{Z:function(){return o}});function o({props:e,states:t,muiFormControl:r}){return t.reduce((t,o)=>(t[o]=e[o],r&&void 0===e[o]&&(t[o]=r[o]),t),{})}},74423:function(e,t,r){r.d(t,{Z:function(){return a}});var o=r(67294),n=r(47167);function a(){return o.useContext(n.Z)}},23795:function(e,t,r){r.d(t,{Z:function(){return P}});var o=r(63366),n=r(87462),a=r(67294),i=r(90512),l=r(94780),s=r(98216),d=r(90948),c=r(85845),u=r(77760),p=r(51705),h=r(15861),f=r(1588),m=r(34867);function v(e){return(0,m.ZP)("MuiLink",e)}let g=(0,f.Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]);var b=r(54844),x=r(2101);let y={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Z=e=>y[e]||e;var M=({theme:e,ownerState:t})=>{let r=Z(t.color),o=(0,b.DW)(e,`palette.${r}`,!1)||t.color,n=(0,b.DW)(e,`palette.${r}Channel`);return"vars"in e&&n?`rgba(${n} / 0.4)`:(0,x.Fq)(o,.4)},w=r(85893);let C=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],k=e=>{let{classes:t,component:r,focusVisible:o,underline:n}=e,a={root:["root",`underline${(0,s.Z)(n)}`,"button"===r&&"button",o&&"focusVisible"]};return(0,l.Z)(a,v,t)},R=(0,d.ZP)(h.Z,{name:"MuiLink",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`underline${(0,s.Z)(r.underline)}`],"button"===r.component&&t.button]}})(({theme:e,ownerState:t})=>(0,n.Z)({},"none"===t.underline&&{textDecoration:"none"},"hover"===t.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===t.underline&&(0,n.Z)({textDecoration:"underline"},"inherit"!==t.color&&{textDecorationColor:M({theme:e,ownerState:t})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===t.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${g.focusVisible}`]:{outline:"auto"}})),B=a.forwardRef(function(e,t){let r=(0,c.i)({props:e,name:"MuiLink"}),{className:l,color:s="primary",component:d="a",onBlur:h,onFocus:f,TypographyClasses:m,underline:v="always",variant:g="inherit",sx:b}=r,x=(0,o.Z)(r,C),{isFocusVisibleRef:Z,onBlur:M,onFocus:B,ref:P}=(0,u.Z)(),[S,$]=a.useState(!1),T=(0,p.Z)(t,P),z=(0,n.Z)({},r,{color:s,component:d,focusVisible:S,underline:v,variant:g}),N=k(z);return(0,w.jsx)(R,(0,n.Z)({color:s,className:(0,i.Z)(N.root,l),classes:m,component:d,onBlur:e=>{M(e),!1===Z.current&&$(!1),h&&h(e)},onFocus:e=>{B(e),!0===Z.current&&$(!0),f&&f(e)},ref:T,ownerState:z,variant:g,sx:[...Object.keys(y).includes(s)?[]:[{color:s}],...Array.isArray(b)?b:[b]]},x))});var P=B},15861:function(e,t,r){r.d(t,{Z:function(){return w}});var o=r(63366),n=r(87462),a=r(67294),i=r(90512),l=r(39707),s=r(94780),d=r(90948),c=r(85845),u=r(98216),p=r(1588),h=r(34867);function f(e){return(0,h.ZP)("MuiTypography",e)}(0,p.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var m=r(85893);let v=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],g=e=>{let{align:t,gutterBottom:r,noWrap:o,paragraph:n,variant:a,classes:i}=e,l={root:["root",a,"inherit"!==e.align&&`align${(0,u.Z)(t)}`,r&&"gutterBottom",o&&"noWrap",n&&"paragraph"]};return(0,s.Z)(l,f,i)},b=(0,d.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.variant&&t[r.variant],"inherit"!==r.align&&t[`align${(0,u.Z)(r.align)}`],r.noWrap&&t.noWrap,r.gutterBottom&&t.gutterBottom,r.paragraph&&t.paragraph]}})(({theme:e,ownerState:t})=>(0,n.Z)({margin:0},"inherit"===t.variant&&{font:"inherit"},"inherit"!==t.variant&&e.typography[t.variant],"inherit"!==t.align&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16})),x={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},y={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Z=e=>y[e]||e,M=a.forwardRef(function(e,t){let r=(0,c.i)({props:e,name:"MuiTypography"}),a=Z(r.color),s=(0,l.Z)((0,n.Z)({},r,{color:a})),{align:d="inherit",className:u,component:p,gutterBottom:h=!1,noWrap:f=!1,paragraph:y=!1,variant:M="body1",variantMapping:w=x}=s,C=(0,o.Z)(s,v),k=(0,n.Z)({},s,{align:d,color:a,className:u,component:p,gutterBottom:h,noWrap:f,paragraph:y,variant:M,variantMapping:w}),R=p||(y?"p":w[M]||x[M])||"span",B=g(k);return(0,m.jsx)(b,(0,n.Z)({as:R,ref:t,ownerState:k,className:(0,i.Z)(B.root,u)},C))});var w=M},45098:function(e,t,r){r.d(t,{Z:function(){return b}});var o=r(87462),n=r(63366),a=r(63390),i=r(4953),l=r(17172),s=r(86523);let d=["ownerState"],c=["variants"],u=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function p(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}let h=(0,l.Z)(),f=e=>e?e.charAt(0).toLowerCase()+e.slice(1):e;function m({defaultTheme:e,theme:t,themeId:r}){return 0===Object.keys(t).length?e:t[r]||t}function v(e,t){let{ownerState:r}=t,a=(0,n.Z)(t,d),i="function"==typeof e?e((0,o.Z)({ownerState:r},a)):e;if(Array.isArray(i))return i.flatMap(e=>v(e,(0,o.Z)({ownerState:r},a)));if(i&&"object"==typeof i&&Array.isArray(i.variants)){let{variants:e=[]}=i,t=(0,n.Z)(i,c),l=t;return e.forEach(e=>{let t=!0;"function"==typeof e.props?t=e.props((0,o.Z)({ownerState:r},a,r)):Object.keys(e.props).forEach(o=>{(null==r?void 0:r[o])!==e.props[o]&&a[o]!==e.props[o]&&(t=!1)}),t&&(Array.isArray(l)||(l=[l]),l.push("function"==typeof e.style?e.style((0,o.Z)({ownerState:r},a,r)):e.style))}),l}return i}let g=function(e={}){let{themeId:t,defaultTheme:r=h,rootShouldForwardProp:l=p,slotShouldForwardProp:d=p}=e,c=e=>(0,s.Z)((0,o.Z)({},e,{theme:m((0,o.Z)({},e,{defaultTheme:r,themeId:t}))}));return c.__mui_systemSx=!0,(e,s={})=>{var h;let g;(0,a.internal_processStyles)(e,e=>e.filter(e=>!(null!=e&&e.__mui_systemSx)));let{name:b,slot:x,skipVariantsResolver:y,skipSx:Z,overridesResolver:M=(h=f(x))?(e,t)=>t[h]:null}=s,w=(0,n.Z)(s,u),C=void 0!==y?y:x&&"Root"!==x&&"root"!==x||!1,k=Z||!1,R=p;"Root"===x||"root"===x?R=l:x?R=d:"string"==typeof e&&e.charCodeAt(0)>96&&(R=void 0);let B=(0,a.default)(e,(0,o.Z)({shouldForwardProp:R,label:g},w)),P=e=>"function"==typeof e&&e.__emotion_real!==e||(0,i.P)(e)?n=>v(e,(0,o.Z)({},n,{theme:m({theme:n.theme,defaultTheme:r,themeId:t})})):e,S=(n,...a)=>{let i=P(n),l=a?a.map(P):[];b&&M&&l.push(e=>{let n=m((0,o.Z)({},e,{defaultTheme:r,themeId:t}));if(!n.components||!n.components[b]||!n.components[b].styleOverrides)return null;let a=n.components[b].styleOverrides,i={};return Object.entries(a).forEach(([t,r])=>{i[t]=v(r,(0,o.Z)({},e,{theme:n}))}),M(e,i)}),b&&!C&&l.push(e=>{var n;let a=m((0,o.Z)({},e,{defaultTheme:r,themeId:t})),i=null==a||null==(n=a.components)||null==(n=n[b])?void 0:n.variants;return v({variants:i},(0,o.Z)({},e,{theme:a}))}),k||l.push(c);let s=l.length-a.length;if(Array.isArray(n)&&s>0){let e=Array(s).fill("");(i=[...n,...e]).raw=[...n.raw,...e]}let d=B(i,...l);return e.muiName&&(d.muiName=e.muiName),d};return B.withConfig&&(S.withConfig=B.withConfig),S}}();var b=g},65149:function(e,t,r){r.d(t,{Z:function(){return a}});var o=r(35971),n=r(79718);function a({props:e,name:t,defaultTheme:r,themeId:a}){let i=(0,n.Z)(r);a&&(i=i[a]||i);let l=function(e){let{theme:t,name:r,props:n}=e;return t&&t.components&&t.components[r]&&t.components[r].defaultProps?(0,o.Z)(t.components[r].defaultProps,n):n}({theme:i,name:t,props:e});return l}},39883:function(e,t,r){var o={};!function e(t,r,o,n){var a,i,l,s,d,c,u,p,h,f,m,v=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),g="function"==typeof Path2D&&"function"==typeof DOMMatrix;function b(){}function x(e){var o=r.exports.Promise,n=void 0!==o?o:t.Promise;return"function"==typeof n?new n(e):(e(b,b),null)}var y=(a=function(){if(!t.OffscreenCanvas)return!1;var e=new OffscreenCanvas(1,1),r=e.getContext("2d");r.fillRect(0,0,1,1);var o=e.transferToImageBitmap();try{r.createPattern(o,"no-repeat")}catch(e){return!1}return!0}(),i=new Map,{transform:function(e){if(a)return e;if(i.has(e))return i.get(e);var t=new OffscreenCanvas(e.width,e.height);return t.getContext("2d").drawImage(e,0,0),i.set(e,t),t},clear:function(){i.clear()}}),Z=(d=Math.floor(1e3/60),c={},u=0,"function"==typeof requestAnimationFrame&&"function"==typeof cancelAnimationFrame?(l=function(e){var t=Math.random();return c[t]=requestAnimationFrame(function r(o){u===o||u+d-1<o?(u=o,delete c[t],e()):c[t]=requestAnimationFrame(r)}),t},s=function(e){c[e]&&cancelAnimationFrame(c[e])}):(l=function(e){return setTimeout(e,d)},s=function(e){return clearTimeout(e)}),{frame:l,cancel:s}),M=(f={},function(){if(p)return p;if(!o&&v){var t=["var CONFETTI, SIZE = {}, module = {};","("+e.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join("\n");try{p=new Worker(URL.createObjectURL(new Blob([t])))}catch(e){return"function"==typeof console.warn&&console.warn("\uD83C\uDF8A Could not load worker",e),null}!function(e){function t(t,r){e.postMessage({options:t||{},callback:r})}e.init=function(t){var r=t.transferControlToOffscreen();e.postMessage({canvas:r},[r])},e.fire=function(r,o,n){if(h)return t(r,null),h;var a=Math.random().toString(36).slice(2);return h=x(function(o){function i(t){t.data.callback===a&&(delete f[a],e.removeEventListener("message",i),h=null,y.clear(),n(),o())}e.addEventListener("message",i),t(r,a),f[a]=i.bind(null,{data:{callback:a}})})},e.reset=function(){for(var t in e.postMessage({reset:!0}),f)f[t](),delete f[t]}}(p)}return p}),w={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function C(e,t,r){var o;return o=e&&null!=e[t]?e[t]:w[t],r?r(o):o}function k(e){return e<0?0:Math.floor(e)}function R(e){return parseInt(e,16)}function B(e){return e.map(P)}function P(e){var t=String(e).replace(/[^0-9a-f]/gi,"");return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:R(t.substring(0,2)),g:R(t.substring(2,4)),b:R(t.substring(4,6))}}function S(e){e.width=document.documentElement.clientWidth,e.height=document.documentElement.clientHeight}function $(e){var t=e.getBoundingClientRect();e.width=t.width,e.height=t.height}function T(e,r){var a,i=!e,l=!!C(r||{},"resize"),s=!1,d=C(r,"disableForReducedMotion",Boolean),c=v&&C(r||{},"useWorker")?M():null,u=i?S:$,p=!!e&&!!c&&!!e.__confetti_initialized,h="function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion)").matches;function f(r){var f,m=d||C(r,"disableForReducedMotion",Boolean),v=C(r,"zIndex",Number);if(m&&h)return x(function(e){e()});i&&a?e=a.canvas:i&&!e&&((f=document.createElement("canvas")).style.position="fixed",f.style.top="0px",f.style.left="0px",f.style.pointerEvents="none",f.style.zIndex=v,e=f,document.body.appendChild(e)),l&&!p&&u(e);var b={width:e.width,height:e.height};function M(){if(c){var t={getBoundingClientRect:function(){if(!i)return e.getBoundingClientRect()}};u(t),c.postMessage({resize:{width:t.width,height:t.height}});return}b.width=b.height=null}function w(){a=null,l&&(s=!1,t.removeEventListener("resize",M)),i&&e&&(document.body.contains(e)&&document.body.removeChild(e),e=null,p=!1)}return(c&&!p&&c.init(e),p=!0,c&&(e.__confetti_initialized=!0),l&&!s&&(s=!0,t.addEventListener("resize",M,!1)),c)?c.fire(r,b,w):function(t,r,i){for(var l,s,d,c,p,h,f,m=C(t,"particleCount",k),v=C(t,"angle",Number),b=C(t,"spread",Number),M=C(t,"startVelocity",Number),w=C(t,"decay",Number),R=C(t,"gravity",Number),P=C(t,"drift",Number),S=C(t,"colors",B),$=C(t,"ticks",Number),T=C(t,"shapes"),z=C(t,"scalar"),N=!!C(t,"flat"),E=((l=C(t,"origin",Object)).x=C(l,"x",Number),l.y=C(l,"y",Number),l),F=m,I=[],j=e.width*E.x,O=e.height*E.y;F--;)I.push(function(e){var t=e.angle*(Math.PI/180),r=e.spread*(Math.PI/180);return{x:e.x,y:e.y,wobble:10*Math.random(),wobbleSpeed:Math.min(.11,.1*Math.random()+.05),velocity:.5*e.startVelocity+Math.random()*e.startVelocity,angle2D:-t+(.5*r-Math.random()*r),tiltAngle:(.5*Math.random()+.25)*Math.PI,color:e.color,shape:e.shape,tick:0,totalTicks:e.ticks,decay:e.decay,drift:e.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:3*e.gravity,ovalScalar:.6,scalar:e.scalar,flat:e.flat}}({x:j,y:O,angle:v,spread:b,startVelocity:M,color:S[F%S.length],shape:T[Math.floor(Math.random()*(T.length-0))+0],ticks:$,decay:w,gravity:R,drift:P,scalar:z,flat:N}));return a?a.addFettis(I):(s=e,p=I.slice(),h=s.getContext("2d"),f=x(function(e){function t(){d=c=null,h.clearRect(0,0,r.width,r.height),y.clear(),i(),e()}d=Z.frame(function e(){o&&!(r.width===n.width&&r.height===n.height)&&(r.width=s.width=n.width,r.height=s.height=n.height),r.width||r.height||(u(s),r.width=s.width,r.height=s.height),h.clearRect(0,0,r.width,r.height),(p=p.filter(function(e){return function(e,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2);var r,o,n,a,i,l,s,d,c,u,p,h,f,m,v,b=t.tick++/t.totalTicks,x=t.x+t.random*t.tiltCos,Z=t.y+t.random*t.tiltSin,M=t.wobbleX+t.random*t.tiltCos,w=t.wobbleY+t.random*t.tiltSin;if(e.fillStyle="rgba("+t.color.r+", "+t.color.g+", "+t.color.b+", "+(1-b)+")",e.beginPath(),g&&"path"===t.shape.type&&"string"==typeof t.shape.path&&Array.isArray(t.shape.matrix))e.fill((r=t.shape.path,o=t.shape.matrix,n=t.x,a=t.y,i=.1*Math.abs(M-x),l=.1*Math.abs(w-Z),s=Math.PI/10*t.wobble,d=new Path2D(r),(c=new Path2D).addPath(d,new DOMMatrix(o)),(u=new Path2D).addPath(c,new DOMMatrix([Math.cos(s)*i,Math.sin(s)*i,-Math.sin(s)*l,Math.cos(s)*l,n,a])),u));else if("bitmap"===t.shape.type){var C=Math.PI/10*t.wobble,k=.1*Math.abs(M-x),R=.1*Math.abs(w-Z),B=t.shape.bitmap.width*t.scalar,P=t.shape.bitmap.height*t.scalar,S=new DOMMatrix([Math.cos(C)*k,Math.sin(C)*k,-Math.sin(C)*R,Math.cos(C)*R,t.x,t.y]);S.multiplySelf(new DOMMatrix(t.shape.matrix));var $=e.createPattern(y.transform(t.shape.bitmap),"no-repeat");$.setTransform(S),e.globalAlpha=1-b,e.fillStyle=$,e.fillRect(t.x-B/2,t.y-P/2,B,P),e.globalAlpha=1}else if("circle"===t.shape)e.ellipse?e.ellipse(t.x,t.y,Math.abs(M-x)*t.ovalScalar,Math.abs(w-Z)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):(p=t.x,h=t.y,f=Math.abs(M-x)*t.ovalScalar,m=Math.abs(w-Z)*t.ovalScalar,v=Math.PI/10*t.wobble,e.save(),e.translate(p,h),e.rotate(v),e.scale(f,m),e.arc(0,0,1,0,2*Math.PI,void 0),e.restore());else if("star"===t.shape)for(var T=Math.PI/2*3,z=4*t.scalar,N=8*t.scalar,E=t.x,F=t.y,I=5,j=Math.PI/5;I--;)E=t.x+Math.cos(T)*N,F=t.y+Math.sin(T)*N,e.lineTo(E,F),T+=j,E=t.x+Math.cos(T)*z,F=t.y+Math.sin(T)*z,e.lineTo(E,F),T+=j;else e.moveTo(Math.floor(t.x),Math.floor(t.y)),e.lineTo(Math.floor(t.wobbleX),Math.floor(Z)),e.lineTo(Math.floor(M),Math.floor(w)),e.lineTo(Math.floor(x),Math.floor(t.wobbleY));return e.closePath(),e.fill(),t.tick<t.totalTicks}(h,e)})).length?d=Z.frame(e):t()}),c=t}),(a={addFettis:function(e){return p=p.concat(e),f},canvas:s,promise:f,reset:function(){d&&Z.cancel(d),c&&c()}}).promise)}(r,b,w)}return f.reset=function(){c&&c.reset(),a&&a.reset()},f}function z(){return m||(m=T(null,{useWorker:!0,resize:!0})),m}r.exports=function(){return z().apply(this,arguments)},r.exports.reset=function(){z().reset()},r.exports.create=T,r.exports.shapeFromPath=function(e){if(!g)throw Error("path confetti are not supported in this browser");"string"==typeof e?o=e:(o=e.path,n=e.matrix);var t=new Path2D(o),r=document.createElement("canvas").getContext("2d");if(!n){for(var o,n,a,i,l=1e3,s=1e3,d=0,c=0,u=0;u<1e3;u+=2)for(var p=0;p<1e3;p+=2)r.isPointInPath(t,u,p,"nonzero")&&(l=Math.min(l,u),s=Math.min(s,p),d=Math.max(d,u),c=Math.max(c,p));var h=Math.min(10/(a=d-l),10/(i=c-s));n=[h,0,0,h,-Math.round(a/2+l)*h,-Math.round(i/2+s)*h]}return{type:"path",path:o,matrix:n}},r.exports.shapeFromText=function(e){var t,r=1,o="#000000",n='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';"string"==typeof e?t=e:(t=e.text,r="scalar"in e?e.scalar:r,n="fontFamily"in e?e.fontFamily:n,o="color"in e?e.color:o);var a=10*r,i=""+a+"px "+n,l=new OffscreenCanvas(a,a),s=l.getContext("2d");s.font=i;var d=s.measureText(t),c=Math.ceil(d.actualBoundingBoxRight+d.actualBoundingBoxLeft),u=Math.ceil(d.actualBoundingBoxAscent+d.actualBoundingBoxDescent),p=d.actualBoundingBoxLeft+2,h=d.actualBoundingBoxAscent+2;c+=4,u+=4,(s=(l=new OffscreenCanvas(c,u)).getContext("2d")).font=i,s.fillStyle=o,s.fillText(t,p,h);var f=1/r;return{type:"bitmap",bitmap:l.transferToImageBitmap(),matrix:[f,0,0,f,-c*f/2,-u*f/2]}}}(function(){return"undefined"!=typeof window?window:"undefined"!=typeof self?self:this||{}}(),o,!1),t.Z=o.exports,o.exports.create}}]);