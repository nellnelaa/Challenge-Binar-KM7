const carService = require("../services/cars");
const { successResponse } = require("../utils/response");
const { BadRequestError } = require("../utils/request");

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

  const resultValidateQuery = validateQuery.safeParse(req.params);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  successResponse(res, data);
};
