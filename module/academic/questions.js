const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema(
	{
		question: {
			type: String,
			required: true,
		},
		optionsA: {
			type: String,
			required: true,
		},
		optionB: {
			type: String,
			required: true,
		},
		optionC: {
			type: String,
			required: true,
		},
		optionD: {
			type: String,
			required: true,
		},
		correctAnswer: {
			type: Boolean,
			default: true,
		},
		isCorrect: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

exports.Questions = mongoose.model('Questions', questionSchema);
