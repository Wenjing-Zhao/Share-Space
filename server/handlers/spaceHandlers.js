const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// return an array of all spaces
const getSpaces = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("sharespace");
    console.log("connected!");

    const spacesData = await db.collection("spaces").find().toArray();

    if (spacesData.length === 0) {
      return res.status(404).json({ status: 404, message: "Spaces Not found" });
    }

    res.status(200).json({ status: 200, data: spacesData });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

// return a single space
const getSpace = async (req, res) => {};

// creates a new space
const addSpace = async (req, res) => {};

// updates a specified space
const updateSpace = async (req, res) => {};

// deletes a specified space
const deleteSpace = async (req, res) => {};

module.exports = { getSpaces, getSpace, addSpace, updateSpace, deleteSpace };
