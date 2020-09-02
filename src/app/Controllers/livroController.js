const db = require('../../config/database')
const LivroDao = require('../infra/livro-dao')
const listaMarko = require('../views/livros/lista/lista.marko')

class LivroController {

    static rotas(){
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }
    lista(){
        return  (req, resp) => {
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
            }
    }

    form(){
        return (req, resp) => {
            resp.marko(
                require('../views/livros/form/form.marko'),
                {livro : {}}
            )
        }
    }

    insert(){
        return (req, resp) => {
            const livroDao = new LivroDao(db)
            const err = validationResult(req)
    
            if(!err.isEmpty()){
                return resp.marko(
                    require('../views/livros/form/form.marko'),
                    {
                        livro : req.body,
                        validationErrors: err.array()
                    }
                )
            }
    
            livroDao.adiciona(req.body)
                .then(resp.redirect(LivroController.rotas().lista))
                .catch(
                    err=> console.log(err)
                )
        }
    }

    edit(){
        return (req, resp) => {
            const livroDao = new LivroDao(db)
            livroDao.atualiza(req.body)
                .then(resp.redirect(LivroController.rotas().lista))
                .catch(
                    err=> console.log(err)
                )
        }
    }

    getById(){
        return (req,resp) => {
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
        }
    }

    deleteLivro(){
        return function(req,resp){
            const id = req.params.id
            const livroDao = new LivroDao(db)
            livroDao.remove(id)
            .then(()=> resp.status(200).end())
            .catch( err => console.log(err))
        }
    }
}

module.exports = LivroController;