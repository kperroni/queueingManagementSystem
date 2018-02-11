exports.render = function (req, res) {

    //Send all requests to Angular app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../' ,'dist/index.html'));
    });  
};