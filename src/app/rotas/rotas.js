module.exports = (app) => {
    app.get('/', function (req, resp){
        resp.end('<html><head><meta charset="utf-8"></head><body><h1>Hello World!</h1></body></html>')
    })
    
    app.get('/livros', function (req, resp){
        resp.end('<html><head><meta charset="utf-8"></head><body><h1>Listagem de livros!</h1></body></html>')
    })
}
