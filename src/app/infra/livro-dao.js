class LivroDao{
    constructor(db){
        this._db = db;
    }

    lista(){
        return new Promise((resolve , reject) => {
            this._db.all(
                "SELECT * FROM livros",
                (err, results) =>{
                    if (err) 
                        return reject("Não foi possivel listar os livros")
                    return resolve(results)
                }
            )
        })    
    }

    adiciona(livro){
        return new Promise((resolve, reject) =>{
            this._db.run(`
            INSERT INTO LIVROS (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
            `, 
            [
                livro.titulo,
                livro.preco,
                livro.descricao
            ],
            function(err) {
                if(err){
                    console.log(err)
                    return reject('Não foi possível salvar o livro')
                }
                
                resolve();
            })
        })
    }
}

module.exports = LivroDao