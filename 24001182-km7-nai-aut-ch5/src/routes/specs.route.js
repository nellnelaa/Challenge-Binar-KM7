const express = require("express");
const { authorization } = require("../middleware/auth");
const {
  validateGetSpecs,
  validateGetSpecsById,
  validateCreateSpecs,
  validateUpdateSpecs,
  validateDeleteSpecs,
} = require("../middleware/specs");
const {
  getSpecsController,
  getSpecsByIdController,
  createSpecsController,
  updateSpecsController,
  deleteSpecsController,
} = require("../controllers/specs.controller");

const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetSpecs, getSpecsController)
  .post(authorization(adminRole), validateCreateSpecs, createSpecsController);

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    validateGetSpecsById,
    getSpecsByIdController
  )
  .put(authorization(adminRole), validateUpdateSpecs, updateSpecsController)
  .delete(authorization(adminRole), validateDeleteSpecs, deleteSpecsController);

module.exports = router;
