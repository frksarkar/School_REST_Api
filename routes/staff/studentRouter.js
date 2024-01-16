const express = require('express');

const {
	adminRegisterStudent,
	studentLogin,
	AdminGetStudents,
	AdminGetStudent,
	adminUpdateStudent,
	adminDeleteStudent,
	getStudentProfile,
	updateStudentProfile,
	studentWriteExam,
	studentGetExamResult,
} = require('../../controller/staff/studentController');
const {
	isAuthenticated,
	roleRestriction,
} = require('../../middlewares/authHandler');
const { getAllData } = require('../../controller/common');
const { Student } = require('../../module/academic/student');

const studentRouter = express.Router();

// login student
studentRouter.post('/login', studentLogin);

studentRouter.get(
	'/profile',
	isAuthenticated,
	roleRestriction('student'),
	getStudentProfile
); // get single student

studentRouter.get(
	'/result/:examId',
	isAuthenticated,
	roleRestriction('student'),
	studentGetExamResult
);

studentRouter.put(
	'/update/profile',
	isAuthenticated,
	roleRestriction('student'),
	updateStudentProfile
);

studentRouter.post(
	'/exam/:examId',
	isAuthenticated,
	roleRestriction('student'),
	studentWriteExam
);

// admin can access the routes
studentRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.get('/', getAllData(Student), AdminGetStudents) // get all students
	.get('/admin/:studentId', AdminGetStudent) // get a student
	.put('/admin/:studentId', adminUpdateStudent) // update student
	.post('/admin/register', adminRegisterStudent) // student register
	.delete('/admin/:studentId', adminDeleteStudent); // delete single student

exports.studentRouter = studentRouter;
