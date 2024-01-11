const { throwErr } = require('../../middlewares/errorHandler');
const { Exam } = require('../../module/academic/exam');
const { Program } = require('../../module/academic/program');
const { Question } = require('../../module/academic/question');

exports.createQuestion = async function (req, res, next) {
	const { question, optionA, optionB, optionC, optionD, correctAnswer } =
		req.body;
	const examId = req.params.examId;
	const createdBy = req.user._id;
	try {
		// check all input fields values are valid
		if (
			!(
				question &&
				optionA &&
				optionB &&
				optionC &&
				optionD &&
				correctAnswer
			)
		) {
			throwErr('all input fields must be required', 400);
		}

		// if question is already exist
		const alreadyExist = await Question.findOne({ question });
		if (alreadyExist) {
			throwErr('question already exists', 403);
		}
		// if exam is not exist
		const isExamExist = await Exam.findById(examId);
		if (!isExamExist) {
			throwErr("exam don't exists, create the exam", 403);
		}
		// create question object
		const createdQuestion = await Question.create({
			question,
			optionA,
			optionB,
			optionC,
			optionD,
			correctAnswer,
			createdBy,
		});

		if (!createdQuestion) {
			throwErr('question cannot be created', 500);
		}
		// add question object id into to exam question object
		isExamExist.questions.push(createdQuestion);
		isExamExist.save();

		// send response
		res.json({
			status: 'success',
			message: 'create successfully question',
			data: createdQuestion,
		});
	} catch (error) {
		next(error);
	}
};

exports.getQuestions = async function (req, res, next) {
	try {
		const questionsData = await Question.find();
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully question data',
			data: questionsData,
		});
	} catch (error) {
		next(error);
	}
};

exports.getQuestion = async function (req, res, next) {
	const questionId = req.params.id;
	try {
		const questionData = await Question.findById(questionId);
		if (!questionData) {
			throwErr('question id not valid', 400);
		}
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully question data',
			data: questionData,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateQuestion = async function (req, res, next) {
	const { question, optionA, optionB, optionC, optionD, correctAnswer } =
		req.body;
	const questionId = req.params.id;
	try {
		const existQuestion = await Question.findById(questionId);
		// provided valid question id
		if (!existQuestion) {
			throwErr('provided valid question id', 403);
		}
		// if any one filed data aren't exist
		if (
			question ||
			optionA ||
			optionB ||
			optionC ||
			optionD ||
			correctAnswer
		) {
			if (question) {
				existQuestion.question = question;
			}
			if (optionA) {
				existQuestion.optionA = optionA;
			}
			if (optionB) {
				existQuestion.optionB = optionB;
			}
			if (optionC) {
				existQuestion.optionC = optionC;
			}
			if (optionD) {
				existQuestion.optionD = optionD;
			}
			if (correctAnswer) {
				existQuestion.correctAnswer = correctAnswer;
			}
			existQuestion.save();
		} else {
			throwErr('provided only one field data', 403);
		}

		// send response
		res.json({
			status: 'success',
			message: 'update successfully question data',
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteQuestion = async function (req, res, next) {
	const questionId = req.params.questionId;
	const examId = req.params.examId;
	try {
		const questionData = await Question.findByIdAndDelete(questionId);
		
		if (!questionData) {
			throwErr('provided valid question id', 403);
		}
		await Exam.findByIdAndUpdate(examId, {
			$pull: { questions: questionId },
		});
		// send response
		res.json({
			status: 'success',
			message: 'deleted successfully question data',
		});
	} catch (error) {
		next(error);
	}
};
