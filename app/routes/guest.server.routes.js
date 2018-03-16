module.exports = function (app) {
    //load the controllers
    var guest = require('../controllers/guest.server.controller');
    //handle the routing of get and post request
    app.get('/getGuests', user.getGuests);
    app.post('/createGuest', user.createGuest);
};