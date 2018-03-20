// Load the module dependencies
const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const http = require('http');

// Define the Express configuration method
module.exports = function () {
    // Create a new Express application instance
    const app = express();

    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Configure the 'session' middleware
    app.use(session({
        //a session is uninitialized when it is new but not modified
        //force a session that is "uninitialized" to be saved to the store
        saveUninitialized: true,
        //forces the session to be saved back to the session store
        //even if the session was never modified during the request
        resave: true,
        secret: config.sessionSecret // secret used to sign the session ID cookie
    }));

    // Not active for now since Angular 5 takes care of the view
    ////////////////////////////////////////////////////////////
    // Set the application view engine and 'views' folder
    /* app.set('views', './app/views');
     app.set('view engine', 'ejs');
     app.engine('html', require('ejs').renderFile);*/
    ////////////////////////////////////////////////////////////

    // Angular DIST output folder
    app.use(express.static(path.join(__dirname, '../../', 'dist')));

    app.set('port', process.env.PORT || 3000);

    // Load routes
    require('../routes/user.server.routes')(app);
    require('../routes/ticket.server.routes')(app);
    require('../routes/queue.server.routes')(app);
    require('../routes/service.server.routes')(app);
    require('../routes/guest.server.routes')(app);
    require('../routes/student.server.routes')(app);
    
    // most be the last one
    require('../routes/index.server.routes')(app);

    // Configure static file serving
    app.use(express.static('./public'));
    
    // Return the Express application instance
    return app;
};