const yup = require('yup');

module.exports.PERSON_VALIDATION_SCHEMA = yup.object().shape({
  full_name: yup.string().trim().min(3).max(30).required(),
  birth_year: yup.number(),
  // death_year: yup.number()
});

module.exports.TITLE_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().trim().min(3).max(50).required()
});

module.exports.LOCATION_VALIDATION_SCHEMA = yup.object().shape({
  country: yup.string().trim().min(2).max(30),
  city: yup.string().trim().min(3).max(30)
});
