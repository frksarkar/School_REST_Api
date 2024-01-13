const express = require('express');

const {
	adminRegisterStudent,
	studentLogin,
	AdminGetStudents,
	AdminGetStudent,
	adminUpdateStudent,
	adminDeleteStudent,
	studentSuspendStudent,
	studentUnSuspendStudent,
	studentWithdrawnStudent,
	studentUnWithdrawnStudent,
	studentPublishExam,
	studentUnPublishExam,
	getStudentProfile,
	updateStudentProfile,
	studentWriteExam,
	studentGetExamResult,
} = require('../../controller/staff/studentController');
const {
	isLoggedIn,
	isAdmin,
	isLoginStudent,
	isStudent,
} = require('../../middlewares/authHandler');

const studentRouter = express.Router();

// login student
studentRouter.post('/login', studentLogin);

studentRouter.get('/profile', isLoginStudent, isStudent, getStudentProfile); // get single student

studentRouter.get(
	'/result/:examId',
	isLoginStudent,
	isStudent,
	studentGetExamResult
);

studentRouter.put(
	'/update/profile',
	isLoginStudent,
	isStudent,
	updateStudentProfile
);

studentRouter.post(
	'/exam/:examId',
	isLoginStudent,
	isStudent,
	studentWriteExam
);

// admin can access the routes
studentRouter
	.use(isLoggedIn, isAdmin)
	.get('/', AdminGetStudents) // get all students
	.get('/admin/:studentId', AdminGetStudent) // get a student
	.put('/admin/:studentId', adminUpdateStudent) // update student
	.post('/admin/register', adminRegisterStudent) // student register
	.delete('/admin/:studentId', adminDeleteStudent); // delete single student

// // student suspend student
// studentRouter.put('/suspend/student/:id', studentSuspendStudent);

// // student unsuspend student
// studentRouter.put('/unsuspend/student/:id', studentUnSuspendStudent);

// // student withdrawn student
// studentRouter.put('/withdrawn/student/:id', studentWithdrawnStudent);

// // student unWithdrawn student
// studentRouter.put('/unwithdrawn/student/:id', studentUnWithdrawnStudent);

// // student publish exams
// studentRouter.put('/publish/exam/:id', studentPublishExam);

// // student unpublish exams
// studentRouter.put('/unpublish/exam/:id', studentUnPublishExam);

exports.studentRouter = studentRouter;
