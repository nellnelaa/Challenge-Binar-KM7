const express = require("express");
const {
  validateGetCars,
  validateGetCarById,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCarById,
} = require("../middlewares/cars");
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCarById,
} = require("../controllers/cars");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetCars, getCars)
  .post(validateCreateCar, createCar);

router
  .route("/:id")
  .get(validateGetCarById, getCarById)
  .put(validateUpdateCar, updateCar)
  .delete(validateDeleteCarById, deleteCarById);

module.exports = router;
