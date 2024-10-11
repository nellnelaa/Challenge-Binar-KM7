const carRepository = require("../repositories/cars");

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
  return carRepository.getCars(
    plate,
    manufacture,
    model,
    rentPerDay,
    capacity,
    transmission,
    type,
    year
  );
};