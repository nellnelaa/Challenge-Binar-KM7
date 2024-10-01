const express = require("express"); //import express with non-module
const fs = require("fs"); // import file system module
const students = require("./data/students.json"); //import data student

/*make initiate express application */
const app = express();
const port = 4000;

/* We need to activate body parser/reader */
app.use(express.json());

/*make a routing and response */
app.get("/", (req, res) => {
  res.send(`Hello world, I am using nodemon!`);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  // get the id from params
  const { id } = req.params;

  //find student by id
  const student = students.find((student) => student.id == id);
  // If student has been found, it will be response the student data
  if (student) {
    res.json(student);
    return;
  }

  // If there is no student with the id that client request, it will response not found
  res.status(404).json({ message: "Student not found!" });
});

app.post("/students", (req, res) => {
  /* Validate the input from user */
  const { name, nickName, address, education } = req.body;
  if (!name || name == "") {
    res.status(404).json({
      message: "Name is required!",
    });
    return;
  }
  if (!nickName || nickName == "") {
    res.status(404).json({
      message: "NickName is required!",
    });
    return;
  }
  if (!req.body.class || req.body.class == "") {
    res.status(404).json({
      message: "Class is required!",
    });
    return;
  }
  if (!address) {
    res.status(404).json({
      message: "Address is required!",
    });
    return;
  }
  if (!education) {
    res.status(404).json({
      message: "Education is required!",
    });
    return;
  }

  const { province, city } = address;
  if (!province) {
    res.status(404).json({
      message: "Province is required!",
    });
    return;
  }
  if (!city) {
    res.status(404).json({
      message: "City is required!",
    });
    return;
  }

  const { bachelor } = education;
  if (!bachelor) {
    res.status(404).json({
      message: "Bachelor is required!",
    });
    return;
  }

  /* Add data to current array students */
  const newStudent = {
    id: students.length + 1,
    name,
    nickName,
    class: req.body.class,
    address: {
      province,
      city,
    },
    education: {
      bachelor,
    },
  };
  students.push(newStudent);

  // TODO: save the latest data to json
  // Save the updated data back to the students.json file
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 2),
    "utf-8"
  );

  res.status(201).json(newStudent);
});

/*run the express.js apllication */
app.listen(port, () => {
  console.log(`The express.js app is runing on port ${port}`);
});
