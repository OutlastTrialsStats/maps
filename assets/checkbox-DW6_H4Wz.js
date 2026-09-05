import{$t as e,A as t,An as n,B as r,C as i,Cn as a,Dn as o,Dt as s,En as c,Et as l,Fn as u,Ft as d,G as f,Gn as p,Gt as m,H as h,Hn as g,Ht as _,It as v,Jn as y,Jt as b,Kn as x,L as S,Ln as ee,M as te,Mn as ne,Mt as re,Nn as ie,On as C,Ot as ae,P as oe,Pt as se,Qt as ce,R as le,Rn as ue,Rt as de,Sn as fe,St as pe,Tn as w,Tt as me,U as he,Un as ge,Ut as _e,V as ve,Vn as ye,W as be,Wt as xe,Xt as Se,Y as Ce,Yn as T,Yt as we,Zt as Te,_ as Ee,_n as E,an as De,at as Oe,bn as ke,cn as Ae,ct as D,dt as je,en as Me,fn as Ne,gn as O,gt as Pe,hn as k,ht as Fe,i as Ie,in as Le,it as Re,j as ze,jn as A,jt as Be,k as Ve,kn as j,kt as He,lt as Ue,mn as We,mt as Ge,nn as Ke,o as qe,on as M,pn as N,pt as Je,qn as Ye,qt as Xe,r as P,rn as Ze,rt as Qe,tn as $e,ut as et,v as tt,vn as F,vt as nt,wt as rt,xn as it,xt as at,y as ot,yn as I,zn as st}from"./index-BnrMnDq-.js";function L(...e){if(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n];if(!r)continue;let i=typeof r;if(i===`string`||i===`number`)t.push(r);else if(i===`object`){let e=Array.isArray(r)?[L(...r)]:Object.entries(r).map(([e,t])=>t?e:void 0);t=e.length?t.concat(e.filter(e=>!!e)):t}}return t.join(` `).trim()}}function ct(){return`${arguments.length>0&&arguments[0]!==void 0?arguments[0]:`pc`}${u().replace(`v-`,``).replaceAll(`-`,`_`)}`}var lt=D.extend({name:`common`});function ut(e){"@babel/helpers - typeof";return ut=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},ut(e)}function dt(e){return vt(e)||ft(e)||ht(e)||mt()}function ft(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function pt(e,t){return vt(e)||_t(e,t)||ht(e,t)||mt()}function mt(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ht(e,t){if(e){if(typeof e==`string`)return gt(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?gt(e,t):void 0}}function gt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function _t(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function vt(e){if(Array.isArray(e))return e}function yt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?yt(Object(n),!0).forEach(function(t){bt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):yt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function bt(e,t,n){return(t=xt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xt(e){var t=St(e,`string`);return ut(t)==`symbol`?t:t+``}function St(e,t){if(ut(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(ut(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var z={name:`BaseComponent`,props:{pt:{type:Object,default:void 0},ptOptions:{type:Object,default:void 0},unstyled:{type:Boolean,default:void 0},dt:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0}},watch:{isUnstyled:{immediate:!0,handler:function(e){et.off(`theme:change`,this._loadCoreStyles),e||(this._loadCoreStyles(),this._themeChangeListener(this._loadCoreStyles))}},dt:{immediate:!0,handler:function(e,t){var n=this;et.off(`theme:change`,this._themeScopedListener),e?(this._loadScopedThemeStyles(e),this._themeScopedListener=function(){return n._loadScopedThemeStyles(e)},this._themeChangeListener(this._themeScopedListener)):this._unloadScopedThemeStyles()}}},scopedStyleEl:void 0,rootEl:void 0,uid:void 0,$attrSelector:void 0,beforeCreate:function(){var e,t,n,r,i,a,o,s,c,l,u=this.pt?._usept,d=u?(e=this.pt)==null||(e=e.originalValue)==null?void 0:e[this.$.type.name]:void 0;(n=(u?(t=this.pt)==null||(t=t.value)==null?void 0:t[this.$.type.name]:this.pt)||d)==null||(n=n.hooks)==null||(r=n.onBeforeCreate)==null||r.call(n);var f=(i=this.$primevueConfig)==null||(i=i.pt)==null?void 0:i._usept,p=f?(a=this.$primevue)==null||(a=a.config)==null||(a=a.pt)==null?void 0:a.originalValue:void 0;(c=(f?(o=this.$primevue)==null||(o=o.config)==null||(o=o.pt)==null?void 0:o.value:(s=this.$primevue)==null||(s=s.config)==null?void 0:s.pt)||p)==null||(c=c[this.$.type.name])==null||(c=c.hooks)==null||(l=c.onBeforeCreate)==null||l.call(c),this.$attrSelector=ct(),this.uid=this.$attrs.id||this.$attrSelector.replace(`pc`,`pv_id_`)},created:function(){this._hook(`onCreated`)},beforeMount:function(){this.rootEl=m(v(this.$el)?this.$el:this.$el?.parentElement,`[${this.$attrSelector}]`),this.rootEl&&(this.rootEl.$pc=R({name:this.$.type.name,attrSelector:this.$attrSelector},this.$params)),this._loadStyles(),this._hook(`onBeforeMount`)},mounted:function(){this._hook(`onMounted`)},beforeUpdate:function(){this._hook(`onBeforeUpdate`)},updated:function(){this._hook(`onUpdated`)},beforeUnmount:function(){this._hook(`onBeforeUnmount`)},unmounted:function(){this._removeThemeListeners(),this._unloadScopedThemeStyles(),this._hook(`onUnmounted`)},methods:{_hook:function(e){if(!this.$options.hostName){var t=this._usePT(this._getPT(this.pt,this.$.type.name),this._getOptionValue,`hooks.${e}`),n=this._useDefaultPT(this._getOptionValue,`hooks.${e}`);t?.(),n?.()}},_mergeProps:function(t){var n=[...arguments].slice(1);return e(t)?t.apply(void 0,n):w.apply(void 0,n)},_load:function(){Re.isStyleNameLoaded(`base`)||(D.loadCSS(this.$styleOptions),this._loadGlobalStyles(),Re.setLoadedStyleName(`base`)),this._loadThemeStyles()},_loadStyles:function(){this._load(),this._themeChangeListener(this._load)},_loadCoreStyles:function(){var e;!Re.isStyleNameLoaded(this.$style?.name)&&(e=this.$style)!=null&&e.name&&(lt.loadCSS(this.$styleOptions),this.$options.style&&this.$style.loadCSS(this.$styleOptions),Re.setLoadedStyleName(this.$style.name))},_loadGlobalStyles:function(){var e=this._useGlobalPT(this._getOptionValue,`global.css`,this.$params);M(e)&&D.load(e,R({name:`global`},this.$styleOptions))},_loadThemeStyles:function(){var e;if(!(this.isUnstyled||this.$theme===`none`)){if(!je.isStyleNameLoaded(`common`)){var t,n,r=((t=this.$style)==null||(n=t.getCommonTheme)==null?void 0:n.call(t))||{},i=r.primitive,a=r.semantic,o=r.global,s=r.style;D.load(i?.css,R({name:`primitive-variables`},this.$styleOptions)),D.load(a?.css,R({name:`semantic-variables`},this.$styleOptions)),D.load(o?.css,R({name:`global-variables`},this.$styleOptions)),D.loadStyle(R({name:`global-style`},this.$styleOptions),s),je.setLoadedStyleName(`common`)}if(!je.isStyleNameLoaded(this.$style?.name)&&(e=this.$style)!=null&&e.name){var c,l,u,d,f=((c=this.$style)==null||(l=c.getComponentTheme)==null?void 0:l.call(c))||{},p=f.css,m=f.style;(u=this.$style)==null||u.load(p,R({name:`${this.$style.name}-variables`},this.$styleOptions)),(d=this.$style)==null||d.loadStyle(R({name:`${this.$style.name}-style`},this.$styleOptions),m),je.setLoadedStyleName(this.$style.name)}if(!je.isStyleNameLoaded(`layer-order`)){var h,g,_=(h=this.$style)==null||(g=h.getLayerOrderThemeCSS)==null?void 0:g.call(h);D.load(_,R({name:`layer-order`,first:!0},this.$styleOptions)),je.setLoadedStyleName(`layer-order`)}}},_loadScopedThemeStyles:function(e){var t,n,r=(((t=this.$style)==null||(n=t.getPresetTheme)==null?void 0:n.call(t,e,`[${this.$attrSelector}]`))||{}).css,i=this.$style?.load(r,R({name:`${this.$attrSelector}-${this.$style.name}`},this.$styleOptions));this.scopedStyleEl=i.el},_unloadScopedThemeStyles:function(){var e;(e=this.scopedStyleEl)==null||(e=e.value)==null||e.remove()},_themeChangeListener:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};Re.clearLoadedStyleNames(),et.on(`theme:change`,e)},_removeThemeListeners:function(){et.off(`theme:change`,this._loadCoreStyles),et.off(`theme:change`,this._load),et.off(`theme:change`,this._themeScopedListener)},_getHostInstance:function(e){return e?this.$options.hostName?e.$.type.name===this.$options.hostName?e:this._getHostInstance(e.$parentInstance):e.$parentInstance:void 0},_getPropValue:function(e){return this[e]||this._getHostInstance(this)?.[e]},_getOptionValue:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return we(e,t,n)},_getPTValue:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,i=/./g.test(t)&&!!n[t.split(`.`)[0]],a=this._getPropValue(`ptOptions`)||this.$primevueConfig?.ptOptions||{},o=a.mergeSections,s=o===void 0||o,c=a.mergeProps,l=c!==void 0&&c,u=r?i?this._useGlobalPT(this._getPTClassValue,t,n):this._useDefaultPT(this._getPTClassValue,t,n):void 0,d=i?void 0:this._getPTSelf(e,this._getPTClassValue,t,R(R({},n),{},{global:u||{}})),f=this._getPTDatasets(t);return s||!s&&d?l?this._mergeProps(l,u,d,f):R(R(R({},u),d),f):R(R({},d),f)},_getPTSelf:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=[...arguments].slice(1);return w(this._usePT.apply(this,[this._getPT(e,this.$name)].concat(t)),this._usePT.apply(this,[this.$_attrsPT].concat(t)))},_getPTDatasets:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=`data-pc-`,n=e===`root`&&M(this.pt?.[`data-pc-section`]);return e!==`transition`&&R(R({},e===`root`&&R(R(bt({},`${t}name`,Me(n?this.pt?.[`data-pc-section`]:this.$.type.name)),n&&bt({},`${t}extend`,Me(this.$.type.name))),{},bt({},`${this.$attrSelector}`,``))),{},bt({},`${t}section`,Me(e)))},_getPTClassValue:function(){var e=this._getOptionValue.apply(this,arguments);return ce(e)||b(e)?{class:e}:e},_getPT:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,r=arguments.length>2?arguments[2]:void 0,i=function(e){var i=arguments.length>1&&arguments[1]!==void 0&&arguments[1],a=r?r(e):e,o=Me(n),s=Me(t.$name);return(i&&o===s?void 0:a?.[o])??a};return e!=null&&e.hasOwnProperty(`_usept`)?{_usept:e._usept,originalValue:i(e.originalValue),value:i(e.value)}:i(e,!0)},_usePT:function(e,t,n,r){var i=function(e){return t(e,n,r)};if(e!=null&&e.hasOwnProperty(`_usept`)){var a=e._usept||this.$primevueConfig?.ptOptions||{},o=a.mergeSections,s=o===void 0||o,c=a.mergeProps,l=c!==void 0&&c,u=i(e.originalValue),d=i(e.value);return u===void 0&&d===void 0?void 0:ce(d)?d:ce(u)?u:s||!s&&d?l?this._mergeProps(l,u,d):R(R({},u),d):d}return i(e)},_useGlobalPT:function(e,t,n){return this._usePT(this.globalPT,e,t,n)},_useDefaultPT:function(e,t,n){return this._usePT(this.defaultPT,e,t,n)},ptm:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this._getPTValue(this.pt,e,R(R({},this.$params),t))},ptmi:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=w(this.$_attrsWithoutPT,this.ptm(e,t));return n!=null&&n.hasOwnProperty(`id`)&&(n.id??=this.$id),n},ptmo:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this._getPTValue(e,t,R({instance:this},n),!1)},cx:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.isUnstyled?void 0:this._getOptionValue(this.$style.classes,e,R(R({},this.$params),t))},sx:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(t){var r=this._getOptionValue(this.$style.inlineStyles,e,R(R({},this.$params),n));return[this._getOptionValue(lt.inlineStyles,e,R(R({},this.$params),n)),r]}}},computed:{globalPT:function(){var e=this;return this._getPT(this.$primevueConfig?.pt,void 0,function(t){return Ze(t,{instance:e})})},defaultPT:function(){var e=this;return this._getPT(this.$primevueConfig?.pt,void 0,function(t){return e._getOptionValue(t,e.$name,R({},e.$params))||Ze(t,R({},e.$params))})},isUnstyled:function(){return this.unstyled===void 0?this.$primevueConfig?.unstyled:this.unstyled},$id:function(){return this.$attrs.id||this.uid},$inProps:function(){var e=Object.keys(this.$.vnode?.props||{});return Object.fromEntries(Object.entries(this.$props).filter(function(t){var n=pt(t,1)[0];return e?.includes(n)}))},$theme:function(){return this.$primevueConfig?.theme},$style:function(){return R(R({classes:void 0,inlineStyles:void 0,load:function(){},loadCSS:function(){},loadStyle:function(){}},(this._getHostInstance(this)||{}).$style),this.$options.style)},$styleOptions:function(){var e;return{nonce:(e=this.$primevueConfig)==null||(e=e.csp)==null?void 0:e.nonce}},$primevueConfig:function(){return this.$primevue?.config},$name:function(){return this.$options.hostName||this.$.type.name},$params:function(){var e=this._getHostInstance(this)||this.$parent;return{instance:this,props:this.$props,state:this.$data,attrs:this.$attrs,parent:{instance:e,props:e?.$props,state:e?.$data,attrs:e?.$attrs}}},$_attrsPT:function(){return Object.entries(this.$attrs||{}).filter(function(e){return pt(e,1)[0]?.startsWith(`pt:`)}).reduce(function(e,t){var n=pt(t,2),r=n[0],i=n[1];return gt(dt(r.split(`:`))).slice(1)?.reduce(function(e,t,n,r){return!e[t]&&(e[t]=n===r.length-1?i:{}),e[t]},e),e},{})},$_attrsWithoutPT:function(){return Object.entries(this.$attrs||{}).filter(function(e){var t=pt(e,1)[0];return!(t!=null&&t.startsWith(`pt:`))}).reduce(function(e,t){var n=pt(t,2),r=n[0];return e[r]=n[1],e},{})}}},Ct=D.extend({name:`baseicon`,css:`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`});function wt(e){"@babel/helpers - typeof";return wt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},wt(e)}function Tt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Et(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Tt(Object(n),!0).forEach(function(t){Dt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Tt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Dt(e,t,n){return(t=Ot(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ot(e){var t=kt(e,`string`);return wt(t)==`symbol`?t:t+``}function kt(e,t){if(wt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(wt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var B={name:`BaseIcon`,extends:z,props:{label:{type:String,default:void 0},spin:{type:Boolean,default:!1}},style:Ct,provide:function(){return{$pcIcon:this,$parentInstance:this}},methods:{pti:function(){var e=Ke(this.label);return Et(Et({},!this.isUnstyled&&{class:[`p-icon`,{"p-icon-spin":this.spin}]}),{},{role:e?void 0:`img`,"aria-label":e?void 0:this.label,"aria-hidden":e})}}},At={name:`SpinnerIcon`,extends:B};function jt(e){return Ft(e)||Pt(e)||Nt(e)||Mt()}function Mt(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Nt(e,t){if(e){if(typeof e==`string`)return It(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?It(e,t):void 0}}function Pt(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Ft(e){if(Array.isArray(e))return It(e)}function It(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Lt(e,t,n,r,i,a){return C(),I(`svg`,w({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),jt(t[0]||=[O(`path`,{d:`M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z`,fill:`currentColor`},null,-1)]),16)}At.render=Lt;var Rt=D.extend({name:`badge`,style:`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`,classes:{root:function(e){var t=e.props,n=e.instance;return[`p-badge p-component`,{"p-badge-circle":M(t.value)&&String(t.value).length===1,"p-badge-dot":Ke(t.value)&&!n.$slots.default,"p-badge-sm":t.size===`small`,"p-badge-lg":t.size===`large`,"p-badge-xl":t.size===`xlarge`,"p-badge-info":t.severity===`info`,"p-badge-success":t.severity===`success`,"p-badge-warn":t.severity===`warn`,"p-badge-danger":t.severity===`danger`,"p-badge-secondary":t.severity===`secondary`,"p-badge-contrast":t.severity===`contrast`}]}}}),zt={name:`BaseBadge`,extends:z,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:Rt,provide:function(){return{$pcBadge:this,$parentInstance:this}}};function Bt(e){"@babel/helpers - typeof";return Bt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Bt(e)}function Vt(e,t,n){return(t=Ht(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ht(e){var t=Ut(e,`string`);return Bt(t)==`symbol`?t:t+``}function Ut(e,t){if(Bt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Bt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Wt={name:`Badge`,extends:zt,inheritAttrs:!1,computed:{dataP:function(){return L(Vt(Vt({circle:this.value!=null&&String(this.value).length===1,empty:this.value==null&&!this.$slots.default},this.severity,this.severity),this.size,this.size))}}},Gt=[`data-p`];function Kt(e,t,r,i,a,o){return C(),I(`span`,w({class:e.cx(`root`),"data-p":o.dataP},e.ptmi(`root`)),[n(e.$slots,`default`,{},function(){return[it(T(e.value),1)]})],16,Gt)}Wt.render=Kt;var qt=D.extend({name:`ripple-directive`,style:`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,classes:{root:`p-ink`}}),Jt=Qe.extend({style:qt});function Yt(e){"@babel/helpers - typeof";return Yt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Yt(e)}function Xt(e){return en(e)||$t(e)||Qt(e)||Zt()}function Zt(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qt(e,t){if(e){if(typeof e==`string`)return tn(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?tn(e,t):void 0}}function $t(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function en(e){if(Array.isArray(e))return tn(e)}function tn(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function nn(e,t,n){return(t=rn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function rn(e){var t=an(e,`string`);return Yt(t)==`symbol`?t:t+``}function an(e,t){if(Yt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Yt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var on=Jt.extend(`ripple`,{watch:{"config.ripple":function(e){e?(this.createRipple(this.$host),this.bindEvents(this.$host),this.$host.setAttribute(`data-pd-ripple`,!0),this.$host.style.overflow=`hidden`,this.$host.style.position=`relative`):(this.remove(this.$host),this.$host.removeAttribute(`data-pd-ripple`))}},unmounted:function(e){this.remove(e)},timeout:void 0,methods:{bindEvents:function(e){e.addEventListener(`mousedown`,this.onMouseDown.bind(this))},unbindEvents:function(e){e.removeEventListener(`mousedown`,this.onMouseDown.bind(this))},createRipple:function(e){var t=this.getInk(e);t||(t=He(`span`,nn(nn({role:`presentation`,"aria-hidden":!0,"data-p-ink":!0,"data-p-ink-active":!1,class:!this.isUnstyled()&&this.cx(`root`),onAnimationEnd:this.onAnimationEnd.bind(this)},this.$attrSelector,``),`p-bind`,this.ptm(`root`))),e.appendChild(t),this.$el=t)},remove:function(e){var t=this.getInk(e);t&&(this.$host.style.overflow=``,this.$host.style.position=``,this.unbindEvents(e),t.removeEventListener(`animationend`,this.onAnimationEnd),t.remove())},onMouseDown:function(e){var t=this,n=e.currentTarget,r=this.getInk(n);if(!(!r||getComputedStyle(r,null).display===`none`)){if(!this.isUnstyled()&&rt(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`false`),!ae(r)&&!l(r)){var i=Math.max(_e(n),Fe(n));r.style.height=i+`px`,r.style.width=i+`px`}var a=at(n),o=e.pageX-a.left+document.body.scrollTop-l(r)/2,s=e.pageY-a.top+document.body.scrollLeft-ae(r)/2;r.style.top=s+`px`,r.style.left=o+`px`,!this.isUnstyled()&&Be(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`true`),this.timeout=setTimeout(function(){r&&(!t.isUnstyled()&&rt(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`false`))},401)}},onAnimationEnd:function(e){this.timeout&&clearTimeout(this.timeout),!this.isUnstyled()&&rt(e.currentTarget,`p-ink-active`),e.currentTarget.setAttribute(`data-p-ink-active`,`false`)},getInk:function(e){return e&&e.children?Xt(e.children).find(function(e){return me(e,`data-pc-name`)===`ripple`}):void 0}}}),sn=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\xA0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;function cn(e){"@babel/helpers - typeof";return cn=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},cn(e)}function V(e,t,n){return(t=ln(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ln(e){var t=un(e,`string`);return cn(t)==`symbol`?t:t+``}function un(e,t){if(cn(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(cn(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var dn=D.extend({name:`button`,style:sn,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-button p-component`,V(V(V(V(V(V(V(V(V({"p-button-icon-only":t.hasIcon&&!n.label&&!n.badge,"p-button-vertical":(n.iconPos===`top`||n.iconPos===`bottom`)&&n.label,"p-button-loading":n.loading,"p-button-link":n.link||n.variant===`link`},`p-button-${n.severity}`,n.severity),`p-button-raised`,n.raised),`p-button-rounded`,n.rounded),`p-button-text`,n.text||n.variant===`text`),`p-button-outlined`,n.outlined||n.variant===`outlined`),`p-button-sm`,n.size===`small`),`p-button-lg`,n.size===`large`),`p-button-plain`,n.plain),`p-button-fluid`,t.hasFluid)]},loadingIcon:`p-button-loading-icon`,icon:function(e){var t=e.props;return[`p-button-icon`,V({},`p-button-icon-${t.iconPos}`,t.label)]},label:`p-button-label`}}),fn={name:`BaseButton`,extends:z,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:`left`},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:`secondary`},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:dn,provide:function(){return{$pcButton:this,$parentInstance:this}}};function pn(e){"@babel/helpers - typeof";return pn=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},pn(e)}function H(e,t,n){return(t=mn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function mn(e){var t=hn(e,`string`);return pn(t)==`symbol`?t:t+``}function hn(e,t){if(pn(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(pn(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var gn={name:`Button`,extends:fn,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===``||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?` `+this.badge:``):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return w(this.asAttrs,this.a11yAttrs,this.getPTOptions(`root`))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":`button`,"data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return Ke(this.fluid)?!!this.$pcFluid:this.fluid},dataP:function(){return L(H(H(H(H(H(H(H(H(H(H({},this.size,this.size),`icon-only`,this.hasIcon&&!this.label&&!this.badge),`loading`,this.loading),`fluid`,this.hasFluid),`rounded`,this.rounded),`raised`,this.raised),`outlined`,this.outlined||this.variant===`outlined`),`text`,this.text||this.variant===`text`),`link`,this.link||this.variant===`link`),`vertical`,(this.iconPos===`top`||this.iconPos===`bottom`)&&this.label))},dataIconP:function(){return L(H(H({},this.iconPos,this.iconPos),this.size,this.size))},dataLabelP:function(){return L(H(H({},this.size,this.size),`icon-only`,this.hasIcon&&!this.label&&!this.badge))}},components:{SpinnerIcon:At,Badge:Wt},directives:{ripple:on}},_n=[`data-p`],vn=[`data-p`];function yn(e,t,r,i,a,o){var s=A(`SpinnerIcon`),c=A(`Badge`),l=ne(`ripple`);return e.asChild?n(e.$slots,`default`,{key:1,class:x(e.cx(`root`)),a11yAttrs:o.a11yAttrs}):st((C(),E(ie(e.as),w({key:0,class:e.cx(`root`),"data-p":o.dataP},o.attrs),{default:ue(function(){return[n(e.$slots,`default`,{},function(){return[e.loading?n(e.$slots,`loadingicon`,w({key:0,class:[e.cx(`loadingIcon`),e.cx(`icon`)]},e.ptm(`loadingIcon`)),function(){return[e.loadingIcon?(C(),I(`span`,w({key:0,class:[e.cx(`loadingIcon`),e.cx(`icon`),e.loadingIcon]},e.ptm(`loadingIcon`)),null,16)):(C(),E(s,w({key:1,class:[e.cx(`loadingIcon`),e.cx(`icon`)],spin:``},e.ptm(`loadingIcon`)),null,16,[`class`]))]}):n(e.$slots,`icon`,w({key:1,class:[e.cx(`icon`)]},e.ptm(`icon`)),function(){return[e.icon?(C(),I(`span`,w({key:0,class:[e.cx(`icon`),e.icon,e.iconClass],"data-p":o.dataIconP},e.ptm(`icon`)),null,16,_n)):F(``,!0)]}),e.label?(C(),I(`span`,w({key:2,class:e.cx(`label`)},e.ptm(`label`),{"data-p":o.dataLabelP}),T(e.label),17,vn)):F(``,!0),e.badge?(C(),E(c,{key:3,value:e.badge,class:x(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm(`pcBadge`)},null,8,[`value`,`class`,`severity`,`unstyled`,`pt`])):F(``,!0)]})]}),_:3},16,[`class`,`data-p`])),[[l]])}gn.render=yn;var bn={name:`TimesIcon`,extends:B};function xn(e){return Tn(e)||wn(e)||Cn(e)||Sn()}function Sn(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Cn(e,t){if(e){if(typeof e==`string`)return En(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?En(e,t):void 0}}function wn(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Tn(e){if(Array.isArray(e))return En(e)}function En(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Dn(e,t,n,r,i,a){return C(),I(`svg`,w({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),xn(t[0]||=[O(`path`,{d:`M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z`,fill:`currentColor`},null,-1)]),16)}bn.render=Dn;var On={name:`Portal`,props:{appendTo:{type:[String,Object],default:`body`},disabled:{type:Boolean,default:!1}},data:function(){return{mounted:!1}},mounted:function(){this.mounted=_()},computed:{inline:function(){return this.disabled||this.appendTo===`self`}}};function kn(e,t,r,i,a,o){return o.inline?n(e.$slots,`default`,{key:0}):a.mounted?(C(),E(We,{key:1,to:r.appendTo},[n(e.$slots,`default`)],8,[`to`])):F(``,!0)}On.render=kn;var An={name:`CheckIcon`,extends:B};function jn(e){return Fn(e)||Pn(e)||Nn(e)||Mn()}function Mn(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Nn(e,t){if(e){if(typeof e==`string`)return In(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?In(e,t):void 0}}function Pn(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Fn(e){if(Array.isArray(e))return In(e)}function In(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Ln(e,t,n,r,i,a){return C(),I(`svg`,w({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),jn(t[0]||=[O(`path`,{d:`M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z`,fill:`currentColor`},null,-1)]),16)}An.render=Ln;function Rn(e){return e instanceof HTMLElement?e.isContentEditable||e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement:!1}function zn(e){return Rn(e)?!0:e instanceof HTMLElement&&e.closest(`[role="dialog"]`)!==null}var Bn={class:`legend`},Vn=[`src`],Hn=P(a({__name:`ControlsLegend`,props:{hints:{}},setup(e){let t={left:qe(`MouseIconLeftClick.webp`),right:qe(`MouseIconRightClick.webp`),wheel:qe(`MouseWheelIcon.webp`)};return(n,r)=>(C(),I(`ul`,Bn,[(C(!0),I(N,null,j(e.hints,e=>(C(),I(`li`,{key:e.label},[O(`img`,{class:`icon`,src:t[e.icon],alt:``},null,8,Vn),O(`span`,null,T(e.label),1)]))),128))]))}}),[[`__scopeId`,`data-v-b8c8d4be`]]),Un={svg:`http://www.w3.org/2000/svg`,xhtml:`http://www.w3.org/1999/xhtml`,xlink:`http://www.w3.org/1999/xlink`,xml:`http://www.w3.org/XML/1998/namespace`,xmlns:`http://www.w3.org/2000/xmlns/`};function Wn(e){var t=e+=``,n=t.indexOf(`:`);return n>=0&&(t=e.slice(0,n))!==`xmlns`&&(e=e.slice(n+1)),Un.hasOwnProperty(t)?{space:Un[t],local:e}:e}function Gn(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===`http://www.w3.org/1999/xhtml`&&t.documentElement.namespaceURI===`http://www.w3.org/1999/xhtml`?t.createElement(e):t.createElementNS(n,e)}}function Kn(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function qn(e){var t=Wn(e);return(t.local?Kn:Gn)(t)}function Jn(){}function Yn(e){return e==null?Jn:function(){return this.querySelector(e)}}function Xn(e){typeof e!=`function`&&(e=Yn(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=Array(o),c,l,u=0;u<o;++u)(c=a[u])&&(l=e.call(c,c.__data__,u,a))&&(`__data__`in c&&(l.__data__=c.__data__),s[u]=l);return new U(r,this._parents)}function Zn(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Qn(){return[]}function $n(e){return e==null?Qn:function(){return this.querySelectorAll(e)}}function er(e){return function(){return Zn(e.apply(this,arguments))}}function tr(e){e=typeof e==`function`?er(e):$n(e);for(var t=this._groups,n=t.length,r=[],i=[],a=0;a<n;++a)for(var o=t[a],s=o.length,c,l=0;l<s;++l)(c=o[l])&&(r.push(e.call(c,c.__data__,l,o)),i.push(c));return new U(r,i)}function nr(e){return function(){return this.matches(e)}}function rr(e){return function(t){return t.matches(e)}}var ir=Array.prototype.find;function ar(e){return function(){return ir.call(this.children,e)}}function or(){return this.firstElementChild}function sr(e){return this.select(e==null?or:ar(typeof e==`function`?e:rr(e)))}var cr=Array.prototype.filter;function lr(){return Array.from(this.children)}function ur(e){return function(){return cr.call(this.children,e)}}function dr(e){return this.selectAll(e==null?lr:ur(typeof e==`function`?e:rr(e)))}function fr(e){typeof e!=`function`&&(e=nr(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=[],c,l=0;l<o;++l)(c=a[l])&&e.call(c,c.__data__,l,a)&&s.push(c);return new U(r,this._parents)}function pr(e){return Array(e.length)}function mr(){return new U(this._enter||this._groups.map(pr),this._parents)}function hr(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}hr.prototype={constructor:hr,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function gr(e){return function(){return e}}function _r(e,t,n,r,i,a){for(var o=0,s,c=t.length,l=a.length;o<l;++o)(s=t[o])?(s.__data__=a[o],r[o]=s):n[o]=new hr(e,a[o]);for(;o<c;++o)(s=t[o])&&(i[o]=s)}function vr(e,t,n,r,i,a,o){var s,c,l=new Map,u=t.length,d=a.length,f=Array(u),p;for(s=0;s<u;++s)(c=t[s])&&(f[s]=p=o.call(c,c.__data__,s,t)+``,l.has(p)?i[s]=c:l.set(p,c));for(s=0;s<d;++s)p=o.call(e,a[s],s,a)+``,(c=l.get(p))?(r[s]=c,c.__data__=a[s],l.delete(p)):n[s]=new hr(e,a[s]);for(s=0;s<u;++s)(c=t[s])&&l.get(f[s])===c&&(i[s]=c)}function yr(e){return e.__data__}function br(e,t){if(!arguments.length)return Array.from(this,yr);var n=t?vr:_r,r=this._parents,i=this._groups;typeof e!=`function`&&(e=gr(e));for(var a=i.length,o=Array(a),s=Array(a),c=Array(a),l=0;l<a;++l){var u=r[l],d=i[l],f=d.length,p=xr(e.call(u,u&&u.__data__,l,r)),m=p.length,h=s[l]=Array(m),g=o[l]=Array(m);n(u,d,h,g,c[l]=Array(f),p,t);for(var _=0,v=0,y,b;_<m;++_)if(y=h[_]){for(_>=v&&(v=_+1);!(b=g[v])&&++v<m;);y._next=b||null}}return o=new U(o,r),o._enter=s,o._exit=c,o}function xr(e){return typeof e==`object`&&`length`in e?e:Array.from(e)}function Sr(){return new U(this._exit||this._groups.map(pr),this._parents)}function Cr(e,t,n){var r=this.enter(),i=this,a=this.exit();return typeof e==`function`?(r=e(r),r&&=r.selection()):r=r.append(e+``),t!=null&&(i=t(i),i&&=i.selection()),n==null?a.remove():n(a),r&&i?r.merge(i).order():i}function wr(e){for(var t=e.selection?e.selection():e,n=this._groups,r=t._groups,i=n.length,a=r.length,o=Math.min(i,a),s=Array(i),c=0;c<o;++c)for(var l=n[c],u=r[c],d=l.length,f=s[c]=Array(d),p,m=0;m<d;++m)(p=l[m]||u[m])&&(f[m]=p);for(;c<i;++c)s[c]=n[c];return new U(s,this._parents)}function Tr(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r=e[t],i=r.length-1,a=r[i],o;--i>=0;)(o=r[i])&&(a&&o.compareDocumentPosition(a)^4&&a.parentNode.insertBefore(o,a),a=o);return this}function Er(e){e||=Dr;function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}for(var n=this._groups,r=n.length,i=Array(r),a=0;a<r;++a){for(var o=n[a],s=o.length,c=i[a]=Array(s),l,u=0;u<s;++u)(l=o[u])&&(c[u]=l);c.sort(t)}return new U(i,this._parents).order()}function Dr(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Or(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function kr(){return Array.from(this)}function Ar(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,a=r.length;i<a;++i){var o=r[i];if(o)return o}return null}function jr(){let e=0;for(let t of this)++e;return e}function Mr(){return!this.node()}function Nr(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var i=t[n],a=0,o=i.length,s;a<o;++a)(s=i[a])&&e.call(s,s.__data__,a,i);return this}function Pr(e){return function(){this.removeAttribute(e)}}function Fr(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Ir(e,t){return function(){this.setAttribute(e,t)}}function Lr(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Rr(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function zr(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Br(e,t){var n=Wn(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((t==null?n.local?Fr:Pr:typeof t==`function`?n.local?zr:Rr:n.local?Lr:Ir)(n,t))}function Vr(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Hr(e){return function(){this.style.removeProperty(e)}}function Ur(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Wr(e,t,n){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function Gr(e,t,n){return arguments.length>1?this.each((t==null?Hr:typeof t==`function`?Wr:Ur)(e,t,n??``)):Kr(this.node(),e)}function Kr(e,t){return e.style.getPropertyValue(t)||Vr(e).getComputedStyle(e,null).getPropertyValue(t)}function qr(e){return function(){delete this[e]}}function Jr(e,t){return function(){this[e]=t}}function Yr(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function Xr(e,t){return arguments.length>1?this.each((t==null?qr:typeof t==`function`?Yr:Jr)(e,t)):this.node()[e]}function Zr(e){return e.trim().split(/^|\s+/)}function Qr(e){return e.classList||new $r(e)}function $r(e){this._node=e,this._names=Zr(e.getAttribute(`class`)||``)}$r.prototype={add:function(e){this._names.indexOf(e)<0&&(this._names.push(e),this._node.setAttribute(`class`,this._names.join(` `)))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute(`class`,this._names.join(` `)))},contains:function(e){return this._names.indexOf(e)>=0}};function ei(e,t){for(var n=Qr(e),r=-1,i=t.length;++r<i;)n.add(t[r])}function ti(e,t){for(var n=Qr(e),r=-1,i=t.length;++r<i;)n.remove(t[r])}function ni(e){return function(){ei(this,e)}}function ri(e){return function(){ti(this,e)}}function ii(e,t){return function(){(t.apply(this,arguments)?ei:ti)(this,e)}}function ai(e,t){var n=Zr(e+``);if(arguments.length<2){for(var r=Qr(this.node()),i=-1,a=n.length;++i<a;)if(!r.contains(n[i]))return!1;return!0}return this.each((typeof t==`function`?ii:t?ni:ri)(n,t))}function oi(){this.textContent=``}function si(e){return function(){this.textContent=e}}function ci(e){return function(){var t=e.apply(this,arguments);this.textContent=t??``}}function li(e){return arguments.length?this.each(e==null?oi:(typeof e==`function`?ci:si)(e)):this.node().textContent}function ui(){this.innerHTML=``}function di(e){return function(){this.innerHTML=e}}function fi(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??``}}function pi(e){return arguments.length?this.each(e==null?ui:(typeof e==`function`?fi:di)(e)):this.node().innerHTML}function mi(){this.nextSibling&&this.parentNode.appendChild(this)}function hi(){return this.each(mi)}function gi(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function _i(){return this.each(gi)}function vi(e){var t=typeof e==`function`?e:qn(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function yi(){return null}function bi(e,t){var n=typeof e==`function`?e:qn(e),r=t==null?yi:typeof t==`function`?t:Yn(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function xi(){var e=this.parentNode;e&&e.removeChild(this)}function Si(){return this.each(xi)}function Ci(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function wi(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Ti(e){return this.select(e?wi:Ci)}function Ei(e){return arguments.length?this.property(`__data__`,e):this.node().__data__}function Di(e){return function(t){e.call(this,t,this.__data__)}}function Oi(e){return e.trim().split(/^|\s+/).map(function(e){var t=``,n=e.indexOf(`.`);return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}})}function ki(e){return function(){var t=this.__on;if(t){for(var n=0,r=-1,i=t.length,a;n<i;++n)a=t[n],(!e.type||a.type===e.type)&&a.name===e.name?this.removeEventListener(a.type,a.listener,a.options):t[++r]=a;++r?t.length=r:delete this.__on}}}function Ai(e,t,n){return function(){var r=this.__on,i,a=Di(t);if(r){for(var o=0,s=r.length;o<s;++o)if((i=r[o]).type===e.type&&i.name===e.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=a,i.options=n),i.value=t;return}}this.addEventListener(e.type,a,n),i={type:e.type,name:e.name,value:t,listener:a,options:n},r?r.push(i):this.__on=[i]}}function ji(e,t,n){var r=Oi(e+``),i,a=r.length,o;if(arguments.length<2){var s=this.node().__on;if(s){for(var c=0,l=s.length,u;c<l;++c)for(i=0,u=s[c];i<a;++i)if((o=r[i]).type===u.type&&o.name===u.name)return u.value}return}for(s=t?Ai:ki,i=0;i<a;++i)this.each(s(r[i],t,n));return this}function Mi(e,t,n){var r=Vr(e),i=r.CustomEvent;typeof i==`function`?i=new i(t,n):(i=r.document.createEvent(`Event`),n?(i.initEvent(t,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(t,!1,!1)),e.dispatchEvent(i)}function Ni(e,t){return function(){return Mi(this,e,t)}}function Pi(e,t){return function(){return Mi(this,e,t.apply(this,arguments))}}function Fi(e,t){return this.each((typeof t==`function`?Pi:Ni)(e,t))}function*Ii(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,a=r.length,o;i<a;++i)(o=r[i])&&(yield o)}var Li=[null];function U(e,t){this._groups=e,this._parents=t}function Ri(){return new U([[document.documentElement]],Li)}function zi(){return this}U.prototype=Ri.prototype={constructor:U,select:Xn,selectAll:tr,selectChild:sr,selectChildren:dr,filter:fr,data:br,enter:mr,exit:Sr,join:Cr,merge:wr,selection:zi,order:Tr,sort:Er,call:Or,nodes:kr,node:Ar,size:jr,empty:Mr,each:Nr,attr:Br,style:Gr,property:Xr,classed:ai,text:li,html:pi,raise:hi,lower:_i,append:vi,insert:bi,remove:Si,clone:Ti,datum:Ei,on:ji,dispatch:Fi,[Symbol.iterator]:Ii};function W(e){return typeof e==`string`?new U([[document.querySelector(e)]],[document.documentElement]):new U([[e]],Li)}function Bi(e){let t;for(;t=e.sourceEvent;)e=t;return e}function Vi(e,t){if(e=Bi(e),t===void 0&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=e.clientX,r.y=e.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[e.clientX-i.left-t.clientLeft,e.clientY-i.top-t.clientTop]}}return[e.pageX,e.pageY]}var Hi={value:()=>{}};function Ui(){for(var e=0,t=arguments.length,n={},r;e<t;++e){if(!(r=arguments[e]+``)||r in n||/[\s.]/.test(r))throw Error(`illegal type: `+r);n[r]=[]}return new Wi(n)}function Wi(e){this._=e}function Gi(e,t){return e.trim().split(/^|\s+/).map(function(e){var n=``,r=e.indexOf(`.`);if(r>=0&&(n=e.slice(r+1),e=e.slice(0,r)),e&&!t.hasOwnProperty(e))throw Error(`unknown type: `+e);return{type:e,name:n}})}Wi.prototype=Ui.prototype={constructor:Wi,on:function(e,t){var n=this._,r=Gi(e+``,n),i,a=-1,o=r.length;if(arguments.length<2){for(;++a<o;)if((i=(e=r[a]).type)&&(i=Ki(n[i],e.name)))return i;return}if(t!=null&&typeof t!=`function`)throw Error(`invalid callback: `+t);for(;++a<o;)if(i=(e=r[a]).type)n[i]=qi(n[i],e.name,t);else if(t==null)for(i in n)n[i]=qi(n[i],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new Wi(e)},call:function(e,t){if((i=arguments.length-2)>0)for(var n=Array(i),r=0,i,a;r<i;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw Error(`unknown type: `+e);for(a=this._[e],r=0,i=a.length;r<i;++r)a[r].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw Error(`unknown type: `+e);for(var r=this._[e],i=0,a=r.length;i<a;++i)r[i].value.apply(t,n)}};function Ki(e,t){for(var n=0,r=e.length,i;n<r;++n)if((i=e[n]).name===t)return i.value}function qi(e,t,n){for(var r=0,i=e.length;r<i;++r)if(e[r].name===t){e[r]=Hi,e=e.slice(0,r).concat(e.slice(r+1));break}return n!=null&&e.push({name:t,value:n}),e}var Ji={capture:!0,passive:!1};function Yi(e){e.preventDefault(),e.stopImmediatePropagation()}function Xi(e){var t=e.document.documentElement,n=W(e).on(`dragstart.drag`,Yi,Ji);`onselectstart`in t?n.on(`selectstart.drag`,Yi,Ji):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect=`none`)}function Zi(e,t){var n=e.document.documentElement,r=W(e).on(`dragstart.drag`,null);t&&(r.on(`click.drag`,Yi,Ji),setTimeout(function(){r.on(`click.drag`,null)},0)),`onselectstart`in n?r.on(`selectstart.drag`,null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}function Qi(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function $i(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function ea(){}var ta=.7,na=1/ta,ra=`\\s*([+-]?\\d+)\\s*`,ia=`\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*`,G=`\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*`,aa=/^#([0-9a-f]{3,8})$/,oa=RegExp(`^rgb\\(${ra},${ra},${ra}\\)$`),sa=RegExp(`^rgb\\(${G},${G},${G}\\)$`),ca=RegExp(`^rgba\\(${ra},${ra},${ra},${ia}\\)$`),la=RegExp(`^rgba\\(${G},${G},${G},${ia}\\)$`),ua=RegExp(`^hsl\\(${ia},${G},${G}\\)$`),da=RegExp(`^hsla\\(${ia},${G},${G},${ia}\\)$`),fa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Qi(ea,_a,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:pa,formatHex:pa,formatHex8:ma,formatHsl:ha,formatRgb:ga,toString:ga});function pa(){return this.rgb().formatHex()}function ma(){return this.rgb().formatHex8()}function ha(){return ka(this).formatHsl()}function ga(){return this.rgb().formatRgb()}function _a(e){var t,n;return e=(e+``).trim().toLowerCase(),(t=aa.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?va(t):n===3?new K(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?ya(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?ya(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=oa.exec(e))?new K(t[1],t[2],t[3],1):(t=sa.exec(e))?new K(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=ca.exec(e))?ya(t[1],t[2],t[3],t[4]):(t=la.exec(e))?ya(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=ua.exec(e))?Oa(t[1],t[2]/100,t[3]/100,1):(t=da.exec(e))?Oa(t[1],t[2]/100,t[3]/100,t[4]):fa.hasOwnProperty(e)?va(fa[e]):e===`transparent`?new K(NaN,NaN,NaN,0):null}function va(e){return new K(e>>16&255,e>>8&255,e&255,1)}function ya(e,t,n,r){return r<=0&&(e=t=n=NaN),new K(e,t,n,r)}function ba(e){return e instanceof ea||(e=_a(e)),e?(e=e.rgb(),new K(e.r,e.g,e.b,e.opacity)):new K}function xa(e,t,n,r){return arguments.length===1?ba(e):new K(e,t,n,r??1)}function K(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}Qi(K,xa,$i(ea,{brighter(e){return e=e==null?na:na**+e,new K(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?ta:ta**+e,new K(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new K(Ea(this.r),Ea(this.g),Ea(this.b),Ta(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Sa,formatHex:Sa,formatHex8:Ca,formatRgb:wa,toString:wa}));function Sa(){return`#${Da(this.r)}${Da(this.g)}${Da(this.b)}`}function Ca(){return`#${Da(this.r)}${Da(this.g)}${Da(this.b)}${Da((isNaN(this.opacity)?1:this.opacity)*255)}`}function wa(){let e=Ta(this.opacity);return`${e===1?`rgb(`:`rgba(`}${Ea(this.r)}, ${Ea(this.g)}, ${Ea(this.b)}${e===1?`)`:`, ${e})`}`}function Ta(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Ea(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Da(e){return e=Ea(e),(e<16?`0`:``)+e.toString(16)}function Oa(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new q(e,t,n,r)}function ka(e){if(e instanceof q)return new q(e.h,e.s,e.l,e.opacity);if(e instanceof ea||(e=_a(e)),!e)return new q;if(e instanceof q)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,i=Math.min(t,n,r),a=Math.max(t,n,r),o=NaN,s=a-i,c=(a+i)/2;return s?(o=t===a?(n-r)/s+(n<r)*6:n===a?(r-t)/s+2:(t-n)/s+4,s/=c<.5?a+i:2-a-i,o*=60):s=c>0&&c<1?0:o,new q(o,s,c,e.opacity)}function Aa(e,t,n,r){return arguments.length===1?ka(e):new q(e,t,n,r??1)}function q(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}Qi(q,Aa,$i(ea,{brighter(e){return e=e==null?na:na**+e,new q(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?ta:ta**+e,new q(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,i=2*n-r;return new K(Na(e>=240?e-240:e+120,i,r),Na(e,i,r),Na(e<120?e+240:e-120,i,r),this.opacity)},clamp(){return new q(ja(this.h),Ma(this.s),Ma(this.l),Ta(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let e=Ta(this.opacity);return`${e===1?`hsl(`:`hsla(`}${ja(this.h)}, ${Ma(this.s)*100}%, ${Ma(this.l)*100}%${e===1?`)`:`, ${e})`}`}}));function ja(e){return e=(e||0)%360,e<0?e+360:e}function Ma(e){return Math.max(0,Math.min(1,e||0))}function Na(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}var Pa=e=>()=>e;function Fa(e,t){return function(n){return e+n*t}}function Ia(e,t,n){return e**=+n,t=t**+n-e,n=1/n,function(r){return(e+r*t)**+n}}function La(e){return(e=+e)==1?Ra:function(t,n){return n-t?Ia(t,n,e):Pa(isNaN(t)?n:t)}}function Ra(e,t){var n=t-e;return n?Fa(e,n):Pa(isNaN(e)?t:e)}var za=(function e(t){var n=La(t);function r(e,t){var r=n((e=xa(e)).r,(t=xa(t)).r),i=n(e.g,t.g),a=n(e.b,t.b),o=Ra(e.opacity,t.opacity);return function(t){return e.r=r(t),e.g=i(t),e.b=a(t),e.opacity=o(t),e+``}}return r.gamma=e,r})(1);function Ba(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Va=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ha=new RegExp(Va.source,`g`);function Ua(e){return function(){return e}}function Wa(e){return function(t){return e(t)+``}}function Ga(e,t){var n=Va.lastIndex=Ha.lastIndex=0,r,i,a,o=-1,s=[],c=[];for(e+=``,t+=``;(r=Va.exec(e))&&(i=Ha.exec(t));)(a=i.index)>n&&(a=t.slice(n,a),s[o]?s[o]+=a:s[++o]=a),(r=r[0])===(i=i[0])?s[o]?s[o]+=i:s[++o]=i:(s[++o]=null,c.push({i:o,x:Ba(r,i)})),n=Ha.lastIndex;return n<t.length&&(a=t.slice(n),s[o]?s[o]+=a:s[++o]=a),s.length<2?c[0]?Wa(c[0].x):Ua(t):(t=c.length,function(e){for(var n=0,r;n<t;++n)s[(r=c[n]).i]=r.x(e);return s.join(``)})}var Ka=180/Math.PI,qa={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Ja(e,t,n,r,i,a){var o,s,c;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(c=e*n+t*r)&&(n-=e*c,r-=t*c),(s=Math.sqrt(n*n+r*r))&&(n/=s,r/=s,c/=s),e*r<t*n&&(e=-e,t=-t,c=-c,o=-o),{translateX:i,translateY:a,rotate:Math.atan2(t,e)*Ka,skewX:Math.atan(c)*Ka,scaleX:o,scaleY:s}}var Ya;function Xa(e){let t=new(typeof DOMMatrix==`function`?DOMMatrix:WebKitCSSMatrix)(e+``);return t.isIdentity?qa:Ja(t.a,t.b,t.c,t.d,t.e,t.f)}function Za(e){return e==null||(Ya||=document.createElementNS(`http://www.w3.org/2000/svg`,`g`),Ya.setAttribute(`transform`,e),!(e=Ya.transform.baseVal.consolidate()))?qa:(e=e.matrix,Ja(e.a,e.b,e.c,e.d,e.e,e.f))}function Qa(e,t,n,r){function i(e){return e.length?e.pop()+` `:``}function a(e,r,i,a,o,s){if(e!==i||r!==a){var c=o.push(`translate(`,null,t,null,n);s.push({i:c-4,x:Ba(e,i)},{i:c-2,x:Ba(r,a)})}else(i||a)&&o.push(`translate(`+i+t+a+n)}function o(e,t,n,a){e===t?t&&n.push(i(n)+`rotate(`+t+r):(e-t>180?t+=360:t-e>180&&(e+=360),a.push({i:n.push(i(n)+`rotate(`,null,r)-2,x:Ba(e,t)}))}function s(e,t,n,a){e===t?t&&n.push(i(n)+`skewX(`+t+r):a.push({i:n.push(i(n)+`skewX(`,null,r)-2,x:Ba(e,t)})}function c(e,t,n,r,a,o){if(e!==n||t!==r){var s=a.push(i(a)+`scale(`,null,`,`,null,`)`);o.push({i:s-4,x:Ba(e,n)},{i:s-2,x:Ba(t,r)})}else(n!==1||r!==1)&&a.push(i(a)+`scale(`+n+`,`+r+`)`)}return function(t,n){var r=[],i=[];return t=e(t),n=e(n),a(t.translateX,t.translateY,n.translateX,n.translateY,r,i),o(t.rotate,n.rotate,r,i),s(t.skewX,n.skewX,r,i),c(t.scaleX,t.scaleY,n.scaleX,n.scaleY,r,i),t=n=null,function(e){for(var t=-1,n=i.length,a;++t<n;)r[(a=i[t]).i]=a.x(e);return r.join(``)}}}var $a=Qa(Xa,`px, `,`px)`,`deg)`),eo=Qa(Za,`, `,`)`,`)`),to=1e-12;function no(e){return((e=Math.exp(e))+1/e)/2}function ro(e){return((e=Math.exp(e))-1/e)/2}function io(e){return((e=Math.exp(2*e))-1)/(e+1)}var ao=(function e(t,n,r){function i(e,i){var a=e[0],o=e[1],s=e[2],c=i[0],l=i[1],u=i[2],d=c-a,f=l-o,p=d*d+f*f,m,h;if(p<to)h=Math.log(u/s)/t,m=function(e){return[a+e*d,o+e*f,s*Math.exp(t*e*h)]};else{var g=Math.sqrt(p),_=(u*u-s*s+r*p)/(2*s*n*g),v=(u*u-s*s-r*p)/(2*u*n*g),y=Math.log(Math.sqrt(_*_+1)-_);h=(Math.log(Math.sqrt(v*v+1)-v)-y)/t,m=function(e){var r=e*h,i=no(y),c=s/(n*g)*(i*io(t*r+y)-ro(y));return[a+c*d,o+c*f,s*i/no(t*r+y)]}}return m.duration=h*1e3*t/Math.SQRT2,m}return i.rho=function(t){var n=Math.max(.001,+t),r=n*n;return e(n,r,r*r)},i})(Math.SQRT2,2,4),oo=0,so=0,co=0,lo=1e3,uo,fo,po=0,mo=0,ho=0,go=typeof performance==`object`&&performance.now?performance:Date,_o=typeof window==`object`&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function vo(){return mo||=(_o(yo),go.now()+ho)}function yo(){mo=0}function bo(){this._call=this._time=this._next=null}bo.prototype=xo.prototype={constructor:bo,restart:function(e,t,n){if(typeof e!=`function`)throw TypeError(`callback is not a function`);n=(n==null?vo():+n)+(t==null?0:+t),!this._next&&fo!==this&&(fo?fo._next=this:uo=this,fo=this),this._call=e,this._time=n,Eo()},stop:function(){this._call&&(this._call=null,this._time=1/0,Eo())}};function xo(e,t,n){var r=new bo;return r.restart(e,t,n),r}function So(){vo(),++oo;for(var e=uo,t;e;)(t=mo-e._time)>=0&&e._call.call(void 0,t),e=e._next;--oo}function Co(){mo=(po=go.now())+ho,oo=so=0;try{So()}finally{oo=0,To(),mo=0}}function wo(){var e=go.now(),t=e-po;t>lo&&(ho-=t,po=e)}function To(){for(var e,t=uo,n,r=1/0;t;)t._call?(r>t._time&&(r=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:uo=n);fo=e,Eo(r)}function Eo(e){oo||(so&&=clearTimeout(so),e-mo>24?(e<1/0&&(so=setTimeout(Co,e-go.now()-ho)),co&&=clearInterval(co)):(co||=(po=go.now(),setInterval(wo,lo)),oo=1,_o(Co)))}function Do(e,t,n){var r=new bo;return t=t==null?0:+t,r.restart(n=>{r.stop(),e(n+t)},t,n),r}var Oo=Ui(`start`,`end`,`cancel`,`interrupt`),ko=[];function Ao(e,t,n,r,i,a){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;Mo(e,n,{name:t,index:r,group:i,on:Oo,tween:ko,time:a.time,delay:a.delay,duration:a.duration,ease:a.ease,timer:null,state:0})}function jo(e,t){var n=Y(e,t);if(n.state>0)throw Error(`too late; already scheduled`);return n}function J(e,t){var n=Y(e,t);if(n.state>3)throw Error(`too late; already running`);return n}function Y(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw Error(`transition not found`);return n}function Mo(e,t,n){var r=e.__transition,i;r[t]=n,n.timer=xo(a,0,n.time);function a(e){n.state=1,n.timer.restart(o,n.delay,n.time),n.delay<=e&&o(e-n.delay)}function o(a){var l,u,d,f;if(n.state!==1)return c();for(l in r)if(f=r[l],f.name===n.name){if(f.state===3)return Do(o);f.state===4?(f.state=6,f.timer.stop(),f.on.call(`interrupt`,e,e.__data__,f.index,f.group),delete r[l]):+l<t&&(f.state=6,f.timer.stop(),f.on.call(`cancel`,e,e.__data__,f.index,f.group),delete r[l])}if(Do(function(){n.state===3&&(n.state=4,n.timer.restart(s,n.delay,n.time),s(a))}),n.state=2,n.on.call(`start`,e,e.__data__,n.index,n.group),n.state===2){for(n.state=3,i=Array(d=n.tween.length),l=0,u=-1;l<d;++l)(f=n.tween[l].value.call(e,e.__data__,n.index,n.group))&&(i[++u]=f);i.length=u+1}}function s(t){for(var r=t<n.duration?n.ease.call(null,t/n.duration):(n.timer.restart(c),n.state=5,1),a=-1,o=i.length;++a<o;)i[a].call(e,r);n.state===5&&(n.on.call(`end`,e,e.__data__,n.index,n.group),c())}function c(){for(var i in n.state=6,n.timer.stop(),delete r[t],r)return;delete e.__transition}}function No(e,t){var n=e.__transition,r,i,a=!0,o;if(n){for(o in t=t==null?null:t+``,n){if((r=n[o]).name!==t){a=!1;continue}i=r.state>2&&r.state<5,r.state=6,r.timer.stop(),r.on.call(i?`interrupt`:`cancel`,e,e.__data__,r.index,r.group),delete n[o]}a&&delete e.__transition}}function Po(e){return this.each(function(){No(this,e)})}function Fo(e,t){var n,r;return function(){var i=J(this,e),a=i.tween;if(a!==n){r=n=a;for(var o=0,s=r.length;o<s;++o)if(r[o].name===t){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function Io(e,t,n){var r,i;if(typeof n!=`function`)throw Error();return function(){var a=J(this,e),o=a.tween;if(o!==r){i=(r=o).slice();for(var s={name:t,value:n},c=0,l=i.length;c<l;++c)if(i[c].name===t){i[c]=s;break}c===l&&i.push(s)}a.tween=i}}function Lo(e,t){var n=this._id;if(e+=``,arguments.length<2){for(var r=Y(this.node(),n).tween,i=0,a=r.length,o;i<a;++i)if((o=r[i]).name===e)return o.value;return null}return this.each((t==null?Fo:Io)(n,e,t))}function Ro(e,t,n){var r=e._id;return e.each(function(){var e=J(this,r);(e.value||={})[t]=n.apply(this,arguments)}),function(e){return Y(e,r).value[t]}}function zo(e,t){var n;return(typeof t==`number`?Ba:t instanceof _a?za:(n=_a(t))?(t=n,za):Ga)(e,t)}function Bo(e){return function(){this.removeAttribute(e)}}function Vo(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Ho(e,t,n){var r,i=n+``,a;return function(){var o=this.getAttribute(e);return o===i?null:o===r?a:a=t(r=o,n)}}function Uo(e,t,n){var r,i=n+``,a;return function(){var o=this.getAttributeNS(e.space,e.local);return o===i?null:o===r?a:a=t(r=o,n)}}function Wo(e,t,n){var r,i,a;return function(){var o,s=n(this),c;return s==null?void this.removeAttribute(e):(o=this.getAttribute(e),c=s+``,o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s)))}}function Go(e,t,n){var r,i,a;return function(){var o,s=n(this),c;return s==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),c=s+``,o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s)))}}function Ko(e,t){var n=Wn(e),r=n===`transform`?eo:zo;return this.attrTween(e,typeof t==`function`?(n.local?Go:Wo)(n,r,Ro(this,`attr.`+e,t)):t==null?(n.local?Vo:Bo)(n):(n.local?Uo:Ho)(n,r,t))}function qo(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Jo(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Yo(e,t){var n,r;function i(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Jo(e,i)),n}return i._value=t,i}function Xo(e,t){var n,r;function i(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&qo(e,i)),n}return i._value=t,i}function Zo(e,t){var n=`attr.`+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!=`function`)throw Error();var r=Wn(e);return this.tween(n,(r.local?Yo:Xo)(r,t))}function Qo(e,t){return function(){jo(this,e).delay=+t.apply(this,arguments)}}function $o(e,t){return t=+t,function(){jo(this,e).delay=t}}function es(e){var t=this._id;return arguments.length?this.each((typeof e==`function`?Qo:$o)(t,e)):Y(this.node(),t).delay}function ts(e,t){return function(){J(this,e).duration=+t.apply(this,arguments)}}function ns(e,t){return t=+t,function(){J(this,e).duration=t}}function rs(e){var t=this._id;return arguments.length?this.each((typeof e==`function`?ts:ns)(t,e)):Y(this.node(),t).duration}function is(e,t){if(typeof t!=`function`)throw Error();return function(){J(this,e).ease=t}}function as(e){var t=this._id;return arguments.length?this.each(is(t,e)):Y(this.node(),t).ease}function os(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!=`function`)throw Error();J(this,e).ease=n}}function ss(e){if(typeof e!=`function`)throw Error();return this.each(os(this._id,e))}function cs(e){typeof e!=`function`&&(e=nr(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=[],c,l=0;l<o;++l)(c=a[l])&&e.call(c,c.__data__,l,a)&&s.push(c);return new X(r,this._parents,this._name,this._id)}function ls(e){if(e._id!==this._id)throw Error();for(var t=this._groups,n=e._groups,r=t.length,i=n.length,a=Math.min(r,i),o=Array(r),s=0;s<a;++s)for(var c=t[s],l=n[s],u=c.length,d=o[s]=Array(u),f,p=0;p<u;++p)(f=c[p]||l[p])&&(d[p]=f);for(;s<r;++s)o[s]=t[s];return new X(o,this._parents,this._name,this._id)}function us(e){return(e+``).trim().split(/^|\s+/).every(function(e){var t=e.indexOf(`.`);return t>=0&&(e=e.slice(0,t)),!e||e===`start`})}function ds(e,t,n){var r,i,a=us(t)?jo:J;return function(){var o=a(this,e),s=o.on;s!==r&&(i=(r=s).copy()).on(t,n),o.on=i}}function fs(e,t){var n=this._id;return arguments.length<2?Y(this.node(),n).on.on(e):this.each(ds(n,e,t))}function ps(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function ms(){return this.on(`end.remove`,ps(this._id))}function hs(e){var t=this._name,n=this._id;typeof e!=`function`&&(e=Yn(e));for(var r=this._groups,i=r.length,a=Array(i),o=0;o<i;++o)for(var s=r[o],c=s.length,l=a[o]=Array(c),u,d,f=0;f<c;++f)(u=s[f])&&(d=e.call(u,u.__data__,f,s))&&(`__data__`in u&&(d.__data__=u.__data__),l[f]=d,Ao(l[f],t,n,f,l,Y(u,n)));return new X(a,this._parents,t,n)}function gs(e){var t=this._name,n=this._id;typeof e!=`function`&&(e=$n(e));for(var r=this._groups,i=r.length,a=[],o=[],s=0;s<i;++s)for(var c=r[s],l=c.length,u,d=0;d<l;++d)if(u=c[d]){for(var f=e.call(u,u.__data__,d,c),p,m=Y(u,n),h=0,g=f.length;h<g;++h)(p=f[h])&&Ao(p,t,n,h,f,m);a.push(f),o.push(u)}return new X(a,o,t,n)}var _s=Ri.prototype.constructor;function vs(){return new _s(this._groups,this._parents)}function ys(e,t){var n,r,i;return function(){var a=Kr(this,e),o=(this.style.removeProperty(e),Kr(this,e));return a===o?null:a===n&&o===r?i:i=t(n=a,r=o)}}function bs(e){return function(){this.style.removeProperty(e)}}function xs(e,t,n){var r,i=n+``,a;return function(){var o=Kr(this,e);return o===i?null:o===r?a:a=t(r=o,n)}}function Ss(e,t,n){var r,i,a;return function(){var o=Kr(this,e),s=n(this),c=s+``;return s??(c=s=(this.style.removeProperty(e),Kr(this,e))),o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s))}}function Cs(e,t){var n,r,i,a=`style.`+t,o=`end.`+a,s;return function(){var c=J(this,e),l=c.on,u=c.value[a]==null?s||=bs(t):void 0;(l!==n||i!==u)&&(r=(n=l).copy()).on(o,i=u),c.on=r}}function ws(e,t,n){var r=(e+=``)==`transform`?$a:zo;return t==null?this.styleTween(e,ys(e,r)).on(`end.style.`+e,bs(e)):typeof t==`function`?this.styleTween(e,Ss(e,r,Ro(this,`style.`+e,t))).each(Cs(this._id,e)):this.styleTween(e,xs(e,r,t),n).on(`end.style.`+e,null)}function Ts(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}function Es(e,t,n){var r,i;function a(){var a=t.apply(this,arguments);return a!==i&&(r=(i=a)&&Ts(e,a,n)),r}return a._value=t,a}function Ds(e,t,n){var r=`style.`+(e+=``);if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!=`function`)throw Error();return this.tween(r,Es(e,t,n??``))}function Os(e){return function(){this.textContent=e}}function ks(e){return function(){var t=e(this);this.textContent=t??``}}function As(e){return this.tween(`text`,typeof e==`function`?ks(Ro(this,`text`,e)):Os(e==null?``:e+``))}function js(e){return function(t){this.textContent=e.call(this,t)}}function Ms(e){var t,n;function r(){var r=e.apply(this,arguments);return r!==n&&(t=(n=r)&&js(r)),t}return r._value=e,r}function Ns(e){var t=`text`;if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!=`function`)throw Error();return this.tween(t,Ms(e))}function Ps(){for(var e=this._name,t=this._id,n=Ls(),r=this._groups,i=r.length,a=0;a<i;++a)for(var o=r[a],s=o.length,c,l=0;l<s;++l)if(c=o[l]){var u=Y(c,t);Ao(c,e,n,l,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new X(r,this._parents,e,n)}function Fs(){var e,t,n=this,r=n._id,i=n.size();return new Promise(function(a,o){var s={value:o},c={value:function(){--i===0&&a()}};n.each(function(){var n=J(this,r),i=n.on;i!==e&&(t=(e=i).copy(),t._.cancel.push(s),t._.interrupt.push(s),t._.end.push(c)),n.on=t}),i===0&&a()})}var Is=0;function X(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function Ls(){return++Is}var Z=Ri.prototype;X.prototype={constructor:X,select:hs,selectAll:gs,selectChild:Z.selectChild,selectChildren:Z.selectChildren,filter:cs,merge:ls,selection:vs,transition:Ps,call:Z.call,nodes:Z.nodes,node:Z.node,size:Z.size,empty:Z.empty,each:Z.each,on:fs,attr:Ko,attrTween:Zo,style:ws,styleTween:Ds,text:As,textTween:Ns,remove:ms,tween:Lo,delay:es,duration:rs,ease:as,easeVarying:ss,end:Fs,[Symbol.iterator]:Z[Symbol.iterator]};function Rs(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var zs={time:null,delay:0,duration:250,ease:Rs};function Bs(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw Error(`transition ${t} not found`);return n}function Vs(e){var t,n;e instanceof X?(t=e._id,e=e._name):(t=Ls(),(n=zs).time=vo(),e=e==null?null:e+``);for(var r=this._groups,i=r.length,a=0;a<i;++a)for(var o=r[a],s=o.length,c,l=0;l<s;++l)(c=o[l])&&Ao(c,e,t,l,o,n||Bs(c,t));return new X(r,this._parents,e,t)}Ri.prototype.interrupt=Po,Ri.prototype.transition=Vs;var Hs=e=>()=>e;function Us(e,{sourceEvent:t,target:n,transform:r,dispatch:i}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:i}})}function Q(e,t,n){this.k=e,this.x=t,this.y=n}Q.prototype={constructor:Q,scale:function(e){return e===1?this:new Q(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Q(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return`translate(`+this.x+`,`+this.y+`) scale(`+this.k+`)`}};var Ws=new Q(1,0,0);Gs.prototype=Q.prototype;function Gs(e){for(;!e.__zoom;)if(!(e=e.parentNode))return Ws;return e.__zoom}function Ks(e){e.stopImmediatePropagation()}function qs(e){e.preventDefault(),e.stopImmediatePropagation()}function Js(e){return(!e.ctrlKey||e.type===`wheel`)&&!e.button}function Ys(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute(`viewBox`)?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function Xs(){return this.__zoom||Ws}function Zs(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function Qs(){return navigator.maxTouchPoints||`ontouchstart`in this}function $s(e,t,n){var r=e.invertX(t[0][0])-n[0][0],i=e.invertX(t[1][0])-n[1][0],a=e.invertY(t[0][1])-n[0][1],o=e.invertY(t[1][1])-n[1][1];return e.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),o>a?(a+o)/2:Math.min(0,a)||Math.max(0,o))}function ec(){var e=Js,t=Ys,n=$s,r=Zs,i=Qs,a=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],s=250,c=ao,l=Ui(`start`,`zoom`,`end`),u,d,f,p=500,m=150,h=0,g=10;function _(e){e.property(`__zoom`,Xs).on(`wheel.zoom`,te,{passive:!1}).on(`mousedown.zoom`,ne).on(`dblclick.zoom`,re).filter(i).on(`touchstart.zoom`,ie).on(`touchmove.zoom`,C).on(`touchend.zoom touchcancel.zoom`,ae).style(`-webkit-tap-highlight-color`,`rgba(0,0,0,0)`)}_.transform=function(e,t,n,r){var i=e.selection?e.selection():e;i.property(`__zoom`,Xs),e===i?i.interrupt().each(function(){S(this,arguments).event(r).start().zoom(null,typeof t==`function`?t.apply(this,arguments):t).end()}):x(e,t,n,r)},_.scaleBy=function(e,t,n,r){_.scaleTo(e,function(){return this.__zoom.k*(typeof t==`function`?t.apply(this,arguments):t)},n,r)},_.scaleTo=function(e,r,i,a){_.transform(e,function(){var e=t.apply(this,arguments),a=this.__zoom,s=i==null?b(e):typeof i==`function`?i.apply(this,arguments):i,c=a.invert(s),l=typeof r==`function`?r.apply(this,arguments):r;return n(y(v(a,l),s,c),e,o)},i,a)},_.translateBy=function(e,r,i,a){_.transform(e,function(){return n(this.__zoom.translate(typeof r==`function`?r.apply(this,arguments):r,typeof i==`function`?i.apply(this,arguments):i),t.apply(this,arguments),o)},null,a)},_.translateTo=function(e,r,i,a,s){_.transform(e,function(){var e=t.apply(this,arguments),s=this.__zoom,c=a==null?b(e):typeof a==`function`?a.apply(this,arguments):a;return n(Ws.translate(c[0],c[1]).scale(s.k).translate(typeof r==`function`?-r.apply(this,arguments):-r,typeof i==`function`?-i.apply(this,arguments):-i),e,o)},a,s)};function v(e,t){return t=Math.max(a[0],Math.min(a[1],t)),t===e.k?e:new Q(t,e.x,e.y)}function y(e,t,n){var r=t[0]-n[0]*e.k,i=t[1]-n[1]*e.k;return r===e.x&&i===e.y?e:new Q(e.k,r,i)}function b(e){return[(+e[0][0]+ +e[1][0])/2,(+e[0][1]+ +e[1][1])/2]}function x(e,n,r,i){e.on(`start.zoom`,function(){S(this,arguments).event(i).start()}).on(`interrupt.zoom end.zoom`,function(){S(this,arguments).event(i).end()}).tween(`zoom`,function(){var e=this,a=arguments,o=S(e,a).event(i),s=t.apply(e,a),l=r==null?b(s):typeof r==`function`?r.apply(e,a):r,u=Math.max(s[1][0]-s[0][0],s[1][1]-s[0][1]),d=e.__zoom,f=typeof n==`function`?n.apply(e,a):n,p=c(d.invert(l).concat(u/d.k),f.invert(l).concat(u/f.k));return function(e){if(e===1)e=f;else{var t=p(e),n=u/t[2];e=new Q(n,l[0]-t[0]*n,l[1]-t[1]*n)}o.zoom(null,e)}})}function S(e,t,n){return!n&&e.__zooming||new ee(e,t)}function ee(e,n){this.that=e,this.args=n,this.active=0,this.sourceEvent=null,this.extent=t.apply(e,n),this.taps=0}ee.prototype={event:function(e){return e&&(this.sourceEvent=e),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit(`start`)),this},zoom:function(e,t){return this.mouse&&e!==`mouse`&&(this.mouse[1]=t.invert(this.mouse[0])),this.touch0&&e!==`touch`&&(this.touch0[1]=t.invert(this.touch0[0])),this.touch1&&e!==`touch`&&(this.touch1[1]=t.invert(this.touch1[0])),this.that.__zoom=t,this.emit(`zoom`),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit(`end`)),this},emit:function(e){var t=W(this.that).datum();l.call(e,this.that,new Us(e,{sourceEvent:this.sourceEvent,target:_,type:e,transform:this.that.__zoom,dispatch:l}),t)}};function te(t,...i){if(!e.apply(this,arguments))return;var s=S(this,i).event(t),c=this.__zoom,l=Math.max(a[0],Math.min(a[1],c.k*2**r.apply(this,arguments))),u=Vi(t);if(s.wheel)(s.mouse[0][0]!==u[0]||s.mouse[0][1]!==u[1])&&(s.mouse[1]=c.invert(s.mouse[0]=u)),clearTimeout(s.wheel);else if(c.k===l)return;else s.mouse=[u,c.invert(u)],No(this),s.start();qs(t),s.wheel=setTimeout(d,m),s.zoom(`mouse`,n(y(v(c,l),s.mouse[0],s.mouse[1]),s.extent,o));function d(){s.wheel=null,s.end()}}function ne(t,...r){if(f||!e.apply(this,arguments))return;var i=t.currentTarget,a=S(this,r,!0).event(t),s=W(t.view).on(`mousemove.zoom`,d,!0).on(`mouseup.zoom`,p,!0),c=Vi(t,i),l=t.clientX,u=t.clientY;Xi(t.view),Ks(t),a.mouse=[c,this.__zoom.invert(c)],No(this),a.start();function d(e){if(qs(e),!a.moved){var t=e.clientX-l,r=e.clientY-u;a.moved=t*t+r*r>h}a.event(e).zoom(`mouse`,n(y(a.that.__zoom,a.mouse[0]=Vi(e,i),a.mouse[1]),a.extent,o))}function p(e){s.on(`mousemove.zoom mouseup.zoom`,null),Zi(e.view,a.moved),qs(e),a.event(e).end()}}function re(r,...i){if(e.apply(this,arguments)){var a=this.__zoom,c=Vi(r.changedTouches?r.changedTouches[0]:r,this),l=a.invert(c),u=a.k*(r.shiftKey?.5:2),d=n(y(v(a,u),c,l),t.apply(this,i),o);qs(r),s>0?W(this).transition().duration(s).call(x,d,c,r):W(this).call(_.transform,d,c,r)}}function ie(t,...n){if(e.apply(this,arguments)){var r=t.touches,i=r.length,a=S(this,n,t.changedTouches.length===i).event(t),o,s,c,l;for(Ks(t),s=0;s<i;++s)c=r[s],l=Vi(c,this),l=[l,this.__zoom.invert(l),c.identifier],a.touch0?!a.touch1&&a.touch0[2]!==l[2]&&(a.touch1=l,a.taps=0):(a.touch0=l,o=!0,a.taps=1+!!u);u&&=clearTimeout(u),o&&(a.taps<2&&(d=l[0],u=setTimeout(function(){u=null},p)),No(this),a.start())}}function C(e,...t){if(this.__zooming){var r=S(this,t).event(e),i=e.changedTouches,a=i.length,s,c,l,u;for(qs(e),s=0;s<a;++s)c=i[s],l=Vi(c,this),r.touch0&&r.touch0[2]===c.identifier?r.touch0[0]=l:r.touch1&&r.touch1[2]===c.identifier&&(r.touch1[0]=l);if(c=r.that.__zoom,r.touch1){var d=r.touch0[0],f=r.touch0[1],p=r.touch1[0],m=r.touch1[1],h=(h=p[0]-d[0])*h+(h=p[1]-d[1])*h,g=(g=m[0]-f[0])*g+(g=m[1]-f[1])*g;c=v(c,Math.sqrt(h/g)),l=[(d[0]+p[0])/2,(d[1]+p[1])/2],u=[(f[0]+m[0])/2,(f[1]+m[1])/2]}else if(r.touch0)l=r.touch0[0],u=r.touch0[1];else return;r.zoom(`touch`,n(y(c,l,u),r.extent,o))}}function ae(e,...t){if(this.__zooming){var n=S(this,t).event(e),r=e.changedTouches,i=r.length,a,o;for(Ks(e),f&&clearTimeout(f),f=setTimeout(function(){f=null},p),a=0;a<i;++a)o=r[a],n.touch0&&n.touch0[2]===o.identifier?delete n.touch0:n.touch1&&n.touch1[2]===o.identifier&&delete n.touch1;if(n.touch1&&!n.touch0&&(n.touch0=n.touch1,delete n.touch1),n.touch0)n.touch0[1]=this.__zoom.invert(n.touch0[0]);else if(n.end(),n.taps===2&&(o=Vi(o,this),Math.hypot(d[0]-o[0],d[1]-o[1])<g)){var s=W(this).on(`dblclick.zoom`);s&&s.apply(this,arguments)}}}return _.wheelDelta=function(e){return arguments.length?(r=typeof e==`function`?e:Hs(+e),_):r},_.filter=function(t){return arguments.length?(e=typeof t==`function`?t:Hs(!!t),_):e},_.touchable=function(e){return arguments.length?(i=typeof e==`function`?e:Hs(!!e),_):i},_.extent=function(e){return arguments.length?(t=typeof e==`function`?e:Hs([[+e[0][0],+e[0][1]],[+e[1][0],+e[1][1]]]),_):t},_.scaleExtent=function(e){return arguments.length?(a[0]=+e[0],a[1]=+e[1],_):[a[0],a[1]]},_.translateExtent=function(e){return arguments.length?(o[0][0]=+e[0][0],o[1][0]=+e[1][0],o[0][1]=+e[0][1],o[1][1]=+e[1][1],_):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},_.constrain=function(e){return arguments.length?(n=e,_):n},_.duration=function(e){return arguments.length?(s=+e,_):s},_.interpolate=function(e){return arguments.length?(c=e,_):c},_.on=function(){var e=l.on.apply(l,arguments);return e===l?_:e},_.clickDistance=function(e){return arguments.length?(h=(e=+e)*e,_):Math.sqrt(h)},_.tapDistance=function(e){return arguments.length?(g=+e,_):g},_}var tc=(e,t)=>Math.hypot(t[0]-e[0],t[1]-e[1]),nc=(e,t)=>[(e[0]+t[0])/2,(e[1]+t[1])/2],rc=(e,t,n)=>tc(e,t)<=n,ic=(e,t,n)=>Math.min(Math.max(e,t),n);function ac(e,t){let n=g({x:0,y:0,k:1}),r=g(!1),a=g(!1),s=null,l=null,u=null,d=!1,f=e=>{e.code===`Space`&&!Rn(e.target)&&!(e.target instanceof HTMLButtonElement)&&(r.value=!0,e.preventDefault())},p=e=>{e.code===`Space`&&(r.value=!1)},m=()=>{r.value=!1},h=e=>{e.button===1&&e.preventDefault()},_=e=>{if(!e.shiftKey&&!e.altKey)return;let t=e.deltaX===0?e.deltaY:e.deltaX,n=e.deltaMode===WheelEvent.DOM_DELTA_LINE?t*16:t;S(e.shiftKey?n:0,e.shiftKey?0:n),e.preventDefault()},v=e=>{e.button===2&&(u=[e.clientX,e.clientY],d=!1)},y=e=>{!u||d||(d=tc([e.clientX,e.clientY],u)>4)},b=()=>{u=null},x=e=>{d&&(d=!1,e.preventDefault(),e.stopPropagation())};o(()=>{let i=e.value;i&&(s=ec().scaleExtent([Ce,8]).filter(e=>{if(e.type===`wheel`){let t=e;return!t.shiftKey&&!t.altKey}if(e.type.startsWith(`touch`))return!0;let n=e;return n.button===1||n.button===2&&t?.rightDragPan===!0||n.button===0&&(t?.dragPan===!0||r.value)}).on(`start`,e=>{a.value=e.sourceEvent?.type===`mousedown`}).on(`zoom`,e=>{n.value={x:e.transform.x,y:e.transform.y,k:e.transform.k}}).on(`end`,()=>{a.value=!1}),l=W(i),l.call(s),i.addEventListener(`pointerdown`,h),i.addEventListener(`wheel`,_,{passive:!1}),t?.rightDragPan===!0&&(i.addEventListener(`pointerdown`,v),window.addEventListener(`pointermove`,y),window.addEventListener(`pointerup`,b),window.addEventListener(`pointercancel`,b),window.addEventListener(`contextmenu`,x,!0)),window.addEventListener(`keydown`,f),window.addEventListener(`keyup`,p),window.addEventListener(`blur`,m))}),c(()=>{l?.on(`.zoom`,null),e.value?.removeEventListener(`pointerdown`,h),e.value?.removeEventListener(`wheel`,_),e.value?.removeEventListener(`pointerdown`,v),window.removeEventListener(`pointermove`,y),window.removeEventListener(`pointerup`,b),window.removeEventListener(`pointercancel`,b),window.removeEventListener(`contextmenu`,x,!0),window.removeEventListener(`keydown`,f),window.removeEventListener(`keyup`,p),window.removeEventListener(`blur`,m)});function S(e,t){s&&l&&s.translateBy(l,-e/n.value.k,-t/n.value.k)}function ee(e){s&&l&&s.scaleBy(l,e)}function te(){s&&l&&l.call(s.transform,Ws)}function ne(t){let n=e.value;if(!n||!s||!l)return;let r=n.getBoundingClientRect(),a=t.max[0]-t.min[0],o=t.max[1]-t.min[1];if(r.width===0||r.height===0||a<=0||o<=0)return;let c=ic(Math.min(r.width/a,r.height/o)*i,Ce,8),u=[(t.min[0]+t.max[0])/2,(t.min[1]+t.max[1])/2];l.call(s.transform,Ws.translate(r.width/2,r.height/2).scale(c).translate(-u[0],-u[1]))}return{transform:ye(n),isSpacePanning:ye(r),isPanning:ye(a),resetView:te,fitBounds:ne,zoomBy:ee,panBy:S}}function oc(e,t){return!e||e.floor!==t?[]:(e.info?.images??[]).flatMap(e=>e.camera?[e.camera]:[])}var sc=/^[A-Za-z]$/,cc=/[A-Za-z]|-?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/g,lc=/^[MmLlHhVvZz0-9eE+,.\s-]*$/,$=e=>String(Math.round(e*1e3)/1e3),uc={L:([e,t],n,r)=>r?[e,t]:[n[0]+e,n[1]+t],H:([e],t,n)=>n?[e,t[1]]:[t[0]+e,t[1]],V:([e],t,n)=>n?[t[0],e]:[t[0],t[1]+e]};function dc(e){if(!lc.test(e))return null;let t=e.match(cc);if(!t||t.length===0)return null;let n=[[0,0]],r=[0,0],i=!1,a=!1,o=0,s=()=>o<t.length&&!sc.test(t[o]),c=e=>{let n=[];for(;n.length<e;){if(!s())return null;let e=Number(t[o]);if(o+=1,!Number.isFinite(e))return null;n.push(e)}return n},l=e=>{r=e,n.push(e),a=!0};for(;o<t.length;){if(i)return null;let e=t[o];if(!sc.test(e))return null;o+=1;let u=e.toUpperCase(),d=e===u;if(u===`M`){if(a)return null;let e=c(2);if(!e)return null;for(r=d?[e[0],e[1]]:[r[0]+e[0],r[1]+e[1]],n[0]=r;s();){let e=c(2);if(!e)return null;l(uc.L(e,r,d))}}else if(u===`L`||u===`H`||u===`V`)do{let e=c(u===`L`?2:1);if(!e)return null;l(uc[u](e,r,d))}while(s());else if(u===`Z`)i=!0;else return null}return{points:n,closed:i}}function fc(e){let t=dc(e);if(!t||t.points.length<3)return null;let n=t.points,r=n[0],i=n[n.length-1];return n.length>3&&r[0]===i[0]&&r[1]===i[1]&&n.pop(),n}function pc(e){let t=dc(e);return!t||t.closed||t.points.length<2?null:t.points}function mc(e){let t=pc(e);if(t)return t;let n=bc(e);return n?[n]:[]}function hc(e){let t=[];for(let n=1;n<e.length;n+=1){let r=e[n][0]-e[n-1][0],i=e[n][1]-e[n-1][1];(r!==0||i!==0)&&(i===0?t.push(`h${$(r)}`):r===0?t.push(`v${$(i)}`):t.push(`l${$(r)},${$(i)}`))}return t}function gc(e){let t=e[0];return[...t[0]!==0||t[1]!==0?[`M${$(t[0])},${$(t[1])}`]:[],...hc(e),`z`].join(` `)}function _c(e){return e.length===0?``:[`M${$(e[0][0])},${$(e[0][1])}`,...hc(e)].join(` `)}var vc=/^\s*M\s*(-?(?:\d*\.\d+|\d+))[\s,]+(-?(?:\d*\.\d+|\d+))([\s\S]*)$/;function yc(e){let t=vc.exec(e);return!t||/[MLHVCSQTA]/.test(t[3])?null:{start:[Number(t[1]),Number(t[2])],rest:t[3]}}function bc(e){return yc(e)?.start??null}function xc(e,t){let n=yc(e);return n?`M${$(n.start[0]+t[0])},${$(n.start[1]+t[1])}${n.rest}`:null}function Sc(e){if(`rect`in e){let[t,n]=e.rect;return[[0,0],[t,0],[t,n],[0,n]]}return fc(e.path)}function Cc(e){let t=[1/0,1/0],n=[-1/0,-1/0];for(let[r,i]of e)t[0]=Math.min(t[0],r),t[1]=Math.min(t[1],i),n[0]=Math.max(n[0],r),n[1]=Math.max(n[1],i);return{min:t,max:n}}function wc(e){return(Sc(e.shape)??[]).map(([t,n])=>[t+e.shape.origin[0],n+e.shape.origin[1]])}function Tc(e){let t=e.flatMap(wc);return t.length>0?Cc(t):null}var Ec=[`transform`],Dc=[`d`],Oc=[`r`],kc=P(a({__name:`CameraMarker`,props:{camera:{}},setup(e){return(t,n)=>(C(),I(`g`,{transform:`translate(${e.camera.pos[0]},${e.camera.pos[1]}) rotate(${e.camera.rotation})`,class:`camera-marker`},[O(`path`,{d:`M0,0 L${p(8)},${-p(8)/2} L${p(8)},${p(8)/2} Z`,class:`camera-cone`},null,8,Dc),O(`circle`,{r:p(8)/4,class:`camera-dot`},null,8,Oc)],8,Ec))}}),[[`__scopeId`,`data-v-3c1f1b22`]]);function Ac(e){let t=g(!1);return ee(e,()=>{t.value=!1}),{showIcon:k(()=>!!e.value&&!t.value),onIconError:()=>{t.value=!0}}}var jc={class:`callout-marker`},Mc=[`x1`,`y1`,`x2`,`y2`,`stroke`,`stroke-width`,`stroke-dasharray`],Nc=[`cx`,`cy`,`r`,`fill`],Pc=[`transform`],Fc=[`d`],Ic=[`d`,`stroke`],Lc=[`href`,`x`,`y`,`width`,`height`],Rc=[`d`,`fill`],zc=[`y`,`font-size`],Bc=P(a({__name:`CalloutMarker`,props:{marker:{},pos:{}},setup(e){let n=e,r=k(()=>[n.pos[0]+n.marker.offset[0],n.pos[1]+n.marker.offset[1]]),i=k(()=>n.marker.color??`#aaaaaa`),a=k(()=>n.marker.lineColor??i.value),o=k(()=>n.marker.lineDashed?`3 2`:void 0),s=k(()=>`label`in n.marker?n.marker.label:null),c=k(()=>`icon`in n.marker?Ie(n.marker.icon):void 0),{showIcon:l,onIconError:u}=Ac(c);function d(e){return`M0,${-e} l${e},${e} l${-e},${e} l${-e},${-e} z`}let f=d(5),m=d(3);return(n,d)=>(C(),I(`g`,jc,[O(`line`,{x1:e.pos[0],y1:e.pos[1],x2:r.value[0],y2:r.value[1],stroke:a.value,"stroke-width":p(Ve),"stroke-dasharray":o.value},null,8,Mc),O(`circle`,{cx:e.pos[0],cy:e.pos[1],r:p(1),fill:i.value},null,8,Nc),O(`g`,{transform:`translate(${r.value[0]},${r.value[1]})`},[O(`path`,{d:p(f),class:`badge-plate`},null,8,Fc),O(`path`,{d:p(f),stroke:i.value,class:`badge-ring`},null,8,Ic),p(l)?(C(),I(`image`,{key:0,href:c.value,x:-p(5)/2,y:-p(5)/2,width:p(5),height:p(5),onError:d[0]||=(...e)=>p(u)&&p(u)(...e)},null,40,Lc)):(C(),I(N,{key:1},[O(`path`,{d:p(m),fill:i.value},null,8,Rc),s.value===null?F(``,!0):(C(),I(`text`,{key:0,y:p(t),"font-size":p(5),class:`badge-label`},T(s.value),9,zc))],64))],8,Pc)]))}}),[[`__scopeId`,`data-v-8d7da3ae`]]);function Vc(e){return e?e.split(/\s+/).slice(0,2).map(e=>e[0]?.toUpperCase()??``).join(``):`?`}var Hc={door:{resizable:!0,anchor:`center`,fill:`element`},"double-door":{resizable:!0,anchor:`center`,fill:`element`},"barricaded-door":{resizable:!0,anchor:`center`,fill:`element`},window:{resizable:!0,anchor:`center`,fill:`element`},"crawl-passage":{resizable:!0,anchor:`center`,fill:`element`},obstacle:{resizable:!0,anchor:`center`,fill:`element`},stairs:{resizable:!0,anchor:`center`,fill:`element`},"spawn-room":{resizable:!1,anchor:`edge`,fill:`neutral`},shuttle:{resizable:!0,anchor:`center`,fill:`neutral`}};function Uc(e){let[t,n]=e.pos,r=e.rotation??0;return r?`translate(${t},${n}) rotate(${r})`:`translate(${t},${n})`}function Wc(e,t){return`M${-e/2},${-t/2} h${e} v${t} h${-e} z`}function Gc(e){return`M0,${-e/2} v${e}`}function Kc(e){return`M${-e/2},0 h${e}`}function qc(e){return-e/2-Ee-2}function Jc(e,t){let n=e+4;return`M${-n/2},${qc(t)} h${n} v2 h${-n} z`}function Yc(e,t){let n=e+4,r=qc(t),i=Math.max(1,Math.floor(n/2));return Array.from({length:i},(e,t)=>{let i=-n/2+t*2,a=Math.min(2,n/2-i);return`M${i},${r} l${a},${a}`}).join(` `)}function Xc(e,t){let n=Math.max(1,Math.floor(e/tt)),r=e/n;return Array.from({length:n},(n,i)=>`M${-e/2+i*r},${-t/2} l${r},${t}`).join(` `)}function Zc(e,t){let n=t*.3,r=ze*.45,i=[];for(let a=-e/2+r;a+r<=e/2;a+=ze)i.push(`M${a},${-t/2} h${r} v${n} h${-r} z`);return i.join(` `)}function Qc(e,t){let n=e*.18,r=Math.min(2,e*.08),i=-t*.2,a=t*.3,o=e=>`M${e-r},${i} L${e},${a} L${e+r},${i}`;return`${o(-n)} ${o(n)}`}function $c(e,t){let n=[];for(let r=-e/2+3;r<e/2;r+=3)n.push(`M${r},${-t/2} v${t}`);return n.join(` `)}function el(e,t,n){let r=n?1:-1,i=r*(e/2+t*.6),a=r*(e/2+.5),o=t*.4;return`M${a},${-o} L${i},0 L${a},${o}`}function tl(e,t){return`M${-e/2},0 v${-t} h${e} v${t} z`}function nl(e,t){return`M${-e/2},0 v${-t} h${e} v${t}`}function rl(e,t,n){let r=t/(1+2*be),i=r*be,a=r*f,o=r*h,s=Math.max((e-2*a-o)/n,0),c=Math.ceil(n/2);return{cellHeight:r,railHeight:i,wallWidth:a,consoleWidth:o,cellWidth:s,leftCells:c,consoleLeft:-e/2+a+c*s}}function il(e,t,n){let r=n>=e.leftCells?e.consoleWidth:0;return-t/2+e.wallWidth+(n+.5)*e.cellWidth+r}function al(e,t,n,r){return`M${e},${t} h${n} v${r} h${-n} z`}function ol(e,t,n){return`M${e-n},${t} a${n},${n} 0 1,0 ${2*n},0 a${n},${n} 0 1,0 ${-2*n},0 z`}function sl(e,t,n){let r=rl(e,t,n),i=-t/2,a=Math.max(e-2*r.wallWidth,0);return[al(-e/2,i,r.wallWidth,t),al(e/2-r.wallWidth,i,r.wallWidth,t),al(-e/2+r.wallWidth,i,a,r.railHeight),al(-e/2+r.wallWidth,t/2-r.railHeight,a,r.railHeight),al(r.consoleLeft,i,r.consoleWidth,t)].join(` `)}function cl(e,t,n){let r=rl(e,t,n);if(r.cellWidth<=0)return``;let i=[];for(let t=1;t<n;t+=1){if(t===r.leftCells)continue;let n=il(r,e,t)-r.cellWidth/2;i.push(`M${n},${-r.cellHeight/2} v${r.cellHeight}`)}return i.join(` `)}function ll(e,t,n){let r=rl(e,t,n),i=Math.min(he*r.cellHeight,r.cellWidth/2);return i<=0?``:Array.from({length:n},(t,n)=>ol(il(r,e,n),0,i)).join(` `)}function ul(e,t,n){let i=rl(e,t,n),a=i.cellHeight*r;return al(i.consoleLeft,-t/2-a,i.consoleWidth,a)}function dl(e,t,n){let i=rl(e,t,n),a=i.cellHeight*r,o=i.cellHeight*ve;return ol(i.consoleLeft+i.consoleWidth/2,-t/2-a/2,o)}var fl=[`transform`,`data-entity-id`],pl=[`href`,`x`,`y`,`width`,`height`],ml=[`cx`,`cy`,`r`,`fill`],hl=[`x`,`y`,`font-size`],gl=[`cx`,`cy`,`r`,`stroke`],_l=P(a({__name:`PlacementIcon`,props:{placement:{},element:{},selected:{type:Boolean}},setup(e){let t=e,n=k(()=>Ie(t.element?.icon)),{showIcon:r,onIconError:i}=Ac(n),a=k(()=>t.element?.size??10),o=k(()=>t.element?.anchor===`topleft`?[a.value/2,a.value/2]:[0,0]),s=k(()=>Vc(t.element?.name)),c=k(()=>Uc(t.placement));return(t,l)=>(C(),I(`g`,{transform:c.value,"data-entity-kind":`placement`,"data-entity-id":e.placement.id,class:`placement`},[p(r)?(C(),I(`image`,{key:0,href:n.value,x:o.value[0]-a.value/2,y:o.value[1]-a.value/2,width:a.value,height:a.value,onError:l[0]||=(...e)=>p(i)&&p(i)(...e)},null,40,pl)):(C(),I(N,{key:1},[O(`circle`,{cx:o.value[0],cy:o.value[1],r:a.value/2,fill:e.element?.color??p(`#7f8c8d`),class:`placeholder`},null,8,ml),O(`text`,{x:o.value[0],y:o.value[1],"font-size":a.value*p(te),class:`placeholder-initials`},T(s.value),9,hl)],64)),e.selected?(C(),I(`circle`,{key:2,cx:o.value[0],cy:o.value[1],r:a.value/2+p(2),class:`selection-ring`,stroke:p(le)},null,8,gl)):F(``,!0)],8,fl))}}),[[`__scopeId`,`data-v-e27498bb`]]),vl=[`transform`,`data-entity-id`],yl=[`d`,`fill`],bl=[`d`],xl=[`d`,`fill`],Sl=[`d`,`fill`],Cl=[`d`],wl=[`d`,`fill`],Tl=[`d`],El=[`d`,`fill`],Dl=[`d`],Ol=[`d`,`fill`],kl=[`d`],Al=[`d`],jl=[`d`,`fill`],Ml=[`d`],Nl=[`d`],Pl=[`d`],Fl=[`d`],Il=[`d`],Ll=[`d`],Rl=[`d`],zl=[`d`],Bl=[`d`],Vl=[`d`,`stroke-width`],Hl=[`href`,`x`,`y`,`width`,`height`],Ul=[`stroke`],Wl=P(a({__name:`StructuralMarker`,props:{placement:{},element:{},selected:{type:Boolean}},setup(e){let t=e,n=k(()=>Ie(t.element.icon)),{showIcon:r,onIconError:i}=Ac(n),a=k(()=>t.element.render?.kind),o=k(()=>a.value?Hc[a.value]:void 0),s=k(()=>{let e=t.element.render,n={length:e?.length??0,thickness:e?.thickness??0};return o.value?.resizable?{length:t.placement.size?.[0]??n.length,thickness:t.placement.size?.[1]??n.thickness}:n}),c=k(()=>Wc(s.value.length,s.value.thickness)),l=k(()=>t.placement.props?.direction!==`down`),u=k(()=>{let e=Number(t.placement.props?.cells);return Number.isFinite(e)?Math.max(1,Math.floor(e)):4}),d=k(()=>t.placement.props?.enterable===!0),f=k(()=>t.placement.props?.redButton===!0),m=k(()=>o.value?.fill===`element`?t.element.color:void 0),h=k(()=>Uc(t.placement)),g=k(()=>{let e=n.value;if(!r.value||!e)return;let i=t.element.size??10,a=o.value?.anchor===`edge`?-s.value.thickness/2:0;return{url:e,size:i,x:-i/2,y:a-i/2}}),_=k(()=>{let{length:e,thickness:t}=s.value;return{x:-e/2-2,y:(o.value?.anchor===`edge`?-t:-t/2)-2,width:e+4,height:t+4}});return(t,n)=>(C(),I(`g`,{transform:h.value,"data-entity-kind":`placement`,"data-entity-id":e.placement.id,class:`structural`},[a.value===`door`||a.value===`double-door`?(C(),I(N,{key:0},[O(`path`,{d:c.value,fill:m.value,class:`body`},null,8,yl),a.value===`double-door`?(C(),I(`path`,{key:0,d:p(Gc)(s.value.thickness),class:`door-seam`},null,8,bl)):F(``,!0)],64)):a.value===`barricaded-door`?(C(),I(N,{key:1},[O(`path`,{d:c.value,fill:m.value,class:`body`},null,8,xl),O(`path`,{d:p(Jc)(s.value.length,s.value.thickness),fill:m.value,class:`barricade-plank`},null,8,Sl),O(`path`,{d:p(Yc)(s.value.length,s.value.thickness),class:`barricade-hatch`},null,8,Cl)],64)):a.value===`window`?(C(),I(N,{key:2},[O(`path`,{d:c.value,fill:m.value,class:`body`},null,8,wl),O(`path`,{d:p(Kc)(s.value.length),class:`window-mullion`},null,8,Tl)],64)):a.value===`crawl-passage`?(C(),I(N,{key:3},[O(`path`,{d:c.value,fill:m.value,class:`body`},null,8,El),O(`path`,{d:p(Xc)(s.value.length,s.value.thickness),class:`crawl-bars`},null,8,Dl)],64)):a.value===`obstacle`?(C(),I(N,{key:4},[O(`path`,{d:c.value,fill:m.value},null,8,Ol),O(`path`,{d:p(Zc)(s.value.length,s.value.thickness),class:`obstacle-decor`},null,8,kl),O(`path`,{d:p(Qc)(s.value.length,s.value.thickness),class:`obstacle-chevrons`},null,8,Al)],64)):a.value===`stairs`?(C(),I(N,{key:5},[O(`path`,{d:c.value,fill:m.value,class:`stairs`},null,8,jl),O(`path`,{d:p($c)(s.value.length,s.value.thickness),class:`stairs-rungs`},null,8,Ml),O(`path`,{d:p(el)(s.value.length,s.value.thickness,l.value),class:`stairs-arrow`},null,8,Nl)],64)):a.value===`shuttle`?(C(),I(N,{key:6},[O(`path`,{d:c.value,class:`shuttle-body`},null,8,Pl),O(`path`,{d:p(sl)(s.value.length,s.value.thickness,u.value),class:`shuttle-frame`},null,8,Fl),O(`path`,{d:p(cl)(s.value.length,s.value.thickness,u.value),class:`shuttle-seams`},null,8,Il),d.value?(C(),I(`path`,{key:0,d:p(ll)(s.value.length,s.value.thickness,u.value),class:`shuttle-dots`},null,8,Ll)):F(``,!0),f.value?(C(),I(N,{key:1},[O(`path`,{d:p(ul)(s.value.length,s.value.thickness,u.value),class:`shuttle-button-box`},null,8,Rl),O(`path`,{d:p(dl)(s.value.length,s.value.thickness,u.value),class:`shuttle-button`},null,8,zl)],64)):F(``,!0)],64)):a.value===`spawn-room`?(C(),I(N,{key:7},[O(`path`,{d:p(tl)(s.value.length,s.value.thickness),class:`spawn-floor`},null,8,Bl),O(`path`,{d:p(nl)(s.value.length,s.value.thickness),"stroke-width":p(oe),class:`spawn-walls`},null,8,Vl)],64)):F(``,!0),g.value?(C(),I(`image`,{key:8,href:g.value.url,x:g.value.x,y:g.value.y,width:g.value.size,height:g.value.size,onError:n[0]||=(...e)=>p(i)&&p(i)(...e)},null,40,Hl)):F(``,!0),e.selected?(C(),I(`rect`,w({key:9},_.value,{class:`selection-outline`,stroke:p(le)}),null,16,Ul)):F(``,!0)],8,vl))}}),[[`__scopeId`,`data-v-c6c9b095`]]),Gl=a({__name:`PlacementMarker`,props:{placement:{},element:{},selected:{type:Boolean}},setup(e){let t=e,n=k(()=>t.element?.render?t.element:void 0);return(t,r)=>n.value?(C(),E(Wl,{key:0,placement:e.placement,element:n.value,selected:e.selected},null,8,[`placement`,`element`,`selected`])):(C(),E(_l,{key:1,placement:e.placement,element:e.element,selected:e.selected},null,8,[`placement`,`element`,`selected`]))}}),Kl=(e,t)=>e[0]===t[0]&&e[1]===t[1];function ql(e){return e.map((t,n)=>[t,e[(n+1)%e.length]])}function Jl([e,t]){return tc(e,t)}function Yl([e,t],n){let r=Jl([e,t]);if(r===0)return[e[0],e[1]];let i=n/r;return[e[0]+(t[0]-e[0])*i,e[1]+(t[1]-e[1])*i]}function Xl([e,t],n){let r=t[0]-e[0],i=t[1]-e[1],a=r*r+i*i;return a===0?0:ic(((n[0]-e[0])*r+(n[1]-e[1])*i)/a,0,1)*Math.sqrt(a)}function Zl(e,t){return tc(t,Yl(e,Xl(e,t)))}function Ql(e,t){let n=ql(e);if(t.edge>=n.length)return null;let r=n[t.edge];return[Yl(r,t.start),Yl(r,t.start+t.length)]}function $l(e,t,n){let r=e.filter(e=>e.edge===t).map(e=>({start:Math.max(0,Math.min(e.start,n)),end:Math.max(0,Math.min(e.start+e.length,n))})).filter(e=>e.end>e.start).sort((e,t)=>e.start-t.start),i=[];for(let e of r){let t=i[i.length-1];t&&e.start<=t.end?t.end=Math.max(t.end,e.end):i.push({...e})}return i}function eu(e,t){let[n,...r]=e,i=r.map(e=>`L${$(e[0])},${$(e[1])}`).join(``);return`M${$(n[0])},${$(n[1])}${i}${t?` z`:``}`}function tu(e,t){let n=ql(e),r=[],i=[n[0][0]],a=()=>{i.length>=2&&r.push(i)};if(n.forEach((e,n)=>{let r=Jl(e),o=0;for(let s of $l(t,n,r))s.start>o&&i.push(Yl(e,s.start)),a(),i=[Yl(e,s.end)],o=s.end;o<r&&i.push(e[1])}),a(),r.length===0)return``;let o=r[0],s=r[r.length-1];return r.length===1?Kl(o[0],o[o.length-1])?eu(o.slice(0,-1),!0):eu(o,!1):(Kl(s[s.length-1],o[0])&&(r[0]=[...s,...o.slice(1)],r.pop()),r.map(e=>eu(e,!1)).join(` `))}function nu(e,t){t.length===0?delete e.wallGaps:e.wallGaps=t}function ru(e,t,n){let r=ql(e);return t.flatMap(e=>{if(e.edge>=r.length)return[];let t=r[e.edge],i=Jl(t),a=ic(e.start,0,i),o=Math.min(e.length,i-a);return o>=n?[{edge:e.edge,start:a,length:o}]:[]})}function iu(e,t){return e.map(e=>e.edge>t?{...e,edge:e.edge+1}:e)}function au(e,t){return e.flatMap(e=>e.edge===t?[]:[e.edge>t?{...e,edge:e.edge-1}:e])}var ou=[`transform`,`opacity`,`data-entity-id`],su=[`d`,`fill`],cu=[`d`,`stroke`,`stroke-width`],lu=[`d`],uu=[`x`,`y`,`font-size`],du=[`d`,`stroke`],fu=P(a({__name:`RoomShape`,props:{room:{},zone:{},selected:{type:Boolean}},setup(e){let t=e,n=k(()=>new Set(t.room.flags??[])),r=k(()=>{let e=t.room.shape;if(`rect`in e){let[t,n]=e.rect;return`M0,0 h${t} v${n} h${-t} z`}return`M0,0 ${e.path}`}),i=k(()=>n.value.has(`secret`)?S:t.zone?.fill??`#4a4a4a`),a=k(()=>t.zone?.walls??`#111111`),o=k(()=>n.value.has(`disabled`)?ot:1),s=k(()=>{if(n.value.has(`noWalls`))return null;let e=t.room.wallGaps;if(!e?.length)return r.value;let i=Sc(t.room.shape);return i?tu(i,e):r.value});return(t,n)=>(C(),I(`g`,{transform:`translate(${e.room.shape.origin[0]},${e.room.shape.origin[1]})`,opacity:o.value,style:y({color:a.value}),"data-entity-kind":`room`,"data-entity-id":e.room.id},[O(`path`,{d:r.value,fill:i.value,stroke:`none`},null,8,su),s.value?(C(),I(`path`,{key:0,d:s.value,fill:`none`,stroke:a.value,"stroke-width":p(oe),"stroke-linejoin":`miter`},null,8,cu)):F(``,!0),(C(!0),I(N,null,j(e.room.innerLines,(e,t)=>(C(),I(`path`,{key:t,d:`M0,0 ${e.path}`,class:x([`inner-line`,`inner-${e.style}`])},null,10,lu))),128)),e.room.label?(C(),I(`text`,{key:1,x:e.room.label.pos[0],y:e.room.label.pos[1],"font-size":e.room.label.fontSize??p(8),class:`room-label`},T(e.room.label.text),9,uu)):F(``,!0),e.selected?(C(),I(`path`,{key:2,d:r.value,class:`selection-outline`,stroke:p(le)},null,8,du)):F(``,!0)],12,ou))}}),[[`__scopeId`,`data-v-2e55205a`]]),pu=[`data-entity-id`],mu=[`d`],hu=[`d`],gu=P(a({__name:`RoutePath`,props:{route:{},selected:{type:Boolean},hitArea:{type:Boolean}},setup(e){return(t,n)=>(C(),I(`g`,{"data-entity-kind":`route`,"data-entity-id":e.route.id},[e.hitArea?(C(),I(`path`,{key:0,d:e.route.path,class:`route-hit`},null,8,mu)):F(``,!0),O(`path`,{d:e.route.path,class:`route`,style:y(e.selected?{stroke:p(le)}:void 0)},null,12,hu)],8,pu))}}),[[`__scopeId`,`data-v-1fc1c8fe`]]);function _u(e){return`radius`in e}function vu(e){return`size`in e}function yu(e){return`path`in e}function bu(e){if(_u(e)){let[t,n]=e.pos,r=e.radius;return[[t-r,n],[t+r,n],[t,n-r],[t,n+r]]}if(vu(e)){let[t,n]=e.pos,[r,i]=[e.size[0]/2,e.size[1]/2],a=(e.rotation??0)*Math.PI/180,[o,s]=[Math.cos(a),Math.sin(a)];return[[-r,-i],[r,-i],[r,i],[-r,i]].map(([e,r])=>[t+e*o-r*s,n+e*s+r*o])}return mc(e.path)}function xu(e,t){if(yu(e)){e.path=xc(e.path,t)??e.path;return}e.pos=[e.pos[0]+t[0],e.pos[1]+t[1]]}var Su=[`data-entity-id`],Cu=P(a({__name:`ShapeOutline`,props:{shape:{},selected:{type:Boolean},hitArea:{type:Boolean}},setup(e){let t=e,n=k(()=>{let e=t.shape;if(_u(e))return{is:`circle`,attrs:{cx:e.pos[0],cy:e.pos[1],r:e.radius}};if(vu(e)){let[t,n]=e.pos,[r,i]=e.size;return{is:`rect`,attrs:{x:t-r/2,y:n-i/2,width:r,height:i,transform:e.rotation?`rotate(${e.rotation} ${t} ${n})`:void 0}}}return{is:`path`,attrs:{d:e.path}}}),r=k(()=>({stroke:t.selected?le:t.shape.color??`#85858c`,"stroke-width":t.shape.strokeWidth??1,"stroke-dasharray":t.shape.dashed?`3 2`:void 0}));return(t,i)=>(C(),I(`g`,{"data-entity-kind":`shape`,"data-entity-id":e.shape.id},[e.hitArea?(C(),E(ie(n.value.is),w({key:0},n.value.attrs,{class:`shape-hit`}),null,16)):F(``,!0),(C(),E(ie(n.value.is),w({...n.value.attrs,...r.value},{class:`shape-outline`}),null,16))],8,Su))}}),[[`__scopeId`,`data-v-07dcb439`]]),wu=a({__name:`FloorLayer`,props:{trial:{},floor:{},elementIndex:{},zones:{},selectedIds:{},hiddenCategories:{},interactive:{type:Boolean}},setup(e){let t=e;function n(e){return e.filter(e=>e.floor===t.floor)}let r=k(()=>n(t.trial.rooms)),i=k(()=>n(t.trial.placements).filter(e=>{let n=t.elementIndex.get(e.element)?.category;return!n||!t.hiddenCategories?.has(n)})),a=k(()=>n(t.trial.routes)),o=k(()=>n(t.trial.shapes)),s=k(()=>i.value.filter(e=>e.marker));return(t,n)=>(C(),I(`g`,null,[(C(!0),I(N,null,j(r.value,t=>(C(),E(fu,{key:t.id,room:t,zone:e.zones.get(t.zone),selected:e.selectedIds?.has(t.id)},null,8,[`room`,`zone`,`selected`]))),128)),(C(!0),I(N,null,j(o.value,t=>(C(),E(Cu,{key:t.id,shape:t,selected:e.selectedIds?.has(t.id),"hit-area":e.interactive},null,8,[`shape`,`selected`,`hit-area`]))),128)),(C(!0),I(N,null,j(a.value,t=>(C(),E(gu,{key:t.id,route:t,selected:e.selectedIds?.has(t.id),"hit-area":e.interactive},null,8,[`route`,`selected`,`hit-area`]))),128)),(C(!0),I(N,null,j(i.value,t=>(C(),E(Gl,{key:t.id,placement:t,element:e.elementIndex.get(t.element),selected:e.selectedIds?.has(t.id)},null,8,[`placement`,`element`,`selected`]))),128)),(C(!0),I(N,null,j(s.value,e=>(C(),E(Bc,{key:`marker-${e.id}`,marker:e.marker,pos:e.pos},null,8,[`marker`,`pos`]))),128))]))}}),Tu=[`transform`],Eu=P(a({__name:`MapCanvas`,props:{transform:{}},setup(e,{expose:t}){let r=ge(null);return t({svgEl:r}),(t,i)=>(C(),I(`svg`,{ref_key:`svgEl`,ref:r,class:`map-canvas`},[O(`g`,{transform:`translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`},[n(t.$slots,`default`,{},void 0,!0)],8,Tu),n(t.$slots,`screen`,{},void 0,!0)],512))}}),[[`__scopeId`,`data-v-a13509ed`]]);function Du(e){return(e.find(e=>e.default)??e[0])?.id??null}function Ou(e){return e.some(e=>e.index===0)?0:e[0]?.index??0}function ku(e,t,n,r){let i=new Set;for(let a of r)i.has(a)&&e.push({path:t,message:`duplicate ${n} id "${a}"`}),i.add(a)}function Au(e){let t=[];ku(t,`categories`,`category`,e.categories.map(e=>e.id)),ku(t,`elements`,`element`,e.elements.map(e=>e.id));let n=new Set(e.categories.map(e=>e.id));return e.elements.forEach((e,r)=>{n.has(e.category)||t.push({path:`elements[${r}].category`,message:`unknown category "${e.category}"`})}),t}function ju(e){let t=[];return ku(t,`zones`,`zone`,e.zones.map(e=>e.id)),t}function Mu(e,t){let n=e.wallGaps;if(!n?.length)return[];let r=Sc(e.shape);if(!r)return[{path:`${t}.wallGaps`,message:`wall gaps need a parsable outline (only M/L/H/V/Z are supported)`}];let i=ql(r),a=[];return n.forEach((e,n)=>{let r=`${t}.wallGaps[${n}]`,o=i[e.edge];if(!o){a.push({path:r,message:`unknown edge ${e.edge} (outline has ${i.length})`});return}if(e.length<=0){a.push({path:r,message:`length must be greater than 0`});return}let s=Jl(o);(e.start<0||e.start+e.length>s)&&a.push({path:r,message:`gap ${e.start}–${e.start+e.length} exceeds edge ${e.edge} (length ${Math.round(s*100)/100})`})}),a}function Nu(e){let t=[];ku(t,`trials`,`trial`,e.trials.map(e=>e.id));let n=e.trials.filter(e=>e.default).length;return n!==1&&t.push({path:`trials`,message:`exactly one trial must have "default": true (found ${n})`}),t}function Pu(e,t,n){let r=[];return n.floorIndexes.has(e.floor)||r.push({path:`rooms[${t}].floor`,message:`unknown floor ${e.floor}`}),n.zoneIds.has(e.zone)||r.push({path:`rooms[${t}].zone`,message:`unknown zone "${e.zone}"`}),r.push(...Mu(e,`rooms[${t}]`)),r}function Fu(e,t,n){let r=[],i=n.elementsById.get(e.element);if(i||r.push({path:`placements[${t}].element`,message:`unknown element "${e.element}"`}),e.size!==void 0&&(i&&!i.render&&r.push({path:`placements[${t}].size`,message:`"size" is only allowed on structural elements (element "${e.element}" has none)`}),e.size.some(e=>e<=0)&&r.push({path:`placements[${t}].size`,message:`size values must be greater than 0`})),n.floorIndexes.has(e.floor)||r.push({path:`placements[${t}].floor`,message:`unknown floor ${e.floor}`}),e.roomId!==void 0){let i=n.roomsById.get(e.roomId);i?i.floor!==e.floor&&r.push({path:`placements[${t}].roomId`,message:`placement is on floor ${e.floor} but room "${i.id}" is on floor ${i.floor}`}):r.push({path:`placements[${t}].roomId`,message:`unknown room "${e.roomId}"`})}return r}function Iu(e,t,n){let r=[],i={floorIndexes:new Set(e.floors.map(e=>e.index)),zoneIds:new Set((n?.zones??[]).map(e=>e.id)),categoryIds:new Set((t?.categories??[]).map(e=>e.id)),elementsById:new Map((t?.elements??[]).map(e=>[e.id,e])),roomsById:new Map(e.rooms.map(e=>[e.id,e]))},a=[[`floors`,`floor`,e.floors.map(e=>e.index)],[`filters`,`filter`,e.filters.map(e=>e.id)],[`rooms`,`room`,e.rooms.map(e=>e.id)],[`placements`,`placement`,e.placements.map(e=>e.id)],[`routes`,`route`,e.routes.map(e=>e.id)],[`shapes`,`shape`,e.shapes.map(e=>e.id)]];for(let[e,t,n]of a)ku(r,e,t,n);e.rooms.forEach((e,t)=>r.push(...Pu(e,t,i))),e.placements.forEach((e,t)=>r.push(...Fu(e,t,i)));let o=[[`routes`,e.routes],[`shapes`,e.shapes]];for(let[e,t]of o)t.forEach((t,n)=>{i.floorIndexes.has(t.floor)||r.push({path:`${e}[${n}].floor`,message:`unknown floor ${t.floor}`})});return e.filters.forEach((e,t)=>{e.categories.forEach(e=>{i.categoryIds.has(e)||r.push({path:`filters[${t}].categories`,message:`unknown category "${e}"`})})}),r}function Lu(e){return new Map((e?.elements??[]).map(e=>[e.id,e]))}function Ru(e){return new Map((e?.zones??[]).map(e=>[e.id,e]))}var zu=[`room`,`placement`,`route`,`shape`];function Bu(e){if(!(e instanceof Element))return null;let t=e.closest(`[data-entity-kind]`);if(!t)return null;let n=t.getAttribute(`data-entity-kind`),r=t.getAttribute(`data-entity-id`);return!n||!r||!zu.includes(n)?null:{kind:n,id:r}}var Vu=Xe(),Hu={name:`BlankIcon`,extends:B};function Uu(e){return qu(e)||Ku(e)||Gu(e)||Wu()}function Wu(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Gu(e,t){if(e){if(typeof e==`string`)return Ju(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ju(e,t):void 0}}function Ku(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function qu(e){if(Array.isArray(e))return Ju(e)}function Ju(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Yu(e,t,n,r,i,a){return C(),I(`svg`,w({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Uu(t[0]||=[O(`rect`,{width:`1`,height:`1`,fill:`currentColor`,"fill-opacity":`0`},null,-1)]),16)}Hu.render=Yu;var Xu={name:`ChevronDownIcon`,extends:B};function Zu(e){return td(e)||ed(e)||$u(e)||Qu()}function Qu(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $u(e,t){if(e){if(typeof e==`string`)return nd(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?nd(e,t):void 0}}function ed(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function td(e){if(Array.isArray(e))return nd(e)}function nd(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function rd(e,t,n,r,i,a){return C(),I(`svg`,w({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Zu(t[0]||=[O(`path`,{d:`M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z`,fill:`currentColor`},null,-1)]),16)}Xu.render=rd;var id={name:`SearchIcon`,extends:B};function ad(e){return ld(e)||cd(e)||sd(e)||od()}function od(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function sd(e,t){if(e){if(typeof e==`string`)return ud(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ud(e,t):void 0}}function cd(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function ld(e){if(Array.isArray(e))return ud(e)}function ud(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function dd(e,t,n,r,i,a){return C(),I(`svg`,w({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),ad(t[0]||=[O(`path`,{"fill-rule":`evenodd`,"clip-rule":`evenodd`,d:`M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z`,fill:`currentColor`},null,-1)]),16)}id.render=dd;var fd={name:`IconField`,extends:{name:`BaseIconField`,extends:z,style:D.extend({name:`iconfield`,style:`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`,classes:{root:`p-iconfield`}}),provide:function(){return{$pcIconField:this,$parentInstance:this}}},inheritAttrs:!1};function pd(e,t,r,i,a,o){return C(),I(`div`,w({class:e.cx(`root`)},e.ptmi(`root`)),[n(e.$slots,`default`)],16)}fd.render=pd;var md={name:`InputIcon`,extends:{name:`BaseInputIcon`,extends:z,style:D.extend({name:`inputicon`,classes:{root:`p-inputicon`}}),props:{class:null},provide:function(){return{$pcInputIcon:this,$parentInstance:this}}},inheritAttrs:!1,computed:{containerClass:function(){return[this.cx(`root`),this.class]}}};function hd(e,t,r,i,a,o){return C(),I(`span`,w({class:o.containerClass},e.ptmi(`root`),{"aria-hidden":`true`}),[n(e.$slots,`default`)],16)}md.render=hd;var gd={name:`BaseEditableHolder`,extends:z,emits:[`update:modelValue`,`value-change`],props:{modelValue:{type:null,default:void 0},defaultValue:{type:null,default:void 0},name:{type:String,default:void 0},invalid:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},formControl:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0},$pcForm:{default:void 0},$pcFormField:{default:void 0}},data:function(){return{d_value:this.defaultValue===void 0?this.modelValue:this.defaultValue}},watch:{modelValue:{deep:!0,handler:function(e){this.d_value=e}},defaultValue:function(e){this.d_value=e},$formName:{immediate:!0,handler:function(e){var t,n;this.formField=((t=this.$pcForm)==null||(n=t.register)==null?void 0:n.call(t,e,this.$formControl))||{}}},$formControl:{immediate:!0,handler:function(e){var t,n;this.formField=((t=this.$pcForm)==null||(n=t.register)==null?void 0:n.call(t,this.$formName,e))||{}}},$formDefaultValue:{immediate:!0,handler:function(e){this.d_value!==e&&(this.d_value=e)}},$formValue:{immediate:!1,handler:function(e){var t;(t=this.$pcForm)!=null&&t.getFieldState(this.$formName)&&e!==this.d_value&&(this.d_value=e)}}},formField:{},methods:{writeValue:function(e,t){var n,r;this.controlled&&(this.d_value=e,this.$emit(`update:modelValue`,e)),this.$emit(`value-change`,e),(n=(r=this.formField).onChange)==null||n.call(r,{originalEvent:t,value:e})},findNonEmpty:function(){return[...arguments].find(M)}},computed:{$filled:function(){return M(this.d_value)},$invalid:function(){var e,t;return!this.$formNovalidate&&this.findNonEmpty(this.invalid,(e=this.$pcFormField)==null||(e=e.$field)==null?void 0:e.invalid,(t=this.$pcForm)==null||(t=t.getFieldState(this.$formName))==null?void 0:t.invalid)},$formName:function(){return this.$formNovalidate?void 0:this.name||this.$formControl?.name},$formControl:function(){return this.formControl||this.$pcFormField?.formControl},$formNovalidate:function(){return this.$formControl?.novalidate},$formDefaultValue:function(){var e;return this.findNonEmpty(this.d_value,this.$pcFormField?.initialValue,(e=this.$pcForm)==null||(e=e.initialValues)==null?void 0:e[this.$formName])},$formValue:function(){var e,t;return this.findNonEmpty((e=this.$pcFormField)==null||(e=e.$field)==null?void 0:e.value,(t=this.$pcForm)==null||(t=t.getFieldState(this.$formName))==null?void 0:t.value)},controlled:function(){return this.$inProps.hasOwnProperty(`modelValue`)||!this.$inProps.hasOwnProperty(`modelValue`)&&!this.$inProps.hasOwnProperty(`defaultValue`)},filled:function(){return this.$filled}}},_d={name:`BaseInput`,extends:gd,props:{size:{type:String,default:null},fluid:{type:Boolean,default:null},variant:{type:String,default:null}},inject:{$parentInstance:{default:void 0},$pcFluid:{default:void 0}},computed:{$variant:function(){return this.variant??(this.$primevue.config.inputStyle||this.$primevue.config.inputVariant)},$fluid:function(){return this.fluid??!!this.$pcFluid},hasFluid:function(){return this.$fluid}}},vd={name:`BaseInputText`,extends:_d,style:D.extend({name:`inputtext`,style:`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-inputtext p-component`,{"p-filled":t.$filled,"p-inputtext-sm p-inputfield-sm":n.size===`small`,"p-inputtext-lg p-inputfield-lg":n.size===`large`,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-inputtext-fluid":t.$fluid}]}}}),provide:function(){return{$pcInputText:this,$parentInstance:this}}};function yd(e){"@babel/helpers - typeof";return yd=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},yd(e)}function bd(e,t,n){return(t=xd(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xd(e){var t=Sd(e,`string`);return yd(t)==`symbol`?t:t+``}function Sd(e,t){if(yd(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(yd(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Cd={name:`InputText`,extends:vd,inheritAttrs:!1,methods:{onInput:function(e){this.writeValue(e.target.value,e)}},computed:{attrs:function(){return w(this.ptmi(`root`,{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return L(bd({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))}}},wd=[`value`,`name`,`disabled`,`aria-invalid`,`data-p`];function Td(e,t,n,r,i,a){return C(),I(`input`,w({type:`text`,class:e.cx(`root`),value:e.d_value,name:e.name,disabled:e.disabled,"aria-invalid":e.$invalid||void 0,"data-p":a.dataP,onInput:t[0]||=function(){return a.onInput&&a.onInput.apply(a,arguments)}},a.attrs),null,16,wd)}Cd.render=Td;var Ed=D.extend({name:`virtualscroller`,css:`
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}

.p-virtualscroller .p-virtualscroller-loading {
    transform: none !important;
    min-height: 0;
    position: sticky;
    inset-block-start: 0;
    inset-inline-start: 0;
}
`,style:`
    .p-virtualscroller-loader {
        background: dt('virtualscroller.loader.mask.background');
        color: dt('virtualscroller.loader.mask.color');
    }

    .p-virtualscroller-loading-icon {
        font-size: dt('virtualscroller.loader.icon.size');
        width: dt('virtualscroller.loader.icon.size');
        height: dt('virtualscroller.loader.icon.size');
    }
`}),Dd={name:`BaseVirtualScroller`,extends:z,props:{id:{type:String,default:null},style:null,class:null,items:{type:Array,default:null},itemSize:{type:[Number,Array],default:0},scrollHeight:null,scrollWidth:null,orientation:{type:String,default:`vertical`},numToleratedItems:{type:Number,default:null},delay:{type:Number,default:0},resizeDelay:{type:Number,default:10},lazy:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loaderDisabled:{type:Boolean,default:!1},columns:{type:Array,default:null},loading:{type:Boolean,default:!1},showSpacer:{type:Boolean,default:!0},showLoader:{type:Boolean,default:!1},tabindex:{type:Number,default:0},inline:{type:Boolean,default:!1},step:{type:Number,default:0},appendOnly:{type:Boolean,default:!1},autoSize:{type:Boolean,default:!1}},style:Ed,provide:function(){return{$pcVirtualScroller:this,$parentInstance:this}},beforeMount:function(){var e;Ed.loadCSS({nonce:(e=this.$primevueConfig)==null||(e=e.csp)==null?void 0:e.nonce})}};function Od(e){"@babel/helpers - typeof";return Od=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Od(e)}function kd(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Ad(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?kd(Object(n),!0).forEach(function(t){jd(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):kd(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function jd(e,t,n){return(t=Md(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Md(e){var t=Nd(e,`string`);return Od(t)==`symbol`?t:t+``}function Nd(e,t){if(Od(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Od(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Pd={name:`VirtualScroller`,extends:Dd,inheritAttrs:!1,emits:[`update:numToleratedItems`,`scroll`,`scroll-index-change`,`lazy-load`],data:function(){var e=this.isBoth();return{first:e?{rows:0,cols:0}:0,last:e?{rows:0,cols:0}:0,page:e?{rows:0,cols:0}:0,numItemsInViewport:e?{rows:0,cols:0}:0,lastScrollPos:e?{top:0,left:0}:0,d_numToleratedItems:this.numToleratedItems,d_loading:this.loading,loaderArr:[],spacerStyle:{},contentStyle:{}}},element:null,content:null,lastScrollPos:null,scrollTimeout:null,resizeTimeout:null,defaultWidth:0,defaultHeight:0,defaultContentWidth:0,defaultContentHeight:0,isRangeChanged:!1,lazyLoadState:{},resizeListener:null,resizeObserver:null,initialized:!1,watch:{numToleratedItems:function(e){this.d_numToleratedItems=e},loading:function(e,t){this.lazy&&e!==t&&e!==this.d_loading&&(this.d_loading=e)},items:{handler:function(e,t){(!t||t.length!==(e||[]).length)&&(this.init(),this.calculateAutoSize())},deep:!0},itemSize:function(){this.init(),this.calculateAutoSize()},orientation:function(){this.lastScrollPos=this.isBoth()?{top:0,left:0}:0},scrollHeight:function(){this.init(),this.calculateAutoSize()},scrollWidth:function(){this.init(),this.calculateAutoSize()}},mounted:function(){this.viewInit(),this.lastScrollPos=this.isBoth()?{top:0,left:0}:0,this.lazyLoadState=this.lazyLoadState||{}},updated:function(){!this.initialized&&this.viewInit()},unmounted:function(){this.unbindResizeListener(),this.initialized=!1},methods:{viewInit:function(){de(this.element)&&(this.setContentEl(this.content),this.init(),this.calculateAutoSize(),this.defaultWidth=l(this.element),this.defaultHeight=ae(this.element),this.defaultContentWidth=l(this.content),this.defaultContentHeight=ae(this.content),this.initialized=!0),this.element&&this.bindResizeListener()},init:function(){this.disabled||(this.setSize(),this.calculateOptions(),this.setSpacerSize())},isVertical:function(){return this.orientation===`vertical`},isHorizontal:function(){return this.orientation===`horizontal`},isBoth:function(){return this.orientation===`both`},scrollTo:function(e){this.element&&this.element.scrollTo(e)},scrollToIndex:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:`auto`,r=this.isBoth(),i=this.isHorizontal();if(r?e.every(function(e){return e>-1}):e>-1){var a=this.first,o=this.element,s=o.scrollTop,c=s===void 0?0:s,l=o.scrollLeft,u=l===void 0?0:l,d=this.calculateNumItems().numToleratedItems,f=this.getContentPosition(),p=this.itemSize,m=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return e<=(arguments.length>1?arguments[1]:void 0)?0:e},h=function(e,t,n){return e*t+n},g=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return t.scrollTo({left:e,top:r,behavior:n})},_=r?{rows:0,cols:0}:0,v=!1,y=!1;r?(_={rows:m(e[0],d[0]),cols:m(e[1],d[1])},g(h(_.cols,p[1],f.left),h(_.rows,p[0],f.top)),y=this.lastScrollPos.top!==c||this.lastScrollPos.left!==u,v=_.rows!==a.rows||_.cols!==a.cols):(_=m(e,d),i?g(h(_,p,f.left),c):g(u,h(_,p,f.top)),y=this.lastScrollPos!==(i?u:c),v=_!==a),this.isRangeChanged=v,y&&(this.first=_)}},scrollInView:function(e,t){var n=this,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:`auto`;if(t){var i=this.isBoth(),a=this.isHorizontal();if(i?e.every(function(e){return e>-1}):e>-1){var o=this.getRenderedRange(),s=o.first,c=o.viewport,l=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return n.scrollTo({left:e,top:t,behavior:r})},u=t===`to-start`,d=t===`to-end`;if(u){if(i)c.first.rows-s.rows>e[0]?l(c.first.cols*this.itemSize[1],(c.first.rows-1)*this.itemSize[0]):c.first.cols-s.cols>e[1]&&l((c.first.cols-1)*this.itemSize[1],c.first.rows*this.itemSize[0]);else if(c.first-s>e){var f=(c.first-1)*this.itemSize;a?l(f,0):l(0,f)}}else if(d){if(i)c.last.rows-s.rows<=e[0]+1?l(c.first.cols*this.itemSize[1],(c.first.rows+1)*this.itemSize[0]):c.last.cols-s.cols<=e[1]+1&&l((c.first.cols+1)*this.itemSize[1],c.first.rows*this.itemSize[0]);else if(c.last-s<=e+1){var p=(c.first+1)*this.itemSize;a?l(p,0):l(0,p)}}}}else this.scrollToIndex(e,r)},getRenderedRange:function(){var e=function(e,t){return Math.floor(e/(t||e))},t=this.first,n=0;if(this.element){var r=this.isBoth(),i=this.isHorizontal(),a=this.element,o=a.scrollTop,s=a.scrollLeft;r?(t={rows:e(o,this.itemSize[0]),cols:e(s,this.itemSize[1])},n={rows:t.rows+this.numItemsInViewport.rows,cols:t.cols+this.numItemsInViewport.cols}):(t=e(i?s:o,this.itemSize),n=t+this.numItemsInViewport)}return{first:this.first,last:this.last,viewport:{first:t,last:n}}},calculateNumItems:function(){var e=this.isBoth(),t=this.isHorizontal(),n=this.itemSize,r=this.getContentPosition(),i=this.element?this.element.offsetWidth-r.left:0,a=this.element?this.element.offsetHeight-r.top:0,o=function(e,t){return Math.ceil(e/(t||e))},s=function(e){return Math.ceil(e/2)},c=e?{rows:o(a,n[0]),cols:o(i,n[1])}:o(t?i:a,n);return{numItemsInViewport:c,numToleratedItems:this.d_numToleratedItems||(e?[s(c.rows),s(c.cols)]:s(c))}},calculateOptions:function(){var e=this,t=this.isBoth(),n=this.first,r=this.calculateNumItems(),i=r.numItemsInViewport,a=r.numToleratedItems,o=function(t,n,r){var i=arguments.length>3&&arguments[3]!==void 0&&arguments[3];return e.getLast(t+n+(t<r?2:3)*r,i)},s=t?{rows:o(n.rows,i.rows,a[0]),cols:o(n.cols,i.cols,a[1],!0)}:o(n,i,a);this.last=s,this.numItemsInViewport=i,this.d_numToleratedItems=a,this.$emit(`update:numToleratedItems`,this.d_numToleratedItems),this.showLoader&&(this.loaderArr=t?Array.from({length:i.rows}).map(function(){return Array.from({length:i.cols})}):Array.from({length:i})),this.lazy&&Promise.resolve().then(function(){e.lazyLoadState={first:e.step?t?{rows:0,cols:n.cols}:0:n,last:Math.min(e.step?e.step:s,e.items?.length||0)},e.$emit(`lazy-load`,e.lazyLoadState)})},calculateAutoSize:function(){var e=this;this.autoSize&&!this.d_loading&&Promise.resolve().then(function(){if(e.content){var t=e.isBoth(),n=e.isHorizontal(),r=e.isVertical();e.content.style.minHeight=e.content.style.minWidth=`auto`,e.content.style.position=`relative`,e.element.style.contain=`none`;var i=[l(e.element),ae(e.element)],a=i[0],o=i[1];(t||n)&&(e.element.style.width=a<e.defaultWidth?a+`px`:e.scrollWidth||e.defaultWidth+`px`),(t||r)&&(e.element.style.height=o<e.defaultHeight?o+`px`:e.scrollHeight||e.defaultHeight+`px`),e.content.style.minHeight=e.content.style.minWidth=``,e.content.style.position=``,e.element.style.contain=``}})},getLast:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return this.items?Math.min(t?(this.columns||this.items[0])?.length||0:this.items?.length||0,e):0},getContentPosition:function(){if(this.content){var e=getComputedStyle(this.content),t=parseFloat(e.paddingLeft)+Math.max(parseFloat(e.left)||0,0),n=parseFloat(e.paddingRight)+Math.max(parseFloat(e.right)||0,0),r=parseFloat(e.paddingTop)+Math.max(parseFloat(e.top)||0,0),i=parseFloat(e.paddingBottom)+Math.max(parseFloat(e.bottom)||0,0);return{left:t,right:n,top:r,bottom:i,x:t+n,y:r+i}}return{left:0,right:0,top:0,bottom:0,x:0,y:0}},setSize:function(){var e=this;if(this.element){var t=this.isBoth(),n=this.isHorizontal(),r=this.element.parentElement,i=this.scrollWidth||`${this.element.offsetWidth||r.offsetWidth}px`,a=this.scrollHeight||`${this.element.offsetHeight||r.offsetHeight}px`,o=function(t,n){return e.element.style[t]=n};t||n?(o(`height`,a),o(`width`,i)):o(`height`,a)}},setSpacerSize:function(){var e=this,t=this.items;if(t){var n=this.isBoth(),r=this.isHorizontal(),i=this.getContentPosition(),a=function(t,n,r){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return e.spacerStyle=Ad(Ad({},e.spacerStyle),jd({},`${t}`,(n||[]).length*r+i+`px`))};n?(a(`height`,t,this.itemSize[0],i.y),a(`width`,this.columns||t[1],this.itemSize[1],i.x)):r?a(`width`,this.columns||t,this.itemSize,i.x):a(`height`,t,this.itemSize,i.y)}},setContentPosition:function(e){var t=this;if(this.content&&!this.appendOnly){var n=this.isBoth(),r=this.isHorizontal(),i=e?e.first:this.first,a=function(e,t){return e*t},o=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return t.contentStyle=Ad(Ad({},t.contentStyle),{transform:`translate3d(${e}px, ${n}px, 0)`})};if(n)o(a(i.cols,this.itemSize[1]),a(i.rows,this.itemSize[0]));else{var s=a(i,this.itemSize);r?o(s,0):o(0,s)}}},onScrollPositionChange:function(e){var t=this,n=e.target,r=this.isBoth(),i=this.isHorizontal(),a=this.getContentPosition(),o=function(e,t){return e?e>t?e-t:e:0},s=function(e,t){return Math.floor(e/(t||e))},c=function(e,t,n,r,i,a){return e<=i?i:a?n-r-i:t+i-1},l=function(e,n,r,i,a,o,s,c){if(e<=o)return 0;var l=Math.max(0,s?e<n?r:e-o:e>n?r:e-2*o),u=t.getLast(l,c);return l>u?u-a:l},u=function(e,n,r,i,a,o){var s=n+i+2*a;return e>=a&&(s+=a+1),t.getLast(s,o)},d=o(n.scrollTop,a.top),f=o(n.scrollLeft,a.left),p=r?{rows:0,cols:0}:0,m=this.last,h=!1,g=this.lastScrollPos;if(r){var _=this.lastScrollPos.top<=d,v=this.lastScrollPos.left<=f;if(!this.appendOnly||this.appendOnly&&(_||v)){var y={rows:s(d,this.itemSize[0]),cols:s(f,this.itemSize[1])},b={rows:c(y.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],_),cols:c(y.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],v)};p={rows:l(y.rows,b.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],_),cols:l(y.cols,b.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],v,!0)},m={rows:u(y.rows,p.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0]),cols:u(y.cols,p.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],!0)},h=p.rows!==this.first.rows||m.rows!==this.last.rows||p.cols!==this.first.cols||m.cols!==this.last.cols||this.isRangeChanged,g={top:d,left:f}}}else{var x=i?f:d,S=this.lastScrollPos<=x;if(!this.appendOnly||this.appendOnly&&S){var ee=s(x,this.itemSize);p=l(ee,c(ee,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,S),this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,S),m=u(ee,p,this.last,this.numItemsInViewport,this.d_numToleratedItems),h=p!==this.first||m!==this.last||this.isRangeChanged,g=x}}return{first:p,last:m,isRangeChanged:h,scrollPos:g}},onScrollChange:function(e){var t=this.onScrollPositionChange(e),n=t.first,r=t.last,i=t.isRangeChanged,a=t.scrollPos;if(i){var o={first:n,last:r};if(this.setContentPosition(o),this.first=n,this.last=r,this.lastScrollPos=a,this.$emit(`scroll-index-change`,o),this.lazy&&this.isPageChanged(n)){var s={first:this.step?Math.min(this.getPageByFirst(n)*this.step,(this.items?.length||0)-this.step):n,last:Math.min(this.step?(this.getPageByFirst(n)+1)*this.step:r,this.items?.length||0)};(this.lazyLoadState.first!==s.first||this.lazyLoadState.last!==s.last)&&this.$emit(`lazy-load`,s),this.lazyLoadState=s}}},onScroll:function(e){var t=this;this.$emit(`scroll`,e),this.delay?(this.scrollTimeout&&clearTimeout(this.scrollTimeout),this.isPageChanged()&&(!this.d_loading&&this.showLoader&&(this.onScrollPositionChange(e).isRangeChanged||this.step&&this.isPageChanged())&&(this.d_loading=!0),this.scrollTimeout=setTimeout(function(){t.onScrollChange(e),t.d_loading&&t.showLoader&&(!t.lazy||t.loading===void 0)&&(t.d_loading=!1,t.page=t.getPageByFirst())},this.delay))):this.onScrollChange(e)},onResize:function(){var e=this;this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){if(de(e.element)){var t=e.isBoth(),n=e.isVertical(),r=e.isHorizontal(),i=[l(e.element),ae(e.element)],a=i[0],o=i[1],s=a!==e.defaultWidth,c=o!==e.defaultHeight;(t?s||c:r?s:n&&c)&&(e.d_numToleratedItems=e.numToleratedItems,e.defaultWidth=a,e.defaultHeight=o,e.defaultContentWidth=l(e.content),e.defaultContentHeight=ae(e.content),e.init())}},this.resizeDelay)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=this.onResize.bind(this),window.addEventListener(`resize`,this.resizeListener),window.addEventListener(`orientationchange`,this.resizeListener),this.resizeObserver=new ResizeObserver(function(){e.onResize()}),this.resizeObserver.observe(this.element))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),window.removeEventListener(`orientationchange`,this.resizeListener),null),this.resizeObserver&&=(this.resizeObserver.disconnect(),null)},getOptions:function(e){var t=(this.items||[]).length,n=this.isBoth()?this.first.rows+e:this.first+e;return{index:n,count:t,first:n===0,last:n===t-1,even:n%2==0,odd:n%2!=0}},getLoaderOptions:function(e,t){var n=this.loaderArr.length;return Ad({index:e,count:n,first:e===0,last:e===n-1,even:e%2==0,odd:e%2!=0},t)},getPageByFirst:function(e){return Math.floor(((e??this.first)+this.d_numToleratedItems*4)/(this.step||1))},isPageChanged:function(e){return this.step&&!this.lazy?this.page!==this.getPageByFirst(e??this.first):!0},setContentEl:function(e){this.content=e||this.content||m(this.element,`[data-pc-section="content"]`)},elementRef:function(e){this.element=e},contentRef:function(e){this.content=e}},computed:{containerClass:function(){return[`p-virtualscroller`,this.class,{"p-virtualscroller-inline":this.inline,"p-virtualscroller-both p-both-scroll":this.isBoth(),"p-virtualscroller-horizontal p-horizontal-scroll":this.isHorizontal()}]},contentClass:function(){return[`p-virtualscroller-content`,{"p-virtualscroller-loading":this.d_loading}]},loaderClass:function(){return[`p-virtualscroller-loader`,{"p-virtualscroller-loader-mask":!this.$slots.loader}]},loadedItems:function(){var e=this;return this.items&&!this.d_loading?this.isBoth()?this.items.slice(this.appendOnly?0:this.first.rows,this.last.rows).map(function(t){return e.columns?t:t.slice(e.appendOnly?0:e.first.cols,e.last.cols)}):this.isHorizontal()&&this.columns?this.items:this.items.slice(this.appendOnly?0:this.first,this.last):[]},loadedRows:function(){return this.d_loading?this.loaderDisabled?this.loaderArr:[]:this.loadedItems},loadedColumns:function(){if(this.columns){var e=this.isBoth(),t=this.isHorizontal();if(e||t)return this.d_loading&&this.loaderDisabled?e?this.loaderArr[0]:this.loaderArr:this.columns.slice(e?this.first.cols:this.first,e?this.last.cols:this.last)}return this.columns}},components:{SpinnerIcon:At}},Fd=[`tabindex`];function Id(e,t,r,i,a,o){var s=A(`SpinnerIcon`);return e.disabled?(C(),I(N,{key:1},[n(e.$slots,`default`),n(e.$slots,`content`,{items:e.items,rows:e.items,columns:o.loadedColumns})],64)):(C(),I(`div`,w({key:0,ref:o.elementRef,class:o.containerClass,tabindex:e.tabindex,style:e.style,onScroll:t[0]||=function(){return o.onScroll&&o.onScroll.apply(o,arguments)}},e.ptmi(`root`)),[n(e.$slots,`content`,{styleClass:o.contentClass,items:o.loadedItems,getItemOptions:o.getOptions,loading:a.d_loading,getLoaderOptions:o.getLoaderOptions,itemSize:e.itemSize,rows:o.loadedRows,columns:o.loadedColumns,contentRef:o.contentRef,spacerStyle:a.spacerStyle,contentStyle:a.contentStyle,vertical:o.isVertical(),horizontal:o.isHorizontal(),both:o.isBoth()},function(){return[O(`div`,w({ref:o.contentRef,class:o.contentClass,style:a.contentStyle},e.ptm(`content`)),[(C(!0),I(N,null,j(o.loadedItems,function(t,r){return n(e.$slots,`item`,{key:r,item:t,options:o.getOptions(r)})}),128))],16)]}),e.showSpacer?(C(),I(`div`,w({key:0,class:`p-virtualscroller-spacer`,style:a.spacerStyle},e.ptm(`spacer`)),null,16)):F(``,!0),!e.loaderDisabled&&e.showLoader&&a.d_loading?(C(),I(`div`,w({key:1,class:o.loaderClass},e.ptm(`loader`)),[e.$slots&&e.$slots.loader?(C(!0),I(N,{key:0},j(a.loaderArr,function(t,r){return n(e.$slots,`loader`,{key:r,options:o.getLoaderOptions(r,o.isBoth()&&{numCols:e.d_numItemsInViewport.cols})})}),128)):F(``,!0),n(e.$slots,`loadingicon`,{},function(){return[fe(s,w({spin:``,class:`p-virtualscroller-loading-icon`},e.ptm(`loadingIcon`)),null,16)]})],16)):F(``,!0)],16,Fd))}Pd.render=Id;var Ld=D.extend({name:`select`,style:`
    .p-select {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('select.background');
        border: 1px solid dt('select.border.color');
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            outline-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration');
        border-radius: dt('select.border.radius');
        outline-color: transparent;
        box-shadow: dt('select.shadow');
    }

    .p-select:not(.p-disabled):hover {
        border-color: dt('select.hover.border.color');
    }

    .p-select:not(.p-disabled).p-focus {
        border-color: dt('select.focus.border.color');
        box-shadow: dt('select.focus.ring.shadow');
        outline: dt('select.focus.ring.width') dt('select.focus.ring.style') dt('select.focus.ring.color');
        outline-offset: dt('select.focus.ring.offset');
    }

    .p-select.p-variant-filled {
        background: dt('select.filled.background');
    }

    .p-select.p-variant-filled:not(.p-disabled):hover {
        background: dt('select.filled.hover.background');
    }

    .p-select.p-variant-filled:not(.p-disabled).p-focus {
        background: dt('select.filled.focus.background');
    }

    .p-select.p-invalid {
        border-color: dt('select.invalid.border.color');
    }

    .p-select.p-disabled {
        opacity: 1;
        background: dt('select.disabled.background');
    }

    .p-select-clear-icon {
        align-self: center;
        color: dt('select.clear.icon.color');
        inset-inline-end: dt('select.dropdown.width');
    }

    .p-select-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('select.dropdown.color');
        width: dt('select.dropdown.width');
        border-start-end-radius: dt('select.border.radius');
        border-end-end-radius: dt('select.border.radius');
    }

    .p-select-label {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        flex: 1 1 auto;
        width: 1%;
        padding: dt('select.padding.y') dt('select.padding.x');
        text-overflow: ellipsis;
        cursor: pointer;
        color: dt('select.color');
        background: transparent;
        border: 0 none;
        outline: 0 none;
        font-size: 1rem;
    }

    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.p-invalid .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }

    .p-select.p-disabled .p-select-label {
        color: dt('select.disabled.color');
    }

    .p-select-label-empty {
        overflow: hidden;
        opacity: 0;
    }

    input.p-select-label {
        cursor: default;
    }

    .p-select-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('select.overlay.background');
        color: dt('select.overlay.color');
        border: 1px solid dt('select.overlay.border.color');
        border-radius: dt('select.overlay.border.radius');
        box-shadow: dt('select.overlay.shadow');
        min-width: 100%;
        transform-origin: inherit;
        will-change: transform;
    }

    .p-select-header {
        padding: dt('select.list.header.padding');
    }

    .p-select-filter {
        width: 100%;
    }

    .p-select-list-container {
        overflow: auto;
    }

    .p-select-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('select.option.group.padding');
        background: dt('select.option.group.background');
        color: dt('select.option.group.color');
        font-weight: dt('select.option.group.font.weight');
    }

    .p-select-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('select.list.padding');
        gap: dt('select.list.gap');
        display: flex;
        flex-direction: column;
    }

    .p-select-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('select.option.padding');
        border: 0 none;
        color: dt('select.option.color');
        background: transparent;
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration'),
            outline-color dt('select.transition.duration');
        border-radius: dt('select.option.border.radius');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled):hover {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option.p-select-option-selected {
        background: dt('select.option.selected.background');
        color: dt('select.option.selected.color');
    }

    .p-select-option.p-select-option-selected.p-focus {
        background: dt('select.option.selected.focus.background');
        color: dt('select.option.selected.focus.color');
    }
   
    .p-select-option-blank-icon {
        flex-shrink: 0;
    }

    .p-select-option-check-icon {
        position: relative;
        flex-shrink: 0;
        margin-inline-start: dt('select.checkmark.gutter.start');
        margin-inline-end: dt('select.checkmark.gutter.end');
        color: dt('select.checkmark.color');
    }

    .p-select-empty-message {
        padding: dt('select.empty.message.padding');
    }

    .p-select-fluid {
        display: flex;
        width: 100%;
    }

    .p-select-sm .p-select-label {
        font-size: dt('select.sm.font.size');
        padding-block: dt('select.sm.padding.y');
        padding-inline: dt('select.sm.padding.x');
    }

    .p-select-sm .p-select-dropdown .p-icon {
        font-size: dt('select.sm.font.size');
        width: dt('select.sm.font.size');
        height: dt('select.sm.font.size');
    }

    .p-select-lg .p-select-label {
        font-size: dt('select.lg.font.size');
        padding-block: dt('select.lg.padding.y');
        padding-inline: dt('select.lg.padding.x');
    }

    .p-select-lg .p-select-dropdown .p-icon {
        font-size: dt('select.lg.font.size');
        width: dt('select.lg.font.size');
        height: dt('select.lg.font.size');
    }

    .p-floatlabel-in .p-select-filter {
        padding-block-start: dt('select.padding.y');
        padding-block-end: dt('select.padding.y');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props,r=e.state;return[`p-select p-component p-inputwrapper`,{"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-focus":r.focused,"p-inputwrapper-filled":t.$filled,"p-inputwrapper-focus":r.focused||r.overlayVisible,"p-select-open":r.overlayVisible,"p-select-fluid":t.$fluid,"p-select-sm p-inputfield-sm":n.size===`small`,"p-select-lg p-inputfield-lg":n.size===`large`}]},label:function(e){var t=e.instance,n=e.props;return[`p-select-label`,{"p-placeholder":!n.editable&&t.label===n.placeholder,"p-select-label-empty":!n.editable&&!t.$slots.value&&(t.label===`p-emptylabel`||t.label?.length===0)}]},clearIcon:`p-select-clear-icon`,dropdown:`p-select-dropdown`,loadingicon:`p-select-loading-icon`,dropdownIcon:`p-select-dropdown-icon`,overlay:`p-select-overlay p-component`,header:`p-select-header`,pcFilter:`p-select-filter`,listContainer:`p-select-list-container`,list:`p-select-list`,optionGroup:`p-select-option-group`,optionGroupLabel:`p-select-option-group-label`,option:function(e){var t=e.instance,n=e.props,r=e.state,i=e.option,a=e.focusedOption;return[`p-select-option`,{"p-select-option-selected":t.isSelected(i)&&n.highlightOnSelect,"p-focus":r.focusedOptionIndex===a,"p-disabled":t.isOptionDisabled(i)}]},optionLabel:`p-select-option-label`,optionCheckIcon:`p-select-option-check-icon`,optionBlankIcon:`p-select-option-blank-icon`,emptyMessage:`p-select-empty-message`}}),Rd={name:`BaseSelect`,extends:_d,props:{options:Array,optionLabel:[String,Function],optionValue:[String,Function],optionDisabled:[String,Function],optionGroupLabel:[String,Function],optionGroupChildren:[String,Function],scrollHeight:{type:String,default:`14rem`},filter:Boolean,filterPlaceholder:String,filterLocale:String,filterMatchMode:{type:String,default:`contains`},filterFields:{type:Array,default:null},editable:Boolean,placeholder:{type:String,default:null},dataKey:null,showClear:{type:Boolean,default:!1},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},labelId:{type:String,default:null},labelClass:{type:[String,Object],default:null},labelStyle:{type:Object,default:null},panelClass:{type:[String,Object],default:null},overlayStyle:{type:Object,default:null},overlayClass:{type:[String,Object],default:null},panelStyle:{type:Object,default:null},appendTo:{type:[String,Object],default:`body`},loading:{type:Boolean,default:!1},clearIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},filterIcon:{type:String,default:void 0},loadingIcon:{type:String,default:void 0},resetFilterOnHide:{type:Boolean,default:!1},resetFilterOnClear:{type:Boolean,default:!1},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!1},autoFilterFocus:{type:Boolean,default:!1},selectOnFocus:{type:Boolean,default:!1},focusOnHover:{type:Boolean,default:!0},highlightOnSelect:{type:Boolean,default:!0},checkmark:{type:Boolean,default:!1},filterMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptyFilterMessage:{type:String,default:null},emptyMessage:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:Ld,provide:function(){return{$pcSelect:this,$parentInstance:this}}};function zd(e){"@babel/helpers - typeof";return zd=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},zd(e)}function Bd(e){return Wd(e)||Ud(e)||Hd(e)||Vd()}function Vd(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Hd(e,t){if(e){if(typeof e==`string`)return Gd(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Gd(e,t):void 0}}function Ud(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Wd(e){if(Array.isArray(e))return Gd(e)}function Gd(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Kd(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function qd(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Kd(Object(n),!0).forEach(function(t){Jd(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Kd(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Jd(e,t,n){return(t=Yd(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Yd(e){var t=Xd(e,`string`);return zd(t)==`symbol`?t:t+``}function Xd(e,t){if(zd(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(zd(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Zd={name:`Select`,extends:Rd,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`before-show`,`before-hide`,`show`,`hide`,`filter`],outsideClickListener:null,scrollHandler:null,resizeListener:null,labelClickListener:null,matchMediaOrientationListener:null,overlay:null,list:null,virtualScroller:null,searchTimeout:null,searchValue:null,isModelValueChanged:!1,data:function(){return{clicked:!1,focused:!1,focusedOptionIndex:-1,filterValue:null,overlayVisible:!1,queryOrientation:null}},watch:{modelValue:function(){this.isModelValueChanged=!0},options:function(){this.autoUpdateModel()}},mounted:function(){this.autoUpdateModel(),this.bindLabelClickListener(),this.bindMatchMediaOrientationListener()},updated:function(){this.overlayVisible&&this.isModelValueChanged&&this.scrollInView(this.findSelectedOptionIndex()),this.isModelValueChanged=!1},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindLabelClickListener(),this.unbindMatchMediaOrientationListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.overlay&&=(Je.clear(this.overlay),null)},methods:{getOptionIndex:function(e,t){return this.virtualScrollerDisabled?e:t&&t(e).index},getOptionLabel:function(e){return this.optionLabel?Le(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?Le(e,this.optionValue):e},getOptionRenderKey:function(e,t){return(this.dataKey?Le(e,this.dataKey):this.getOptionLabel(e))+`_`+t},getPTItemOptions:function(e,t,n,r){return this.ptm(r,{context:{option:e,index:n,selected:this.isSelected(e),focused:this.focusedOptionIndex===this.getOptionIndex(n,t),disabled:this.isOptionDisabled(e)}})},isOptionDisabled:function(e){return this.optionDisabled?Le(e,this.optionDisabled):!1},isOptionGroup:function(e){return this.optionGroupLabel&&e.optionGroup&&e.group},getOptionGroupLabel:function(e){return Le(e,this.optionGroupLabel)},getOptionGroupChildren:function(e){return Le(e,this.optionGroupChildren)},getAriaPosInset:function(e){var t=this;return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter(function(e){return t.isOptionGroup(e)}).length:e)+1},show:function(e){this.$emit(`before-show`),this.overlayVisible=!0,this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.editable?-1:this.findSelectedOptionIndex():this.focusedOptionIndex,e&&d(this.$refs.focusInput)},hide:function(e){var t=this,n=function(){t.$emit(`before-hide`),t.overlayVisible=!1,t.clicked=!1,t.focusedOptionIndex=-1,t.searchValue=``,t.resetFilterOnHide&&(t.filterValue=null),e&&d(t.$refs.focusInput)};setTimeout(function(){n()},0)},onFocus:function(e){this.disabled||(this.focused=!0,this.overlayVisible&&(this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.editable?-1:this.findSelectedOptionIndex():this.focusedOptionIndex,this.scrollInView(this.focusedOptionIndex)),this.$emit(`focus`,e))},onBlur:function(e){var t=this;setTimeout(function(){var n,r;t.focused=!1,t.focusedOptionIndex=-1,t.searchValue=``,t.$emit(`blur`,e),(n=(r=t.formField).onBlur)==null||n.call(r,e)},100)},onKeyDown:function(e){var t=this;if(this.disabled){e.preventDefault();return}if(Ge())switch(e.code){case`Backspace`:this.onBackspaceKey(e,this.editable);break;case`Enter`:case`NumpadDecimal`:this.onEnterKey(e);break;default:e.preventDefault();return}var n=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e,this.editable);break;case`ArrowLeft`:case`ArrowRight`:this.onArrowLeftKey(e,this.editable);break;case`Home`:this.onHomeKey(e,this.editable);break;case`End`:this.onEndKey(e,this.editable);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Space`:this.onSpaceKey(e,this.editable);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`Backspace`:this.onBackspaceKey(e,this.editable);break;case`ShiftLeft`:case`ShiftRight`:break;default:!n&&Se(e.key)&&(!this.overlayVisible&&this.show(),!this.editable&&this.searchOptions(e,e.key),this.filter&&this.$nextTick(function(){t.$refs.filterInput&&d(t.$refs.filterInput.$el)}))}this.clicked=!1},onEditableInput:function(e){var t=e.target.value;this.searchValue=``,!this.searchOptions(e,t)&&(this.focusedOptionIndex=-1),this.updateModel(e,t),!this.overlayVisible&&M(t)&&this.show()},onContainerClick:function(e){this.disabled||this.loading||e.target.tagName===`INPUT`||e.target.getAttribute(`data-pc-section`)===`clearicon`||e.target.closest(`[data-pc-section="clearicon"]`)||((!this.overlay||!this.overlay.contains(e.target))&&(this.overlayVisible?this.hide(!0):this.show(!0)),this.clicked=!0)},onClearClick:function(e){this.updateModel(e,null),this.resetFilterOnClear&&(this.filterValue=null)},onFirstHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?xe(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;d(t)},onLastHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?pe(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;d(t)},onOptionSelect:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;if(this.overlayVisible){var r=this.getOptionValue(t);this.updateModel(e,r),n&&this.hide(!0)}},onOptionMouseMove:function(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)},onFilterChange:function(e){var t=e.target.value;this.filterValue=t,this.focusedOptionIndex=-1,this.$emit(`filter`,{originalEvent:e,value:t}),!this.virtualScrollerDisabled&&this.virtualScroller.scrollToIndex(0)},onFilterKeyDown:function(e){if(!e.isComposing)switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e,!0);break;case`ArrowLeft`:case`ArrowRight`:this.onArrowLeftKey(e,!0);break;case`Home`:this.onHomeKey(e,!0);break;case`End`:this.onEndKey(e,!0);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e)}},onFilterBlur:function(){this.focusedOptionIndex=-1},onFilterUpdated:function(){this.overlayVisible&&this.alignOverlay()},onOverlayClick:function(e){Vu.emit(`overlay-click`,{originalEvent:e,target:this.$el})},onOverlayKeyDown:function(e){e.code===`Escape`&&this.onEscapeKey(e)},onArrowDownKey:function(e){if(!this.overlayVisible)this.show(),this.editable&&this.changeFocusedOptionIndex(e,this.findSelectedOptionIndex());else{var t=this.focusedOptionIndex===-1?this.clicked?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex():this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e,t)}e.preventDefault()},onArrowUpKey:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];if(e.altKey&&!t)this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{var n=this.focusedOptionIndex===-1?this.clicked?this.findLastOptionIndex():this.findLastFocusedOptionIndex():this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e,n),!this.overlayVisible&&this.show(),e.preventDefault()}},onArrowLeftKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]&&(this.focusedOptionIndex=-1)},onHomeKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;e.shiftKey?t.setSelectionRange(0,e.target.selectionStart):(t.setSelectionRange(0,0),this.focusedOptionIndex=-1)}else this.changeFocusedOptionIndex(e,this.findFirstOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()},onEndKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;if(e.shiftKey)t.setSelectionRange(e.target.selectionStart,t.value.length);else{var n=t.value.length;t.setSelectionRange(n,n),this.focusedOptionIndex=-1}}else this.changeFocusedOptionIndex(e,this.findLastOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()},onPageUpKey:function(e){this.scrollInView(0),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey:function(e){this.overlayVisible?(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.hide(!0)):(this.focusedOptionIndex=-1,this.onArrowDownKey(e)),e.preventDefault()},onSpaceKey:function(e){!(arguments.length>1&&arguments[1]!==void 0&&arguments[1])&&this.onEnterKey(e)},onEscapeKey:function(e){this.overlayVisible&&this.hide(!0),e.preventDefault(),e.stopPropagation()},onTabKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]||(this.overlayVisible&&this.hasFocusableElements()?(d(this.$refs.firstHiddenFocusableElementOnOverlay),e.preventDefault()):(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(this.filter)))},onBackspaceKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]&&!this.overlayVisible&&this.show()},onOverlayEnter:function(e){var t=this;Je.set(`overlay`,e,this.$primevue.config.zIndex.overlay),s(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.scrollInView(),this.$attrSelector&&e.setAttribute(this.$attrSelector,``),setTimeout(function(){t.autoFilterFocus&&t.filter&&d(t.$refs.filterInput.$el),t.autoUpdateModel()},1)},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit(`show`)},onOverlayLeave:function(e){var t=this;e.style.pointerEvents=`none`,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.autoFilterFocus&&this.filter&&!this.editable&&this.$nextTick(function(){t.$refs.filterInput&&d(t.$refs.filterInput.$el)}),this.$emit(`hide`),this.overlay=null},onOverlayAfterLeave:function(e){Je.clear(e)},alignOverlay:function(){this.appendTo===`self`?nt(this.overlay,this.$el):this.overlay&&(this.overlay.style.minWidth=_e(this.$el)+`px`,Pe(this.overlay,this.$el))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=t.composedPath();e.overlayVisible&&e.overlay&&!n.includes(e.$el)&&!n.includes(e.overlay)&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new Oe(this.$refs.container,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!re()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindLabelClickListener:function(){var e=this;if(!this.editable&&!this.labelClickListener){var t=document.querySelector(`label[for="${this.labelId}"]`);t&&de(t)&&(this.labelClickListener=function(){d(e.$refs.focusInput)},t.addEventListener(`click`,this.labelClickListener))}},unbindLabelClickListener:function(){if(this.labelClickListener){var e=document.querySelector(`label[for="${this.labelId}"]`);e&&de(e)&&e.removeEventListener(`click`,this.labelClickListener)}},bindMatchMediaOrientationListener:function(){var e=this;if(!this.matchMediaOrientationListener){var t=matchMedia(`(orientation: portrait)`);this.queryOrientation=t,this.matchMediaOrientationListener=function(){e.alignOverlay()},this.queryOrientation.addEventListener(`change`,this.matchMediaOrientationListener)}},unbindMatchMediaOrientationListener:function(){this.matchMediaOrientationListener&&=(this.queryOrientation.removeEventListener(`change`,this.matchMediaOrientationListener),this.queryOrientation=null,null)},hasFocusableElements:function(){return se(this.overlay,`:not([data-p-hidden-focusable="true"])`).length>0},isOptionExactMatched:function(e){return this.isValidOption(e)&&typeof this.getOptionLabel(e)==`string`&&this.getOptionLabel(e)?.toLocaleLowerCase(this.filterLocale)==this.searchValue.toLocaleLowerCase(this.filterLocale)},isOptionStartsWith:function(e){return this.isValidOption(e)&&typeof this.getOptionLabel(e)==`string`&&this.getOptionLabel(e)?.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale))},isValidOption:function(e){return M(e)&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption:function(e){return this.isValidOption(e)&&this.isSelected(e)},isSelected:function(e){return $e(this.d_value,this.getOptionValue(e),this.equalityKey)},findFirstOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidOption(t)})},findLastOptionIndex:function(){var e=this;return Te(this.visibleOptions,function(t){return e.isValidOption(t)})},findNextOptionIndex:function(e){var t=this,n=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidOption(e)}):-1;return n>-1?n+e+1:e},findPrevOptionIndex:function(e){var t=this,n=e>0?Te(this.visibleOptions.slice(0,e),function(e){return t.isValidOption(e)}):-1;return n>-1?n:e},findSelectedOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidSelectedOption(t)})},findFirstFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},searchOptions:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return M(this.searchValue)&&(r=this.visibleOptions.findIndex(function(e){return n.isOptionExactMatched(e)}),r===-1&&(r=this.visibleOptions.findIndex(function(e){return n.isOptionStartsWith(e)})),r!==-1&&(i=!0),r===-1&&this.focusedOptionIndex===-1&&(r=this.findFirstFocusedOptionIndex()),r!==-1&&this.changeFocusedOptionIndex(e,r)),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedOptionIndex:function(e,t){this.focusedOptionIndex!==t&&(this.focusedOptionIndex=t,this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions[t],!1))},scrollInView:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1;this.$nextTick(function(){var n=t===-1?e.focusedOptionId:`${e.$id}_${t}`,r=m(e.list,`li[id="${n}"]`);r?r.scrollIntoView&&r.scrollIntoView({block:`nearest`,inline:`nearest`}):e.virtualScrollerDisabled||e.virtualScroller&&e.virtualScroller.scrollToIndex(t===-1?e.focusedOptionIndex:t)})},autoUpdateModel:function(){this.autoOptionFocus&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex()),this.selectOnFocus&&this.autoOptionFocus&&!this.$filled&&this.onOptionSelect(null,this.visibleOptions[this.focusedOptionIndex],!1)},updateModel:function(e,t){this.writeValue(t,e),this.$emit(`change`,{originalEvent:e,value:t})},flatOptions:function(e){var t=this;return(e||[]).reduce(function(e,n,r){e.push({optionGroup:n,group:!0,index:r});var i=t.getOptionGroupChildren(n);return i&&i.forEach(function(t){return e.push(t)}),e},[])},overlayRef:function(e){this.overlay=e},listRef:function(e,t){this.list=e,t&&t(e)},virtualScrollerRef:function(e){this.virtualScroller=e}},computed:{visibleOptions:function(){var e=this,t=this.optionGroupLabel?this.flatOptions(this.options):this.options||[];if(this.filterValue){var n=Ue.filter(t,this.searchFields,this.filterValue,this.filterMatchMode,this.filterLocale);if(this.optionGroupLabel){var r=this.options||[],i=[];return r.forEach(function(t){var r=e.getOptionGroupChildren(t).filter(function(e){return n.includes(e)});r.length>0&&i.push(qd(qd({},t),{},Jd({},typeof e.optionGroupChildren==`string`?e.optionGroupChildren:`items`,Bd(r))))}),this.flatOptions(i)}return n}return t},hasSelectedOption:function(){return this.$filled},label:function(){var e=this.findSelectedOptionIndex();return e===-1?this.placeholder||`p-emptylabel`:this.getOptionLabel(this.visibleOptions[e])},editableInputValue:function(){var e=this.findSelectedOptionIndex();return e===-1?this.d_value||``:this.getOptionLabel(this.visibleOptions[e])},equalityKey:function(){return this.optionValue?null:this.dataKey},searchFields:function(){return this.filterFields||[this.optionLabel]},filterResultMessageText:function(){return M(this.visibleOptions)?this.filterMessageText.replaceAll(`{0}`,this.visibleOptions.length):this.emptyFilterMessageText},filterMessageText:function(){return this.filterMessage||this.$primevue.config.locale.searchMessage||``},emptyFilterMessageText:function(){return this.emptyFilterMessage||this.$primevue.config.locale.emptySearchMessage||this.$primevue.config.locale.emptyFilterMessage||``},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage||``},selectionMessageText:function(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||``},emptySelectionMessageText:function(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||``},selectedMessageText:function(){return this.$filled?this.selectionMessageText.replaceAll(`{0}`,`1`):this.emptySelectionMessageText},focusedOptionId:function(){return this.focusedOptionIndex===-1?null:`${this.$id}_${this.focusedOptionIndex}`},ariaSetSize:function(){var e=this;return this.visibleOptions.filter(function(t){return!e.isOptionGroup(t)}).length},isClearIconVisible:function(){return this.showClear&&this.d_value!=null&&!this.disabled&&!this.loading},virtualScrollerDisabled:function(){return!this.virtualScrollerOptions},containerDataP:function(){return L(Jd({invalid:this.$invalid,disabled:this.disabled,focus:this.focused,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))},labelDataP:function(){return L(Jd(Jd({placeholder:!this.editable&&this.label===this.placeholder,clearable:this.showClear,disabled:this.disabled,editable:this.editable},this.size,this.size),`empty`,!this.editable&&!this.$slots.value&&(this.label===`p-emptylabel`||this.label.length===0)))},dropdownIconDataP:function(){return L(Jd({},this.size,this.size))},overlayDataP:function(){return L(Jd({},`portal-`+this.appendTo,`portal-`+this.appendTo))}},directives:{ripple:on},components:{InputText:Cd,VirtualScroller:Pd,Portal:On,InputIcon:md,IconField:fd,TimesIcon:bn,ChevronDownIcon:Xu,SpinnerIcon:At,SearchIcon:id,CheckIcon:An,BlankIcon:Hu}},Qd=[`id`,`data-p`],$d=[`name`,`id`,`value`,`placeholder`,`tabindex`,`disabled`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`,`data-p`],ef=[`name`,`id`,`tabindex`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`,`aria-disabled`,`data-p`],tf=[`data-p`],nf=[`id`],rf=[`id`],af=[`id`,`aria-label`,`aria-selected`,`aria-disabled`,`aria-setsize`,`aria-posinset`,`onMousedown`,`onMousemove`,`data-p-selected`,`data-p-focused`,`data-p-disabled`];function of(e,t,r,i,a,o){var s=A(`SpinnerIcon`),c=A(`InputText`),l=A(`SearchIcon`),u=A(`InputIcon`),d=A(`IconField`),f=A(`CheckIcon`),p=A(`BlankIcon`),m=A(`VirtualScroller`),h=A(`Portal`),g=ne(`ripple`);return C(),I(`div`,w({ref:`container`,id:e.$id,class:e.cx(`root`),onClick:t[12]||=function(){return o.onContainerClick&&o.onContainerClick.apply(o,arguments)},"data-p":o.containerDataP},e.ptmi(`root`)),[e.editable?(C(),I(`input`,w({key:0,ref:`focusInput`,name:e.name,id:e.labelId||e.inputId,type:`text`,class:[e.cx(`label`),e.inputClass,e.labelClass],style:[e.inputStyle,e.labelStyle],value:o.editableInputValue,placeholder:e.placeholder,tabindex:e.disabled?-1:e.tabindex,disabled:e.disabled,autocomplete:`off`,role:`combobox`,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-haspopup":`listbox`,"aria-expanded":a.overlayVisible,"aria-controls":a.overlayVisible?e.$id+`_list`:void 0,"aria-activedescendant":a.focused?o.focusedOptionId:void 0,"aria-invalid":e.invalid||void 0,onFocus:t[0]||=function(){return o.onFocus&&o.onFocus.apply(o,arguments)},onBlur:t[1]||=function(){return o.onBlur&&o.onBlur.apply(o,arguments)},onKeydown:t[2]||=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)},onInput:t[3]||=function(){return o.onEditableInput&&o.onEditableInput.apply(o,arguments)},"data-p":o.labelDataP},e.ptm(`label`)),null,16,$d)):(C(),I(`span`,w({key:1,ref:`focusInput`,name:e.name,id:e.labelId||e.inputId,class:[e.cx(`label`),e.inputClass,e.labelClass],style:[e.inputStyle,e.labelStyle],tabindex:e.disabled?-1:e.tabindex,role:`combobox`,"aria-label":e.ariaLabel||(o.label===`p-emptylabel`?void 0:o.label),"aria-labelledby":e.ariaLabelledby,"aria-haspopup":`listbox`,"aria-expanded":a.overlayVisible,"aria-controls":e.$id+`_list`,"aria-activedescendant":a.focused?o.focusedOptionId:void 0,"aria-invalid":e.invalid||void 0,"aria-disabled":e.disabled,onFocus:t[4]||=function(){return o.onFocus&&o.onFocus.apply(o,arguments)},onBlur:t[5]||=function(){return o.onBlur&&o.onBlur.apply(o,arguments)},onKeydown:t[6]||=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)},"data-p":o.labelDataP},e.ptm(`label`)),[n(e.$slots,`value`,{value:e.d_value,placeholder:e.placeholder},function(){return[it(T(o.label===`p-emptylabel`?`\xA0`:o.label??`empty`),1)]})],16,ef)),o.isClearIconVisible?n(e.$slots,`clearicon`,{key:2,class:x(e.cx(`clearIcon`)),clearCallback:o.onClearClick},function(){return[(C(),E(ie(e.clearIcon?`i`:`TimesIcon`),w({ref:`clearIcon`,class:[e.cx(`clearIcon`),e.clearIcon],onClick:o.onClearClick},e.ptm(`clearIcon`),{"data-pc-section":`clearicon`}),null,16,[`class`,`onClick`]))]}):F(``,!0),O(`div`,w({class:e.cx(`dropdown`)},e.ptm(`dropdown`)),[e.loading?n(e.$slots,`loadingicon`,{key:0,class:x(e.cx(`loadingIcon`))},function(){return[e.loadingIcon?(C(),I(`span`,w({key:0,class:[e.cx(`loadingIcon`),`pi-spin`,e.loadingIcon],"aria-hidden":`true`},e.ptm(`loadingIcon`)),null,16)):(C(),E(s,w({key:1,class:e.cx(`loadingIcon`),spin:``,"aria-hidden":`true`},e.ptm(`loadingIcon`)),null,16,[`class`]))]}):n(e.$slots,`dropdownicon`,{key:1,class:x(e.cx(`dropdownIcon`))},function(){return[(C(),E(ie(e.dropdownIcon?`span`:`ChevronDownIcon`),w({class:[e.cx(`dropdownIcon`),e.dropdownIcon],"aria-hidden":`true`,"data-p":o.dropdownIconDataP},e.ptm(`dropdownIcon`)),null,16,[`class`,`data-p`]))]})],16),fe(h,{appendTo:e.appendTo},{default:ue(function(){return[fe(Ae,w({name:`p-anchored-overlay`,onEnter:o.onOverlayEnter,onAfterEnter:o.onOverlayAfterEnter,onLeave:o.onOverlayLeave,onAfterLeave:o.onOverlayAfterLeave},e.ptm(`transition`)),{default:ue(function(){return[a.overlayVisible?(C(),I(`div`,w({key:0,ref:o.overlayRef,class:[e.cx(`overlay`),e.panelClass,e.overlayClass],style:[e.panelStyle,e.overlayStyle],onClick:t[10]||=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)},onKeydown:t[11]||=function(){return o.onOverlayKeyDown&&o.onOverlayKeyDown.apply(o,arguments)},"data-p":o.overlayDataP},e.ptm(`overlay`)),[O(`span`,w({ref:`firstHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:t[7]||=function(){return o.onFirstHiddenFocus&&o.onFirstHiddenFocus.apply(o,arguments)}},e.ptm(`hiddenFirstFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16),n(e.$slots,`header`,{value:e.d_value,options:o.visibleOptions}),e.filter?(C(),I(`div`,w({key:0,class:e.cx(`header`)},e.ptm(`header`)),[fe(d,{unstyled:e.unstyled,pt:e.ptm(`pcFilterContainer`)},{default:ue(function(){return[fe(c,{ref:`filterInput`,type:`text`,value:a.filterValue,onVnodeMounted:o.onFilterUpdated,onVnodeUpdated:o.onFilterUpdated,class:x(e.cx(`pcFilter`)),placeholder:e.filterPlaceholder,variant:e.variant,unstyled:e.unstyled,role:`searchbox`,autocomplete:`off`,"aria-owns":e.$id+`_list`,"aria-activedescendant":o.focusedOptionId,onKeydown:o.onFilterKeyDown,onBlur:o.onFilterBlur,onInput:o.onFilterChange,pt:e.ptm(`pcFilter`),formControl:{novalidate:!0}},null,8,[`value`,`onVnodeMounted`,`onVnodeUpdated`,`class`,`placeholder`,`variant`,`unstyled`,`aria-owns`,`aria-activedescendant`,`onKeydown`,`onBlur`,`onInput`,`pt`]),fe(u,{unstyled:e.unstyled,pt:e.ptm(`pcFilterIconContainer`)},{default:ue(function(){return[n(e.$slots,`filtericon`,{},function(){return[e.filterIcon?(C(),I(`span`,w({key:0,class:e.filterIcon},e.ptm(`filterIcon`)),null,16)):(C(),E(l,Ye(w({key:1},e.ptm(`filterIcon`))),null,16))]})]}),_:3},8,[`unstyled`,`pt`])]}),_:3},8,[`unstyled`,`pt`]),O(`span`,w({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenFilterResult`),{"data-p-hidden-accessible":!0}),T(o.filterResultMessageText),17)],16)):F(``,!0),O(`div`,w({class:e.cx(`listContainer`),style:{"max-height":o.virtualScrollerDisabled?e.scrollHeight:``}},e.ptm(`listContainer`)),[fe(m,w({ref:o.virtualScrollerRef},e.virtualScrollerOptions,{items:o.visibleOptions,style:{height:e.scrollHeight},tabindex:-1,disabled:o.virtualScrollerDisabled,pt:e.ptm(`virtualScroller`)}),ke({content:ue(function(r){var i=r.styleClass,s=r.contentRef,c=r.items,l=r.getItemOptions,u=r.contentStyle,d=r.itemSize;return[O(`ul`,w({ref:function(e){return o.listRef(e,s)},id:e.$id+`_list`,class:[e.cx(`list`),i],style:u,role:`listbox`},e.ptm(`list`)),[(C(!0),I(N,null,j(c,function(r,i){return C(),I(N,{key:o.getOptionRenderKey(r,o.getOptionIndex(i,l))},[o.isOptionGroup(r)?(C(),I(`li`,w({key:0,id:e.$id+`_`+o.getOptionIndex(i,l),style:{height:d?d+`px`:void 0},class:e.cx(`optionGroup`),role:`option`},{ref_for:!0},e.ptm(`optionGroup`)),[n(e.$slots,`optiongroup`,{option:r.optionGroup,index:o.getOptionIndex(i,l)},function(){return[O(`span`,w({class:e.cx(`optionGroupLabel`)},{ref_for:!0},e.ptm(`optionGroupLabel`)),T(o.getOptionGroupLabel(r.optionGroup)),17)]})],16,rf)):st((C(),I(`li`,w({key:1,id:e.$id+`_`+o.getOptionIndex(i,l),class:e.cx(`option`,{option:r,focusedOption:o.getOptionIndex(i,l)}),style:{height:d?d+`px`:void 0},role:`option`,"aria-label":o.getOptionLabel(r),"aria-selected":o.isSelected(r),"aria-disabled":o.isOptionDisabled(r),"aria-setsize":o.ariaSetSize,"aria-posinset":o.getAriaPosInset(o.getOptionIndex(i,l)),onMousedown:function(e){return o.onOptionSelect(e,r)},onMousemove:function(e){return o.onOptionMouseMove(e,o.getOptionIndex(i,l))},onClick:t[8]||=Ne(function(){},[`stop`]),"data-p-selected":!e.checkmark&&o.isSelected(r),"data-p-focused":a.focusedOptionIndex===o.getOptionIndex(i,l),"data-p-disabled":o.isOptionDisabled(r)},{ref_for:!0},o.getPTItemOptions(r,l,i,`option`)),[e.checkmark?(C(),I(N,{key:0},[o.isSelected(r)?(C(),E(f,w({key:0,class:e.cx(`optionCheckIcon`)},{ref_for:!0},e.ptm(`optionCheckIcon`)),null,16,[`class`])):(C(),E(p,w({key:1,class:e.cx(`optionBlankIcon`)},{ref_for:!0},e.ptm(`optionBlankIcon`)),null,16,[`class`]))],64)):F(``,!0),n(e.$slots,`option`,{option:r,selected:o.isSelected(r),index:o.getOptionIndex(i,l)},function(){return[O(`span`,w({class:e.cx(`optionLabel`)},{ref_for:!0},e.ptm(`optionLabel`)),T(o.getOptionLabel(r)),17)]})],16,af)),[[g]])],64)}),128)),a.filterValue&&(!c||c&&c.length===0)?(C(),I(`li`,w({key:0,class:e.cx(`emptyMessage`),role:`option`},e.ptm(`emptyMessage`),{"data-p-hidden-accessible":!0}),[n(e.$slots,`emptyfilter`,{},function(){return[it(T(o.emptyFilterMessageText),1)]})],16)):!e.options||e.options&&e.options.length===0?(C(),I(`li`,w({key:1,class:e.cx(`emptyMessage`),role:`option`},e.ptm(`emptyMessage`),{"data-p-hidden-accessible":!0}),[n(e.$slots,`empty`,{},function(){return[it(T(o.emptyMessageText),1)]})],16)):F(``,!0)],16,nf)]}),_:2},[e.$slots.loader?{name:`loader`,fn:ue(function(t){var r=t.options;return[n(e.$slots,`loader`,{options:r})]}),key:`0`}:void 0]),1040,[`items`,`style`,`disabled`,`pt`])],16),n(e.$slots,`footer`,{value:e.d_value,options:o.visibleOptions}),!e.options||e.options&&e.options.length===0?(C(),I(`span`,w({key:1,role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenEmptyMessage`),{"data-p-hidden-accessible":!0}),T(o.emptyMessageText),17)):F(``,!0),O(`span`,w({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenSelectedMessage`),{"data-p-hidden-accessible":!0}),T(o.selectedMessageText),17),O(`span`,w({ref:`lastHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:t[9]||=function(){return o.onLastHiddenFocus&&o.onLastHiddenFocus.apply(o,arguments)}},e.ptm(`hiddenLastFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16)],16,tf)):F(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`])],16,Qd)}Zd.render=of;var sf={name:`MinusIcon`,extends:B};function cf(e){return ff(e)||df(e)||uf(e)||lf()}function lf(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function uf(e,t){if(e){if(typeof e==`string`)return pf(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?pf(e,t):void 0}}function df(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function ff(e){if(Array.isArray(e))return pf(e)}function pf(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function mf(e,t,n,r,i,a){return C(),I(`svg`,w({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),cf(t[0]||=[O(`path`,{d:`M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z`,fill:`currentColor`},null,-1)]),16)}sf.render=mf;var hf=D.extend({name:`checkbox`,style:`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-checkbox p-component`,{"p-checkbox-checked":t.checked,"p-disabled":n.disabled,"p-invalid":t.$pcCheckboxGroup?t.$pcCheckboxGroup.$invalid:t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-checkbox-sm p-inputfield-sm":n.size===`small`,"p-checkbox-lg p-inputfield-lg":n.size===`large`}]},box:`p-checkbox-box`,input:`p-checkbox-input`,icon:`p-checkbox-icon`}}),gf={name:`BaseCheckbox`,extends:_d,props:{value:null,binary:Boolean,indeterminate:{type:Boolean,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:hf,provide:function(){return{$pcCheckbox:this,$parentInstance:this}}};function _f(e){"@babel/helpers - typeof";return _f=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},_f(e)}function vf(e,t,n){return(t=yf(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function yf(e){var t=bf(e,`string`);return _f(t)==`symbol`?t:t+``}function bf(e,t){if(_f(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(_f(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function xf(e){return Tf(e)||wf(e)||Cf(e)||Sf()}function Sf(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Cf(e,t){if(e){if(typeof e==`string`)return Ef(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ef(e,t):void 0}}function wf(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Tf(e){if(Array.isArray(e))return Ef(e)}function Ef(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var Df={name:`Checkbox`,extends:gf,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`update:indeterminate`],inject:{$pcCheckboxGroup:{default:void 0}},data:function(){return{d_indeterminate:this.indeterminate}},watch:{indeterminate:function(e){this.d_indeterminate=e,this.updateIndeterminate()}},mounted:function(){this.updateIndeterminate()},updated:function(){this.updateIndeterminate()},methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{checked:this.checked,indeterminate:this.d_indeterminate,disabled:this.disabled}})},onChange:function(e){var t=this;if(!this.disabled&&!this.readonly){var n=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value,r=this.binary?this.d_indeterminate?this.trueValue:this.checked?this.falseValue:this.trueValue:this.checked||this.d_indeterminate?n.filter(function(e){return!$e(e,t.value)}):n?[].concat(xf(n),[this.value]):[this.value];this.d_indeterminate&&(this.d_indeterminate=!1,this.$emit(`update:indeterminate`,this.d_indeterminate)),this.$pcCheckboxGroup?this.$pcCheckboxGroup.writeValue(r,e):this.writeValue(r,e),this.$emit(`change`,e)}},onFocus:function(e){this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n,e)},updateIndeterminate:function(){this.$refs.input&&(this.$refs.input.indeterminate=this.d_indeterminate)}},computed:{groupName:function(){return this.$pcCheckboxGroup?this.$pcCheckboxGroup.groupName:this.$formName},checked:function(){var e=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value;return this.d_indeterminate?!1:this.binary?e===this.trueValue:De(this.value,e)},dataP:function(){return L(vf({invalid:this.$invalid,checked:this.checked,disabled:this.disabled,filled:this.$variant===`filled`},this.size,this.size))}},components:{CheckIcon:An,MinusIcon:sf}},Of=[`data-p-checked`,`data-p-indeterminate`,`data-p-disabled`,`data-p`],kf=[`id`,`value`,`name`,`checked`,`tabindex`,`disabled`,`readonly`,`required`,`aria-labelledby`,`aria-label`,`aria-invalid`],Af=[`data-p`];function jf(e,t,r,i,a,o){var s=A(`CheckIcon`),c=A(`MinusIcon`);return C(),I(`div`,w({class:e.cx(`root`)},o.getPTOptions(`root`),{"data-p-checked":o.checked,"data-p-indeterminate":a.d_indeterminate||void 0,"data-p-disabled":e.disabled,"data-p":o.dataP}),[O(`input`,w({ref:`input`,id:e.inputId,type:`checkbox`,class:[e.cx(`input`),e.inputClass],style:e.inputStyle,value:e.value,name:o.groupName,checked:o.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,required:e.required,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:t[0]||=function(){return o.onFocus&&o.onFocus.apply(o,arguments)},onBlur:t[1]||=function(){return o.onBlur&&o.onBlur.apply(o,arguments)},onChange:t[2]||=function(){return o.onChange&&o.onChange.apply(o,arguments)}},o.getPTOptions(`input`)),null,16,kf),O(`div`,w({class:e.cx(`box`)},o.getPTOptions(`box`),{"data-p":o.dataP}),[n(e.$slots,`icon`,{checked:o.checked,indeterminate:a.d_indeterminate,class:x(e.cx(`icon`)),dataP:o.dataP},function(){return[o.checked?(C(),E(s,w({key:0,class:e.cx(`icon`)},o.getPTOptions(`icon`),{"data-p":o.dataP}),null,16,[`class`,`data-p`])):a.d_indeterminate?(C(),E(c,w({key:1,class:e.cx(`icon`)},o.getPTOptions(`icon`),{"data-p":o.dataP}),null,16,[`class`,`data-p`])):F(``,!0)]})],16,Af)],16,Of)}Df.render=jf;export{ac as $,Jl as A,Ac as B,_u as C,xu as D,bu as E,au as F,Cc as G,bc as H,nu as I,wc as J,_c as K,Gl as L,Ql as M,Xl as N,ru as O,iu as P,oc as Q,Hc as R,wu as S,vu as T,mc as U,kc as V,pc as W,Sc as X,Tc as Y,xc as Z,Iu as _,_d as a,zn as at,Ou as b,fd as c,bn as ct,Vu as d,At as dt,ic as et,Bu as f,B as ft,Nu as g,Au as h,Cd as i,Hn as it,ql as j,Zl as k,id as l,gn as lt,Ru as m,L as mt,Zd as n,nc as nt,gd as o,An as ot,Lu as p,z as pt,gc as q,Pd as r,rc as rt,md as s,On as st,Df as t,tc as tt,Xu as u,on as ut,ju as v,yu as w,Eu as x,Du as y,Wc as z};