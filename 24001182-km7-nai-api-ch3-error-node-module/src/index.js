require("dotenv").config(); //to enable .env called
const express = require("express"); //import express with non-module
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  fileUpload({
    limits: { filesize: 50 * 1024 * 1024 }, // 50 MB
  })
);

app.get("/", (req, res) => {
  res.send(`Ping Successfully!`);
});

app.use("/", router);

app.use("*", notFoundURLHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The express.js app is runing on port ${port}`);
});
