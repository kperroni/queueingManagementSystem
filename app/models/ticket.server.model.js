// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var TicketSchema = new Schema({
    ticketNumber: {
        type: Number,
        required: true,
        unique: true
    },
    subject: {
        type: String,
    },
    description:{
        type: String,
    }, 
    serviceId: {
        required: true,
        type: Schema.Types.ObjectId,
        Ref: 'Service'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        Ref: 'Student'
    },
    guessId: {
        type: Schema.Types.ObjectId,
        Ref: 'Guest'
    },    
    weight: {
        type: Number,
    },
    status: {
        type: String, // A = Active, S = Skiped, D = Done, C = Cancel
        default: 'A'
    },
    userId: {
        type: Schema.Types.ObjectId,
        Ref: 'User'
    },
    creationTime: {
        type: Date,
        default: Date.now
    },    
});

TicketSchema.statics.findMax = function (callback) {
    this.findOne().sort('-ticketNumber').exec(callback);
}

mongoose.model('Ticket', TicketSchema);