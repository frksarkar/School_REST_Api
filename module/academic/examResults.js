const mongoose = require('mongoose');
const { defaultAppValue } = require('../../defaultValue');

const { Schema } = mongoose;

const examResultSchema = new Schema(
	{
		student: {
			type: Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
		exam: {
			type: Schema.Types.ObjectId,
			ref: 'Exam',
			required: true,
		},
		grade: {
			type: Number,
			required: true,
		},
		passMark: {
			type: Number,
			required: true,
			default: 100,
		},
		status: {
			type: String,
			required: true,
			enum: defaultAppValue.examStatusEnumVal,
			default: 'fail',
		},
		remarks: {
			type: String,
			required: true,
			enum: defaultAppValue.examResultEnumVal,
			default: 'Poor',
		},
		// position: {
		// 	type: Number,
		// 	required: true,
		// },
		subject: {
			type: Schema.Types.ObjectId,
			ref: 'Subject',
			required: true,
		},
		classLevel: {
			type: Schema.Types.ObjectId,
			ref: 'ClassLevel',
			required: true,
		},
		academicTerm: {
			type: Schema.Types.ObjectId,
			ref: 'AcademicTerm',
			required: true,
		},
		academicYear: {
			type: Schema.Types.ObjectId,
			ref: 'AcademicYear',
			required: true,
		},
		
	},
	{
		timestamps: true,
	}
);

exports.ExamResult = mongoose.model('ExamResult', examResultSchema);
