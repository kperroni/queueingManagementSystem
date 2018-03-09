// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: String,
    username: {
        type: String,           // we keep this as string, but we are going to use it to storage the id student or the id of an employer.
        unique: true,         // defining username as unique because this is going to be the primary key for this collection
        required: true
    },
    password: {
        type: String,
        required: true
    },
    program: String
});

// Define a static function to recover a user by username
UserSchema.statics.findByUsername = function(username, callback){
    this.findOne({"username":username}, callback);
}

// Define a frecuent vitrual field: fullname
UserSchema.virtual('fullname').get(function() { return this.firstname + ' ' + this.lastname; });

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);

// Functions go here