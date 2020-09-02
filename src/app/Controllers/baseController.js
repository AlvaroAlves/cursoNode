const templates = require('../views/templates')
class BaseController {

    home() {
        return function(req, resp) {
            resp.marko(
                templates.base.home
            );
        };
    }

    static rotas() {
        return {
            home : '/'
        }
    }
}

module.exports = BaseController;