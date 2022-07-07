const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");

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
  const users = await prisma.user.findMany({});
  return users;
}

module.exports = {
  createUser,
  findAll,
};
