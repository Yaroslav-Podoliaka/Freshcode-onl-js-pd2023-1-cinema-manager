const { v4: uuidv4 } = require('uuid');

const studios = [
  {
    id: uuidv4(),
    title: "Lucasfilm Ltd. LLC",
    location: "San Francisco",
    foundationYear: "1971",
  },
  {
    id: uuidv4(),
    title: "20th Century Studios, Inc.",
    location: "Los Angeles",
    foundationYear: "1935",
  },
  {
    id: uuidv4(),
    title: "Columbia Pictures",
    location: "Culver City",
    foundationYear: "1924",
  },
  {
    id: uuidv4(),
    title: "Metro-Goldwyn-Mayer",
    location: "Los Angeles",
    foundationYear: "1924",
  },
];

module.exports.getStudios = (req, res) => {
  res.status(200).send(studios);
};

module.exports.getStudioById = (req, res) => {
  const {params: {studioId}} = req;
  const [studio] = studios.filter((studio) => studio.id === studioId);
  if (studio){
    res.status(200).send(studio);
  }else{
    res.status(404).send('Studio not found');
  }
};
