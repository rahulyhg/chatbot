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
    },
    dthyperlink:{
        type:Number
    },
    feedback:{
        type:String
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
module.exports = mongoose.model('Feedbackquestion', schema,'Feedbackquestion');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    
};
module.exports = _.assign(module.exports, exports, model);