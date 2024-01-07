const mongoose = require('mongoose');
const { defaultAppValue } = require('../../defaultValue');

const { Schema } = mongoose;

const subjectSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		duration: {
			type: String,
			required: true,
			default: defaultAppValue.subjectDuration,
		},
		teacher: {
			type: Schema.Types.ObjectId,
			ref: 'Teacher',
		},
		academicTerm: {
			type: Schema.Types.ObjectId,
			ref: 'AcademicTerm',
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'Admin',
			required: true,
		},
	},
	{ timestamps: true }
);

exports.Subject = mongoose.model('Subject', subjectSchema);
