const usersService = require("../../services/users.service");
const prisma = require("../../prisma/client");

const mockUserResponse = {
  id: "62b8e15aa28fa69c8d4ad19e",
  email: "paquito@mail.com",
  username: "paquito",
  createdAt: "2022-06-26T22:44:42.179Z",
};
describe("UserService", () => {
  test("Should get all Users", async () => {
    jest
      .spyOn(prisma.user, "findMany")
      .mockImplementation(() => Promise.resolve([mockUserResponse]));
    const result = await usersService.findAll();

    expect(result).toBeDefined();
    expect(result.total).toBe(1);
    expect(result.users[0].username).toBe("paquito");
  });
  test("Should return error with no registers", async () => {
    jest
      .spyOn(prisma.user, "findMany")
      .mockImplementation(() => Promise.resolve(undefined));
    try {
      await usersService.findAll();
    } catch (error) {
      expect(error.status).toBeDefined();
      expect(error.status).toBe(404);
      expect(error.response.message).toBe("No users found");
    }
  });
  test("Should return find by any", async () => {
    jest
      .spyOn(prisma.user, "findFirst")
      .mockImplementation(() => Promise.resolve(mockUserResponse));
    const result = await usersService.findBy("id", "62b8e15aa28fa69c8d4ad19e");

    expect(result).toBeDefined();
    expect(result.username).toBe("paquito");
  });
  test("Should create a user", async () => {
    jest.spyOn(prisma.user, "create").mockImplementation((params) =>
      Promise.resolve({
        id: "62b8e15aa28fa69c8d4ad19e",
        username: params.data.username,
        email: params.data.email,
        password: params.data.password,
        createdAt: "2022-06-26T22:44:42.179Z",
      })
    );
    const result = await usersService.createUser({
      username: "carlitos",
      email: "carlitos@mail.com",
      password: "somepass",
    });

    expect(result).toBeDefined();
    expect(result.message).toBe("User carlitos was created successfully");
  });
});
