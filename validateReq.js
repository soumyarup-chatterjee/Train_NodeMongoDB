const Joi = require('joi');

const studentSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	department: Joi.string().max(3).required(),
	age: Joi.number().min(17).max(30).positive().required()
});

function isValidRequest(req){
	const {error, value} = studentSchema.validate(req);
	if(error) return error;
	else return true;
}

module.exports = isValidRequest;