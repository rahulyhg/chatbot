module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    savehistory: function (req, res) {
        if (req.body) {
            Chathistory.savehistory(req.body, res.callback);
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
    getdashboarddata: function (req, res) {
        if (req.body) {
            Chathistory.getdashboarddata(req.body, res.callback);
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
};
module.exports = _.assign(module.exports, controller);