const db = require('../db');

class LocationController {
  async getLocations(req, res) {
    try {
      const locations = await db.query(
        `SELECT
        location_id,
        country,
        city
        FROM locations
        ORDER BY location_id`
      );
      res.json(locations.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getLocationById(req, res) {
    try {
      const { locationId } =req.params;
      const location = await db.query(
        `SELECT
        location_id,
        country,
        city
        FROM locations
        WHERE location_id=$1`,
        [locationId]
      );
      res.json(location.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async createLocation(req, res) {
    try {
      const {
        country,
        city
      } = req.body;
      const newLocation = await db.query(
        `INSERT INTO locations
        (country,
          city)
          VALUES($1, $2)
          RETURNING *`,
          [country, city]
      );
      res.json(newLocation.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async updateLocation(req, res) {
    try {
      const {
        country,
        city,
        location_id
      } = req.body;
      const updatedLocation = await db.query(
        `UPDATE locations
        SET
        country=$1,
        city=$2
        WHERE location_id=$3
        RETURNING *`,
        [country, city, location_id]
      );
      res.json(updatedLocation.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteLocation(req, res) {
    try {
      const { locationId } = req.params;
      const delLocation = await db.query(
        `DELETE FROM locations
        WHERE location_id=$1
        RETURNING *`,
        [locationId]
      );
      res.json(delLocation.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LocationController();
