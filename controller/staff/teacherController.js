const { defaultValue } = require('../../defaultValue');
const { throwErr } = require('../../middlewares/errorHandler');
const { Admin } = require('../../module/staff/admin');
const { Teacher } = require('../../module/staff/teacher');
const { tokenGenerate } = require('../../utils/helper');

exports.teacherRegister = async function (req, res, next) {
	const { name, email, password } = req.body;
	const createdBy = req.user._id;

	try {
		// if input data is empty
		if (!(name && email && password)) {
			throwErr('all inputs must be valid', 400);
		}
		// account already exists
		const isExist = await Teacher.findOne({ email });
		if (isExist) {
			throwErr('account already exists', 400);
		}

		const user = await Teacher.create({ name, email, password, createdBy });

		// teacher object are created then updated the admin data who created the teacher object
		if (user) {
			const admin = await Admin.findById(createdBy);
			admin.teachers.push(user);
			admin.save();
		}

		res.status(201).json({
			status: ' register successful',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

exports.teacherLogin = async function (req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await Teacher.findOne({ email });
		if (!user) {
			throwErr('teacher not found', 404);
		}
		const isVerified = await user.verifyPassword(password);

		if (!isVerified) {
			res.json({ status: 'password not correct' });
			return;
		}

		const token = tokenGenerate(
			{
				id: user._id.toString(),
				name: user.name,
				email: user.email,
			},
			defaultValue.teacherJwtExpiration
		);

		res.status(200).json({
			status: 'success',
			message: 'teacher login successful',
			data: token,
		});
	} catch (error) {
		next(error);
	}
};

exports.getTeachers = async function (req, res, next) {
	try {
		const users = await Teacher.find().select('-password');
		res.status(200).json({
			status: 'success',
			message: 'fetch all teachers data',
			data: users,
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.getTeacher = async function (req, res, next) {
	try {
		res.status(200).json({
			status: 'success',
			message: 'get teacher',
			data: req.user,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateTeacher = async function (req, res, next) {
	const { name, email, password } = req.body;
	try {
		// find email and throw error if email already exists
		const emailExist = await Teacher.findOne({ email });
		if (emailExist) {
			throwErr('email already exists', 403);
		}
		// update the user info
		if (name || email || password) {
			const user = await Teacher.findById(req.user._id);
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

exports.deleteTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'delete teacher successful',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.teacherSuspendTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'suspended teacher successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.teacherUnSuspendTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'unSuspended teacher successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.teacherWithdrawnTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'withdrawn successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.teacherUnWithdrawnTeacher = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'unWithdrawn successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.teacherPublishExam = function (req, res, next) {
	try {
		res.status(200).json({
			status: 'success',
			data: 'Exam Publish successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.teacherUnPublishExam = function (req, res, next) {
	try {
		res.status(200).json({
			status: 'success',
			data: 'Exam UnPublish successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};
