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
    answers: {
        type: String,
    },
    final: {
        type: String,
    },
    combine: {
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

module.exports = mongoose.model('Chathistory', schema,'chathistory');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "chathistory", "chathistory"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    savehistory: function (data, callback) {
        
        
    },
};
module.exports = _.assign(module.exports, exports, model);