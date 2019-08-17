cc.Class({
    extends: cc.Component,

    properties: {
        loadComplete:false,
    },

    init: function () {
        var self = this;
        this.loadFormNet = false;
        this.baseurls = [
            'http://h5.99thj.com/h5game/pb/guild.proto',
            'http://h5.99thj.com/h5game/pb/gate.proto',
            'http://h5.99thj.com/h5game/pb/room.proto',
            'http://h5.99thj.com/h5game/pb/pk.proto',
            'http://h5.99thj.com/h5game/pb/pdk.proto',
            'http://h5.99thj.com/h5game/pb/mj.proto',
            'http://h5.99thj.com/h5game/pb/zzmj.proto',
            'http://h5.99thj.com/h5game/pb/csmj.proto',
			'http://h5.99thj.com/h5game/pb/hzmj.proto',
            'http://h5.99thj.com/h5game/pb/zhuzhoumj.proto',
            'http://h5.99thj.com/h5game/pb/phz.proto',
            'http://h5.99thj.com/h5game/pb/cdphz.proto',
        ];



        // this._urls = [
        //     cc.url.raw("resources/proto/guild.proto"),
        //     //cc.url.raw("resources/proto/cdphz.proto"),
        //     cc.url.raw("resources/proto/csmj.proto"),
        //     //cc.url.raw("resources/proto/csphz.proto"),
        //     cc.url.raw("resources/proto/gate.proto"),
        //     cc.url.raw("resources/proto/gdmj.proto"),
        //     cc.url.raw("resources/proto/hzmj.proto"),
        //     //cc.url.raw("resources/proto/kwmj.proto"),
        //     cc.url.raw("resources/proto/mj.proto"),
        //     //cc.url.raw("resources/proto/nxmj.proto"),
        //     //cc.url.raw("resources/proto/phz.proto"),
        //     cc.url.raw("resources/proto/room.proto"),
        //     cc.url.raw("resources/proto/zhuzhoumj.proto"),
        //     cc.url.raw("resources/proto/zzmj.proto"),
        //     cc.url.raw("resources/proto/pdk.proto"),
        //     cc.url.raw("resources/proto/pk.proto"),
        // ];

        this._urls = [
            cc.url.raw("resources/proto/guild"),
            //cc.url.raw("resources/proto/csmj.proto"),
            cc.url.raw("resources/proto/gate"),
            // cc.url.raw("resources/proto/gdmj.proto"),
            cc.url.raw("resources/proto/hzmj"),
            // cc.url.raw("resources/proto/mj.proto"),
            cc.url.raw("resources/proto/room"),
            // 
            cc.url.raw("resources/proto/pdk"),
            cc.url.raw("resources/proto/pk"),


            cc.url.raw("resources/proto/mj"),
            cc.url.raw("resources/proto/zzmj"),
            cc.url.raw("resources/proto/csmj"),
            cc.url.raw("resources/proto/zhuzhoumj"),
            cc.url.raw("resources/proto/phz"),
            cc.url.raw("resources/proto/cdphz"),
        ];

        this.protoFiles = new Array();
        this.protoFiles["guild.proto"] = "com.games.guild";
        //this.protoFiles["cdphz.proto"] = "com.games.thjphz.cdphz";
        this.protoFiles["csmj.proto"] = "com.games.thjmj.csmj";
        //this.protoFiles["csphz.proto"] = "com.games.thjphz.csphz";
        this.protoFiles["gate.proto"] = "com.games.thjmj.gate";
        this.protoFiles["gdmj.proto"] = "com.games.thjmj.gdmj";
        this.protoFiles["hzmj.proto"] = "com.games.thjmj.hzmj";
        //this.protoFiles["kwmj.proto"] = "com.games.thjmj.kwmj";
        this.protoFiles["mj.proto"] = "com.games.thjmj.mj";
        //this.protoFiles["nxmj.proto"] = "com.games.nxmj.mj";
        //this.protoFiles["phz.proto"] = "com.games.thjphz";
        this.protoFiles["room.proto"] = "com.games.thjmj.room";
        this.protoFiles["zhuzhoumj.proto"] = "com.games.thjmj.zhuzhoumj";
        this.protoFiles["zzmj.proto"] = "com.games.thjmj.zzmj";
        this.protoFiles["pdk.proto"] = "com.games.thjmj.pdk";
        this.protoFiles["pk.proto"] = "com.games.thjmj.pk";

        this.protoFiles["phz.proto"] = "com.games.thjphz";
        this.protoFiles["cdphz.proto"] = "com.games.thjphz.cdphz";
        
        this.protobuf = require("protobuf_all");

        
        this.buildArr = new Array();
        this.PB = new Array();

        this.protobuf.Util.IS_NODE = cc.sys.isNative;

        //cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
        

        if (cc.vv.enum.pbPlatForm == cc.vv.enum.PlatForm_WXWeb) {
            cc.loader.load(this.baseurls, this._progressCallback.bind(this), this._completeCallback.bind(this));
        }else {
            cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
        }
    },

    loadGamePb:function(gameId,callback){
        this.loadGameID = gameId;
        this.loadCallback = callback;
        var typeName = cc.vv.enum.gamesType[gameId.toString()];
        var gameName = cc.vv.enum.gamesName[gameId.toString()];
        var urlArr = new Array();
        urlArr.push('http://h5.99thj.com/h5game/pb/' + typeName + '.proto');
        urlArr.push('http://h5.99thj.com/h5game/pb/' + gameName + '.proto');
        if (this.loadFormNet) {
            cc.loader.load(urlArr, this._progressCallback.bind(this), this.gamePbCompleteCallback.bind(this));
        }
    },

    _progressCallback: function (completedCount, totalCount, res) {
        var strid = res.id;
        var i = strid.lastIndexOf('/');
        var keyname = strid.substr(i + 1);
        
        
        if (cc.vv.enum.exportPlatForm == cc.vv.enum.PlatForm_Win){
            var fromPKIndex = res.content.indexOf("package") + 8
            var toIndex = res.content.indexOf(";",fromPKIndex)
            var packageName = res.content.substr(fromPKIndex ,toIndex - fromPKIndex);
            keyname = packageName.substr(packageName.lastIndexOf(".") + 1) + ".proto";
            if (keyname == "thjphz.proto") {
                keyname = "phz.proto"
            }
        }



        var filePath = "resources/proto/" + keyname;

        var buildarr1 = this.protobuf.newBuilder();
        
        this.buildArr[keyname] = buildarr1;

        this.buildArr[keyname].importRoot = cc.url.raw("resources/proto");

        this.protobuf.loadProto(res.content, this.buildArr[keyname],filePath);

        this.PB[keyname] =  this.buildArr[keyname].build(this.protoFiles[keyname]);
    },

    _completeCallback: function (error, res) {
        this.loadComplete = true;
        cc.vv.NetPB.init();
    },

    gamePbCompleteCallback: function (error, res) {
        cc.vv.NetPB.initGamePbs(this.loadGameID,this.loadCallback);
    },

    //调用用法
   // var reData = cc.tf.pbHelp.PB["login.proto"].Connect.encode(bodyData);

});
