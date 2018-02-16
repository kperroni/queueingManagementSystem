// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    program: String
});
// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);

// Functions go here