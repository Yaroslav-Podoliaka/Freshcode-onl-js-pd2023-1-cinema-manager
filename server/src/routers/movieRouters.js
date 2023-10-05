const Router = require('express');
const movieControllers = require('../controllers/movieController');

const router = new Router();

router
.route('/')
.post(movieControllers.createMovie)
.get(movieControllers.getMovies)
.put(movieControllers.updateMovie);

router
.route('/:movieId')
.get(movieControllers.getMovieById)
.delete(movieControllers.deleteMovie);

module.exports = router;
