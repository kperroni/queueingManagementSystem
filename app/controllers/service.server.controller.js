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

// login controller method
exports.login = function(req, res, next) {
    console.log("controller", "login");
    console.log("username", req.body.username);
    if(req.body.username && req.body.password) {
        User.findByUsername(req.body.username, function (err, retobj) {
            if(retobj) {
                if(retobj.password === req.body.password) {
                    req.session.user = req.body.username;
                    req.locals.user = req.body.username;
                    req.session.login = 'ok';
                    console.log("login success");
                    res.send({login:true});
                } else {
                    // req.session.reset();
                    res.json({login:false});
                }
            } else {
                res.json({login:false});
            }
        });
    }
}

// logoff controller method
exports.logout = function(req, res, next) {
    req.session.reset();
    next();
}