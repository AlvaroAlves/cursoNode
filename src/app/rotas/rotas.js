const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')
const listaMarko = require('../views/livros/lista/lista.marko')

module.exports = (app) => {
    app.get('/', function (req, resp){
        resp.send('<html><head><meta charset="utf-8"></head><body><h1>Hello World!!</h1></body></html>')
    })
    
    app.get('/livros', function (req, resp){
        const livroDao = new LivroDao(db)
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
            require('../views/livros/form/form.marko')
        )
    })

    app.post('/livros', function(req, resp){
        const livroDao = new LivroDao(db)
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(
                erro=> console.log(erro)
            )
    })
}
