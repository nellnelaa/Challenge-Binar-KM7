const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = (req, res, next) => {
  // call the usecase of service
  const data = carService.getCars(
    req.body?.plate,
    req.body?.manufacture,
    req.body?.model,
    req.body?.rentPerDay,
    req.body?.capacity,
    req.body?.transmission,
    req.body?.type,
    req.body?.year
  );
  successResponse(res, data);
};

exports.getCarById = (req, res, next) => {
  const { id } = req.params;
  const data = carService.getCarById(id);
  successResponse(res, data);
};

exports.createCar = async (req, res, next) => {

  // Create the new student
  const data = await studentService.createStudent(req.body, req.files);
  successResponse(res, data);
};

exports.updateCar = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  const data = await carService.updateCar(id, req.body, req.files);
  successResponse(res, data);
};

exports.deleteCarById = (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = carService.deleteCarById(id);
  successResponse(res, data);
};
