const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getStudents = async (name, nick_name) => {
  return studentRepository.getStudents(name, nick_name);
};

exports.getStudentById = async (id) => {
  const student = await studentRepository.getStudentById(id);
  if (!student) {
    throw new NotFoundError("Student is Not Found!");
  }
  return student;
};

exports.createStudent = async (data, file) => {
  // Upload file to image kit
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }
  return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
  // Find student, check if exists
  const existingStudent = await studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  data = {
    ...existingStudent,
    ...data,
  };

  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  const updatedStudent = await studentRepository.updateStudent(id, data);
  if (!updatedStudent) {
    throw new InternalServerError("Failed to update student!");
  }
  return updatedStudent;
};

exports.deleteStudentById = async (id) => {
  const existingStudent = await studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is not found!");
  }

  const deletedStudent = await studentRepository.deleteStudentById(id);
  if (!deletedStudent) {
    throw new InternalServerError(["Failed to delete student!"]);
  }
  return deletedStudent;
};


