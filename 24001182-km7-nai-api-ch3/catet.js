const express = require("express"); //import express with non-module
require["express-async-errors"];
const uuid = require("uuid");
const fs = require("fs"); // import file system module
const { z } = require("zod");
const cars = require("./data/cars.json"); //import data car

// Standarize response
const successResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};

class BadRequestError extends Error {
  constructor(errors) {
    super("Validation failed!");
    this.errors = errors;
    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    if (message) {
      super(message);
    } else {
      super("Data is Not Found!");
    }
    this.status = 404;
  }
}

/*make initiate express application */
const app = express();
const port = 3000;

/* We need to activate body parser/reader */
app.use(express.json());

/*make a routing and response */
app.get("/", (req, res) => {
  res.send(`Ping Successfully!`);
});

app.get("/cars", (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
    rentPerDay: z.number().optional(),
    capacity: z.number().optional(),
    transmission: z.string().optional(),
    type: z.string().optional(),
    year: z.number().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.params);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  const searchedCar = cars.filter((car) => {
    // Do filter logic here
    let result = true;
    if (req.query.plate) {
      const isFoundPlate = car.plate
        .toLowerCase()
        .includes(req.query.plate.toLowerCase());
      result = result && isFoundPlate;
    }
    if (req.query.manufacture) {
      const isFoundManufacture = car.manufacture
        .toLowerCase()
        .includes(req.query.manufacture.toLowerCase());
      result = result && isFoundManufacture;
    }
    if (req.query.model) {
      const isFoundModel = car.model
        .toLowerCase()
        .includes(req.query.model.toLowerCase());
      result = result && isFoundModel;
    }
    if (req.query.rentPerDay) {
      const isFoundRentPerDay = car.rentPerDay;
      result = result && isFoundRentPerDay;
    }
    if (req.query.capacity) {
      const isFoundCapacity = car.capacity;
      result = result && isFoundCapacity;
    }
    if (req.query.transmission) {
      const isFoundTransmission = car.transmission
        .toLowerCase()
        .includes(req.query.transmission.toLowerCase());
      result = result && isFoundTransmission;
    }
    if (req.query.type) {
      const isFoundType = car.type
        .toLowerCase()
        .includes(req.query.type.toLowerCase());
      result = result && isFoundType;
    }
    if (req.query.year) {
      const isFoundYear = car.year;
      result = result && isFoundYear;
    }

    return result;
  });

  successResponse(res, searchedCar);
});

app.get("/cars/:id", (req, res) => {
  //make validation Schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // get the id from params
  const { id } = req.params;

  //find car by id
  const car = cars.find((car) => car.id == id);
  if (!car) {
    // If there is no car with the id that client request, it will response not found
    throw new NotFoundError("Student is Not Found!");
  }
  // If car has been found, it will be response the car data
  successResponse(res, car);
});

app.post("/cars", (req, res) => {
  // Validation body schema
  const validateBody = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
    rentPerDay: z.number().optional(),
    capacity: z.number().optional(),
    transmission: z.string().optional(),
    type: z.string().optional(),
    year: z.number().optional(),
  });

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  const uniqueId = uuid.v4();

  const newCar = {
    id: uniqueId,
    ...req.body,
  };
  /* Add data to current array cars */
  cars.push(newCar);

  // TODO: save the latest data to json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 2), "utf-8");

  successResponse(res, newCar);
});

app.put("/cars/:id", (req, res) => {
  // zod validation
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
    // return res.status(400).json({
    //   message: "Validation failed",
    //   errors: resultValidateParams.error.errors.map((err) => ({
    //     field: err.path[0],
    //     issue: err.message,
    //   })),
    // });
  }

  // Validation body schema
  const validateBody = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
    rentPerDay: z.number().optional(),
    capacity: z.number().optional(),
    transmission: z.string().optional(),
    type: z.string().optional(),
    year: z.number().optional(),
  });

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  // Find the existing car data
  const { id } = req.params;
  const car = cars.find((car) => car.id === id);
  if (!car) {
    throw new NotFoundError("Car is Not Found!");
    // return res.status(404).json({
    //   message: "Student not found!",
    // });
  }

  // Update the data
  Object.assign(car, resultValidateBody.data);

  // Update the json data
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  successResponse(res, car);
});

app.delete("/cars/:id", (req, res) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Get the id from params
  const { id } = req.params;

  // Find index
  const carIndex = cars.findIndex((car) => car.id == id);

  if (carIndex < 0) {
    // If no index found
    throw new NotFoundError("Car is Not Found!");
    // return res.status.json({ message: "Student not found!" });
  }

  // If the index found
  const deletedCar = cars.splice(carIndex, 1);

  // Update the json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  successResponse(res, deletedCar);
});

// This function is to handle error when API hit
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errors = err.errors || [];
  let message = err.message;
  if (status == 500) {
    message = "Internal Server Error";
  }

  res.status(status).json({
    success: false,
    data: null,
    message,
    errors,
  });
});

/*run the express.js apllication */
app.listen(port, () => {
  console.log(`The express.js app is runing on port ${port}`);
});
