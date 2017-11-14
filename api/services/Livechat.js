// var server = require('http').createServer();
// var io = require('socket.io')(server);

var model = {
    sendchat: function (data, callback) {
        // console.log(data,"empty");
        // io.on('connection', function (socket) {
        //     console.log('User connected');
        //     callback(null,1);
        //     socket.on('disconnect', function() {
        //         console.log('User disconnected');
        //     });
        //     socket.on('save-message', function (data) {
        //         console.log(data);
        //         io.emit('new-message', { message: data });
        //     });
        // });
        io.socket.on('user', function(event){console.log(event);})
        //server.listen(8080);
    },
    addConv: function(req, res) {

        var data_from_client = req.params.all();

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
    }
};
module.exports = _.assign(module.exports, exports, model);