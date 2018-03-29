module.exports = function (app) {
    //load the controllers
    var user = require('../controllers/user.server.controller');
    const passport = require('passport');

    //handle the routing of get and post request
    app.get('/user/getUsers', user.getUsers);
    app.get('/user/getActiveUser', user.getActiveUser);
    app.post('/user/createUser', user.createUser);
    app.post('/user/getUserById', user.getUserById);
    app.post('/user/logIn', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) { res.json([{ message: "0" }]); }
            else {
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    res.json([{ message: "1" }, { id: user._id, username: user.username, firstName: user.firstName }]);
                });
            }
        })(req, res, next);
    });
    app.get('/user/logOut', function(req, res){
        req.logout();
        res.json({message:"1"});
      });
}