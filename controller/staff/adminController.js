const { Admin } = require('../../module/staff/admin');
const { tokenGenerate, verifyToken } = require('../../utils/helper');

exports.adminRegister = async function (req, res, next) {
	const { name, email, password } = req.body;

	try {
		const isExist = await Admin.findOne({ email });
		if (isExist) {
			res.json({ status: 'account already exists' });
			return;
		}
		const user = await Admin.create({ name, email, password });

		res.status(201).json({
			status: ' register successful',
			data: user,
		});
	} catch (error) {
		res.json({ status: error.message });
	}
};

exports.adminLogin = async function (req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await Admin.findOne({ email });
		if (!user) {
			res.json({ status: 'user not found' });
			return;
		}
		const isVerified = await user.verifyPassword(password);

		if (!isVerified) {
			res.json({ status: 'password not correct' });
			return;
		}

		const token = tokenGenerate({
			id: user._id.toString(),
			name: user.name,
			email: user.email,
		});

		res.status(200).json({
			status: 'success',
			message: 'admin login successful',
			data: token,
		});
	} catch (error) {
		next(error);
	}
};

exports.getAdmins = async function (req, res, next) {
	try {
		const users = await Admin.find().select('-password');
		res.status(200).json({
			status: 'success',
			message: 'fetch all admins data',
			data: users,
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.getAdmin = async function (req, res, next) {
	try {
		const user = await Admin.findOne(req.user._id).select(
			'name email role'
		);
		res.status(200).json({
			status: 'success',
			message: 'get admin',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateAdmin = async function (req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await Admin.updateOne({ email }, { password });
		console.log('🚀 ~ file: adminController.js:58 ~ user:', user);

		res.status(202).json({
			message: 'update successful',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.deleteAdmin = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'delete admin successful',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminSuspendTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'suspended teacher successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminUnSuspendTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'unSuspended teacher successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminWithdrawnTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'withdrawn successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminUnWithdrawnTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'unWithdrawn successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminPublishExam = function (req, res, next) {
	try {
		res.status(200).json({
			status: 'success',
			data: 'Exam Publish successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminUnPublishExam = function (req, res, next) {
	try {
		res.status(200).json({
			status: 'success',
			data: 'Exam UnPublish successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};
