module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    addConv:function (req,res) {
        var data_from_client = req.params.all();
        console.log(data_from_client,"clientdata");
        console.log(req.method,"reqmeth");
        console.log(req.isSocket,"issock");
        var io = ( require('socket.io-client') );
        if (req.isSocket && req.method === 'POST') {

            // This is the message from connected client
            // So add new conversation
            Livechat.create(data_from_client)
                .exec(function(error, data_from_client) {
                    console.log(data_from_client);
                    Livechat.publishCreate({ 
                    	id: data_from_client.id, 
                    	message: data_from_client.message,
                    	user: data_from_client.user
                    });
                });
        } else if (req.isSocket) {
            // subscribe client to model changes 
            Livechat.watch(req.socket);
            console.log('User subscribed to ' + req.socket.id);
        }
        
	},
    sendchat: function (req, res) {
        if (req.body) {
            var socket = req.socket;
            var io = sails.io;
            var socketId = sails.sockets.getId();
            // io.socket.on('user', function(event){console.log(event);})
            //socket.join('roomName');
            //Livechat.sendchat(req.body, res.callback);
            // sails.sockets.addRoomMembersToRooms('funRoom', ['greatRoom', 'awesomeRoom'], function(err) {
            //     if (err) {return res.serverError(err);}
            //     res.json({
            //          message: 'Subscribed all members of `funRoom` to `greatRoom` and `awesomeRoom`!'
            //     });
            // });
            
            // io.sockets.emit('messageName', {thisIs: 'theMessage'});

            // // broadcast to a room (aka publish)
            // // excluding yourself, if you're in it
            // socket.broadcast.to('roomName').emit('messageName', {thisIs: 'theMessage'});

            // // emit to a room (aka publish)
            // // including yourself
            // io.sockets.in('roomName').emit('messageName', {thisIs: 'theMessage'});

            // // Join a room (aka subscribe)
            // // If you're in the room already, no problem, do nothing
            // // If the room doesn't exist yet, it gets created
            // socket.join('roomName');

            // // Leave a room (aka unsubscribe)
            // // If you're not in the room, no problem, do nothing
            // // If the room doesn't exist yet, no problem, do nothing
            // socket.leave('roomName');

            // // Get all connected sockets in the app
            // sails.io.sockets.clients();

            // // Get all conneted sockets in the room, "roomName"
            // sails.io.sockets.clients('roomName');

            console.log(socketId,"socketid");
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    }
};
module.exports = _.assign(module.exports, controller);