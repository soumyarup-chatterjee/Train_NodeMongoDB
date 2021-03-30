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

app.get('/api/student/:id', function(req, res) {
	const student = Model.getStudent(req.params.id);

	student
		.then((result) => { res.send(result) })
		.catch((error) => { res.status(400).send(error) });
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

app.put('/api/student/:id', function(req, res) {
	const student = Model.updateStudent(req.body, req.params.id);

	student
		.then((result) => { res.send(result) })
		.catch((error) => { res.status(400).send(error) });
});

app.delete('/api/student/:id', function(req, res) {
	const student = Model.deleteStudent(req.params.id);

	student
		.then((result) => { res.send(result) })
		.catch((error) => { res.status(400).send(error) });
});

let port = 3000;

const listening = app.listen(port);

if(listening) console.log(`Listening at Port ${port}`);
else console.log(`The server could not be started at Port ${port}`);