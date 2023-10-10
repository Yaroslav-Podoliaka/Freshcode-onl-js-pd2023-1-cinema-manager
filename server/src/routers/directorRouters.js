const Router = require('express');
const directorControllers = require('../controllers/directorController');
const { validate } = require('../middleware');

const router = new Router();

router
.route('/')
.post(validate.validatePerson, directorControllers.createDirector)
.get(directorControllers.getDirectors)
.put(directorControllers.updateDirector);

router
.route('/:directorId')
.get(directorControllers.getDirectorById)
.delete(directorControllers.deleteDirector);

module.exports = router;
