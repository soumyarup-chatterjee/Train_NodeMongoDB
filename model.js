const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/StudentDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(function() { console.log('Connection established') })
.catch(function(err) { console.log(err) });

const studentSchema = new mongoose.Schema({
    name: String,
    department: String,
    age: Number
});

const Student = mongoose.model('students', studentSchema);

function saveStudent(stuInfo) {
    const sc = new Student(stuInfo);
    let saveStu = new Promise(function(resolve, reject) {
        sc.save((err) => { 
            if(err) reject(err);
            else resolve(sc);
        });
    });
    return saveStu;
}

function getAllStu() {
    let stuList = new Promise(function (resolve, reject) {
        Student.find((err, students) => {
            if(err) reject(err);
            else resolve(students);
        });
    });
    return stuList;
}

module.exports = {
    createStudent: saveStudent,
    getStudents: getAllStu
};