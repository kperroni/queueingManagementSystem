// Load the 'Ticket' Mongoose model
var Ticket = require('mongoose').model('Ticket');
var User = require('mongoose').model('User');

exports.createTicket = function (req, res, next) {
    console.log("Ticket Controller");

    /*
    console.log("locals.user", req.locals.user);
    if(req.locals.user == null) {
        return res.json({"message":0, "err":"you must login first"});
    }

    User.findOne({"username":req.locals.user}, function(err, retuser) {
        if(err) {
            return res.json({"message":0, "err":err});
        } else {
            req.body.userId = retuser._id;
        }
    });
*/
    // Create a new instance of the 'Ticket' Mongoose model
    Ticket.findMax(function(err, ret) {
        if (err) {
            return res.json({"message":0, "err":err});
        } else {
            if(ret) {
                req.body.ticketNumber = ret.ticketNumber + 1; // next ticket
            } else {
                req.body.ticketNumber = 1; // first ticket
            }

            req.body.weight = 1;    // temporarily a fix value

            var ticket = new Ticket(req.body);
            console.log("body: ", req.body);
            // Use the 'Ticket' instance's 'save' method to save a new user document
            ticket.save(function (err) {
                if (err) {
                    return res.json({"message":0, "err":err});
                } else {
                    next({"message":1, "ticketNumber":req.body.ticketNumber});
                }
            });
        }
    });
};
