// Load the 'Service' Mongoose model
var Service = require('mongoose').model('Service');

exports.createService = function (req, res, next) {

    // Create a new instance of the 'Service' Mongoose model
    var service = new Service(req.body);
    console.log("body: " + req.body);
    console.log(req.body);
    // Use the 'Service' instance's 'save' method to save a new Service document
    service.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(service);

        }
    });
};

exports.getServices = function (req, res, next) {
    console.log("controller", "getServices");
    Service.find({}, function (err, services) {
        if (err) {
            return next(err);
        } else {
            console.log("services", services);
            res.json(services);
        }
    });
};
