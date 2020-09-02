const { check, validationResult } = require('express-validator/check');

const LivroController  = require('../Controllers/livroController')
const livroController = new LivroController()

const BaseController = require ('../Controllers/baseController');
const baseController = new BaseController()

module.exports = (app) => {
    const rotasLivro = LivroController.rotas()

    app.get('/', baseController.home())
    
    app.get(rotasLivro.lista, livroController.lista())

    app.get(rotasLivro.cadastro, livroController.form())

    app.get(rotasLivro.edicao, livroController.getById())

    app.post(rotasLivro.lista, [
        check('titulo').isLength({min : 5}).withMessage('O título precisa ter no mínimo 5 caracteres!'),
        check('preco').isCurrency().withMessage('O preço precisa ser um valor monetário válido!')
    ],
        livroController.insert()
    )

    app.put(rotasLivro.lista, livroController.edit())

    app.delete(rotasLivro.delecao, livroController.deleteLivro())
}
