const homeController = require('../../http/controllers/api/home.controller');
const router = require('express').Router();

router.get('/', homeController.homePage);

module.exports = {
	HomeRouter: router,
};
