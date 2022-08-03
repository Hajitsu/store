const { AuthUserController } = require('../../http/controllers/user/auth/auth.user.controller');

const router = require('express').Router();

router.post('/login', AuthUserController.login);

module.exports = {
	AuthUserRoutes: router,
};
