// Load the 'User' Mongoose model
var User = require('mongoose').model('User');
const passport = require('passport');

exports.createUser = function (req, res, next) {

    //if(!req.user){

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
            // If the user was created successfully use the Passport 'login' method to login
            req.login(user, (err) => {
                // If a login error occurs move to the next middleware
                if (err) return next(err);

                // Redirect the user back to the main application page
                res.json(user);
            });
            // Use the 'response' object to send a JSON response
        }
    });
    //}
    /*else {
        res.json({message:"Error"});
    }*/
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
exports.login = function (req, res, next) {
    console.log("controller", "login");
    console.log("username", req.body.username);
    if (req.body.username && req.body.password) {
        User.findByUsername(req.body.username, function (err, retobj) {
            if (retobj) {
                if (retobj.password === req.body.password) {
                    req.session.user = req.body.username;
                    req.locals.user = req.body.username;
                    req.session.login = 'ok';
                    console.log("login success");
                    res.send({ login: true });
                } else {
                    // req.session.reset();
                    res.json({ login: false });
                }
            } else {
                res.json({ login: false });
            }
        });
    }
}

// logoff controller method
exports.logout = function (req, res, next) {
    req.session.reset();
    next();
}