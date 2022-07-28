const { HomeRouter } = require('./api/home.api.router');

const router = require('express').Router();

router.use('/', HomeRouter);

module.exports = {
	AllRoutes: router,
};
