const { defaultValue } = require('../../defaultValue');
const { throwErr } = require('../../middlewares/errorHandler');
const { Admin } = require('../../module/staff/admin');
const { tokenGenerate } = require('../../utils/helper');

exports.adminRegister = async function (req, res, next) {
	const { name, email, password } = req.body;

	try {
		if (!(name && email && password)) {
			throwErr('all input field are required', 400);
		}

		const isExist = await Admin.findOne({ email });
		if (isExist) {
			throwErr('account already exists', 403);
		}
		const user = await Admin.create({ name, email, password });

		res.status(201).json({
			status: ' register successful',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

exports.adminLogin = async function (req, res, next) {
	const { email, password } = req.body;
	try {
		if (!(email && password)) {
			throwErr('email and password are required', 400);
		}

		const user = await Admin.findOne({ email });
		if (!user) {
			throwErr('user not found', 500);
		}

		const isVerified = await user.verifyPassword(password);

		if (!isVerified) {
			throwErr('password is not correct', 400);
		}

		const token = tokenGenerate(
			{
				id: user._id.toString(),
				name: user.name,
				email: user.email,
			},
			defaultValue.adminJwtExpiration
		);

		res.status(200).json({
			status: 'success',
			message: 'admin login successful',
			token: token,
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
		next(error);
	}
};

exports.getAdmin = async function (req, res, next) {
	try {
		res.status(200).json({
			status: 'success',
			message: 'get admin',
			data: req.user,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateAdmin = async function (req, res, next) {
	const { name, email, password } = req.body;
	try {
		// find email and throw error if email already exists
		const emailExist = await Admin.findOne({ email });
		if (emailExist) {
			throwErr('email already exists', 403);
		}
		// update the user info
		if (name || email || password) {
			const user = await Admin.findById(req.user._id);
			if (name) {
				user.name = name;
			}
			if (email) {
				user.email = email;
			}
			if (password) {
				user.password = password;
			}
			user.save();
		} else {
			throwErr('provided atlas, one field value', 200);
		}
		// send back to the response object.
		res.status(202).json({
			status: 'success',
			message: 'update successful',
		});
	} catch (error) {
		next(error);
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
