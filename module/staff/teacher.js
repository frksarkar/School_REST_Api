const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		isWithdraw: {
			type: Boolean,
			default: false,
		},
		isSuspended: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: 'teacher',
		},
		subject: {
			type: Schema.Types.ObjectId,
			ref: 'Subject',
			required: true,
		},
		applicationStatus: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		program: {
			type: Schema.Types.ObjectId,
			ref: 'Program',
			required: true,
		},
		classLevel: {
			type: Schema.Types.ObjectId,
			ref: 'ClassLevel',
			required: true,
		},
		academicYear: {
			type: Schema.Types.ObjectId,
			ref: 'AcademicYear',
			required: true,
		},
		examsCreated: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Exam',
			},
		],
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
	{
		timestamps: true,
	}
);

exports.Teacher = mongoose.model('Teacher', teacherSchema);
