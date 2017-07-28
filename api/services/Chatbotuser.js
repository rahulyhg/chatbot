var schema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: validators.isEmail(),
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    forgotPassword: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    accessToken: {
        type: [String],
        index: true
    },
    accessLevel: {
        type: String,
    },
    branch: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Chatbotuser', schema,'chatbotuser');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "Chatbotuser", "Chatbotuser"));
var model = {
    loginuser: function (data, callback) {
        console.log("data", data)
        Chatbotuser.findOne({
            email: data.username,
            password: data.password,
        }, { fname: 1, lname: 1,email:1,accessrole:1,branch:1 }).limit(1).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    callback(null, found);
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    },
    changepassword: function (data, callback) {
        Chatbotuser.findOneAndUpdate({
            _id: data.userid,
            password: data.oldpassword,
        },{ $set: { password: data.newpassword }}).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    callback(null, found);
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