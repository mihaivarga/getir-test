const controller = require('../controllers/controller.js')
const { check } = require("express-validator");

module.exports = (app) => {
    app.post('/',[
        check('startDate').notEmpty(),
        check('endDate').notEmpty(),
        check('minCount').notEmpty(),
        check('maxCount').notEmpty()
    ], controller.getData)
}
