// Load the 'User' Mongoose model
var Ticket = require('mongoose').model('Ticket');

exports.createTicket = function (req, res, next) {
    console.log("Ticket Controller");
    // Create a new instance of the 'User' Mongoose model
    var ticket = new Ticket(req.body);
    console.log("body: " + req.body);
    // Use the 'User' instance's 'save' method to save a new user document
    ticket.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json("Ticket was successfully created");

        }
    });
};

exports.viewActiveTickets = function (req, res, next) {
    console.log("Ticket Controller");
    
    console.log("controller", "getUsers");
    // Use the 'User' instance's 'find' method to retrieve a new user document
    Ticket.find({status : "Active"}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};