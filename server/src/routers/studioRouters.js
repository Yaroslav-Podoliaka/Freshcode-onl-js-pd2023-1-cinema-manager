const Router = require('express');
const studioControllers = require('../controllers/studioController');

const router = new Router();

router
.route('/')
.post(studioControllers.createStudio)
.get(studioControllers.getStudios)
.put(studioControllers.updateStudio);

router
.route('/:studioId')
.get(studioControllers.getStudioById)
.delete(studioControllers.deleteStudio);

module.exports = router;
