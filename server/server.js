// import the needed node_modules
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const port = 8000;

app.use(helmet());
app.use(morgan("tiny"));

// add endpoints here
// ------------------
app.get("/", (req, res) => {
  res.send("hello world!");
});

// ------------------

// catch all endpoints
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

// set it to listen on port 8000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
