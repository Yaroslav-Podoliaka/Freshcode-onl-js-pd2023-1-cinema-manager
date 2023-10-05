const Router = require('express');

const actorRouters = require('./actorRouters');
const directorRouters = require('./directorRouters');
const genreRouters = require('./genreRouters');
const movieRouters = require('./movieRouters');
const studioRouters = require('./studioRouters');

const router = new Router();

router.use('/actors', actorRouters);
router.use('/directors', directorRouters);
router.use('/genres', genreRouters);
router.use('/movies', movieRouters);
router.use('/studios', studioRouters);

module.exports = router;
