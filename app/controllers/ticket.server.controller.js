// Load the 'Ticket' Mongoose model
var Ticket = require('mongoose').model('Ticket');
var User = require('mongoose').model('User');
var Guest = require('mongoose').model('Guest');

exports.createTicket = function (req, res, next) {
    console.log("Ticket Controller");
    
    // verify it the user is logged in
    if(req.user.id == null) {
        return res.json({message:"0", err:"you must login first"});
        console.log("req.user.id", req.user.id);
    }

    Ticket.findMax(function(err, ret) {     // get the maximum number of ticket
        if (err) {
            return res.json({message:"0", err:err});
        } else {
            if(ret) {
                req.body.ticket.ticketNumber = ret.ticketNumber + 1; // next ticket
            } else {
                req.body.ticket.ticketNumber = 1;   // first ticket
            }

            req.body.ticket.userId = req.user.id;   // set the loged user id
            req.body.ticket.weight = 1;             // temporarily a fix value
            
            if(req.body.guest != null) { // if we need to inser fisrt the guest
                var guest = new Guest(req.body.guest);
                guest.save(function(err, ret) { // save the new guest
                    if (err) {
                        return res.json({message:"0", err:err});
                    } else {
                        console.log("guest", ret);
                        req.body.ticket.guestId = ret._id;      // set the guest id in the ticket
                        var ticket = new Ticket(req.body.ticket);
                        ticket.save(function (err) {                        // save the ticket after the guest
                            if (err) {
                                return res.json({message:"0", err:err});
                            } else {
                                res.json({message:"1", ticketNumber:req.body.ticket.ticketNumber});
                            }
                        });        
                    }
                });
            } else {
                var ticket = new Ticket(req.body.ticket);
                ticket.save(function (err) {                        // save the ticket without any guest
                    if (err) {
                        return res.json({message:"0", err:err});
                    } else {
                        res.json({message:"1", ticketNumber:req.body.ticket.ticketNumber});
                    }
                });
            }
        }
    });
};

exports.viewActiveTickets = function (req, res, next) {
    console.log("Ticket Controller");
    
    // Use the 'User' instance's 'find' method to retrieve a new user document
    Ticket.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.viewStudentTicket = function (req, res, next) {
    console.log("Ticket Controller");
    
    // Use the 'User' instance's 'find' method to retrieve a new user document
    Ticket.find({status:'A'}, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};