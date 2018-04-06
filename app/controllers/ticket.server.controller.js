// Load the 'Ticket' Mongoose model
var Ticket = require('mongoose').model('Ticket');
var User = require('mongoose').model('User');
var Guest = require('mongoose').model('Guest');
var Service = require('mongoose').model('Service');

exports.createTicket = function (req, res, next) {
    console.log("Ticket Controller");

    // verify it the user is logged in
    if (req.user.id == null) {
        return res.json({ message: "0", err: "you must login first" });
        //console.log("req.user.id", req.user.id);
    }

    Ticket.findMax(function (err, ret) {     // get the maximum number of ticket
        if (err) {
            return res.json({ message: "0", err: err });
        } else {
            if (ret) {
                req.body.ticket.ticketNumber = ret.ticketNumber + 1; // next ticket
            } else {
                req.body.ticket.ticketNumber = 1;   // first ticket
            }

            req.body.ticket.userId = req.user.id;   // set the logged-in user id
            req.body.ticket.weight = 1;             // temporarily a fixed value

            if (req.body.guest != null) { // if we need to insert first the guest
                var guest = new Guest(req.body.guest);
                guest.save(function (err, ret) { // save the new guest
                    if (err) {
                        return res.json({ message: "0", err: err });
                    } else {
                        var ticket = new Ticket(req.body.ticket);
                        ticket.save(function (err) {                        // save the ticket without any guest
                            if (err) {
                                return res.json({ message: "0", err: err });
                            } else {
                                res.json({ message: "1", ticketNumber: req.body.ticket.ticketNumber });
                            }
                        });
                    }
                });
            } else {
                var ticket = new Ticket(req.body.ticket);
                ticket.save(function (err) {                        // save the ticket without any guest
                    if (err) {
                        return res.json({ message: "0", err: err });
                    } else {
                        res.json({ message: "1", ticketNumber: req.body.ticket.ticketNumber });
                    }
                });
            }
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
            if (req.user.type == 'E') {
                res.json({ message: "1", ticket: retobj, userType: req.user.type });
            }
            else {
                res.json({ message: "1", ticket: ret, userType: req.user.type });
            }
        }
    });
};

exports.updateCurrentTicket = function (req, res, next) {
    const ret = {};

    var query = { "ticketNumber": req.body.ticketNumber },
        updateQ = {
            '$set': { 'status': req.body.status, 'description': req.body.description },
            '$addToSet': { 'details': { 'shiftId': req.body.currentShiftId, 'actions': req.body.detailActions } }
        },
        options = { new: true };

    Ticket.findOneAndUpdate(query, updateQ, options, function (err, retobj) {
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
