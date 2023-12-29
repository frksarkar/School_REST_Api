const mongoose = require('mongoose');

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
		score: {
			type: Number,
			required: true,
		},
		passMark: {
			type: Number,
			required: true,
			default: 50,
		},
		status: {
			type: String,
			required: true,
			enum: ['failed', 'passed'],
			default: 'failed',
		},
		remarks: {
			type: String,
			required: true,
			enum: ['Excellent', 'Good', 'Poor'],
			default: 'Poor',
		},
		position: {
			type: Number,
			required: true,
		},
        subject: {
            type: Schema.Types.ObjectId,
            ref: 'Subject',
        }
        ,
        classLevel: {
            type: Schema.Types.ObjectId,
            ref: 'ClassLevel',
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
        isPublished: {
            type: Boolean,
            default: false,
        }
	},
	{
		timestamps: true,
	}
);

exports.ExamResult = mongoose.model('ExamResult', examResultSchema);
