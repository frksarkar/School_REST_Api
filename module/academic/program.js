const mongoose = require('mongoose');
const { defaultAppValue } = require('../../defaultValue');
const { Schema } = mongoose;

const programSchema = new Schema(
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
			default: defaultAppValue.programDuration,
		},
		code: {
			type: String,
			default: function () {
				return (
					this.name
						.split(' ')
						.map((name) => name[0])
						.join('')
						.toUpperCase() +
					Math.floor(10 + Math.random() * 90) +
					Math.floor(10 + Math.random() * 90)
				);
			},
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'Admin',
			required: true,
		},
		teachers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Teacher',
				default: [],
			},
		],
		students: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Student',
				default: [],
			},
		],
		subjects: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Subject',
				default: [],
			},
		],
	},
	{
		timestamps: true,
	}
);

exports.Program = mongoose.model('Program', programSchema);
