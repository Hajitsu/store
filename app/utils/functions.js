const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const { ACCESS_TOKEN_SECRET_KEY } = require('./constants');

function generateRandomNumber() {
	return Math.floor(Math.random() * 90000 + 100000);
}

function signAccessToken(userId) {
	return new Promise(async (resolve, reject) => {
		const user = await UserModel.findById(userId);
		const payload = {
			mobile: user.mobile,
			userId: user._id,
		};
		const options = {
			expiresIn: '1h',
		};

		jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
			if (err) reject(createHttpError.InternalServerError(err.message));
			resolve(token);
		});
	});
}

module.exports = {
	generateRandomNumber,
	signAccessToken,
};
