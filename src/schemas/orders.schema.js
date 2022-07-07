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

module.exports = {
  createOrderSchema,
};
