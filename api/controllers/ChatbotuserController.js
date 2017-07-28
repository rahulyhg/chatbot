module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    loginuser: function (req, res) {
        //console.log(req);
        if (req.body) {
            Chatbotuser.loginuser(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    changepassword: function (req, res) {
        //console.log(req);
        if (req.body) {
            Chatbotuser.changepassword(req.body, res.callback);
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