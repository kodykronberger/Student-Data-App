var db = require("../database/students")

// Export modules
exports.getStudents = getStudents;
exports.getStudent = getStudent;

function getStudents(callback) {
    setTimeout(function () {
        callback(null, db);
    }, 500);
}

function getStudent(id, callback) {
    getStudents(function (error, data) {
        if (error) {
            return callback(error);
        }

        var result = data[id];

        callback(null, result);
    });
}