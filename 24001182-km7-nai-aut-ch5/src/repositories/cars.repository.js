const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getCarsRepo = async (capacity, availableAt, transmission) => {
  let query = {
    include: {
      manufactures: true,
      models: true,
      availability: true,
      car_details: true,
      options: {
        include: {
          option_details: true,
        },
      },
      specs: {
        include: {
          spec_details: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
    where: {},
  };

  if (capacity) {
    query.where.car_details = {
      some: {
        capacity: parseInt(capacity),
      },
    };
  }

  if (availableAt) {
    query.where.availability = {
      available_at: availableAt,
    };
  }

  if (transmission) {
    if (query.where.car_details) {
      query.where.car_details.some.transmission = transmission;
    } else {
      query.where.car_details = {
        some: {
          transmission: transmission,
        },
      };
    }
  }

  const searchedCars = await prisma.cars.findMany(query);
  const serializedCars = JSONBigInt.stringify(searchedCars);

  return JSONBigInt.parse(serializedCars);
};

const getCarByIdRepo = async (id) => {
  const cars = await prisma.cars.findFirst({
    where: {
      id: id,
    },
    include: {
      manufactures: true,
      models: true,
      availability: true,
      car_details: true,
      options: {
        include: {
          option_details: true,
        },
      },
      specs: {
        include: {
          spec_details: true,
        },
      },
    },
  });
  const serializedCars = JSONBigInt.stringify(cars);
  return JSONBigInt.parse(serializedCars);
};

const createCarRepo = async (manufacture_id, model_id, availability_id) => {
  const newCar = await prisma.cars.create({
    data: {
      manufacture_id,
      model_id,
      availability_id,
    },
  });
  const serializedCars = JSONBigInt.stringify(newCar);
  return JSONBigInt.parse(serializedCars);
};

const updateCarRepo = async (id, manufacture_id, model_id, availability_id) => {
  const updatedCar = await prisma.cars.update({
    where: { id },
    data: {
      manufacture_id,
      model_id,
      availability_id,
    },
  });
  const serializedCars = JSONBigInt.stringify(updatedCar);
  return JSONBigInt.parse(serializedCars);
};

const deleteCarRepo = async (id) => {
  const deletedCar = await prisma.cars.delete({
    where: { id },
  });
  const serializedCars = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedCars);
};

module.exports = {
  getCarsRepo,
  getCarByIdRepo,
  createCarRepo,
  updateCarRepo,
  deleteCarRepo,
};
