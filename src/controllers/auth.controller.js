const {
  handleErrorResponse,
  isBodyEmpty,
  handleResponse,
} = require("../helpers/response.helper");
const { loginUserSchema } = require("../schemas/users.schema");
const authService = require("../services/auth.service");

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

module.exports = {
  login,
};
