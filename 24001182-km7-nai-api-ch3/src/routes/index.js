const express = require("express");
const carsRouter = require("./cars");

const router = express.Router();

router.get("/cars", carsRouter);

module.exports = router;
