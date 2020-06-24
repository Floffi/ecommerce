const joi = require('@hapi/joi');

// Schemas
const register = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(6).max(32),
  confirmPassword: joi.any().valid(joi.ref('password')).required(),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(6).max(32),
});

const category = joi.object({
  name: joi.string().required('Name is required').min(2).max(20),
});

exports.schemas = {
  register,
  login,
  category,
};

exports.validate = (schema, prop) => (req, res, next) => {
  const { error } = schema.validate(req[prop], { abortEarly: false });
  if (error) {
    const err = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});
    console.log(err);
    return res.status(422).json({
      status: 'failure',
      error: err,
    });
  }
  next();
};
