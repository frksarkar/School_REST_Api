const { defaultValue } = require('../../defaultValue');
const { throwErr } = require('../../middlewares/errorHandler');
const { Admin } = require('../../module/staff/admin');
const { Teacher } = require('../../module/staff/teacher');
const { tokenGenerate } = require('../../utils/helper');

exports.teacherLogin = async function (req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await Teacher.findOne({ email });
		if (!user) {
			throwErr('teacher not found', 404);
		} else {
			if (user.isWithdraw) {
				throwErr("can't access, teacher is withdrawn", 403);
			}
			if (user.isSuspended) {
				throwErr("can't access, teacher is suspended", 403);
			}
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

exports.getTeacherProfile = async function (req, res, next) {
	try {
		const teacher = {
			id: req.user._id,
			name: req.user.name,
			email: req.user.email,
			applicationStatus: req.user.applicationStatus,
			examsCreated: req.user.examsCreated,
			teacherId: req.user.teacherId,
		};
		if (req.user.isWithdraw) {
			throwErr("can't access, teacher is withdrawn", 403);
		}
		if (req.user.isSuspended) {
			throwErr("can't access, teacher is suspended", 403);
		}
		res.status(200).json({
			status: 'success',
			message: 'get teacher',
			data: teacher,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateTeacherProfile = async function (req, res, next) {
	const { name, email, password } = req.body;
	try {
		const teacher = req.user;
		// can't access teacher object if teacher is withdrawn and suspended
		if (teacher.isWithdraw) {
			throwErr("can't access, teacher is withdrawn", 403);
		}
		if (teacher.isSuspended) {
			throwErr("can't access, teacher is suspended", 403);
		}

		// email already exists then throw error
		if (email) {
			const emailExist = await Teacher.findOne({ email });
			if (emailExist) {
				throwErr('email already exists', 403);
			}
		}

		// update the user info
		if (name || email || password) {
			if (name) {
				teacher.name = name;
			}
			if (email) {
				teacher.email = email;
			}
			if (password) {
				teacher.password = password;
			}
		} else {
			throwErr(
				'provided at least, one field value name, email or password',
				200
			);
		}
		teacher.save();
		// send back to the response object.
		res.status(202).json({
			status: 'success',
			message: 'update successful',
		});
	} catch (error) {
		next(error);
	}
};

exports.adminTeacherRegister = async function (req, res, next) {
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

exports.AdminGetTeachers = async function (req, res, next) {
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

exports.AdminGetTeacher = async function (req, res, next) {
	const teacherId = req.params.teacherId;
	try {
		const teacher = await Teacher.findById(teacherId).select('-password');
		if (!teacher) {
			throwErr('teacher not found');
		}
		res.status(200).json({
			status: 'success',
			message: 'get teacher',
			data: teacher,
		});
	} catch (error) {
		next(error);
	}
};

exports.adminUpdateTeacher = async function (req, res, next) {
	const {
		name,
		email,
		password,
		isWithdraw,
		isSuspended,
		applicationStatus,
	} = req.body;

	const teacherId = req.params.teacherId;

	function response(teacherObj) {
		teacherObj.save();
		// send back to the response object.
		res.status(202).json({
			status: 'success',
			message: 'update successful',
		});
	}

	try {
		// find email and throw error if email already exists
		const teacherObj = await Teacher.findById(teacherId);

		// change teacher access permeation
		if (
			typeof isWithdraw === 'boolean' ||
			typeof isSuspended === 'boolean' ||
			applicationStatus
		) {
			if (typeof isWithdraw === 'boolean') {
				teacherObj.isWithdraw = isWithdraw;
			}
			if (typeof isSuspended === 'boolean') {
				teacherObj.isSuspended = isSuspended;
			}
			if (applicationStatus) {
				teacherObj.applicationStatus = applicationStatus;
			}
			response(teacherObj);
			return;
		}

		// can't access teacher object if teacher is withdrawn and suspended
		if (teacherObj.isWithdraw) {
			throwErr("can't access, teacher is withdrawn", 403);
		}
		if (teacherObj.isSuspended) {
			throwErr("can't access, teacher is suspended", 403);
		}

		// email already exists then throw error
		if (email) {
			const emailExist = await Teacher.findOne({ email });
			if (emailExist) {
				throwErr('email already exists', 403);
			}
		}

		// update the user info
		if (name || email || password) {
			if (name) {
				teacherObj.name = name;
			}
			if (email) {
				teacherObj.email = email;
			}
			if (password) {
				teacherObj.password = password;
			}
			response(teacherObj);
			return;
		} else {
			throwErr(
				'provided at least, one field value name, email or password',
				200
			);
		}
	} catch (error) {
		next(error);
	}
};

exports.adminDeleteTeacher = async function (req, res, next) {
	const userId = req.user._id;
	const teacherId = req.params.teacherId;
	try {
		const teacherData = await Teacher.findByIdAndDelete(teacherId);
		if (!teacherData) {
			throwErr('provide valid teacher id', 400);
		}
		await Admin.findByIdAndUpdate(userId, {
			$pull: { teachers: teacherId },
		});
		res.status(200).json({
			status: 'success',
			message: 'delete teacher successful',
		});
	} catch (error) {
		next(error);
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
