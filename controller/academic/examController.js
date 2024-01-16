const { throwErr } = require('../../middlewares/errorHandler');
const { Exam } = require('../../module/academic/exam');
const { Teacher } = require('../../module/staff/teacher');

exports.createExam = async function (req, res, next) {
	const {
		name,
		description,
		subject,
		program,
		classLevel,
		academicYear,
		academicTerm,
		duration,
		examDate,
		examTime,
		examType,
		examStatus,
		passMark,
		totalMark,
	} = req.body;
	const createdBy = req.user._id;
	try {
		// check all input fields values are valid
		if (
			!(
				name &&
				description &&
				subject &&
				program &&
				examDate &&
				examTime &&
				classLevel
			)
		) {
			throwErr(
				"input fields must be required ' name, description, subject, program, classLevel, academicYear, academicTerm, examDate, examTime'",
				400
			);
		}
		// if exam is already exist
		const alreadyExist = await Exam.findOne({ name, examDate });
		if (alreadyExist) {
			throwErr('exam already exists', 403);
		}
		// create exam object
		const createdExam = await Exam.create({
			name,
			description,
			subject,
			program,
			classLevel,
			academicYear,
			academicTerm,
			duration,
			examDate,
			examTime,
			examType,
			examStatus,
			passMark,
			totalMark,
			createdBy,
		});

		// add exam object id into to admin object
		if (createdExam) {
			req.user.examsCreated?.push(createdExam);
			req.user.save();
		}

		// send response
		res.json({
			status: 'success',
			message: 'exam create successfully',
			data: createdExam,
		});
	} catch (error) {
		next(error);
	}
};

exports.getExams = async function (req, res, next) {
	res.json({
		status: 'success',
		message: 'fetch successfully exam data',
		data: req.data,
		pagination: req.pagination,
	});
};

exports.getExam = async function (req, res, next) {
	const examId = req.params.id;
	try {
		const examData = await Exam.findById(examId);
		if (!examData) {
			throwErr('exam id not valid', 400);
		}
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully exam data',
			data: examData,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateExam = async function (req, res, next) {
	const examId = req.params.id;
	const {
		name,
		description,
		subject,
		program,
		classLevel,
		academicYear,
		academicTerm,
		duration,
		examDate,
		examTime,
		examType,
		examStatus,
		passMark,
		totalMark,
	} = req.body;
	try {
		const existExam = await Exam.findById(examId);
		// provided valid exam id
		if (!existExam) {
			throwErr('provided valid exam id', 403);
		}
		// if any one filed data aren't exist
		if (
			name ||
			description ||
			subject ||
			program ||
			examDate ||
			examTime ||
			classLevel ||
			academicYear ||
			academicTerm ||
			duration ||
			examType ||
			examStatus ||
			passMark ||
			totalMark
		) {
			if (name) {
				existExam.name = name;
			}
			if (description) {
				existExam.description = description;
			}
			if (subject) {
				existExam.subject = subject;
			}
			if (program) {
				existExam.program = program;
			}
			if (examDate) {
				existExam.examDate = examDate;
			}
			if (examTime) {
				existExam.examTime = examTime;
			}
			if (classLevel) {
				existExam.classLevel = classLevel;
			}
			if (academicYear) {
				existExam.academicYear = academicYear;
			}
			if (academicTerm) {
				existExam.academicTerm = academicTerm;
			}
			if (duration) {
				existExam.duration = duration;
			}
			if (examType) {
				existExam.examType = examType;
			}
			if (examStatus) {
				existExam.examStatus = examStatus;
			}
			if (passMark) {
				existExam.passMark = passMark;
			}
			if (totalMark) {
				existExam.totalMark = totalMark;
			}
			existExam.save();
		} else {
			throwErr('provided only one field data', 403);
		}

		// send response
		res.json({
			status: 'success',
			message: 'update successfully exam data',
			data: existExam,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteExam = async function (req, res, next) {
	const examId = req.params.id;
	const userId = req.user._id;
	try {
		const examData = await Exam.findByIdAndDelete(examId);

		if (!examData) {
			throwErr('exam id not found', 400);
		} else {
			await Teacher.findByIdAndUpdate(userId, {
				$pull: { examsCreated: examId },
			});
		}

		// send response
		res.json({
			status: 'success',
			message: 'deleted successfully exam data',
		});
	} catch (error) {
		next(error);
	}
};

exports.adminChangeExamStatus = async function (req, res, next) {
	const examId = req.params.examId;
	const { examStatus } = req.body;
	try {
		const exam = await Exam.findById(examId);

		if (!exam) {
			throwErr('provided valid exam id', 400);
		}

		if (!examStatus) {
			throwErr('fill the input', 400);
		}

		// change the exam status
		const updateExam = await Exam.findByIdAndUpdate(
			examId,
			{
				examStatus,
			},
			{ new: true }
		);

		res.json({
			status: 'success',
			message: 'exam status successfully update',
			data: updateExam,
		});
	} catch (error) {
		next(error);
	}
};
