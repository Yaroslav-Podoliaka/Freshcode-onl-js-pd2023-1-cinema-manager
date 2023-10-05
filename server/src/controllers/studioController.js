// const { v4: uuidv4 } = require('uuid');
const db = require('../db');

class StudioController {
  async getStudios(req, res) {
    try {
      const studios = await db.query(
        `SELECT
        title,
        year_fondation,
        studio_id,
        loc.city AS location
        FROM studios
        JOIN locations AS loc
        USING (location_id)
        ORDER BY studio_id`
      );
      console.log(studios.rows);
      res.json(studios.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getStudioById(req, res) {
    try {
      const { studioId } = req.params;
      const studio = await db.query(
        `SELECT
        studio_id,
        title,
        year_fondation,
        poster,
        loc.city AS location
        FROM studios
        JOIN locations AS loc
        USING (location_id)
        WHERE studio_id=$1`,
        [studioId]
      );
      console.log(studio.rows[0]);
      res.json(studio.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async createStudio(req, res) {
    try {
      const {
        title,
        year_fondation,
        location,
        poster
      } = req.body;
      const newStudio = await db.query(
        `INSERT INTO studios
        (title,
          year_fondation,
          location_id,
          poster)
          VALUES($1, $2, (
            SELECT location_id
            FROM locations
            WHERE city=$3), $4)
            RETURNING *`,
            [title, year_fondation, location, poster]
      );
      res.json(newStudio.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async updateStudio(req, res) {
    try {
      const {
        title,
        year_fondation,
        location,
        poster,
        studio_id
      } = req.body;
      const updatedStudio = await db.query(
        `UPDATE studios
        SET
        title=$1,
        year_fondation=$2,
        location_id=(
          SELECT location_id
          FROM locations
          WHERE city=$3),
          poster=$4
          WHERE studio_id=$5
          RETURNING *`,
          [title, year_fondation, location, poster, studio_id]
      );
      res.json(updatedStudio.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteStudio(req, res) {
    try {
      const { studioId } = req.params;
      const delStudio = await db.query(
        `DELETE FROM studios
        WHERE studio_id=$1
        RETURNING *`,
        [studioId]
      );
      res.json(delStudio.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new StudioController();

// const studios = [
//   {
//     id: uuidv4(),
//     title: "Lucasfilm Ltd. LLC",
//     location: "San Francisco",
//     foundationYear: "1971",
//   },
//   {
//     id: uuidv4(),
//     title: "20th Century Studios, Inc.",
//     location: "Los Angeles",
//     foundationYear: "1935",
//   },
//   {
//     id: uuidv4(),
//     title: "Columbia Pictures",
//     location: "Culver City",
//     foundationYear: "1924",
//   },
//   {
//     id: uuidv4(),
    // title: "Metro-Goldwyn-Mayer",
    // location: "Los Angeles",
    // foundationYear: "1924",
//   },
// ];

// module.exports.getStudios = (req, res) => {
//   res.status(200).send(studios);
// };

// module.exports.getStudioById = (req, res) => {
//   const {params: {studioId}} = req;
//   const [studio] = studios.filter((studio) => studio.id === studioId);
//   if (studio){
//     res.status(200).send(studio);
//   }else{
//     res.status(404).send('Studio not found');
//   }
// };
