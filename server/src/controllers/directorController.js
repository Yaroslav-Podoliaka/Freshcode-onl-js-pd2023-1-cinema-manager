// const { v4: uuidv4 } = require('uuid');
const db = require("../db");

class DirectorController {
  async getDirectors(req, res) {
    try {
      const directors = await db.query(
        `SELECT
        full_name,
        birth_year,
        death_year,
        director_id,
        nat.description AS nationality
        FROM directors
        JOIN nationalities AS nat
        USING (nationality_id)
        ORDER BY director_id`
      );
      console.log(directors.rows);
      res.json(directors.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getDirectorById(req, res) {
    try {
      const { directorId } = req.params;
      const director = await db.query(
        `SELECT 
        director_id, 
        full_name, 
        birth_year,
        death_year,
        poster,
        nat.description AS nationality
        FROM directors
        JOIN nationalities AS nat
        USING (nationality_id)
        WHERE director_id=$1`,
        [directorId]
      );
      console.log(director.rows[0]);
      res.json(director.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async createDirector(req, res) {
    try {
      const {
        full_name,
        birth_year,
        death_year,
        nationality,
        poster
      } = req.body;
      const newDirector = await db.query(
        `INSERT INTO directors
        (full_name, 
          birth_year,
          death_year,
          nationality_id,
          poster)
          VALUES($1, $2, $3, (
            SELECT nationality_id
            FROM nationalities
            WHERE title=$4), $5)
          RETURNING *`,
        [full_name, birth_year, death_year, nationality, poster]
      );
      res.json(newDirector.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async updateDirector(req, res) {
    try {
      const {
        full_name,
        birth_year,
        death_year,
        nationality,
        poster,
        director_id
      } = req.body;
      const updatedDirector = await db.query(
        `UPDATE directors
        SET
        full_name=$1,
        birth_year=$2,
        death_year=$3,
        nationality_id=(
          SELECT nationality_id
          FROM nationalities
          WHERE title=$4),
        poster=$5
        WHERE director_id=$6
        RETURNING *`,
        [full_name, birth_year, death_year, nationality, poster, director_id]
      );
      res.json(updatedDirector.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDirector(req, res) {
    try {
      const { directorId } = req.params;
      const delDirector = await db.query(
        `DELETE FROM directors
        WHERE director_id=$1
        RETURNING *`,
        [directorId]
      );
      res.json(delDirector.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new DirectorController();

// const directors = [
//   {
//     id: uuidv4(),
//     fullName: "Steven Spielberg",
//     birthYear: "1946",
//     nationality: "USA",
//   },
//   {
//     id: uuidv4(),
//     fullName: "Ridley Scott",
//     birthYear: "1937",
//     nationality: "UK",
//   },
//   {
//     id: uuidv4(),
//     fullName: "James Cameron",
//     birthYear: "1954",
//     nationality: "Canada",
//   },
//   {
//     id: uuidv4(),
//     fullName: "Neil Patrick Jordan",
//     birthYear: 1950,
//     nationality: "Ireland",
//   },
// ];

// module.exports.getDirectors = (req, res) => {
//   res.status(200).send(directors);
// };

// module.exports.getDirectorById = (req, res) => {
//   const {params: {directorId}} = req;
//   const [director] = directors.filter((director) => director.id === directorId);
//   if(director){
//     res.status(200).send(director);
//   }else{
//     res.status(404).send('Director not found');
//   }
// }
