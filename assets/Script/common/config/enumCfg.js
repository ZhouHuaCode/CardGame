

cc.Class({

    init:function(){



        this.OpenGuild = true;
        this.OpenPDK = false;
        this.ShenHePack = false;
        this.logbool = true;    //开关cc.vv.log打印

        this.designRatio = 1.778;
        this.designRatioL = 1;  // 长比例
        this.designRatioN = 0;  // 窄比例

        this.PlatForm_WXGame = 1;   // 微信小游戏
        this.PlatForm_WXWeb = 2;    // 微信WEB页面
        this.PlatForm_Win = 3;      // windows
 
        this.exportPlatForm = 3;
        this.pbPlatForm = 3;
        this.official = 1;          // 是否正式服
        this.netType = 3;          // 0 参考net文件内容  1 内网测试服 192的   2 外网测试   3  正式服
        this.pbversion = 0;          // 防止PB文件被缓存 0 对应文件夹 pb 1 对应文件夹 pb1


        //this.isWeb = false;

        //this.resVersion = "xygmj";

        this.resVersion = "zzmjTest";

        this.initAppId();

        this.ZOrder = {
            PromptWnd : 999,
            GameDissolve : 380,
            shareImg : 365,
            LGameOver : 362,
            BGameOver : 361,
            OverLayer : 360,
            
            msgLayer : 351,         // 游戏内聊天选择
            GameEffect : 350,
            GameSetWnd : 361,
            
            PkCutCard : 251,
            GpsLayer : 237,
            VideoCtr : 236,
            GameActBtn : 235,
            GameHuEffect : 214,
            GameInfo : 213,
            
            GameZhaNiao : 212,
            
            GameSet : 211,
            GameBtns : 210,
            GameAction : 200,
            PkClock : 199,
            TingCard : 195,
			PiaoBtns : 120,
            
            ShaiziCard : 101,
            MoveCard : 100,
            deskBtns : 91,
            CardIndicate : 90,
            ReadyNode : 85,
            MyPlayer : 80,
            OtherPlayer : 79,
            TingNode : 75,
            DeskBtn : 70,
            GameDirect : 60,

            
            // 玩家层级
            PlayerNode : 350,

        };
        this.scorePos = {
            [0]:cc.p(100,0),
            [1]:cc.p(-50,80),
            [2]:cc.p(100,-30),
            [3]:cc.p(30,80),
        };
        this.PromptWndType = {
            Hide : 0,           // 消失
            AutoHide : 1,       // 自动隐藏
            OutClick : 2,       // 点击周边消失
            YesBtn : 4,         // 一个确定按钮
            YesNoBtn : 8,       // 确定取消按钮按钮
            NoBtn : 16,         // 没有按钮             系统等待消息，需要有消息关闭

            YesClick : 1,
            NoClick : 2,
        };



        this.initGameCfg();

        this.lGameOverResult = {
            ZIMO: 0,
            JIEPAO: 1,
            DIANPAO:2,
            NOTHING:3,
            GRAB_GANG:4,
            HU_GRAB_GANG:5,

            JIESAN : 0,     //解散
            LIUJU : 1,      //流局
            HUPAI : 2,      //胡牌
        };


        this.MJActionId = {
            PassAction : 0,             // 过
            OutCardAction : 1 ,         // 出牌
            EatAction_L : 2,            // 左吃
            EatAction_M : 3,            // 中吃
            EatAction_R : 4,            // 右吃

            PungAction : 5,             // 碰

            GangAction_under : 6,       // 面下杠 移除1张
            GangAction_dir : 7,         // 直杠   移除3张    
            GangAction_dark : 8,        // 暗杠   移除4张
            GangAction_grab : 9,        // 被抢杠胡

            BuAction_under : 10,        // 面下补  移除1张
            BuAction_dir : 11,          // 直补     移除3张    
            BuAction_dark : 12,         // 暗补    移除4张
            BuAction_grab : 13,         // 被抢补胡

            HuAction : 14,              // 胡
            HuAction_grab_gang : 15,    // 抢杠胡
            ZimoAction : 16,            // 自摸

            zzmj_bu : 20,            // 
        };

        this.headPos = {
            [0]:cc.v2(50,450),
            [1]:cc.v2(50,280),
            [2]:cc.v2(260,100),
            [3]:cc.v2(50,250),
        };


        this.createType = {
            createType_hall : 1,
            createType_guild : 2,
            createType_guildChange : 3,
            createType_guildAdd: 4,
            createType_guildAddWF: 5
        };

        this.languageID = {
            language_FY : 1,        // 方言
            language_PTH : 2,       // 普通话
        };

        this.liaotianTabel = {
            [0]:"我就不能有好牌啊",
            [1]:"快出牌噻",
            [2]:"我一直是顶你的",
            [3]:"佩服！佩服！",
            [4]:"看不清带副眼镜",
            [5]:"这是什么手咯，简直是臭手",
            [6]:"都要天亮了，快点噻",
            [7]:"我这里顺风顺水的，想不赢都不行",
            [8]:"土豪我们做朋友吧",
            [9]:"土豪我们做朋友吧",
        };

        this.warhistype = null;
        this.warhisid = null;
        //this.warhis
    },

    initAppId:function(){
        this.AppId = {
            // 外网
            THJMJ : 10001,
            ZZMJ : 10003,
            // // 内网
            // ZZMJ : 10001,
            // THJMJ : 10003,
        };

        this.AppIdStr = new Array();
        this.AppIdStr[this.AppId.THJMJ.toString()] = "wxa1740cfe554c79b0";
        this.AppIdStr[this.AppId.ZZMJ.toString()] = "wx04ea031194c59ed3";

        this.SecretStr = new Array();
        this.SecretStr[this.AppId.THJMJ.toString()] = "0d112daa5c3816c1b44cebaf5ae07b66";
        this.SecretStr[this.AppId.ZZMJ.toString()] = "eb37136de0aca4d5ced5710d7ed619f6";
        
    },

    initGameCfg:function(){
        this.GameId = {
            //麻将
            ZZMJ : 10001,
            CSMJ : 10002,
            HZMJ : 10003,
            GDMJ : 10004,
            ZHUZHOUMJ : 10005,
            KWMJ : 10006,
            NXMJ : 10007,       // 宁乡麻将
            CZMJ : 10008,       // 郴州麻将
            XYTDH : 10011,      // 湘阴推倒胡
            GDTDH : 10014,      // 广东推倒胡
            HYMJ : 10015,       // 衡阳麻将
            CBMJ : 10016,       //赤壁麻将
            YYZXMJ : 10017,     // 岳阳抓虾
            YIYANG : 10018,     //益阳麻将
            YJMJ : 10012,       // 

            //扑克
            PDK : 10102,
            //斗地主
            DDZ : 10103,


           //跑胡子
            CDPHZ : 10201,    // 常德跑胡子
            CSPHZ : 10202, // 长沙跑胡子
            XTPHZ : 10203,  // 湘潭跑胡子
            YXPHZ : 10204,  // 碰胡子
            HYLHQ : 10206,  // 衡阳六胡抢
            YZCHZ : 10208,  // 永州扯胡子
            HHHGW : 10210,  // 怀化红拐弯
            LDFPF : 10214,  // 娄底放炮罚
            XXGHZ : 10215,  // 湘乡告胡子
        };


        this.gamesType = new Array();
        this.gamesName = new Array();
        this.gamesNameStr = new Array();

        this.gamesType[this.GameId.ZZMJ.toString()] = "mj";
        this.gamesType[this.GameId.CSMJ.toString()] = "mj";
        this.gamesType[this.GameId.HZMJ.toString()] = "mj";
        this.gamesType[this.GameId.GDMJ.toString()] = "mj";
        this.gamesType[this.GameId.ZHUZHOUMJ.toString()] = "mj";
        this.gamesType[this.GameId.KWMJ.toString()] = "mj";
        this.gamesType[this.GameId.GDTDH.toString()] = "mj";
        this.gamesType[this.GameId.CZMJ.toString()] = "mj";

        this.gamesType[this.GameId.PDK.toString()] = "pk";
        this.gamesType[this.GameId.DDZ.toString()] = "pk";

        this.gamesType[this.GameId.CDPHZ.toString()] = "phz";
        this.gamesType[this.GameId.YXPHZ.toString()] = "phz";
        this.gamesType[this.GameId.XTPHZ.toString()] = "phz";
        this.gamesType[this.GameId.LDFPF.toString()] = "phz";

        this.gamesName[this.GameId.ZZMJ.toString()] = "zzmj";
        this.gamesName[this.GameId.CZMJ.toString()] = "czmj";
        this.gamesName[this.GameId.CSMJ.toString()] = "csmj";
        this.gamesName[this.GameId.HZMJ.toString()] = "hzmj";
        this.gamesName[this.GameId.GDMJ.toString()] = "gdmj";
        this.gamesName[this.GameId.ZHUZHOUMJ.toString()] = "zhuzhoumj";
        this.gamesName[this.GameId.KWMJ.toString()] = "kwmj";
        this.gamesName[this.GameId.GDTDH.toString()] = "gdtdh";

        this.gamesName[this.GameId.PDK.toString()] = "pdk";
        this.gamesName[this.GameId.DDZ.toString()] = "ddz";

        this.gamesName[this.GameId.CDPHZ.toString()] = "cdphz";
        this.gamesName[this.GameId.YXPHZ.toString()] = "yxphz";
        this.gamesName[this.GameId.XTPHZ.toString()] = "xtphz";
        this.gamesName[this.GameId.LDFPF.toString()] = "ldfpf";

        this.gamesNameStr[this.GameId.ZZMJ.toString()] = "转转麻将";
        this.gamesNameStr[this.GameId.CSMJ.toString()] = "长沙麻将";
        this.gamesNameStr[this.GameId.HZMJ.toString()] = "红中麻将";
        this.gamesNameStr[this.GameId.GDMJ.toString()] = "广东麻将";
        this.gamesNameStr[this.GameId.ZHUZHOUMJ.toString()] = "株洲麻将";
        this.gamesNameStr[this.GameId.KWMJ.toString()] = "开王麻将";
        this.gamesNameStr[this.GameId.NXMJ.toString()] = "宁乡麻将";
        this.gamesNameStr[this.GameId.CZMJ.toString()] = "郴州麻将";
        this.gamesNameStr[this.GameId.XYTDH.toString()] = "湘阴推倒胡";
        this.gamesNameStr[this.GameId.GDTDH.toString()] = "广东推倒胡";
        this.gamesNameStr[this.GameId.HYMJ.toString()] = "衡阳麻将";
        this.gamesNameStr[this.GameId.CBMJ.toString()] = "赤壁麻将";
        this.gamesNameStr[this.GameId.YYZXMJ.toString()] = "岳阳抓虾";
        this.gamesNameStr[this.GameId.YIYANG.toString()] = "益阳麻将";
        this.gamesNameStr[this.GameId.YJMJ.toString()] = "益阳麻将";

        this.gamesNameStr[this.GameId.PDK.toString()] = "跑得快";
        this.gamesNameStr[this.GameId.DDZ.toString()] = "斗地主";

        this.gamesNameStr[this.GameId.CDPHZ.toString()] = "常德跑胡子";
        this.gamesNameStr[this.GameId.CSPHZ.toString()] = "长沙跑胡子";
        this.gamesNameStr[this.GameId.XTPHZ.toString()] = "湘潭跑胡子";
        this.gamesNameStr[this.GameId.YXPHZ.toString()] = "碰胡子";
        this.gamesNameStr[this.GameId.HYLHQ.toString()] = "衡阳六胡抢";
        this.gamesNameStr[this.GameId.YZCHZ.toString()] = "永州扯胡子";
        this.gamesNameStr[this.GameId.HHHGW.toString()] = "怀化红拐弯";
        this.gamesNameStr[this.GameId.LDFPF.toString()] = "娄底放炮罚";
        this.gamesNameStr[this.GameId.XXGHZ.toString()] = "湘乡告胡子";

        if(this.logbool){
            cc.vv.log = cc.log
        }else{
            cc.vv.log = function () {
                return
            }
        }
        
    },

    isOpenGame:function(wanfa){
        if (!this.official) {
            return true
        }
        if (wanfa == this.GameId.ZZMJ || 
            wanfa == this.GameId.CSMJ ||
            wanfa == this.GameId.HZMJ ||
            wanfa == this.GameId.ZHUZHOUMJ ||
            wanfa == this.GameId.CZMJ ||
            wanfa == this.GameId.PDK  ||
            wanfa == this.GameId.DDZ  ||
            wanfa == this.GameId.GDTDH ||
            wanfa == this.GameId.CDPHZ  ) {
            return true
        }
        return false
    },
});
