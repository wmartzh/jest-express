const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const { CustomError } = require("../helpers/response.helper");
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function createUser(newUser) {
  const { password, ...rest } = newUser;
  const hashPass = hashPassword(password);

  const userResponse = await prisma.user.create({
    data: { password: hashPass, ...rest },
  });

  return {
    message: `User ${userResponse.username} was created successfully`,
  };
}
async function findAll() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      password: false,
      email: true,
      username: true,
      createdAt: true,
    },
  });
  if (!users) {
    throw new CustomError({ status: 404, message: "No users found" });
  }
  return {
    users,
    total: users.length,
  };
}

module.exports = {
  createUser,
  findAll,
};
