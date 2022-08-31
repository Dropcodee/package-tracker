import Joi from 'joi';

const create = Joi.object({
  description: Joi.string().required(),
  weight: Joi.number().required(),
  width: Joi.number().required(),
  height: Joi.number().required(),
  depth: Joi.number().required(),
  from_name: Joi.string().required(),
  from_address: Joi.string().required(),
  from_location: Joi.object().required(),
  to_name: Joi.string().required(),
  to_address: Joi.string().required(),
  to_location: Joi.object().required(),
});

export default { create };
