// Load the 'Student' Mongoose model
var StudentModel = require('mongoose').model('Student');

exports.createStudent = function (req, res, next) {

    // Create a new instance of the 'Student' Mongoose model
    var Student = new StudentModel(req.body);
    console.log("body: " + req.body);
    // Use the 'Student' instance's 'save' method to save a new Student document
    Student.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(Student);

        }
    });
};

// Create a new 'getstudents' controller method
exports.getStudents = function (req, res, next) {
    console.log("controller", "getStudents");
    // Use the 'student' instance's 'find' method to retrieve a new student document
    Student.find({}, function (err, Students) {
        if (err) {
            return next(err);
        } else {
            res.json(Students);
        }
    });
};

