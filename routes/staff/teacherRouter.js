const express = require('express');

const {
	adminTeacherRegister,
	teacherLogin,
	AdminGetTeachers,
	AdminGetTeacher,
	adminUpdateTeacher,
	adminDeleteTeacher,
	teacherSuspendTeacher,
	teacherUnSuspendTeacher,
	teacherWithdrawnTeacher,
	teacherUnWithdrawnTeacher,
	teacherPublishExam,
	teacherUnPublishExam,
	getTeacherProfile,
	updateTeacherProfile,
} = require('../../controller/staff/teacherController');
const {
	isLoggedIn,
	isAdmin,
	isLoginTeacher,
	isTeacher,
} = require('../../middlewares/authHandler');

const teacherRouter = express.Router();

// login teacher
teacherRouter.post('/login', teacherLogin);

teacherRouter.get('/profile', isLoginTeacher, isTeacher, getTeacherProfile); // get single teacher

teacherRouter.put('/update/profile', isLoginTeacher, isTeacher, updateTeacherProfile)

// admin can access the routes
teacherRouter
	.use(isLoggedIn, isAdmin)
	.get('/', AdminGetTeachers) // get all teachers
	.get('/admin/:teacherId', AdminGetTeacher) // get a teacher
	.put('/admin/:teacherId', adminUpdateTeacher) // update teacher
	.post('/admin/register', adminTeacherRegister) // teacher register
	.delete('/admin/:teacherId', adminDeleteTeacher); // delete single teacher

// // teacher suspend teacher
// teacherRouter.put('/suspend/teacher/:id', teacherSuspendTeacher);

// // teacher unsuspend teacher
// teacherRouter.put('/unsuspend/teacher/:id', teacherUnSuspendTeacher);

// // teacher withdrawn teacher
// teacherRouter.put('/withdrawn/teacher/:id', teacherWithdrawnTeacher);

// // teacher unWithdrawn teacher
// teacherRouter.put('/unwithdrawn/teacher/:id', teacherUnWithdrawnTeacher);

// // teacher publish exams
// teacherRouter.put('/publish/exam/:id', teacherPublishExam);

// // teacher unpublish exams
// teacherRouter.put('/unpublish/exam/:id', teacherUnPublishExam);

exports.teacherRouter = teacherRouter;
