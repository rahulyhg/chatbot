var schema = new Schema({
    Journey_Name: {
        type: String,
    },
    Journey_Data: {
        type: String,
    },
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Diagram', schema,'diagram');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "process_tree", "diagram"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getdiagram: function (data, callback) {
        Diagram.findOne({
            Journey_Name: data.Journey_Name,
        }, { Journey_Name: 1,Journey_Data:1 }).limit(1).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    if (err) {
                            return err;
                    }
                    else {
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