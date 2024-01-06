const mongoose = require('mongoose');
const { defaultAppValue } = require('../../defaultValue');

const { Schema } = mongoose;

const academicTermSchema = new Schema(
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
			default: defaultAppValue.academicTermDuration,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'Admin',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

exports.AcademicTerm = mongoose.model('AcademicTerm', academicTermSchema);
