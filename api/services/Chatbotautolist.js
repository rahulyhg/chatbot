var exports = _.cloneDeep(require("sails-wohlig-service"));
var pythonpath = "http://35.161.160.7:8092/";
var pythonpath = "http://localhost:8080/script/";
var model = {
    getSysMsg: function (data, callback) {
        var util = require("util");
        //var data={a:5,b:5};
        var spawn = require("child_process").spawn;
        var process = spawn('python',["./script/get_name_cmdline.py"], {detached: true});
        process.unref();
        util.log('readingin');

        process.stdout.on('data',function(chunk){

            //var textChunk = chunk.toString('utf8');// buffer to string
            json_data = JSON.parse(chunk);
            console.log(json_data);
            //console.log("chunk",chunk);
            //util.log(chunk);
            callback(null, json_data);
            
        });

        process.on('close', function (code) {
            console.log("close",code);
        });

        process.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        process.stdout.on('error', function( err ) {
            if (err.code == "EPIPE") {
                console.log("error",err);
                py.exit(0);
            }
        });
        process.stdout.on('end', function(){
        	//var str = dataString.substring(1,dataString.length);
        	console.log("end");
        });
        process.stdin.write(JSON.stringify(data));

        process.stdin.end();
        // var spawn = require('child_process').spawn,
        // py = spawn('python', [pythonpath+'compute_input.py'],mydata);
        // var json_data = {};
        // //console.log(mydata);
        // console.log("print");
        // py.stdout.on('mydata', function(data){
            
        //     json_data = JSON.parse(data);
        //     console.log(json_data);
        //     //callback(null, json_data);
        // });
        // py.stdout.on('error', function( err ) {
        //     if (err.code == "EPIPE") {
        //         console.log("error",err);
        //         py.exit(0);
        //     }
        // });
        // callback(null, mydata);
        // //callback(null, data);
        // // py.stdout.on('end', function(){
        // // 	var str = dataString.substring(1,dataString.length);
        // // 	console.log("substring"+dataString.substring(1,dataString.length));
        // // });
        // py.stdin.write(JSON.stringify(mydata));
        // py.stdin.end();
        
    },
};
module.exports = _.assign(module.exports, exports, model);