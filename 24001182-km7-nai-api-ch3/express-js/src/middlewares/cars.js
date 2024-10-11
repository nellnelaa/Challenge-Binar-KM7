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
  req.body = {
    ...req.body,
    rentPerDay: Number(req.body.rentPerDay), // Convert rentPerDay to number
    capacity: Number(req.body.capacity), // Convert capacity to number
    year: Number(req.body.year), // Convert year to number
    available: req.body.available === "true", // Convert available to boolean
    options: Array.isArray(req.body.options)
      ? req.body.options
      : [req.body.options], // Convert options to array
    specs: Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs],
  };
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
    available: z.boolean(), // Expect boolean instead of string
    type: z.string(),
    year: z.number(),
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
  next();
};

exports.validateUpdateCar = (req, res, next) => {
  // Konversi tipe data dari string ke number atau boolean sebelum validasi
  req.body.rentPerDay = req.body.rentPerDay
    ? parseInt(req.body.rentPerDay, 10)
    : undefined;
  req.body.capacity = req.body.capacity
    ? parseInt(req.body.capacity, 10)
    : undefined;
  req.body.year = req.body.year ? parseInt(req.body.year, 10) : undefined;
  req.body.available = req.body.available === "true";

  // Jika options dan specs array, konversikan ke array jika belum
  if (typeof req.body.options === "string") {
    req.body.options = JSON.parse(req.body.options);
  }
  if (typeof req.body.specs === "string") {
    req.body.specs = JSON.parse(req.body.specs);
  }

  // Lanjutkan dengan validasi zod
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
    rentPerDay: z.number().optional(),
    capacity: z.number().optional(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string().optional(),
    available: z.boolean(),
    type: z.string().optional(),
    year: z.number().optional(),
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
