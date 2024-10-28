const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetStudents,
  validateGetStudentById,
  validateDeleteStudentById,
  validateCreateStudent,
  validateUpdateStudent,
} = require("../middlewares/students");
const {
  getStudents,
  getStudentById,
  deleteStudentById,
  createStudent,
  updateStudent,
} = require("../controllers/students");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetStudents, getStudents)
  .post(authorization(adminRole), validateCreateStudent, createStudent);

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    validateGetStudentById,
    getStudentById
  )
  .put(authorization(adminRole), validateUpdateStudent, updateStudent)
  .delete(
    authorization(adminRole),
    validateDeleteStudentById,
    deleteStudentById
  );

module.exports = router;
