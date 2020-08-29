const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')
const listaMarko = require('../views/livros/lista/lista.marko')
const { check, validationResult } = require('express-validator/check');

module.exports = (app) => {
    app.get('/', function (req, resp){
        resp.send('<html><head><meta charset="utf-8"></head><body><h1>Hello World!!</h1></body></html>')
    })
    
    app.get('/livros',[
            check('titulo').isLength({min : 5}),
            check('preco').isCurrency()
        ],
        (req, resp) => {
        const livroDao = new LivroDao(db)

        const err = validationResult(req)

        if(!err.isEmpty()){
            return resp.marko(
                require('../views/livros/form/form.marko'),
                {livro : {}}
            )
        }

        livroDao.lista()
            .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),{
                    livros: livros
                }
            ))
            .catch(
                erro=> console.log(erro)
            )
    })

    app.get('/livros/form', function(req, resp){
        resp.marko(
            require('../views/livros/form/form.marko'),
            {livro : {}}
        )
    })

    app.get('/livros/form/:id', function(req,resp){
        const id = req.params.id
        const livroDao = new LivroDao(db)

        livroDao.buscaPorId(id)
        .then(
            livro => resp.marko(
                require(
                    '../views/livros/form/form.marko'
                ), 
                {livro:livro}
            )
        ).catch( err => console.log(err))
    })

    app.post('/livros', function(req, resp){
        const livroDao = new LivroDao(db)
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(
                err=> console.log(err)
            )
    })

    app.put('/livros', function(req, resp){
        const livroDao = new LivroDao(db)
        livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(
                err=> console.log(err)
            )
    })

    app.delete('/livros/:id', function(req,resp){
        const id = req.params.id
        const livroDao = new LivroDao(db)
        livroDao.remove(id)
        .then(()=> resp.status(200).end())
        .catch( err => console.log(err))
    })
}
