const { throwErr } = require('../../middlewares/errorHandler');
const { ClassLevel } = require('../../module/academic/classLevel');
const { Admin } = require('../../module/staff/admin');

exports.createClassLevel = async function (req, res, next) {
	const { name, description } = req.body;
	const createdBy = req.user._id;
	try {
		// check all input fields values are valid
		if (!(name && description && createdBy)) {
			throwErr('input fields must be required', 400);
		}
		// if academic term is already exist
		const alreadyExist = await ClassLevel.findOne({ name });
		if (alreadyExist) {
			throwErr('academic term already exists', 403);
		}
		// create academic term object
		const createdClassLevel = await ClassLevel.create({
			name,
			description,
			createdBy,
		});

		// add academic term object id into to admin object
		if (createdClassLevel) {
			const user = await Admin.findById(createdBy);
			user.classLevels.push(createdClassLevel);
			user.save();
		}

		// send response
		res.json({
			status: 'success',
			message: 'create successfully academic term',
			data: createdClassLevel,
		});
	} catch (error) {
		next(error);
	}
};

exports.getClassLevels = async function (req, res, next) {
	res.json({
		status: 'success',
		message: 'fetch successfully academic term data',
		data: req.data,
		pagination: req.pagination,
	});
};

exports.getClassLevel = async function (req, res, next) {
	const classLevelId = req.params.id;
	try {
		const classLevelData = await ClassLevel.findById(classLevelId);
		if (!classLevelData) {
			throwErr('class level id not valid', 400);
		}
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully academic term data',
			data: classLevelData,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateClassLevel = async function (req, res, next) {
	const classLevelId = req.params.id;
	const { name, description, duration } = req.body;
	try {
		const existClassLevel = await ClassLevel.findById(classLevelId);
		// provided valid academic term id
		if (!existClassLevel) {
			throwErr('provided valid academic term id', 403);
		}
		// if any one filed data aren't exist
		if (name || description || duration) {
			if (name) {
				existClassLevel.name = name;
			}
			if (description) {
				existClassLevel.description = description;
			}
			if (duration) {
				existClassLevel.duration = duration;
			}
			existClassLevel.save();
		} else {
			throwErr('provided only one field data', 403);
		}

		// send response
		res.json({
			status: 'success',
			message: 'update successfully academic term data',
			data: existClassLevel,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteClassLevel = async function (req, res, next) {
	const classLevelId = req.params.id;
	const userId = req.user._id;
	try {
		const classLevelData = await ClassLevel.findByIdAndDelete(classLevelId);

		if (classLevelData) {
			await Admin.findByIdAndUpdate(userId, {
				$pull: { classLevels: classLevelId },
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
