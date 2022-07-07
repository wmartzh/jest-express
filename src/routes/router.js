const router = require("express").Router();
const { authenticate } = require("../middlewares/auth.middleware");

const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");
const ordersRoutes = require("./orders.routes");

router.use("/orders", authenticate, ordersRoutes);
router.use("/users", authenticate, usersRoutes);
router.use("/auth", authRoutes);

module.exports = router;
