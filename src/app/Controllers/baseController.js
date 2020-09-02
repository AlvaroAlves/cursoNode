class BaseController {

    home() {
        return function(req, resp) {
            resp.marko(
                require('../views/base/home/home.marko')
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