const userService = require("../services/users.service");
const bcrypt = require("bcrypt");
const { CustomError } = require("../helpers/response.helper");
const jwt = require("jsonwebtoken");

const PRIVATE = process.env.APP_KEY;

function validateUser(user) {
  if (!user) {
    throw new CustomError({ status: 404, message: "user not found" });
  }
}
function validatePassword(password, hash) {
  const isValidPassword = bcrypt.compareSync(password, hash);
  if (!isValidPassword) {
    throw new CustomError({ status: 401, message: "wrong password" });
  }
}

function generateToken(user) {
  const payload = {
    email: user.email,
    key: userService.hashPassword(`${user.id}_${user.password}`),
  };
  return jwt.sign(payload, PRIVATE, {
    expiresIn: "1h",
  });
}

async function login(email, password) {
  const user = await userService.findBy("email", email);

  validateUser(user);
  validatePassword(password, user.password);

  const token = generateToken(user);

  return {
    access_token: token,
  };
}

module.exports = {
  PRIVATE,
  login,
};
