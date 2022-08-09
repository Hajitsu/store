const createHttpError = require('http-errors');
const { authSchema } = require('../../validators/user/auth.schema.validator');
const Controller = require('../controller');

module.exports = new (class HomeController extends Controller {
	async homePage(req, res, next) {
		try {
			return res.status(200).send('.: Welcome To The Hajitsu Land :.');
		} catch (error) {
			next(createHttpError.BadRequest(error.message));
		}
	}
})();
