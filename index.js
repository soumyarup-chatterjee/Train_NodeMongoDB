const Model = require('./model');
const validate = require('./validateReq');
const express = require('express');

const app = new express();

app.use(express.json());

app.get('/', function(req, res) {
	res.send('This is the Home Page');
});

app.get('/api/students', function(req, res) {
	const studentList = Model.getStudents();

	studentList
		.then((val) => { res.send(val) })
		.catch((err) => { res.status(404).send(err) }); 
});

app.post('/api/students', (req, res) => {
	const validReq = validate(req.body);
	if (validReq == true) {
		const entry = Model.createStudent(req.body);
		entry
			.then((v) => { res.send(v) })
			.catch((err) => { res.status(400).send(err) });
	}
	else res.status(400).send(validReq.message);
});

app.listen(3000);