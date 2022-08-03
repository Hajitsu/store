const Joi = require('@hapi/joi');

const authSchema = Joi.object({
	mobile: Joi.string()
		.length(11)
		.pattern(/^09[0-9]{9}$/)
		.error(new Error('شماره موبایل وارد شده صحیح نمی‌باشد.')),
	// email: Joi.string().lowercase().trim().email().required().error(new Error('ایمیل وارد شده صحیح نمی‌باشد.')),
	// password: Joi.string()
	// 	.min(6)
	// 	.max(16)
	// 	.trim()
	// 	.required()
	// 	.error(new Error('پسورد وارد شده باید بین ۶ تا ۱۶ کاراکتر باشد')),
});

module.exports = { authSchema };
