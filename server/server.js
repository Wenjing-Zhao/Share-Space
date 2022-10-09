// import the needed node_modules
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
const port = 8000;

// import the needed handlers about spaces
const {
  getSpaces,
  getSpace,
  addSpace,
  updateSpace,
  deleteSpace,
} = require("./handlers/spaceHandlers");

// import the needed handlers about users
const {
  getUser,
  addUser,
  getUserFavorites,
  updateUserFavorites,
  getUserMessages,
  updateUserMessages,
} = require("./handlers/userHandlers");

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

// add endpoints here
// ------------------

// endpoints about spaces
app.get("/api/get-spaces", getSpaces);
app.get("/api/get-space/:spaceId", getSpace);
app.post("/api/add-space", addSpace);
app.patch("/api/update-space/:spaceId", updateSpace);
app.delete("/api/delete-space/:spaceId", deleteSpace);

// endpoints about users
app.get("/api/get-user/:userId", getUser);
app.post("/api/add-user", addUser);

// endpoints about user favorites
app.get("/api/get-user-favorites/:userId", getUserFavorites);
app.patch("/api/update-user-favorites/:userId", updateUserFavorites);

//endpoints about user messages
app.get("/api/get-user-messages/:userId", getUserMessages);
app.patch("/api/update-user-messages/:userId", updateUserMessages);

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
