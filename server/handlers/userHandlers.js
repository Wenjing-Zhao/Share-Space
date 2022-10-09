// this is for mongo database
const { MongoClient } = require("mongodb");
// this is for generating unique ids
const { v4: uuidv4 } = require("uuid");

// this is for hiding confidential infos
require("dotenv").config();
const { MONGO_URI } = process.env;

// mongo create client options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// this function returns a single user
const getUser = async (req, res) => {
  const { userId } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // find user data by userId
    const userData = await db.collection("users").findOne({ userId });

    // response status and user data or user not found
    userData
      ? res.status(200).json({ status: 200, data: userData })
      : res
          .status(404)
          .json({ status: 404, userId, message: "User Not Found" });
  } catch (error) {
    // response status and error message
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    // close the mongodb
    client.close();
    console.log("disconnected!");
  }
};

// this function creates a new user
const addUser = async (req, res) => {
  const { firstName, lastName, avatarUrl, email } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  // generate an unique id for new user
  const createId = uuidv4();

  // create data for new user
  const newUser = {
    userId: createId,
    ...req.body,
    spaces: [],
    favorites: [],
    messages: [],
  };

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // find user data by email
    const userData = await db.collection("users").findOne({ email: email });

    // validate the user exists
    // if the user exists, response status and user data
    if (userData) {
      return res
        .status(200)
        .json({ status: 200, data: userData, message: "User Already Exists" });
    }

    // if the user doesn't exist, insert new user data
    await db.collection("users").insertOne(newUser);

    // response status and new user data
    res
      .status(201)
      .json({ stastus: 201, data: newUser, message: "New User Added" });
  } catch (error) {
    // response error status and error message
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    // close the mongodb
    client.close();
    console.log("disconnected!");
  }
};

// this function returns a specific space status in user favorites
const getUserFavorites = async (req, res) => {
  const { userId } = req.params;
  const { spaceId } = req.query;
  const client = new MongoClient(MONGO_URI, options);
  let isFavorite = null;

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // find user data by userId
    const userData = await db.collection("users").findOne({ userId });

    // validate the user exists
    if (!userData) {
      return res
        .status(404)
        .json({ status: 404, userId, message: "User Not Found" });
    }

    // get space index of the user favorites array by spaceId
    const spaceIndex = userData.favorites.indexOf(spaceId);

    // validate the space exists in the user favorites array
    if (spaceIndex > -1) {
      // if exists, set true
      isFavorite = true;
    } else {
      // if not exists, set false
      isFavorite = false;
    }

    // response status and the space status in user favorites
    res.status(200).json({ stastus: 200, isFavorite });
  } catch (error) {
    // response error status and error message
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    // close the mongodb
    client.close();
    console.log("disconnected!");
  }
};

// this function updates a specific space status in user favorites
const updateUserFavorites = async (req, res) => {
  const { userId } = req.params;
  const { spaceId } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // find user data by userId
    const userData = await db.collection("users").findOne({ userId });

    // validte the user exists
    if (!userData) {
      return res
        .status(404)
        .json({ status: 404, userId, message: "User Not Found" });
    }

    // get space index of the user favorites array by spaceId
    const spaceIndex = userData.favorites.indexOf(spaceId);

    // validate the space exists in the user favorites array
    if (spaceIndex > -1) {
      // if exists, remove
      userData.favorites.splice(spaceIndex, 1);
    } else {
      // if not exists, add
      userData.favorites.push(spaceId);
    }

    // modify the users collection
    const newFavoritesValues = { $set: { favorites: userData.favorites } };
    await db.collection("users").updateOne({ userId }, newFavoritesValues);

    // response status and body data
    res.status(200).json({
      stastus: 200,
      data: req.body,
      message: "User Favorites Updated",
    });
  } catch (error) {
    // response error status and error message
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    // close the mongodb
    client.close();
    console.log("disconnected!");
  }
};

// this function returns user messages related a specific space
const getUserMessages = async () => {};

// this function updates user messages related a specific space
const updateUserMessages = async () => {};

module.exports = {
  getUser,
  addUser,
  getUserFavorites,
  updateUserFavorites,
  getUserMessages,
  updateUserMessages,
};
