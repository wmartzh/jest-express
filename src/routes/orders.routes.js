const router = require("express").Router();
const ordersController = require("../controllers/orders.controller");

router.post("/", ordersController.create);

module.exports = router;
