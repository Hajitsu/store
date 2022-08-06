const { defaul: mongoose, Schema, model } = require('mongoose');

const Schema = new Schema(
	{
		title: { type: String },
		text: { type: String },
		image: { type: String, required: true },
		type: { type: String, default: 'base' },
	},
	{
		timestamp: true,
	}
);

module.exports = {
	SliderModel: mongoose.model('slider', Schema),
};
