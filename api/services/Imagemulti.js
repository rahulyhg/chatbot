var schema = new Schema({
    From_Date: {
        type: Date,
    },
    To_Date: {
        type: Date,
    },
    Status: {
        type:String
    },
    Ticker_name: {
        type:String
    },
    Created_time:{
        type:Date
    },
    DocFile:{
        type:Array
    },
    TickerType:{
        type:String
    },
    Title:{
        type:String
    },
    LinkURL:{
        type:String
    }
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Imagemulti', schema,'Image_multi');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "Imagemulti", "Image_multi"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getimages: function (data, callback) {
        Imagemulti.find({
            $and:[{From_Date:{$lte:new Date()}},{To_Date:{$gte:new Date()}}],
            Status:"0"
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    if (err) {
                            return err;
                    }
                    else {
                        found2 = found;
                        //var Journey_Data = JSON.parse(found.Journey_Data);
                        callback(null, found);
                    }
                    
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