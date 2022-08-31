import constants from '@/utils/constants';
import Joi from 'joi';

const deliveryStatus = {
  OPEN: constants.DELIVERY_STATUS.OPEN,
  PICKUP: constants.DELIVERY_STATUS.PICKED_UP,
  TRANSIT: constants.DELIVERY_STATUS.IN_TRANSIT,
  DELIVERED: constants.DELIVERY_STATUS.DELIVERED,
  FAILED: constants.DELIVERY_STATUS.FAILED,
};

const create = Joi.object({
  package_id: Joi.string().required(),
  pickup_time: Joi.string().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  location: Joi.object().required(),
});

const update = Joi.object({
  pickup_time: Joi.string().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  location: Joi.object().required(),
  status: Joi.string()
    .required()
    .valid(...Object.values(deliveryStatus)),
});

export default { create, update };
