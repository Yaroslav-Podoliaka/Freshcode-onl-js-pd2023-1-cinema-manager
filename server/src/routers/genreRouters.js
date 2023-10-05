const Router = require('express');
const genreControllers = require('../controllers/genreController');

const router = new Router();

router
.route('/')
.post(genreControllers.createGenre)
.get(genreControllers.getGenres)
.put(genreControllers.updateGenre);

router
.route('/:genreI')
.get(genreControllers.getGenreById)
.delete(genreControllers.deleteGenre);

module.exports = router;
