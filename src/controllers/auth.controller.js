const {
  handleErrorResponse,
  isBodyEmpty,
  handleResponse,
} = require("../helpers/response.helper");
const {
  loginUserSchema,
  registerUserSchema,
} = require("../schemas/users.schema");
const authService = require("../services/auth.service");
const userService = require("../services/users.service");

async function login(req, res) {
  try {
    isBodyEmpty(req.body);
    const loginData = await loginUserSchema.validateAsync(req.body);
    handleResponse(
      res,
      200,
      await authService.login(loginData.email, loginData.password)
    );
  } catch (error) {
    handleErrorResponse(res, error);
  }
}
async function registerUser(req, res) {
  try {
    isBodyEmpty(req.body);
    const userData = await registerUserSchema.validateAsync(req.body);
    handleResponse(res, 200, await userService.createUser(userData));
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

module.exports = {
  login,
  registerUser,
};
