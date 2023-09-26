const { v4: uuidv4 } = require('uuid');

const actors = [
  {
    id: uuidv4(),
    fullName: 'Harrison Ford',
    birthYear: 1942,
    nationality: 'USA',
  },
  {
    id: uuidv4(),
    fullName: 'Sigourney Weave',
    birthYear: 1962,
    nationality: 'USA',
  },
  {
    id: uuidv4(),
    fullName: 'Ian Holm',
    birthYear: 1931,
    nationality: 'United Kingdom',
  },
  {
    id: uuidv4(),
    fullName: 'Johnny Depp',
    birthYear: 1963,
    nationality: 'USA',
  },
];

module.exports.getActors = (req, res) => {
  res.status(200).send(actors);
};

module.exports.getActorById = (req, res) => {
  // const {actorId} = req.params
  const {params: {actorId}} = req;
  const [actor] = actors.filter((actor) => actor.id === actorId);
  if (actor){
    res.status(200).send(actor);
  }else{
    res.status(404).send('Actor not found');
  }
};
