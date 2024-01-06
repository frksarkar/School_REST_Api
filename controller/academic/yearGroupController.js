const { throwErr } = require('../../middlewares/errorHandler');
const { YearGroup } = require('../../module/academic/yearGroup');
const { Admin } = require('../../module/staff/admin');

exports.createYearGroup = async function (req, res, next) {
	const { name, academicYear } = req.body;
	const createdBy = req.user._id;
	try {
		// check all input fields values are valid
		if (!(name && academicYear && createdBy)) {
			throwErr('input fields must be required', 400);
		}
		// if year group is already exist
		const alreadyExist = await YearGroup.findOne({ name });
		if (alreadyExist) {
			throwErr('Year Group/Graduation already exists', 403);
		}
		// create year group object
		const createdYearGroup = await YearGroup.create({
			name,
			academicYear,
			createdBy,
		});

		// add year group object id into to admin object
		if (createdYearGroup) {
			const user = await Admin.findById(createdBy);
			user.yearGroups.push(createdYearGroup);
			user.save();
		}

		// send response
		res.json({
			status: 'success',
			message: 'create successfully year group',
			data: createdYearGroup,
		});
	} catch (error) {
		next(error);
	}
};

exports.getYearGroups = async function (req, res, next) {
	try {
		const yearGroupsData = await YearGroup.find();
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully year group data',
			data: yearGroupsData,
		});
	} catch (error) {
		next(error);
	}
};

exports.getYearGroup = async function (req, res, next) {
	const yearGroupId = req.params.id;
	try {
		const yearGroupData = await YearGroup.findById(yearGroupId);
		if (!yearGroupData) {
			throwErr('year group id not valid', 400);
		}
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully year group data',
			data: yearGroupData,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateYearGroup = async function (req, res, next) {
	const yearGroupId = req.params.id;
	const { name, academicYear, duration } = req.body;
	try {
		const existYearGroup = await YearGroup.findById(yearGroupId);
		// provided valid yearGroup id
		if (!existYearGroup) {
			throwErr('provided valid year group id', 403);
		}
		// if any one filed data aren't exist
		if (name || academicYear) {
			if (name) {
				existYearGroup.name = name;
			}
			if (academicYear) {
				existYearGroup.academicYear = academicYear;
			}

			existYearGroup.save();
		} else {
			throwErr('provided only one field data', 403);
		}

		// send response
		res.json({
			status: 'success',
			message: 'update successfully year group data',
			data: existYearGroup,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteYearGroup = async function (req, res, next) {
	const yearGroupId = req.params.id;
	const userId = req.user._id;
	try {
		const userData = await YearGroup.findByIdAndDelete(yearGroupId);

		if (!userData) {
			throwErr('user id not found', 400);
		} else {
			await Admin.findByIdAndUpdate(userId, {
				$pull: { yearGroups: yearGroupId },
			});
		}

		// send response
		res.json({
			status: 'success',
			message: 'deleted successfully year group data',
		});
	} catch (error) {
		next(error);
	}
};
