const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  const validateQuery = z.object({
    manufacture: z.string().optional(),
    model: z.string().optional(),
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
    //rentPerDay: z.number(),
    //capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    //available: z.boolean(), // Expect boolean instead of string
    type: z.string(),
    //year: z.number(),
    options: z.array(z.string()), // Expect array of strings
    specs: z.array(z.string()), // Expect array of strings
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
  req.body = {
    ...req.body,
    rentPerDay: Number(req.body.rentPerDay),
    capacity: Number(req.body.capacity),
    year: Number(req.body.year),
    available: req.body.available === "true",
    options: Array.isArray(req.body.options)
      ? req.body.options
      : [req.body.options],
    specs: Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs],
  };
  next();
};

exports.validateUpdateCar = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
    //rentPerDay: z.number().optional(),
    //capacity: z.number().optional(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string().optional(),
    //available: z.boolean(),
    type: z.string().optional(),
    //year: z.number().optional(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

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

  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    throw new BadRequestError(resultValidateFiles.error.errors);
  }
  req.body = {
    ...req.body,
    rentPerDay: Number(req.body.rentPerDay), 
    capacity: Number(req.body.capacity),
    year: Number(req.body.year),
    available: req.body.available === "true", 
    options: Array.isArray(req.body.options)
      ? req.body.options
      : [req.body.options], 
    specs: Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs],
  };

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
