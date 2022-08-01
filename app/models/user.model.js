const { defaul: mongoose, Schema, model } = require('mongoose');

const Schema = new Schema(
	{
		first_name: { type: String },
		last_name: { type: String },
		username: { type: String },
		password: { type: String },
		mobile: { type: String },
		email: { type: String },
		otp: {
			type: Object,
			default: {
				code: 0,
				expire_in: new Date().getDate() + 120,
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
	UserModel: mongoose.model('user', Schema),
};
