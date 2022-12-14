const { AuthUserController } = require('../../http/controllers/user/auth/auth.user.controller');

const router = require('express').Router();

router.post('/get-otp', AuthUserController.getOTP);
router.post('/check-otp', AuthUserController.checkOTP);

module.exports = {
	AuthUserRoutes: router,
};
