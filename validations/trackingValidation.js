const Joi = require("joi");

const trackingValidation = (track) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  return schema.validate(track, { abortEarly: false });
};

module.exports = {
  trackingValidation,
};
