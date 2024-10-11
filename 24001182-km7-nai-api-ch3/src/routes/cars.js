const express = require("express");
const { validateGetCars } = require("../middlewares/cars");
const { getCars } = require("../controllers/cars");

const router = express.Router();

router.get("/", validateGetCars, getCars);

module.exports = router;
