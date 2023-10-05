const Router = require('express');
const studioControllers = require('../controllers/studioController');
const { validateTitle } = require('../middleware/validate.mw');

const router = new Router();

router
.route('/')
.post(validateTitle, studioControllers.createStudio)
.get(studioControllers.getStudios)
.put(studioControllers.updateStudio);

router
.route('/:studioId')
.get(studioControllers.getStudioById)
.delete(studioControllers.deleteStudio);

module.exports = router;
