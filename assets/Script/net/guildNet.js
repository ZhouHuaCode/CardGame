cc.Class({
    extends: cc.Component,

    properties: {
       // ip:"116.211.174.31:9128",  //外网高防地址
      ip:"116.211.174.31:9131", // h5正式服务

       //ip:"120.78.160.214:9131",  //外网地址
        //ip:"192.168.0.216:9129",  //内网地址
        
     // ip:"47.107.115.109:9131",  //外网正式服地址
   //ip:"120.78.162.244:9131",  //外网测试服地址
 
   //ip:"120.78.162.244:9131",
        ws:null,
        connected:false,
        isPinging:false,
        packetState:true,
        msgList:[],
        notification:null,
        lastMsg:null,
        msgpack:null,
        interval:null,
        AllBuf :[],
        HearTime : null,
        connectcallback:null,
    },

    init:function(){
        this.table = [
            0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F,
            0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988,
            0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2,
            0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
            0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9,
            0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172,
            0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C,
            0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59,
            0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423,
            0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,
            0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106,
            0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
            0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D,
            0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E,
            0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950,
            0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65,
            0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7,
            0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0,
            0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA,
            0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
            0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81,
            0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A,
            0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84,
            0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1,
            0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB,
            0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC,
            0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E,
            0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B,
            0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55,
            0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236,
            0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28,
            0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D,
            0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F,
            0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38,
            0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242,
            0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777,
            0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69,
            0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2,
            0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC,
            0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
            0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693,
            0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94,
            0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D
        ];
        //this.notification = new cc.EventTarget();
        this.scheduler = cc.director.getScheduler();
        this.scheduler.scheduleUpdate(this);
    },

    onLoad:function () {
             
    },
    
    connect:function(){
        var self = this;
        cc.log("开始连接俱乐部服务器",this.ip);
        //this.closeConnect();
        self.packetState=true;
        self.msgList=[];

        var fn = function(){
            self.ws = new WebSocket("ws://"+self.ip);
            self.ws.onopen = self.onopen.bind(self);
            self.ws.onmessage = self.onmessage.bind(self);
            self.ws.onerror = self.onerror.bind(self);
            self.ws.onclose = self.onclose.bind(self);
        };
        setTimeout(fn,100);
    },

    onopen:function(onConnectOK) {
        cc.log("连接俱乐部服务器成功");
        this.connected = true;
        this.startHearbeat();  //开始心跳包, 检测网络延迟, 网络连接,  断网自动重连
        // 添加社区协议处理类
        if (!cc.vv.guildProcesser) {
            var guildProc = require("guildProcesser");
            cc.vv.guildProcesser = new guildProc();
            cc.vv.guildProcesser.initMsg();
        }
        this.loginGuild();
    },

    onerror:function(){
        cc.log("俱乐部服务器连接错误");
        var self = this;
        var fn = function(){
            self.reConnect();
        };
        setTimeout(fn,100);
    },

    closeConnect:function(){
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.HearTime = 0;
        this.connected = false;
        if(this.ws){
            this.ws.close();
        }
        this.ws = null;
        this.packetState=false;
        this.msgList=[];
    },

    onclose:function(){
        this.HearTime = 0;
        cc.log("俱乐部服务器关闭连接");
    },
    
    reConnect:function(){
        this.closeConnect();
        this.connect();
    },

   //心跳检测
    startHearbeat:function(){
        var self = this;

        self.lastRecieveTime = Date.now();
        if(!self.isPinging){
            self.isPinging = true;  //只启动一个计时器
            self.interval = setInterval(function(){
                if(self.ws){
                    self.ping();
                    // if(Date.now() - self.lastRecieveTime > 15000){
                    //     // cc.vv.alert.s_show("社区服务端连接中断...")
                    //     //self.reConnect();
                    // }
                    // else{
                    //     self.ping();
                    // }                        
                }
            },4000);  
        } 
    },

    loginGuild:function(){
        if (!cc.vv.guildData) {
            var guildData = require("guildData");
            cc.vv.guildData = new guildData();
            cc.vv.guildData.init();
        }
        
        var self = this;
        var data = {
            appId : cc.vv.enum.AppId.THJMJ,
            userId : parseInt(cc.vv.userMgr.baseinfo.id),
            token : cc.vv.userMgr.userUnionid,
            isTjd : 0,  //0不是太极盾  1是太极盾
        };
        cc.vv.guildNet.send(cc.vv.guild.CG_Login,data);
    },

    //处理包
    dimessage : function(mess){
        var self = this;
        
        var msgId = mess[5]*256 +mess[4];
        //var msgId = new Uint32Array(mess.slice(4,8))[0];
        var length = mess[10]*256*256 + mess[9]*256 +mess[8];
        //var length = new Uint32Array(mess.slice(8,12))[0];

        if(mess.length>=length+12){
            if(mess.length==length+12&&mess!=null){ //包正确
                var buffer = mess.slice(12,length+12);
                //var rcvMessage = cc.vv.NetPB.decodePB(msgId,buffer);
                var rcvMessage = cc.vv.NetPB.guildDecodePB(msgId,buffer);

                if(msgId!=cc.vv.guild.GC_Heart){
                    console.log("guildmessage",msgId);
                    console.log("guildmessage",rcvMessage);
                    self.msgList.push({"msgId":msgId,"message":rcvMessage});
                }
                else{
                    self.lastRecieveTime = Date.now(); 
                }
                self.AllBuf = [];
            }else if(mess.length>length+12){//包太长
                    var buffer=mess.slice(12,length+12);
                    var slowBuffer = mess.slice(length + 12,mess.length);
                    var rcvMessage = cc.vv.NetPB.guildDecodePB(msgId,buffer);

                    if(msgId!=cc.vv.guild.GC_Heart){
                        console.log("guildmessage2",msgId);
                        console.log("guildmessage2",rcvMessage);
                        self.msgList.push({"msgId":msgId,"message":rcvMessage});
                    }
                    else{
                        self.lastRecieveTime = Date.now(); 
                        self.HearTime = self.lastRecieveTime - self.lastSendTime;
                    }
                    self.AllBuf = Array.from(slowBuffer);
                    self.dimessage(slowBuffer);
                    
            }  
        }
    },

    onmessage:function(event) {
        var self=this;

        if (cc.vv.enum.exportPlatForm == cc.vv.enum.PlatForm_WXGame) {
            var buf = new Uint8Array(event.data);
            var cBuf = Array.from(buf); 
            this.AllBuf = this.AllBuf.concat(cBuf);
            var LastBuf = new Uint8Array(this.AllBuf);
            this.dimessage(LastBuf);
        }else{
            var rcvData = event.data;
            var reader = new FileReader();
            reader.readAsArrayBuffer(rcvData);
            reader.onload = function (e) {
                if(reader.result instanceof ArrayBuffer){
                    var buf = new Uint8Array(reader.result);
                    var cBuf = Array.from(buf);
                    self.AllBuf = self.AllBuf.concat(cBuf);
                    var LastBuf = new Uint8Array(self.AllBuf);
                    self.dimessage(LastBuf);
                }else{
                    cc.log("错误通讯格式！");
                }
            };
        }

    },

    on:function(msgId,cb) {
    },

    off: function (msgId,cb) {
    },

    ping:function(){
        var data = {};
        this.send(2,data);
    },

    ab2str:function(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    },

    str2ab:function(str) {
        var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
        var bufView = new Uint8Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) {
             bufView[i] = str.charCodeAt(i);
        }
        return buf;
    },

    send:function(msgId,data){
        var self=this;
        if(self.connected){
            let protoData = cc.vv.NetPB.guildEncodePB(msgId,data);
            var _buff = new ArrayBuffer(12+protoData.byteLength);
            
            var a = new Uint32Array(_buff,0,3);
            a[0] = 0x50514854;// 校验码
            a[1] = msgId;// msgId
            a[2] = protoData.byteLength;//包长
            var body = new Uint8Array(protoData);
            var b = new Uint8Array(_buff,12);
            for (var i = 0; i < body.length; i++) {
                b[i] = body[i];
            } 
            if(self.ws.readyState === WebSocket.OPEN) {
                if(msgId!=2){
                    cc.log("发送社区消息",msgId);
                    cc.log(data);
                }
                self.ws.send(_buff);      
            }else{
                 cc.log("webSocket未打开");
                 //self.reConnect();
            }     
        }
    },

    wsClose:function(){
        var self=this;
        cc.log('-------closeGuildWS-----');
        self.connected = false;
        self.ws.close();
        self.ws = null;
        self.packetState = false;
        self.msgList=[];
    },
    /* Number */
    crc32 : function(string) {
    	var crc = 0 ^ (-1);
        var len = string.length;
        for (var i=0; i < len; i++) {
        	crc = (crc >>> 8) ^ this.table[
            	(crc ^ string[i]) & 0xFF
            ];
        }
        crc = crc ^ (-1);
        if (crc < 0) {
        	crc += 4294967296;
        }
        return crc;
    },
        
    update:function(dt){
        if(this.msgList.length>0){
            var data=this.msgList.shift();
            cc.vv.dispatcher.dispatchMsg(data);
        }
    },
});
