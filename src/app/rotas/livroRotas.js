const Livro = require('../models/livro')

const LivroController  = require('../controllers/livroController')
const livroController = new LivroController()

module.exports = (app) => {
    const rotasLivro = LivroController.rotas()

    app.get(rotasLivro.lista, livroController.lista())

    app.route(rotasLivro.cadastro)
        .get( livroController.form())
        .post(Livro.validacoes() , livroController.insert())
        .put(livroController.edit())

    app.get(rotasLivro.edicao, livroController.getById())

    app.delete(rotasLivro.delecao, livroController.deleteLivro())
}