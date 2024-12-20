const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users");
const { imageUpload } = require("../utils/imageHandler");
const { Unauthorized } = require("../utils/request");

exports.register = async (data, file) => {
  const existingUser = await userRepository.getUserByEmail(data.email);
  if (existingUser) {
    throw new Unauthorized("Email sudah terdaftar!");
  }
  // if there are any file (profile picture)
  if (file.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  // create user
  const user = await userRepository.createUser(data);

  // generate token
  const token = createToken(user);

  // don't forget to remove the password object, if not removed it will be displayed in response
  delete user.password;

  // return the user info and the token
  return {
    user,
    token,
  };
};

exports.login = async (email, password) => {
  // get user by email
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Unauthorized("Email is not found!");
  }

  // compare the password
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Unauthorized("Incorrect password!");
  }

  // generate token
  const token = createToken(user);

  // don't forget to remove the password object, if not removed it will be displayed in response
  delete user.password;

  // return the user info and the token
  return {
    user,
    token,
  };
};

const createToken = (user) => {
  // generate token with jwt
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "72h", // expired in 3 days
  });

  return token;
};
