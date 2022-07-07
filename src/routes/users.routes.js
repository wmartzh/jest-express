const router = require("express").Router();
const userController = require("../controllers/users.controller");

router.post("/", userController.registerUser);

module.exports = router;
