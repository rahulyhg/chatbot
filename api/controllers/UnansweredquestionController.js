module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getunans: function (req, res) {
        //console.log(req);
        if (req.body) {
            Unansweredquestion.getunans(req.body, res.callback);
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