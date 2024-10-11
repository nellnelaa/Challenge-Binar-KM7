const cars = require("../../data/cars.json");

exports.getCars = (plate, manufacture, model, rentPerDay, capacity, transmission, type, year) => {
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
    if (capacity) {
      const isFoundCapacity = car.capacity;
      result = result && isFoundCapacity;
    }
    if (transmission) {
      const isFoundTransmission = car.transmission
        .toLowerCase()
        .includes(transmission.toLowerCase());
      result = result && isFoundTransmission;
    }
    if (type) {
      const isFoundType = car.type
        .toLowerCase()
        .includes(type.toLowerCase());
      result = result && isFoundType;
    }
    if (year) {
      const isFoundYear = car.year;
      result = result && isFoundYear;
    }

    return result;
  });
  return searchedCar;
};
