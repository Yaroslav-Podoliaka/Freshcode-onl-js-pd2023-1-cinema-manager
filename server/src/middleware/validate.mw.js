// const yup = require('yup');
// const createError = require('http-errors');
const { PERSON_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
const { TITLE_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
const { LOCATION_VALIDATION_SCHEMA } = require('../utils/validationSchemas');

module.exports.validateTitle = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedTitle = await TITLE_VALIDATION_SCHEMA
    .validate(body,{abortEarly: false});
    req.body = validatedTitle;
    next();
  } catch (error) {
    next(`Error is: ${error.errors}, ${error.name}`);
  }
};

module.exports.validateLocation = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedLocation = await LOCATION_VALIDATION_SCHEMA
    .validate(body,{abortEarly: false});
    req.body = validatedLocation;
    next();
  } catch (error) {
    next(`Error is: ${error.errors}, ${error.name}`);
  }
};

module.exports.validatePerson = async (req, res, next) => {
  const { body } = req;

  // const PERSON_VALIDATION_SCHEMA = yup.object().shape({
  //   full_name: yup.string().trim().min(3).max(30).required(),
  //   birth_year: yup.number().trim().min(1900).max(2021).required(),
  //   // death_year: yup.number().trim().min(1900).max(2023).required(),
  // });

  // Async-await
  try {
    const validatedPerson = await PERSON_VALIDATION_SCHEMA
    .validate(body, {abortEarly: false});
    req.body = validatedPerson;
    next();
  } catch (error) {
    next(`Error is: ${error.errors}, ${error.name}`);
  }

  // isValid
  // if(await PERSON_VALIDATION_SCHEMA.isValid(body)){
  //   return next();
  // }
  // next(createError(500, 'Server error'));

  // Promice
  // PERSON_VALIDATION_SCHEMA.validate(body, {abortEarly: false})
  // .then((validatedPerson) => {
  //   req.body = validatedPerson;
  //   next();
  // })
  // .catch((error) => {
  //   // res.status(500).send(error.message);
  //   next(`Error is: ${error.errors}, ${error.name}`);
  // });
};
