const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, default: 'admin' },
	},
	{
		timestamps: true,
	}
);

adminSchema.pre('save', async function (next) {
	console.log(this.isModified());

	const passwordHash = await bcrypt.hash(this.password, 12);
	this.password = passwordHash;

	next();
});

adminSchema.methods.verifyPassword = function (enterPassword) {
	return bcrypt.compare(enterPassword, this.password);
};

exports.Admin = mongoose.model('Admin', adminSchema);
