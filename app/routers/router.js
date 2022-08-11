const redisClient = require('../utils/redisClient');
const { HomeRouter } = require('./api/home.api.router');
const { AuthUserRoutes } = require('./user/auth.user.router');

const router = require('express').Router();

router.use('/', HomeRouter);
router.use('/user', AuthUserRoutes);

module.exports = {
	AllRoutes: router,
};
