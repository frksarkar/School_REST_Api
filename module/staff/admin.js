const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, default: 'admin' },
		academicTerms: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'AcademicTerms' },
		],
		academicYear: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' },
		],
		classLevels: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'ClassLevel' },
		],
		teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
		students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
	},
	{
		timestamps: true,
	}
);

adminSchema.pre('save', async function (next) {

	const passwordHash = await bcrypt.hash(this.password, 12);
	this.password = passwordHash;

	next();
});

adminSchema.pre('findOneAndUpdate', async function (next) {

	const passwordHash = await bcrypt.hash(this._update.password, 12);
	this._update.password = passwordHash;

	next();
});

adminSchema.methods.verifyPassword = function (enterPassword) {
	return bcrypt.compare(enterPassword, this.password);
};

exports.Admin = mongoose.model('Admin', adminSchema);
