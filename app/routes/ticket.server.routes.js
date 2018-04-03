module.exports = function (app) {
    //load the controllers
    var ticketController = require('../controllers/ticket.server.controller');
    //handle the routing of get and post request
    app.post('/ticket/createTicket', ticketController.createTicket);

    app.get('/ticket/getActiveTickets', ticketController.viewActiveTickets);

    app.post('/ticket/getPrecedingTickets',ticketController.getPrecedingTickets);
};