const homeController = require('../../http/controllers/api/home.controller');
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: HomePage
 *   description: Home page route and data
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: 'summary'
 *     tags: [HomePage]
 *     description: 'description'
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: not found
 */
router.get('/', homeController.homePage);

module.exports = {
	HomeRouter: router,
};
