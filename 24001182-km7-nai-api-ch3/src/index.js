require("dotenv").config(); //to enable .env called
const express = require("express"); //import express with non-module
require["express-async-errors"];
const fileUpload = require("express-fileupload");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");

/*make initiate express application */
const app = express();
const port = process.env.PORT || 3000;

/* We need to activate body parser/reader */
app.use(express.json());

app.use(
  fileUpload({
    limits: { filesize: 50 * 1024 * 1024 }, // 50 MB
  })
);

/*make a routing and response */
app.get("/", (req, res) => {
  res.send(`Ping Successfully!`);
});

// all routes define
app.use("/", router);

// this function is for error 404 handle URL
app.use("*", notFoundURLHandler);

// This function is to handle error when API hit
app.use(errorHandler);


/*run the express.js apllication */
app.listen(port, () => {
  console.log(`The express.js app is runing on port ${port}`);
});
