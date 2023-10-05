const db = require('../db');

class NationalityController {
  async getNationalities(req, res) {
    try {
      const nationalities = await db.query(
        `SELECT
        nationality_id,
        title,
        description
        FROM nationalities
        ORDER BY nationality_id`
      );
      res.json(nationalities.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getNationalityById(req, res) {
    try {
      const { nationalityId } =req.params;
      const nationality = await db.query(
        `SELECT
        nationality_id,
        title,
        description
        FROM nationalities
        WHERE nationality_id=$1`,
        [nationalityId]
      );
      res.json(nationality.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async createNationality(req, res) {
    try {
      const {
        title,
        description
      } = req.body;
      const newNationality = await db.query(
        `INSERT INTO nationalities
        (title,
          description)
          VALUES($1, $2)
          RETURNING *`,
          [title, description]
      );
      res.json(newNationality.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async updateNationality(req, res) {
    try {
      const {
        title,
        description,
        nationality_id
      } = req.body;
      const updatedNationality = await db.query(
        `UPDATE nationalities
        SET
        title=$1,
        description=$2
        WHERE nationality_id=$3
        RETURNING *`,
        [title, description, nationality_id]
      );
      res.json(updatedNationality.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNationality(req, res) {
    try {
      const { nationalityId } = req.params;
      const delNationality = await db.query(
        `DELETE FROM nationalities
        WHERE nationality_id=$1
        RETURNING *`,
        [nationalityId]
      );
      res.json(delNationality.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new NationalityController();
