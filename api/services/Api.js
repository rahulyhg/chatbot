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
var adminurl = "http://exponentiadata.co.in:8097/";
var CryptoJS = require("crypto-js");
var model = {
    out: function (data, callback) {
        var http = require('http');
        var options = {
            hostname: '',
            path:'',
        };
        var ciphertext= data.data;
        var a = ciphertext.toString().replace(" ", "+");
        var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((b),'k_123');
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        decryptedData = JSON.parse(decryptedData);
        http.get(adminurl+'out/'+decryptedData.user_id+"/",decryptedData, function(res) { 
            //console.log("Got response: " + res.statusCode);
            //console.log("res",res);
            res.on("data", function(chunk)
            {
                found=JSON.parse(chunk);
                callback(null, found);
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