const express = require("express");
const { authorization } = require("../middleware/auth");
const {
  validateGetOptions,
  validateGetOptionById,
  validateCreateOption,
  validateUpdateOption,
  validateDeleteOption,
} = require("../middleware/options");
const {
  getOptionsController,
  getOptionByIdController,
  createOptionController,
  updateOptionController,
  deleteOptionController,
} = require("../controllers/options.controller");

const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetOptions, getOptionsController)
  .post(authorization(adminRole), validateCreateOption, createOptionController);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetOptionById, getOptionByIdController)
  .put(authorization(adminRole), validateUpdateOption, updateOptionController)
  .delete( authorization(adminRole), validateDeleteOption, deleteOptionController);

module.exports = router;
