const ManufactureRepository = require("../repositories/manufacture.repository");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getManufactures = async (name) => {
  return ManufactureRepository.getManufactures(name);
};

exports.getManufactureById = async (id) => {
  const Manufactures = await ManufactureRepository.getManufactureById(id);
  if (!Manufactures) {
    throw new NotFoundError("Manufactures is Not Found!");
  }

  return Manufactures;
};

exports.createManufacture = async (data) => {
  return ManufactureRepository.createManufacture(data);
};

exports.updateManufacture = async (id, data) => {
  // find student is exist or not (validate the data)
  const existingManufactures = ManufactureRepository.getManufactureById(id);
  if (!existingManufactures) {
    throw new NotFoundError("Manufactures is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingManufactures, // existing Student
    ...data,
  };

  // if exist, we will update the student data
  const updatedManufactures = ManufactureRepository.updateManufacture(id, data);
  if (!updatedManufactures) {
    throw new InternalServerError(["Failed to update Manufactures!"]);
  }

  return updatedManufactures;
};

exports.deleteManufactureById = async (id) => {
  // find Manufactures is exist or not (validate the data)
  const existingManufactures = await ManufactureRepository.getManufactureById(
    id
  );
  if (!existingManufactures) {
    throw new NotFoundError("Manufactures is Not Found!");
  }

  // if exist, we will delete the Manufactures data
  const deletedManufactures = await ManufactureRepository.deleteManufactureById(
    id
  );
  if (!deletedManufactures) {
    throw new InternalServerError(["Failed to delete Manufactures!"]);
  }

  return deletedManufactures;
};
