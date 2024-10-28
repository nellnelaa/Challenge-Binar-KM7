const express = require("express");
const { authorization } = require("../middleware/auth");
const {
  validateGetCars,
  validateGetCarById,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCar,
} = require("../middleware/cars");
const {
  getCarsController,
  getCarByIdController,
  createCarController,
  updateCarController,
  deleteCarController,
} = require("../controllers/cars.controller");

const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetCars, getCarsController)
  .post(
    authorization(adminRole), validateCreateCar, createCarController
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    validateGetCarById,
    getCarByIdController
  )
  .put(authorization(adminRole), validateUpdateCar, updateCarController)
  .delete(authorization(adminRole), validateDeleteCar, deleteCarController);

module.exports = router;
