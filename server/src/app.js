const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

const actorControllers = require('./controllers/actorController');
const directorControllers = require('./controllers/directorController');
const movieControllers = require('./controllers/movieController');
const studioControllers = require('./controllers/studioController');

// app.use(express.static('./public'));
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.resolve('public')));

app.get("/", (req, res) => {
  fs.readFile("./public/index.html", "utf-8", (err, data) => {
    if (err) {
      res.statusCode = 404;
      throw err;
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write(data);
    res.end();
  });
});

// Actors
// getAllActors
app.get('/actors', actorControllers.getActors);
// getActorById
app.get('/actors/:actorId', actorControllers.getActorById);
// createActor
app.post('/actors/', () => {});
// updateActor
app.put('/actors/id', () => {});
// deleteActor
app.delete('/actors/id', () => {});

// Directors
// getAllDirectors
app.get('/directors', directorControllers.getDirectors);
// getDirectorById
app.get('/directors/:directorId', directorControllers.getDirectorById);
// creteDirector
app.post('/directors/', () => {});
// updateDirector
app.put('/directors/id', () => {});
// deleteDirector
app.delete('/directors/id', () => {});

// Movies
// getAllMovies
app.get('/movies', movieControllers.getMovies);
// getMovieById
app.get('/movies/:movieId', movieControllers.getMovieById);
// createMovie
app.post('/movies/', () => {});
// updateMovie
app.put('/movies/id', () => {});
app.delete('/movies/id', () => {});
// deleteMovie

// Studios
// getAllStudios
app.get('/studios', studioControllers.getStudios);
// getStudioById
app.get('/studios/:studioId', studioControllers.getStudioById);
// createStudio
app.post('/studios/', () => {});
// updateStudio
app.put('/studios/id', () => {});
// deleteStudio
app.delete('/studios/id', () => {});

app.get("/contact", (req, res) => {
  fs.readFile("./public/contact.html", "utf-8", (err, data) => {
    if (err) {
      res.statusCode = 404;
      throw err;
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write(data);
    res.end();
  });
});

// app.get("/images/*", (req, res) => {
//   const url = req.url;
//   fs.readFile(`./public${url}`, (err, data) => {
//     if (err) {
//       res.statusCode = 404;
//       throw err;
//     }
//     res.setHeader("Content-Type", "image/jpeg");
//     res.write(data);
//     res.end();
//   });
// });

module.exports = app;



