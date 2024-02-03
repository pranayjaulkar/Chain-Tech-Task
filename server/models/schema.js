const Joi = require("joi");

const userSchema = Joi.object({
  _id: Joi.allow(),
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  age: Joi.number().required(),
  gender: Joi.string().valid("male", "female"),
  address: Joi.object({
    state: Joi.string().required(),
    city: Joi.string().required(),
    zipcode: Joi.string().required(),
  }),
  phone: Joi.string().required(),
  website: Joi.string().uri().required(),
  password: Joi.string().required(),
  createdAt: Joi.date().allow(),
  __v: Joi.allow(),
});
module.exports = { userSchema };
