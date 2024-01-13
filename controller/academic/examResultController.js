const { throwErr } = require('../../middlewares/errorHandler');
const { Exam } = require('../../module/academic/exam');

exports.adminToggleExamResult = async function (req, res, next) {
	const examId = req.params.examId;
	try {
		const examPaper = await Exam.findById(examId);

		if (!examPaper) {
			throwErr("can't find exam data", 500);
		}

		examPaper.resultPublished = true;
		examPaper.save();

		res.status(200).json({
			status: 'success',
			data: examPaper,
		});
	} catch (error) {}
};
