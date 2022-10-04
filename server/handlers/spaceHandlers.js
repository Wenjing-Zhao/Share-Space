const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// return an array of all spaces
const getSpaces = async (req, res) => {};

// return a single space
const getSpace = async (req, res) => {};

// creates a new space
const addSpace = async (req, res) => {};

// updates a specified space
const updateSpace = async (req, res) => {};

// deletes a specified space
const deleteSpace = async (req, res) => {};

module.exports = { getSpaces, getSpace, addSpace, updateSpace, deleteSpace };
