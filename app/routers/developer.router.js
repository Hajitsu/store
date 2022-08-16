const router = require('express').Router();
const bcrypt = require('bcrypt');
const { generateRandomNumber } = require('../utils/functions');

/**
 * @swagger
 *   tags:
 *     name: Developer-Routes
 *     description: Developer utils
 */

/**
 * @swagger
 * /developer/hash-password/{password}:
 *   get:
 *     tags: [Developer-Routes]
 *     summary: hash data with cryption
 *     parameters:
 *       - in: path
 *         type: string
 *         name: password
 *         required: true
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorization
 *       500:
 *         description: Internal Server Error
 *
 */
router.get('/hash-password/:password', (req, res, next) => {
	const { password } = req.params;
	const salt = bcrypt.genSaltSync(10);
	return res.send(bcrypt.hashSync(password, salt));
});

/**
 * @swagger
 * /developer/random-number:
 *   get:
 *     tags: [Developer-Routes]
 *     summary: generate randome number
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorization
 *       500:
 *         description: Internal Server Error
 *
 */
router.get('/random-number', (req, res, next) => {
	return res.send(generateRandomNumber().toString());
});

module.exports = {
	DeveloperRoutes: router,
};
