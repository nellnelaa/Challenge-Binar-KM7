const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = (req, res, next) => {
  // call the usecase of service
  // const rentPerDay = req.query?.rentPerDay
  //   ? parseInt(req.query.rentPerDay, 10)
  //   : null;
  // const capacity = req.query?.capacity
  //   ? parseInt(req.query.capacity, 10)
  //   : null;
  // const year = req.query?.year ? parseInt(req.query.year, 10) : null;

  const data = carService.getCars(
    req.query?.plate,
    req.query?.manufacture,
    req.query?.model,
    req.query?.rentPerDay,
    req.query?.capacity,
    req.query?.transmission,
    req.query?.type,
    req.query?.year
  );
  successResponse(res, data);
};

exports.getCarById = (req, res, next) => {
  const { id } = req.params;
  const data = carService.getCarById(id);
  successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  try {
    const data = await carService.createCar(req.body, req.files);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};


exports.updateCar = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  const requestBody = {
    ...req.body,
    rentPerDay: parseInt(req.body.rentPerDay),
    capacity: parseInt(req.body.capacity),
    available: req.body.available === "true",
    year: parseInt(req.body.year),

    // Check if options and specs are valid JSON strings
    options: req.body.options
      ? isValidJSON(req.body.options)
        ? JSON.parse(req.body.options)
        : req.body.options
      : [],
    specs: req.body.specs
      ? isValidJSON(req.body.specs)
        ? JSON.parse(req.body.specs)
        : req.body.specs
      : [],
  };

  const data = await carService.updateCar(id, requestBody, req.files);
  successResponse(res, data);
};

// Helper function to check if string is a valid JSON
const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

exports.deleteCarById = (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = carService.deleteCarById(id);
  successResponse(res, data);
};
