const jwt = require("jsonwebtoken");
const userService = require("../services/users.service");
const { PRIVATE } = require("../services/auth.service");
function validateHeaders(req, res) {
  if (!req.headers.authorization) {
    res.status(401).json({
      error: "Authentication required",
    });
  }
}

function getHeaderToken(header, res) {
  const splitHeader = header.split(" ");
  if (splitHeader[0] !== "Bearer") {
    res.status(400).json({
      error: "Bad Token type ",
    });
    return;
  }
  return splitHeader[1];
}
async function setHeader(req, email) {
  if (!req.user) {
    const user = await userService.findBy("email", email);
    const { password, ...rest } = user;
    req["user"] = { ...rest };
  }
}

function deleteUserFromRequest(req) {
  if (req.user) {
    delete req.user;
  }
}

async function authenticate(req, res, next) {
  validateHeaders(req, res);

  const { authorization } = req.headers;
  const token = getHeaderToken(authorization);
  const payload = jwt.verify(token, PRIVATE);

  if (!payload) {
    deleteUserFromRequest(req);
    res.status(401).json({
      error: "Unauthorized",
    });
  }
  await setHeader(req, payload.email);

  next();
}

module.exports = {
  authenticate,
};
