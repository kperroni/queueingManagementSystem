module.exports = function (app) {
    //load the controllers
    var service = require('../controllers/service.server.controller');
    //handle the routing of get and post request
    app.get('/getServices', service.getServices);
    app.post('/createService', service.createService);
};