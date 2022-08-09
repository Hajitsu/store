const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constants');

function generateRandomNumber() {
	return Math.floor(Math.random() * 90000 + 100000);
}

function signAccessToken(userId) {
	return new Promise(async (resolve, reject) => {
		const user = await UserModel.findById(userId);
		const payload = {
			mobile: user.mobile,
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

function signRefreshToken(userId) {
	return new Promise(async (resolve, reject) => {
		const user = await UserModel.findById(userId);
		const payload = {
			mobile: user.mobile,
			userId: user._id,
		};
		const options = {
			expiresIn: '30d',
		};

		jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
			if (err) reject(createHttpError.InternalServerError(err.message));
			resolve(token);
		});
	});
}

function verifyRefreshToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
			if (err) reject(createHttpError.Unauthorized('وارد حساب خود شوید' + err.message));
			const { mobile } = payload || {};
			const user = await UserModel.findOne({ mobile }, { password: 0, token: 0, otp: 0, __v: 0 });
			if (!user) reject(createHttpError.Unauthorized('حساب کاربری یافت نشد'));
			resolve(mobile);
		});
	});
}

module.exports = {
	generateRandomNumber,
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
};
