module.exports = function (app) {
    //load the controllers
    var user = require('../controllers/student.server.controller');
    //handle the routing of get and post request
    app.get('/getStudents', user.getStudents);
    app.post('/createStudent', user.createStudent);
};