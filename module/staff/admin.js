const mongoose = require('mongoose');
const { passwordEncrypt, isValidPassword } = require('../../utils/helper');

const adminSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, default: 'admin' },
		academicTerms: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'AcademicTerms' },
		],
		academicYears: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' },
		],
		classLevels: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'ClassLevel' },
		],
		yearGroups: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'YearGroup' },
		],
		programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
		teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
		students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
	},
	{
		timestamps: true,
	}
);

adminSchema.pre('save', passwordEncrypt);

adminSchema.methods.verifyPassword = isValidPassword;

exports.Admin = mongoose.model('Admin', adminSchema);
