const uuid = require('uuid/v4')
const sessao = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../config/database')
const usuarioDao = require('../app/infra/usuarioDao')

module.exports = (app) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const user = new usuarioDao(db);
            user.buscaPorEmail(email)
                        .then(usuario => {
                            if (!usuario || senha != usuario.senha) {
                                return done(null, false, {
                                    mensagem: 'Login e senha incorretos!'
                                });
                            }

                            return done(null, usuario);
                        })
                        .catch(erro => done(erro, false));
        }
    ));

    passport.serializeUser((usuario, done) => {
        const userSession = {
            nome: usuario.nome_completo,
            email: usuario.email
        }

        done(null, userSession)
    })

    passport.deserializeUser((userSession, done) => {
        done(null, userSession)
    })

    app.use(sessao({
        secret: 'node research',
        genid: function(req){
            return uuid()
        },
        resave: false,
        saveUninitialized: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use((req, resp, next) =>{
        req.passport = passport
        next()
    })
}