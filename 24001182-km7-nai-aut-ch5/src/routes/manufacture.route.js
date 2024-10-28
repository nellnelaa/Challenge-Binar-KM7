const express = require("express");
const { authorization } = require("../middleware/auth");
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
  validateDeleteManufactureById,
} = require("../middleware/manufacture.middleware");
const {
  getManufactures,
  getManufactureById,
  createManufacture,
  updateManufacture,
  deleteManufactureById,
} = require("../controllers/manufacture.controller");

const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, userRole),
    validateGetManufactures,
    getManufactures
  )
  .post(authorization(adminRole), validateCreateManufacture, createManufacture);

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    validateGetManufactureById,
    getManufactureById
  )
  .put(authorization(adminRole), validateUpdateManufacture, updateManufacture)
  .delete(
    authorization(adminRole),
    validateDeleteManufactureById,
    deleteManufactureById
  );

module.exports = router;
