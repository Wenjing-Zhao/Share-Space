const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// return a single user by userId
const getUser = async (req, res) => {
  const { userId } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("sharespace");
    console.log("connected!");

    const userData = await db.collection("users").findOne({ userId });

    userData
      ? res.status(200).json({ status: 200, data: userData })
      : res
          .status(404)
          .json({ status: 404, userId, message: "User Not Found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

// creates a new user
const addUser = async (req, res) => {};

// updates a specified user
const updateUser = async (req, res) => {};

// return a single user by email
const getSigninUser = async (req, res) => {
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("sharespace");
    console.log("connected!");

    const userData = await db.collection("users").findOne({ email });

    userData
      ? res.status(200).json({ status: 200, data: userData })
      : res
          .status(404)
          .json({ status: 404, email, message: "Email Not Found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { getSigninUser, getUser, addUser, updateUser };
