// Load the 'Ticket' Mongoose model
var Ticket = require('mongoose').model('Ticket');
var User = require('mongoose').model('User');
var Guest = require('mongoose').model('Guest');
var Service = require('mongoose').model('Service');
var serviceC = require('../controllers/service.server.controller');
var userC = require('../controllers/user.server.controller');

exports.createTicket = function (req, res, next) {
    console.log("Ticket Controller");

    // verify it the user is logged in
    if (req.user.id == null) {
        return res.json({ message: "0", err: "you must login first" });
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

            Service.findById(req.body.ticket.serviceId, function (err, service) {
                if (err) {
                    return res.json({ message: "0", err: err });
                } else {

                    req.body.ticket.weight = req.body.ticket.ticketNumber - service.weight + service.averageMinutes;
                    req.body.ticket.userId = req.user.id;   // set the loged user id

                    if (req.body.guest != null) { // if we need to inser fisrt the guest
                        var guest = new Guest(req.body.guest);
                        guest.save(function (err, ret) { // save the new guest
                            if (err) {
                                return res.json({ message: "0", err: err });
                            } else {
                                console.log("guest", ret);
                                req.body.ticket.guestId = ret._id;      // set the guest id in the ticket
                                var ticket = new Ticket(req.body.ticket);
                                ticket.save(function (err) {                        // save the ticket after the guest
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
        }
    });
};

exports.getCurrentTicket = function (req, res, next) {
    if (req.user.type != null) {
        console.log("req.user.type", req.user.type);
    }

    Ticket.find({ "status": 'A' }).sort({ "weight": 1, "ticketNumber": 1 }).limit(1).exec(function (err, retobj) {
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
            '$set': { 'status': req.body.status },
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
    Ticket.find({
        status: 'A',
        studentId: { $ne: null }
    }).sort({ "weight": 1, "ticketNumber": 1 }).exec(function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.getPrecedingTickets = function (req, res, next) {
    console.log("preceding ticket Called");

    var student = req.body.activeStudent;

    console.log(student);

    // Use the 'User' instance's 'find' method to retrieve a new user document
    Ticket.find({
        status: 'A',
        studentId: { $ne: student._id },
        studentId: { $ne: null }
        //weight: { $gte: ticket.weight }
    }
    ).sort({ "weight": 1, "ticketNumber": 1 }).exec(function (err, tickets) {
        if (err) {
            return next(err);
        } else {

            console.log(tickets);
            res.json(tickets);
        }
    });

};

exports.viewStudentTicket = function (req, res, next) {
    console.log("Ticket Controller");

    var student = req.body;

    // Use the 'User' instance's 'find' method to retrieve a new user document
    Ticket.findOne({
        status: 'A',
        studentId: student._id,
        studentId: { $ne: null }
    }, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
}

exports.getTicketByTicketNumber = function (req, res, next) {

    Ticket.find({ ticketNumber: req.ticketNumber }).sort({ "weight": 1, "ticketNumber": 1 }).limit(1).exec(function (err, ticket) {
        const ret = {};
        if (err) {
            return res.json({ message: "0", err: err });
        } else {
            res.json(ticket);
        }
    });
};