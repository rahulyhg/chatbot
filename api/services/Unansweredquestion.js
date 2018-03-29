var schema = new Schema({
    conversationid: {
        type: Schema.Types.ObjectId,
    },
    user: {
        type: String,
    },
    old_question: {
        type: String,
    },
    new_question: {
        type: String,
    },
    ip_address: {
        type: String,
    },
    conversation_id:{
        type:Number
    },
    session_id:{
        type:Number
    },
    handle: {
        type:Number
    }
});


schema.plugin(deepPopulate, {
    /*populate: {
        'user': {
            select: 'fname _id'
        }
    }*/
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Unansweredquestion', schema,'Unansweredquestion');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getunans: function (data, callback) {
        var updateobj = { like:1 };
        
        Unansweredquestion.find(
            { 
                user:data.user
                
            }
        ).sort({createdAt: -1}).exec(function (err, updatefound) {
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(updatefound,"inside update");
                if (updatefound) {
                    callback(null, updatefound);
                }
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);