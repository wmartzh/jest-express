const {
  handleErrorResponse,
  handleResponse,
  isBodyEmpty,
} = require("../helpers/response.helper");
const { registerUserSchema } = require("../schemas/users.schema");
const userService = require("../services/users.service");
async function registerUser(req, res) {
  try {
    isBodyEmpty(req.body);
    const userData = await registerUserSchema.validateAsync(req.body);
    handleResponse(res, 200, await userService.createUser(userData));
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

async function getAll(req, res) {
  try {
    handleResponse(res, 200, await userService.findAll());
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

module.exports = {
  registerUser,
  getAll,
};
