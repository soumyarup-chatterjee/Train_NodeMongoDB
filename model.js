const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/StudentDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(function() { console.log('Connection established with StudentDB') })
    .catch(function(err) { console.log(err) });

const studentSchema = new mongoose.Schema({
    name: String,
    department: String,
    age: Number
});

const Student = mongoose.model('Students', studentSchema);

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

function getOneStu(id) {
    let student = new Promise(function(resolve, reject) {
        Student.findById(id, function(err, res) {
            if(err) reject(err);
            else resolve(res);
        });
    });
    return student;
}

function findStuAndUpdate(stu, id) {
    let student = new Promise(function(resolve, reject) {
        Student.findByIdAndUpdate(id, stu, function(err, res) {
            if(err) reject(err);
            else resolve(res);
        });
    });
    return student;
}

function findStuAndDelete(id) {
    let student = new Promise(function(resolve, reject) {
        Student.findByIdAndDelete(id, function(err, res) {
            if(err) reject(err);
            else resolve(res);
        });
    });
    return student;
}

module.exports = {
    createStudent: saveStudent,
    getStudents: getAllStu,
    getStudent: getOneStu,
    updateStudent: findStuAndUpdate,
    deleteStudent: findStuAndDelete
};