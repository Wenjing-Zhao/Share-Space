// import the needed node_modules
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
const port = 8000;

const {
  getSpaces,
  getSpace,
  addSpace,
  updateSpace,
  deleteSpace,
} = require("./handlers/spaceHandlers");

const { getUser, addUser } = require("./handlers/userHandlers");

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

// add endpoints here
// ------------------

app.get("/api/get-spaces", getSpaces);
app.get("/api/get-space/:spaceId", getSpace);
app.post("/api/add-space", addSpace);
app.patch("/api/update-space/:spaceId", updateSpace);
app.delete("/api/delete-space/:spaceId", deleteSpace);

app.get("/api/get-user/:userId", getUser);
app.post("/api/add-user", addUser);

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
