const Livro = require('../Models/livro')

const LivroController  = require('../Controllers/livroController')
const livroController = new LivroController()

const BaseController = require ('../Controllers/baseController')
const baseController = new BaseController()

module.exports = (app) => {
    const rotasLivro = LivroController.rotas()
    const rotasBase = BaseController.rotas()

    app.get(rotasBase.home, baseController.home())
    
    app.get(rotasLivro.lista, livroController.lista())

    app.get(rotasLivro.cadastro, livroController.form())

    app.get(rotasLivro.edicao, livroController.getById())

    app.post(rotasLivro.lista, Livro.validacoes() , livroController.insert())

    app.put(rotasLivro.lista, livroController.edit())

    app.delete(rotasLivro.delecao, livroController.deleteLivro())
}
