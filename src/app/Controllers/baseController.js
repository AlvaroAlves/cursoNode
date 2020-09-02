const templates = require('../views/templates')
class BaseController {

    home() {
        return (req, resp) => {
            resp.marko(
                templates.base.home
            );
        };
    }

    efetuaLogin(){
        return (req, resp) => {
            //
        }
    }

    static rotas() {
        return {
            home : '/',
            login: '/login'
        }
    }
}

module.exports = BaseController;