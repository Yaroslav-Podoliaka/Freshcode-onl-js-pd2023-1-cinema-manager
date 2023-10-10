const Router = require('express');
const actorControllers = require('../controllers/actorController');
const { validate } = require('../middleware');

const router = new Router();

router
.route('/')
.post(validate.validatePerson, actorControllers.createActor)
.get(actorControllers.getActors)
.put(actorControllers.updateActor);

router
.route('/:actorId')
.get(actorControllers.getActorById)
.delete(actorControllers.deleteActor);

module.exports = router;
