const Router = require('express');
const locationControllers = require('../controllers/locationController');
const { validateLocation } = require('../middleware/validate.mw');

const router = new Router();

router
.route('/')
.post(validateLocation, locationControllers.createLocation)
.get(locationControllers.getLocations)
.put(locationControllers.updateLocation);

router
.route('/:locationId')
.get(locationControllers.getLocationById)
.delete(locationControllers.deleteLocation);

module.exports = router;
