const createHttpError = require('http-errors');
const {
	generateRandomNumber,
	signAccessToken,
	verifyRefreshToken,
	signRefreshToken,
} = require('../../../../utils/functions');
const { getOTPValidator, checkOTPValidator } = require('../../../validators/user/auth.schema.validator');
const { UserModel } = require('../../../../models/user.model');
const { USER_ROLE, EXPIRES_IN } = require('../../../../utils/constants');
const Controller = require('../../controller');

class AuthUserController extends Controller {
	async getOTP(req, res, next) {
		try {
			await getOTPValidator.validateAsync(req.body);
			const { mobile } = req.body;
			const code = generateRandomNumber();
			const result = await this.saveUser(mobile, code);
			if (!result) throw createHttpError.Unauthorized('ورود شما انجام نشد.');
			return res.status(200).send({
				data: {
					statusCode: 200,
					message: 'کد یک بار مصرف ارسال گردید',
					code,
					mobile,
				},
			});
		} catch (error) {
			next(createHttpError.BadRequest(error.message));
		}
	}

	async checkOTP(req, res, next) {
		try {
			await checkOTPValidator.validateAsync(req.body);
			const { mobile, code } = req.body;
			const user = await UserModel.findOne({ mobile });
			if (!user) throw createHttpError.NotFound('کاربری بافت نشد.');
			if (user.otp.code != code) throw createHttpError.Unauthorized('کد ارسالی صحیح نمی‌باشد.');
			const now = Date.now();
			if (user.otp.expiresIn < now) throw createHttpError.Unauthorized('کد ارسالی منقضی شده است.');
			const accessToken = await signAccessToken(user._id);
			const refreshToken = await signRefreshToken(user._id);
			return res.json({
				data: {
					accessToken,
					refreshToken,
				},
			});
		} catch (error) {
			next(createHttpError.BadRequest(error.message));
		}
	}

	async refreshToken(req, res, next) {
		try {
			const { refreshToken } = req.body;
			const mobile = await verifyRefreshToken(refreshToken);
			const user = await UserModel.findOne({ mobile });
			const accessToken = await signAccessToken(user._id);
			const newRefreshToken = await signRefreshToken(user._id);
			return res.json({
				data: {
					accessToken,
					refreshToken: newRefreshToken,
				},
			});
		} catch (error) {
			next(createHttpError.BadRequest(error.message));
		}
	}

	async saveUser(mobile, code) {
		let otp = {
			code,
			expiresIn: new Date().getTime() + 120000,
		};
		if (await this.checkUserExisting(mobile)) {
			return await this.updateUser(mobile, {
				otp: otp,
			});
		}
		return !!(await UserModel.create({
			mobile,
			otp,
			Roles: [USER_ROLE],
		}));
	}

	async checkUserExisting(mobile) {
		const user = await UserModel.findOne({ mobile });
		return !!user;
	}

	async updateUser(mobile, data = {}) {
		Object.keys(data).forEach((key) => {
			if (['', ' ', null, undefined, '0', NaN].includes(key)) delete data[key];
		});
		const result = await UserModel.updateOne({ mobile }, { $set: data });
		return !!result.modifiedCount;
	}
}

module.exports = {
	AuthUserController: new AuthUserController(),
};
