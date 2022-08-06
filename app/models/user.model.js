const { defaul: mongoose, Schema, model } = require('mongoose');

const schema = new Schema(
	{
		firstame: { type: String },
		lastname: { type: String },
		username: { type: String, lowercase: true },
		password: { type: String },
		mobile: { type: String, required: true },
		email: { type: String, lowercase: true },
		otp: {
			type: Object,
			default: {
				code: 0,
				expiresIn: 0,
			},
		},
		bills: { type: [], default: [] },
		discount: { type: Number, default: 0 },
		birthdate: { type: String },
		roles: { type: [String], default: 'user' },
	},
	{
		timestamp: true,
	}
);

module.exports = {
	UserModel: model('user', schema),
};
