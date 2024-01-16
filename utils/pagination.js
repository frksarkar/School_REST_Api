exports.pagination = function (curPage, limit, totalSize) {
	const page = parseInt(curPage) || 1;
	const limitContain = parseInt(limit) || 5;
	const pagination = {};

	const skipContain = (page - 1) * limitContain;
	const totalPage = Math.ceil(totalSize / limitContain);
	if (page < totalPage) {
		pagination.nextPage = page + 1;
	}
	if (page - 1 > 0) {
		pagination.privPage = page - 1;
	}
	pagination.totalPage = totalPage;
	pagination.limit = limitContain;
	pagination.totalDocuments = totalSize;
	return { pagination, skipContain, limitContain };
};
