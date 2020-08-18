const db = require('../../config/database')

module.exports = (app) => {
    app.get('/', function (req, resp){
        resp.send('<html><head><meta charset="utf-8"></head><body><h1>Hello World!!</h1></body></html>')
    })
    
    app.get('/livros', function (req, resp){
        db.all('SELECT * FROM livros', function( err, result){
            resp.marko(
                require('../views/livros/lista/lista.marko'),{
                    livros: result
                }
            )
        })
    })
}
