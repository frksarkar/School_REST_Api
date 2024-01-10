const { defaultValue } = require('../../defaultValue');
const { throwErr } = require('../../middlewares/errorHandler');
const { Student } = require('../../module/academic/student');
const { Admin } = require('../../module/staff/admin');
const { tokenGenerate } = require('../../utils/helper');

exports.studentLogin = async function (req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await Student.findOne({ email });
		if (!user) {
			throwErr('student not found', 404);
		}
		if (user.isWithdraw) {
			throwErr("can't access, student is withdrawn", 403);
		}
		if (user.isSuspended) {
			throwErr("can't access, student is suspended", 403);
		}

		const isVerified = await user.verifyPassword(password);

		if (!isVerified) {
			throwErr('password not correct', 403);
		}

		const token = tokenGenerate(
			{
				id: user._id.toString(),
				name: user.name,
				email: user.email,
			},
			defaultValue.studentJwtExpiration
		);

		res.status(200).json({
			status: 'success',
			message: 'student login successful',
			data: token,
		});
	} catch (error) {
		next(error);
	}
};

exports.getStudentProfile = async function (req, res, next) {
	try {
		const student = {
			id: req.user._id,
			name: req.user.name,
			email: req.user.email,
			classLevels: req.user.classLevels,
			examResults: req.user.examResults,
			studentId: req.user.studentId,
		};
		if (req.user.isWithdraw) {
			throwErr("can't access, student is withdrawn", 403);
		}
		if (req.user.isSuspended) {
			throwErr("can't access, student is suspended", 403);
		}
		res.status(200).json({
			status: 'success',
			message: 'get student',
			data: student,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateStudentProfile = async function (req, res, next) {
	const { email, password } = req.body;
	try {
		const student = req.user;
		// can't access student object if student is withdrawn and suspended
		if (student.isWithdraw) {
			throwErr("can't access, student is withdrawn", 403);
		}
		if (student.isSuspended) {
			throwErr("can't access, student is suspended", 403);
		}

		// email already exists then throw error
		if (email) {
			const emailExist = await Student.findOne({ email });
			if (emailExist) {
				throwErr('email already exists', 403);
			}
		}

		// update the user info
		if (email || password) {
			if (email) {
				student.email = email;
			}
			if (password) {
				student.password = password;
			}
		} else {
			throwErr(
				'provided at least, one field value name, email or password',
				200
			);
		}
		student.save();
		// send back to the response object.
		res.status(202).json({
			status: 'success',
			message: 'update successful',
		});
	} catch (error) {
		next(error);
	}
};

exports.adminRegisterStudent = async function (req, res, next) {
	const { name, email, password } = req.body;
	const createdBy = req.user;

	try {
		// if input data is empty
		if (!(name && email && password)) {
			throwErr('all inputs must be valid', 400);
		}
		// account already exists
		const isExist = await Student.findOne({ email });
		if (isExist) {
			throwErr('account already exists', 400);
		}

		const user = await Student.create({ name, email, password });

		// student object are created then updated the admin data who created the student object
		if (user) {
			createdBy.students.push(user);
			createdBy.save();
		}

		res.status(201).json({
			status: ' register successful',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

exports.AdminGetStudents = async function (req, res, next) {
	try {
		const users = await Student.find().select('-password');
		res.status(200).json({
			status: 'success',
			message: 'fetch all students data',
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

exports.AdminGetStudent = async function (req, res, next) {
	const studentId = req.params.studentId;
	try {
		const student = await Student.findById(studentId).select('-password');
		if (!student) {
			throwErr('student not found');
		}
		res.status(200).json({
			status: 'success',
			message: 'get student',
			data: student,
		});
	} catch (error) {
		next(error);
	}
};

exports.adminUpdateStudent = async function (req, res, next) {
	const {
		name,
		email,
		password,
		classLevels,
		examResults,
		isWithdraw,
		isSuspended,
	} = req.body;

	const studentId = req.params.studentId;

	try {
		// find email and throw error if email already exists
		const studentObj = await Student.findById(studentId);

		// change student access permeation
		if (
			typeof isWithdraw === 'boolean' ||
			typeof isSuspended === 'boolean'
		) {
			if (typeof isWithdraw === 'boolean') {
				studentObj.isWithdraw = isWithdraw;
			}
			if (typeof isSuspended === 'boolean') {
				studentObj.isSuspended = isSuspended;
			}
			studentObj.save();
			// send back to the response object.
			res.status(202).json({
				status: 'success',
				message: 'update successful',
			});
			return;
		}

		// can't access student object if student is withdrawn and suspended
		if (studentObj.isWithdraw) {
			throwErr("can't access, student is withdrawn", 403);
		}
		if (studentObj.isSuspended) {
			throwErr("can't access, student is suspended", 403);
		}

		// email already exists then throw error
		if (email) {
			const emailExist = await Student.findOne({ email });
			if (emailExist) {
				throwErr('email already exists', 403);
			}
		}

		// update the user info
		if (name || email || password || classLevels || examResults) {
			const updateData = await Student.findOneAndUpdate(
				{ _id: studentId },
				{
					$set: { name, email, password },
					$addToSet: { classLevels, examResults },
				},
				{ new: true }
			);
			if (updateData) {
				throwErr('update failed', 500);
			}
		} else {
			throwErr(
				'provided at least, one field value name, email or password',
				200
			);
		}
		res.status(202).json({
			status: 'success',
			message: 'update successful',
		});
	} catch (error) {
		next(error);
	}
};

exports.adminDeleteStudent = async function (req, res, next) {
	const userId = req.user._id;
	const studentId = req.params.studentId;
	try {
		const studentData = await Student.findByIdAndDelete(studentId);
		if (!studentData) {
			throwErr('provide valid student id', 400);
		}
		await Admin.findByIdAndUpdate(userId, {
			$pull: { students: studentId },
		});
		res.status(200).json({
			status: 'success',
			message: 'delete student successful',
		});
	} catch (error) {
		next(error);
	}
};

exports.adminSuspendStudent = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'suspended student successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminUnSuspendStudent = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'unSuspended student successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminWithdrawnStudent = function (req, res, next) {
	try {
		res.status(200).json({
			message: 'withdrawn successfully',
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.adminUnWithdrawnStudent = function (req, res, next) {
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