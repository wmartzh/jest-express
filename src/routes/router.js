const router = require("express").Router();
const { authenticate } = require("../middlewares/auth.middleware");

const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");

router.use("/users", authenticate, usersRoutes);
router.use("/auth", authRoutes);

module.exports = router;
