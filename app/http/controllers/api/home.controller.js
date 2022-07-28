const Controller = require('../controller');

module.exports = new (class HomeController extends Controller {
	homePage(req, res, next) {
		return res.status(200).send('.: Welcome To The Hajitsu Land :.');
	}
})();
