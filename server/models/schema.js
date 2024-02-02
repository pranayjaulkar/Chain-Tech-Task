const Joi = require("joi");

const userSchema = Joi.object({
  _id: Joi.allow(),
  name: Joi.string().pattern(new RegExp("^[a-zA-Z]{1,20}$")).required(),
  username: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().valid("male", "female"),
  address: Joi.object({
    state: Joi.string().required(),
    city: Joi.string().required(),
    zipcode: Joi.string().required(),
  }),
  phone: Joi.string().required(),
  website: Joi.string().uri().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  createdAt: Joi.date().allow(),
});
module.exports = { postSchema, userSchema };
