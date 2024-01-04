const { throwErr } = require('../../middlewares/errorHandler');
const { Program } = require('../../module/academic/program');
const { Admin } = require('../../module/staff/admin');

exports.createProgram = async function (req, res, next) {
	const { name, description } = req.body;
	const createdBy = req.user._id;
	try {
		// check all input fields values are valid
		if (!(name && description && createdBy)) {
			throwErr('input fields must be required', 400);
		}
		// if program is already exist
		const alreadyExist = await Program.findOne({ name });
		if (alreadyExist) {
			throwErr('program already exists', 403);
		}
		// create program object
		const createdProgram = await Program.create({
			name,
			description,
			createdBy,
		});

		// add program object id into to admin object
		if (createdProgram) {
			const user = await Admin.findById(createdBy);
			user.programs.push(createdProgram);
			user.save();
		}

		// send response
		res.json({
			status: 'success',
			message: 'create successfully program',
			data: createdProgram,
		});
	} catch (error) {
		next(error);
	}
};

exports.getPrograms = async function (req, res, next) {
	try {
		const programsData = await Program.find();
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully program data',
			data: programsData,
		});
	} catch (error) {
		next(error);
	}
};

exports.getProgram = async function (req, res, next) {
	const programId = req.params.id;
	try {
		const programData = await Program.findById(programId);
		if (!programData) {
			throwErr('program id not valid', 400);
		}
		// send response
		res.json({
			status: 'success',
			message: 'fetch successfully program data',
			data: programData,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateProgram = async function (req, res, next) {
	const programId = req.params.id;
	const { name, description, duration } = req.body;
	try {
		const existProgram = await Program.findById(programId);
		// provided valid program id
		if (!existProgram) {
			throwErr('provided valid program id', 403);
		}
		// if any one filed data aren't exist
		if (name || description || duration) {
			if (name) {
				existProgram.name = name;
			}
			if (description) {
				existProgram.description = description;
			}
			if (duration) {
				existProgram.duration = duration;
			}
			existProgram.save();
		} else {
			throwErr('provided only one field data', 403);
		}

		// send response
		res.json({
			status: 'success',
			message: 'update successfully program data',
			data: existProgram,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteProgram = async function (req, res, next) {
	const programId = req.params.id;
	const userId = req.user._id;
	try {
		const programData = await Program.findByIdAndDelete(programId);

		if (programData) {
			await Admin.findByIdAndUpdate(userId, {
				$pull: { programs: programId },
			});
		}

		// send response
		res.json({
			status: 'success',
			message: 'deleted successfully program data',
		});
	} catch (error) {
		next(error);
	}
};
