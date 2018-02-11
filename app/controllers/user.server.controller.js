const mongoMod = require('../config/database/mongo');
const response = require('../config/database/data');

exports.getUsers = function (req, res) {

    // An object of type user could be used
    // This function could be inside the User class (model?)
    mongoMod.connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                mongoMod.sendError(err, res);
            });
    }); 
};