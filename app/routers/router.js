const { HomeRouter } = require('./api/home.api.router');
const { AuthUserRoutes } = require('./user/auth.user.router');
const { DeveloperRoutes } = require('./developer.router');

const router = require('express').Router();

router.use('/', HomeRouter);
router.use('/user', AuthUserRoutes);
router.use('/developer', DeveloperRoutes);

module.exports = {
	AllRoutes: router,
};
