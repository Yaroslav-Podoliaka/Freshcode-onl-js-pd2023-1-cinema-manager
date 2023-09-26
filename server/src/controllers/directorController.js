const { v4: uuidv4 } = require('uuid');

const directors = [
  {
    id: uuidv4(),
    fullName: "Steven Spielberg",
    birthYear: "1946",
    nationality: "USA",
  },
  {
    id: uuidv4(),
    fullName: "Ridley Scott",
    birthYear: "1937",
    nationality: "UK",
  },
  {
    id: uuidv4(),
    fullName: "James Cameron",
    birthYear: "1954",
    nationality: "Canada",
  },
  {
    id: uuidv4(),
    fullName: "Neil Patrick Jordan",
    birthYear: 1950,
    nationality: "Ireland",
  },
];

module.exports.getDirectors = (req, res) => {
  res.status(200).send(directors);
};

module.exports.getDirectorById = (req, res) => {
  const {params: {directorId}} = req;
  const [director] = directors.filter((director) => director.id === directorId);
  if(director){
    res.status(200).send(director);
  }else{
    res.status(404).send('Director not found');
  }
}
