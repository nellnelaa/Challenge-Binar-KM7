const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
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

exports.getCarById = (id) => {
  const car = carRepository.getCarById(id);
  if (!car) {
    throw new NotFoundError("Car is Not Found!");
  }
  return car;
};

exports.createCar = async (data, file) => {
  // Upload file to image kit
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  // Create the data
  return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("car is not found!");
  }
  data = {
    ...existingCar,
    ...data,
  };
  //upload file to image kit
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  const updatedCar = carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update car!"]);
  }
  return updatedCar;
};

exports.deleteCarById = (id) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is not found!");
  }
  const deletedCar = carRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to delete car!"]);
  }
  return deletedCar;
};
