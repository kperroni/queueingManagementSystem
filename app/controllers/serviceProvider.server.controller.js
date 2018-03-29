var ServiceProviderModel = require('mongoose').model('ServiceProvider');

exports.createServiceProvider = function (req, res, next) {

    var serviceProvider = new ServiceProviderModel(req.body);
    serviceProvider.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(serviceProvider);
        }
    });
};

exports.getServiceProviders = function (req, res, next) {
    ServiceProviderModel.find({}, function (err, serviceProviders) {
        if (err) {
            return next(err);
        } else {
            res.json(serviceProviders);
        }
    });
};