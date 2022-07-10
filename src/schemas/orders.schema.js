const Joi = require("joi");

const productSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required(),
  tax: Joi.number().required(),
  quantity: Joi.number().required(),
  description: Joi.string(),
});
const createOrderSchema = Joi.object({
  address: Joi.string().required(),
  shipping_fee: Joi.number().required(),
  products: Joi.array().items(productSchema).required().min(1),
});

const updateStateOrderSchema = Joi.object({
  orderId: Joi.string().required(),
  orderState: Joi.string().required(),
  comments: Joi.string(),
});

module.exports = {
  createOrderSchema,
  updateStateOrderSchema,
};
