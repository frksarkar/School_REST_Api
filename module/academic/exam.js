const mongoose = require('mongoose');

const { Schema } = mongoose;

const examSchema = new Schema(
	{
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: 'Subject',
            required: true,
        },
        program: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            required: true,
        },
        passMark: {
            type: Number,
            required: true,
            default: 50,
        },
        totalMark: {
            type: Number,
            required: true,
            default: 100,
        },
        
        duration: {
            type: String,
            required: true,
            default: '30 minutes'
        },
        examDate: {
            type: Date,
            required: true,
        },
        examTime: {
            type: String,
            required: true,
        },
        examType: {
            type: String,
            required: true,
            default: 'Quiz',
        }, 
        examStatus: {
            type: String,
            required: true,
            default: 'Pending',
            enum: ['Pending', 'live']
        }, 
        question: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Question',
            }
        ],
        classLevel: {
            type: Schema.Types.ObjectId,
            ref: 'ClassLevel',
            required: true,
        }, 
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
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
        }
    },
	{
		timestamps: true,
	}
);

exports.Exam = mongoose.model('Exam', examSchema);
