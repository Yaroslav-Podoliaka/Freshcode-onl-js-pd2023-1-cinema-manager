const Router = require('express');

const actorRouters = require('./actorRouters');
const directorRouters = require('./directorRouters');
const genreRouters = require('./genreRouters');
const locationRouters = require('./locationRouters');
const movieRouters = require('./movieRouters');
const nationalityRouters = require('./nationalityRouters');
const studioRouters = require('./studioRouters');

const router = new Router();

router.use('/actors', actorRouters);
router.use('/directors', directorRouters);
router.use('/genres', genreRouters);
router.use('/locations', locationRouters);
router.use('/movies', movieRouters);
router.use('/nationalities', nationalityRouters);
router.use('/studios', studioRouters);

module.exports = router;
