webpackJsonp([0],[,,,,,,,,,,,,,,,,,function(t,e,i){var s=i(140),n=function(t){var e=void 0;void 0===t&&(t={}),t.initialize?(e=t.initialize,delete t.initialize):e=function(){Array.prototype.splice.apply(arguments,[0,0,this]),n.parent.apply(void 0,arguments)},void 0!==t.Extends?(t.Extends.$$isConstructor=!0,e.prototype=Object.create(t.Extends.prototype),e.$$parentConstructor=t.Extends,delete t.Extends):(e.prototype=Object.create(s),e.$$parentConstructor=function(){}),e.prototype.$$getters={},e.prototype.$$setters={};for(var i in t)"function"==typeof t[i]?(t[i].$$name=i,t[i].$$owner=e.prototype,e.prototype[i]=t[i]):t[i]&&"object"==typeof t[i]&&(t[i].get||t[i].set)?(Object.defineProperty(e.prototype,i,t[i]),t[i].get&&(e.prototype.$$getters[i]=t[i].get,t[i].get.$$name=i,t[i].get.$$owner=e.prototype),t[i].set&&(e.prototype.$$setters[i]=t[i].set,t[i].set.$$name=i,t[i].set.$$owner=e.prototype)):e.prototype[i]=t[i];e.$$isConstructor=!0;for(var i=1;i<arguments.length;i++)arguments[i].compare(e);return e};n.parent=function(t){var e=n.parent.caller;if(arguments=Array.prototype.slice.apply(arguments,[1]),e.$$isConstructor)var i=e.$$parentConstructor;else{if(!e.$$name)throw"You cannot call parent here";var s=e.$$name,r=e.$$owner.$$getters[s],o=e.$$owner.$$setters[s];if(1==arguments.length&&o){var i=Object.getPrototypeOf(e.$$owner).$$setters[s];if(void 0===i)throw"No setter defined in parent"}else if(0==arguments.length&&r){var i=Object.getPrototypeOf(e.$$owner).$$getters[s];if(void 0===i)throw"No getter defined in parent"}else{if(o||r)throw"Incorrect amount of arguments sent to getter or setter";var i=Object.getPrototypeOf(e.$$owner)[s];if(void 0===i)throw"No parent function defined for "+s}}return i.apply(t,arguments)},t.exports=n},,,,,function(t,e){t.exports=Zepto},function(t,e,i){function s(){return this.loadType===d.typeText||this.loadType===d.typeArraybuffer||this.loadType===d.typeBlob||this.loadType===d.typeJSON||this.loadType===d.typeDocument||this.loadType===d.typeVideo||this.loadType===d.typeAudio}function n(){return void 0!==this.xhr.responseType}function r(t,e){return e!==d.typeVideo&&e!==d.typeAudio||(e=d.typeBlob),t.responseType=e,t.responseType===e}var o=i(17),a=i(71),h=i(143),u=i(72),p=i(67).EventEmitter,d=new o({Extends:p,initialize:function(t,e){o.parent(this),this.options=e,this.options.onComplete&&this.on("complete",this.options.onComplete),this.options.onProgress&&this.on("progress",this.options.onProgress),this.xhr=null,this.content=null,this.url=null,this.loadType=t||d.typeText,this.loadTypeSet=!1,this.fileMeta=null,this._onStateChange=this._onStateChange.bind(this),this._onProgress=this._onProgress.bind(this),this._dispatchProgress=this._dispatchProgress.bind(this),this._dispatchComplete=this._dispatchComplete.bind(this)},canLoadUsingXHR:function(){return"undefined"!=typeof XMLHttpRequest},canLoadType:function(t){var e=new XMLHttpRequest;return e.open("GET","someFakeURL",!0),r(e,t)},load:function(t){if(this.url=t,this.canLoadUsingXHR()){if(this.xhr=new XMLHttpRequest,this.xhr.open("GET",t,!0),this.xhr.onreadystatechange=this._onStateChange,void 0!==this.xhr.onprogress&&(this.xhr.onprogress=this._onProgress),this.loadType!==d.typeText){s.call(this)||(console.warn("Attempting to use incompatible load type "+this.loadType+". Switching it to "+d.typeText),this.loadType=d.typeText);try{this.loadTypeSet=n.call(this)&&r(this.xhr,this.loadType)}catch(t){this.loadTypeSet=!1}this.loadTypeSet||this.loadType!==d.typeBlob&&this.loadType!==d.typeArraybuffer||this.xhr.overrideMimeType("text/plain; charset=x-user-defined")}this.xhr.send()}},stopLoad:function(){this.xhr.abort()},_dispatchStart:function(){this.emit("start")},_dispatchProgress:function(t){this.emit("progress",t)},_dispatchComplete:function(){this.emit("complete",this.content)},_dispatchError:function(t){this.emit("error",t)},_onProgress:function(t){var e=t.loaded||t.position,i=t.total||t.totalSize;i?this._dispatchProgress(e/i):this._dispatchProgress(0)},_onStateChange:function(){if(this.xhr.readyState>1){var t,e=!1;try{t=this.xhr.status}catch(t){e=!0}if(200===t)switch(this.xhr.readyState){case 2:this.fileMeta=new a(this.xhr.getAllResponseHeaders()),this._dispatchStart();break;case 3:break;case 4:this._parseContent(),this._dispatchComplete()}else e||(this.xhr.onreadystatechange=void 0,this._dispatchError(this.xhr.status))}},_parseContent:function(){if(this.loadTypeSet||this.loadType===d.typeText)this.content=this.xhr.response||this.xhr.responseText;else switch(this.loadType){case d.typeArraybuffer:if(!ArrayBuffer)throw new Error("This browser does not support ArrayBuffer");this.content=h(this.xhr.response);break;case d.typeBlob:case d.typeVideo:case d.typeAudio:if(!Blob)throw new Error("This browser does not support Blob");this.fileMeta||(this.fileMeta=new a),null===this.fileMeta.mime&&(this.fileMeta.mime=u(this.url)),this.content=new Blob([h(this.xhr.response)],{type:this.fileMeta.mime});break;case d.typeJSON:this.content=JSON.parse(this.xhr.response);break;case d.typeDocument:this.content=this.xhr.response}}});d.typeText="text",d.typeArraybuffer="arraybuffer",d.typeBlob="blob",d.typeJSON="json",d.typeDocument="document",d.typeVideo="video",d.typeAudio="audio",t.exports=d},,,,,,,,,,,,,,,,,,,,,,,function(t,e,i){"use strict";function s(t,e){(0,r.default)("#"+t).removeClass("show").addClass("finish"),(0,r.default)("#"+e).removeClass("finish").addClass("show")}Object.defineProperty(e,"__esModule",{value:!0}),e.switchNextPage=s;var n=i(22),r=function(t){return t&&t.__esModule?t:{default:t}}(n)},,,,,,,,,,,,,,,,,,,,,function(t,e){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function s(t){return"function"==typeof t}function n(t){return"number"==typeof t}function r(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(t){if(!n(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},i.prototype.emit=function(t){var e,i,n,a,h,u;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var p=new Error('Uncaught, unspecified "error" event. ('+e+")");throw p.context=e,p}if(i=this._events[t],o(i))return!1;if(s(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),i.apply(this,a)}else if(r(i))for(a=Array.prototype.slice.call(arguments,1),u=i.slice(),n=u.length,h=0;h<n;h++)u[h].apply(this,a);return!0},i.prototype.addListener=function(t,e){var n;if(!s(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,s(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(n=o(this._maxListeners)?i.defaultMaxListeners:this._maxListeners)&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(t,e){function i(){this.removeListener(t,i),n||(n=!0,e.apply(this,arguments))}if(!s(e))throw TypeError("listener must be a function");var n=!1;return i.listener=e,this.on(t,i),this},i.prototype.removeListener=function(t,e){var i,n,o,a;if(!s(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(i=this._events[t],o=i.length,n=-1,i===e||s(i.listener)&&i.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(i)){for(a=o;a-- >0;)if(i[a]===e||i[a].listener&&i[a].listener===e){n=a;break}if(n<0)return this;1===i.length?(i.length=0,delete this._events[t]):i.splice(n,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},i.prototype.removeAllListeners=function(t){var e,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[t],s(i))this.removeListener(t,i);else if(i)for(;i.length;)this.removeListener(t,i[i.length-1]);return delete this._events[t],this},i.prototype.listeners=function(t){return this._events&&this._events[t]?s(this._events[t])?[this._events[t]]:this._events[t].slice():[]},i.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(s(e))return 1;if(e)return e.length}return 0},i.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e,i){var s=i(69),n=i(70);t.exports=function(t){var e;if(n(t)){e=s(t).split("/")[1]}else e=t.split(".").pop();return e||null}},function(t,e,i){(function(){function i(t){var e=null;if("string"!=typeof t)return e;var i=t.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);return i&&i.length&&(e=i[1]),e}void 0!==t&&t.exports&&(e=t.exports=i),e.base64MimeType=i}).call(this)},function(t,e){t.exports=function(t){return/^(data:\w+\/[a-zA-Z\+\-\.]+;base64,)?([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/gi.test(t)}},function(t,e,i){var s=i(142),n=function(t){this.mime=null,this.size=null,this.lastModified=null,this.httpHeader=null,t&&this.setFromHTTPHeader(t)};n.prototype={setFromHTTPHeader:function(t){this.httpHeader=s(t),this.httpHeader["content-length"]&&(this.size=this.httpHeader["content-length"]),this.httpHeader["content-type"]&&(this.mime=this.httpHeader["content-type"]),this.httpHeader["last-modified"]&&(this.lastModified=new Date(this.httpHeader["last-modified"]))}},t.exports=n},function(t,e,i){var s=i(69),n=i(68),r=i(70),o={gif:"image/gif",jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",svg:"image/svg+xml",html:"text/html",css:"text/css",csv:"text/csv",xml:"text/xml",mp4:"video/mp4",ogg:"video/ogg",ogv:"video/ogg",webm:"video/webm",wav:"audio/wav",mp3:"audio/mpeg"};t.exports=function(t){var e;if(r(t))e=s(t);else{var i=n(t);e=o[i.toLowerCase()]}return e||"application/octet-stream"}},function(t,e,i){var s=i(17),n=i(23),r=new s({Extends:n,initialize:function(t){s.parent(this,n.typeVideo,t)},_parseContent:function(){if(s.parent(this),!window.URL||!window.URL.createObjectURL)throw new Error("This browser does not support URL.createObjectURL()");var t=window.URL.createObjectURL(this.content);this.content=document.createElement(this.loadType),this.content.src=t}});t.exports=r},function(t,e,i){"use strict";t.exports={publicPath:"/lol/",port:8080,jssdkConfigURL:"http://weixin.bigtech.cc/service/jssdk_config?url="}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(22),n=function(t){return t&&t.__esModule?t:{default:t}}(s),r={init:function(){this.$audio=(0,n.default)("#audio"),this.$audioTimer=(0,n.default)("#audioTimer"),this.$timerWrapper=(0,n.default)("#timerWrapper"),this.isPlaying=!1,this.currentTime=0,this.isLocked=!1,this.handleTimeupdate=this.handleTimeupdate.bind(this),this.handleDurationchange=this.handleDurationchange.bind(this),this.handlePlaying=this.handlePlaying.bind(this),this.handleEnded=this.handleEnded.bind(this),this.toggle=this.toggle.bind(this),this.$audio.on("timeupdate",this.handleTimeupdate),this.$audio.on("durationchange",this.handleDurationchange),this.$audio.on("playing",this.handlePlaying),this.$audio.on("ended",this.handleEnded),this.$audio.on("pause",this.handleEnded),this.$timerWrapper.on("click",this.toggle),this.sync()},toggle:function(){this.isLocked||(this.isPlaying?this.pause():this.play())},handlePlaying:function(){this.isPlaying=!0,this.sync()},handleEnded:function(){this.isPlaying=!1,this.sync()},handleTimeupdate:function(){this.currentTime=this.$audio[0].currentTime,this.sync()},handleDurationchange:function(){this.duration=this.$audio[0].duration,this.currentTime=0,this.sync()},switchAudio:function(t){this.$audio.attr("src",t),this.$audio.currentTime=0,this.isPlaying=!1,this.isLocked=!1,this.handleDurationchange(),this.sync()},play:function(){this.$audio[0].play()},pause:function(){this.$audio[0].pause()},sync:function(){this.$timerWrapper[this.isPlaying?"removeClass":"addClass"]("paused"),this.$audioTimer.text(Math.floor(this.duration-this.currentTime))}};e.default=r},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,i){i(133),t.exports=i(134)},function(t,e){!function(t){"use strict";function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function i(t){return"string"!=typeof t&&(t=String(t)),t}function s(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return g.iterable&&(e[Symbol.iterator]=function(){return e}),e}function n(t){this.map={},t instanceof n?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function r(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function o(t){return new Promise(function(e,i){t.onload=function(){e(t.result)},t.onerror=function(){i(t.error)}})}function a(t){var e=new FileReader,i=o(e);return e.readAsArrayBuffer(t),i}function h(t){var e=new FileReader,i=o(e);return e.readAsText(t),i}function u(t){for(var e=new Uint8Array(t),i=new Array(e.length),s=0;s<e.length;s++)i[s]=String.fromCharCode(e[s]);return i.join("")}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function d(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(g.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(g.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(g.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(g.arrayBuffer&&g.blob&&b(t))this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!g.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!w(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=p(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):g.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},g.blob&&(this.blob=function(){var t=r(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?r(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var t=r(this);if(t)return t;if(this._bodyBlob)return h(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(u(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},g.formData&&(this.formData=function(){return this.text().then(f)}),this.json=function(){return this.text().then(JSON.parse)},this}function c(t){var e=t.toUpperCase();return x.indexOf(e)>-1?e:t}function l(t,e){e=e||{};var i=e.body;if(t instanceof l){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new n(t.headers)),this.method=t.method,this.mode=t.mode,i||null==t._bodyInit||(i=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new n(e.headers)),this.method=c(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&i)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i)}function f(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var i=t.split("="),s=i.shift().replace(/\+/g," "),n=i.join("=").replace(/\+/g," ");e.append(decodeURIComponent(s),decodeURIComponent(n))}}),e}function y(t){var e=new n;return t.split(/\r?\n/).forEach(function(t){var i=t.split(":"),s=i.shift().trim();if(s){var n=i.join(":").trim();e.append(s,n)}}),e}function m(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new n(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var g={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(g.arrayBuffer)var v=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],b=function(t){return t&&DataView.prototype.isPrototypeOf(t)},w=ArrayBuffer.isView||function(t){return t&&v.indexOf(Object.prototype.toString.call(t))>-1};n.prototype.append=function(t,s){t=e(t),s=i(s);var n=this.map[t];this.map[t]=n?n+","+s:s},n.prototype.delete=function(t){delete this.map[e(t)]},n.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},n.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},n.prototype.set=function(t,s){this.map[e(t)]=i(s)},n.prototype.forEach=function(t,e){for(var i in this.map)this.map.hasOwnProperty(i)&&t.call(e,this.map[i],i,this)},n.prototype.keys=function(){var t=[];return this.forEach(function(e,i){t.push(i)}),s(t)},n.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),s(t)},n.prototype.entries=function(){var t=[];return this.forEach(function(e,i){t.push([i,e])}),s(t)},g.iterable&&(n.prototype[Symbol.iterator]=n.prototype.entries);var x=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];l.prototype.clone=function(){return new l(this,{body:this._bodyInit})},d.call(l.prototype),d.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new n(this.headers),url:this.url})},m.error=function(){var t=new m(null,{status:0,statusText:""});return t.type="error",t};var _=[301,302,303,307,308];m.redirect=function(t,e){if(-1===_.indexOf(e))throw new RangeError("Invalid status code");return new m(null,{status:e,headers:{location:t}})},t.Headers=n,t.Request=l,t.Response=m,t.fetch=function(t,e){return new Promise(function(i,s){var n=new l(t,e),r=new XMLHttpRequest;r.onload=function(){var t={status:r.status,statusText:r.statusText,headers:y(r.getAllResponseHeaders()||"")};t.url="responseURL"in r?r.responseURL:t.headers.get("X-Request-URL");var e="response"in r?r.response:r.responseText;i(new m(e,t))},r.onerror=function(){s(new TypeError("Network request failed"))},r.ontimeout=function(){s(new TypeError("Network request failed"))},r.open(n.method,n.url,!0),"include"===n.credentials&&(r.withCredentials=!0),"responseType"in r&&g.blob&&(r.responseType="blob"),n.headers.forEach(function(t,e){r.setRequestHeader(e,t)}),r.send(void 0===n._bodyInit?null:n._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var n=i(22),r=s(n);i(135),i(136);var o=i(137),a=s(o),h=i(75),u=s(h),p=i(147),d=s(p),c=i(46);(0,a.default)(),(0,r.default)(function(){(0,r.default)("#btnStart").on("click",function(){(0,c.switchNextPage)("home","quiz"),u.default.play()}),(0,r.default)("#btnShare").on("click",function(){alert("点击右上角分享本网页哦~")}),(0,r.default)("#btnReplay").on("click",function(){d.default.replay()}),d.default.init()})},function(t,e){},function(t,e){},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}function n(){return fetch(p.publicPath+"manifest.json").then(function(t){return t.json()}).then(function(t){Object.values(t).forEach(function(t){return d.add(t)}),d.load()})}var r=i(22),o=s(r),a=i(138),h=s(a),u=i(46),p=i(74),d=(0,h.default)({xhrImages:!1}),c=(0,o.default)("#loadingStrip");d.on("progress",function(t){c.css("left",100*-(1-t)+"%")}),d.on("complete",function(){c.css("left","0"),setTimeout(u.switchNextPage,500,"load","home")}),t.exports=n},function(t,e,i){t.exports=i(139)},function(t,e,i){var s=i(17),n=i(67).EventEmitter,r=i(68),o=i(141),a=i(144),h=i(145),u=i(73),p=i(146),d={png:o,jpg:o,jpeg:o,gif:o,json:h,mp4:u,ogg:u,ogv:u,webm:u,mp3:p,wav:p},c=a,l=new s({Extends:n,initialize:function(t){if(!(this instanceof l))return new l(t);s.parent(this),this.options=this.parseOptions(t),this.options.onComplete&&this.on("complete",this.options.onComplete),this.options.onProgress&&this.on("progress",this.options.onProgress),this.reset(),this.loaders={},this._continueLoadQueue=this._continueLoadQueue.bind(this)},parseOptions:function(t){return{xhrImages:t.xhrImages||!1,onComplete:"function"==typeof t.onComplete?t.onComplete:void 0,onProgress:"function"==typeof t.onProgress?t.onProgress:void 0,throttle:t.throttle||0}},mergeOptions:function(t){return{xhrImages:t.xhrImages||this.options.xhrImages,onComplete:"function"==typeof t.onComplete?t.onComplete:this.options.onComplete,onProgress:"function"==typeof t.onProgress?t.onProgress:this.options.onProgress,throttle:t.throttle||this.options.throttle}},add:function(t,e){t&&this.addFromLoaderType(t,this._getLoader(t),e)},addImage:function(t,e){this.addFromLoaderType(t,o,e)},addJSON:function(t,e){this.addFromLoaderType(t,h,e)},addText:function(t,e){this.addFromLoaderType(t,a,e)},addVideo:function(t,e){this.addFromLoaderType(t,u,e)},addAudio:function(t,e){this.addFromLoaderType(t,p,e)},addFromLoaderType:function(t,e,i){if(!this.loaders[t])return this.loaders[t]=new e(this.mergeOptions(i||{})),this.urls.push(t),this.loaders[t]},setPercentage:function(t,e){this.percentageOfLoad[t]=e},load:function(){if(!this.loading){this._setupPercentages();for(var t=this.options.throttle||this.urls.length,e=0;e<t;e++)this._continueLoadQueue()}},reset:function(){this.percTotal=0,this.loadIdx=0,this.urls=[],this.progress=0,this.percentageOfLoad={},this.loading=!1,this.status={}},stopLoad:function(){if(this.loading)for(var t=0,e=this.urls.length;t<e;t++)this.loaders[this.urls[t]].stopLoad()},get:function(t){return this.loaders[t]&&this.loaders[t].content},_setupPercentages:function(){for(var t=0,e=1,i=0,s=1/this.urls.length,n=0,r=this.urls.length;n<r;n++)this.percentageOfLoad[this.urls[n]]?t+=this.percentageOfLoad[this.urls[n]]:i++;if(i>0){t>1&&(e=1/t,t*=e),s=(1-t)/i;for(var n=0,r=this.urls.length;n<r;n++)this.percentageOfLoad[this.urls[n]]?this.percentageOfLoad[this.urls[n]]*=e:this.percentageOfLoad[this.urls[n]]=s}},_continueLoadQueue:function(){if(this.loadIdx<this.urls.length){var t=this.urls[this.loadIdx],e=this.loaders[t];this.status[t]=!1,this.loadIdx++,e.on("progress",this._onLoadProgress.bind(this,t)),e.once("error",this._onLoadError.bind(this,t)),e.once("complete",this._onLoadComplete.bind(this,t)),e.load(t)}else this._checkComplete()&&this.emit("complete")},_onLoadError:function(t,e){console.warn("Couldn't load "+t+" received the error: "+e);var i=this.percentageOfLoad[t];this.emit("progress",this.percTotal+i,t),this.status[t]=!0,this._continueLoadQueue()},_onLoadProgress:function(t,e){var i=this.percentageOfLoad[t]*e;this.emit("progress",this.percTotal+i,t)},_onLoadComplete:function(t,e){this.percTotal+=this.percentageOfLoad[t],this.status[t]=!0,this._continueLoadQueue()},_checkComplete:function(){for(var t=!0,e=0,i=this.urls.length;e<i;e++)this.status[this.urls[e]]||(t=!1);return t},_getLoader:function(t){var e=r(t),i=c;return e&&d[e.toLowerCase()]&&(i=d[e.toLowerCase()]),i}});t.exports=l},function(t,e){t.exports={parent:function(){if(this.parent.caller.$$isConstructor)var t=this.parent.caller.$$parentConstructor;else{if(!this.parent.caller.$$name)throw"You cannot call parent here";var e=this.parent.caller.$$name,i=this.parent.caller.$$owner.$$getters[e],s=this.parent.caller.$$owner.$$setters[e];if(1==arguments.length&&s){var t=Object.getPrototypeOf(this.parent.caller.$$owner).$$setters[e];if(void 0===t)throw"No setter defined in parent"}else if(0==arguments.length&&i){var t=Object.getPrototypeOf(this.parent.caller.$$owner).$$getters[e];if(void 0===t)throw"No getter defined in parent"}else{if(s||i)throw"Incorrect amount of arguments sent to getter or setter";var t=Object.getPrototypeOf(this.parent.caller.$$owner)[e];if(void 0===t)throw"No parent function defined for "+e}}return t.apply(this,arguments)}}},function(t,e,i){var s=i(17),n=i(23),r=i(71),o=i(72),a=new s({Extends:n,initialize:function(t){this._imageLoaded=!1,s.parent(this,n.typeArraybuffer,t)},load:function(t){this.options.xhrImages&&this.canLoadUsingXHR()&&this.canLoadType(this.loadType)&&ArrayBuffer&&(window.URL||window.webkitURL||FileReader)?s.parent(this,t):this._createAndLoadImage(t)},_dispatchProgress:function(t){s.parent(this,this._imageLoaded?t:.9999*t)},_dispatchComplete:function(){this._imageLoaded&&s.parent(this)},_onImageLoadComplete:function(){this._imageLoaded=!0,this._dispatchProgress(1),this._dispatchComplete()},_onImageLoadFail:function(){this._dispatchError("Image failed to load")},_parseContent:function(){var t=null,e=null;if(this.fileMeta||(this.fileMeta=new r),this.loadTypeSet&&null!==this.fileMeta.mime||(this.fileMeta.mime=o(this.url)),this.xhr.response instanceof ArrayBuffer)t=this.xhr.response;else{if(!this.xhr.mozResponseArrayBuffer)throw new Error("Return type for image load unsupported");t=this.xhr.mozResponseArrayBuffer}if(e=new Blob([t],{type:this.fileMeta.mime}),window.URL||window.webkitURL)this._createAndLoadImage((window.URL||window.webkitURL).createObjectURL(e));else if(FileReader){var i=new FileReader;i.onloadend=function(){(window.URL||window.webkitURL)&&(window.URL||window.webkitURL).revokeObjectURL(e),this._createAndLoadImage(i.result)}.bind(this),i.readAsDataURL(e)}},_createAndLoadImage:function(t){this.content=new Image,this.content.onload=this._onImageLoadComplete.bind(this),this.content.onerror=this._onImageLoadFail.bind(this),this.content.src=t}});t.exports=a},function(t,e){t.exports=function(t){for(var e=t.split("\n"),i={},s=/([a-zA-Z0-9\-_]+): *(.+)/,n=null,r=0,o=e.length;r<o;r++)""!==e[r]&&(n=s.exec(e[r]))&&(i[n[1]]=n[2]);return i}},function(t,e){t.exports=function(t){for(var e=new ArrayBuffer(2*t.length),i=new Uint16Array(e),s=0,n=t.length;s<n;s++)i[s]=t.charCodeAt(s);return e}},function(t,e,i){var s=i(17),n=i(23),r=new s({Extends:n,initialize:function(t){s.parent(this,n.typeText,t)}});t.exports=r},function(t,e,i){var s=i(17),n=i(23),r=new s({Extends:n,initialize:function(t){s.parent(this,n.typeJSON,t)}});t.exports=r},function(t,e,i){var s=i(17),n=i(23),r=i(73),o=new s({Extends:r,initialize:function(t){s.parent(this,t),this.loadType=n.typeAudio}});t.exports=o},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(22),r=s(n),o=i(74),a=i(148),h=s(a),u=i(149),p=s(u),d=i(75),c=s(d),l=i(46),f=i(150),y=i(177),m={init:function(){this.MAX_FAIL=999,this.current=0,this.total=h.default.length,this.score=0,this.fail=0,this.isLocked=!1,this.beatPlayerNum=0,this.totalPlayerNum=1,this.$currentNum=(0,r.default)("#quizCurrentNum"),this.$totalNum=(0,r.default)("#quizTotalNum"),this.$quizQuestion=(0,r.default)("#quizQuestion"),this.$quizAnwsers=(0,r.default)("#quizAnwsers"),this.$shortRank=(0,r.default)("#shortRank"),this.$ranks=(0,r.default)(".rank"),this.$beatPercent=(0,r.default)("#beatPercent"),this.$medal=(0,r.default)("#medal"),this.handleOptionClick=this.handleOptionClick.bind(this),this.switchQuiz=this.switchQuiz.bind(this),c.default.init(),this.sync()},handleOptionClick:function(t){if(!this.isLocked){this.isLocked=!0,c.default.isLocked=!0,c.default.pause();var e=h.default[this.current].answerIndex,i=t===e,s=this.$quizAnwsers.children(),n=(0,r.default)(s[e]),o=(0,r.default)(s[t]);i?(n.addClass("congratulation"),this.score+=10):(this.fail+=1,n.addClass("rightAnswer"),o.addClass("wrongAnswer")),setTimeout(this.switchQuiz,1e3),this.updateRank()}},finish:function(){var t=this;fetch(o.publicPath+"rank",{method:"POST",credentials:"include",headers:{"Content-Type":"x-www-form-urlencoded"},body:r.default.param({score:this.score})}).then(function(t){return t.json()}).then(function(e){var i=e.data;t.beatPlayerNum=i.beat_player_number,t.totalPlayerNum=i.sum_player_number,t.sync(),(0,l.switchNextPage)("quiz","result")})},isEnded:function(){return this.fail===this.MAX_FAIL||this.current===this.total},switchQuiz:function(){this.current+=1,this.isEnded()?this.finish():(this.sync(),this.isLocked=!1,c.default.isLocked=!1)},createAnswerCard:function(t,e,i){var s=this,n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=(0,r.default)('\n      <li class="answerCard">\n        '+(n?'<img src="'+f("./"+(t+1)+"/"+(e+1)+".jpg")+'" alt=""/>':"")+"\n        <span>"+i+"</span>\n      </li>\n    ");return o.on("click",function(){s.handleOptionClick(e)}),o},updateRank:function(){var t=(0,u.getRankName)(this.score),e=p.default[t];this.$shortRank.text(e.name.slice(2)),this.$ranks.forEach(function(t){(0,r.default)(t).text(e.name)}),this.$medal.attr("src",y("./"+t+".svg")),(0,r.default)("#praise").text(e.praise)},replay:function(){this.init(),(0,l.switchNextPage)("result","quiz"),c.default.play()},sync:function(){var t=this;if(!this.isEnded()){var e=h.default[this.current],i=e.options.map(function(i,s){return t.createAnswerCard(t.current,s,i,e.hasImage)});this.$quizAnwsers.empty(),e.hasImage?this.$quizAnwsers.removeClass("text"):this.$quizAnwsers.addClass("text"),i.forEach(function(e){t.$quizAnwsers.append(e)}),this.$quizQuestion.text(e.desc),this.$currentNum.text(this.current+1),c.default.switchAudio(f("./"+(this.current+1)+"/audio.mp3")),0!==this.current&&c.default.play()}this.$totalNum.text(this.total),this.updateRank(),this.$beatPercent.text(Math.ceil(this.beatPlayerNum/this.totalPlayerNum*100)+"%")}};e.default=m},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=[{desc:"点击上方播放小按钮，在下方选出英雄角色名",options:["蛮三刀","德邦","琴女","德玛"],answerIndex:2,hasImage:!0},{desc:"这首歌是以下哪位歌手的作品",options:["周杰伦","杨坤","杨幂","周杰"],answerIndex:0,hasImage:!1},{desc:"还记得第一次光速QA的欣喜么?该BGM是瑞雯哪个皮肤的登场音乐",options:["兔女郎","冠军之刃","替父从军","电玩勇者"],answerIndex:3,hasImage:!0},{desc:"请选出与上面播放的音乐最符合的英雄角色",options:["安妮","皎月","光辉","阿木木"],answerIndex:3,hasImage:!0},{desc:"请判断上面播放音乐的音乐风格",options:["摇滚","电音","嘻哈","古典"],answerIndex:0,hasImage:!1},{desc:"请选出这首由PGONE演唱歌曲的作品名",options:["first blood","triple kill","Penta kill","shut down"],answerIndex:2,hasImage:!1},{desc:"Summoner's Call作为排位BGM，是由以下哪个合唱团演唱",options:["彩虹合唱团","彩红合唱团","色彩合唱团","彩绿合唱团"],answerIndex:0,hasImage:!1},{desc:"该歌曲是下面哪次大赛的主题曲",options:["S3","S4","LPL5","S7"],answerIndex:1,hasImage:!1},{desc:"该歌曲为2015年MSI演唱的LPL出征曲，其由谁演唱",options:["Rookie & Cool","Cool & Uzi","Rookie & Gogoing","PDD & white五五开"],answerIndex:0,hasImage:!1},{desc:"这首燃爆的BGM属于下面哪位英雄",options:["瑞兹","老鼠","加里奥","Uzi"],answerIndex:3,hasImage:!0}];e.default=s},function(t,e,i){"use strict";function s(t){switch(Math.ceil(t/10)){case 0:return"bronze";case 1:case 2:return"silver";case 3:case 4:return"gold";case 5:case 6:return"platinum";case 7:case 8:return"diamond";case 9:return"challenger";case 10:return"king";default:return"bronze"}}Object.defineProperty(e,"__esModule",{value:!0}),e.getRankName=s;var n={bronze:{name:"英勇黄铜",praise:"你好，我爱你，谢谢，辛苦了"},silver:{name:"不屈白银",praise:"你好，我爱你，谢谢，辛苦了"},gold:{name:"荣耀黄金",praise:"你好，我爱你，谢谢，辛苦了"},platinum:{name:"华贵铂金",praise:"你好，我爱你，谢谢，辛苦了"},diamond:{name:"璀璨钻石",praise:"你好，我爱你，谢谢，辛苦了"},challenger:{name:"超凡大师",praise:"你好，我爱你，谢谢，辛苦了"},king:{name:"最强王者",praise:"你好，我爱你，谢谢，辛苦了"}};e.default=n},function(t,e,i){function s(t){return i(n(t))}function n(t){var e=r[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var r={"./1/1.jpg":151,"./1/2.jpg":152,"./1/3.jpg":153,"./1/4.jpg":154,"./1/audio.mp3":155,"./10/1.jpg":156,"./10/2.jpg":157,"./10/3.jpg":158,"./10/4.jpg":159,"./10/audio.mp3":160,"./2/audio.mp3":161,"./3/1.jpg":162,"./3/2.jpg":163,"./3/3.jpg":164,"./3/4.jpg":165,"./3/audio.mp3":166,"./4/1.jpg":167,"./4/2.jpg":168,"./4/3.jpg":169,"./4/4.jpg":170,"./4/audio.mp3":171,"./5/audio.mp3":172,"./6/audio.mp3":173,"./7/audio.mp3":174,"./8/audio.mp3":175,"./9/audio.mp3":176};s.keys=function(){return Object.keys(r)},s.resolve=n,t.exports=s,s.id=150},function(t,e,i){t.exports=i.p+"assets/quiz/1/1.jpg?3155bd0"},function(t,e,i){t.exports=i.p+"assets/quiz/1/2.jpg?a85b875"},function(t,e,i){t.exports=i.p+"assets/quiz/1/3.jpg?899d701"},function(t,e,i){t.exports=i.p+"assets/quiz/1/4.jpg?b68af49"},function(t,e,i){t.exports=i.p+"assets/quiz/1/audio.mp3?884544b"},function(t,e,i){t.exports=i.p+"assets/quiz/10/1.jpg?b348524"},function(t,e,i){t.exports=i.p+"assets/quiz/10/2.jpg?116ab81"},function(t,e,i){t.exports=i.p+"assets/quiz/10/3.jpg?7d9d0a4"},function(t,e,i){t.exports=i.p+"assets/quiz/10/4.jpg?f013382"},function(t,e,i){t.exports=i.p+"assets/quiz/10/audio.mp3?7049df6"},function(t,e,i){t.exports=i.p+"assets/quiz/2/audio.mp3?e4f65e2"},function(t,e,i){t.exports=i.p+"assets/quiz/3/1.jpg?1a545d6"},function(t,e,i){t.exports=i.p+"assets/quiz/3/2.jpg?d66c013"},function(t,e,i){t.exports=i.p+"assets/quiz/3/3.jpg?b06ebb2"},function(t,e,i){t.exports=i.p+"assets/quiz/3/4.jpg?61f54ff"},function(t,e,i){t.exports=i.p+"assets/quiz/3/audio.mp3?5aeab82"},function(t,e,i){t.exports=i.p+"assets/quiz/4/1.jpg?bf0d441"},function(t,e,i){t.exports=i.p+"assets/quiz/4/2.jpg?5711105"},function(t,e,i){t.exports=i.p+"assets/quiz/4/3.jpg?cc7dc55"},function(t,e,i){t.exports=i.p+"assets/quiz/4/4.jpg?cc45d06"},function(t,e,i){t.exports=i.p+"assets/quiz/4/audio.mp3?abc4525"},function(t,e,i){t.exports=i.p+"assets/quiz/5/audio.mp3?6d4f1f1"},function(t,e,i){t.exports=i.p+"assets/quiz/6/audio.mp3?e1e6029"},function(t,e,i){t.exports=i.p+"assets/quiz/7/audio.mp3?46ee57b"},function(t,e,i){t.exports=i.p+"assets/quiz/8/audio.mp3?8af3566"},function(t,e,i){t.exports=i.p+"assets/quiz/9/audio.mp3?1154673"},function(t,e,i){function s(t){return i(n(t))}function n(t){var e=r[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var r={"./bronze.svg":178,"./challenger.svg":179,"./diamond.svg":180,"./gold.svg":181,"./king.svg":182,"./platinum.svg":183,"./silver.svg":184};s.keys=function(){return Object.keys(r)},s.resolve=n,t.exports=s,s.id=177},function(t,e,i){t.exports=i.p+"assets/ranks/bronze.svg?94e3cee"},function(t,e,i){t.exports=i.p+"assets/ranks/challenger.svg?1e387fd"},function(t,e,i){t.exports=i.p+"assets/ranks/diamond.svg?1d3b4bf"},function(t,e,i){t.exports=i.p+"assets/ranks/gold.svg?a0a4b86"},function(t,e,i){t.exports=i.p+"assets/ranks/king.svg?40d66f5"},function(t,e,i){t.exports=i.p+"assets/ranks/platinum.svg?99a6dc1"},function(t,e,i){t.exports=i.p+"assets/ranks/silver.svg?4731def"}],[132]);