const Joi = require("joi");

module.exports.reviewValidation = (review) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(255),
    rating: Joi.number().min(1).max(10).required(),
  });
  return schema.validate(review, { abortEarly: false });
};
