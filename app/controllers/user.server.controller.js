// Load the 'User' Mongoose model
var User = require('mongoose').model('User');

exports.createUser = function (req, res, next) {

    // Create a new instance of the 'User' Mongoose model
    var user = new User(req.body);
    console.log("body: " + req.body.username);
    console.log(req.body);
    // Use the 'User' instance's 'save' method to save a new user document
    user.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(user);

        }
    });
};

// Create a new 'getUsers' controller method
exports.getUsers = function (req, res, next) {
    console.log("controller", "getUsers");
    // Use the 'User' instance's 'find' method to retrieve a new user document
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
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