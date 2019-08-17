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
    extends: require("createLogic"),

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

    },

    // update (dt) {},
    setInfo:function(){
        var self = this;
        var x1 = -50;
        var x15 = 100;
        var x2 = 200;
        var x25 = 300;
        var x3 = 450;
        var x35 = 550;

        // 每个节点组   一个节点组只能包含一个单选组
        // sortIndex:  节点序列
        // nodeHeight: 节点所占高度
        // 提供方法
        // changeNodeHeight: sortIndex,toHeight   改变节点高度 ： 节点序列，节点高度
        // hideNode: sortIndex   隐藏其他节点: 节点序列
        // 回调参数

        // 节点组  节点序列以args_wanfa_Img先后为准
        // name 节点名
        // height 节点高度  行数  默认1行 填写默认高度
        this.args_wanfa_Img = [
            {
                name : "局数",
                height : 2,
            },
            {
                name : "人数",
            },
            {
                name : "胡牌",
            },
            {
                name : "飘分",
                height : 2,
            },
            {
                name : "玩法",
                height : 2,
            },
            {
                name : "扎鸟",
                height : 3,
            },
            {
                name : "首局",
            },
            {
                name : "防作弊",
            },
            {
                name : "超时机械托管",
            },
        ];
        this.checkDesImg_table = [
            {
                type : "danxuan",
                sortIndex : 0,
                handler :  this.jushuHandler.bind(self),
                name : { 0 : "check_ju1",1 : "check_ju4", 2 : "check_ju8", 3 : "check_ju12", 4 : "check_ju16"},
                // labledata : { 0 : "8局(1钻石)",1 : "16局(2钻石)"},
                labeldata : { 0 : "1局(2房卡)",1 : "4局(5房卡)", 2 : "8局(10房卡)", 3 : "12局(15房卡)", 4 : "16局(20房卡)"},
                posx : { 0 : x1, 1 : x2, 2 : x3, 3 : x1, 4 : x2},
                posy : { 0 : 0, 1 : 0, 2 : 0, 3 : 1, 4 : 1},
            },
            {
                type : "danxuan",
                sortIndex : 1,
                handler :  this.renshuHandler.bind(self),
                name : { 0 : "check_ren2",1 : "check_ren3", 2 : "check_ren4"},
                labeldata : { 0 : "2人",1 : "3人", 2 : "4人"},
                posx : { 0 : x3, 1 : x2, 2 : x1},
                posy : { 0 : 0, 1 : 0, 2 : 0},
            },
            {
                type : "danxuan",
                sortIndex : 2,
                // handler :  this.renshuHandler.bind(self),
                name : { 0 : "check_zmh",1 : "check_dianpaohu"},
                labeldata : { 0 : "自摸胡",1 : "点炮胡(可抢杠)"},
                posx : { 0 : x1, 1 : x2 },
                posy : { 0 : 0, 1 : 0},
            },
            {
                type : "danxuan",
                sortIndex : 3,
                // handler :  this.renshuHandler.bind(self),
                name : { 0 : "check_mjpf",1 : "check_sjdp",2 : "check_bpf",3 : "check_gdp1f",4 : "check_gdp2f"},
                labeldata : { 0 : "每局飘分",1 : "首局定飘",2 : "不飘分",3 : "固定飘1分",4 : "固定飘2分"},
                posx : { 0 : x1, 1 : x2 , 2 : x3 , 3 : x1 , 4 : x2},
                posy : { 0 : 0, 1 : 0, 2 : 0, 3 : 1, 4 : 1},
            },
            {
                type : "duoxuan",
                sortIndex : 4,
                name : { 0 : "check_zxsf",1 : "check_khqd",2 : "check_ypbh",3 : "check_hzlz",4 : "check_kcp",
                    5 : "check_258zj",6 : "check_hjhg"},
                labeldata : { 0 : "庄闲分",1 : "可胡七对",2 : "有牌必胡",3 : "红中癞子",4 : "可吃牌",
                    5:"258做将",6:"荒庄荒杠"},
                posx : { 0 : x1, 1 : x15 , 2 : x25 , 3 : x35 , 4 : x1, 5 : x15, 6 : x25},
                posy : { 0 : 0, 1 : 0, 2 : 0, 3 : 0, 4 : 1, 5 : 1, 6 : 1},
            },
            {
                type : "danxuan",
                sortIndex : 5,
                groupIndex : 1,
                // handler :  this.renshuHandler.bind(self),
                name : { 0 : "check_bzn",1 : "check_znjf",2 : "check_znfb"},
                labeldata : { 0 : "不扎鸟",1 : "中鸟加分",2 : "中鸟翻倍"},
                posx : { 0 : x1, 1 : x2 , 2 : x3},
                posy : { 0 : 0, 1 : 0, 2 : 0},
            },
            {
                type : "danxuan",
                sortIndex : 5,
                groupIndex : 2,
                // handler :  this.renshuHandler.bind(self),
                name : { 0 : "check_159zn",1 : "check_zjzn"},
                labeldata : { 0 : "159中鸟",1 : "按庄家中鸟"},
                posx : { 0 : x1, 1 : x2 },
                posy : { 0 : 1, 1 : 1},
            },
            {
                type : "danxuan",
                sortIndex : 5,
                groupIndex : 3,
                name : { 0 : "check_z2n",1 : "check_z4n",2 : "check_z6n"},
                labeldata : { 0 : "扎2鸟(+2分)",1 : "扎4鸟(+4分)",2 : "扎6鸟(+6分)"},
                posx : { 0 : x1, 1 : x2 , 2 : x3},
                posy : { 0 : 2, 1 : 2, 2 : 2},
            },
            {
                type : "danxuan",
                sortIndex : 5,
                groupIndex : 4,
                name : { 0 : "check_z12n",1 : "check_z23n"},
                labeldata : { 0 : "扎1鸟(x2倍)",1 : "扎2鸟(x3倍)"},
                posx : { 0 : x1, 1 : x2 },
                posy : { 0 : 2, 1 : 2},
            },
            {
                type : "danxuan",
                sortIndex : 6,
                name : { 0 : "check_fzzz",1 : "check_dszz"},
                labeldata : { 0 : "房主坐庄",1 : "打骰坐庄"},
                posx : { 0 : x1, 1 : x2 },
                posy : { 0 : 0, 1 : 0},
            },
            {
                type : "duoxuan",
                sortIndex : 7,
                name : { 0 : "check_mjhw"},
                labeldata : { 0 : "每局换位"},
                posx : { 0 : x1},
                posy : { 0 : 0},
            },
            {
                type : "danxuan",
                sortIndex : 8,
                name : { 0 : "check_gb",1 : "check_60m",2 : "check_90m",3 : "check_180m"},
                labeldata : { 0 : "关闭",1 : "60秒",2 : "90秒",3 : "180秒"},
                posx : { 0 : x15, 1 : 220 , 2 : 340, 3 : 460},
                posy : { 0 : 0, 1 : 0, 2 : 0, 3 : 0},
            },
        ];
        // cc.log(this.args_wanfa_Img)
    },

    jushuHandler:function(param){
        // cc.log(param)
        // cc.log(this.checkNodeArr[param])
    },

    renshuHandler:function(param){
        this._super();
        cc.log("renshuHandler zzmj_ctrl")
        // cc.log(this.checkNodeArr[param])
    },
    
    setToRule:function(){
        cc.log("setToRule zzmj_ctrl")
        // cc.log(this.checkNodeArr[param])
    },
});
