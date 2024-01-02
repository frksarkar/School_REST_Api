const { throwErr } = require('../../middlewares/errorHandler');
const { AcademicYear } = require('../../module/academic/academicYear');

exports.createAcademicYear = async function (req, res, next) {
	const { name, fromYear, toYear } = req.body;
	const createdBy = req.user._id;
	try {
		// check all input fields values are valid
		if (!(name && fromYear && toYear && createdBy)) {
			throwErr('input fields must be required', 400);
		}
		// if academic year is already exist
		const alreadyExist = await AcademicYear.findOne({ name });
		if (alreadyExist) {
			throwErr('academic year already exists', 403);
		}
		// create academic year object
		const createdAcademicYear = await AcademicYear.create({
			name,
			fromYear,
			toYear,
			createdBy,
		});
		// send response
		res.json({
			status: 'success',
			message: 'create successfully academic year',
			data: createdAcademicYear,
		});
	} catch (error) {
		next(error);
	}
};

exports.getAcademicYears = async function (req, res, next) {
	try {
		const academicData = await AcademicYear.find();
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully academic year data',
			data: academicData,
		});
	} catch (error) {
		next(error);
	}
};

exports.getAcademicYear = async function (req, res, next) {
	const academicYearId = req.params.id;
	try {
		const academicData = await AcademicYear.findById(academicYearId);
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully academic year data',
			data: academicData,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateAcademicYear = async function (req, res, next) {
	const academicYearId = req.params.id;
	const { name, fromYear, toYear } = req.body;
	try {
		const existAcademicYear = await AcademicYear.findById(academicYearId);
		// if any one filed data aren't exist
		if (name || fromYear || toYear) {
			if (name) {
				existAcademicYear.name = name;
			}
			if (fromYear) {
				existAcademicYear.fromYear = fromYear;
			}
			if (toYear) {
				existAcademicYear.toYear = toYear;
			}
			existAcademicYear.save();
		} else {
			throwErr('provided only one field data', 403);
		}
		// provided valid academic year id
		if (!existAcademicYear) {
			throwErr('provided valid academic year id', 403);
		}

		// send response
		res.json({
			status: 'success',
			message: 'update successfully academic year data',
			data: existAcademicYear,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteAcademicYear = async function (req, res, next) {
	const academicYearId = req.params.id;
	try {
		const academicData = await AcademicYear.deleteOne(academicYearId);
		// send response
		res.json({
			status: 'success',
			message: 'deleted successfully academic year data',
			data: academicData,
		});
        
	} catch (error) {
		next(error);
	}
};
