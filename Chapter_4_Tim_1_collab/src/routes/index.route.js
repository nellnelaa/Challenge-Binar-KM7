const express = require("express");
const carsRouter = require("./cars.route");
const manufacturesRouter = require("./manufacture.route");
const specRouter = require("./specs.route");
const optionsRouter = require("./options.route");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/specs", specRouter);
router.use("/options", optionsRouter);
router.use("/manufactures", manufacturesRouter);

module.exports = router;
