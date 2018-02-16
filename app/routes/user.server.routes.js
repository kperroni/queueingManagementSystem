module.exports = function (app) {
    //load the controllers
    var user = require('../controllers/user.server.controller');
    //handle the routing of get and post request
    app.get('/getUsers', user.getUsers);
    app.post('/createUser', user.createUser);
};