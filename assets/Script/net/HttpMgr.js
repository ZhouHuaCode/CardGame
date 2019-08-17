// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({

    init:function(){
        //XMLHTTPREQUEST_RESPONSE_JSON
    },

    get:function(params){
        var xhr = cc.loader.getXMLHttpRequest();  
        if (params.mtype) {
            xhr.responseType = params.mtype;
        }else{
            xhr.responseType = this.XMLHTTPREQUEST_RESPONSE_JSON;
        }

        var str = "";
        if (params.args) {
            str += "?";
            for(var k in params.args){
                if(str != "?"){
                    str += "&";
                }
                str += k + "=" + params.args[k];
            }
        }

        var url = params.url + str;

        xhr.open("GET",url,true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 207)){
                try {           
                    var data = xhr.response;

                    // if (xhr.responseType == this.XMLHTTPREQUEST_RESPONSE_JSON) {
                    //     //var respText = xhr.responseText;
                    //     data = JSON.parse(data);
                    // };
                    if(params.callback){
                        params.callback(true,data);
                    }                        /* code */
                } catch (e) {
                    console.log(e);
                }
                finally{

                }
            }else{

            }
        };

        xhr.send();
    },

    post:function(params){
        var xhr = cc.loader.getXMLHttpRequest();  
        xhr.timeout = 5000;

        var str = "";
        if (params.args) {
            for(var k in params.args){
                if (str != "") {
                    str += "&";
                }
                str += k + "=" + params.args[k];
            }
        }

        xhr.open("POST",params.url, true);
        //xhr.open("POST","http://116.211.174.31:9101");
        if (cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
        }
        xhr.onreadystatechange = function() {

            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 207)){
                try {           
                    var data = xhr.response;

                    if (xhr.responseType == this.XMLHTTPREQUEST_RESPONSE_JSON) {
                        //var respText = xhr.responseText;
                        data = JSON.parse(data);
                    };
                    if(params.callback){
                        params.callback(true,data);
                    }                        /* code */
                } catch (e) {
                    console.log(e);
                }
                finally{

                }
            }else{

            }
        };




        xhr.send(str);
    },


});
