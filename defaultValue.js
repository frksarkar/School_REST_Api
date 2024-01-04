exports.defaultValue = {
	jwtSecret: 'LMSjwtPrivateKey',
	jwtExpiration: '1d',
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
