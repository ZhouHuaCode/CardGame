cc.Class({
    extends: cc.Component,

    properties: {
        title:"",
        desc:"",
        link:"",
        imgUrl:"",
        signPackage:"",
        url:"http://h5.99thj.com/sharetx/getsharesign.php",
        // url:"http://pay2.ylwqgame.com/wxhd/wxshare/getsharesign.php",
        //url:"http://pay2.ylwqgame.com/wxhd/wxshare/getsign.php",
    },

    // LIFE-CYCLE CALLBACKS:

    share(title, desc, link, imgUrl){
           
        //初始化分享内容
        //this.shareTip = cc.find("Canvas/shareTip").getComponent("ShareTips");
        this.title = title;
        this.desc = desc;
        this.link = link;
        this.imgUrl = imgUrl;
        //获取签名

        this.getSignPackage();
    },

    /**
    * 获取签名分享
    */
    getSignPackage() {
        var self = this;
        var fn = function(ret){
            //alert(ret);
            ret = JSON.parse(ret);
            
            
            self.signPackage = ret;
            //基本配置
            self.getWeiXinConfig();
            self.getWeiXinShareTimeline();//分享朋友圈
            self.getWeiXinShareAppMessage();//分享朋友
            self.getWeiXinShareQQ();//分享QQ
            self.getWeiXinShareWeiBo();//分享到腾讯微博
        }

        

        var param = {
            url:self.url,
            args:{
                url : window.location.href.replace(/&/g,"%26"),
            },
            callback:function(event,info){
                //alert(event);
                fn(info);

            },
        };
        //alert("http get signpack")
        cc.vv.http.get(param);

        // sendRequest
        // cc.vv.http.sendRequest({url:window.location.href.replace(/&/g,"%26")},fn.bind(this),this.url);
    },

    getSignLocation() {
        
        let self = this;
        var fn = function(ret){

            ret = JSON.parse(ret);
            self.signPackage = ret;
            //基本配置
            self.getLocationConfig();
            self.getWeiXinLocation();
        }
        console.log("getSignLocation");
        //console.log(window.location.href.replace(/&/g,"%26"));

        var param = {
            url:self.url,
            args:{
                url : window.location.href.replace(/&/g,"%26"),
            },
            callback:function(event,info){
                fn(info);
            },
        };

        cc.vv.http.get(param);


        //cc.vv.http.sendRequest({url:window.location.href.replace(/&/g,"%26")},fn.bind(this),this.url);
    },

    /**
    * 获取微信配置
    */
    getWeiXinConfig(){
       /*
        * 注意：
        * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
        * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
        * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
        *
        * 如有问题请通过以下渠道反馈：
        * 邮箱地址：weixin-open@qq.com
        * 邮件主题：【微信JS-SDK反馈】具体问题
        * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
        */
       //配置参数

       //alert(this.signPackage.appId);

        wx.config({
        debug: false,        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.signPackage.appId,      // 必填，公众号的唯一标识
        timestamp: this.signPackage.timestamp,        // 必填，生成签名的时间戳
        nonceStr: this.signPackage.nonceStr, // 必填，生成签名的随机串
        signature: this.signPackage.signature,// 必填，签名
        jsApiList: [
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        ] // 必填，需要使用的JS接口列表
        });

        wx.ready(function(){
            //alert("ready");
            //cc.log("wx.ready end");
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });

        wx.error(function(res){
            //alert(res);
            
            //cc.log(res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });

    },

    getLocationConfig(){

        let self = this;
        wx.config({
        debug: false,        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.signPackage.appId,      // 必填，公众号的唯一标识
        timestamp: this.signPackage.timestamp,        // 必填，生成签名的时间戳
        nonceStr: this.signPackage.nonceStr, // 必填，生成签名的随机串
        signature: this.signPackage.signature,// 必填，签名
        jsApiList: [
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'getLocation'
        ] // 必填，需要使用的JS接口列表
        });

        wx.ready(function(){
            
        });

        wx.error(function(res){ 
            //console.log(res);
            
            //alert(res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });

    },
    /**
    * 获取微信分享到朋友圈
    */
    getWeiXinShareTimeline() {
        let self = this;
        var bodyMenuShareTimeline = {};
        bodyMenuShareTimeline.title = this.title;
        bodyMenuShareTimeline.link = this.link;
        bodyMenuShareTimeline.imgUrl = this.imgUrl;
        bodyMenuShareTimeline.trigger = () => {
           //alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = () => {
            var self = this;
            var onGet = function(ret){
                ret = JSON.parse(ret);
                if(ret.code==0){
                    //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"分享成功,恭喜你获得今日免费畅玩时间！");
                    // cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.NoBtn,"登录错误");
                    // cc.vv.alert.show("分享成功,恭喜你获得今日免费畅玩时间！");
                    //self.shareTip.hide();
                }else{
                    //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"分享成功");

                    //self.shareTip.hide();
                }
            };

            var param = {
                url:"http://h5a.1000study.com/data.php",
                args:{
                    cmd : "share",
                    user_id : cc.vv.userMgr.baseinfo.id,
                },
                callback:function(event,info){
                    onGet(info);
                },
            };
    
            cc.vv.http.get(param);


            //cc.vv.http.sendRequest({"cmd":"share","user_id":cc.vv.userMgr.id},onGet.bind(self));
        };
        bodyMenuShareTimeline.cancel = () => {
            //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"取消了分享");
            //cc.vv.alert.show("取消了分享");
            //self.shareTip.hide();
        };
        bodyMenuShareTimeline.fail = (res) => {
           //alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
    },

    /**
    * 获取微信分享到朋友
    */
    getWeiXinShareAppMessage(){
        let self = this;
        var bodyMenuShareAppMessage = {};
        bodyMenuShareAppMessage.title = this.title;
        bodyMenuShareAppMessage.desc = this.desc;
        bodyMenuShareAppMessage.link = this.link;
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        bodyMenuShareAppMessage.trigger = () => {
           //alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = () => {
            //alert('成功');
            
            //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"分享成功，要分享微信朋友圈才可以获得免费畅玩时间哦！");
            //cc.vv.alert.show("分享成功，要分享微信朋友圈才可以获得免费畅玩时间哦！");
            //self.shareTip.hide();
        };
        bodyMenuShareAppMessage.cancel = () => {
            //alert('取消');
            
            //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"取消了分享");
            
            //cc.vv.alert.show("取消了分享");
            //self.shareTip.hide();
        };
        bodyMenuShareAppMessage.fail = (res) => {
            //alert('失败');
           //alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
    },

    /**
    * 获取微信分享到QQ
    */
    getWeiXinShareQQ(){
        let self = this;
        var bodyMenuShareQQ = {};
        bodyMenuShareQQ.title = this.title;
        bodyMenuShareQQ.desc = this.desc;
        bodyMenuShareQQ.link = this.link;
        bodyMenuShareQQ.imgUrl = this.imgUrl;
        bodyMenuShareQQ.trigger = () => {
           //alert('用户点击分享到QQ');
        };
        bodyMenuShareQQ.complete = (res) => {
           //alert(JSON.stringify(res));
        };
        bodyMenuShareQQ.success = () => {
            //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"分享成功，要分享微信朋友圈才可以获得免费畅玩时间哦！");
            //self.shareTip.hide();
        };
        bodyMenuShareQQ.cancel = () => {
            //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"取消了分享");
            //self.shareTip.hide();
        };
        bodyMenuShareQQ.fail = (res) => {
           //alert(JSON.stringify(res));
        };
        wx.onMenuShareQQ(bodyMenuShareQQ);
    },

    /**
    * 获取微信分享到腾讯微博
    */
    getWeiXinShareWeiBo(){
        let self = this;
        var bodyMenuShareWeibo = {};
        bodyMenuShareWeibo.title = this.title;
        bodyMenuShareWeibo.desc = this.desc;
        bodyMenuShareWeibo.link = this.link;
        bodyMenuShareWeibo.imgUrl = this.imgUrl;
        bodyMenuShareWeibo.trigger = () => {
           //alert('用户点击分享到微博');
        };
        bodyMenuShareWeibo.complete = (res) => {
           //alert(JSON.stringify(res));
        };
        bodyMenuShareWeibo.success = () => {
            //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"分享成功，要分享微信朋友圈才可以获得免费畅玩时间哦！");
            //self.shareTip.hide();
        };
        bodyMenuShareWeibo.cancel = () => {
            //cc.vv.sceneMgr.showPromptWnd(cc.vv.enum.PromptWndType.OutClick | cc.vv.enum.PromptWndType.YesBtn,"取消了分享");
            //self.shareTip.hide();
        }; 
        bodyMenuShareWeibo.fail = (res) => {
           //alert(JSON.stringify(res));
        };
        wx.onMenuShareWeibo(bodyMenuShareWeibo);
    },

    //获取地理位置
    getWeiXinLocation:function(){
        wx.getLocation({
            type:'wgs84',
            success:function(res){
                console.log("getWeiXinLocation suc");
                
                cc.vv.userMgr.latitude = parseFloat(res.latitude);
                cc.vv.userMgr.longitude = parseFloat(res.longitude);
                console.log(cc.vv.userMgr.latitude);
                console.log(cc.vv.userMgr.longitude);
                //alert(cc.vv.userMgr.latitude);
            },
            cancel:function(res){
                console.log("getWeiXinLocation cancel");
                //alert("cancel");
                cc.vv.userMgr.latitude = 200;
                cc.vv.userMgr.longitude = 200;
            },
            fail:function(res){
                console.log("getWeiXinLocation fail");
                
                //alert("fail");
                cc.vv.userMgr.latitude = 0;
                cc.vv.userMgr.longitude = 0;
            },
        });
    },
    


    shareTipClose:function(){
        //let self = this;
        //self.shareTip.hide();
    },

    //这里的ticket是公众号用于调用微信JS接口的临时票据，正常情况下，ticket的有效期为7200秒，通过access_token来获取。由于获取ticket的api调用次数非常有限，频繁刷新ticket会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存ticket 。
    //这个ticket需要让服务器提供
    //顺便在里面加了一个自定义分享的实现
    initConfig : function (ticket) {
        var CryptoJS = CryptoJS || function (e, m) {
        var p = {}, j = p.lib = {}, l = function () { }, f = j.Base = { extend: function (a) { l.prototype = this; var c = new l; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
        n = j.WordArray = f.extend({
            init: function (a, c) { a = this.words = a || []; this.sigBytes = c != m ? c : 4 * a.length }, toString: function (a) { return (a || h).stringify(this) }, concat: function (a) { var c = this.words, q = a.words, d = this.sigBytes; a = a.sigBytes; this.clamp(); if (d % 4) for (var b = 0; b < a; b++)c[d + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4); else if (65535 < q.length) for (b = 0; b < a; b += 4)c[d + b >>> 2] = q[b >>> 2]; else c.push.apply(c, q); this.sigBytes += a; return this }, clamp: function () {
                var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
                    32 - 8 * (c % 4); a.length = e.ceil(c / 4)
                }, clone: function () { var a = f.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], b = 0; b < a; b += 4)c.push(4294967296 * e.random() | 0); return new n.init(c, a) }
            }), b = p.enc = {}, h = b.Hex = {
                stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], d = 0; d < a; d++) { var f = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255; b.push((f >>> 4).toString(16)); b.push((f & 15).toString(16)) } return b.join("") }, parse: function (a) {
                    for (var c = a.length, b = [], d = 0; d < c; d += 2)b[d >>> 3] |= parseInt(a.substr(d,
                        2), 16) << 24 - 4 * (d % 8); return new n.init(b, c / 2)
                }
            }, g = b.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], d = 0; d < a; d++)b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255)); return b.join("") }, parse: function (a) { for (var c = a.length, b = [], d = 0; d < c; d++)b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4); return new n.init(b, c) } }, r = b.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(g.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return g.parse(unescape(encodeURIComponent(a))) } },
            k = j.BufferedBlockAlgorithm = f.extend({
                reset: function () { this._data = new n.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = r.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, b = c.words, d = c.sigBytes, f = this.blockSize, h = d / (4 * f), h = a ? e.ceil(h) : e.max((h | 0) - this._minBufferSize, 0); a = h * f; d = e.min(4 * a, d); if (a) { for (var g = 0; g < a; g += f)this._doProcessBlock(b, g); g = b.splice(0, a); c.sigBytes -= d } return new n.init(g, d) }, clone: function () {
                    var a = f.clone.call(this);
                    a._data = this._data.clone(); return a
                }, _minBufferSize: 0
            }); j.Hasher = k.extend({
                cfg: f.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { k.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (c, b) { return (new a.init(b)).finalize(c) } }, _createHmacHelper: function (a) {
                    return function (b, f) {
                        return (new s.HMAC.init(a,
                            f)).finalize(b)
                    }
                }
            }); var s = p.algo = {}; return p
        }(Math);
        (function () {
            var e = CryptoJS, m = e.lib, p = m.WordArray, j = m.Hasher, l = [], m = e.algo.SHA1 = j.extend({
                _doReset: function () { this._hash = new p.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (f, n) {
                    for (var b = this._hash.words, h = b[0], g = b[1], e = b[2], k = b[3], j = b[4], a = 0; 80 > a; a++) {
                        if (16 > a) l[a] = f[n + a] | 0; else { var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16]; l[a] = c << 1 | c >>> 31 } c = (h << 5 | h >>> 27) + j + l[a]; c = 20 > a ? c + ((g & e | ~g & k) + 1518500249) : 40 > a ? c + ((g ^ e ^ k) + 1859775393) : 60 > a ? c + ((g & e | g & k | e & k) - 1894007588) : c + ((g ^ e ^
                            k) - 899497514); j = k; k = e; e = g << 30 | g >>> 2; g = h; h = c
                    } b[0] = b[0] + h | 0; b[1] = b[1] + g | 0; b[2] = b[2] + e | 0; b[3] = b[3] + k | 0; b[4] = b[4] + j | 0
                }, _doFinalize: function () { var f = this._data, e = f.words, b = 8 * this._nDataBytes, h = 8 * f.sigBytes; e[h >>> 5] |= 128 << 24 - h % 32; e[(h + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296); e[(h + 64 >>> 9 << 4) + 15] = b; f.sigBytes = 4 * e.length; this._process(); return this._hash }, clone: function () { var e = j.clone.call(this); e._hash = this._hash.clone(); return e }
            }); e.SHA1 = j._createHelper(m); e.HmacSHA1 = j._createHmacHelper(m)
        })();
        var data = new Date();
        var timestamp = data.getTime() + "";
        var nonceStr = Math.random() * 1000 + "";
        var url = location.href.split('#')[0];
        var string = "jsapi_ticket=" + ticket + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + url;

        var signature = CryptoJS.SHA1(string, { string: true }).toString()
        if(typeof(wx)=="undefined"){ 
            return;
        }
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: HeadDefine.appid, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "chooseWXPay",
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
    // update (dt) {},
});