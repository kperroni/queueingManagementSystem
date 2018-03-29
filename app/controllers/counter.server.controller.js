var CounterModel = require('mongoose').model('Counter');

exports.createCounter = function (req, res, next) {

    var counter = new CounterModel(req.body);
    counter.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(counter);
        }
    });
};

exports.getCounters = function (req, res, next) {
    CounterModel.find({}, function (err, counters) {
        if (err) {
            return next(err);
        } else {
            res.json(counters);
        }
    });
};