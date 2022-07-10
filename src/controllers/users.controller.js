const {
  handleErrorResponse,
  handleResponse,
} = require("../helpers/response.helper");
const userService = require("../services/users.service");

async function getAll(_req, res) {
  try {
    handleResponse(res, 200, await userService.findAll());
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

module.exports = {
  getAll,
};
