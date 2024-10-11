const fs = require("fs");
const uuid = require("uuid");
const cars = require("../../data/cars.json");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = (
  plate,
  manufacture,
  model,
  rentPerDay,
  capacity,
  transmission,
  type,
  year
) => {
  const searchedCar = cars.filter((car) => {
    let result = true;
    if (plate) {
      const isFoundPlate = car.plate
        .toLowerCase()
        .includes(plate.toLowerCase());
      result = result && isFoundPlate;
    }
    if (manufacture) {
      const isFoundManufacture = car.manufacture
        .toLowerCase()
        .includes(manufacture.toLowerCase());
      result = result && isFoundManufacture;
    }
    if (model) {
      const isFoundModel = car.model
        .toLowerCase()
        .includes(model.toLowerCase());
      result = result && isFoundModel;
    }
    if (rentPerDay) {
      const isFoundRentPerDay = car.rentPerDay;
      result = result && isFoundRentPerDay;
    }
    if (transmission) {
      const isFoundTransmission = car.transmission
        .toLowerCase()
        .includes(transmission.toLowerCase());
      result = result && isFoundTransmission;
    }
    if (type) {
      const isFoundType = car.type.toLowerCase().includes(type.toLowerCase());
      result = result && isFoundType;
    }
    if (year) {
      const isFoundYear = car.year;
      result = result && isFoundYear;
    }
    if (capacity !== null && capacity !== undefined) {
      result = result && car.capacity > capacity; // Only show cars with capacity greater than the requested capacity
    }

    return result;
  });
  return searchedCar;
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
  fs.writeFileSync(
    "./data/cars.json",
    JSON.stringify(cars, null, 4),
    "utf-8"
  );
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
  fs.writeFileSync(
    "./data/cars.json",
    JSON.stringify(cars, null, 4),
    "utf-8"
  );
  return deletedCar;
};
