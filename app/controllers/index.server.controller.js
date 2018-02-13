exports.render = function (req, res) {
    const path = require('path');
    //Send all requests to Angular app
     res.sendFile(path.join(__dirname, '../../' ,'dist/index.html'));
     
};