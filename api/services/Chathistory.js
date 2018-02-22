var schema = new Schema({
    // Journey_Name: {
    //     type: String,
    // },
    chatlist: {
        type: Array,
    },
    user: {
        type: String,
    },
    session_id: {
       type:Number,
    },
    responsetype :{
        type: String,
    },
    dthyperlink: {
        type:Object
    } 
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
    getdashboarddata: function (data, callback) {
        var resobj = {};
        Chathistory.count({user: data.user}, function(err, c) {
           console.log('Count is ' + c);
           Chathistory.aggregate([
                { "$match": { "user": data.user } },
                {
                    "$project": {
                        "ticketsCount": {
                            "$size": '$chatlist'
                        }
                    }
                },
                {
                    "$group": {
                        "_id": null,
                        "count": {
                            "$sum": "$ticketsCount"
                        }
                    }
                }
            ],function(err, results) {
                console.log(results);
                
                Chathistory.aggregate([ 
                    { "$match": { "user": data.user } },
                    {
                        "$group":  { "_id": "$chatlist.topic" }
                    },
                    {
                        $group: {
                            _id : "count",
                            total : {"$sum" : 1}
                        }
                    }
                ],
                function(err, results2) {
                    resobj ={c_count : c,i_count:results[0].count,t_count:results2[0].total};
                    console.log(results2);
                    callback(null,resobj);
                }); 
                
            });
        });
    },
    savehistory: function (data, callback) {
        var dtobject = {};
        if(data.responsetype=='DTHyperlink')
            dtobject = {
                Dthlink:data.Dthlink,
                DTHstage:data.DTHstage
            };
        Chathistory.findOne( {
            session_id:data.session_id,
            user:data.user,
            
        },function(err,found){
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(found,"found obj");
                if (found) {
                    Chathistory.update(
                        { 
                            session_id:data.session_id,
                            user:data.user
                        },
                        { $push: { 
                            chatlist:
                                {
                                    user_input:data.user_input,
                                    response:data.response,
                                    responsetype:data.responsetype,
                                    dthyperlink:dtobject,
                                    Journey_Name:data.Journey_Name,
                                    topic:data.topic,
                                }
                             
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
                    Chathistory.saveData({
                        // Journey_Name: data.Journey_Name,
                        session_id:data.session_id,
                        user:data.user,
                        chatlist:[
                            {
                                user_input:data.user_input,
                                response:data.response,
                                responsetype:data.responsetype,
                                dthyperlink:dtobject,
                                Journey_Name:data.Journey_Name,
                                topic:data.topic,
                            }
                        ]
                    },function (err3, savefound) {
                        if (err3) {
                            callback(err3, null);
                        } 
                        else {
                            if (savefound) {
                                console.log(savefound,"inside save");
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