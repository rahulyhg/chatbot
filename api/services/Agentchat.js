var schema = new Schema({
    chatlist:{
        type: Array,
    },
    socketid1: {
        type:String
    },
    socketid2: {
        type:String
    },
    disconnected : {
        type:Boolean
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
//userlogschema.plugin(uniqueValidator);
//userlogschema.plugin(timestamps);
//userlogschema = require('userlogschema');

module.exports = mongoose.model('agentchat', schema,'agentchat');
//var chatbot_user_logs = mongoose.model('chatbot_user_logs', userlogschema,"chatbot_user_logs");
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    
    savechat:function (data, callback) {
        Agentchat.find( {
            $and : [
                { $or:[ {'socketid1':data.from_socketid}, {'socketid1':data.to_socketid}] },
                { $or:[ {'socketid2':data.from_socketid}, {'socketid2':data.to_socketid}] },
            ]
        },function(err,found){
            if (err) {
                callback(err, null);
            } 
            else {
                console.log(found,"found obj");
                if (found.length > 0) {
                    Agentchat.update(
                        { 
                            $and : [
                                { $or:[ {'socketid1':data.from_socketid}, {'socketid1':data.to_socketid}] },
                                { $or:[ {'socketid2':data.from_socketid}, {'socketid2':data.to_socketid}] },
                            ]
                        },
                        { $push: { 
                            chatlist:[
                                {
                                    from_id:mongoose.Types.ObjectId(data.from_id),
                                    to_id:mongoose.Types.ObjectId(data.to_id),
                                    fromid:data.fromid,
                                    toid:data.toid,
                                    fromname:data.fromname,
                                    toname:data.toname,
                                    msg:data.msg,
                                    from_socketid:data.from_socketid,
                                    to_socketid:data.to_socketid,
                                }
                            ] 
                        } }
                    ).exec(function (err2, updatefound) {
                        if (err2) {
                            callback(err2, null);
                        } 
                        else {
                            console.log(updatefound,"inside update");
                            if (updatefound) {
                                callback(null, updatefound);
                            } else {
                                callback({
                                    message: "-1"
                                }, null);
                            }
                        }
                    });
                } else {
                    Agentchat.saveData({
                        socketid1: data.from_socketid,
                        socketid2: data.to_socketid,
                        disconnected:false,
                        chatlist:[
                            {
                                from_id:mongoose.Types.ObjectId(data.from_id),
                                to_id:mongoose.Types.ObjectId(data.to_id),
                                fromid:data.fromid,
                                toid:data.toid,
                                fromname:data.fromname,
                                toname:data.toname,
                                msg:data.msg,
                                from_socketid:data.from_socketid,
                                to_socketid:data.to_socketid,
                            }
                        ]
                    },function (err3, savefound) {
                        if (err3) {
                            callback(err3, null);
                        } 
                        else {
                            if (savefound) {
                                console.log(savefound,"inside update");
                                callback(null, savefound);
                            } else {
                                callback({
                                    message: "-1"
                                }, null);
                            }
                        }

                    });
                }
            }
        });
    },
    
};
module.exports = _.assign(module.exports, exports, model);