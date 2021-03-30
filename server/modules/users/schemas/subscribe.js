const Joi = require('joi');

export const subscribeSchema = Joi.object().keys({
  token: Joi.string().required().max(255),
});
