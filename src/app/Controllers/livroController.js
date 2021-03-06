const db = require('../../config/database')
const LivroDao = require('../infra/livroDao')

const { validationResult } = require('express-validator/check');

const templates = require('../views/templates')

class LivroController {

    static rotas(){
        return {
            autenticadas: '/livros*',
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
                    templates.livros.lista,
                    {
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
                templates.livros.form,
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
                    templates.livros.form,
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
                    templates.livros.form, 
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