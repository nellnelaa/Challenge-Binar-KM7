const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCars = async (manufactureName, modelName) => {
  // Define query here
  let query = {
    include: {
      manufactures: true, // Include data from the manufactures table
      models: true, // Include data from the models table
      availability: true, // Include data from the availability table
      car_details: true, // Include data from the car_details table
      options: {
        include: {
          option_details: true, // Include data from option_details via options table
        },
      },
      specs: {
        include: {
          spec_details: true, // Include data from spec_details via specs table
        },
      },
    },
  };

  // It will generate the query
  let andQuery = [];
  if (manufactureName) {
    andQuery.push({
      manufactures: {
        name: { contains: manufactureName, mode: "insensitive" },
      },
    });
  }
  if (modelName) {
    andQuery.push({
      models: { model: { contains: modelName, mode: "insensitive" } },
    });
  }
  if (andQuery.length > 0) {
    query.where = {
      ...query.where,
      AND: andQuery,
    };
  }

  const searchedCars = await prisma.cars.findMany(query);

  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.getCarById = (id) => {
  const car = cars.find((car) => car.id == id);
  return car;
};

exports.createCar = (data) => {
  const uniqueId = uuid.v4();

  const newCar = {
    id: uniqueId,
    ...data,
  };

  cars.push(newCar);

  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 2), "utf-8");
  return newCar;
};

exports.updateCar = (id, data) => {
  const car = cars.find((car) => car.id === id);
  if (!car) {
    throw new NotFoundError("Car is Not Found!");
  }
  Object.assign(car, data);

  // Update the json data
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");
  return car;
};

exports.deleteCarById = (id) => {
  // Find index
  const carIndex = cars.findIndex((car) => car.id == id);

  if (carIndex < 0) {
    // If no index found
    return null;
  }

  const deletedCar = cars.splice(carIndex, 1);

  // Update the json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");
  return deletedCar;
};
