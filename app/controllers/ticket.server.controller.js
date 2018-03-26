// Load the 'Ticket' Mongoose model
var Ticket = require('mongoose').model('Ticket');
var User = require('mongoose').model('User');

exports.createTicket = function (req, res, next) {
    console.log("Ticket Controller");

    if (req.user.id == null) {
        return res.json({ message: "0", err: "you must login first" });
    }
    console.log("req.user.id", req.user.id);

    // Create a new instance of the 'Ticket' Mongoose model
    Ticket.findMax(function (err, ret) {
        if (err) {
            return res.json({ message: "0", err: err });
        } else {
            if (ret) {
                req.body.ticketNumber = ret.ticketNumber + 1; // next ticket
            } else {
                req.body.ticketNumber = 1; // first ticket
            }

            req.body.userId = req.user.id;
            req.body.weight = 1;    // temporarily a fix value

            var ticket = new Ticket(req.body);
            console.log("body: ", req.body);
            // Use the 'Ticket' instance's 'save' method to save a new user document
            ticket.save(function (err) {
                if (err) {
                    return res.json({ message: "0", err: err });
                } else {
                    res.json({ message: "1", ticketNumber: req.body.ticketNumber });
                }
            });
        }
    });
};

exports.getCurrentTicket = function (req, res, next) {
    if (req.user.type != null) {
        console.log("req.user.type", req.user.type);
    }
    Ticket.find({ "status": 'A' }).sort("ticketNumber").limit(1).exec(function (err, retobj) {
        const ret = {};
        if (err) {
            return res.json({ message: "0", err: err });
        } else {
            if(req.user.type == 'E')
            {
            res.json({ message: "1", ticket: retobj, userType: req.user.type });
            }
            else{
                res.json({ message: "1", ticket: ret, userType: req.user.type });
            }
        }
    });
};

exports.updateCurrentTicket = function (req, res, next) {
    const ret = {};
    Ticket.findOneAndUpdate({ "ticketNumber": req.body.ticketNumber }, req.body, { new: true }, function (err, retobj) {
        if (err) {
            return res.json({ message: "0", err: err });
        } else {
            res.json({ message: "1", ticket: retobj });
        }
    });
};

exports.viewActiveTickets = function (req, res, next) {
    console.log("Ticket Controller");

    // Use the 'User' instance's 'find' method to retrieve a new user document
    Ticket.find({ "status": 'A' }, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};
