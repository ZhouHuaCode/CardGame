// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (!cc.vv) {
            cc.vv = {};
        }

        var message = require("Message");
        cc.vv.message = new message();
        cc.vv.message.init();
        
        var enumCfg = require("enumCfg");
        cc.vv.enum = new enumCfg();
        cc.vv.enum.init();

        var NetPB = require("NetPB");
        cc.vv.NetPB = new NetPB();

       // this.testLoadPb();

        var anyPBHelper = require('AnyPbHelp');
        cc.vv.pbHelp = new anyPBHelper();
        cc.vv.pbHelp.init();


        var util = require("util");
        cc.vv.util = new util();
        cc.vv.util.init();

        var hu = require("Hu");
        cc.vv.huPai = new hu();
        cc.vv.huPai.init();

        var UserMgr = require("UserMgr");
        cc.vv.userMgr = new UserMgr();
        cc.vv.userMgr.init();

        var Dispatch = require("dispatchMsg");
        cc.vv.dispatcher = new Dispatch();
        cc.vv.dispatcher.init();

        var httpMgr = require("HttpMgr");
        cc.vv.http = new httpMgr();
        cc.vv.http.init();

        var NetWorker= require("Net");
        cc.vv.net = new NetWorker();
        cc.vv.net.init();

        if (cc.vv.enum.OpenGuild) {
            let guildNetWorker = require("guildNet");
            cc.vv.guildNet = new guildNetWorker();
            cc.vv.guildNet.init();
        }

        var AudioMgr = require("AudioMgr");
        cc.vv.audioMgr = new AudioMgr();
        cc.vv.audioMgr.init();

        var Cry = require("CryptoMgr");
        cc.vv.crypto = new Cry();
        cc.vv.crypto.init();

        var eventName = require("eventName");
        cc.vv.eventName = new eventName();
        cc.vv.eventName.init();

        // if (cc.vv.enum.exportPlatForm == cc.vv.enum.PlatForm_WXWeb) {
        //     var JsSdk = require("JsSdk");
        //     cc.vv.JsSdk = new JsSdk();

        //     this.node.getChildByName("New EditBox").active = false;
            
        //     cc.vv.JsSdk.share("土豪金麻将无需下载,点开即玩,快来和我一起玩吧","土豪金麻将无需下载,点开即玩,快来和我一起玩吧",
        //     cc.vv.userMgr.shareUrl, cc.vv.userMgr.iconUrl);
        // }

        cc.director.loadScene("LoginScene");
    },

    // update (dt) {},
});
