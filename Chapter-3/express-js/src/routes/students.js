const express = require("express");
const {
  validateGetStudents,
  validateGetStudentById,
  validateCreateStudent,
  validateUpdateStudent,
  validateDeleteStudentById,
} = require("../middlewares/students");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudentById,
} = require("../controllers/students");

const router = express.Router();

// It will be run the URL based on path and the method
router
    .route("/")
    .get(validateGetStudents, getStudents)
    .post(validateCreateStudent, createStudent);

router
    .route("/:id")
    .get(validateGetStudentById, getStudentById)
    .put(validateUpdateStudent, updateStudent)
    .delete(validateDeleteStudentById, deleteStudentById);

module.exports = router;
