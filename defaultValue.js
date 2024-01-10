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
	examResultEnumVal: ['Excellent', 'Good', 'Poor'],
	examStatusEnumVal: ['failed', 'passed'],
	teacherApplicationStatusEnumVal: ['pending', 'approved', 'rejected'],
};
