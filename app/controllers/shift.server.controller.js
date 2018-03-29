var ShiftModel = require('mongoose').model('shift');

exports.createShift = function (req, res, next) {

    var shift = new ShiftModel(req.body);
    shift.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(shift);
        }
    });
};

exports.getShifts = function (req, res, next) {
    ShiftModel.find({}, function (err, shifts) {
        if (err) {
            return next(err);
        } else {
            res.json(shifts);
        }
    });
};