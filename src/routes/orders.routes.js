const router = require("express").Router();
const ordersController = require("../controllers/orders.controller");

router.get("/", ordersController.findAll);
router.post("/", ordersController.create);
router.post("/state", ordersController.updateState);
router.get("/:id", ordersController.findOne);

module.exports = router;
