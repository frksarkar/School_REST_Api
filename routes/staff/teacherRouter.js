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
	isAuthenticated,
	roleRestriction,
} = require('../../middlewares/authHandler');

const teacherRouter = express.Router();

// login teacher
teacherRouter.post('/login', teacherLogin);

teacherRouter.get(
	'/profile',
	isAuthenticated,
	roleRestriction('teacher'),
	getTeacherProfile
); // get single teacher

teacherRouter.put(
	'/update/profile',
	isAuthenticated,
	roleRestriction('teacher'),
	updateTeacherProfile
);

// admin can access the routes
teacherRouter
	.use(isAuthenticated, roleRestriction('admin'))
	.get('/', AdminGetTeachers) // get all teachers
	.get('/admin/:teacherId', AdminGetTeacher) // get a teacher
	.put('/admin/:teacherId', adminUpdateTeacher) // update teacher
	.post('/admin/register', adminTeacherRegister) // teacher register
	.delete('/admin/:teacherId', adminDeleteTeacher); // delete single teacher

exports.teacherRouter = teacherRouter;
