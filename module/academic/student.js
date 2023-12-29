const mongoose = require('mongoose');

const { Schema } = mongoose;

const student = new Schema(
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
		studentId: {
			type: String,
			required: true,
			default: function () {
				return (
					'STU' +
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

		role: {
			type: String,
			default: 'student',
		},
		classLevels: [
			{
				type: String,
				ref: 'ClassLevel',
				required: true,
			},
		],
		currentClassLevel: {
			type: String,
			default: function () {
				return this.classLevels[this.classLevels.length - 1];
			},
		},
		academicYear: {
			type: Schema.Types.ObjectId,
			ref: 'AcademicYear',
			required: true,
		},
		dateAdmitted: {
			type: Date,
			default: Date.now(),
		},
		examResults: [
			{
				type: Schema.Types.ObjectId,
				ref: 'ExamResults',
			},
		],
		program: {
			type: Schema.Types.ObjectId,
			ref: 'Program',
			required: true,
		},
		isPromotedToLevel200: {
			type: Boolean,
			default: false,
		},
		isPromotedToLevel300: {
			type: Boolean,
			default: false,
		},
		isPromotedToLevel400: {
			type: Boolean,
			default: false,
		},
		isGraduated: {
			type: Boolean,
			default: false,
		},
		isWithdrawn: {
			type: Boolean,
			default: false,
		},
		isSuspended: {
			type: Boolean,
			default: false,
		},
		prefectName: {
			type: String,
		},
		yearGraduated: {
			type: String,
		},
		// behaviorReport: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: 'StudentBehaviorReport',
		// 	},
		// ],
		// financialReport: [
		//     {
		//         type: Schema.Types.ObjectId,
		//         ref: 'StudentFinancialReport',
		//     }
		// ],
	},
	{
		timestamps: true,
	}
);
