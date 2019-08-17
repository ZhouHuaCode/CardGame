cc.Class({

    properties: {
        msgList:null,
        isStop:false,
        msgLen:0,
    },

    init:function () {
        this.processer_list = new Array();
        this.msgList = new Array();
    },

    // 启动  isStop： 不能随意设置  会阻止协议分发
    doStartDispatch:function(){
        var self = this;

        var msg = self.msgList.shift();

        while(msg != null){
            self.isStop = false;
            self.dispatchMsg(msg);
            if (self.isStop) {
                break;
            }  
            msg = self.msgList.shift();
        }
    },

    dispatchMsg:function(msg){
        var self = this;
        if (self.isStop) {
            self.msgList.push(msg);
            return;
        }
        for(var i = 0; i <self.processer_list.length; i++){
            if (self.processer_list[i].rote(msg)) {
                self.processer_list[i].doMsg(msg);
            }
        }
    },
    
    addProcesser:function(processer){
        var self = this;
        for(var i = 0; i <self.processer_list.length; i++){
            if(self.processer_list[i].msgId == processer.msgId){
                return;
            }
        }

        self.processer_list.push(processer);
    },

    removeProcesser:function(processer_id){
        var self = this;
        //var index = 0;
        for(var i = 0; i <self.processer_list.length; i++){
            if(self.processer_list[i].msgId == processer_id){
                self.processer_list[i].msg_list.splice(0,self.processer_list[i].msg_list.length);
                self.processer_list.splice(i,1);
                break;
            }
        }

        for(var i = 0; i <self.processer_list.length; i++){
            if(self.processer_list[i].msgId == processer_id){
                self.processer_list[i].msg_list.splice(0,self.processer_list[i].msg_list.length);
                self.processer_list.splice(i,1);
                break;
            }
        }
    },

});
