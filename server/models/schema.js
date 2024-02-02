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
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  createdAt: Joi.date().allow(),
});
module.exports = { userSchema };
