exports.defaultValue = {
	jwtSecret: 'LMSjwtPrivateKey',
	adminJwtExpiration: '1d',
	teacherJwtExpiration: '1d',
	studentJwtExpiration: '1d',
	PORT: 3000,
	TestDatabase: 'demo link',
};

exports.defaultAppValue = {
	programDuration: '4 years',
	academicTermDuration: '3 months',
	subjectDuration: '3 months',
	examDuration: '30 minutes',
	examResultEnumVal: ['Excellent', 'Very Good', 'Good', 'Poor'],
	examStatusEnumVal: ['fail', 'pass'],
	teacherApplicationStatusEnumVal: ['pending', 'approved', 'rejected'],
	passMark: 33,
};
