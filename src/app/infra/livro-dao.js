const { ___resolveComponentKey } = require("marko/src/components/renderer");

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
}

module.exports = LivroDao