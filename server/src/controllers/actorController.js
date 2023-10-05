// const { v4: uuidv4 } = require('uuid');
const db = require("../db");

// const actors = [
//   {
//     id: uuidv4(),
//     fullName: 'Harrison Ford',
//     birthYear: 1942,
//     nationality: 'USA',
//   },
//   {
//     id: uuidv4(),
//     fullName: 'Sigourney Weave',
//     birthYear: 1962,
//     nationality: 'USA',
//   },
//   {
//     id: uuidv4(),
//     fullName: 'Ian Holm',
//     birthYear: 1931,
//     nationality: 'United Kingdom',
//   },
//   {
//     id: uuidv4(),
//     fullName: 'Johnny Depp',
//     birthYear: 1963,
//     nationality: 'USA',
//   },
// ];

class ActorController {
  async getActors(req, res) {
    try {
      const actors = await db.query(
        `SELECT
        actor_id,
        full_name,
        birth_year,
        death_year,
        poster,
        nat.description AS nationality
        FROM actors
        JOIN nationalities AS nat
        USING (nationality_id)
        ORDER BY actor_id`
      );
      console.log(actors.rows);
      res.json(actors.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getActorById(req, res) {
    try {
      const { actorId } = req.params;
      const actor = await db.query(
        `SELECT 
        actor_id, 
        full_name, 
        birth_year,
        death_year,
        poster,
        nat.description AS nationality
        FROM actors
        JOIN nationalities AS nat
        USING (nationality_id)
        WHERE actor_id=$1`,
        [actorId]
      );
      console.log(actor.rows[0]);
      res.json(actor.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async createActor(req, res) {
    try {
      const {
        full_name,
        birth_year,
        death_year,
        nationality,
        poster
      } = req.body;
      const newActor = await db.query(
        `INSERT INTO actors
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
      res.json(newActor.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async updateActor(req, res) {
    try {
      const {
        full_name,
        birth_year,
        death_year,
        nationality,
        poster,
        actor_id
      } = req.body;
      const updatedActor = await db.query(
        `UPDATE actors
        SET
        full_name=$1,
        birth_year=$2,
        death_year=$3,
        nationality_id=(
          SELECT nationality_id
          FROM nationalities
          WHERE title=$4),
        poster=$5
        WHERE actor_id=$6
        RETURNING *`,
        [full_name, birth_year, death_year, nationality, poster, actor_id]
      );
      res.json(updatedActor.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteActor(req, res) {
    try {
      const { actorId } = req.params;
      const delActor = await db.query(
        `DELETE FROM actors
        WHERE actor_id=$1
        RETURNING *`,
        [actorId]
      );
      res.json(delActor.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ActorController();

// module.exports.getActors = (req, res) => {
//   res.status(200).send(actors);
// };

// module.exports.getActorById = (req, res) => {
//   // const {actorId} = req.params
//   const {params: {actorId}} = req;
//   const [actor] = actors.filter((actor) => actor.id === actorId);
//   if (actor){
//     res.status(200).send(actor);
//   }else{
//     res.status(404).send('Actor not found');
//   }
// };
