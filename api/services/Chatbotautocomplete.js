var schema = new Schema({
    topic: {
        type: String,
    },
    value: {
        type: String,
    },
    location: {
        type: String,
    },
   id: {
       type:Number,
   }, 
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Chatbotautocomplete', schema,'chatbotautocomplete');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "chatbotautocomplete", "chatbotautocomplete"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getautocomplete: function (data, callback) {
        //console.log("data", data)
        searchstring=data.string;
        searchstring = "/"+searchstring+"/";
        Chatbotautocomplete.stream({
            value:{ $regex: '.*' + data.string + '.*',$options:"i" }
        }, { topic: 1, value: 1, id:1 }).limit(4).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    callback(null, found);
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    },
};
module.exports = _.assign(module.exports, exports, model);