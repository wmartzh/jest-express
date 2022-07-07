const {
  handleErrorResponse,
  handleResponse,
  isBodyEmpty,
} = require("../helpers/response.helper");
const { registerUserSchema } = require("../schemas/users.schema");
const userService = require("../services/users.service");
const registerUser = async (req, res) => {
  try {
    isBodyEmpty(req.body);
    const userData = await registerUserSchema.validateAsync(req.body);
    handleResponse(res, 200, await userService.createUser(userData));
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getAll = async (req, res) =>{
  
}

module.exports = {
  registerUser,
};
