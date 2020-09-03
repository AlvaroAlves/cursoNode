const templates = require('../views/templates');
const passport = require('passport');
const LivroController = require('./livroController');

class BaseController {

    home() {
        return (req, resp) => {
            resp.marko(
                templates.base.home
            );
        };
    }

    login(){
        return (req, resp) =>{
            resp.marko(
                templates.base.login
            )
        }
    }
    efetuaLogin() {

        return function(req, resp, next) {
            passport.authenticate('local', (erro, usuario, info) => {
                if (info) {
                    return resp.marko(templates.base.login);
                }
    
                if (erro) {
                    return next(erro);
                }
    
                req.login(usuario, (erro) => {
                    if (erro) {
                        return next(erro);
                    }
    
                    return resp.redirect(LivroController.rotas().lista);
                });
            }) (req, resp, next);
    
        };
    }

    static rotas() {
        return {
            home : '/',
            login: '/login'
        }
    }
}

module.exports = BaseController;