const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// return a single user
const getUser = async (req, res) => {};

// creates a new user
const addUser = async (req, res) => {};

// updates a specified user
const updateUser = async (req, res) => {};

module.exports = { getUser, addUser, updateUser };
