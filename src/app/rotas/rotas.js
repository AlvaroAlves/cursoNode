const livroRotas = require('./livroRotas')
const baseRotas = require('./baseRotas')

module.exports = (app) => {
    livroRotas(app)
    baseRotas(app)
}
