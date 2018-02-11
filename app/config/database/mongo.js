const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var mongoMod = 
{
    connection: (closure) => {
        return MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (err) return console.log(err);       
            var db = client.db('mean');
            closure(db);
        });
    },

    sendError: (err, res) => {
        response.status = 501;
        response.message = typeof err == 'object' ? err.message : err;
        res.status(501).json(response);
    }
}

/*
// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) return console.log(err);       
        var db = client.db('mean');
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};
*/

/*
// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};
*/

module.exports = mongoMod;