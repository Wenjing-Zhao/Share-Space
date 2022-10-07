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
const addUser = async (req, res) => {
  const { firstName, lastName, avatarUrl, email } = req.body;
  const createId = uuidv4();
  const client = new MongoClient(MONGO_URI, options);

  const newUser = {
    userId: createId,
    ...req.body,
    spaces: [],
    favorites: [],
    messages: [],
  };

  try {
    await client.connect();

    const db = client.db("sharespace");
    console.log("connected!");

    const userData = await db.collection("users").findOne({ email: email });

    if (userData) {
      return res
        .status(200)
        .json({ status: 200, data: userData, message: "User Already Exists" });
    }

    await db.collection("users").insertOne(newUser);

    res
      .status(201)
      .json({ stastus: 201, data: newUser, message: "New User Added" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

// update user favorites
const updateUserFavorites = async (req, res) => {
  const { userId } = req.params;
  const { spaceId } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  console.log(userId, spaceId);

  try {
    await client.connect();

    const db = client.db("sharespace");
    console.log("connected!");

    const userData = await db.collection("users").findOne({ userId });

    if (!userData) {
      return res
        .status(404)
        .json({ status: 404, userId, message: "User Not Found" });
    }

    const spaceIndex = userData.favorites.indexOf(spaceId);

    if (spaceIndex > -1) {
      userData.favorites.splice(spaceIndex, 1);
    } else {
      userData.favorites.push(spaceId);
    }

    const newFavoritesValues = { $set: { favorites: userData.favorites } };

    await db.collection("users").updateOne({ userId }, newFavoritesValues);

    res
      .status(200)
      .json({ stastus: 200, data: req.body, message: "Favorites Updated" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

const updateUserMessages = async () => {};

module.exports = { getUser, addUser, updateUserFavorites, updateUserMessages };
