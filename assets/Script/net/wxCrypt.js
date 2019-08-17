cc.Class({

    init:function(appId,sessionKey){
        this.appId = appId;
        this.sessionKey = sessionKey;
    },

    decryptData:function(encryptedData, iv){
        var sessionKey = new Buffer(this.sessionKey, 'base64')
        encryptedData = new Buffer(encryptedData, 'base64')
        iv = new Buffer(iv, 'base64')
        var crypto = require('crypto')
        try {
            // 解密
            var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true)
            var decoded = decipher.update(encryptedData, 'binary', 'utf8')
            decoded += decipher.final('utf8')
            decoded = JSON.parse(decoded)
        } catch (err) {
            throw new Error('Illegal Buffer')
        }

        if (decoded.watermark.appid !== this.appId) {
            throw new Error('Illegal Buffer')
        }

        return decoded
    },

    decryptDataAcc:function(str,secret){
        var crypto = require('crypto')
        var cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
        var enc = cipher.update(str, "utf8", "hex");    //编码方式从utf-8转为hex;
        enc += cipher.final("hex"); //编码方式从转为hex;
        return enc; //返回加密后的字符串
    },
});
