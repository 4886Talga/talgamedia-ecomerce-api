const Joi = require("joi");

const profileValidation = (profile) => {
  console.log(profile);
  const schema = Joi.object({
    phone: Joi.string().min(8).max(255),
    address: Joi.string().min(5).max(255),
    firstName: Joi.string().min(2).max(255),
    lastName: Joi.string().min(2).max(255),
    image: Joi.string().min(3).max(255),
  });
  return schema.validate(profile, { abortEarly: false });
};

const profileUpdationValidation = (profile) => {
  const schema = Joi.object({
    phone: Joi.string().min(8).max(255),
    address: Joi.string().min(5).max(255),
    firstName: Joi.string().min(2).max(255),
    lastName: Joi.string().min(2).max(255),
    image: Joi.string().min(3).max(255),
  });
  return schema.validate(profile, { abortEarly: false });
};

module.exports = {
  profileValidation,
  profileUpdationValidation,
};
