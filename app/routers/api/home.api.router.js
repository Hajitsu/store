const homeController = require('../../http/controllers/api/home.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken.mw');
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
 *     parameters:
 *       -  in: header
 *          name: access-token
 *          example: bearer YOUR_ACCESS_KEY
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: not found
 */
router.get('/', verifyAccessToken, homeController.homePage);

module.exports = {
	HomeRouter: router,
};
