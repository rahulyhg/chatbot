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
    },
    inputDate : {
        type:Date
    }, 
    outputDate: {
        type:Date
    },
    respdiff : {
        type:Number
    },
    like : {
        type:Number
    },
    dislike : {
        type:Number
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
function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
var model = {
    getdashboarddata: function (data, callback) {
        var resobj = {};
        var userfilter = {};
        
        var filterobj = {};
        var filter2 = {};
        if(data.user)
        {
            if(data.user != '')
            {
                userfilter = {
                    user: data.user
                };
            }
        }
        if(data.date_filter_type=="") {
            if(data.fromdata && data.todate) {
                if(data.fromdate != "" && data.todate != "")
                {
                    filterobj = {
                        "createdAt": {"$gte": new Date(data.fromdate), "$lt": new Date(data.todate)}
                    };
                }
            }
            else if(data.fromdate)
            {
                if(data.fromdate != "" )
                {
                    filterobj = {
                        "createdAt": {"$gte": new Date(data.fromdate)}
                    };
                }
            }   
            else if(data.todate)
            {
                if(data.todate != "" )
                {
                    filterobj = {
                        "createdAt": {"$lt": new Date(data.todate)}
                    };
                }
            }
        }
        else if(data.date_filter_type=="1")
        {
            filterobj = {
                "createdAt": {"$gte": new Date(data.date_filter)}
            };
        }
        else if(data.date_filter_type=="2")
        {
            filterobj = {
                "createdAt": {"$gte": new Date(data.date_filter2_fromdate), "$lt": new Date(data.date_filter2_todate)}
            };
        }
        var object3 = extend({}, userfilter, filterobj);
        console.log(object3);
        Chathistory.count(object3, function(err, c) {
            //console.log('Count is ' + c);
            Chathistory.aggregate([
                { "$match": object3 },
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
                //console.log(results);
                
                Chathistory.aggregate([ 
                    { "$match": object3 },
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
                    var ccount = c;
                    var icount = 0;
                    if(results.length > 0)
                        icount = results[0].count;
                    var tcount = 0;
                    if(results2.length > 0)
                        tcount = results2[0].total;
                    resobj ={c_count : ccount,i_count:icount,t_count:tcount};
                    //console.log(results2);
                    callback(null,resobj);
                }); 
                
            });
        });
    },
    savehistory: function (data, callback) {
        var dtobject = {};
        if(data.responsetype=='DTHyperlink')
            dtobject = {
                Dthlink:data.DTHlink,
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
                                    inputDate:data.inputDate,
                                    outputDate:data.outputDate,
                                    respdiff:data.respdiff
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
                                inputDate:data.inputDate,
                                outputDate:data.outputDate,
                                respdiff:data.respdiff
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
    dislike: function (data, callback) {
        var updateobj = { dislike:1 };
        for(var i = 0; i < data.interactions.length ; i++)
        {
            var objstring = 'chatlist.'+parseInt(data.interactions[i])+'.dislike';
            var listobj={};
            var i_ind = parseInt(data.interactions[i])-1;
            listobj['chatlist.'+i_ind+'.dislike']=1;
            // listobj ={
            //     //objstring:1,
            //     feedback:data.feedback
            // };
            updateobj = extend({}, listobj, updateobj);
            listobj['chatlist.'+i_ind+'.feedback']=data.feedback;
            updateobj = extend({}, listobj, updateobj);
        }
        //console.log(updateobj);
        Chathistory.update(
            { 
                session_id:data.session_id,
                user:data.user
            },
            { 
                $set: updateobj 
            }
        ).exec(function (err, updatefound) {
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
    },
    like: function (data, callback) {
        var updateobj = { like:1 };
        
        Chathistory.update(
            { 
                session_id:data.session_id,
                user:data.user
            },
            { 
                $set: updateobj 
            }
        ).exec(function (err, updatefound) {
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