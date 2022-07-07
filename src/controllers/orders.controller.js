const {
  handleErrorResponse,
  handleResponse,
  isBodyEmpty,
} = require("../helpers/response.helper");
const { createOrderSchema } = require("../schemas/orders.schema");
const orderService = require("../services/orders.service");

async function create(req, res) {
  try {
    isBodyEmpty(req.body);
    const orderData = await createOrderSchema.validateAsync(req.body);
    handleResponse(res, 200, await orderService.create(orderData));
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

module.exports = {
  create,
};
