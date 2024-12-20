const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = (req, res, next) => {
  const rentPerDay = req.query?.rentPerDay
    ? parseInt(req.query.rentPerDay, 10)
    : null;
  const capacity = req.query?.capacity
    ? parseInt(req.query.capacity, 10)
    : null;
  const year = req.query?.year ? parseInt(req.query.year, 10) : null;

  const data = carService.getCars(
    req.query?.plate,
    req.query?.manufacture,
    req.query?.model,
    rentPerDay,
    capacity,
    req.query?.transmission,
    req.query?.type,
    year
  );
  successResponse(res, data);
};

exports.getCarById = (req, res, next) => {
  const { id } = req.params;
  const data = carService.getCarById(id);
  successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
  // Create the new car
  const data = await carService.createCar(req.body, req.files);
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
