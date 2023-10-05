const db = require("../db");

class GenreController {
  async getGenres(req, res) {
    try {
      const genres = await db.query(
        `SELECT
        genre_id,
        title
        FROM genres
        ORDER BY genre_id`
      );
      console.log(genres.rows);
      res.json(genres.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getGenreById(req, res) {
    try {
      const { genreId } = req.params;
      const genre = await db.query(
        `SELECT
      genre_id,
      title
      FROM genres
      WHERE genre_id =$1`,
        [genreId]
      );
      console.log(genre.rows[0]);
      res.json(genre.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async createGenre(req, res) {
    try {
      const {
        title
      } = req.body;
      const newGenre = await db.query(
        `INSERT INTO genres
        (title)
        VALUES($1)
        RETURNING *`,
        [title]
      );
      res.json(newGenre.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async updateGenre(req, res) {
    try {
      const {
        title,
        genre_id
      } = req.body;
      const updatedGenre = await db.query(
        `UPDATE genres
        SET
        title=$1,
        WHERE genre_id=$2
        RETURNING *`,
        [title, genre_id]
      );
      res.json(updatedGenre.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteGenre(req, res) {
    try {
      const { genreId } = req.params;
      const delGenre = await db.query(
        `DELETE FROM genres
        WHERE genre_id=$1
        RETURNING *`,
        [genreId]
      );
      res.json(delGenre.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new GenreController();
