const Router = require('express');
const actorControllers = require('../controllers/actorController');
const { validatePerson } = require('../middleware/validate.mw');

const router = new Router();

router
.route('/')
.post(validatePerson, actorControllers.createActor)
.get(actorControllers.getActors)
.put(actorControllers.updateActor);

router
.route('/:actorId')
.get(actorControllers.getActorById)
.delete(actorControllers.deleteActor);

module.exports = router;
