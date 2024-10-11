const studentService = require("../services/students");
const { successResponse } = require("../utils/response");

exports.getStudents = (req, res, next) => {
  // call the usecase of service
  const data = studentService.getStudents(
    req.query?.name,
    req.query?.nickName,
    req.query?.bachelor
  );
  successResponse(res, data);
};

exports.getStudentById = (req, res, next) => {
  const { id } = req.params;
  const data = studentService.getStudentById(id);
  successResponse(res, data);
};

exports.createStudent = async (req, res, next) => {
  // Convert to student data format
  const requestBody = {
    ...req.body,
    address: {
      province: req.body["address.province"],
      city: req.body["address.city"],
    },
    education: {
      bachelor: req.body["education.bachelor"],
    },
  };
  delete requestBody["address.province"];
  delete requestBody["address.city"];
  delete requestBody["education.bachelor"];

  // Create the new student
  const data = await studentService.createStudent(requestBody, req.files);
  successResponse(res, data);
};

exports.updateStudent = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  console.log(req.body);
  //  const requestBody = {
  //    ...req.body,
  //    address: {
  //      province: req.body["address.province"],
  //      city: req.body["address.city"],
  //    },
  //    education: {
  //      bachelor: req.body["education.bachelor"],
  //    },
  //  };
  //  delete requestBody["address.province"];
  //  delete requestBody["address.city"];
  //  delete requestBody["education.bachelor"];
   
  const data = await studentService.updateStudent(id, req.body, req.files);
  successResponse(res, data);
};

exports.deleteStudentById = (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = studentService.deleteStudentById(id);
  successResponse(res, data);
};