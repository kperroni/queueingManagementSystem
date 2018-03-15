module.exports = function (app) {
    //load the controllers
    var user = require('../controllers/service.server.controller');
    //handle the routing of get and post request
    app.get('/getServices', user.getServices);
    app.post('/createService', user.createService);
};