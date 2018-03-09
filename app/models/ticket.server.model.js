// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var TicketSchema = new Schema({
    ticketId: {
        type: String,
        required: true
    },
    service: {
        type: String,
    },
    subject: {
        type: String,
    },
    description:{
        type: String,
    } 
});

mongoose.model('Ticket', TicketSchema);