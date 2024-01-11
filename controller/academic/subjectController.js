const { throwErr } = require('../../middlewares/errorHandler');
const { Program } = require('../../module/academic/program');
const { Subject } = require('../../module/academic/subject');

exports.createSubject = async function (req, res, next) {
	const { name, description, academicTerm } = req.body;
	const programId = req.params.programId;
	const createdBy = req.user._id;
	try {
		// check all input fields values are valid
		if (!(name && description && academicTerm && programId && createdBy)) {
			throwErr('all input fields must be required', 400);
		}

		// if subject is already exist
		const alreadyExist = await Subject.findOne({ name });
		if (alreadyExist) {
			throwErr('subject already exists', 403);
		}

		// create subject object
		const createdSubject = await Subject.create({
			name,
			description,
			academicTerm,
			createdBy,
		});

		// add subject object id into to admin object
		if (createdSubject) {
			const programObj = await Program.findById(programId);
			if (!programObj) throwErr("can't find program", 500);
			programObj.subjects.push(createdSubject);
			programObj.save();
		}

		// send response
		res.json({
			status: 'success',
			message: 'create successfully subject',
			data: createdSubject,
		});
	} catch (error) {
		next(error);
	}
};

exports.getSubjects = async function (req, res, next) {
	try {
		const subjectsData = await Subject.find();
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully subject data',
			data: subjectsData,
		});
	} catch (error) {
		next(error);
	}
};

exports.getSubject = async function (req, res, next) {
	const subjectId = req.params.id;
	try {
		const subjectData = await Subject.findById(subjectId);
		if (!subjectData) {
			throwErr('subject id not valid', 400);
		}
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully subject data',
			data: subjectData,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateSubject = async function (req, res, next) {
	const { name, description, academicTerm } = req.body;
	const subjectId = req.params.id;
	try {
		const existSubject = await Subject.findById(subjectId);
		// provided valid subject id
		if (!existSubject) {
			throwErr('provided valid subject id', 403);
		}
		// if any one filed data aren't exist
		if (name || description || academicTerm) {
			if (name) {
				existSubject.name = name;
			}
			if (description) {
				existSubject.description = description;
			}
			if (academicTerm) {
				existSubject.academicTerm = academicTerm;
			}
			existSubject.save();
		} else {
			throwErr('provided only one field data', 403);
		}

		// send response
		res.json({
			status: 'success',
			message: 'update successfully subject data',
			data: existSubject,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteSubject = async function (req, res, next) {
	const subjectId = req.params.id;
	const programId = req.params.programId;
	try {
		const subjectData = await Subject.findByIdAndDelete(subjectId);

		if (subjectData) {
			await Program.findByIdAndUpdate(programId, {
				$pull: { subjects: subjectId },
			});
		}

		// send response
		res.json({
			status: 'success',
			message: 'deleted successfully subject data',
		});
	} catch (error) {
		next(error);
	}
};
