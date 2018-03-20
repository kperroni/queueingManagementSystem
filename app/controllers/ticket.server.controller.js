// Load the 'User' Mongoose model
var Ticket = require('mongoose').model('Ticket');

exports.createTicket = function (req, res, next) {
    console.log("Ticket Controller");
    // Create a new instance of the 'User' Mongoose model
    Ticket.findMax(function(err, ret, next) {
        if (err) {
            return next({"err":err});
        } else {
            if(ret) {
                console.log("max ticketNumber", ret.ticketNumber);
                req.body.ticketNumber = ret.ticketNumber + 1; // next ticket
            } else {
                req.body.ticketNumber = 1; // first ticket
            }

            req.body.weight = 1;    // temporarily fix value

            var ticket = new Ticket(req.body);
            console.log("body: ", req.body);
            // Use the 'User' instance's 'save' method to save a new user document
            ticket.save(function (err, next) {
                if (err) {
                    res.json({"err":err});
                } else {
                    res.json("Ticket was successfully created");
                }
            });
        }
    });
};
