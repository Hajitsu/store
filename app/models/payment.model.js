const { defaul: mongoose, Schema, model } = require('mongoose');

const Schema = new Schema(
	{},
	{
		timestamp: true,
	}
);

module.exports = {
	PaymentModel: mongoose.model('payment', Schema),
};
