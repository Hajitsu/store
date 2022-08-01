const { defaul: mongoose, Schema, model } = require('mongoose');

const Schema = new Schema(
	{
		author: { type: mongoose.Types.ObjectId, required: true },
		title: { type: String, required: true },
		image: { type: String, required: true },
		tags: { type: [String], default: [] },
		category: { type: mongoose.Types.ObjectId, required: true },
		comments: { type: [], default: [] },
		like: { type: [mongoose.Type.ObjectId], defaul: [] },
		dislike: { type: [mongoose.Type.ObjectId], defaul: [] },
		bookmark: { type: [mongoose.Type.ObjectId], defaul: [] },
	},
	{
		timestamp: true,
	}
);

module.exports = {
	BlogModel: mongoose.model('blog', Schema),
};
