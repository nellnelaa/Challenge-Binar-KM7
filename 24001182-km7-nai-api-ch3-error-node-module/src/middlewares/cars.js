const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
    rentPerDay: z.coerce.number().optional(), // Ensure it's treated as a number
    capacity: z.coerce.number().optional(), // Ensure capacity is treated as a number
    transmission: z.string().optional(),
    type: z.string().optional(),
    year: z.coerce.number().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.params);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetCarById = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateCar = (req, res, next) => {


  // Validation body schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.string(),
    type: z.string(),
    year: z.number(),
    options: z.string(),
    specs: z.string(),
  });

  // The file is not required
  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }
  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }
  next();
};

exports.validateUpdateCar = (req, res, next) => {
  // zod validation
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  // Validation body schema
  const validateBody = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
    rentPerDay: z.number().optional(),
    capacity: z.number().optional(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string().optional(),
    available: z.string(),
    type: z.string().optional(),
    year: z.number().optional(),
    options: z.string(),
    specs: z.string(),
  });

  // The file is not required
  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }


  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  //make validation Schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }
  next();
};
