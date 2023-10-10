const {ValidationError} = require('yup');

module.exports.validationErrorHandler = (err, req, res, next) => {
  if(err instanceof ValidationError){
    return res.status(418).send({
      errors: [{title:'Validation error', detalis: err.errors}],
    })
  }
  next(err);
}

module.exports.errorHandler = (err, req, res, next) => {
  if(res.headerSent){
    return;
  }
  res.status(err?.status ?? 500).send({
    errors: [{title: err?.message ?? 'Internal server error'}]
  });
}
