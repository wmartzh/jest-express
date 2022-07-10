const {
  handleErrorResponse,
  handleResponse,
  isBodyEmpty,
  CustomError,
} = require("../helpers/response.helper");
const {
  createOrderSchema,
  updateStateOrderSchema,
} = require("../schemas/orders.schema");
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

async function findAll(_req, res) {
  try {
    handleResponse(res, 200, await orderService.getAll());
  } catch (error) {
    handleErrorResponse(res, error);
  }
}
async function findOne(req, res) {
  try {
    if (!req.params["id"]) {
      throw new CustomError({
        status: 400,
        message: "Id is required",
      });
    }
    handleResponse(res, 200, await orderService.getById(req.params["id"]));
  } catch (error) {
    handleErrorResponse(res, error);
  }
}
async function updateState(req, res) {
  try {
    isBodyEmpty(req);
    const updateData = await updateStateOrderSchema.validateAsync(req.body);
    handleResponse(res, 200, await orderService.updateState(updateData));
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

module.exports = {
  create,
  findAll,
  updateState,
  findOne,
};
