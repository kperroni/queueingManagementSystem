// Load the 'Service' Mongoose model
var ServiceModel = require('mongoose').model('Service');

exports.createService = function (req, res, next) {

    // Create a new instance of the 'Service' Mongoose model
    var service = new ServiceModel(req.body);
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

// Create a new 'getUsers' controller method
exports.getServices = function (req, res, next) {
    console.log("controller", "getServices");
    // Use the 'User' instance's 'find' method to retrieve a new user document
    Service.find({}, function (err, services) {
        if (err) {
            return next(err);
        } else {
            res.json(services);
        }
    });
};
