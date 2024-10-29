const express = require("express");
const {
  validateGetAllCars,
  validateGetCarbyId,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCarbyId,
} = require("../middlewares/cars");
const {
  getAllCars,
  getCarbyId,
  createCar,
  updateCar,
  deleteCarbyId,
} = require("../controllers/cars");
const { authorization } = require("../middlewares/auth");
const router = express.Router();
const { adminRole, userRole } = require("../constants/auth");

router.get(
  "/",
  authorization(adminRole, userRole),
  validateGetAllCars,
  getAllCars
);
router.post("/", authorization(adminRole), validateCreateCar, createCar);
router.get(
  "/:id",
  authorization(adminRole, userRole),
  validateGetCarbyId,
  getCarbyId
);
router.put("/:id", authorization(adminRole), validateUpdateCar, updateCar);
router.delete(
  "/:id",
  authorization(adminRole),
  validateDeleteCarbyId,
  deleteCarbyId
);

module.exports = router;
