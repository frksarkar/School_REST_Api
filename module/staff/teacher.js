const mongoose = require('mongoose');
const { defaultAppValue } = require('../../defaultValue');
const { passwordEncrypt, isValidPassword } = require('../../utils/helper');

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
		role: {
			type: String,
			default: 'teacher',
		},
		dateEmployed: {
			type: Date,
			default: Date.now,
		},
		isWithdraw: {
			type: Boolean,
			default: false,
		},
		isSuspended: {
			type: Boolean,
			default: false,
		},

		subject: {
			type: Schema.Types.ObjectId,
			ref: 'Subject',
			// required: true,
		},
		applicationStatus: {
			type: String,
			enum: defaultAppValue.teacherApplicationStatusEnumVal,
			default: 'pending',
		},
		program: {
			type: Schema.Types.ObjectId,
			ref: 'Program',
			// required: true,
		},
		classLevel: {
			type: Schema.Types.ObjectId,
			ref: 'ClassLevel',
			// required: true,
		},
		academicYear: {
			type: Schema.Types.ObjectId,
			ref: 'AcademicYear',
			// required: true,
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
			// required: true,
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

teacherSchema.pre('save', passwordEncrypt);

teacherSchema.methods.verifyPassword = isValidPassword;

exports.Teacher = mongoose.model('Teacher', teacherSchema);
