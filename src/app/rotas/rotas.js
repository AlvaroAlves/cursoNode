const { check, validationResult } = require('express-validator/check');

const LivroController  = require('../Controllers/livroController')
const livroController = new LivroController()



module.exports = (app) => {
    app.get('/', function (req, resp){
        resp.send('<html><head><meta charset="utf-8"></head><body><h1>Hello World!!</h1></body></html>')
    })
    
    app.get('/livros', livroController.lista())

    app.get('/livros/form', livroController.form())

    app.get('/livros/form/:id', livroController.getById())

    app.post('/livros', [
        check('titulo').isLength({min : 5}).withMessage('O título precisa ter no mínimo 5 caracteres!'),
        check('preco').isCurrency().withMessage('O preço precisa ser um valor monetário válido!')
    ],
        livroController.insert()
    )

    app.put('/livros', livroController.edit())

    app.delete('/livros/:id', livroController.deleteLivro())
}
