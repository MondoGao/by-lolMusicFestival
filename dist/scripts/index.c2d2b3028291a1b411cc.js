webpackJsonp([0],[,,,,,,,,,,,,,,,,,function(t,e,i){var n=i(138),s=function(t){var e=void 0;void 0===t&&(t={}),t.initialize?(e=t.initialize,delete t.initialize):e=function(){Array.prototype.splice.apply(arguments,[0,0,this]),s.parent.apply(void 0,arguments)},void 0!==t.Extends?(t.Extends.$$isConstructor=!0,e.prototype=Object.create(t.Extends.prototype),e.$$parentConstructor=t.Extends,delete t.Extends):(e.prototype=Object.create(n),e.$$parentConstructor=function(){}),e.prototype.$$getters={},e.prototype.$$setters={};for(var i in t)"function"==typeof t[i]?(t[i].$$name=i,t[i].$$owner=e.prototype,e.prototype[i]=t[i]):t[i]&&"object"==typeof t[i]&&(t[i].get||t[i].set)?(Object.defineProperty(e.prototype,i,t[i]),t[i].get&&(e.prototype.$$getters[i]=t[i].get,t[i].get.$$name=i,t[i].get.$$owner=e.prototype),t[i].set&&(e.prototype.$$setters[i]=t[i].set,t[i].set.$$name=i,t[i].set.$$owner=e.prototype)):e.prototype[i]=t[i];e.$$isConstructor=!0;for(var i=1;i<arguments.length;i++)arguments[i].compare(e);return e};s.parent=function(t){var e=s.parent.caller;if(arguments=Array.prototype.slice.apply(arguments,[1]),e.$$isConstructor)var i=e.$$parentConstructor;else{if(!e.$$name)throw"You cannot call parent here";var n=e.$$name,r=e.$$owner.$$getters[n],o=e.$$owner.$$setters[n];if(1==arguments.length&&o){var i=Object.getPrototypeOf(e.$$owner).$$setters[n];if(void 0===i)throw"No setter defined in parent"}else if(0==arguments.length&&r){var i=Object.getPrototypeOf(e.$$owner).$$getters[n];if(void 0===i)throw"No getter defined in parent"}else{if(o||r)throw"Incorrect amount of arguments sent to getter or setter";var i=Object.getPrototypeOf(e.$$owner)[n];if(void 0===i)throw"No parent function defined for "+n}}return i.apply(t,arguments)},t.exports=s},,,,,function(t,e){t.exports=Zepto},function(t,e,i){function n(){return this.loadType===p.typeText||this.loadType===p.typeArraybuffer||this.loadType===p.typeBlob||this.loadType===p.typeJSON||this.loadType===p.typeDocument||this.loadType===p.typeVideo||this.loadType===p.typeAudio}function s(){return void 0!==this.xhr.responseType}function r(t,e){return e!==p.typeVideo&&e!==p.typeAudio||(e=p.typeBlob),t.responseType=e,t.responseType===e}var o=i(17),a=i(73),h=i(141),u=i(74),d=i(69).EventEmitter,p=new o({Extends:d,initialize:function(t,e){o.parent(this),this.options=e,this.options.onComplete&&this.on("complete",this.options.onComplete),this.options.onProgress&&this.on("progress",this.options.onProgress),this.xhr=null,this.content=null,this.url=null,this.loadType=t||p.typeText,this.loadTypeSet=!1,this.fileMeta=null,this._onStateChange=this._onStateChange.bind(this),this._onProgress=this._onProgress.bind(this),this._dispatchProgress=this._dispatchProgress.bind(this),this._dispatchComplete=this._dispatchComplete.bind(this)},canLoadUsingXHR:function(){return"undefined"!=typeof XMLHttpRequest},canLoadType:function(t){var e=new XMLHttpRequest;return e.open("GET","someFakeURL",!0),r(e,t)},load:function(t){if(this.url=t,this.canLoadUsingXHR()){if(this.xhr=new XMLHttpRequest,this.xhr.open("GET",t,!0),this.xhr.onreadystatechange=this._onStateChange,void 0!==this.xhr.onprogress&&(this.xhr.onprogress=this._onProgress),this.loadType!==p.typeText){n.call(this)||(console.warn("Attempting to use incompatible load type "+this.loadType+". Switching it to "+p.typeText),this.loadType=p.typeText);try{this.loadTypeSet=s.call(this)&&r(this.xhr,this.loadType)}catch(t){this.loadTypeSet=!1}this.loadTypeSet||this.loadType!==p.typeBlob&&this.loadType!==p.typeArraybuffer||this.xhr.overrideMimeType("text/plain; charset=x-user-defined")}this.xhr.send()}},stopLoad:function(){this.xhr.abort()},_dispatchStart:function(){this.emit("start")},_dispatchProgress:function(t){this.emit("progress",t)},_dispatchComplete:function(){this.emit("complete",this.content)},_dispatchError:function(t){this.emit("error",t)},_onProgress:function(t){var e=t.loaded||t.position,i=t.total||t.totalSize;i?this._dispatchProgress(e/i):this._dispatchProgress(0)},_onStateChange:function(){if(this.xhr.readyState>1){var t,e=!1;try{t=this.xhr.status}catch(t){e=!0}if(200===t)switch(this.xhr.readyState){case 2:this.fileMeta=new a(this.xhr.getAllResponseHeaders()),this._dispatchStart();break;case 3:break;case 4:this._parseContent(),this._dispatchComplete()}else e||(this.xhr.onreadystatechange=void 0,this._dispatchError(this.xhr.status))}},_parseContent:function(){if(this.loadTypeSet||this.loadType===p.typeText)this.content=this.xhr.response||this.xhr.responseText;else switch(this.loadType){case p.typeArraybuffer:if(!ArrayBuffer)throw new Error("This browser does not support ArrayBuffer");this.content=h(this.xhr.response);break;case p.typeBlob:case p.typeVideo:case p.typeAudio:if(!Blob)throw new Error("This browser does not support Blob");this.fileMeta||(this.fileMeta=new a),null===this.fileMeta.mime&&(this.fileMeta.mime=u(this.url)),this.content=new Blob([h(this.xhr.response)],{type:this.fileMeta.mime});break;case p.typeJSON:this.content=JSON.parse(this.xhr.response);break;case p.typeDocument:this.content=this.xhr.response}}});p.typeText="text",p.typeArraybuffer="arraybuffer",p.typeBlob="blob",p.typeJSON="json",p.typeDocument="document",p.typeVideo="video",p.typeAudio="audio",t.exports=p},,,,,,,,,,,,,,,,,,,,,,,function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function s(t,e){(0,u.default)("#"+t).removeClass("show").addClass("finish"),(0,u.default)("#"+e).removeClass("finish").addClass("show")}function r(t){return fetch("/service/resources/signature?url="+encodeURIComponent(t)).then(m).then(function(t){return t.json()})}function o(t){var e=t.link,i=t.title,n=t.imgUrl,s=t.desc;t.label;p.default.onMenuShareTimeline({title:i,link:e,imgUrl:n}),p.default.onMenuShareAppMessage({title:i,desc:s,link:e,imgUrl:n,type:"link",dataUrl:""}),p.default.onMenuShareQQ({title:i,desc:s,link:e,imgUrl:n}),p.default.onMenuShareQZone({title:i,desc:s,link:e,imgUrl:n})}function a(){r(window.location.href).then(function(t){p.default.config({debug:!1,appId:c.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"]}),p.default.ready(function(){o({link:window.location.href,title:"英雄联盟音乐排位赛",imgUrl:f.default,desc:"我打败了喵喵喵喵喵喵喵喵喵",label:""})})})}Object.defineProperty(e,"__esModule",{value:!0}),e.checkStatus=void 0,e.switchNextPage=s,e.getjssdkConfig=r,e.reconfigWechat=o,e.configWechat=a;var h=i(22),u=n(h),d=i(145),p=n(d),c=i(47),l=i(146),f=n(l),m=e.checkStatus=function(t){if(t.status>=200&&t.status<300)return t;var e=new Error(t.statusText);throw e.response=t,e}},function(t,e,i){"use strict";t.exports={publicPath:"/lol/",port:8080,jssdkConfigURL:"http://weixin.bigtech.cc/service/jssdk_config?url=",appId:"wx70014cb42f7c9422"}},,,,,,,,,,,,,,,,,,,,,function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function s(){return fetch(m.publicPath+"manifest.json").then(function(t){return t.json()}).then(function(t){return y=t,t})}function r(){g.css("left","-100%")}function o(){return Object.keys(y).length<1}function a(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"home";return r(),new Promise(function(n){var s=Date.now(),r=(0,l.default)({xhrImages:!1});r.on("progress",function(t){g.css("left",100*-(1-t)+"%")}),r.on("complete",function(){g.css("left","0");var t=1500-Date.now()+s;t<0&&(t=0),setTimeout(function(){(0,f.switchNextPage)("load",i),setTimeout(n,500)},t)}),Object.values(y).forEach(function(i){(e&&i.match(t)||!e&&!i.match(t))&&r.add(i)}),r.load()})}function h(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";v.text("音乐排位赛正在匹配中");var i="quiz/("+t.join("|")+")/";return a(new RegExp(i),!0,e)}function u(){return o()?s().then(function(){a(/\.mp3|Bg|Background|quiz/,!1)}):a(/\.mp3|Bg|Background|quiz/,!1)}Object.defineProperty(e,"__esModule",{value:!0}),e.isFirstLoad=o,e.createLoader=a,e.quizLoad=h,e.initLoad=u;var d=i(22),p=n(d),c=i(136),l=n(c),f=i(46),m=i(47),y={},g=(0,p.default)("#loadingStrip"),v=(0,p.default)("#loadingTip")},function(t,e){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(t){return"function"==typeof t}function s(t){return"number"==typeof t}function r(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(t){if(!s(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},i.prototype.emit=function(t){var e,i,s,a,h,u;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var d=new Error('Uncaught, unspecified "error" event. ('+e+")");throw d.context=e,d}if(i=this._events[t],o(i))return!1;if(n(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),i.apply(this,a)}else if(r(i))for(a=Array.prototype.slice.call(arguments,1),u=i.slice(),s=u.length,h=0;h<s;h++)u[h].apply(this,a);return!0},i.prototype.addListener=function(t,e){var s;if(!n(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,n(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(s=o(this._maxListeners)?i.defaultMaxListeners:this._maxListeners)&&s>0&&this._events[t].length>s&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(t,e){function i(){this.removeListener(t,i),s||(s=!0,e.apply(this,arguments))}if(!n(e))throw TypeError("listener must be a function");var s=!1;return i.listener=e,this.on(t,i),this},i.prototype.removeListener=function(t,e){var i,s,o,a;if(!n(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(i=this._events[t],o=i.length,s=-1,i===e||n(i.listener)&&i.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(i)){for(a=o;a-- >0;)if(i[a]===e||i[a].listener&&i[a].listener===e){s=a;break}if(s<0)return this;1===i.length?(i.length=0,delete this._events[t]):i.splice(s,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},i.prototype.removeAllListeners=function(t){var e,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[t],n(i))this.removeListener(t,i);else if(i)for(;i.length;)this.removeListener(t,i[i.length-1]);return delete this._events[t],this},i.prototype.listeners=function(t){return this._events&&this._events[t]?n(this._events[t])?[this._events[t]]:this._events[t].slice():[]},i.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(n(e))return 1;if(e)return e.length}return 0},i.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e,i){var n=i(71),s=i(72);t.exports=function(t){var e;if(s(t)){e=n(t).split("/")[1]}else e=t.split(".").pop();return e||null}},function(t,e,i){(function(){function i(t){var e=null;if("string"!=typeof t)return e;var i=t.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);return i&&i.length&&(e=i[1]),e}void 0!==t&&t.exports&&(e=t.exports=i),e.base64MimeType=i}).call(this)},function(t,e){t.exports=function(t){return/^(data:\w+\/[a-zA-Z\+\-\.]+;base64,)?([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/gi.test(t)}},function(t,e,i){var n=i(140),s=function(t){this.mime=null,this.size=null,this.lastModified=null,this.httpHeader=null,t&&this.setFromHTTPHeader(t)};s.prototype={setFromHTTPHeader:function(t){this.httpHeader=n(t),this.httpHeader["content-length"]&&(this.size=this.httpHeader["content-length"]),this.httpHeader["content-type"]&&(this.mime=this.httpHeader["content-type"]),this.httpHeader["last-modified"]&&(this.lastModified=new Date(this.httpHeader["last-modified"]))}},t.exports=s},function(t,e,i){var n=i(71),s=i(70),r=i(72),o={gif:"image/gif",jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",svg:"image/svg+xml",html:"text/html",css:"text/css",csv:"text/csv",xml:"text/xml",mp4:"video/mp4",ogg:"video/ogg",ogv:"video/ogg",webm:"video/webm",wav:"audio/wav",mp3:"audio/mpeg"};t.exports=function(t){var e;if(r(t))e=n(t);else{var i=s(t);e=o[i.toLowerCase()]}return e||"application/octet-stream"}},function(t,e,i){var n=i(17),s=i(23),r=new n({Extends:s,initialize:function(t){n.parent(this,s.typeVideo,t)},_parseContent:function(){if(n.parent(this),!window.URL||!window.URL.createObjectURL)throw new Error("This browser does not support URL.createObjectURL()");var t=window.URL.createObjectURL(this.content);this.content=document.createElement(this.loadType),this.content.src=t}});t.exports=r},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,i){i(133),t.exports=i(134)},function(t,e){!function(t){"use strict";function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function i(t){return"string"!=typeof t&&(t=String(t)),t}function n(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return g.iterable&&(e[Symbol.iterator]=function(){return e}),e}function s(t){this.map={},t instanceof s?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function r(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function o(t){return new Promise(function(e,i){t.onload=function(){e(t.result)},t.onerror=function(){i(t.error)}})}function a(t){var e=new FileReader,i=o(e);return e.readAsArrayBuffer(t),i}function h(t){var e=new FileReader,i=o(e);return e.readAsText(t),i}function u(t){for(var e=new Uint8Array(t),i=new Array(e.length),n=0;n<e.length;n++)i[n]=String.fromCharCode(e[n]);return i.join("")}function d(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function p(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(g.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(g.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(g.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(g.arrayBuffer&&g.blob&&w(t))this._bodyArrayBuffer=d(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!g.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!b(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=d(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):g.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},g.blob&&(this.blob=function(){var t=r(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?r(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var t=r(this);if(t)return t;if(this._bodyBlob)return h(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(u(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},g.formData&&(this.formData=function(){return this.text().then(f)}),this.json=function(){return this.text().then(JSON.parse)},this}function c(t){var e=t.toUpperCase();return x.indexOf(e)>-1?e:t}function l(t,e){e=e||{};var i=e.body;if(t instanceof l){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new s(t.headers)),this.method=t.method,this.mode=t.mode,i||null==t._bodyInit||(i=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new s(e.headers)),this.method=c(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&i)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i)}function f(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var i=t.split("="),n=i.shift().replace(/\+/g," "),s=i.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(s))}}),e}function m(t){var e=new s;return t.split(/\r?\n/).forEach(function(t){var i=t.split(":"),n=i.shift().trim();if(n){var s=i.join(":").trim();e.append(n,s)}}),e}function y(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new s(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var g={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(g.arrayBuffer)var v=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],w=function(t){return t&&DataView.prototype.isPrototypeOf(t)},b=ArrayBuffer.isView||function(t){return t&&v.indexOf(Object.prototype.toString.call(t))>-1};s.prototype.append=function(t,n){t=e(t),n=i(n);var s=this.map[t];this.map[t]=s?s+","+n:n},s.prototype.delete=function(t){delete this.map[e(t)]},s.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},s.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},s.prototype.set=function(t,n){this.map[e(t)]=i(n)},s.prototype.forEach=function(t,e){for(var i in this.map)this.map.hasOwnProperty(i)&&t.call(e,this.map[i],i,this)},s.prototype.keys=function(){var t=[];return this.forEach(function(e,i){t.push(i)}),n(t)},s.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),n(t)},s.prototype.entries=function(){var t=[];return this.forEach(function(e,i){t.push([i,e])}),n(t)},g.iterable&&(s.prototype[Symbol.iterator]=s.prototype.entries);var x=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];l.prototype.clone=function(){return new l(this,{body:this._bodyInit})},p.call(l.prototype),p.call(y.prototype),y.prototype.clone=function(){return new y(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new s(this.headers),url:this.url})},y.error=function(){var t=new y(null,{status:0,statusText:""});return t.type="error",t};var _=[301,302,303,307,308];y.redirect=function(t,e){if(-1===_.indexOf(e))throw new RangeError("Invalid status code");return new y(null,{status:e,headers:{location:t}})},t.Headers=s,t.Request=l,t.Response=y,t.fetch=function(t,e){return new Promise(function(i,n){var s=new l(t,e),r=new XMLHttpRequest;r.onload=function(){var t={status:r.status,statusText:r.statusText,headers:m(r.getAllResponseHeaders()||"")};t.url="responseURL"in r?r.responseURL:t.headers.get("X-Request-URL");var e="response"in r?r.response:r.responseText;i(new y(e,t))},r.onerror=function(){n(new TypeError("Network request failed"))},r.ontimeout=function(){n(new TypeError("Network request failed"))},r.open(s.method,s.url,!0),"include"===s.credentials&&(r.withCredentials=!0),"responseType"in r&&g.blob&&(r.responseType="blob"),s.headers.forEach(function(t,e){r.setRequestHeader(e,t)}),r.send(void 0===s._bodyInit?null:s._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var s=i(22),r=n(s);i(135);var o=i(68),a=i(147),h=n(a),u=i(46);(0,o.initLoad)(),h.default.init(),(0,r.default)(function(){var t=(0,r.default)("#share");(0,r.default)("#btnStart").on("click",function(){(0,u.switchNextPage)("home","load"),h.default.load("quiz")}),(0,r.default)("#btnShare").on("click",function(){t.addClass("show")}),(0,r.default)("#btnReplay").on("click",function(){h.default.replay()}),t.on("click",function(){t.removeClass("show")}),(0,u.configWechat)()})},function(t,e){},function(t,e,i){t.exports=i(137)},function(t,e,i){var n=i(17),s=i(69).EventEmitter,r=i(70),o=i(139),a=i(142),h=i(143),u=i(75),d=i(144),p={png:o,jpg:o,jpeg:o,gif:o,json:h,mp4:u,ogg:u,ogv:u,webm:u,mp3:d,wav:d},c=a,l=new n({Extends:s,initialize:function(t){if(!(this instanceof l))return new l(t);n.parent(this),this.options=this.parseOptions(t),this.options.onComplete&&this.on("complete",this.options.onComplete),this.options.onProgress&&this.on("progress",this.options.onProgress),this.reset(),this.loaders={},this._continueLoadQueue=this._continueLoadQueue.bind(this)},parseOptions:function(t){return{xhrImages:t.xhrImages||!1,onComplete:"function"==typeof t.onComplete?t.onComplete:void 0,onProgress:"function"==typeof t.onProgress?t.onProgress:void 0,throttle:t.throttle||0}},mergeOptions:function(t){return{xhrImages:t.xhrImages||this.options.xhrImages,onComplete:"function"==typeof t.onComplete?t.onComplete:this.options.onComplete,onProgress:"function"==typeof t.onProgress?t.onProgress:this.options.onProgress,throttle:t.throttle||this.options.throttle}},add:function(t,e){t&&this.addFromLoaderType(t,this._getLoader(t),e)},addImage:function(t,e){this.addFromLoaderType(t,o,e)},addJSON:function(t,e){this.addFromLoaderType(t,h,e)},addText:function(t,e){this.addFromLoaderType(t,a,e)},addVideo:function(t,e){this.addFromLoaderType(t,u,e)},addAudio:function(t,e){this.addFromLoaderType(t,d,e)},addFromLoaderType:function(t,e,i){if(!this.loaders[t])return this.loaders[t]=new e(this.mergeOptions(i||{})),this.urls.push(t),this.loaders[t]},setPercentage:function(t,e){this.percentageOfLoad[t]=e},load:function(){if(!this.loading){this._setupPercentages();for(var t=this.options.throttle||this.urls.length,e=0;e<t;e++)this._continueLoadQueue()}},reset:function(){this.percTotal=0,this.loadIdx=0,this.urls=[],this.progress=0,this.percentageOfLoad={},this.loading=!1,this.status={}},stopLoad:function(){if(this.loading)for(var t=0,e=this.urls.length;t<e;t++)this.loaders[this.urls[t]].stopLoad()},get:function(t){return this.loaders[t]&&this.loaders[t].content},_setupPercentages:function(){for(var t=0,e=1,i=0,n=1/this.urls.length,s=0,r=this.urls.length;s<r;s++)this.percentageOfLoad[this.urls[s]]?t+=this.percentageOfLoad[this.urls[s]]:i++;if(i>0){t>1&&(e=1/t,t*=e),n=(1-t)/i;for(var s=0,r=this.urls.length;s<r;s++)this.percentageOfLoad[this.urls[s]]?this.percentageOfLoad[this.urls[s]]*=e:this.percentageOfLoad[this.urls[s]]=n}},_continueLoadQueue:function(){if(this.loadIdx<this.urls.length){var t=this.urls[this.loadIdx],e=this.loaders[t];this.status[t]=!1,this.loadIdx++,e.on("progress",this._onLoadProgress.bind(this,t)),e.once("error",this._onLoadError.bind(this,t)),e.once("complete",this._onLoadComplete.bind(this,t)),e.load(t)}else this._checkComplete()&&this.emit("complete")},_onLoadError:function(t,e){console.warn("Couldn't load "+t+" received the error: "+e);var i=this.percentageOfLoad[t];this.emit("progress",this.percTotal+i,t),this.status[t]=!0,this._continueLoadQueue()},_onLoadProgress:function(t,e){var i=this.percentageOfLoad[t]*e;this.emit("progress",this.percTotal+i,t)},_onLoadComplete:function(t,e){this.percTotal+=this.percentageOfLoad[t],this.status[t]=!0,this._continueLoadQueue()},_checkComplete:function(){for(var t=!0,e=0,i=this.urls.length;e<i;e++)this.status[this.urls[e]]||(t=!1);return t},_getLoader:function(t){var e=r(t),i=c;return e&&p[e.toLowerCase()]&&(i=p[e.toLowerCase()]),i}});t.exports=l},function(t,e){t.exports={parent:function(){if(this.parent.caller.$$isConstructor)var t=this.parent.caller.$$parentConstructor;else{if(!this.parent.caller.$$name)throw"You cannot call parent here";var e=this.parent.caller.$$name,i=this.parent.caller.$$owner.$$getters[e],n=this.parent.caller.$$owner.$$setters[e];if(1==arguments.length&&n){var t=Object.getPrototypeOf(this.parent.caller.$$owner).$$setters[e];if(void 0===t)throw"No setter defined in parent"}else if(0==arguments.length&&i){var t=Object.getPrototypeOf(this.parent.caller.$$owner).$$getters[e];if(void 0===t)throw"No getter defined in parent"}else{if(n||i)throw"Incorrect amount of arguments sent to getter or setter";var t=Object.getPrototypeOf(this.parent.caller.$$owner)[e];if(void 0===t)throw"No parent function defined for "+e}}return t.apply(this,arguments)}}},function(t,e,i){var n=i(17),s=i(23),r=i(73),o=i(74),a=new n({Extends:s,initialize:function(t){this._imageLoaded=!1,n.parent(this,s.typeArraybuffer,t)},load:function(t){this.options.xhrImages&&this.canLoadUsingXHR()&&this.canLoadType(this.loadType)&&ArrayBuffer&&(window.URL||window.webkitURL||FileReader)?n.parent(this,t):this._createAndLoadImage(t)},_dispatchProgress:function(t){n.parent(this,this._imageLoaded?t:.9999*t)},_dispatchComplete:function(){this._imageLoaded&&n.parent(this)},_onImageLoadComplete:function(){this._imageLoaded=!0,this._dispatchProgress(1),this._dispatchComplete()},_onImageLoadFail:function(){this._dispatchError("Image failed to load")},_parseContent:function(){var t=null,e=null;if(this.fileMeta||(this.fileMeta=new r),this.loadTypeSet&&null!==this.fileMeta.mime||(this.fileMeta.mime=o(this.url)),this.xhr.response instanceof ArrayBuffer)t=this.xhr.response;else{if(!this.xhr.mozResponseArrayBuffer)throw new Error("Return type for image load unsupported");t=this.xhr.mozResponseArrayBuffer}if(e=new Blob([t],{type:this.fileMeta.mime}),window.URL||window.webkitURL)this._createAndLoadImage((window.URL||window.webkitURL).createObjectURL(e));else if(FileReader){var i=new FileReader;i.onloadend=function(){(window.URL||window.webkitURL)&&(window.URL||window.webkitURL).revokeObjectURL(e),this._createAndLoadImage(i.result)}.bind(this),i.readAsDataURL(e)}},_createAndLoadImage:function(t){this.content=new Image,this.content.onload=this._onImageLoadComplete.bind(this),this.content.onerror=this._onImageLoadFail.bind(this),this.content.src=t}});t.exports=a},function(t,e){t.exports=function(t){for(var e=t.split("\n"),i={},n=/([a-zA-Z0-9\-_]+): *(.+)/,s=null,r=0,o=e.length;r<o;r++)""!==e[r]&&(s=n.exec(e[r]))&&(i[s[1]]=s[2]);return i}},function(t,e){t.exports=function(t){for(var e=new ArrayBuffer(2*t.length),i=new Uint16Array(e),n=0,s=t.length;n<s;n++)i[n]=t.charCodeAt(n);return e}},function(t,e,i){var n=i(17),s=i(23),r=new n({Extends:s,initialize:function(t){n.parent(this,s.typeText,t)}});t.exports=r},function(t,e,i){var n=i(17),s=i(23),r=new n({Extends:s,initialize:function(t){n.parent(this,s.typeJSON,t)}});t.exports=r},function(t,e,i){var n=i(17),s=i(23),r=i(75),o=new n({Extends:r,initialize:function(t){n.parent(this,t),this.loadType=s.typeAudio}});t.exports=o},function(t,e){t.exports=wx},function(t,e,i){t.exports=i.p+"assets/icon.png?85bfe2a"},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(22),r=n(s),o=i(47),a=i(148),h=i(149),u=n(h),d=i(150),p=n(d),c=i(68),l=i(46),f=i(151),m=i(178),y={resetQuizSet:function(){if(Math.random()<=.3)this.currentSet="REC";else{var t=Object.keys(a.quizSetData).filter(function(t){return"REC"!==t});this.currentSet=t[Math.floor(.999*Math.random()*t.length)]}this.current=0,this.total=this.getSetData().length,this.score=0,this.fail=0},getSetData:function(){return a.quizSetData[this.currentSet]},getCurrentQuiz:function(){var t=this;return a.quizData.find(function(e){return e.id===t.getSetData()[t.current]})},init:function(){this.MAX_FAIL=999,this.resetQuizSet(),this.isLocked=!1,this.beatPlayerNum=0,this.totalPlayerNum=1,this.$currentNum=(0,r.default)("#quizCurrentNum"),this.$totalNum=(0,r.default)("#quizTotalNum"),this.$quizQuestion=(0,r.default)("#quizQuestion"),this.$quizAnwsers=(0,r.default)("#quizAnwsers"),this.$shortRank=(0,r.default)("#shortRank"),this.$ranks=(0,r.default)(".rank"),this.$beatPercent=(0,r.default)("#beatPercent"),this.$medal=(0,r.default)("#medal"),this.handleOptionClick=this.handleOptionClick.bind(this),this.switchQuiz=this.switchQuiz.bind(this),p.default.init(),this.sync()},handleOptionClick:function(t){if(!this.isLocked){this.isLocked=!0,p.default.isLocked=!0,p.default.pause();var e=this.getCurrentQuiz(),i=e.answerIndex,n=t===i,s=this.$quizAnwsers.children(),o=(0,r.default)(s[i]),a=(0,r.default)(s[t]);n?(o.addClass("congratulation"),(0,r.default)("#timerWrapper").addClass("update"),this.score+=10):(this.fail+=1,o.addClass("rightAnswer"),a.addClass("wrongAnswer")),setTimeout(this.switchQuiz,700),this.updateRank()}},finish:function(){var t=this;fetch(o.publicPath+"rank",{method:"POST",credentials:"include",headers:{"Content-Type":"x-www-form-urlencoded"},body:r.default.param({score:this.score})}).then(function(t){return t.json()}).then(function(e){var i=e.data;t.beatPlayerNum=i.beat_player_number,t.totalPlayerNum=i.sum_player_number,t.sync(),(0,l.switchNextPage)("quiz","result")})},isEnded:function(){return this.fail===this.MAX_FAIL||this.current===this.total},switchQuiz:function(){(0,r.default)("#timerWrapper").removeClass("update"),this.current+=1,this.isEnded()?this.finish():(this.sync(),this.isLocked=!1,p.default.isLocked=!1)},createAnswerCard:function(t,e,i){var n=t.id,s=t.hasImage,o=this,a=(0,r.default)('\n      <li class="answerCard">\n        '+(s?'<img src="'+f("./"+n+"/"+(e+1)+".jpg")+'" alt=""/>':"")+"\n        <span>"+i+"</span>\n      </li>\n    ");return a.on("click",function(){o.handleOptionClick(e)}),a},updateRank:function(){var t=(0,h.getRankName)(this.score),e=u.default[t];this.$shortRank.text(e.name.slice(2)),this.$ranks.forEach(function(t){(0,r.default)(t).text(e.name)}),this.$medal.attr("src",m("./"+t+".svg")),(0,r.default)("#praise").text(e.praise)},replay:function(){this.init(),(0,l.switchNextPage)("result","load"),this.load("quiz")},load:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return(0,c.quizLoad)(this.getSetData(),t).then(function(){return p.default.play()})},sync:function(){var t=this;if(!this.isEnded()){var e=this.getCurrentQuiz(),i=e.options.map(function(i,n){return t.createAnswerCard(e,n,i)});this.$quizAnwsers.empty(),e.hasImage?this.$quizAnwsers.removeClass("text"):this.$quizAnwsers.addClass("text"),i.forEach(function(e){t.$quizAnwsers.append(e)}),this.$quizQuestion.text(e.desc),this.$currentNum.text(this.current+1),p.default.switchAudio(f("./"+e.id+"/audio.mp3")),0!==this.current&&p.default.play()}this.$totalNum.text(this.total),this.updateRank(),this.$beatPercent.text(Math.ceil(this.beatPlayerNum/this.totalPlayerNum*100)+"%")}};e.default=y},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.quizSetData={REC:[201,202,203,204,205,206],1:[205,206,207,208,209,210]},e.quizData=[{id:201,desc:"点击上方播放小按钮，在下方选出英雄角色名",options:["蛮三刀","德邦","琴女","德玛"],answerIndex:2,hasImage:!0},{id:202,desc:"这首歌是以下哪位歌手的作品",options:["周杰伦","杨坤","杨幂","周杰"],answerIndex:0,hasImage:!1},{id:203,desc:"还记得第一次光速QA的欣喜么?该BGM是瑞雯哪个皮肤的登场音乐",options:["兔女郎","冠军之刃","替父从军","电玩勇者"],answerIndex:3,hasImage:!0},{id:204,desc:"请选出与上面播放的音乐最符合的英雄角色",options:["安妮","皎月","光辉","阿木木"],answerIndex:3,hasImage:!0},{id:205,desc:"请判断上面播放音乐的音乐风格",options:["摇滚","电音","嘻哈","古典"],answerIndex:0,hasImage:!1},{id:206,desc:"请选出这首由PGONE演唱歌曲的作品名",options:["first blood","triple kill","Penta kill","shut down"],answerIndex:2,hasImage:!1},{id:207,desc:"Summoner's Call作为排位BGM，是由以下哪个合唱团演唱",options:["彩虹合唱团","彩红合唱团","色彩合唱团","彩绿合唱团"],answerIndex:0,hasImage:!1},{id:208,desc:"该歌曲是下面哪次大赛的主题曲",options:["S3","S4","LPL5","S7"],answerIndex:1,hasImage:!1},{id:209,desc:"该歌曲为2015年MSI演唱的LPL出征曲，其由谁演唱",options:["Rookie & Cool","Cool & Uzi","Rookie & Gogoing","PDD & white五五开"],answerIndex:0,hasImage:!1},{id:210,desc:"这首燃爆的BGM属于下面哪位英雄",options:["瑞兹","老鼠","加里奥","Uzi"],answerIndex:3,hasImage:!0}]},function(t,e,i){"use strict";function n(t){switch(Math.ceil(t/10)){case 0:return"bronze";case 1:return"silver";case 2:return"gold";case 3:return"platinum";case 4:return"diamond";case 5:return"challenger";case 6:default:return"king"}}Object.defineProperty(e,"__esModule",{value:!0}),e.getRankName=n;var s={bronze:{name:"英勇青铜",praise:"你好，我爱你，谢谢，辛苦了"},silver:{name:"不屈白银",praise:"你好，我爱你，谢谢，辛苦了"},gold:{name:"荣耀黄金",praise:"你好，我爱你，谢谢，辛苦了"},platinum:{name:"华贵铂金",praise:"你好，我爱你，谢谢，辛苦了"},diamond:{name:"璀璨钻石",praise:"你好，我爱你，谢谢，辛苦了"},challenger:{name:"超凡大师",praise:"你好，我爱你，谢谢，辛苦了"},king:{name:"最强王者",praise:"你好，我爱你，谢谢，辛苦了"}};e.default=s},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(22),s=function(t){return t&&t.__esModule?t:{default:t}}(n),r={init:function(){this.$audio=(0,s.default)("#audio"),this.$audioTimer=(0,s.default)("#audioTimer"),this.$timerWrapper=(0,s.default)("#timerWrapper"),this.isPlaying=!1,this.currentTime=0,this.isLocked=!1,this.handleTimeupdate=this.handleTimeupdate.bind(this),this.handleDurationchange=this.handleDurationchange.bind(this),this.handlePlaying=this.handlePlaying.bind(this),this.handleEnded=this.handleEnded.bind(this),this.toggle=this.toggle.bind(this),this.$audio.on("timeupdate",this.handleTimeupdate),this.$audio.on("durationchange",this.handleDurationchange),this.$audio.on("playing",this.handlePlaying),this.$audio.on("ended",this.handleEnded),this.$audio.on("pause",this.handleEnded),this.$timerWrapper.on("click",this.toggle),this.sync()},toggle:function(){this.isLocked||(this.isPlaying?this.pause():this.play())},handlePlaying:function(){this.isPlaying=!0,this.sync()},handleEnded:function(){this.isPlaying=!1,this.sync()},handleTimeupdate:function(){this.currentTime=this.$audio[0].currentTime,this.sync()},handleDurationchange:function(){this.duration=this.$audio[0].duration,this.currentTime=0,this.sync()},switchAudio:function(t){this.$audio.attr("src",t),this.$audio.currentTime=0,this.isPlaying=!1,this.isLocked=!1,this.handleDurationchange(),this.sync()},play:function(){this.$audio[0].play()},pause:function(){this.$audio[0].pause()},sync:function(){this.$timerWrapper[this.isPlaying?"removeClass":"addClass"]("paused"),this.$audioTimer.text(Math.floor(this.duration-this.currentTime))}};e.default=r},function(t,e,i){function n(t){return i(s(t))}function s(t){var e=r[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var r={"./201/1.jpg":152,"./201/2.jpg":153,"./201/3.jpg":154,"./201/4.jpg":155,"./201/audio.mp3":156,"./202/audio.mp3":157,"./203/1.jpg":158,"./203/2.jpg":159,"./203/3.jpg":160,"./203/4.jpg":161,"./203/audio.mp3":162,"./204/1.jpg":163,"./204/2.jpg":164,"./204/3.jpg":165,"./204/4.jpg":166,"./204/audio.mp3":167,"./205/audio.mp3":168,"./206/audio.mp3":169,"./207/audio.mp3":170,"./208/audio.mp3":171,"./209/audio.mp3":172,"./210/1.jpg":173,"./210/2.jpg":174,"./210/3.jpg":175,"./210/4.jpg":176,"./210/audio.mp3":177};n.keys=function(){return Object.keys(r)},n.resolve=s,t.exports=n,n.id=151},function(t,e,i){t.exports=i.p+"assets/quiz/201/1.jpg?fd0a1ce"},function(t,e,i){t.exports=i.p+"assets/quiz/201/2.jpg?fc72532"},function(t,e,i){t.exports=i.p+"assets/quiz/201/3.jpg?7145841"},function(t,e,i){t.exports=i.p+"assets/quiz/201/4.jpg?5e5e4dd"},function(t,e,i){t.exports=i.p+"assets/quiz/201/audio.mp3?884544b"},function(t,e,i){t.exports=i.p+"assets/quiz/202/audio.mp3?e4f65e2"},function(t,e,i){t.exports=i.p+"assets/quiz/203/1.jpg?7952f31"},function(t,e,i){t.exports=i.p+"assets/quiz/203/2.jpg?78d0de9"},function(t,e,i){t.exports=i.p+"assets/quiz/203/3.jpg?da968ae"},function(t,e,i){t.exports=i.p+"assets/quiz/203/4.jpg?26cb0e1"},function(t,e,i){t.exports=i.p+"assets/quiz/203/audio.mp3?5aeab82"},function(t,e,i){t.exports=i.p+"assets/quiz/204/1.jpg?2fe15b3"},function(t,e,i){t.exports=i.p+"assets/quiz/204/2.jpg?7416ee9"},function(t,e,i){t.exports=i.p+"assets/quiz/204/3.jpg?bd87bfb"},function(t,e,i){t.exports=i.p+"assets/quiz/204/4.jpg?10c0ef6"},function(t,e,i){t.exports=i.p+"assets/quiz/204/audio.mp3?abc4525"},function(t,e,i){t.exports=i.p+"assets/quiz/205/audio.mp3?6d4f1f1"},function(t,e,i){t.exports=i.p+"assets/quiz/206/audio.mp3?e1e6029"},function(t,e,i){t.exports=i.p+"assets/quiz/207/audio.mp3?46ee57b"},function(t,e,i){t.exports=i.p+"assets/quiz/208/audio.mp3?8af3566"},function(t,e,i){t.exports=i.p+"assets/quiz/209/audio.mp3?1154673"},function(t,e,i){t.exports=i.p+"assets/quiz/210/1.jpg?aa1524a"},function(t,e,i){t.exports=i.p+"assets/quiz/210/2.jpg?8c84360"},function(t,e,i){t.exports=i.p+"assets/quiz/210/3.jpg?aeac8cf"},function(t,e,i){t.exports=i.p+"assets/quiz/210/4.jpg?c4170fa"},function(t,e,i){t.exports=i.p+"assets/quiz/210/audio.mp3?7049df6"},function(t,e,i){function n(t){return i(s(t))}function s(t){var e=r[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var r={"./bronze.svg":179,"./challenger.svg":180,"./diamond.svg":181,"./gold.svg":182,"./king.svg":183,"./platinum.svg":184,"./silver.svg":185};n.keys=function(){return Object.keys(r)},n.resolve=s,t.exports=n,n.id=178},function(t,e,i){t.exports=i.p+"assets/ranks/bronze.svg?65bf84c"},function(t,e,i){t.exports=i.p+"assets/ranks/challenger.svg?c24546a"},function(t,e,i){t.exports=i.p+"assets/ranks/diamond.svg?d7e80f3"},function(t,e,i){t.exports=i.p+"assets/ranks/gold.svg?88606b9"},function(t,e,i){t.exports=i.p+"assets/ranks/king.svg?338311a"},function(t,e,i){t.exports=i.p+"assets/ranks/platinum.svg?7afba89"},function(t,e,i){t.exports=i.p+"assets/ranks/silver.svg?ac07707"}],[132]);