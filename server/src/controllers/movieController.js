// const { v4: uuidv4 } = require('uuid');
const db = require('../db');

class MovieController {
  async getMovies(req, res) {
    try {
      const movies = await db.query(
        `SELECT
        movie_id,
        title,
        relise_year,
        poster,
        gen.title AS genre
        FROM movies
        JOIN genres AS gen
        USING (genre_id),
        stud.title AS studio
        FROM movies
        JOIN studios AS stud
        USING (studio_id)
        ORDER BY movie_id`
      );
      console.log(movies.rows);
      res.json(movies.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getMovieById(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await db.query(
        `SELECT
        movie_id,
        title,
        relise_year,
        poster,
        genre.title AS genre
        FROM movies
        JOIN genres AS genre
        USING (genre_id),
        studio.title AS studio
        FROM movies
        JOIN studios AS studio
        USING (studio_id)
        WHERE movie_id=$1`,
        [movieId]
      );
      console.log(movie.rows[0]);
      res.json(movie.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async createMovie(req, res) {
    try {
      const {
        title,
        relise_year,
        genre,
        studio,
        poster
      } = req.body;
      const newMovie = await db.query(
        `INSERT INTO movies
        (title,
          relise_year,
          genre_id,
          studio_id,
          poster)
          VALUES($1, $2, (
            SELECT genre_id
            FROM genres
            WHERE title=$3),
            (SELECT studio_id
            FROM studios
            WHERE title=$4), $5)
          RETURNING *`,
          [title, relise_year, genre, studio, poster]
      );
      console.log(newMovie.rows[0]);
      res.json(newMovie.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async updateMovie(req, res) {
    try {
      const {
        title,
        relise_year,
        genre,
        studio,
        poster,
        movie_id
      } = req.body;
      const updatedMovie = await db.query(
        `UPDATE movies
        SET
        title=$1,
        relise_year=$2,
        genre_id=(
          SELECT genre_id
          FROM genres
          WHERE title=$3),
        studio_id=(
          SELECT studio_id
          FROM studios
          WHERE title=$4),
        poster=$5
        WHERE movie_id=$6
        RETURNING *`,
        [title, relise_year, genre, studio, poster, movie_id]
      );
      console.log(updatedMovie.rows[0]);
      res.json(updatedMovie.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMovie(req, res) {
    try {
      const { movieId } = req.params;
      const delMovie = await db.query(
        `DELETE FROM movies
        WHERE movie_id=$1
        RETURNING *`,
        [movieId]
      );
      res.json(delMovie.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MovieController();

// const movies = [
//   {
//     id: uuidv4(),
//     title: "Avatar",
//   },
//   {
//     id: uuidv4(),
//     title: "I Am Legend",
//   },
//   {
//     id: uuidv4(),
//     title: "Aliens",
//   },
//   {
//     id: uuidv4(),
//     title: "Pirates of the Caribbean:",
//   },
// ];

// module.exports.getMovies = (req, res) => {
//   res.status(200).send(movies);
// };

// module.exports.getMovieById = (req, res) => {
//   const {params: {movieId}} = req;
//   const [movie] = movies.filter((movie) => movie.id === movieId);
//   if (movie){
//     res.status(200).send(movie);
//   }else{
//     res.status(404).send('Movie not found');
//   }
// };
