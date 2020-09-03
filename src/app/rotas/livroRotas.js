const Livro = require('../models/livro')

const LivroController  = require('../controllers/livroController')
const BaseController = require('../Controllers/baseController')
const livroController = new LivroController()

module.exports = (app) => {
    const rotasLivro = LivroController.rotas()

    app.use(rotasLivro.autenticadas, (req, resp, next) =>{
        if(req.isAuthenticated()){
            next()
        }else{
            resp.redirect(BaseController.rotas().login)
        }
    })

    app.get(rotasLivro.lista, livroController.lista())

    app.route(rotasLivro.cadastro)
        .get( livroController.form())
        .post(Livro.validacoes() , livroController.insert())
        .put(livroController.edit())

    app.get(rotasLivro.edicao, livroController.getById())

    app.delete(rotasLivro.delecao, livroController.deleteLivro())
}