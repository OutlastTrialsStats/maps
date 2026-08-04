import{A as e,An as t,At as n,Bn as r,Bt as i,C as a,Cn as o,Ct as s,Dn as c,Dt as l,Et as u,Fn as d,Ft as f,Gt as p,Ht as m,I as h,It as g,Jt as _,Kt as v,L as y,Ln as b,Lt as x,M as S,N as ee,Nn as te,Ot as ne,Pn as re,Pt as ie,Qt as C,Rn as w,Sn as T,Tn as ae,Ut as oe,V as se,Vn as E,Vt as ce,Wt as le,X as ue,Xt as de,Y as fe,Yt as pe,Z as me,Zt as he,_ as ge,_n as D,_t as _e,an as O,at as ve,bn as k,bt as ye,cn as A,ct as be,dn as j,en as xe,et as M,fn as Se,gt as Ce,hn as N,i as we,in as Te,j as Ee,jn as De,k as Oe,kn as ke,ln as P,mn as Ae,mt as je,nt as Me,o as Ne,on as Pe,ot as Fe,pn as Ie,pt as Le,qt as Re,r as F,rt as ze,sn as I,st as Be,tt as Ve,un as L,ut as He,v as Ue,vn as We,vt as Ge,wn as Ke,wt as qe,xn as R,xt as Je,y as Ye,yn as Xe,yt as Ze,zn as Qe,zt as $e}from"./index-CuXN803h.js";function z(...e){if(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n];if(!r)continue;let i=typeof r;if(i===`string`||i===`number`)t.push(r);else if(i===`object`){let e=Array.isArray(r)?[z(...r)]:Object.entries(r).map(([e,t])=>t?e:void 0);t=e.length?t.concat(e.filter(e=>!!e)):t}}return t.join(` `).trim()}}function et(){return`${arguments.length>0&&arguments[0]!==void 0?arguments[0]:`pc`}${c().replace(`v-`,``).replaceAll(`-`,`_`)}`}var tt=M.extend({name:`common`});function nt(e){"@babel/helpers - typeof";return nt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},nt(e)}function rt(e){return ut(e)||it(e)||st(e)||ot()}function it(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function at(e,t){return ut(e)||lt(e,t)||st(e,t)||ot()}function ot(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function st(e,t){if(e){if(typeof e==`string`)return ct(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ct(e,t):void 0}}function ct(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function lt(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function ut(e){if(Array.isArray(e))return e}function dt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function B(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?dt(Object(n),!0).forEach(function(t){ft(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):dt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ft(e,t,n){return(t=pt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function pt(e){var t=mt(e,`string`);return nt(t)==`symbol`?t:t+``}function mt(e,t){if(nt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(nt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var V={name:`BaseComponent`,props:{pt:{type:Object,default:void 0},ptOptions:{type:Object,default:void 0},unstyled:{type:Boolean,default:void 0},dt:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0}},watch:{isUnstyled:{immediate:!0,handler:function(e){Me.off(`theme:change`,this._loadCoreStyles),e||(this._loadCoreStyles(),this._themeChangeListener(this._loadCoreStyles))}},dt:{immediate:!0,handler:function(e,t){var n=this;Me.off(`theme:change`,this._themeScopedListener),e?(this._loadScopedThemeStyles(e),this._themeScopedListener=function(){return n._loadScopedThemeStyles(e)},this._themeChangeListener(this._themeScopedListener)):this._unloadScopedThemeStyles()}}},scopedStyleEl:void 0,rootEl:void 0,uid:void 0,$attrSelector:void 0,beforeCreate:function(){var e,t,n,r,i,a,o,s,c,l,u=this.pt?._usept,d=u?(e=this.pt)==null||(e=e.originalValue)==null?void 0:e[this.$.type.name]:void 0;(n=(u?(t=this.pt)==null||(t=t.value)==null?void 0:t[this.$.type.name]:this.pt)||d)==null||(n=n.hooks)==null||(r=n.onBeforeCreate)==null||r.call(n);var f=(i=this.$primevueConfig)==null||(i=i.pt)==null?void 0:i._usept,p=f?(a=this.$primevue)==null||(a=a.config)==null||(a=a.pt)==null?void 0:a.originalValue:void 0;(c=(f?(o=this.$primevue)==null||(o=o.config)==null||(o=o.pt)==null?void 0:o.value:(s=this.$primevue)==null||(s=s.config)==null?void 0:s.pt)||p)==null||(c=c[this.$.type.name])==null||(c=c.hooks)==null||(l=c.onBeforeCreate)==null||l.call(c),this.$attrSelector=et(),this.uid=this.$attrs.id||this.$attrSelector.replace(`pc`,`pv_id_`)},created:function(){this._hook(`onCreated`)},beforeMount:function(){this.rootEl=x(ne(this.$el)?this.$el:this.$el?.parentElement,`[${this.$attrSelector}]`),this.rootEl&&(this.rootEl.$pc=B({name:this.$.type.name,attrSelector:this.$attrSelector},this.$params)),this._loadStyles(),this._hook(`onBeforeMount`)},mounted:function(){this._hook(`onMounted`)},beforeUpdate:function(){this._hook(`onBeforeUpdate`)},updated:function(){this._hook(`onUpdated`)},beforeUnmount:function(){this._hook(`onBeforeUnmount`)},unmounted:function(){this._removeThemeListeners(),this._unloadScopedThemeStyles(),this._hook(`onUnmounted`)},methods:{_hook:function(e){if(!this.$options.hostName){var t=this._usePT(this._getPT(this.pt,this.$.type.name),this._getOptionValue,`hooks.${e}`),n=this._useDefaultPT(this._getOptionValue,`hooks.${e}`);t?.(),n?.()}},_mergeProps:function(e){var t=[...arguments].slice(1);return p(e)?e.apply(void 0,t):D.apply(void 0,t)},_load:function(){ue.isStyleNameLoaded(`base`)||(M.loadCSS(this.$styleOptions),this._loadGlobalStyles(),ue.setLoadedStyleName(`base`)),this._loadThemeStyles()},_loadStyles:function(){this._load(),this._themeChangeListener(this._load)},_loadCoreStyles:function(){var e;!ue.isStyleNameLoaded(this.$style?.name)&&(e=this.$style)!=null&&e.name&&(tt.loadCSS(this.$styleOptions),this.$options.style&&this.$style.loadCSS(this.$styleOptions),ue.setLoadedStyleName(this.$style.name))},_loadGlobalStyles:function(){var e=this._useGlobalPT(this._getOptionValue,`global.css`,this.$params);C(e)&&M.load(e,B({name:`global`},this.$styleOptions))},_loadThemeStyles:function(){var e;if(!(this.isUnstyled||this.$theme===`none`)){if(!ze.isStyleNameLoaded(`common`)){var t,n,r=((t=this.$style)==null||(n=t.getCommonTheme)==null?void 0:n.call(t))||{},i=r.primitive,a=r.semantic,o=r.global,s=r.style;M.load(i?.css,B({name:`primitive-variables`},this.$styleOptions)),M.load(a?.css,B({name:`semantic-variables`},this.$styleOptions)),M.load(o?.css,B({name:`global-variables`},this.$styleOptions)),M.loadStyle(B({name:`global-style`},this.$styleOptions),s),ze.setLoadedStyleName(`common`)}if(!ze.isStyleNameLoaded(this.$style?.name)&&(e=this.$style)!=null&&e.name){var c,l,u,d,f=((c=this.$style)==null||(l=c.getComponentTheme)==null?void 0:l.call(c))||{},p=f.css,m=f.style;(u=this.$style)==null||u.load(p,B({name:`${this.$style.name}-variables`},this.$styleOptions)),(d=this.$style)==null||d.loadStyle(B({name:`${this.$style.name}-style`},this.$styleOptions),m),ze.setLoadedStyleName(this.$style.name)}if(!ze.isStyleNameLoaded(`layer-order`)){var h,g,_=(h=this.$style)==null||(g=h.getLayerOrderThemeCSS)==null?void 0:g.call(h);M.load(_,B({name:`layer-order`,first:!0},this.$styleOptions)),ze.setLoadedStyleName(`layer-order`)}}},_loadScopedThemeStyles:function(e){var t,n,r=(((t=this.$style)==null||(n=t.getPresetTheme)==null?void 0:n.call(t,e,`[${this.$attrSelector}]`))||{}).css,i=this.$style?.load(r,B({name:`${this.$attrSelector}-${this.$style.name}`},this.$styleOptions));this.scopedStyleEl=i.el},_unloadScopedThemeStyles:function(){var e;(e=this.scopedStyleEl)==null||(e=e.value)==null||e.remove()},_themeChangeListener:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};ue.clearLoadedStyleNames(),Me.on(`theme:change`,e)},_removeThemeListeners:function(){Me.off(`theme:change`,this._loadCoreStyles),Me.off(`theme:change`,this._load),Me.off(`theme:change`,this._themeScopedListener)},_getHostInstance:function(e){return e?this.$options.hostName?e.$.type.name===this.$options.hostName?e:this._getHostInstance(e.$parentInstance):e.$parentInstance:void 0},_getPropValue:function(e){return this[e]||this._getHostInstance(this)?.[e]},_getOptionValue:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return ce(e,t,n)},_getPTValue:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,i=/./g.test(t)&&!!n[t.split(`.`)[0]],a=this._getPropValue(`ptOptions`)||this.$primevueConfig?.ptOptions||{},o=a.mergeSections,s=o===void 0||o,c=a.mergeProps,l=c!==void 0&&c,u=r?i?this._useGlobalPT(this._getPTClassValue,t,n):this._useDefaultPT(this._getPTClassValue,t,n):void 0,d=i?void 0:this._getPTSelf(e,this._getPTClassValue,t,B(B({},n),{},{global:u||{}})),f=this._getPTDatasets(t);return s||!s&&d?l?this._mergeProps(l,u,d,f):B(B(B({},u),d),f):B(B({},d),f)},_getPTSelf:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=[...arguments].slice(1);return D(this._usePT.apply(this,[this._getPT(e,this.$name)].concat(t)),this._usePT.apply(this,[this.$_attrsPT].concat(t)))},_getPTDatasets:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=`data-pc-`,n=e===`root`&&C(this.pt?.[`data-pc-section`]);return e!==`transition`&&B(B({},e===`root`&&B(B(ft({},`${t}name`,v(n?this.pt?.[`data-pc-section`]:this.$.type.name)),n&&ft({},`${t}extend`,v(this.$.type.name))),{},ft({},`${this.$attrSelector}`,``))),{},ft({},`${t}section`,v(e)))},_getPTClassValue:function(){var e=this._getOptionValue.apply(this,arguments);return le(e)||i(e)?{class:e}:e},_getPT:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,r=arguments.length>2?arguments[2]:void 0,i=function(e){var i=arguments.length>1&&arguments[1]!==void 0&&arguments[1],a=r?r(e):e,o=v(n),s=v(t.$name);return(i&&o===s?void 0:a?.[o])??a};return e!=null&&e.hasOwnProperty(`_usept`)?{_usept:e._usept,originalValue:i(e.originalValue),value:i(e.value)}:i(e,!0)},_usePT:function(e,t,n,r){var i=function(e){return t(e,n,r)};if(e!=null&&e.hasOwnProperty(`_usept`)){var a=e._usept||this.$primevueConfig?.ptOptions||{},o=a.mergeSections,s=o===void 0||o,c=a.mergeProps,l=c!==void 0&&c,u=i(e.originalValue),d=i(e.value);return u===void 0&&d===void 0?void 0:le(d)?d:le(u)?u:s||!s&&d?l?this._mergeProps(l,u,d):B(B({},u),d):d}return i(e)},_useGlobalPT:function(e,t,n){return this._usePT(this.globalPT,e,t,n)},_useDefaultPT:function(e,t,n){return this._usePT(this.defaultPT,e,t,n)},ptm:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this._getPTValue(this.pt,e,B(B({},this.$params),t))},ptmi:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=D(this.$_attrsWithoutPT,this.ptm(e,t));return n!=null&&n.hasOwnProperty(`id`)&&(n.id??=this.$id),n},ptmo:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this._getPTValue(e,t,B({instance:this},n),!1)},cx:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.isUnstyled?void 0:this._getOptionValue(this.$style.classes,e,B(B({},this.$params),t))},sx:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(t){var r=this._getOptionValue(this.$style.inlineStyles,e,B(B({},this.$params),n));return[this._getOptionValue(tt.inlineStyles,e,B(B({},this.$params),n)),r]}}},computed:{globalPT:function(){var e=this;return this._getPT(this.$primevueConfig?.pt,void 0,function(t){return pe(t,{instance:e})})},defaultPT:function(){var e=this;return this._getPT(this.$primevueConfig?.pt,void 0,function(t){return e._getOptionValue(t,e.$name,B({},e.$params))||pe(t,B({},e.$params))})},isUnstyled:function(){return this.unstyled===void 0?this.$primevueConfig?.unstyled:this.unstyled},$id:function(){return this.$attrs.id||this.uid},$inProps:function(){var e=Object.keys(this.$.vnode?.props||{});return Object.fromEntries(Object.entries(this.$props).filter(function(t){var n=at(t,1)[0];return e?.includes(n)}))},$theme:function(){return this.$primevueConfig?.theme},$style:function(){return B(B({classes:void 0,inlineStyles:void 0,load:function(){},loadCSS:function(){},loadStyle:function(){}},(this._getHostInstance(this)||{}).$style),this.$options.style)},$styleOptions:function(){var e;return{nonce:(e=this.$primevueConfig)==null||(e=e.csp)==null?void 0:e.nonce}},$primevueConfig:function(){return this.$primevue?.config},$name:function(){return this.$options.hostName||this.$.type.name},$params:function(){var e=this._getHostInstance(this)||this.$parent;return{instance:this,props:this.$props,state:this.$data,attrs:this.$attrs,parent:{instance:e,props:e?.$props,state:e?.$data,attrs:e?.$attrs}}},$_attrsPT:function(){return Object.entries(this.$attrs||{}).filter(function(e){return at(e,1)[0]?.startsWith(`pt:`)}).reduce(function(e,t){var n=at(t,2),r=n[0],i=n[1];return ct(rt(r.split(`:`))).slice(1)?.reduce(function(e,t,n,r){return!e[t]&&(e[t]=n===r.length-1?i:{}),e[t]},e),e},{})},$_attrsWithoutPT:function(){return Object.entries(this.$attrs||{}).filter(function(e){var t=at(e,1)[0];return!(t!=null&&t.startsWith(`pt:`))}).reduce(function(e,t){var n=at(t,2),r=n[0];return e[r]=n[1],e},{})}}},ht=M.extend({name:`baseicon`,css:`
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
`});function gt(e){"@babel/helpers - typeof";return gt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},gt(e)}function _t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function vt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?_t(Object(n),!0).forEach(function(t){yt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_t(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function yt(e,t,n){return(t=bt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function bt(e){var t=xt(e,`string`);return gt(t)==`symbol`?t:t+``}function xt(e,t){if(gt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(gt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var St={name:`BaseIcon`,extends:V,props:{label:{type:String,default:void 0},spin:{type:Boolean,default:!1}},style:ht,provide:function(){return{$pcIcon:this,$parentInstance:this}},methods:{pti:function(){var e=_(this.label);return vt(vt({},!this.isUnstyled&&{class:[`p-icon`,{"p-icon-spin":this.spin}]}),{},{role:e?void 0:`img`,"aria-label":e?void 0:this.label,"aria-hidden":e})}}},Ct={name:`SpinnerIcon`,extends:St};function wt(e){return Ot(e)||Dt(e)||Et(e)||Tt()}function Tt(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Et(e,t){if(e){if(typeof e==`string`)return kt(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?kt(e,t):void 0}}function Dt(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Ot(e){if(Array.isArray(e))return kt(e)}function kt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function At(e,t,n,r,i,a){return k(),j(`svg`,D({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),wt(t[0]||=[A(`path`,{d:`M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z`,fill:`currentColor`},null,-1)]),16)}Ct.render=At;var jt=M.extend({name:`badge`,style:`
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
`,classes:{root:function(e){var t=e.props,n=e.instance;return[`p-badge p-component`,{"p-badge-circle":C(t.value)&&String(t.value).length===1,"p-badge-dot":_(t.value)&&!n.$slots.default,"p-badge-sm":t.size===`small`,"p-badge-lg":t.size===`large`,"p-badge-xl":t.size===`xlarge`,"p-badge-info":t.severity===`info`,"p-badge-success":t.severity===`success`,"p-badge-warn":t.severity===`warn`,"p-badge-danger":t.severity===`danger`,"p-badge-secondary":t.severity===`secondary`,"p-badge-contrast":t.severity===`contrast`}]}}}),Mt={name:`BaseBadge`,extends:V,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:jt,provide:function(){return{$pcBadge:this,$parentInstance:this}}};function Nt(e){"@babel/helpers - typeof";return Nt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Nt(e)}function Pt(e,t,n){return(t=Ft(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ft(e){var t=It(e,`string`);return Nt(t)==`symbol`?t:t+``}function It(e,t){if(Nt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Nt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Lt={name:`Badge`,extends:Mt,inheritAttrs:!1,computed:{dataP:function(){return z(Pt(Pt({circle:this.value!=null&&String(this.value).length===1,empty:this.value==null&&!this.$slots.default},this.severity,this.severity),this.size,this.size))}}},Rt=[`data-p`];function zt(e,t,n,r,i,a){return k(),j(`span`,D({class:e.cx(`root`),"data-p":a.dataP},e.ptmi(`root`)),[T(e.$slots,`default`,{},function(){return[Ie(E(e.value),1)]})],16,Rt)}Lt.render=zt;var Bt=M.extend({name:`ripple-directive`,style:`
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
`,classes:{root:`p-ink`}}),Vt=fe.extend({style:Bt});function Ht(e){"@babel/helpers - typeof";return Ht=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Ht(e)}function Ut(e){return qt(e)||Kt(e)||Gt(e)||Wt()}function Wt(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Gt(e,t){if(e){if(typeof e==`string`)return Jt(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Jt(e,t):void 0}}function Kt(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function qt(e){if(Array.isArray(e))return Jt(e)}function Jt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Yt(e,t,n){return(t=Xt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Xt(e){var t=Zt(e,`string`);return Ht(t)==`symbol`?t:t+``}function Zt(e,t){if(Ht(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Ht(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Qt=Vt.extend(`ripple`,{watch:{"config.ripple":function(e){e?(this.createRipple(this.$host),this.bindEvents(this.$host),this.$host.setAttribute(`data-pd-ripple`,!0),this.$host.style.overflow=`hidden`,this.$host.style.position=`relative`):(this.remove(this.$host),this.$host.removeAttribute(`data-pd-ripple`))}},unmounted:function(e){this.remove(e)},timeout:void 0,methods:{bindEvents:function(e){e.addEventListener(`mousedown`,this.onMouseDown.bind(this))},unbindEvents:function(e){e.removeEventListener(`mousedown`,this.onMouseDown.bind(this))},createRipple:function(e){var t=this.getInk(e);t||(t=Je(`span`,Yt(Yt({role:`presentation`,"aria-hidden":!0,"data-p-ink":!0,"data-p-ink-active":!1,class:!this.isUnstyled()&&this.cx(`root`),onAnimationEnd:this.onAnimationEnd.bind(this)},this.$attrSelector,``),`p-bind`,this.ptm(`root`))),e.appendChild(t),this.$el=t)},remove:function(e){var t=this.getInk(e);t&&(this.$host.style.overflow=``,this.$host.style.position=``,this.unbindEvents(e),t.removeEventListener(`animationend`,this.onAnimationEnd),t.remove())},onMouseDown:function(e){var t=this,n=e.currentTarget,r=this.getInk(n);if(!(!r||getComputedStyle(r,null).display===`none`)){if(!this.isUnstyled()&&Ce(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`false`),!ye(r)&&!Ge(r)){var i=Math.max(f(n),Be(n));r.style.height=i+`px`,r.style.width=i+`px`}var a=Le(n),o=e.pageX-a.left+document.body.scrollTop-Ge(r)/2,c=e.pageY-a.top+document.body.scrollLeft-ye(r)/2;r.style.top=c+`px`,r.style.left=o+`px`,!this.isUnstyled()&&s(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`true`),this.timeout=setTimeout(function(){r&&(!t.isUnstyled()&&Ce(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`false`))},401)}},onAnimationEnd:function(e){this.timeout&&clearTimeout(this.timeout),!this.isUnstyled()&&Ce(e.currentTarget,`p-ink-active`),e.currentTarget.setAttribute(`data-p-ink-active`,`false`)},getInk:function(e){return e&&e.children?Ut(e.children).find(function(e){return _e(e,`data-pc-name`)===`ripple`}):void 0}}}),$t=`
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
`;function en(e){"@babel/helpers - typeof";return en=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},en(e)}function H(e,t,n){return(t=tn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function tn(e){var t=nn(e,`string`);return en(t)==`symbol`?t:t+``}function nn(e,t){if(en(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(en(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var rn=M.extend({name:`button`,style:$t,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-button p-component`,H(H(H(H(H(H(H(H(H({"p-button-icon-only":t.hasIcon&&!n.label&&!n.badge,"p-button-vertical":(n.iconPos===`top`||n.iconPos===`bottom`)&&n.label,"p-button-loading":n.loading,"p-button-link":n.link||n.variant===`link`},`p-button-${n.severity}`,n.severity),`p-button-raised`,n.raised),`p-button-rounded`,n.rounded),`p-button-text`,n.text||n.variant===`text`),`p-button-outlined`,n.outlined||n.variant===`outlined`),`p-button-sm`,n.size===`small`),`p-button-lg`,n.size===`large`),`p-button-plain`,n.plain),`p-button-fluid`,t.hasFluid)]},loadingIcon:`p-button-loading-icon`,icon:function(e){var t=e.props;return[`p-button-icon`,H({},`p-button-icon-${t.iconPos}`,t.label)]},label:`p-button-label`}}),an={name:`BaseButton`,extends:V,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:`left`},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:`secondary`},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:rn,provide:function(){return{$pcButton:this,$parentInstance:this}}};function on(e){"@babel/helpers - typeof";return on=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},on(e)}function U(e,t,n){return(t=sn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function sn(e){var t=cn(e,`string`);return on(t)==`symbol`?t:t+``}function cn(e,t){if(on(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(on(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var ln={name:`Button`,extends:an,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===``||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?` `+this.badge:``):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return D(this.asAttrs,this.a11yAttrs,this.getPTOptions(`root`))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":`button`,"data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return _(this.fluid)?!!this.$pcFluid:this.fluid},dataP:function(){return z(U(U(U(U(U(U(U(U(U(U({},this.size,this.size),`icon-only`,this.hasIcon&&!this.label&&!this.badge),`loading`,this.loading),`fluid`,this.hasFluid),`rounded`,this.rounded),`raised`,this.raised),`outlined`,this.outlined||this.variant===`outlined`),`text`,this.text||this.variant===`text`),`link`,this.link||this.variant===`link`),`vertical`,(this.iconPos===`top`||this.iconPos===`bottom`)&&this.label))},dataIconP:function(){return z(U(U({},this.iconPos,this.iconPos),this.size,this.size))},dataLabelP:function(){return z(U(U({},this.size,this.size),`icon-only`,this.hasIcon&&!this.label&&!this.badge))}},components:{SpinnerIcon:Ct,Badge:Lt},directives:{ripple:Qt}},un=[`data-p`],dn=[`data-p`];function fn(e,n,r,i,a,s){var c=o(`SpinnerIcon`),l=o(`Badge`),u=Ke(`ripple`);return e.asChild?T(e.$slots,`default`,{key:1,class:w(e.cx(`root`)),a11yAttrs:s.a11yAttrs}):De((k(),P(ae(e.as),D({key:0,class:e.cx(`root`),"data-p":s.dataP},s.attrs),{default:t(function(){return[T(e.$slots,`default`,{},function(){return[e.loading?T(e.$slots,`loadingicon`,D({key:0,class:[e.cx(`loadingIcon`),e.cx(`icon`)]},e.ptm(`loadingIcon`)),function(){return[e.loadingIcon?(k(),j(`span`,D({key:0,class:[e.cx(`loadingIcon`),e.cx(`icon`),e.loadingIcon]},e.ptm(`loadingIcon`)),null,16)):(k(),P(c,D({key:1,class:[e.cx(`loadingIcon`),e.cx(`icon`)],spin:``},e.ptm(`loadingIcon`)),null,16,[`class`]))]}):T(e.$slots,`icon`,D({key:1,class:[e.cx(`icon`)]},e.ptm(`icon`)),function(){return[e.icon?(k(),j(`span`,D({key:0,class:[e.cx(`icon`),e.icon,e.iconClass],"data-p":s.dataIconP},e.ptm(`icon`)),null,16,un)):L(``,!0)]}),e.label?(k(),j(`span`,D({key:2,class:e.cx(`label`)},e.ptm(`label`),{"data-p":s.dataLabelP}),E(e.label),17,dn)):L(``,!0),e.badge?(k(),P(l,{key:3,value:e.badge,class:w(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm(`pcBadge`)},null,8,[`value`,`class`,`severity`,`unstyled`,`pt`])):L(``,!0)]})]}),_:3},16,[`class`,`data-p`])),[[u]])}ln.render=fn;var pn={name:`TimesIcon`,extends:St};function mn(e){return vn(e)||_n(e)||gn(e)||hn()}function hn(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gn(e,t){if(e){if(typeof e==`string`)return yn(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?yn(e,t):void 0}}function _n(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function vn(e){if(Array.isArray(e))return yn(e)}function yn(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function bn(e,t,n,r,i,a){return k(),j(`svg`,D({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),mn(t[0]||=[A(`path`,{d:`M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z`,fill:`currentColor`},null,-1)]),16)}pn.render=bn;var xn={name:`Portal`,props:{appendTo:{type:[String,Object],default:`body`},disabled:{type:Boolean,default:!1}},data:function(){return{mounted:!1}},mounted:function(){this.mounted=ie()},computed:{inline:function(){return this.disabled||this.appendTo===`self`}}};function Sn(e,t,n,r,i,a){return a.inline?T(e.$slots,`default`,{key:0}):i.mounted?(k(),P(Pe,{key:1,to:n.appendTo},[T(e.$slots,`default`)],8,[`to`])):L(``,!0)}xn.render=Sn;var Cn={name:`CheckIcon`,extends:St};function wn(e){return On(e)||Dn(e)||En(e)||Tn()}function Tn(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function En(e,t){if(e){if(typeof e==`string`)return kn(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?kn(e,t):void 0}}function Dn(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function On(e){if(Array.isArray(e))return kn(e)}function kn(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function An(e,t,n,r,i,a){return k(),j(`svg`,D({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),wn(t[0]||=[A(`path`,{d:`M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z`,fill:`currentColor`},null,-1)]),16)}Cn.render=An;function jn(e){return e instanceof HTMLElement?e.isContentEditable||e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement:!1}function Mn(e){return jn(e)?!0:e instanceof HTMLElement&&e.closest(`[role="dialog"]`)!==null}var Nn={class:`legend`},Pn=[`src`],Fn=F(N({__name:`ControlsLegend`,props:{hints:{}},setup(e){let t={left:Ne(`MouseIconLeftClick.webp`),right:Ne(`MouseIconRightClick.webp`),wheel:Ne(`MouseWheelIcon.webp`)};return(n,r)=>(k(),j(`ul`,Nn,[(k(!0),j(O,null,R(e.hints,e=>(k(),j(`li`,{key:e.label},[A(`img`,{class:`icon`,src:t[e.icon],alt:``},null,8,Pn),A(`span`,null,E(e.label),1)]))),128))]))}}),[[`__scopeId`,`data-v-b8c8d4be`]]),In={svg:`http://www.w3.org/2000/svg`,xhtml:`http://www.w3.org/1999/xhtml`,xlink:`http://www.w3.org/1999/xlink`,xml:`http://www.w3.org/XML/1998/namespace`,xmlns:`http://www.w3.org/2000/xmlns/`};function Ln(e){var t=e+=``,n=t.indexOf(`:`);return n>=0&&(t=e.slice(0,n))!==`xmlns`&&(e=e.slice(n+1)),In.hasOwnProperty(t)?{space:In[t],local:e}:e}function Rn(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===`http://www.w3.org/1999/xhtml`&&t.documentElement.namespaceURI===`http://www.w3.org/1999/xhtml`?t.createElement(e):t.createElementNS(n,e)}}function zn(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Bn(e){var t=Ln(e);return(t.local?zn:Rn)(t)}function Vn(){}function Hn(e){return e==null?Vn:function(){return this.querySelector(e)}}function Un(e){typeof e!=`function`&&(e=Hn(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=Array(o),c,l,u=0;u<o;++u)(c=a[u])&&(l=e.call(c,c.__data__,u,a))&&(`__data__`in c&&(l.__data__=c.__data__),s[u]=l);return new W(r,this._parents)}function Wn(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Gn(){return[]}function Kn(e){return e==null?Gn:function(){return this.querySelectorAll(e)}}function qn(e){return function(){return Wn(e.apply(this,arguments))}}function Jn(e){e=typeof e==`function`?qn(e):Kn(e);for(var t=this._groups,n=t.length,r=[],i=[],a=0;a<n;++a)for(var o=t[a],s=o.length,c,l=0;l<s;++l)(c=o[l])&&(r.push(e.call(c,c.__data__,l,o)),i.push(c));return new W(r,i)}function Yn(e){return function(){return this.matches(e)}}function Xn(e){return function(t){return t.matches(e)}}var Zn=Array.prototype.find;function Qn(e){return function(){return Zn.call(this.children,e)}}function $n(){return this.firstElementChild}function er(e){return this.select(e==null?$n:Qn(typeof e==`function`?e:Xn(e)))}var tr=Array.prototype.filter;function nr(){return Array.from(this.children)}function rr(e){return function(){return tr.call(this.children,e)}}function ir(e){return this.selectAll(e==null?nr:rr(typeof e==`function`?e:Xn(e)))}function ar(e){typeof e!=`function`&&(e=Yn(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=[],c,l=0;l<o;++l)(c=a[l])&&e.call(c,c.__data__,l,a)&&s.push(c);return new W(r,this._parents)}function or(e){return Array(e.length)}function sr(){return new W(this._enter||this._groups.map(or),this._parents)}function cr(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}cr.prototype={constructor:cr,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function lr(e){return function(){return e}}function ur(e,t,n,r,i,a){for(var o=0,s,c=t.length,l=a.length;o<l;++o)(s=t[o])?(s.__data__=a[o],r[o]=s):n[o]=new cr(e,a[o]);for(;o<c;++o)(s=t[o])&&(i[o]=s)}function dr(e,t,n,r,i,a,o){var s,c,l=new Map,u=t.length,d=a.length,f=Array(u),p;for(s=0;s<u;++s)(c=t[s])&&(f[s]=p=o.call(c,c.__data__,s,t)+``,l.has(p)?i[s]=c:l.set(p,c));for(s=0;s<d;++s)p=o.call(e,a[s],s,a)+``,(c=l.get(p))?(r[s]=c,c.__data__=a[s],l.delete(p)):n[s]=new cr(e,a[s]);for(s=0;s<u;++s)(c=t[s])&&l.get(f[s])===c&&(i[s]=c)}function fr(e){return e.__data__}function pr(e,t){if(!arguments.length)return Array.from(this,fr);var n=t?dr:ur,r=this._parents,i=this._groups;typeof e!=`function`&&(e=lr(e));for(var a=i.length,o=Array(a),s=Array(a),c=Array(a),l=0;l<a;++l){var u=r[l],d=i[l],f=d.length,p=mr(e.call(u,u&&u.__data__,l,r)),m=p.length,h=s[l]=Array(m),g=o[l]=Array(m);n(u,d,h,g,c[l]=Array(f),p,t);for(var _=0,v=0,y,b;_<m;++_)if(y=h[_]){for(_>=v&&(v=_+1);!(b=g[v])&&++v<m;);y._next=b||null}}return o=new W(o,r),o._enter=s,o._exit=c,o}function mr(e){return typeof e==`object`&&`length`in e?e:Array.from(e)}function hr(){return new W(this._exit||this._groups.map(or),this._parents)}function gr(e,t,n){var r=this.enter(),i=this,a=this.exit();return typeof e==`function`?(r=e(r),r&&=r.selection()):r=r.append(e+``),t!=null&&(i=t(i),i&&=i.selection()),n==null?a.remove():n(a),r&&i?r.merge(i).order():i}function _r(e){for(var t=e.selection?e.selection():e,n=this._groups,r=t._groups,i=n.length,a=r.length,o=Math.min(i,a),s=Array(i),c=0;c<o;++c)for(var l=n[c],u=r[c],d=l.length,f=s[c]=Array(d),p,m=0;m<d;++m)(p=l[m]||u[m])&&(f[m]=p);for(;c<i;++c)s[c]=n[c];return new W(s,this._parents)}function vr(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r=e[t],i=r.length-1,a=r[i],o;--i>=0;)(o=r[i])&&(a&&o.compareDocumentPosition(a)^4&&a.parentNode.insertBefore(o,a),a=o);return this}function yr(e){e||=br;function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}for(var n=this._groups,r=n.length,i=Array(r),a=0;a<r;++a){for(var o=n[a],s=o.length,c=i[a]=Array(s),l,u=0;u<s;++u)(l=o[u])&&(c[u]=l);c.sort(t)}return new W(i,this._parents).order()}function br(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function xr(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Sr(){return Array.from(this)}function Cr(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,a=r.length;i<a;++i){var o=r[i];if(o)return o}return null}function wr(){let e=0;for(let t of this)++e;return e}function Tr(){return!this.node()}function Er(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var i=t[n],a=0,o=i.length,s;a<o;++a)(s=i[a])&&e.call(s,s.__data__,a,i);return this}function Dr(e){return function(){this.removeAttribute(e)}}function Or(e){return function(){this.removeAttributeNS(e.space,e.local)}}function kr(e,t){return function(){this.setAttribute(e,t)}}function Ar(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function jr(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function Mr(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Nr(e,t){var n=Ln(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((t==null?n.local?Or:Dr:typeof t==`function`?n.local?Mr:jr:n.local?Ar:kr)(n,t))}function Pr(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Fr(e){return function(){this.style.removeProperty(e)}}function Ir(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Lr(e,t,n){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function Rr(e,t,n){return arguments.length>1?this.each((t==null?Fr:typeof t==`function`?Lr:Ir)(e,t,n??``)):zr(this.node(),e)}function zr(e,t){return e.style.getPropertyValue(t)||Pr(e).getComputedStyle(e,null).getPropertyValue(t)}function Br(e){return function(){delete this[e]}}function Vr(e,t){return function(){this[e]=t}}function Hr(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function Ur(e,t){return arguments.length>1?this.each((t==null?Br:typeof t==`function`?Hr:Vr)(e,t)):this.node()[e]}function Wr(e){return e.trim().split(/^|\s+/)}function Gr(e){return e.classList||new Kr(e)}function Kr(e){this._node=e,this._names=Wr(e.getAttribute(`class`)||``)}Kr.prototype={add:function(e){this._names.indexOf(e)<0&&(this._names.push(e),this._node.setAttribute(`class`,this._names.join(` `)))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute(`class`,this._names.join(` `)))},contains:function(e){return this._names.indexOf(e)>=0}};function qr(e,t){for(var n=Gr(e),r=-1,i=t.length;++r<i;)n.add(t[r])}function Jr(e,t){for(var n=Gr(e),r=-1,i=t.length;++r<i;)n.remove(t[r])}function Yr(e){return function(){qr(this,e)}}function Xr(e){return function(){Jr(this,e)}}function Zr(e,t){return function(){(t.apply(this,arguments)?qr:Jr)(this,e)}}function Qr(e,t){var n=Wr(e+``);if(arguments.length<2){for(var r=Gr(this.node()),i=-1,a=n.length;++i<a;)if(!r.contains(n[i]))return!1;return!0}return this.each((typeof t==`function`?Zr:t?Yr:Xr)(n,t))}function $r(){this.textContent=``}function ei(e){return function(){this.textContent=e}}function ti(e){return function(){var t=e.apply(this,arguments);this.textContent=t??``}}function ni(e){return arguments.length?this.each(e==null?$r:(typeof e==`function`?ti:ei)(e)):this.node().textContent}function ri(){this.innerHTML=``}function ii(e){return function(){this.innerHTML=e}}function ai(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??``}}function oi(e){return arguments.length?this.each(e==null?ri:(typeof e==`function`?ai:ii)(e)):this.node().innerHTML}function si(){this.nextSibling&&this.parentNode.appendChild(this)}function ci(){return this.each(si)}function li(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function ui(){return this.each(li)}function di(e){var t=typeof e==`function`?e:Bn(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function fi(){return null}function pi(e,t){var n=typeof e==`function`?e:Bn(e),r=t==null?fi:typeof t==`function`?t:Hn(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function mi(){var e=this.parentNode;e&&e.removeChild(this)}function hi(){return this.each(mi)}function gi(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function _i(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function vi(e){return this.select(e?_i:gi)}function yi(e){return arguments.length?this.property(`__data__`,e):this.node().__data__}function bi(e){return function(t){e.call(this,t,this.__data__)}}function xi(e){return e.trim().split(/^|\s+/).map(function(e){var t=``,n=e.indexOf(`.`);return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}})}function Si(e){return function(){var t=this.__on;if(t){for(var n=0,r=-1,i=t.length,a;n<i;++n)a=t[n],(!e.type||a.type===e.type)&&a.name===e.name?this.removeEventListener(a.type,a.listener,a.options):t[++r]=a;++r?t.length=r:delete this.__on}}}function Ci(e,t,n){return function(){var r=this.__on,i,a=bi(t);if(r){for(var o=0,s=r.length;o<s;++o)if((i=r[o]).type===e.type&&i.name===e.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=a,i.options=n),i.value=t;return}}this.addEventListener(e.type,a,n),i={type:e.type,name:e.name,value:t,listener:a,options:n},r?r.push(i):this.__on=[i]}}function wi(e,t,n){var r=xi(e+``),i,a=r.length,o;if(arguments.length<2){var s=this.node().__on;if(s){for(var c=0,l=s.length,u;c<l;++c)for(i=0,u=s[c];i<a;++i)if((o=r[i]).type===u.type&&o.name===u.name)return u.value}return}for(s=t?Ci:Si,i=0;i<a;++i)this.each(s(r[i],t,n));return this}function Ti(e,t,n){var r=Pr(e),i=r.CustomEvent;typeof i==`function`?i=new i(t,n):(i=r.document.createEvent(`Event`),n?(i.initEvent(t,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(t,!1,!1)),e.dispatchEvent(i)}function Ei(e,t){return function(){return Ti(this,e,t)}}function Di(e,t){return function(){return Ti(this,e,t.apply(this,arguments))}}function Oi(e,t){return this.each((typeof t==`function`?Di:Ei)(e,t))}function*ki(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,a=r.length,o;i<a;++i)(o=r[i])&&(yield o)}var Ai=[null];function W(e,t){this._groups=e,this._parents=t}function ji(){return new W([[document.documentElement]],Ai)}function Mi(){return this}W.prototype=ji.prototype={constructor:W,select:Un,selectAll:Jn,selectChild:er,selectChildren:ir,filter:ar,data:pr,enter:sr,exit:hr,join:gr,merge:_r,selection:Mi,order:vr,sort:yr,call:xr,nodes:Sr,node:Cr,size:wr,empty:Tr,each:Er,attr:Nr,style:Rr,property:Ur,classed:Qr,text:ni,html:oi,raise:ci,lower:ui,append:di,insert:pi,remove:hi,clone:vi,datum:yi,on:wi,dispatch:Oi,[Symbol.iterator]:ki};function Ni(e){return typeof e==`string`?new W([[document.querySelector(e)]],[document.documentElement]):new W([[e]],Ai)}function Pi(e){let t;for(;t=e.sourceEvent;)e=t;return e}function Fi(e,t){if(e=Pi(e),t===void 0&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=e.clientX,r.y=e.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[e.clientX-i.left-t.clientLeft,e.clientY-i.top-t.clientTop]}}return[e.pageX,e.pageY]}var Ii={value:()=>{}};function Li(){for(var e=0,t=arguments.length,n={},r;e<t;++e){if(!(r=arguments[e]+``)||r in n||/[\s.]/.test(r))throw Error(`illegal type: `+r);n[r]=[]}return new Ri(n)}function Ri(e){this._=e}function zi(e,t){return e.trim().split(/^|\s+/).map(function(e){var n=``,r=e.indexOf(`.`);if(r>=0&&(n=e.slice(r+1),e=e.slice(0,r)),e&&!t.hasOwnProperty(e))throw Error(`unknown type: `+e);return{type:e,name:n}})}Ri.prototype=Li.prototype={constructor:Ri,on:function(e,t){var n=this._,r=zi(e+``,n),i,a=-1,o=r.length;if(arguments.length<2){for(;++a<o;)if((i=(e=r[a]).type)&&(i=Bi(n[i],e.name)))return i;return}if(t!=null&&typeof t!=`function`)throw Error(`invalid callback: `+t);for(;++a<o;)if(i=(e=r[a]).type)n[i]=Vi(n[i],e.name,t);else if(t==null)for(i in n)n[i]=Vi(n[i],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new Ri(e)},call:function(e,t){if((i=arguments.length-2)>0)for(var n=Array(i),r=0,i,a;r<i;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw Error(`unknown type: `+e);for(a=this._[e],r=0,i=a.length;r<i;++r)a[r].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw Error(`unknown type: `+e);for(var r=this._[e],i=0,a=r.length;i<a;++i)r[i].value.apply(t,n)}};function Bi(e,t){for(var n=0,r=e.length,i;n<r;++n)if((i=e[n]).name===t)return i.value}function Vi(e,t,n){for(var r=0,i=e.length;r<i;++r)if(e[r].name===t){e[r]=Ii,e=e.slice(0,r).concat(e.slice(r+1));break}return n!=null&&e.push({name:t,value:n}),e}var Hi={capture:!0,passive:!1};function Ui(e){e.preventDefault(),e.stopImmediatePropagation()}function Wi(e){var t=e.document.documentElement,n=Ni(e).on(`dragstart.drag`,Ui,Hi);`onselectstart`in t?n.on(`selectstart.drag`,Ui,Hi):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect=`none`)}function Gi(e,t){var n=e.document.documentElement,r=Ni(e).on(`dragstart.drag`,null);t&&(r.on(`click.drag`,Ui,Hi),setTimeout(function(){r.on(`click.drag`,null)},0)),`onselectstart`in n?r.on(`selectstart.drag`,null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}function Ki(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function qi(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function Ji(){}var Yi=.7,Xi=1/Yi,Zi=`\\s*([+-]?\\d+)\\s*`,Qi=`\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*`,G=`\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*`,$i=/^#([0-9a-f]{3,8})$/,ea=RegExp(`^rgb\\(${Zi},${Zi},${Zi}\\)$`),ta=RegExp(`^rgb\\(${G},${G},${G}\\)$`),na=RegExp(`^rgba\\(${Zi},${Zi},${Zi},${Qi}\\)$`),ra=RegExp(`^rgba\\(${G},${G},${G},${Qi}\\)$`),ia=RegExp(`^hsl\\(${Qi},${G},${G}\\)$`),aa=RegExp(`^hsla\\(${Qi},${G},${G},${Qi}\\)$`),oa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Ki(Ji,da,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:sa,formatHex:sa,formatHex8:ca,formatHsl:la,formatRgb:ua,toString:ua});function sa(){return this.rgb().formatHex()}function ca(){return this.rgb().formatHex8()}function la(){return Ca(this).formatHsl()}function ua(){return this.rgb().formatRgb()}function da(e){var t,n;return e=(e+``).trim().toLowerCase(),(t=$i.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?fa(t):n===3?new K(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?pa(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?pa(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=ea.exec(e))?new K(t[1],t[2],t[3],1):(t=ta.exec(e))?new K(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=na.exec(e))?pa(t[1],t[2],t[3],t[4]):(t=ra.exec(e))?pa(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=ia.exec(e))?Sa(t[1],t[2]/100,t[3]/100,1):(t=aa.exec(e))?Sa(t[1],t[2]/100,t[3]/100,t[4]):oa.hasOwnProperty(e)?fa(oa[e]):e===`transparent`?new K(NaN,NaN,NaN,0):null}function fa(e){return new K(e>>16&255,e>>8&255,e&255,1)}function pa(e,t,n,r){return r<=0&&(e=t=n=NaN),new K(e,t,n,r)}function ma(e){return e instanceof Ji||(e=da(e)),e?(e=e.rgb(),new K(e.r,e.g,e.b,e.opacity)):new K}function ha(e,t,n,r){return arguments.length===1?ma(e):new K(e,t,n,r??1)}function K(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}Ki(K,ha,qi(Ji,{brighter(e){return e=e==null?Xi:Xi**+e,new K(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Yi:Yi**+e,new K(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new K(ba(this.r),ba(this.g),ba(this.b),ya(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:ga,formatHex:ga,formatHex8:_a,formatRgb:va,toString:va}));function ga(){return`#${xa(this.r)}${xa(this.g)}${xa(this.b)}`}function _a(){return`#${xa(this.r)}${xa(this.g)}${xa(this.b)}${xa((isNaN(this.opacity)?1:this.opacity)*255)}`}function va(){let e=ya(this.opacity);return`${e===1?`rgb(`:`rgba(`}${ba(this.r)}, ${ba(this.g)}, ${ba(this.b)}${e===1?`)`:`, ${e})`}`}function ya(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function ba(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function xa(e){return e=ba(e),(e<16?`0`:``)+e.toString(16)}function Sa(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new q(e,t,n,r)}function Ca(e){if(e instanceof q)return new q(e.h,e.s,e.l,e.opacity);if(e instanceof Ji||(e=da(e)),!e)return new q;if(e instanceof q)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,i=Math.min(t,n,r),a=Math.max(t,n,r),o=NaN,s=a-i,c=(a+i)/2;return s?(o=t===a?(n-r)/s+(n<r)*6:n===a?(r-t)/s+2:(t-n)/s+4,s/=c<.5?a+i:2-a-i,o*=60):s=c>0&&c<1?0:o,new q(o,s,c,e.opacity)}function wa(e,t,n,r){return arguments.length===1?Ca(e):new q(e,t,n,r??1)}function q(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}Ki(q,wa,qi(Ji,{brighter(e){return e=e==null?Xi:Xi**+e,new q(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Yi:Yi**+e,new q(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,i=2*n-r;return new K(Da(e>=240?e-240:e+120,i,r),Da(e,i,r),Da(e<120?e+240:e-120,i,r),this.opacity)},clamp(){return new q(Ta(this.h),Ea(this.s),Ea(this.l),ya(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let e=ya(this.opacity);return`${e===1?`hsl(`:`hsla(`}${Ta(this.h)}, ${Ea(this.s)*100}%, ${Ea(this.l)*100}%${e===1?`)`:`, ${e})`}`}}));function Ta(e){return e=(e||0)%360,e<0?e+360:e}function Ea(e){return Math.max(0,Math.min(1,e||0))}function Da(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}var Oa=e=>()=>e;function ka(e,t){return function(n){return e+n*t}}function Aa(e,t,n){return e**=+n,t=t**+n-e,n=1/n,function(r){return(e+r*t)**+n}}function ja(e){return(e=+e)==1?Ma:function(t,n){return n-t?Aa(t,n,e):Oa(isNaN(t)?n:t)}}function Ma(e,t){var n=t-e;return n?ka(e,n):Oa(isNaN(e)?t:e)}var Na=(function e(t){var n=ja(t);function r(e,t){var r=n((e=ha(e)).r,(t=ha(t)).r),i=n(e.g,t.g),a=n(e.b,t.b),o=Ma(e.opacity,t.opacity);return function(t){return e.r=r(t),e.g=i(t),e.b=a(t),e.opacity=o(t),e+``}}return r.gamma=e,r})(1);function Pa(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Fa=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ia=new RegExp(Fa.source,`g`);function La(e){return function(){return e}}function Ra(e){return function(t){return e(t)+``}}function za(e,t){var n=Fa.lastIndex=Ia.lastIndex=0,r,i,a,o=-1,s=[],c=[];for(e+=``,t+=``;(r=Fa.exec(e))&&(i=Ia.exec(t));)(a=i.index)>n&&(a=t.slice(n,a),s[o]?s[o]+=a:s[++o]=a),(r=r[0])===(i=i[0])?s[o]?s[o]+=i:s[++o]=i:(s[++o]=null,c.push({i:o,x:Pa(r,i)})),n=Ia.lastIndex;return n<t.length&&(a=t.slice(n),s[o]?s[o]+=a:s[++o]=a),s.length<2?c[0]?Ra(c[0].x):La(t):(t=c.length,function(e){for(var n=0,r;n<t;++n)s[(r=c[n]).i]=r.x(e);return s.join(``)})}var Ba=180/Math.PI,Va={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Ha(e,t,n,r,i,a){var o,s,c;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(c=e*n+t*r)&&(n-=e*c,r-=t*c),(s=Math.sqrt(n*n+r*r))&&(n/=s,r/=s,c/=s),e*r<t*n&&(e=-e,t=-t,c=-c,o=-o),{translateX:i,translateY:a,rotate:Math.atan2(t,e)*Ba,skewX:Math.atan(c)*Ba,scaleX:o,scaleY:s}}var Ua;function Wa(e){let t=new(typeof DOMMatrix==`function`?DOMMatrix:WebKitCSSMatrix)(e+``);return t.isIdentity?Va:Ha(t.a,t.b,t.c,t.d,t.e,t.f)}function Ga(e){return e==null||(Ua||=document.createElementNS(`http://www.w3.org/2000/svg`,`g`),Ua.setAttribute(`transform`,e),!(e=Ua.transform.baseVal.consolidate()))?Va:(e=e.matrix,Ha(e.a,e.b,e.c,e.d,e.e,e.f))}function Ka(e,t,n,r){function i(e){return e.length?e.pop()+` `:``}function a(e,r,i,a,o,s){if(e!==i||r!==a){var c=o.push(`translate(`,null,t,null,n);s.push({i:c-4,x:Pa(e,i)},{i:c-2,x:Pa(r,a)})}else(i||a)&&o.push(`translate(`+i+t+a+n)}function o(e,t,n,a){e===t?t&&n.push(i(n)+`rotate(`+t+r):(e-t>180?t+=360:t-e>180&&(e+=360),a.push({i:n.push(i(n)+`rotate(`,null,r)-2,x:Pa(e,t)}))}function s(e,t,n,a){e===t?t&&n.push(i(n)+`skewX(`+t+r):a.push({i:n.push(i(n)+`skewX(`,null,r)-2,x:Pa(e,t)})}function c(e,t,n,r,a,o){if(e!==n||t!==r){var s=a.push(i(a)+`scale(`,null,`,`,null,`)`);o.push({i:s-4,x:Pa(e,n)},{i:s-2,x:Pa(t,r)})}else(n!==1||r!==1)&&a.push(i(a)+`scale(`+n+`,`+r+`)`)}return function(t,n){var r=[],i=[];return t=e(t),n=e(n),a(t.translateX,t.translateY,n.translateX,n.translateY,r,i),o(t.rotate,n.rotate,r,i),s(t.skewX,n.skewX,r,i),c(t.scaleX,t.scaleY,n.scaleX,n.scaleY,r,i),t=n=null,function(e){for(var t=-1,n=i.length,a;++t<n;)r[(a=i[t]).i]=a.x(e);return r.join(``)}}}var qa=Ka(Wa,`px, `,`px)`,`deg)`),Ja=Ka(Ga,`, `,`)`,`)`),Ya=1e-12;function Xa(e){return((e=Math.exp(e))+1/e)/2}function Za(e){return((e=Math.exp(e))-1/e)/2}function Qa(e){return((e=Math.exp(2*e))-1)/(e+1)}var $a=(function e(t,n,r){function i(e,i){var a=e[0],o=e[1],s=e[2],c=i[0],l=i[1],u=i[2],d=c-a,f=l-o,p=d*d+f*f,m,h;if(p<Ya)h=Math.log(u/s)/t,m=function(e){return[a+e*d,o+e*f,s*Math.exp(t*e*h)]};else{var g=Math.sqrt(p),_=(u*u-s*s+r*p)/(2*s*n*g),v=(u*u-s*s-r*p)/(2*u*n*g),y=Math.log(Math.sqrt(_*_+1)-_);h=(Math.log(Math.sqrt(v*v+1)-v)-y)/t,m=function(e){var r=e*h,i=Xa(y),c=s/(n*g)*(i*Qa(t*r+y)-Za(y));return[a+c*d,o+c*f,s*i/Xa(t*r+y)]}}return m.duration=h*1e3*t/Math.SQRT2,m}return i.rho=function(t){var n=Math.max(.001,+t),r=n*n;return e(n,r,r*r)},i})(Math.SQRT2,2,4),eo=0,to=0,no=0,ro=1e3,io,ao,oo=0,so=0,co=0,lo=typeof performance==`object`&&performance.now?performance:Date,uo=typeof window==`object`&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function fo(){return so||=(uo(po),lo.now()+co)}function po(){so=0}function mo(){this._call=this._time=this._next=null}mo.prototype=ho.prototype={constructor:mo,restart:function(e,t,n){if(typeof e!=`function`)throw TypeError(`callback is not a function`);n=(n==null?fo():+n)+(t==null?0:+t),!this._next&&ao!==this&&(ao?ao._next=this:io=this,ao=this),this._call=e,this._time=n,bo()},stop:function(){this._call&&(this._call=null,this._time=1/0,bo())}};function ho(e,t,n){var r=new mo;return r.restart(e,t,n),r}function go(){fo(),++eo;for(var e=io,t;e;)(t=so-e._time)>=0&&e._call.call(void 0,t),e=e._next;--eo}function _o(){so=(oo=lo.now())+co,eo=to=0;try{go()}finally{eo=0,yo(),so=0}}function vo(){var e=lo.now(),t=e-oo;t>ro&&(co-=t,oo=e)}function yo(){for(var e,t=io,n,r=1/0;t;)t._call?(r>t._time&&(r=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:io=n);ao=e,bo(r)}function bo(e){eo||(to&&=clearTimeout(to),e-so>24?(e<1/0&&(to=setTimeout(_o,e-lo.now()-co)),no&&=clearInterval(no)):(no||=(oo=lo.now(),setInterval(vo,ro)),eo=1,uo(_o)))}function xo(e,t,n){var r=new mo;return t=t==null?0:+t,r.restart(n=>{r.stop(),e(n+t)},t,n),r}var So=Li(`start`,`end`,`cancel`,`interrupt`),Co=[];function wo(e,t,n,r,i,a){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;Eo(e,n,{name:t,index:r,group:i,on:So,tween:Co,time:a.time,delay:a.delay,duration:a.duration,ease:a.ease,timer:null,state:0})}function To(e,t){var n=Y(e,t);if(n.state>0)throw Error(`too late; already scheduled`);return n}function J(e,t){var n=Y(e,t);if(n.state>3)throw Error(`too late; already running`);return n}function Y(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw Error(`transition not found`);return n}function Eo(e,t,n){var r=e.__transition,i;r[t]=n,n.timer=ho(a,0,n.time);function a(e){n.state=1,n.timer.restart(o,n.delay,n.time),n.delay<=e&&o(e-n.delay)}function o(a){var l,u,d,f;if(n.state!==1)return c();for(l in r)if(f=r[l],f.name===n.name){if(f.state===3)return xo(o);f.state===4?(f.state=6,f.timer.stop(),f.on.call(`interrupt`,e,e.__data__,f.index,f.group),delete r[l]):+l<t&&(f.state=6,f.timer.stop(),f.on.call(`cancel`,e,e.__data__,f.index,f.group),delete r[l])}if(xo(function(){n.state===3&&(n.state=4,n.timer.restart(s,n.delay,n.time),s(a))}),n.state=2,n.on.call(`start`,e,e.__data__,n.index,n.group),n.state===2){for(n.state=3,i=Array(d=n.tween.length),l=0,u=-1;l<d;++l)(f=n.tween[l].value.call(e,e.__data__,n.index,n.group))&&(i[++u]=f);i.length=u+1}}function s(t){for(var r=t<n.duration?n.ease.call(null,t/n.duration):(n.timer.restart(c),n.state=5,1),a=-1,o=i.length;++a<o;)i[a].call(e,r);n.state===5&&(n.on.call(`end`,e,e.__data__,n.index,n.group),c())}function c(){for(var i in n.state=6,n.timer.stop(),delete r[t],r)return;delete e.__transition}}function Do(e,t){var n=e.__transition,r,i,a=!0,o;if(n){for(o in t=t==null?null:t+``,n){if((r=n[o]).name!==t){a=!1;continue}i=r.state>2&&r.state<5,r.state=6,r.timer.stop(),r.on.call(i?`interrupt`:`cancel`,e,e.__data__,r.index,r.group),delete n[o]}a&&delete e.__transition}}function Oo(e){return this.each(function(){Do(this,e)})}function ko(e,t){var n,r;return function(){var i=J(this,e),a=i.tween;if(a!==n){r=n=a;for(var o=0,s=r.length;o<s;++o)if(r[o].name===t){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function Ao(e,t,n){var r,i;if(typeof n!=`function`)throw Error();return function(){var a=J(this,e),o=a.tween;if(o!==r){i=(r=o).slice();for(var s={name:t,value:n},c=0,l=i.length;c<l;++c)if(i[c].name===t){i[c]=s;break}c===l&&i.push(s)}a.tween=i}}function jo(e,t){var n=this._id;if(e+=``,arguments.length<2){for(var r=Y(this.node(),n).tween,i=0,a=r.length,o;i<a;++i)if((o=r[i]).name===e)return o.value;return null}return this.each((t==null?ko:Ao)(n,e,t))}function Mo(e,t,n){var r=e._id;return e.each(function(){var e=J(this,r);(e.value||={})[t]=n.apply(this,arguments)}),function(e){return Y(e,r).value[t]}}function No(e,t){var n;return(typeof t==`number`?Pa:t instanceof da?Na:(n=da(t))?(t=n,Na):za)(e,t)}function Po(e){return function(){this.removeAttribute(e)}}function Fo(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Io(e,t,n){var r,i=n+``,a;return function(){var o=this.getAttribute(e);return o===i?null:o===r?a:a=t(r=o,n)}}function Lo(e,t,n){var r,i=n+``,a;return function(){var o=this.getAttributeNS(e.space,e.local);return o===i?null:o===r?a:a=t(r=o,n)}}function Ro(e,t,n){var r,i,a;return function(){var o,s=n(this),c;return s==null?void this.removeAttribute(e):(o=this.getAttribute(e),c=s+``,o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s)))}}function zo(e,t,n){var r,i,a;return function(){var o,s=n(this),c;return s==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),c=s+``,o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s)))}}function Bo(e,t){var n=Ln(e),r=n===`transform`?Ja:No;return this.attrTween(e,typeof t==`function`?(n.local?zo:Ro)(n,r,Mo(this,`attr.`+e,t)):t==null?(n.local?Fo:Po)(n):(n.local?Lo:Io)(n,r,t))}function Vo(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Ho(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Uo(e,t){var n,r;function i(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Ho(e,i)),n}return i._value=t,i}function Wo(e,t){var n,r;function i(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Vo(e,i)),n}return i._value=t,i}function Go(e,t){var n=`attr.`+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!=`function`)throw Error();var r=Ln(e);return this.tween(n,(r.local?Uo:Wo)(r,t))}function Ko(e,t){return function(){To(this,e).delay=+t.apply(this,arguments)}}function qo(e,t){return t=+t,function(){To(this,e).delay=t}}function Jo(e){var t=this._id;return arguments.length?this.each((typeof e==`function`?Ko:qo)(t,e)):Y(this.node(),t).delay}function Yo(e,t){return function(){J(this,e).duration=+t.apply(this,arguments)}}function Xo(e,t){return t=+t,function(){J(this,e).duration=t}}function Zo(e){var t=this._id;return arguments.length?this.each((typeof e==`function`?Yo:Xo)(t,e)):Y(this.node(),t).duration}function Qo(e,t){if(typeof t!=`function`)throw Error();return function(){J(this,e).ease=t}}function $o(e){var t=this._id;return arguments.length?this.each(Qo(t,e)):Y(this.node(),t).ease}function es(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!=`function`)throw Error();J(this,e).ease=n}}function ts(e){if(typeof e!=`function`)throw Error();return this.each(es(this._id,e))}function ns(e){typeof e!=`function`&&(e=Yn(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=[],c,l=0;l<o;++l)(c=a[l])&&e.call(c,c.__data__,l,a)&&s.push(c);return new X(r,this._parents,this._name,this._id)}function rs(e){if(e._id!==this._id)throw Error();for(var t=this._groups,n=e._groups,r=t.length,i=n.length,a=Math.min(r,i),o=Array(r),s=0;s<a;++s)for(var c=t[s],l=n[s],u=c.length,d=o[s]=Array(u),f,p=0;p<u;++p)(f=c[p]||l[p])&&(d[p]=f);for(;s<r;++s)o[s]=t[s];return new X(o,this._parents,this._name,this._id)}function is(e){return(e+``).trim().split(/^|\s+/).every(function(e){var t=e.indexOf(`.`);return t>=0&&(e=e.slice(0,t)),!e||e===`start`})}function as(e,t,n){var r,i,a=is(t)?To:J;return function(){var o=a(this,e),s=o.on;s!==r&&(i=(r=s).copy()).on(t,n),o.on=i}}function os(e,t){var n=this._id;return arguments.length<2?Y(this.node(),n).on.on(e):this.each(as(n,e,t))}function ss(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function cs(){return this.on(`end.remove`,ss(this._id))}function ls(e){var t=this._name,n=this._id;typeof e!=`function`&&(e=Hn(e));for(var r=this._groups,i=r.length,a=Array(i),o=0;o<i;++o)for(var s=r[o],c=s.length,l=a[o]=Array(c),u,d,f=0;f<c;++f)(u=s[f])&&(d=e.call(u,u.__data__,f,s))&&(`__data__`in u&&(d.__data__=u.__data__),l[f]=d,wo(l[f],t,n,f,l,Y(u,n)));return new X(a,this._parents,t,n)}function us(e){var t=this._name,n=this._id;typeof e!=`function`&&(e=Kn(e));for(var r=this._groups,i=r.length,a=[],o=[],s=0;s<i;++s)for(var c=r[s],l=c.length,u,d=0;d<l;++d)if(u=c[d]){for(var f=e.call(u,u.__data__,d,c),p,m=Y(u,n),h=0,g=f.length;h<g;++h)(p=f[h])&&wo(p,t,n,h,f,m);a.push(f),o.push(u)}return new X(a,o,t,n)}var ds=ji.prototype.constructor;function fs(){return new ds(this._groups,this._parents)}function ps(e,t){var n,r,i;return function(){var a=zr(this,e),o=(this.style.removeProperty(e),zr(this,e));return a===o?null:a===n&&o===r?i:i=t(n=a,r=o)}}function ms(e){return function(){this.style.removeProperty(e)}}function hs(e,t,n){var r,i=n+``,a;return function(){var o=zr(this,e);return o===i?null:o===r?a:a=t(r=o,n)}}function gs(e,t,n){var r,i,a;return function(){var o=zr(this,e),s=n(this),c=s+``;return s??(c=s=(this.style.removeProperty(e),zr(this,e))),o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s))}}function _s(e,t){var n,r,i,a=`style.`+t,o=`end.`+a,s;return function(){var c=J(this,e),l=c.on,u=c.value[a]==null?s||=ms(t):void 0;(l!==n||i!==u)&&(r=(n=l).copy()).on(o,i=u),c.on=r}}function vs(e,t,n){var r=(e+=``)==`transform`?qa:No;return t==null?this.styleTween(e,ps(e,r)).on(`end.style.`+e,ms(e)):typeof t==`function`?this.styleTween(e,gs(e,r,Mo(this,`style.`+e,t))).each(_s(this._id,e)):this.styleTween(e,hs(e,r,t),n).on(`end.style.`+e,null)}function ys(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}function bs(e,t,n){var r,i;function a(){var a=t.apply(this,arguments);return a!==i&&(r=(i=a)&&ys(e,a,n)),r}return a._value=t,a}function xs(e,t,n){var r=`style.`+(e+=``);if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!=`function`)throw Error();return this.tween(r,bs(e,t,n??``))}function Ss(e){return function(){this.textContent=e}}function Cs(e){return function(){var t=e(this);this.textContent=t??``}}function ws(e){return this.tween(`text`,typeof e==`function`?Cs(Mo(this,`text`,e)):Ss(e==null?``:e+``))}function Ts(e){return function(t){this.textContent=e.call(this,t)}}function Es(e){var t,n;function r(){var r=e.apply(this,arguments);return r!==n&&(t=(n=r)&&Ts(r)),t}return r._value=e,r}function Ds(e){var t=`text`;if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!=`function`)throw Error();return this.tween(t,Es(e))}function Os(){for(var e=this._name,t=this._id,n=js(),r=this._groups,i=r.length,a=0;a<i;++a)for(var o=r[a],s=o.length,c,l=0;l<s;++l)if(c=o[l]){var u=Y(c,t);wo(c,e,n,l,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new X(r,this._parents,e,n)}function ks(){var e,t,n=this,r=n._id,i=n.size();return new Promise(function(a,o){var s={value:o},c={value:function(){--i===0&&a()}};n.each(function(){var n=J(this,r),i=n.on;i!==e&&(t=(e=i).copy(),t._.cancel.push(s),t._.interrupt.push(s),t._.end.push(c)),n.on=t}),i===0&&a()})}var As=0;function X(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function js(){return++As}var Z=ji.prototype;X.prototype={constructor:X,select:ls,selectAll:us,selectChild:Z.selectChild,selectChildren:Z.selectChildren,filter:ns,merge:rs,selection:fs,transition:Os,call:Z.call,nodes:Z.nodes,node:Z.node,size:Z.size,empty:Z.empty,each:Z.each,on:os,attr:Bo,attrTween:Go,style:vs,styleTween:xs,text:ws,textTween:Ds,remove:cs,tween:jo,delay:Jo,duration:Zo,ease:$o,easeVarying:ts,end:ks,[Symbol.iterator]:Z[Symbol.iterator]};function Ms(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var Ns={time:null,delay:0,duration:250,ease:Ms};function Ps(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw Error(`transition ${t} not found`);return n}function Fs(e){var t,n;e instanceof X?(t=e._id,e=e._name):(t=js(),(n=Ns).time=fo(),e=e==null?null:e+``);for(var r=this._groups,i=r.length,a=0;a<i;++a)for(var o=r[a],s=o.length,c,l=0;l<s;++l)(c=o[l])&&wo(c,e,t,l,o,n||Ps(c,t));return new X(r,this._parents,e,t)}ji.prototype.interrupt=Oo,ji.prototype.transition=Fs;var Is=e=>()=>e;function Ls(e,{sourceEvent:t,target:n,transform:r,dispatch:i}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:i}})}function Q(e,t,n){this.k=e,this.x=t,this.y=n}Q.prototype={constructor:Q,scale:function(e){return e===1?this:new Q(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Q(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return`translate(`+this.x+`,`+this.y+`) scale(`+this.k+`)`}};var Rs=new Q(1,0,0);zs.prototype=Q.prototype;function zs(e){for(;!e.__zoom;)if(!(e=e.parentNode))return Rs;return e.__zoom}function Bs(e){e.stopImmediatePropagation()}function Vs(e){e.preventDefault(),e.stopImmediatePropagation()}function Hs(e){return(!e.ctrlKey||e.type===`wheel`)&&!e.button}function Us(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute(`viewBox`)?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function Ws(){return this.__zoom||Rs}function Gs(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function Ks(){return navigator.maxTouchPoints||`ontouchstart`in this}function qs(e,t,n){var r=e.invertX(t[0][0])-n[0][0],i=e.invertX(t[1][0])-n[1][0],a=e.invertY(t[0][1])-n[0][1],o=e.invertY(t[1][1])-n[1][1];return e.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),o>a?(a+o)/2:Math.min(0,a)||Math.max(0,o))}function Js(){var e=Hs,t=Us,n=qs,r=Gs,i=Ks,a=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],s=250,c=$a,l=Li(`start`,`zoom`,`end`),u,d,f,p=500,m=150,h=0,g=10;function _(e){e.property(`__zoom`,Ws).on(`wheel.zoom`,te,{passive:!1}).on(`mousedown.zoom`,ne).on(`dblclick.zoom`,re).filter(i).on(`touchstart.zoom`,ie).on(`touchmove.zoom`,C).on(`touchend.zoom touchcancel.zoom`,w).style(`-webkit-tap-highlight-color`,`rgba(0,0,0,0)`)}_.transform=function(e,t,n,r){var i=e.selection?e.selection():e;i.property(`__zoom`,Ws),e===i?i.interrupt().each(function(){S(this,arguments).event(r).start().zoom(null,typeof t==`function`?t.apply(this,arguments):t).end()}):x(e,t,n,r)},_.scaleBy=function(e,t,n,r){_.scaleTo(e,function(){return this.__zoom.k*(typeof t==`function`?t.apply(this,arguments):t)},n,r)},_.scaleTo=function(e,r,i,a){_.transform(e,function(){var e=t.apply(this,arguments),a=this.__zoom,s=i==null?b(e):typeof i==`function`?i.apply(this,arguments):i,c=a.invert(s),l=typeof r==`function`?r.apply(this,arguments):r;return n(y(v(a,l),s,c),e,o)},i,a)},_.translateBy=function(e,r,i,a){_.transform(e,function(){return n(this.__zoom.translate(typeof r==`function`?r.apply(this,arguments):r,typeof i==`function`?i.apply(this,arguments):i),t.apply(this,arguments),o)},null,a)},_.translateTo=function(e,r,i,a,s){_.transform(e,function(){var e=t.apply(this,arguments),s=this.__zoom,c=a==null?b(e):typeof a==`function`?a.apply(this,arguments):a;return n(Rs.translate(c[0],c[1]).scale(s.k).translate(typeof r==`function`?-r.apply(this,arguments):-r,typeof i==`function`?-i.apply(this,arguments):-i),e,o)},a,s)};function v(e,t){return t=Math.max(a[0],Math.min(a[1],t)),t===e.k?e:new Q(t,e.x,e.y)}function y(e,t,n){var r=t[0]-n[0]*e.k,i=t[1]-n[1]*e.k;return r===e.x&&i===e.y?e:new Q(e.k,r,i)}function b(e){return[(+e[0][0]+ +e[1][0])/2,(+e[0][1]+ +e[1][1])/2]}function x(e,n,r,i){e.on(`start.zoom`,function(){S(this,arguments).event(i).start()}).on(`interrupt.zoom end.zoom`,function(){S(this,arguments).event(i).end()}).tween(`zoom`,function(){var e=this,a=arguments,o=S(e,a).event(i),s=t.apply(e,a),l=r==null?b(s):typeof r==`function`?r.apply(e,a):r,u=Math.max(s[1][0]-s[0][0],s[1][1]-s[0][1]),d=e.__zoom,f=typeof n==`function`?n.apply(e,a):n,p=c(d.invert(l).concat(u/d.k),f.invert(l).concat(u/f.k));return function(e){if(e===1)e=f;else{var t=p(e),n=u/t[2];e=new Q(n,l[0]-t[0]*n,l[1]-t[1]*n)}o.zoom(null,e)}})}function S(e,t,n){return!n&&e.__zooming||new ee(e,t)}function ee(e,n){this.that=e,this.args=n,this.active=0,this.sourceEvent=null,this.extent=t.apply(e,n),this.taps=0}ee.prototype={event:function(e){return e&&(this.sourceEvent=e),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit(`start`)),this},zoom:function(e,t){return this.mouse&&e!==`mouse`&&(this.mouse[1]=t.invert(this.mouse[0])),this.touch0&&e!==`touch`&&(this.touch0[1]=t.invert(this.touch0[0])),this.touch1&&e!==`touch`&&(this.touch1[1]=t.invert(this.touch1[0])),this.that.__zoom=t,this.emit(`zoom`),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit(`end`)),this},emit:function(e){var t=Ni(this.that).datum();l.call(e,this.that,new Ls(e,{sourceEvent:this.sourceEvent,target:_,type:e,transform:this.that.__zoom,dispatch:l}),t)}};function te(t,...i){if(!e.apply(this,arguments))return;var s=S(this,i).event(t),c=this.__zoom,l=Math.max(a[0],Math.min(a[1],c.k*2**r.apply(this,arguments))),u=Fi(t);if(s.wheel)(s.mouse[0][0]!==u[0]||s.mouse[0][1]!==u[1])&&(s.mouse[1]=c.invert(s.mouse[0]=u)),clearTimeout(s.wheel);else if(c.k===l)return;else s.mouse=[u,c.invert(u)],Do(this),s.start();Vs(t),s.wheel=setTimeout(d,m),s.zoom(`mouse`,n(y(v(c,l),s.mouse[0],s.mouse[1]),s.extent,o));function d(){s.wheel=null,s.end()}}function ne(t,...r){if(f||!e.apply(this,arguments))return;var i=t.currentTarget,a=S(this,r,!0).event(t),s=Ni(t.view).on(`mousemove.zoom`,d,!0).on(`mouseup.zoom`,p,!0),c=Fi(t,i),l=t.clientX,u=t.clientY;Wi(t.view),Bs(t),a.mouse=[c,this.__zoom.invert(c)],Do(this),a.start();function d(e){if(Vs(e),!a.moved){var t=e.clientX-l,r=e.clientY-u;a.moved=t*t+r*r>h}a.event(e).zoom(`mouse`,n(y(a.that.__zoom,a.mouse[0]=Fi(e,i),a.mouse[1]),a.extent,o))}function p(e){s.on(`mousemove.zoom mouseup.zoom`,null),Gi(e.view,a.moved),Vs(e),a.event(e).end()}}function re(r,...i){if(e.apply(this,arguments)){var a=this.__zoom,c=Fi(r.changedTouches?r.changedTouches[0]:r,this),l=a.invert(c),u=a.k*(r.shiftKey?.5:2),d=n(y(v(a,u),c,l),t.apply(this,i),o);Vs(r),s>0?Ni(this).transition().duration(s).call(x,d,c,r):Ni(this).call(_.transform,d,c,r)}}function ie(t,...n){if(e.apply(this,arguments)){var r=t.touches,i=r.length,a=S(this,n,t.changedTouches.length===i).event(t),o,s,c,l;for(Bs(t),s=0;s<i;++s)c=r[s],l=Fi(c,this),l=[l,this.__zoom.invert(l),c.identifier],a.touch0?!a.touch1&&a.touch0[2]!==l[2]&&(a.touch1=l,a.taps=0):(a.touch0=l,o=!0,a.taps=1+!!u);u&&=clearTimeout(u),o&&(a.taps<2&&(d=l[0],u=setTimeout(function(){u=null},p)),Do(this),a.start())}}function C(e,...t){if(this.__zooming){var r=S(this,t).event(e),i=e.changedTouches,a=i.length,s,c,l,u;for(Vs(e),s=0;s<a;++s)c=i[s],l=Fi(c,this),r.touch0&&r.touch0[2]===c.identifier?r.touch0[0]=l:r.touch1&&r.touch1[2]===c.identifier&&(r.touch1[0]=l);if(c=r.that.__zoom,r.touch1){var d=r.touch0[0],f=r.touch0[1],p=r.touch1[0],m=r.touch1[1],h=(h=p[0]-d[0])*h+(h=p[1]-d[1])*h,g=(g=m[0]-f[0])*g+(g=m[1]-f[1])*g;c=v(c,Math.sqrt(h/g)),l=[(d[0]+p[0])/2,(d[1]+p[1])/2],u=[(f[0]+m[0])/2,(f[1]+m[1])/2]}else if(r.touch0)l=r.touch0[0],u=r.touch0[1];else return;r.zoom(`touch`,n(y(c,l,u),r.extent,o))}}function w(e,...t){if(this.__zooming){var n=S(this,t).event(e),r=e.changedTouches,i=r.length,a,o;for(Bs(e),f&&clearTimeout(f),f=setTimeout(function(){f=null},p),a=0;a<i;++a)o=r[a],n.touch0&&n.touch0[2]===o.identifier?delete n.touch0:n.touch1&&n.touch1[2]===o.identifier&&delete n.touch1;if(n.touch1&&!n.touch0&&(n.touch0=n.touch1,delete n.touch1),n.touch0)n.touch0[1]=this.__zoom.invert(n.touch0[0]);else if(n.end(),n.taps===2&&(o=Fi(o,this),Math.hypot(d[0]-o[0],d[1]-o[1])<g)){var s=Ni(this).on(`dblclick.zoom`);s&&s.apply(this,arguments)}}}return _.wheelDelta=function(e){return arguments.length?(r=typeof e==`function`?e:Is(+e),_):r},_.filter=function(t){return arguments.length?(e=typeof t==`function`?t:Is(!!t),_):e},_.touchable=function(e){return arguments.length?(i=typeof e==`function`?e:Is(!!e),_):i},_.extent=function(e){return arguments.length?(t=typeof e==`function`?e:Is([[+e[0][0],+e[0][1]],[+e[1][0],+e[1][1]]]),_):t},_.scaleExtent=function(e){return arguments.length?(a[0]=+e[0],a[1]=+e[1],_):[a[0],a[1]]},_.translateExtent=function(e){return arguments.length?(o[0][0]=+e[0][0],o[1][0]=+e[1][0],o[0][1]=+e[0][1],o[1][1]=+e[1][1],_):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},_.constrain=function(e){return arguments.length?(n=e,_):n},_.duration=function(e){return arguments.length?(s=+e,_):s},_.interpolate=function(e){return arguments.length?(c=e,_):c},_.on=function(){var e=l.on.apply(l,arguments);return e===l?_:e},_.clickDistance=function(e){return arguments.length?(h=(e=+e)*e,_):Math.sqrt(h)},_.tapDistance=function(e){return arguments.length?(g=+e,_):g},_}var Ys=(e,t)=>Math.hypot(t[0]-e[0],t[1]-e[1]),Xs=(e,t)=>[(e[0]+t[0])/2,(e[1]+t[1])/2],Zs=(e,t,n)=>Ys(e,t)<=n,Qs=(e,t,n)=>Math.min(Math.max(e,t),n);function $s(e,t){let n=re({x:0,y:0,k:1}),r=re(!1),i=re(!1),o=null,s=null,c=null,l=!1,u=e=>{e.code===`Space`&&!jn(e.target)&&!(e.target instanceof HTMLButtonElement)&&(r.value=!0,e.preventDefault())},d=e=>{e.code===`Space`&&(r.value=!1)},f=()=>{r.value=!1},p=e=>{e.button===1&&e.preventDefault()},m=e=>{if(!e.shiftKey&&!e.altKey)return;let t=e.deltaX===0?e.deltaY:e.deltaX,n=e.deltaMode===WheelEvent.DOM_DELTA_LINE?t*16:t;y(e.shiftKey?n:0,e.shiftKey?0:n),e.preventDefault()},h=e=>{e.button===2&&(c=[e.clientX,e.clientY],l=!1)},g=e=>{!c||l||(l=Ys([e.clientX,e.clientY],c)>4)},_=()=>{c=null},v=e=>{l&&(l=!1,e.preventDefault(),e.stopPropagation())};Xe(()=>{let a=e.value;a&&(o=Js().scaleExtent([se,8]).filter(e=>{if(e.type===`wheel`){let t=e;return!t.shiftKey&&!t.altKey}if(e.type.startsWith(`touch`))return!0;let n=e;return n.button===1||n.button===2&&t?.rightDragPan===!0||n.button===0&&(t?.dragPan===!0||r.value)}).on(`start`,e=>{i.value=e.sourceEvent?.type===`mousedown`}).on(`zoom`,e=>{n.value={x:e.transform.x,y:e.transform.y,k:e.transform.k}}).on(`end`,()=>{i.value=!1}),s=Ni(a),s.call(o),a.addEventListener(`pointerdown`,p),a.addEventListener(`wheel`,m,{passive:!1}),t?.rightDragPan===!0&&(a.addEventListener(`pointerdown`,h),window.addEventListener(`pointermove`,g),window.addEventListener(`pointerup`,_),window.addEventListener(`pointercancel`,_),window.addEventListener(`contextmenu`,v,!0)),window.addEventListener(`keydown`,u),window.addEventListener(`keyup`,d),window.addEventListener(`blur`,f))}),We(()=>{s?.on(`.zoom`,null),e.value?.removeEventListener(`pointerdown`,p),e.value?.removeEventListener(`wheel`,m),e.value?.removeEventListener(`pointerdown`,h),window.removeEventListener(`pointermove`,g),window.removeEventListener(`pointerup`,_),window.removeEventListener(`pointercancel`,_),window.removeEventListener(`contextmenu`,v,!0),window.removeEventListener(`keydown`,u),window.removeEventListener(`keyup`,d),window.removeEventListener(`blur`,f)});function y(e,t){o&&s&&o.translateBy(s,-e/n.value.k,-t/n.value.k)}function b(e){o&&s&&o.scaleBy(s,e)}function x(){o&&s&&s.call(o.transform,Rs)}function S(t){let n=e.value;if(!n||!o||!s)return;let r=n.getBoundingClientRect(),i=t.max[0]-t.min[0],c=t.max[1]-t.min[1];if(r.width===0||r.height===0||i<=0||c<=0)return;let l=Qs(Math.min(r.width/i,r.height/c)*a,se,8),u=[(t.min[0]+t.max[0])/2,(t.min[1]+t.max[1])/2];s.call(o.transform,Rs.translate(r.width/2,r.height/2).scale(l).translate(-u[0],-u[1]))}return{transform:te(n),isSpacePanning:te(r),isPanning:te(i),resetView:x,fitBounds:S,zoomBy:b,panBy:y}}function ec(e,t){return!e||e.floor!==t?[]:(e.info?.images??[]).flatMap(e=>e.camera?[e.camera]:[])}var tc=/^[A-Za-z]$/,nc=/[A-Za-z]|-?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/g,rc=/^[MmLlHhVvZz0-9eE+,.\s-]*$/,$=e=>String(Math.round(e*1e3)/1e3),ic={L:([e,t],n,r)=>r?[e,t]:[n[0]+e,n[1]+t],H:([e],t,n)=>n?[e,t[1]]:[t[0]+e,t[1]],V:([e],t,n)=>n?[t[0],e]:[t[0],t[1]+e]};function ac(e){if(!rc.test(e))return null;let t=e.match(nc);if(!t||t.length===0)return null;let n=[[0,0]],r=[0,0],i=!1,a=!1,o=0,s=()=>o<t.length&&!tc.test(t[o]),c=e=>{let n=[];for(;n.length<e;){if(!s())return null;let e=Number(t[o]);if(o+=1,!Number.isFinite(e))return null;n.push(e)}return n},l=e=>{r=e,n.push(e),a=!0};for(;o<t.length;){if(i)return null;let e=t[o];if(!tc.test(e))return null;o+=1;let u=e.toUpperCase(),d=e===u;if(u===`M`){if(a)return null;let e=c(2);if(!e)return null;for(r=d?[e[0],e[1]]:[r[0]+e[0],r[1]+e[1]],n[0]=r;s();){let e=c(2);if(!e)return null;l(ic.L(e,r,d))}}else if(u===`L`||u===`H`||u===`V`)do{let e=c(u===`L`?2:1);if(!e)return null;l(ic[u](e,r,d))}while(s());else if(u===`Z`)i=!0;else return null}return{points:n,closed:i}}function oc(e){let t=ac(e);if(!t||t.points.length<3)return null;let n=t.points,r=n[0],i=n[n.length-1];return n.length>3&&r[0]===i[0]&&r[1]===i[1]&&n.pop(),n}function sc(e){let t=ac(e);return!t||t.closed||t.points.length<2?null:t.points}function cc(e){let t=[];for(let n=1;n<e.length;n+=1){let r=e[n][0]-e[n-1][0],i=e[n][1]-e[n-1][1];(r!==0||i!==0)&&(i===0?t.push(`h${$(r)}`):r===0?t.push(`v${$(i)}`):t.push(`l${$(r)},${$(i)}`))}return t}function lc(e){let t=e[0];return[...t[0]!==0||t[1]!==0?[`M${$(t[0])},${$(t[1])}`]:[],...cc(e),`z`].join(` `)}function uc(e){return e.length===0?``:[`M${$(e[0][0])},${$(e[0][1])}`,...cc(e)].join(` `)}var dc=/^\s*M\s*(-?(?:\d*\.\d+|\d+))[\s,]+(-?(?:\d*\.\d+|\d+))([\s\S]*)$/;function fc(e){let t=dc.exec(e);return!t||/[MLHVCSQTA]/.test(t[3])?null:{start:[Number(t[1]),Number(t[2])],rest:t[3]}}function pc(e){return fc(e)?.start??null}function mc(e,t){let n=fc(e);return n?`M${$(n.start[0]+t[0])},${$(n.start[1]+t[1])}${n.rest}`:null}function hc(e){if(`rect`in e){let[t,n]=e.rect;return[[0,0],[t,0],[t,n],[0,n]]}return oc(e.path)}function gc(e){let t=[1/0,1/0],n=[-1/0,-1/0];for(let[r,i]of e)t[0]=Math.min(t[0],r),t[1]=Math.min(t[1],i),n[0]=Math.max(n[0],r),n[1]=Math.max(n[1],i);return{min:t,max:n}}function _c(e){return(hc(e.shape)??[]).map(([t,n])=>[t+e.shape.origin[0],n+e.shape.origin[1]])}function vc(e){let t=e.flatMap(_c);return t.length>0?gc(t):null}var yc=[`transform`],bc=[`d`],xc=[`r`],Sc=F(N({__name:`CameraMarker`,props:{camera:{}},setup(e){return(t,n)=>(k(),j(`g`,{transform:`translate(${e.camera.pos[0]},${e.camera.pos[1]}) rotate(${e.camera.rotation})`,class:`camera-marker`},[A(`path`,{d:`M0,0 L${b(8)},${-b(8)/2} L${b(8)},${b(8)/2} Z`,class:`camera-cone`},null,8,bc),A(`circle`,{r:b(8)/4,class:`camera-dot`},null,8,xc)],8,yc))}}),[[`__scopeId`,`data-v-3c1f1b22`]]);function Cc(e){let t=re(!1);return ke(e,()=>{t.value=!1}),{showIcon:I(()=>!!e.value&&!t.value),onIconError:()=>{t.value=!0}}}var wc={class:`callout-marker`},Tc=[`x1`,`y1`,`x2`,`y2`,`stroke`,`stroke-width`,`stroke-dasharray`],Ec=[`cx`,`cy`,`r`,`fill`],Dc=[`transform`],Oc=[`d`],kc=[`d`,`stroke`],Ac=[`href`,`x`,`y`,`width`,`height`],jc=[`d`,`fill`],Mc=[`y`,`font-size`],Nc=F(N({__name:`CalloutMarker`,props:{marker:{},pos:{}},setup(t){let n=t,r=I(()=>[n.pos[0]+n.marker.offset[0],n.pos[1]+n.marker.offset[1]]),i=I(()=>n.marker.color??`#aaaaaa`),a=I(()=>n.marker.lineColor??i.value),o=I(()=>n.marker.lineDashed?`3 2`:void 0),s=I(()=>`label`in n.marker?n.marker.label:null),c=I(()=>`icon`in n.marker?we(n.marker.icon):void 0),{showIcon:l,onIconError:u}=Cc(c);function d(e){return`M0,${-e} l${e},${e} l${-e},${e} l${-e},${-e} z`}let f=d(5),p=d(3);return(n,d)=>(k(),j(`g`,wc,[A(`line`,{x1:t.pos[0],y1:t.pos[1],x2:r.value[0],y2:r.value[1],stroke:a.value,"stroke-width":b(Oe),"stroke-dasharray":o.value},null,8,Tc),A(`circle`,{cx:t.pos[0],cy:t.pos[1],r:b(1),fill:i.value},null,8,Ec),A(`g`,{transform:`translate(${r.value[0]},${r.value[1]})`},[A(`path`,{d:b(f),class:`badge-plate`},null,8,Oc),A(`path`,{d:b(f),stroke:i.value,class:`badge-ring`},null,8,kc),b(l)?(k(),j(`image`,{key:0,href:c.value,x:-b(5)/2,y:-b(5)/2,width:b(5),height:b(5),onError:d[0]||=(...e)=>b(u)&&b(u)(...e)},null,40,Ac)):(k(),j(O,{key:1},[A(`path`,{d:b(p),fill:i.value},null,8,jc),s.value===null?L(``,!0):(k(),j(`text`,{key:0,y:b(e),"font-size":b(5),class:`badge-label`},E(s.value),9,Mc))],64))],8,Dc)]))}}),[[`__scopeId`,`data-v-8d7da3ae`]]);function Pc(e){return e?e.split(/\s+/).slice(0,2).map(e=>e[0]?.toUpperCase()??``).join(``):`?`}var Fc={door:{resizable:!0,anchor:`center`,fill:`element`},"double-door":{resizable:!0,anchor:`center`,fill:`element`},"barricaded-door":{resizable:!0,anchor:`center`,fill:`element`},window:{resizable:!0,anchor:`center`,fill:`element`},"crawl-passage":{resizable:!0,anchor:`center`,fill:`element`},obstacle:{resizable:!0,anchor:`center`,fill:`element`},stairs:{resizable:!0,anchor:`center`,fill:`element`},"spawn-room":{resizable:!1,anchor:`edge`,fill:`neutral`}};function Ic(e){let[t,n]=e.pos,r=e.rotation??0;return r?`translate(${t},${n}) rotate(${r})`:`translate(${t},${n})`}function Lc(e,t){return`M${-e/2},${-t/2} h${e} v${t} h${-e} z`}function Rc(e){return`M0,${-e/2} v${e}`}function zc(e){return`M${-e/2},0 h${e}`}function Bc(e){return-e/2-ge-2}function Vc(e,t){let n=e+4;return`M${-n/2},${Bc(t)} h${n} v2 h${-n} z`}function Hc(e,t){let n=e+4,r=Bc(t),i=Math.max(1,Math.floor(n/2));return Array.from({length:i},(e,t)=>{let i=-n/2+t*2,a=Math.min(2,n/2-i);return`M${i},${r} l${a},${a}`}).join(` `)}function Uc(e,t){let n=Math.max(1,Math.floor(e/Ue)),r=e/n;return Array.from({length:n},(n,i)=>`M${-e/2+i*r},${-t/2} l${r},${t}`).join(` `)}function Wc(e,t){let n=t*.3,r=Ee*.45,i=[];for(let a=-e/2+r;a+r<=e/2;a+=Ee)i.push(`M${a},${-t/2} h${r} v${n} h${-r} z`);return i.join(` `)}function Gc(e,t){let n=e*.18,r=Math.min(2,e*.08),i=-t*.2,a=t*.3,o=e=>`M${e-r},${i} L${e},${a} L${e+r},${i}`;return`${o(-n)} ${o(n)}`}function Kc(e,t){let n=[];for(let r=-e/2+3;r<e/2;r+=3)n.push(`M${r},${-t/2} v${t}`);return n.join(` `)}function qc(e,t,n){let r=n?1:-1,i=r*(e/2+t*.6),a=r*(e/2+.5),o=t*.4;return`M${a},${-o} L${i},0 L${a},${o}`}function Jc(e,t){return`M${-e/2},0 v${-t} h${e} v${t} z`}function Yc(e,t){return`M${-e/2},0 v${-t} h${e} v${t}`}var Xc=[`transform`,`data-entity-id`],Zc=[`href`,`x`,`y`,`width`,`height`],Qc=[`cx`,`cy`,`r`,`fill`],$c=[`x`,`y`,`font-size`],el=[`cx`,`cy`,`r`,`stroke`],tl=F(N({__name:`PlacementIcon`,props:{placement:{},element:{},selected:{type:Boolean}},setup(e){let t=e,n=I(()=>we(t.element?.icon)),{showIcon:r,onIconError:i}=Cc(n),a=I(()=>t.element?.size??10),o=I(()=>t.element?.anchor===`topleft`?[a.value/2,a.value/2]:[0,0]),s=I(()=>Pc(t.element?.name)),c=I(()=>Ic(t.placement));return(t,l)=>(k(),j(`g`,{transform:c.value,"data-entity-kind":`placement`,"data-entity-id":e.placement.id,class:`placement`},[b(r)?(k(),j(`image`,{key:0,href:n.value,x:o.value[0]-a.value/2,y:o.value[1]-a.value/2,width:a.value,height:a.value,onError:l[0]||=(...e)=>b(i)&&b(i)(...e)},null,40,Zc)):(k(),j(O,{key:1},[A(`circle`,{cx:o.value[0],cy:o.value[1],r:a.value/2,fill:e.element?.color??b(`#7f8c8d`),class:`placeholder`},null,8,Qc),A(`text`,{x:o.value[0],y:o.value[1],"font-size":a.value*b(S),class:`placeholder-initials`},E(s.value),9,$c)],64)),e.selected?(k(),j(`circle`,{key:2,cx:o.value[0],cy:o.value[1],r:a.value/2+b(2),class:`selection-ring`,stroke:b(y)},null,8,el)):L(``,!0)],8,Xc))}}),[[`__scopeId`,`data-v-e27498bb`]]),nl=[`transform`,`data-entity-id`],rl=[`d`,`fill`],il=[`d`],al=[`d`,`fill`],ol=[`d`,`fill`],sl=[`d`],cl=[`d`,`fill`],ll=[`d`],ul=[`d`,`fill`],dl=[`d`],fl=[`d`,`fill`],pl=[`d`],ml=[`d`],hl=[`d`,`fill`],gl=[`d`],_l=[`d`],vl=[`d`],yl=[`d`,`stroke-width`],bl=[`href`,`x`,`y`,`width`,`height`],xl=[`stroke`],Sl=F(N({__name:`StructuralMarker`,props:{placement:{},element:{},selected:{type:Boolean}},setup(e){let t=e,n=I(()=>we(t.element.icon)),{showIcon:r,onIconError:i}=Cc(n),a=I(()=>t.element.render?.kind),o=I(()=>a.value?Fc[a.value]:void 0),s=I(()=>{let e=t.element.render,n={length:e?.length??0,thickness:e?.thickness??0};return o.value?.resizable?{length:t.placement.size?.[0]??n.length,thickness:t.placement.size?.[1]??n.thickness}:n}),c=I(()=>Lc(s.value.length,s.value.thickness)),l=I(()=>t.placement.props?.direction!==`down`),u=I(()=>o.value?.fill===`element`?t.element.color:void 0),d=I(()=>Ic(t.placement)),f=I(()=>{let e=n.value;if(!r.value||!e)return;let i=t.element.size??10,a=o.value?.anchor===`edge`?-s.value.thickness/2:0;return{url:e,size:i,x:-i/2,y:a-i/2}}),p=I(()=>{let{length:e,thickness:t}=s.value;return{x:-e/2-2,y:(o.value?.anchor===`edge`?-t:-t/2)-2,width:e+4,height:t+4}});return(t,n)=>(k(),j(`g`,{transform:d.value,"data-entity-kind":`placement`,"data-entity-id":e.placement.id,class:`structural`},[a.value===`door`||a.value===`double-door`?(k(),j(O,{key:0},[A(`path`,{d:c.value,fill:u.value,class:`body`},null,8,rl),a.value===`double-door`?(k(),j(`path`,{key:0,d:b(Rc)(s.value.thickness),class:`door-seam`},null,8,il)):L(``,!0)],64)):a.value===`barricaded-door`?(k(),j(O,{key:1},[A(`path`,{d:c.value,fill:u.value,class:`body`},null,8,al),A(`path`,{d:b(Vc)(s.value.length,s.value.thickness),fill:u.value,class:`barricade-plank`},null,8,ol),A(`path`,{d:b(Hc)(s.value.length,s.value.thickness),class:`barricade-hatch`},null,8,sl)],64)):a.value===`window`?(k(),j(O,{key:2},[A(`path`,{d:c.value,fill:u.value,class:`body`},null,8,cl),A(`path`,{d:b(zc)(s.value.length),class:`window-mullion`},null,8,ll)],64)):a.value===`crawl-passage`?(k(),j(O,{key:3},[A(`path`,{d:c.value,fill:u.value,class:`body`},null,8,ul),A(`path`,{d:b(Uc)(s.value.length,s.value.thickness),class:`crawl-bars`},null,8,dl)],64)):a.value===`obstacle`?(k(),j(O,{key:4},[A(`path`,{d:c.value,fill:u.value},null,8,fl),A(`path`,{d:b(Wc)(s.value.length,s.value.thickness),class:`obstacle-decor`},null,8,pl),A(`path`,{d:b(Gc)(s.value.length,s.value.thickness),class:`obstacle-chevrons`},null,8,ml)],64)):a.value===`stairs`?(k(),j(O,{key:5},[A(`path`,{d:c.value,fill:u.value,class:`stairs`},null,8,hl),A(`path`,{d:b(Kc)(s.value.length,s.value.thickness),class:`stairs-rungs`},null,8,gl),A(`path`,{d:b(qc)(s.value.length,s.value.thickness,l.value),class:`stairs-arrow`},null,8,_l)],64)):a.value===`spawn-room`?(k(),j(O,{key:6},[A(`path`,{d:b(Jc)(s.value.length,s.value.thickness),class:`spawn-floor`},null,8,vl),A(`path`,{d:b(Yc)(s.value.length,s.value.thickness),"stroke-width":b(ee),class:`spawn-walls`},null,8,yl)],64)):L(``,!0),f.value?(k(),j(`image`,{key:7,href:f.value.url,x:f.value.x,y:f.value.y,width:f.value.size,height:f.value.size,onError:n[0]||=(...e)=>b(i)&&b(i)(...e)},null,40,bl)):L(``,!0),e.selected?(k(),j(`rect`,D({key:8},p.value,{class:`selection-outline`,stroke:b(y)}),null,16,xl)):L(``,!0)],8,nl))}}),[[`__scopeId`,`data-v-309193e0`]]),Cl=N({__name:`PlacementMarker`,props:{placement:{},element:{},selected:{type:Boolean}},setup(e){let t=e,n=I(()=>t.element?.render?t.element:void 0);return(t,r)=>n.value?(k(),P(Sl,{key:0,placement:e.placement,element:n.value,selected:e.selected},null,8,[`placement`,`element`,`selected`])):(k(),P(tl,{key:1,placement:e.placement,element:e.element,selected:e.selected},null,8,[`placement`,`element`,`selected`]))}}),wl=(e,t)=>e[0]===t[0]&&e[1]===t[1];function Tl(e){return e.map((t,n)=>[t,e[(n+1)%e.length]])}function El([e,t]){return Ys(e,t)}function Dl([e,t],n){let r=El([e,t]);if(r===0)return[e[0],e[1]];let i=n/r;return[e[0]+(t[0]-e[0])*i,e[1]+(t[1]-e[1])*i]}function Ol([e,t],n){let r=t[0]-e[0],i=t[1]-e[1],a=r*r+i*i;return a===0?0:Qs(((n[0]-e[0])*r+(n[1]-e[1])*i)/a,0,1)*Math.sqrt(a)}function kl(e,t){return Ys(t,Dl(e,Ol(e,t)))}function Al(e,t){let n=Tl(e);if(t.edge>=n.length)return null;let r=n[t.edge];return[Dl(r,t.start),Dl(r,t.start+t.length)]}function jl(e,t,n){let r=e.filter(e=>e.edge===t).map(e=>({start:Math.max(0,Math.min(e.start,n)),end:Math.max(0,Math.min(e.start+e.length,n))})).filter(e=>e.end>e.start).sort((e,t)=>e.start-t.start),i=[];for(let e of r){let t=i[i.length-1];t&&e.start<=t.end?t.end=Math.max(t.end,e.end):i.push({...e})}return i}function Ml(e,t){let[n,...r]=e,i=r.map(e=>`L${$(e[0])},${$(e[1])}`).join(``);return`M${$(n[0])},${$(n[1])}${i}${t?` z`:``}`}function Nl(e,t){let n=Tl(e),r=[],i=[n[0][0]],a=()=>{i.length>=2&&r.push(i)};if(n.forEach((e,n)=>{let r=El(e),o=0;for(let s of jl(t,n,r))s.start>o&&i.push(Dl(e,s.start)),a(),i=[Dl(e,s.end)],o=s.end;o<r&&i.push(e[1])}),a(),r.length===0)return``;let o=r[0],s=r[r.length-1];return r.length===1?wl(o[0],o[o.length-1])?Ml(o.slice(0,-1),!0):Ml(o,!1):(wl(s[s.length-1],o[0])&&(r[0]=[...s,...o.slice(1)],r.pop()),r.map(e=>Ml(e,!1)).join(` `))}function Pl(e,t){t.length===0?delete e.wallGaps:e.wallGaps=t}function Fl(e,t,n){let r=Tl(e);return t.flatMap(e=>{if(e.edge>=r.length)return[];let t=r[e.edge],i=El(t),a=Qs(e.start,0,i),o=Math.min(e.length,i-a);return o>=n?[{edge:e.edge,start:a,length:o}]:[]})}function Il(e,t){return e.map(e=>e.edge>t?{...e,edge:e.edge+1}:e)}function Ll(e,t){return e.flatMap(e=>e.edge===t?[]:[e.edge>t?{...e,edge:e.edge-1}:e])}var Rl=[`transform`,`opacity`,`data-entity-id`],zl=[`d`,`fill`],Bl=[`d`,`stroke`,`stroke-width`],Vl=[`d`],Hl=[`x`,`y`,`font-size`],Ul=[`d`,`stroke`],Wl=F(N({__name:`RoomShape`,props:{room:{},zone:{},selected:{type:Boolean}},setup(e){let t=e,n=I(()=>new Set(t.room.flags??[])),i=I(()=>{let e=t.room.shape;if(`rect`in e){let[t,n]=e.rect;return`M0,0 h${t} v${n} h${-t} z`}return`M0,0 ${e.path}`}),a=I(()=>n.value.has(`secret`)?h:t.zone?.fill??`#4a4a4a`),o=I(()=>t.zone?.walls??`#111111`),s=I(()=>n.value.has(`disabled`)?Ye:1),c=I(()=>{if(n.value.has(`noWalls`))return null;let e=t.room.wallGaps;if(!e?.length)return i.value;let r=hc(t.room.shape);return r?Nl(r,e):i.value});return(t,n)=>(k(),j(`g`,{transform:`translate(${e.room.shape.origin[0]},${e.room.shape.origin[1]})`,opacity:s.value,style:r({color:o.value}),"data-entity-kind":`room`,"data-entity-id":e.room.id},[A(`path`,{d:i.value,fill:a.value,stroke:`none`},null,8,zl),c.value?(k(),j(`path`,{key:0,d:c.value,fill:`none`,stroke:o.value,"stroke-width":b(ee),"stroke-linejoin":`miter`},null,8,Bl)):L(``,!0),(k(!0),j(O,null,R(e.room.innerLines,(e,t)=>(k(),j(`path`,{key:t,d:`M0,0 ${e.path}`,class:w([`inner-line`,`inner-${e.style}`])},null,10,Vl))),128)),e.room.label?(k(),j(`text`,{key:1,x:e.room.label.pos[0],y:e.room.label.pos[1],"font-size":e.room.label.fontSize??b(8),class:`room-label`},E(e.room.label.text),9,Hl)):L(``,!0),e.selected?(k(),j(`path`,{key:2,d:i.value,class:`selection-outline`,stroke:b(y)},null,8,Ul)):L(``,!0)],12,Rl))}}),[[`__scopeId`,`data-v-2e55205a`]]),Gl=[`data-entity-id`],Kl=[`d`],ql=[`d`],Jl=F(N({__name:`RoutePath`,props:{route:{},selected:{type:Boolean},hitArea:{type:Boolean}},setup(e){return(t,n)=>(k(),j(`g`,{"data-entity-kind":`route`,"data-entity-id":e.route.id},[e.hitArea?(k(),j(`path`,{key:0,d:e.route.path,class:`route-hit`},null,8,Kl)):L(``,!0),A(`path`,{d:e.route.path,class:`route`,style:r(e.selected?{stroke:b(y)}:void 0)},null,12,ql)],8,Gl))}}),[[`__scopeId`,`data-v-1fc1c8fe`]]),Yl=N({__name:`FloorLayer`,props:{trial:{},floor:{},elementIndex:{},zones:{},selectedIds:{},hiddenCategories:{},interactiveRoutes:{type:Boolean}},setup(e){let t=e;function n(e){return e.filter(e=>e.floor===t.floor)}let r=I(()=>n(t.trial.rooms)),i=I(()=>n(t.trial.placements).filter(e=>{let n=t.elementIndex.get(e.element)?.category;return!n||!t.hiddenCategories?.has(n)})),a=I(()=>n(t.trial.routes)),o=I(()=>i.value.filter(e=>e.marker));return(t,n)=>(k(),j(`g`,null,[(k(!0),j(O,null,R(r.value,t=>(k(),P(Wl,{key:t.id,room:t,zone:e.zones.get(t.zone),selected:e.selectedIds?.has(t.id)},null,8,[`room`,`zone`,`selected`]))),128)),(k(!0),j(O,null,R(a.value,t=>(k(),P(Jl,{key:t.id,route:t,selected:e.selectedIds?.has(t.id),"hit-area":e.interactiveRoutes},null,8,[`route`,`selected`,`hit-area`]))),128)),(k(!0),j(O,null,R(i.value,t=>(k(),P(Cl,{key:t.id,placement:t,element:e.elementIndex.get(t.element),selected:e.selectedIds?.has(t.id)},null,8,[`placement`,`element`,`selected`]))),128)),(k(!0),j(O,null,R(o.value,e=>(k(),P(Nc,{key:`marker-${e.id}`,marker:e.marker,pos:e.pos},null,8,[`marker`,`pos`]))),128))]))}}),Xl=[`transform`],Zl=F(N({__name:`MapCanvas`,props:{transform:{}},setup(e,{expose:t}){let n=d(null);return t({svgEl:n}),(t,r)=>(k(),j(`svg`,{ref_key:`svgEl`,ref:n,class:`map-canvas`},[A(`g`,{transform:`translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`},[T(t.$slots,`default`,{},void 0,!0)],8,Xl),T(t.$slots,`screen`,{},void 0,!0)],512))}}),[[`__scopeId`,`data-v-a13509ed`]]);function Ql(e){return(e.find(e=>e.default)??e[0])?.id??null}function $l(e){return e.some(e=>e.index===0)?0:e[0]?.index??0}function eu(e,t,n,r){let i=new Set;for(let a of r)i.has(a)&&e.push({path:t,message:`duplicate ${n} id "${a}"`}),i.add(a)}function tu(e){let t=[];eu(t,`categories`,`category`,e.categories.map(e=>e.id)),eu(t,`elements`,`element`,e.elements.map(e=>e.id));let n=new Set(e.categories.map(e=>e.id));return e.elements.forEach((e,r)=>{n.has(e.category)||t.push({path:`elements[${r}].category`,message:`unknown category "${e.category}"`})}),t}function nu(e){let t=[];return eu(t,`zones`,`zone`,e.zones.map(e=>e.id)),t}function ru(e,t){let n=e.wallGaps;if(!n?.length)return[];let r=hc(e.shape);if(!r)return[{path:`${t}.wallGaps`,message:`wall gaps need a parsable outline (only M/L/H/V/Z are supported)`}];let i=Tl(r),a=[];return n.forEach((e,n)=>{let r=`${t}.wallGaps[${n}]`,o=i[e.edge];if(!o){a.push({path:r,message:`unknown edge ${e.edge} (outline has ${i.length})`});return}if(e.length<=0){a.push({path:r,message:`length must be greater than 0`});return}let s=El(o);(e.start<0||e.start+e.length>s)&&a.push({path:r,message:`gap ${e.start}–${e.start+e.length} exceeds edge ${e.edge} (length ${Math.round(s*100)/100})`})}),a}function iu(e){let t=[];eu(t,`trials`,`trial`,e.trials.map(e=>e.id));let n=e.trials.filter(e=>e.default).length;return n!==1&&t.push({path:`trials`,message:`exactly one trial must have "default": true (found ${n})`}),t}function au(e,t,n){let r=[];return n.floorIndexes.has(e.floor)||r.push({path:`rooms[${t}].floor`,message:`unknown floor ${e.floor}`}),n.zoneIds.has(e.zone)||r.push({path:`rooms[${t}].zone`,message:`unknown zone "${e.zone}"`}),r.push(...ru(e,`rooms[${t}]`)),r}function ou(e,t,n){let r=[],i=n.elementsById.get(e.element);if(i||r.push({path:`placements[${t}].element`,message:`unknown element "${e.element}"`}),e.size!==void 0&&(i&&!i.render&&r.push({path:`placements[${t}].size`,message:`"size" is only allowed on structural elements (element "${e.element}" has none)`}),e.size.some(e=>e<=0)&&r.push({path:`placements[${t}].size`,message:`size values must be greater than 0`})),n.floorIndexes.has(e.floor)||r.push({path:`placements[${t}].floor`,message:`unknown floor ${e.floor}`}),e.roomId!==void 0){let i=n.roomsById.get(e.roomId);i?i.floor!==e.floor&&r.push({path:`placements[${t}].roomId`,message:`placement is on floor ${e.floor} but room "${i.id}" is on floor ${i.floor}`}):r.push({path:`placements[${t}].roomId`,message:`unknown room "${e.roomId}"`})}return r}function su(e,t,n){let r=[],i={floorIndexes:new Set(e.floors.map(e=>e.index)),zoneIds:new Set((n?.zones??[]).map(e=>e.id)),categoryIds:new Set((t?.categories??[]).map(e=>e.id)),elementsById:new Map((t?.elements??[]).map(e=>[e.id,e])),roomsById:new Map(e.rooms.map(e=>[e.id,e]))},a=[[`floors`,`floor`,e.floors.map(e=>e.index)],[`filters`,`filter`,e.filters.map(e=>e.id)],[`rooms`,`room`,e.rooms.map(e=>e.id)],[`placements`,`placement`,e.placements.map(e=>e.id)],[`routes`,`route`,e.routes.map(e=>e.id)]];for(let[e,t,n]of a)eu(r,e,t,n);return e.rooms.forEach((e,t)=>r.push(...au(e,t,i))),e.placements.forEach((e,t)=>r.push(...ou(e,t,i))),e.routes.forEach((e,t)=>{i.floorIndexes.has(e.floor)||r.push({path:`routes[${t}].floor`,message:`unknown floor ${e.floor}`})}),e.filters.forEach((e,t)=>{e.categories.forEach(e=>{i.categoryIds.has(e)||r.push({path:`filters[${t}].categories`,message:`unknown category "${e}"`})})}),r}function cu(e){return new Map((e?.elements??[]).map(e=>[e.id,e]))}function lu(e){return new Map((e?.zones??[]).map(e=>[e.id,e]))}var uu=[`room`,`placement`,`route`];function du(e){if(!(e instanceof Element))return null;let t=e.closest(`[data-entity-kind]`);if(!t)return null;let n=t.getAttribute(`data-entity-kind`),r=t.getAttribute(`data-entity-id`);return!n||!r||!uu.includes(n)?null:{kind:n,id:r}}var fu=$e(),pu={name:`BlankIcon`,extends:St};function mu(e){return vu(e)||_u(e)||gu(e)||hu()}function hu(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gu(e,t){if(e){if(typeof e==`string`)return yu(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?yu(e,t):void 0}}function _u(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function vu(e){if(Array.isArray(e))return yu(e)}function yu(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function bu(e,t,n,r,i,a){return k(),j(`svg`,D({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),mu(t[0]||=[A(`rect`,{width:`1`,height:`1`,fill:`currentColor`,"fill-opacity":`0`},null,-1)]),16)}pu.render=bu;var xu={name:`ChevronDownIcon`,extends:St};function Su(e){return Eu(e)||Tu(e)||wu(e)||Cu()}function Cu(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function wu(e,t){if(e){if(typeof e==`string`)return Du(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Du(e,t):void 0}}function Tu(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Eu(e){if(Array.isArray(e))return Du(e)}function Du(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Ou(e,t,n,r,i,a){return k(),j(`svg`,D({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Su(t[0]||=[A(`path`,{d:`M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z`,fill:`currentColor`},null,-1)]),16)}xu.render=Ou;var ku={name:`SearchIcon`,extends:St};function Au(e){return Pu(e)||Nu(e)||Mu(e)||ju()}function ju(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Mu(e,t){if(e){if(typeof e==`string`)return Fu(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Fu(e,t):void 0}}function Nu(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Pu(e){if(Array.isArray(e))return Fu(e)}function Fu(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Iu(e,t,n,r,i,a){return k(),j(`svg`,D({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Au(t[0]||=[A(`path`,{"fill-rule":`evenodd`,"clip-rule":`evenodd`,d:`M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z`,fill:`currentColor`},null,-1)]),16)}ku.render=Iu;var Lu={name:`IconField`,extends:{name:`BaseIconField`,extends:V,style:M.extend({name:`iconfield`,style:`
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
`,classes:{root:`p-iconfield`}}),provide:function(){return{$pcIconField:this,$parentInstance:this}}},inheritAttrs:!1};function Ru(e,t,n,r,i,a){return k(),j(`div`,D({class:e.cx(`root`)},e.ptmi(`root`)),[T(e.$slots,`default`)],16)}Lu.render=Ru;var zu={name:`InputIcon`,extends:{name:`BaseInputIcon`,extends:V,style:M.extend({name:`inputicon`,classes:{root:`p-inputicon`}}),props:{class:null},provide:function(){return{$pcInputIcon:this,$parentInstance:this}}},inheritAttrs:!1,computed:{containerClass:function(){return[this.cx(`root`),this.class]}}};function Bu(e,t,n,r,i,a){return k(),j(`span`,D({class:a.containerClass},e.ptmi(`root`),{"aria-hidden":`true`}),[T(e.$slots,`default`)],16)}zu.render=Bu;var Vu={name:`BaseEditableHolder`,extends:V,emits:[`update:modelValue`,`value-change`],props:{modelValue:{type:null,default:void 0},defaultValue:{type:null,default:void 0},name:{type:String,default:void 0},invalid:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},formControl:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0},$pcForm:{default:void 0},$pcFormField:{default:void 0}},data:function(){return{d_value:this.defaultValue===void 0?this.modelValue:this.defaultValue}},watch:{modelValue:{deep:!0,handler:function(e){this.d_value=e}},defaultValue:function(e){this.d_value=e},$formName:{immediate:!0,handler:function(e){var t,n;this.formField=((t=this.$pcForm)==null||(n=t.register)==null?void 0:n.call(t,e,this.$formControl))||{}}},$formControl:{immediate:!0,handler:function(e){var t,n;this.formField=((t=this.$pcForm)==null||(n=t.register)==null?void 0:n.call(t,this.$formName,e))||{}}},$formDefaultValue:{immediate:!0,handler:function(e){this.d_value!==e&&(this.d_value=e)}},$formValue:{immediate:!1,handler:function(e){var t;(t=this.$pcForm)!=null&&t.getFieldState(this.$formName)&&e!==this.d_value&&(this.d_value=e)}}},formField:{},methods:{writeValue:function(e,t){var n,r;this.controlled&&(this.d_value=e,this.$emit(`update:modelValue`,e)),this.$emit(`value-change`,e),(n=(r=this.formField).onChange)==null||n.call(r,{originalEvent:t,value:e})},findNonEmpty:function(){return[...arguments].find(C)}},computed:{$filled:function(){return C(this.d_value)},$invalid:function(){var e,t;return!this.$formNovalidate&&this.findNonEmpty(this.invalid,(e=this.$pcFormField)==null||(e=e.$field)==null?void 0:e.invalid,(t=this.$pcForm)==null||(t=t.getFieldState(this.$formName))==null?void 0:t.invalid)},$formName:function(){return this.$formNovalidate?void 0:this.name||this.$formControl?.name},$formControl:function(){return this.formControl||this.$pcFormField?.formControl},$formNovalidate:function(){return this.$formControl?.novalidate},$formDefaultValue:function(){var e;return this.findNonEmpty(this.d_value,this.$pcFormField?.initialValue,(e=this.$pcForm)==null||(e=e.initialValues)==null?void 0:e[this.$formName])},$formValue:function(){var e,t;return this.findNonEmpty((e=this.$pcFormField)==null||(e=e.$field)==null?void 0:e.value,(t=this.$pcForm)==null||(t=t.getFieldState(this.$formName))==null?void 0:t.value)},controlled:function(){return this.$inProps.hasOwnProperty(`modelValue`)||!this.$inProps.hasOwnProperty(`modelValue`)&&!this.$inProps.hasOwnProperty(`defaultValue`)},filled:function(){return this.$filled}}},Hu={name:`BaseInput`,extends:Vu,props:{size:{type:String,default:null},fluid:{type:Boolean,default:null},variant:{type:String,default:null}},inject:{$parentInstance:{default:void 0},$pcFluid:{default:void 0}},computed:{$variant:function(){return this.variant??(this.$primevue.config.inputStyle||this.$primevue.config.inputVariant)},$fluid:function(){return this.fluid??!!this.$pcFluid},hasFluid:function(){return this.$fluid}}},Uu={name:`BaseInputText`,extends:Hu,style:M.extend({name:`inputtext`,style:`
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
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-inputtext p-component`,{"p-filled":t.$filled,"p-inputtext-sm p-inputfield-sm":n.size===`small`,"p-inputtext-lg p-inputfield-lg":n.size===`large`,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-inputtext-fluid":t.$fluid}]}}}),provide:function(){return{$pcInputText:this,$parentInstance:this}}};function Wu(e){"@babel/helpers - typeof";return Wu=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Wu(e)}function Gu(e,t,n){return(t=Ku(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ku(e){var t=qu(e,`string`);return Wu(t)==`symbol`?t:t+``}function qu(e,t){if(Wu(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Wu(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Ju={name:`InputText`,extends:Uu,inheritAttrs:!1,methods:{onInput:function(e){this.writeValue(e.target.value,e)}},computed:{attrs:function(){return D(this.ptmi(`root`,{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return z(Gu({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))}}},Yu=[`value`,`name`,`disabled`,`aria-invalid`,`data-p`];function Xu(e,t,n,r,i,a){return k(),j(`input`,D({type:`text`,class:e.cx(`root`),value:e.d_value,name:e.name,disabled:e.disabled,"aria-invalid":e.$invalid||void 0,"data-p":a.dataP,onInput:t[0]||=function(){return a.onInput&&a.onInput.apply(a,arguments)}},a.attrs),null,16,Yu)}Ju.render=Xu;var Zu=M.extend({name:`virtualscroller`,css:`
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
`}),Qu={name:`BaseVirtualScroller`,extends:V,props:{id:{type:String,default:null},style:null,class:null,items:{type:Array,default:null},itemSize:{type:[Number,Array],default:0},scrollHeight:null,scrollWidth:null,orientation:{type:String,default:`vertical`},numToleratedItems:{type:Number,default:null},delay:{type:Number,default:0},resizeDelay:{type:Number,default:10},lazy:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loaderDisabled:{type:Boolean,default:!1},columns:{type:Array,default:null},loading:{type:Boolean,default:!1},showSpacer:{type:Boolean,default:!0},showLoader:{type:Boolean,default:!1},tabindex:{type:Number,default:0},inline:{type:Boolean,default:!1},step:{type:Number,default:0},appendOnly:{type:Boolean,default:!1},autoSize:{type:Boolean,default:!1}},style:Zu,provide:function(){return{$pcVirtualScroller:this,$parentInstance:this}},beforeMount:function(){var e;Zu.loadCSS({nonce:(e=this.$primevueConfig)==null||(e=e.csp)==null?void 0:e.nonce})}};function $u(e){"@babel/helpers - typeof";return $u=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},$u(e)}function ed(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function td(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ed(Object(n),!0).forEach(function(t){nd(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ed(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function nd(e,t,n){return(t=rd(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function rd(e){var t=id(e,`string`);return $u(t)==`symbol`?t:t+``}function id(e,t){if($u(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if($u(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var ad={name:`VirtualScroller`,extends:Qu,inheritAttrs:!1,emits:[`update:numToleratedItems`,`scroll`,`scroll-index-change`,`lazy-load`],data:function(){var e=this.isBoth();return{first:e?{rows:0,cols:0}:0,last:e?{rows:0,cols:0}:0,page:e?{rows:0,cols:0}:0,numItemsInViewport:e?{rows:0,cols:0}:0,lastScrollPos:e?{top:0,left:0}:0,d_numToleratedItems:this.numToleratedItems,d_loading:this.loading,loaderArr:[],spacerStyle:{},contentStyle:{}}},element:null,content:null,lastScrollPos:null,scrollTimeout:null,resizeTimeout:null,defaultWidth:0,defaultHeight:0,defaultContentWidth:0,defaultContentHeight:0,isRangeChanged:!1,lazyLoadState:{},resizeListener:null,resizeObserver:null,initialized:!1,watch:{numToleratedItems:function(e){this.d_numToleratedItems=e},loading:function(e,t){this.lazy&&e!==t&&e!==this.d_loading&&(this.d_loading=e)},items:{handler:function(e,t){(!t||t.length!==(e||[]).length)&&(this.init(),this.calculateAutoSize())},deep:!0},itemSize:function(){this.init(),this.calculateAutoSize()},orientation:function(){this.lastScrollPos=this.isBoth()?{top:0,left:0}:0},scrollHeight:function(){this.init(),this.calculateAutoSize()},scrollWidth:function(){this.init(),this.calculateAutoSize()}},mounted:function(){this.viewInit(),this.lastScrollPos=this.isBoth()?{top:0,left:0}:0,this.lazyLoadState=this.lazyLoadState||{}},updated:function(){!this.initialized&&this.viewInit()},unmounted:function(){this.unbindResizeListener(),this.initialized=!1},methods:{viewInit:function(){n(this.element)&&(this.setContentEl(this.content),this.init(),this.calculateAutoSize(),this.defaultWidth=Ge(this.element),this.defaultHeight=ye(this.element),this.defaultContentWidth=Ge(this.content),this.defaultContentHeight=ye(this.content),this.initialized=!0),this.element&&this.bindResizeListener()},init:function(){this.disabled||(this.setSize(),this.calculateOptions(),this.setSpacerSize())},isVertical:function(){return this.orientation===`vertical`},isHorizontal:function(){return this.orientation===`horizontal`},isBoth:function(){return this.orientation===`both`},scrollTo:function(e){this.element&&this.element.scrollTo(e)},scrollToIndex:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:`auto`,r=this.isBoth(),i=this.isHorizontal();if(r?e.every(function(e){return e>-1}):e>-1){var a=this.first,o=this.element,s=o.scrollTop,c=s===void 0?0:s,l=o.scrollLeft,u=l===void 0?0:l,d=this.calculateNumItems().numToleratedItems,f=this.getContentPosition(),p=this.itemSize,m=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return e<=(arguments.length>1?arguments[1]:void 0)?0:e},h=function(e,t,n){return e*t+n},g=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return t.scrollTo({left:e,top:r,behavior:n})},_=r?{rows:0,cols:0}:0,v=!1,y=!1;r?(_={rows:m(e[0],d[0]),cols:m(e[1],d[1])},g(h(_.cols,p[1],f.left),h(_.rows,p[0],f.top)),y=this.lastScrollPos.top!==c||this.lastScrollPos.left!==u,v=_.rows!==a.rows||_.cols!==a.cols):(_=m(e,d),i?g(h(_,p,f.left),c):g(u,h(_,p,f.top)),y=this.lastScrollPos!==(i?u:c),v=_!==a),this.isRangeChanged=v,y&&(this.first=_)}},scrollInView:function(e,t){var n=this,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:`auto`;if(t){var i=this.isBoth(),a=this.isHorizontal();if(i?e.every(function(e){return e>-1}):e>-1){var o=this.getRenderedRange(),s=o.first,c=o.viewport,l=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return n.scrollTo({left:e,top:t,behavior:r})},u=t===`to-start`,d=t===`to-end`;if(u){if(i)c.first.rows-s.rows>e[0]?l(c.first.cols*this.itemSize[1],(c.first.rows-1)*this.itemSize[0]):c.first.cols-s.cols>e[1]&&l((c.first.cols-1)*this.itemSize[1],c.first.rows*this.itemSize[0]);else if(c.first-s>e){var f=(c.first-1)*this.itemSize;a?l(f,0):l(0,f)}}else if(d){if(i)c.last.rows-s.rows<=e[0]+1?l(c.first.cols*this.itemSize[1],(c.first.rows+1)*this.itemSize[0]):c.last.cols-s.cols<=e[1]+1&&l((c.first.cols+1)*this.itemSize[1],c.first.rows*this.itemSize[0]);else if(c.last-s<=e+1){var p=(c.first+1)*this.itemSize;a?l(p,0):l(0,p)}}}}else this.scrollToIndex(e,r)},getRenderedRange:function(){var e=function(e,t){return Math.floor(e/(t||e))},t=this.first,n=0;if(this.element){var r=this.isBoth(),i=this.isHorizontal(),a=this.element,o=a.scrollTop,s=a.scrollLeft;r?(t={rows:e(o,this.itemSize[0]),cols:e(s,this.itemSize[1])},n={rows:t.rows+this.numItemsInViewport.rows,cols:t.cols+this.numItemsInViewport.cols}):(t=e(i?s:o,this.itemSize),n=t+this.numItemsInViewport)}return{first:this.first,last:this.last,viewport:{first:t,last:n}}},calculateNumItems:function(){var e=this.isBoth(),t=this.isHorizontal(),n=this.itemSize,r=this.getContentPosition(),i=this.element?this.element.offsetWidth-r.left:0,a=this.element?this.element.offsetHeight-r.top:0,o=function(e,t){return Math.ceil(e/(t||e))},s=function(e){return Math.ceil(e/2)},c=e?{rows:o(a,n[0]),cols:o(i,n[1])}:o(t?i:a,n);return{numItemsInViewport:c,numToleratedItems:this.d_numToleratedItems||(e?[s(c.rows),s(c.cols)]:s(c))}},calculateOptions:function(){var e=this,t=this.isBoth(),n=this.first,r=this.calculateNumItems(),i=r.numItemsInViewport,a=r.numToleratedItems,o=function(t,n,r){var i=arguments.length>3&&arguments[3]!==void 0&&arguments[3];return e.getLast(t+n+(t<r?2:3)*r,i)},s=t?{rows:o(n.rows,i.rows,a[0]),cols:o(n.cols,i.cols,a[1],!0)}:o(n,i,a);this.last=s,this.numItemsInViewport=i,this.d_numToleratedItems=a,this.$emit(`update:numToleratedItems`,this.d_numToleratedItems),this.showLoader&&(this.loaderArr=t?Array.from({length:i.rows}).map(function(){return Array.from({length:i.cols})}):Array.from({length:i})),this.lazy&&Promise.resolve().then(function(){e.lazyLoadState={first:e.step?t?{rows:0,cols:n.cols}:0:n,last:Math.min(e.step?e.step:s,e.items?.length||0)},e.$emit(`lazy-load`,e.lazyLoadState)})},calculateAutoSize:function(){var e=this;this.autoSize&&!this.d_loading&&Promise.resolve().then(function(){if(e.content){var t=e.isBoth(),n=e.isHorizontal(),r=e.isVertical();e.content.style.minHeight=e.content.style.minWidth=`auto`,e.content.style.position=`relative`,e.element.style.contain=`none`;var i=[Ge(e.element),ye(e.element)],a=i[0],o=i[1];(t||n)&&(e.element.style.width=a<e.defaultWidth?a+`px`:e.scrollWidth||e.defaultWidth+`px`),(t||r)&&(e.element.style.height=o<e.defaultHeight?o+`px`:e.scrollHeight||e.defaultHeight+`px`),e.content.style.minHeight=e.content.style.minWidth=``,e.content.style.position=``,e.element.style.contain=``}})},getLast:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return this.items?Math.min(t?(this.columns||this.items[0])?.length||0:this.items?.length||0,e):0},getContentPosition:function(){if(this.content){var e=getComputedStyle(this.content),t=parseFloat(e.paddingLeft)+Math.max(parseFloat(e.left)||0,0),n=parseFloat(e.paddingRight)+Math.max(parseFloat(e.right)||0,0),r=parseFloat(e.paddingTop)+Math.max(parseFloat(e.top)||0,0),i=parseFloat(e.paddingBottom)+Math.max(parseFloat(e.bottom)||0,0);return{left:t,right:n,top:r,bottom:i,x:t+n,y:r+i}}return{left:0,right:0,top:0,bottom:0,x:0,y:0}},setSize:function(){var e=this;if(this.element){var t=this.isBoth(),n=this.isHorizontal(),r=this.element.parentElement,i=this.scrollWidth||`${this.element.offsetWidth||r.offsetWidth}px`,a=this.scrollHeight||`${this.element.offsetHeight||r.offsetHeight}px`,o=function(t,n){return e.element.style[t]=n};t||n?(o(`height`,a),o(`width`,i)):o(`height`,a)}},setSpacerSize:function(){var e=this,t=this.items;if(t){var n=this.isBoth(),r=this.isHorizontal(),i=this.getContentPosition(),a=function(t,n,r){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return e.spacerStyle=td(td({},e.spacerStyle),nd({},`${t}`,(n||[]).length*r+i+`px`))};n?(a(`height`,t,this.itemSize[0],i.y),a(`width`,this.columns||t[1],this.itemSize[1],i.x)):r?a(`width`,this.columns||t,this.itemSize,i.x):a(`height`,t,this.itemSize,i.y)}},setContentPosition:function(e){var t=this;if(this.content&&!this.appendOnly){var n=this.isBoth(),r=this.isHorizontal(),i=e?e.first:this.first,a=function(e,t){return e*t},o=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return t.contentStyle=td(td({},t.contentStyle),{transform:`translate3d(${e}px, ${n}px, 0)`})};if(n)o(a(i.cols,this.itemSize[1]),a(i.rows,this.itemSize[0]));else{var s=a(i,this.itemSize);r?o(s,0):o(0,s)}}},onScrollPositionChange:function(e){var t=this,n=e.target,r=this.isBoth(),i=this.isHorizontal(),a=this.getContentPosition(),o=function(e,t){return e?e>t?e-t:e:0},s=function(e,t){return Math.floor(e/(t||e))},c=function(e,t,n,r,i,a){return e<=i?i:a?n-r-i:t+i-1},l=function(e,n,r,i,a,o,s,c){if(e<=o)return 0;var l=Math.max(0,s?e<n?r:e-o:e>n?r:e-2*o),u=t.getLast(l,c);return l>u?u-a:l},u=function(e,n,r,i,a,o){var s=n+i+2*a;return e>=a&&(s+=a+1),t.getLast(s,o)},d=o(n.scrollTop,a.top),f=o(n.scrollLeft,a.left),p=r?{rows:0,cols:0}:0,m=this.last,h=!1,g=this.lastScrollPos;if(r){var _=this.lastScrollPos.top<=d,v=this.lastScrollPos.left<=f;if(!this.appendOnly||this.appendOnly&&(_||v)){var y={rows:s(d,this.itemSize[0]),cols:s(f,this.itemSize[1])},b={rows:c(y.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],_),cols:c(y.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],v)};p={rows:l(y.rows,b.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],_),cols:l(y.cols,b.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],v,!0)},m={rows:u(y.rows,p.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0]),cols:u(y.cols,p.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],!0)},h=p.rows!==this.first.rows||m.rows!==this.last.rows||p.cols!==this.first.cols||m.cols!==this.last.cols||this.isRangeChanged,g={top:d,left:f}}}else{var x=i?f:d,S=this.lastScrollPos<=x;if(!this.appendOnly||this.appendOnly&&S){var ee=s(x,this.itemSize);p=l(ee,c(ee,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,S),this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,S),m=u(ee,p,this.last,this.numItemsInViewport,this.d_numToleratedItems),h=p!==this.first||m!==this.last||this.isRangeChanged,g=x}}return{first:p,last:m,isRangeChanged:h,scrollPos:g}},onScrollChange:function(e){var t=this.onScrollPositionChange(e),n=t.first,r=t.last,i=t.isRangeChanged,a=t.scrollPos;if(i){var o={first:n,last:r};if(this.setContentPosition(o),this.first=n,this.last=r,this.lastScrollPos=a,this.$emit(`scroll-index-change`,o),this.lazy&&this.isPageChanged(n)){var s={first:this.step?Math.min(this.getPageByFirst(n)*this.step,(this.items?.length||0)-this.step):n,last:Math.min(this.step?(this.getPageByFirst(n)+1)*this.step:r,this.items?.length||0)};(this.lazyLoadState.first!==s.first||this.lazyLoadState.last!==s.last)&&this.$emit(`lazy-load`,s),this.lazyLoadState=s}}},onScroll:function(e){var t=this;this.$emit(`scroll`,e),this.delay?(this.scrollTimeout&&clearTimeout(this.scrollTimeout),this.isPageChanged()&&(!this.d_loading&&this.showLoader&&(this.onScrollPositionChange(e).isRangeChanged||this.step&&this.isPageChanged())&&(this.d_loading=!0),this.scrollTimeout=setTimeout(function(){t.onScrollChange(e),t.d_loading&&t.showLoader&&(!t.lazy||t.loading===void 0)&&(t.d_loading=!1,t.page=t.getPageByFirst())},this.delay))):this.onScrollChange(e)},onResize:function(){var e=this;this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){if(n(e.element)){var t=e.isBoth(),r=e.isVertical(),i=e.isHorizontal(),a=[Ge(e.element),ye(e.element)],o=a[0],s=a[1],c=o!==e.defaultWidth,l=s!==e.defaultHeight;(t?c||l:i?c:r&&l)&&(e.d_numToleratedItems=e.numToleratedItems,e.defaultWidth=o,e.defaultHeight=s,e.defaultContentWidth=Ge(e.content),e.defaultContentHeight=ye(e.content),e.init())}},this.resizeDelay)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=this.onResize.bind(this),window.addEventListener(`resize`,this.resizeListener),window.addEventListener(`orientationchange`,this.resizeListener),this.resizeObserver=new ResizeObserver(function(){e.onResize()}),this.resizeObserver.observe(this.element))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),window.removeEventListener(`orientationchange`,this.resizeListener),null),this.resizeObserver&&=(this.resizeObserver.disconnect(),null)},getOptions:function(e){var t=(this.items||[]).length,n=this.isBoth()?this.first.rows+e:this.first+e;return{index:n,count:t,first:n===0,last:n===t-1,even:n%2==0,odd:n%2!=0}},getLoaderOptions:function(e,t){var n=this.loaderArr.length;return td({index:e,count:n,first:e===0,last:e===n-1,even:e%2==0,odd:e%2!=0},t)},getPageByFirst:function(e){return Math.floor(((e??this.first)+this.d_numToleratedItems*4)/(this.step||1))},isPageChanged:function(e){return this.step&&!this.lazy?this.page!==this.getPageByFirst(e??this.first):!0},setContentEl:function(e){this.content=e||this.content||x(this.element,`[data-pc-section="content"]`)},elementRef:function(e){this.element=e},contentRef:function(e){this.content=e}},computed:{containerClass:function(){return[`p-virtualscroller`,this.class,{"p-virtualscroller-inline":this.inline,"p-virtualscroller-both p-both-scroll":this.isBoth(),"p-virtualscroller-horizontal p-horizontal-scroll":this.isHorizontal()}]},contentClass:function(){return[`p-virtualscroller-content`,{"p-virtualscroller-loading":this.d_loading}]},loaderClass:function(){return[`p-virtualscroller-loader`,{"p-virtualscroller-loader-mask":!this.$slots.loader}]},loadedItems:function(){var e=this;return this.items&&!this.d_loading?this.isBoth()?this.items.slice(this.appendOnly?0:this.first.rows,this.last.rows).map(function(t){return e.columns?t:t.slice(e.appendOnly?0:e.first.cols,e.last.cols)}):this.isHorizontal()&&this.columns?this.items:this.items.slice(this.appendOnly?0:this.first,this.last):[]},loadedRows:function(){return this.d_loading?this.loaderDisabled?this.loaderArr:[]:this.loadedItems},loadedColumns:function(){if(this.columns){var e=this.isBoth(),t=this.isHorizontal();if(e||t)return this.d_loading&&this.loaderDisabled?e?this.loaderArr[0]:this.loaderArr:this.columns.slice(e?this.first.cols:this.first,e?this.last.cols:this.last)}return this.columns}},components:{SpinnerIcon:Ct}},od=[`tabindex`];function sd(e,t,n,r,i,a){var s=o(`SpinnerIcon`);return e.disabled?(k(),j(O,{key:1},[T(e.$slots,`default`),T(e.$slots,`content`,{items:e.items,rows:e.items,columns:a.loadedColumns})],64)):(k(),j(`div`,D({key:0,ref:a.elementRef,class:a.containerClass,tabindex:e.tabindex,style:e.style,onScroll:t[0]||=function(){return a.onScroll&&a.onScroll.apply(a,arguments)}},e.ptmi(`root`)),[T(e.$slots,`content`,{styleClass:a.contentClass,items:a.loadedItems,getItemOptions:a.getOptions,loading:i.d_loading,getLoaderOptions:a.getLoaderOptions,itemSize:e.itemSize,rows:a.loadedRows,columns:a.loadedColumns,contentRef:a.contentRef,spacerStyle:i.spacerStyle,contentStyle:i.contentStyle,vertical:a.isVertical(),horizontal:a.isHorizontal(),both:a.isBoth()},function(){return[A(`div`,D({ref:a.contentRef,class:a.contentClass,style:i.contentStyle},e.ptm(`content`)),[(k(!0),j(O,null,R(a.loadedItems,function(t,n){return T(e.$slots,`item`,{key:n,item:t,options:a.getOptions(n)})}),128))],16)]}),e.showSpacer?(k(),j(`div`,D({key:0,class:`p-virtualscroller-spacer`,style:i.spacerStyle},e.ptm(`spacer`)),null,16)):L(``,!0),!e.loaderDisabled&&e.showLoader&&i.d_loading?(k(),j(`div`,D({key:1,class:a.loaderClass},e.ptm(`loader`)),[e.$slots&&e.$slots.loader?(k(!0),j(O,{key:0},R(i.loaderArr,function(t,n){return T(e.$slots,`loader`,{key:n,options:a.getLoaderOptions(n,a.isBoth()&&{numCols:e.d_numItemsInViewport.cols})})}),128)):L(``,!0),T(e.$slots,`loadingicon`,{},function(){return[Ae(s,D({spin:``,class:`p-virtualscroller-loading-icon`},e.ptm(`loadingIcon`)),null,16)]})],16)):L(``,!0)],16,od))}ad.render=sd;var cd=M.extend({name:`select`,style:`
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
`,classes:{root:function(e){var t=e.instance,n=e.props,r=e.state;return[`p-select p-component p-inputwrapper`,{"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-focus":r.focused,"p-inputwrapper-filled":t.$filled,"p-inputwrapper-focus":r.focused||r.overlayVisible,"p-select-open":r.overlayVisible,"p-select-fluid":t.$fluid,"p-select-sm p-inputfield-sm":n.size===`small`,"p-select-lg p-inputfield-lg":n.size===`large`}]},label:function(e){var t=e.instance,n=e.props;return[`p-select-label`,{"p-placeholder":!n.editable&&t.label===n.placeholder,"p-select-label-empty":!n.editable&&!t.$slots.value&&(t.label===`p-emptylabel`||t.label?.length===0)}]},clearIcon:`p-select-clear-icon`,dropdown:`p-select-dropdown`,loadingicon:`p-select-loading-icon`,dropdownIcon:`p-select-dropdown-icon`,overlay:`p-select-overlay p-component`,header:`p-select-header`,pcFilter:`p-select-filter`,listContainer:`p-select-list-container`,list:`p-select-list`,optionGroup:`p-select-option-group`,optionGroupLabel:`p-select-option-group-label`,option:function(e){var t=e.instance,n=e.props,r=e.state,i=e.option,a=e.focusedOption;return[`p-select-option`,{"p-select-option-selected":t.isSelected(i)&&n.highlightOnSelect,"p-focus":r.focusedOptionIndex===a,"p-disabled":t.isOptionDisabled(i)}]},optionLabel:`p-select-option-label`,optionCheckIcon:`p-select-option-check-icon`,optionBlankIcon:`p-select-option-blank-icon`,emptyMessage:`p-select-empty-message`}}),ld={name:`BaseSelect`,extends:Hu,props:{options:Array,optionLabel:[String,Function],optionValue:[String,Function],optionDisabled:[String,Function],optionGroupLabel:[String,Function],optionGroupChildren:[String,Function],scrollHeight:{type:String,default:`14rem`},filter:Boolean,filterPlaceholder:String,filterLocale:String,filterMatchMode:{type:String,default:`contains`},filterFields:{type:Array,default:null},editable:Boolean,placeholder:{type:String,default:null},dataKey:null,showClear:{type:Boolean,default:!1},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},labelId:{type:String,default:null},labelClass:{type:[String,Object],default:null},labelStyle:{type:Object,default:null},panelClass:{type:[String,Object],default:null},overlayStyle:{type:Object,default:null},overlayClass:{type:[String,Object],default:null},panelStyle:{type:Object,default:null},appendTo:{type:[String,Object],default:`body`},loading:{type:Boolean,default:!1},clearIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},filterIcon:{type:String,default:void 0},loadingIcon:{type:String,default:void 0},resetFilterOnHide:{type:Boolean,default:!1},resetFilterOnClear:{type:Boolean,default:!1},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!1},autoFilterFocus:{type:Boolean,default:!1},selectOnFocus:{type:Boolean,default:!1},focusOnHover:{type:Boolean,default:!0},highlightOnSelect:{type:Boolean,default:!0},checkmark:{type:Boolean,default:!1},filterMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptyFilterMessage:{type:String,default:null},emptyMessage:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:cd,provide:function(){return{$pcSelect:this,$parentInstance:this}}};function ud(e){"@babel/helpers - typeof";return ud=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},ud(e)}function dd(e){return hd(e)||md(e)||pd(e)||fd()}function fd(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function pd(e,t){if(e){if(typeof e==`string`)return gd(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?gd(e,t):void 0}}function md(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function hd(e){if(Array.isArray(e))return gd(e)}function gd(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function _d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function vd(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?_d(Object(n),!0).forEach(function(t){yd(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_d(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function yd(e,t,n){return(t=bd(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function bd(e){var t=xd(e,`string`);return ud(t)==`symbol`?t:t+``}function xd(e,t){if(ud(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(ud(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Sd={name:`Select`,extends:ld,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`before-show`,`before-hide`,`show`,`hide`,`filter`],outsideClickListener:null,scrollHandler:null,resizeListener:null,labelClickListener:null,matchMediaOrientationListener:null,overlay:null,list:null,virtualScroller:null,searchTimeout:null,searchValue:null,isModelValueChanged:!1,data:function(){return{clicked:!1,focused:!1,focusedOptionIndex:-1,filterValue:null,overlayVisible:!1,queryOrientation:null}},watch:{modelValue:function(){this.isModelValueChanged=!0},options:function(){this.autoUpdateModel()}},mounted:function(){this.autoUpdateModel(),this.bindLabelClickListener(),this.bindMatchMediaOrientationListener()},updated:function(){this.overlayVisible&&this.isModelValueChanged&&this.scrollInView(this.findSelectedOptionIndex()),this.isModelValueChanged=!1},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindLabelClickListener(),this.unbindMatchMediaOrientationListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.overlay&&=(ve.clear(this.overlay),null)},methods:{getOptionIndex:function(e,t){return this.virtualScrollerDisabled?e:t&&t(e).index},getOptionLabel:function(e){return this.optionLabel?de(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?de(e,this.optionValue):e},getOptionRenderKey:function(e,t){return(this.dataKey?de(e,this.dataKey):this.getOptionLabel(e))+`_`+t},getPTItemOptions:function(e,t,n,r){return this.ptm(r,{context:{option:e,index:n,selected:this.isSelected(e),focused:this.focusedOptionIndex===this.getOptionIndex(n,t),disabled:this.isOptionDisabled(e)}})},isOptionDisabled:function(e){return this.optionDisabled?de(e,this.optionDisabled):!1},isOptionGroup:function(e){return this.optionGroupLabel&&e.optionGroup&&e.group},getOptionGroupLabel:function(e){return de(e,this.optionGroupLabel)},getOptionGroupChildren:function(e){return de(e,this.optionGroupChildren)},getAriaPosInset:function(e){var t=this;return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter(function(e){return t.isOptionGroup(e)}).length:e)+1},show:function(e){this.$emit(`before-show`),this.overlayVisible=!0,this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.editable?-1:this.findSelectedOptionIndex():this.focusedOptionIndex,e&&l(this.$refs.focusInput)},hide:function(e){var t=this,n=function(){t.$emit(`before-hide`),t.overlayVisible=!1,t.clicked=!1,t.focusedOptionIndex=-1,t.searchValue=``,t.resetFilterOnHide&&(t.filterValue=null),e&&l(t.$refs.focusInput)};setTimeout(function(){n()},0)},onFocus:function(e){this.disabled||(this.focused=!0,this.overlayVisible&&(this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.editable?-1:this.findSelectedOptionIndex():this.focusedOptionIndex,this.scrollInView(this.focusedOptionIndex)),this.$emit(`focus`,e))},onBlur:function(e){var t=this;setTimeout(function(){var n,r;t.focused=!1,t.focusedOptionIndex=-1,t.searchValue=``,t.$emit(`blur`,e),(n=(r=t.formField).onBlur)==null||n.call(r,e)},100)},onKeyDown:function(e){var t=this;if(this.disabled){e.preventDefault();return}if(Fe())switch(e.code){case`Backspace`:this.onBackspaceKey(e,this.editable);break;case`Enter`:case`NumpadDecimal`:this.onEnterKey(e);break;default:e.preventDefault();return}var n=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e,this.editable);break;case`ArrowLeft`:case`ArrowRight`:this.onArrowLeftKey(e,this.editable);break;case`Home`:this.onHomeKey(e,this.editable);break;case`End`:this.onEndKey(e,this.editable);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Space`:this.onSpaceKey(e,this.editable);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`Backspace`:this.onBackspaceKey(e,this.editable);break;case`ShiftLeft`:case`ShiftRight`:break;default:!n&&m(e.key)&&(!this.overlayVisible&&this.show(),!this.editable&&this.searchOptions(e,e.key),this.filter&&this.$nextTick(function(){t.$refs.filterInput&&l(t.$refs.filterInput.$el)}))}this.clicked=!1},onEditableInput:function(e){var t=e.target.value;this.searchValue=``,!this.searchOptions(e,t)&&(this.focusedOptionIndex=-1),this.updateModel(e,t),!this.overlayVisible&&C(t)&&this.show()},onContainerClick:function(e){this.disabled||this.loading||e.target.tagName===`INPUT`||e.target.getAttribute(`data-pc-section`)===`clearicon`||e.target.closest(`[data-pc-section="clearicon"]`)||((!this.overlay||!this.overlay.contains(e.target))&&(this.overlayVisible?this.hide(!0):this.show(!0)),this.clicked=!0)},onClearClick:function(e){this.updateModel(e,null),this.resetFilterOnClear&&(this.filterValue=null)},onFirstHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?g(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;l(t)},onLastHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?je(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;l(t)},onOptionSelect:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;if(this.overlayVisible){var r=this.getOptionValue(t);this.updateModel(e,r),n&&this.hide(!0)}},onOptionMouseMove:function(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)},onFilterChange:function(e){var t=e.target.value;this.filterValue=t,this.focusedOptionIndex=-1,this.$emit(`filter`,{originalEvent:e,value:t}),!this.virtualScrollerDisabled&&this.virtualScroller.scrollToIndex(0)},onFilterKeyDown:function(e){if(!e.isComposing)switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e,!0);break;case`ArrowLeft`:case`ArrowRight`:this.onArrowLeftKey(e,!0);break;case`Home`:this.onHomeKey(e,!0);break;case`End`:this.onEndKey(e,!0);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e)}},onFilterBlur:function(){this.focusedOptionIndex=-1},onFilterUpdated:function(){this.overlayVisible&&this.alignOverlay()},onOverlayClick:function(e){fu.emit(`overlay-click`,{originalEvent:e,target:this.$el})},onOverlayKeyDown:function(e){e.code===`Escape`&&this.onEscapeKey(e)},onArrowDownKey:function(e){if(!this.overlayVisible)this.show(),this.editable&&this.changeFocusedOptionIndex(e,this.findSelectedOptionIndex());else{var t=this.focusedOptionIndex===-1?this.clicked?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex():this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e,t)}e.preventDefault()},onArrowUpKey:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];if(e.altKey&&!t)this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{var n=this.focusedOptionIndex===-1?this.clicked?this.findLastOptionIndex():this.findLastFocusedOptionIndex():this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e,n),!this.overlayVisible&&this.show(),e.preventDefault()}},onArrowLeftKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]&&(this.focusedOptionIndex=-1)},onHomeKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;e.shiftKey?t.setSelectionRange(0,e.target.selectionStart):(t.setSelectionRange(0,0),this.focusedOptionIndex=-1)}else this.changeFocusedOptionIndex(e,this.findFirstOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()},onEndKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;if(e.shiftKey)t.setSelectionRange(e.target.selectionStart,t.value.length);else{var n=t.value.length;t.setSelectionRange(n,n),this.focusedOptionIndex=-1}}else this.changeFocusedOptionIndex(e,this.findLastOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()},onPageUpKey:function(e){this.scrollInView(0),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey:function(e){this.overlayVisible?(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.hide(!0)):(this.focusedOptionIndex=-1,this.onArrowDownKey(e)),e.preventDefault()},onSpaceKey:function(e){!(arguments.length>1&&arguments[1]!==void 0&&arguments[1])&&this.onEnterKey(e)},onEscapeKey:function(e){this.overlayVisible&&this.hide(!0),e.preventDefault(),e.stopPropagation()},onTabKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]||(this.overlayVisible&&this.hasFocusableElements()?(l(this.$refs.firstHiddenFocusableElementOnOverlay),e.preventDefault()):(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(this.filter)))},onBackspaceKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]&&!this.overlayVisible&&this.show()},onOverlayEnter:function(e){var t=this;ve.set(`overlay`,e,this.$primevue.config.zIndex.overlay),Ze(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.scrollInView(),this.$attrSelector&&e.setAttribute(this.$attrSelector,``),setTimeout(function(){t.autoFilterFocus&&t.filter&&l(t.$refs.filterInput.$el),t.autoUpdateModel()},1)},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit(`show`)},onOverlayLeave:function(e){var t=this;e.style.pointerEvents=`none`,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.autoFilterFocus&&this.filter&&!this.editable&&this.$nextTick(function(){t.$refs.filterInput&&l(t.$refs.filterInput.$el)}),this.$emit(`hide`),this.overlay=null},onOverlayAfterLeave:function(e){ve.clear(e)},alignOverlay:function(){this.appendTo===`self`?He(this.overlay,this.$el):this.overlay&&(this.overlay.style.minWidth=f(this.$el)+`px`,be(this.overlay,this.$el))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=t.composedPath();e.overlayVisible&&e.overlay&&!n.includes(e.$el)&&!n.includes(e.overlay)&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new me(this.$refs.container,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!qe()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindLabelClickListener:function(){var e=this;if(!this.editable&&!this.labelClickListener){var t=document.querySelector(`label[for="${this.labelId}"]`);t&&n(t)&&(this.labelClickListener=function(){l(e.$refs.focusInput)},t.addEventListener(`click`,this.labelClickListener))}},unbindLabelClickListener:function(){if(this.labelClickListener){var e=document.querySelector(`label[for="${this.labelId}"]`);e&&n(e)&&e.removeEventListener(`click`,this.labelClickListener)}},bindMatchMediaOrientationListener:function(){var e=this;if(!this.matchMediaOrientationListener){var t=matchMedia(`(orientation: portrait)`);this.queryOrientation=t,this.matchMediaOrientationListener=function(){e.alignOverlay()},this.queryOrientation.addEventListener(`change`,this.matchMediaOrientationListener)}},unbindMatchMediaOrientationListener:function(){this.matchMediaOrientationListener&&=(this.queryOrientation.removeEventListener(`change`,this.matchMediaOrientationListener),this.queryOrientation=null,null)},hasFocusableElements:function(){return u(this.overlay,`:not([data-p-hidden-focusable="true"])`).length>0},isOptionExactMatched:function(e){return this.isValidOption(e)&&typeof this.getOptionLabel(e)==`string`&&this.getOptionLabel(e)?.toLocaleLowerCase(this.filterLocale)==this.searchValue.toLocaleLowerCase(this.filterLocale)},isOptionStartsWith:function(e){return this.isValidOption(e)&&typeof this.getOptionLabel(e)==`string`&&this.getOptionLabel(e)?.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale))},isValidOption:function(e){return C(e)&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption:function(e){return this.isValidOption(e)&&this.isSelected(e)},isSelected:function(e){return Re(this.d_value,this.getOptionValue(e),this.equalityKey)},findFirstOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidOption(t)})},findLastOptionIndex:function(){var e=this;return oe(this.visibleOptions,function(t){return e.isValidOption(t)})},findNextOptionIndex:function(e){var t=this,n=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidOption(e)}):-1;return n>-1?n+e+1:e},findPrevOptionIndex:function(e){var t=this,n=e>0?oe(this.visibleOptions.slice(0,e),function(e){return t.isValidOption(e)}):-1;return n>-1?n:e},findSelectedOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidSelectedOption(t)})},findFirstFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},searchOptions:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return C(this.searchValue)&&(r=this.visibleOptions.findIndex(function(e){return n.isOptionExactMatched(e)}),r===-1&&(r=this.visibleOptions.findIndex(function(e){return n.isOptionStartsWith(e)})),r!==-1&&(i=!0),r===-1&&this.focusedOptionIndex===-1&&(r=this.findFirstFocusedOptionIndex()),r!==-1&&this.changeFocusedOptionIndex(e,r)),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedOptionIndex:function(e,t){this.focusedOptionIndex!==t&&(this.focusedOptionIndex=t,this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions[t],!1))},scrollInView:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1;this.$nextTick(function(){var n=t===-1?e.focusedOptionId:`${e.$id}_${t}`,r=x(e.list,`li[id="${n}"]`);r?r.scrollIntoView&&r.scrollIntoView({block:`nearest`,inline:`nearest`}):e.virtualScrollerDisabled||e.virtualScroller&&e.virtualScroller.scrollToIndex(t===-1?e.focusedOptionIndex:t)})},autoUpdateModel:function(){this.autoOptionFocus&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex()),this.selectOnFocus&&this.autoOptionFocus&&!this.$filled&&this.onOptionSelect(null,this.visibleOptions[this.focusedOptionIndex],!1)},updateModel:function(e,t){this.writeValue(t,e),this.$emit(`change`,{originalEvent:e,value:t})},flatOptions:function(e){var t=this;return(e||[]).reduce(function(e,n,r){e.push({optionGroup:n,group:!0,index:r});var i=t.getOptionGroupChildren(n);return i&&i.forEach(function(t){return e.push(t)}),e},[])},overlayRef:function(e){this.overlay=e},listRef:function(e,t){this.list=e,t&&t(e)},virtualScrollerRef:function(e){this.virtualScroller=e}},computed:{visibleOptions:function(){var e=this,t=this.optionGroupLabel?this.flatOptions(this.options):this.options||[];if(this.filterValue){var n=Ve.filter(t,this.searchFields,this.filterValue,this.filterMatchMode,this.filterLocale);if(this.optionGroupLabel){var r=this.options||[],i=[];return r.forEach(function(t){var r=e.getOptionGroupChildren(t).filter(function(e){return n.includes(e)});r.length>0&&i.push(vd(vd({},t),{},yd({},typeof e.optionGroupChildren==`string`?e.optionGroupChildren:`items`,dd(r))))}),this.flatOptions(i)}return n}return t},hasSelectedOption:function(){return this.$filled},label:function(){var e=this.findSelectedOptionIndex();return e===-1?this.placeholder||`p-emptylabel`:this.getOptionLabel(this.visibleOptions[e])},editableInputValue:function(){var e=this.findSelectedOptionIndex();return e===-1?this.d_value||``:this.getOptionLabel(this.visibleOptions[e])},equalityKey:function(){return this.optionValue?null:this.dataKey},searchFields:function(){return this.filterFields||[this.optionLabel]},filterResultMessageText:function(){return C(this.visibleOptions)?this.filterMessageText.replaceAll(`{0}`,this.visibleOptions.length):this.emptyFilterMessageText},filterMessageText:function(){return this.filterMessage||this.$primevue.config.locale.searchMessage||``},emptyFilterMessageText:function(){return this.emptyFilterMessage||this.$primevue.config.locale.emptySearchMessage||this.$primevue.config.locale.emptyFilterMessage||``},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage||``},selectionMessageText:function(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||``},emptySelectionMessageText:function(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||``},selectedMessageText:function(){return this.$filled?this.selectionMessageText.replaceAll(`{0}`,`1`):this.emptySelectionMessageText},focusedOptionId:function(){return this.focusedOptionIndex===-1?null:`${this.$id}_${this.focusedOptionIndex}`},ariaSetSize:function(){var e=this;return this.visibleOptions.filter(function(t){return!e.isOptionGroup(t)}).length},isClearIconVisible:function(){return this.showClear&&this.d_value!=null&&!this.disabled&&!this.loading},virtualScrollerDisabled:function(){return!this.virtualScrollerOptions},containerDataP:function(){return z(yd({invalid:this.$invalid,disabled:this.disabled,focus:this.focused,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))},labelDataP:function(){return z(yd(yd({placeholder:!this.editable&&this.label===this.placeholder,clearable:this.showClear,disabled:this.disabled,editable:this.editable},this.size,this.size),`empty`,!this.editable&&!this.$slots.value&&(this.label===`p-emptylabel`||this.label.length===0)))},dropdownIconDataP:function(){return z(yd({},this.size,this.size))},overlayDataP:function(){return z(yd({},`portal-`+this.appendTo,`portal-`+this.appendTo))}},directives:{ripple:Qt},components:{InputText:Ju,VirtualScroller:ad,Portal:xn,InputIcon:zu,IconField:Lu,TimesIcon:pn,ChevronDownIcon:xu,SpinnerIcon:Ct,SearchIcon:ku,CheckIcon:Cn,BlankIcon:pu}},Cd=[`id`,`data-p`],wd=[`name`,`id`,`value`,`placeholder`,`tabindex`,`disabled`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`,`data-p`],Td=[`name`,`id`,`tabindex`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`,`aria-disabled`,`data-p`],Ed=[`data-p`],Dd=[`id`],Od=[`id`],kd=[`id`,`aria-label`,`aria-selected`,`aria-disabled`,`aria-setsize`,`aria-posinset`,`onMousedown`,`onMousemove`,`data-p-selected`,`data-p-focused`,`data-p-disabled`];function Ad(e,n,r,i,a,s){var c=o(`SpinnerIcon`),l=o(`InputText`),u=o(`SearchIcon`),d=o(`InputIcon`),f=o(`IconField`),p=o(`CheckIcon`),m=o(`BlankIcon`),h=o(`VirtualScroller`),g=o(`Portal`),_=Ke(`ripple`);return k(),j(`div`,D({ref:`container`,id:e.$id,class:e.cx(`root`),onClick:n[12]||=function(){return s.onContainerClick&&s.onContainerClick.apply(s,arguments)},"data-p":s.containerDataP},e.ptmi(`root`)),[e.editable?(k(),j(`input`,D({key:0,ref:`focusInput`,name:e.name,id:e.labelId||e.inputId,type:`text`,class:[e.cx(`label`),e.inputClass,e.labelClass],style:[e.inputStyle,e.labelStyle],value:s.editableInputValue,placeholder:e.placeholder,tabindex:e.disabled?-1:e.tabindex,disabled:e.disabled,autocomplete:`off`,role:`combobox`,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-haspopup":`listbox`,"aria-expanded":a.overlayVisible,"aria-controls":a.overlayVisible?e.$id+`_list`:void 0,"aria-activedescendant":a.focused?s.focusedOptionId:void 0,"aria-invalid":e.invalid||void 0,onFocus:n[0]||=function(){return s.onFocus&&s.onFocus.apply(s,arguments)},onBlur:n[1]||=function(){return s.onBlur&&s.onBlur.apply(s,arguments)},onKeydown:n[2]||=function(){return s.onKeyDown&&s.onKeyDown.apply(s,arguments)},onInput:n[3]||=function(){return s.onEditableInput&&s.onEditableInput.apply(s,arguments)},"data-p":s.labelDataP},e.ptm(`label`)),null,16,wd)):(k(),j(`span`,D({key:1,ref:`focusInput`,name:e.name,id:e.labelId||e.inputId,class:[e.cx(`label`),e.inputClass,e.labelClass],style:[e.inputStyle,e.labelStyle],tabindex:e.disabled?-1:e.tabindex,role:`combobox`,"aria-label":e.ariaLabel||(s.label===`p-emptylabel`?void 0:s.label),"aria-labelledby":e.ariaLabelledby,"aria-haspopup":`listbox`,"aria-expanded":a.overlayVisible,"aria-controls":e.$id+`_list`,"aria-activedescendant":a.focused?s.focusedOptionId:void 0,"aria-invalid":e.invalid||void 0,"aria-disabled":e.disabled,onFocus:n[4]||=function(){return s.onFocus&&s.onFocus.apply(s,arguments)},onBlur:n[5]||=function(){return s.onBlur&&s.onBlur.apply(s,arguments)},onKeydown:n[6]||=function(){return s.onKeyDown&&s.onKeyDown.apply(s,arguments)},"data-p":s.labelDataP},e.ptm(`label`)),[T(e.$slots,`value`,{value:e.d_value,placeholder:e.placeholder},function(){return[Ie(E(s.label===`p-emptylabel`?`\xA0`:s.label??`empty`),1)]})],16,Td)),s.isClearIconVisible?T(e.$slots,`clearicon`,{key:2,class:w(e.cx(`clearIcon`)),clearCallback:s.onClearClick},function(){return[(k(),P(ae(e.clearIcon?`i`:`TimesIcon`),D({ref:`clearIcon`,class:[e.cx(`clearIcon`),e.clearIcon],onClick:s.onClearClick},e.ptm(`clearIcon`),{"data-pc-section":`clearicon`}),null,16,[`class`,`onClick`]))]}):L(``,!0),A(`div`,D({class:e.cx(`dropdown`)},e.ptm(`dropdown`)),[e.loading?T(e.$slots,`loadingicon`,{key:0,class:w(e.cx(`loadingIcon`))},function(){return[e.loadingIcon?(k(),j(`span`,D({key:0,class:[e.cx(`loadingIcon`),`pi-spin`,e.loadingIcon],"aria-hidden":`true`},e.ptm(`loadingIcon`)),null,16)):(k(),P(c,D({key:1,class:e.cx(`loadingIcon`),spin:``,"aria-hidden":`true`},e.ptm(`loadingIcon`)),null,16,[`class`]))]}):T(e.$slots,`dropdownicon`,{key:1,class:w(e.cx(`dropdownIcon`))},function(){return[(k(),P(ae(e.dropdownIcon?`span`:`ChevronDownIcon`),D({class:[e.cx(`dropdownIcon`),e.dropdownIcon],"aria-hidden":`true`,"data-p":s.dropdownIconDataP},e.ptm(`dropdownIcon`)),null,16,[`class`,`data-p`]))]})],16),Ae(g,{appendTo:e.appendTo},{default:t(function(){return[Ae(xe,D({name:`p-anchored-overlay`,onEnter:s.onOverlayEnter,onAfterEnter:s.onOverlayAfterEnter,onLeave:s.onOverlayLeave,onAfterLeave:s.onOverlayAfterLeave},e.ptm(`transition`)),{default:t(function(){return[a.overlayVisible?(k(),j(`div`,D({key:0,ref:s.overlayRef,class:[e.cx(`overlay`),e.panelClass,e.overlayClass],style:[e.panelStyle,e.overlayStyle],onClick:n[10]||=function(){return s.onOverlayClick&&s.onOverlayClick.apply(s,arguments)},onKeydown:n[11]||=function(){return s.onOverlayKeyDown&&s.onOverlayKeyDown.apply(s,arguments)},"data-p":s.overlayDataP},e.ptm(`overlay`)),[A(`span`,D({ref:`firstHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:n[7]||=function(){return s.onFirstHiddenFocus&&s.onFirstHiddenFocus.apply(s,arguments)}},e.ptm(`hiddenFirstFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16),T(e.$slots,`header`,{value:e.d_value,options:s.visibleOptions}),e.filter?(k(),j(`div`,D({key:0,class:e.cx(`header`)},e.ptm(`header`)),[Ae(f,{unstyled:e.unstyled,pt:e.ptm(`pcFilterContainer`)},{default:t(function(){return[Ae(l,{ref:`filterInput`,type:`text`,value:a.filterValue,onVnodeMounted:s.onFilterUpdated,onVnodeUpdated:s.onFilterUpdated,class:w(e.cx(`pcFilter`)),placeholder:e.filterPlaceholder,variant:e.variant,unstyled:e.unstyled,role:`searchbox`,autocomplete:`off`,"aria-owns":e.$id+`_list`,"aria-activedescendant":s.focusedOptionId,onKeydown:s.onFilterKeyDown,onBlur:s.onFilterBlur,onInput:s.onFilterChange,pt:e.ptm(`pcFilter`),formControl:{novalidate:!0}},null,8,[`value`,`onVnodeMounted`,`onVnodeUpdated`,`class`,`placeholder`,`variant`,`unstyled`,`aria-owns`,`aria-activedescendant`,`onKeydown`,`onBlur`,`onInput`,`pt`]),Ae(d,{unstyled:e.unstyled,pt:e.ptm(`pcFilterIconContainer`)},{default:t(function(){return[T(e.$slots,`filtericon`,{},function(){return[e.filterIcon?(k(),j(`span`,D({key:0,class:e.filterIcon},e.ptm(`filterIcon`)),null,16)):(k(),P(u,Qe(D({key:1},e.ptm(`filterIcon`))),null,16))]})]}),_:3},8,[`unstyled`,`pt`])]}),_:3},8,[`unstyled`,`pt`]),A(`span`,D({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenFilterResult`),{"data-p-hidden-accessible":!0}),E(s.filterResultMessageText),17)],16)):L(``,!0),A(`div`,D({class:e.cx(`listContainer`),style:{"max-height":s.virtualScrollerDisabled?e.scrollHeight:``}},e.ptm(`listContainer`)),[Ae(h,D({ref:s.virtualScrollerRef},e.virtualScrollerOptions,{items:s.visibleOptions,style:{height:e.scrollHeight},tabindex:-1,disabled:s.virtualScrollerDisabled,pt:e.ptm(`virtualScroller`)}),Se({content:t(function(t){var r=t.styleClass,i=t.contentRef,o=t.items,c=t.getItemOptions,l=t.contentStyle,u=t.itemSize;return[A(`ul`,D({ref:function(e){return s.listRef(e,i)},id:e.$id+`_list`,class:[e.cx(`list`),r],style:l,role:`listbox`},e.ptm(`list`)),[(k(!0),j(O,null,R(o,function(t,r){return k(),j(O,{key:s.getOptionRenderKey(t,s.getOptionIndex(r,c))},[s.isOptionGroup(t)?(k(),j(`li`,D({key:0,id:e.$id+`_`+s.getOptionIndex(r,c),style:{height:u?u+`px`:void 0},class:e.cx(`optionGroup`),role:`option`},{ref_for:!0},e.ptm(`optionGroup`)),[T(e.$slots,`optiongroup`,{option:t.optionGroup,index:s.getOptionIndex(r,c)},function(){return[A(`span`,D({class:e.cx(`optionGroupLabel`)},{ref_for:!0},e.ptm(`optionGroupLabel`)),E(s.getOptionGroupLabel(t.optionGroup)),17)]})],16,Od)):De((k(),j(`li`,D({key:1,id:e.$id+`_`+s.getOptionIndex(r,c),class:e.cx(`option`,{option:t,focusedOption:s.getOptionIndex(r,c)}),style:{height:u?u+`px`:void 0},role:`option`,"aria-label":s.getOptionLabel(t),"aria-selected":s.isSelected(t),"aria-disabled":s.isOptionDisabled(t),"aria-setsize":s.ariaSetSize,"aria-posinset":s.getAriaPosInset(s.getOptionIndex(r,c)),onMousedown:function(e){return s.onOptionSelect(e,t)},onMousemove:function(e){return s.onOptionMouseMove(e,s.getOptionIndex(r,c))},onClick:n[8]||=Te(function(){},[`stop`]),"data-p-selected":!e.checkmark&&s.isSelected(t),"data-p-focused":a.focusedOptionIndex===s.getOptionIndex(r,c),"data-p-disabled":s.isOptionDisabled(t)},{ref_for:!0},s.getPTItemOptions(t,c,r,`option`)),[e.checkmark?(k(),j(O,{key:0},[s.isSelected(t)?(k(),P(p,D({key:0,class:e.cx(`optionCheckIcon`)},{ref_for:!0},e.ptm(`optionCheckIcon`)),null,16,[`class`])):(k(),P(m,D({key:1,class:e.cx(`optionBlankIcon`)},{ref_for:!0},e.ptm(`optionBlankIcon`)),null,16,[`class`]))],64)):L(``,!0),T(e.$slots,`option`,{option:t,selected:s.isSelected(t),index:s.getOptionIndex(r,c)},function(){return[A(`span`,D({class:e.cx(`optionLabel`)},{ref_for:!0},e.ptm(`optionLabel`)),E(s.getOptionLabel(t)),17)]})],16,kd)),[[_]])],64)}),128)),a.filterValue&&(!o||o&&o.length===0)?(k(),j(`li`,D({key:0,class:e.cx(`emptyMessage`),role:`option`},e.ptm(`emptyMessage`),{"data-p-hidden-accessible":!0}),[T(e.$slots,`emptyfilter`,{},function(){return[Ie(E(s.emptyFilterMessageText),1)]})],16)):!e.options||e.options&&e.options.length===0?(k(),j(`li`,D({key:1,class:e.cx(`emptyMessage`),role:`option`},e.ptm(`emptyMessage`),{"data-p-hidden-accessible":!0}),[T(e.$slots,`empty`,{},function(){return[Ie(E(s.emptyMessageText),1)]})],16)):L(``,!0)],16,Dd)]}),_:2},[e.$slots.loader?{name:`loader`,fn:t(function(t){var n=t.options;return[T(e.$slots,`loader`,{options:n})]}),key:`0`}:void 0]),1040,[`items`,`style`,`disabled`,`pt`])],16),T(e.$slots,`footer`,{value:e.d_value,options:s.visibleOptions}),!e.options||e.options&&e.options.length===0?(k(),j(`span`,D({key:1,role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenEmptyMessage`),{"data-p-hidden-accessible":!0}),E(s.emptyMessageText),17)):L(``,!0),A(`span`,D({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenSelectedMessage`),{"data-p-hidden-accessible":!0}),E(s.selectedMessageText),17),A(`span`,D({ref:`lastHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:n[9]||=function(){return s.onLastHiddenFocus&&s.onLastHiddenFocus.apply(s,arguments)}},e.ptm(`hiddenLastFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16)],16,Ed)):L(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`])],16,Cd)}Sd.render=Ad;var jd={name:`MinusIcon`,extends:St};function Md(e){return Id(e)||Fd(e)||Pd(e)||Nd()}function Nd(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Pd(e,t){if(e){if(typeof e==`string`)return Ld(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ld(e,t):void 0}}function Fd(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Id(e){if(Array.isArray(e))return Ld(e)}function Ld(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Rd(e,t,n,r,i,a){return k(),j(`svg`,D({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Md(t[0]||=[A(`path`,{d:`M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z`,fill:`currentColor`},null,-1)]),16)}jd.render=Rd;var zd=M.extend({name:`checkbox`,style:`
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
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-checkbox p-component`,{"p-checkbox-checked":t.checked,"p-disabled":n.disabled,"p-invalid":t.$pcCheckboxGroup?t.$pcCheckboxGroup.$invalid:t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-checkbox-sm p-inputfield-sm":n.size===`small`,"p-checkbox-lg p-inputfield-lg":n.size===`large`}]},box:`p-checkbox-box`,input:`p-checkbox-input`,icon:`p-checkbox-icon`}}),Bd={name:`BaseCheckbox`,extends:Hu,props:{value:null,binary:Boolean,indeterminate:{type:Boolean,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:zd,provide:function(){return{$pcCheckbox:this,$parentInstance:this}}};function Vd(e){"@babel/helpers - typeof";return Vd=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Vd(e)}function Hd(e,t,n){return(t=Ud(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ud(e){var t=Wd(e,`string`);return Vd(t)==`symbol`?t:t+``}function Wd(e,t){if(Vd(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Vd(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Gd(e){return Yd(e)||Jd(e)||qd(e)||Kd()}function Kd(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function qd(e,t){if(e){if(typeof e==`string`)return Xd(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Xd(e,t):void 0}}function Jd(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Yd(e){if(Array.isArray(e))return Xd(e)}function Xd(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var Zd={name:`Checkbox`,extends:Bd,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`update:indeterminate`],inject:{$pcCheckboxGroup:{default:void 0}},data:function(){return{d_indeterminate:this.indeterminate}},watch:{indeterminate:function(e){this.d_indeterminate=e,this.updateIndeterminate()}},mounted:function(){this.updateIndeterminate()},updated:function(){this.updateIndeterminate()},methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{checked:this.checked,indeterminate:this.d_indeterminate,disabled:this.disabled}})},onChange:function(e){var t=this;if(!this.disabled&&!this.readonly){var n=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value,r=this.binary?this.d_indeterminate?this.trueValue:this.checked?this.falseValue:this.trueValue:this.checked||this.d_indeterminate?n.filter(function(e){return!Re(e,t.value)}):n?[].concat(Gd(n),[this.value]):[this.value];this.d_indeterminate&&(this.d_indeterminate=!1,this.$emit(`update:indeterminate`,this.d_indeterminate)),this.$pcCheckboxGroup?this.$pcCheckboxGroup.writeValue(r,e):this.writeValue(r,e),this.$emit(`change`,e)}},onFocus:function(e){this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n,e)},updateIndeterminate:function(){this.$refs.input&&(this.$refs.input.indeterminate=this.d_indeterminate)}},computed:{groupName:function(){return this.$pcCheckboxGroup?this.$pcCheckboxGroup.groupName:this.$formName},checked:function(){var e=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value;return this.d_indeterminate?!1:this.binary?e===this.trueValue:he(this.value,e)},dataP:function(){return z(Hd({invalid:this.$invalid,checked:this.checked,disabled:this.disabled,filled:this.$variant===`filled`},this.size,this.size))}},components:{CheckIcon:Cn,MinusIcon:jd}},Qd=[`data-p-checked`,`data-p-indeterminate`,`data-p-disabled`,`data-p`],$d=[`id`,`value`,`name`,`checked`,`tabindex`,`disabled`,`readonly`,`required`,`aria-labelledby`,`aria-label`,`aria-invalid`],ef=[`data-p`];function tf(e,t,n,r,i,a){var s=o(`CheckIcon`),c=o(`MinusIcon`);return k(),j(`div`,D({class:e.cx(`root`)},a.getPTOptions(`root`),{"data-p-checked":a.checked,"data-p-indeterminate":i.d_indeterminate||void 0,"data-p-disabled":e.disabled,"data-p":a.dataP}),[A(`input`,D({ref:`input`,id:e.inputId,type:`checkbox`,class:[e.cx(`input`),e.inputClass],style:e.inputStyle,value:e.value,name:a.groupName,checked:a.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,required:e.required,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:t[0]||=function(){return a.onFocus&&a.onFocus.apply(a,arguments)},onBlur:t[1]||=function(){return a.onBlur&&a.onBlur.apply(a,arguments)},onChange:t[2]||=function(){return a.onChange&&a.onChange.apply(a,arguments)}},a.getPTOptions(`input`)),null,16,$d),A(`div`,D({class:e.cx(`box`)},a.getPTOptions(`box`),{"data-p":a.dataP}),[T(e.$slots,`icon`,{checked:a.checked,indeterminate:i.d_indeterminate,class:w(e.cx(`icon`)),dataP:a.dataP},function(){return[a.checked?(k(),P(s,D({key:0,class:e.cx(`icon`)},a.getPTOptions(`icon`),{"data-p":a.dataP}),null,16,[`class`,`data-p`])):i.d_indeterminate?(k(),P(c,D({key:1,class:e.cx(`icon`)},a.getPTOptions(`icon`),{"data-p":a.dataP}),null,16,[`class`,`data-p`])):L(``,!0)]})],16,ef)],16,Qd)}Zd.render=tf;export{Mn as $,Ll as A,uc as B,Fl as C,Al as D,Tl as E,Cc as F,mc as G,_c as H,Sc as I,Qs as J,ec as K,pc as L,Cl as M,Fc as N,Ol as O,Lc as P,Fn as Q,sc as R,Yl as S,El as T,vc as U,lc as V,hc as W,Xs as X,Ys as Y,Zs as Z,su as _,Hu as a,Ct as at,$l as b,Lu as c,z as ct,fu as d,Cn as et,du as f,iu as g,tu as h,Ju as i,Qt as it,Pl as j,Il as k,ku as l,lu as m,Sd as n,pn as nt,Vu as o,St as ot,cu as p,$s as q,ad as r,ln as rt,zu as s,V as st,Zd as t,xn as tt,xu as u,nu as v,kl as w,Zl as x,Ql as y,gc as z};