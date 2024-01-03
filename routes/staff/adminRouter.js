const express = require('express');

const {
	adminRegister,
	adminLogin,
	getAdmins,
	getAdmin,
	updateAdmin,
	deleteAdmin,
	adminSuspendTeacher,
	adminUnSuspendTeacher,
	adminWithdrawnTeacher,
	adminUnWithdrawnTeacher,
	adminPublishExam,
	adminUnPublishExam,
} = require('../../controller/staff/adminController');
const { isLoggedIn, isAdmin } = require('../../middlewares/authHandler');

const adminRouter = express.Router();

// admin register
adminRouter.post('/register', adminRegister);

// login admin
adminRouter.post('/login', adminLogin);

adminRouter
	.use(isLoggedIn, isAdmin)
	.get('/', getAdmins) // get all admins
	.get('/profile', getAdmin) // get single admin
	.put('/', updateAdmin) // update admin
	.delete('/:id', deleteAdmin); // delete single admin

// admin suspend teacher
adminRouter.put('/suspend/teacher/:id', adminSuspendTeacher);

// admin unsuspend teacher
adminRouter.put('/unsuspend/teacher/:id', adminUnSuspendTeacher);

// admin withdrawn teacher
adminRouter.put('/withdrawn/teacher/:id', adminWithdrawnTeacher);

// admin unWithdrawn teacher
adminRouter.put('/unwithdrawn/teacher/:id', adminUnWithdrawnTeacher);

// admin publish exams
adminRouter.put('/publish/exam/:id', adminPublishExam);

// admin unpublish exams
adminRouter.put('/unpublish/exam/:id', adminUnPublishExam);

exports.adminRouter = adminRouter;
