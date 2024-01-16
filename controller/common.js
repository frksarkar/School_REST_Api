const { pagination } = require('../utils/pagination');

exports.getAllData = function (Model) {
	return async (req, res, next) => {
		try {
			const totalTeacher = await Model.countDocuments();
			const page = pagination(
				req.query.page,
				req.query.limit,
				totalTeacher
			);
			const data = await Model.find()
				.limit(page.limitContain)
				.skip(page.skipContain)
				.select('-password');

			req.pagination = page.pagination;
			req.data = data;
			next();
		} catch (error) {
			next(error);
		}
	};
};
