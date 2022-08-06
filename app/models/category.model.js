const { defaul: mongoose, Schema, model } = require('mongoose');

const Schema = new Schema(
	{
		title: { type: String, required: true },
	},
	{
		timestamp: true,
	}
);

module.exports = {
	CategoryModel: mongoose.model('category', Schema),
};
