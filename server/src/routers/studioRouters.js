const Router = require('express');
const studioControllers = require('../controllers/studioController');
const { validate } = require('../middleware');

const router = new Router();

router
.route('/')
.post(validate.validateTitle, studioControllers.createStudio)
.get(studioControllers.getStudios)
.put(studioControllers.updateStudio);

router
.route('/:studioId')
.get(studioControllers.getStudioById)
.delete(studioControllers.deleteStudio);

module.exports = router;
