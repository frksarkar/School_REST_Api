const { throwErr } = require('../../middlewares/errorHandler');
const { AcademicTerm } = require('../../module/academic/academicTerm');

const { Admin } = require('../../module/staff/admin');

exports.createAcademicTerm = async function (req, res, next) {
	const { name, description, duration } = req.body;
	const createdBy = req.user._id;
	try {
		// check all input fields values are valid
		if (!(name && description && duration && createdBy)) {
			throwErr('input fields must be required', 400);
		}
		// if academic term is already exist
		const alreadyExist = await AcademicTerm.findOne({ name });
		if (alreadyExist) {
			throwErr('academic term already exists', 403);
		}
		// create academic term object
		const createdAcademicTerm = await AcademicTerm.create({
			name,
			description,
			duration,
			createdBy,
		});

		// add academic term object id into to admin object
		if (createdAcademicTerm) {
			const user = await Admin.findById(createdBy);
			user.academicTerms.push(createdAcademicTerm);
			user.save();
		}

		// send response
		res.json({
			status: 'success',
			message: 'create successfully academic term',
			data: createdAcademicTerm,
		});
	} catch (error) {
		next(error);
	}
};

exports.getAcademicTerms = async function (req, res, next) {
	try {
		const academicData = await AcademicTerm.find();
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully academic term data',
			data: academicData,
		});
	} catch (error) {
		next(error);
	}
};

exports.getAcademicTerm = async function (req, res, next) {
	const academicTermId = req.params.id;
	try {
		const academicData = await AcademicTerm.findById(academicTermId);
		if (!academicData) {
			throwErr('user id not valid', 400);
		}
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully academic term data',
			data: academicData,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateAcademicTerm = async function (req, res, next) {
	const academicTermId = req.params.id;
	const { name, description, duration } = req.body;
	try {
		const existAcademicTerm = await AcademicTerm.findById(academicTermId);
		// provided valid academic term id
		if (!existAcademicTerm) {
			throwErr('provided valid academic term id', 403);
		}
		// if any one filed data aren't exist
		if (name || description || duration) {
			if (name) {
				existAcademicTerm.name = name;
			}
			if (description) {
				existAcademicTerm.description = description;
			}
			if (duration) {
				existAcademicTerm.duration = duration;
			}
			existAcademicTerm.save();
		} else {
			throwErr('provided only one field data', 403);
		}

		// send response
		res.json({
			status: 'success',
			message: 'update successfully academic term data',
			data: existAcademicTerm,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteAcademicTerm = async function (req, res, next) {
	const academicTermId = req.params.id;
	const userId = req.user._id;
	try {
		const academicData = await AcademicTerm.findByIdAndDelete(
			academicTermId
		);

		if (academicData) {
			await Admin.findByIdAndUpdate(userId, {
				$pull: { academicTerms: academicTermId },
			});
		}

		// send response
		res.json({
			status: 'success',
			message: 'deleted successfully academic term data',
		});
	} catch (error) {
		next(error);
	}
};
