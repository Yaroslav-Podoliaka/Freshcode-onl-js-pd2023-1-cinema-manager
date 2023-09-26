const { v4: uuidv4 } = require('uuid');

const movies = [
  {
    id: uuidv4(),
    title: "Avatar",
  },
  {
    id: uuidv4(),
    title: "I Am Legend",
  },
  {
    id: uuidv4(),
    title: "Aliens",
  },
  {
    id: uuidv4(),
    title: "Pirates of the Caribbean:",
  },
];

module.exports.getMovies = (req, res) => {
  res.status(200).send(movies);
};

module.exports.getMovieById = (req, res) => {
  const {params: {movieId}} = req;
  const [movie] = movies.filter((movie) => movie.id === movieId);
  if (movie){
    res.status(200).send(movie);
  }else{
    res.status(404).send('Movie not found');
  }
};
