var schema = new Schema({
   
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Api', schema,'');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "api", "api"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var adminurl = "exponentiadata.co.in";
var CryptoJS = require("crypto-js");
var param = require('jquery-param');
var model = {
    out: function (data, callback) {
        var http = require('http');
        
        var ciphertext= data.data;
        var a = ciphertext.toString().replace(" ", "+");
        var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((b),'k_123');
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        //console.log(decryptedData);
        //console.log(decryptedData.user_id);
        var post_options = {
            hostname: adminurl,
            port: 8097,
            path: '/out/'+decryptedData.user_id+"/",
            method: 'POST',
            data:param(decryptedData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Content-Length': Buffer.byteLength(param(decryptedData))
                'Content-Length': param(decryptedData).length
            }
        };
        //console.log(post_options);
        http.request(post_options, function(res) { 
            //console.log("Got response: " + res.statusCode);
            //console.log("res",res);
            res.on("data", function(chunk)
            {
                found=JSON.parse(chunk);
                callback(null, found);
            });
            res.on('end', function () {
                console.log('No more data in response.');
            }); 
        }).on('error', function(e){ 
            console.log("Got error: " + e.message); 
            callback({
                message: "-1"
            }, null);
        });
        
    },
};
module.exports = _.assign(module.exports, exports, model);