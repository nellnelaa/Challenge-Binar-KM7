const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getStudents = async (name, nickName) => {
  // Define query here
  let query = {
    include: {
      classes: true,
      universities: true,
    },
  };

  // It will generate the query
  let orQuery = [];
  if (name) {
    orQuery.push({
      name: { contains: name, mode: "insensitive" },
    });
  }
  if (nickName) {
    orQuery.push({
      nick_name: { contains: nickName, mode: "insensitive" },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedStudents = await prisma.students.findMany(query);

  const serializedStudents = JSONBigInt.stringify(searchedStudents);
  return JSONBigInt.parse(serializedStudents);
};

exports.getStudentById = async (id) => {
  const student = await prisma.students.findFirst({
    where: {
      id: id,
    },
  });

  const serializedStudents = JSONBigInt.stringify(student);
  return JSONBigInt.parse(serializedStudents);
};

exports.createStudent = async (data) => {
  const newStudent = await prisma.students.create({
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudents);
};

exports.updateStudent = async (id, data) => {
  const updatedStudent = await prisma.students.update({
    where: {
      id: (id),
    },
    data,
  });

  const serializedStudents = JSONBigInt.stringify(updatedStudent);
  return JSONBigInt.parse(serializedStudents);
};

exports.deleteStudentById = async (id) => {
  // Find the student by ID
  const student = await prisma.students.findFirst({
    where: {
      id: id,
    },
  });

  if (!student) {
    return null; // If student not found
  }

  // Delete the student from the database
  const deletedStudent = await prisma.students.delete({
    where: {
      id: id,
    },
  });

  const serializedDeletedStudent = JSONBigInt.stringify(deletedStudent);
  return JSONBigInt.parse(serializedDeletedStudent);
};
