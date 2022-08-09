const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../../models/user.model');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constants');

function verifyAccessToken(req, res, next) {
	const headers = req.headers;
	const [bearer, token] = headers?.['access-token']?.split(' ') || [];
	if (token && ['Bearer', 'bearer'].includes(bearer))
		jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
			console.log(err, payload);
			if (err) return next(createHttpError.Unauthorized('وارد حساب خود شوید' + err.message));
			const { mobile } = payload || {};
			const user = await UserModel.findOne({ mobile }, { password: 0, token: 0, otp: 0, __v: 0 });
			if (!user) return next(createHttpError.Unauthorized('حساب کاربری یافت نشد'));
			req.user = user;
			return next();
		});
	else return next(createHttpError.Unauthorized('وارد حساب خود شوید'));
}

module.exports = {
	verifyAccessToken,
};
