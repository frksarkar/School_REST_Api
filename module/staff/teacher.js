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
		teacherId: {
			type: String,
			required: true,
			default: function () {
				return (
					'TEA' +
					Math.floor(100 + Math.random() * 900) +
					Date.now().toString().slice(2, 4) +
					this.name
						.split(' ')
						.map((name) => name[0])
						.join('')
						.toUpperCase()
				);
			},
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
		program: String,
		classLevel: String,
		academicYear: String,
		academicTerm: String,
		examsCreated: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Exam',
			},
		],
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
