const controller = require('./controller.js')

module.exports = (app) => {
    app.post('/', controller.getData)
}
