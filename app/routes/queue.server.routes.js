module.exports = function (app) {
    //load the controllers
    var user = require('../controllers/queue.server.controller');
    //handle the routing of get and post request
    app.get('/queue/getQueues', user.getQueues);
    app.post('/queue/createQueue', user.createQueue);
};