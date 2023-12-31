const Router = require('express');
const nationalityControllers = require('../controllers/nationalityController');
const { validate } = require('../middleware');

const router = new Router();

router
.route('/')
.post(validate.validateTitle, nationalityControllers.createNationality)
.get(nationalityControllers.getNationalities)
.put(nationalityControllers.updateNationality);

router
.route('/:nationalityId')
.get(nationalityControllers.getNationalityById)
.delete(nationalityControllers.deleteNationality);

module.exports = router;
