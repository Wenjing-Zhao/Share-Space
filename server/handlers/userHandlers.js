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

    // validate new user infos miss
    if (!firstName || !lastName || !avatarUrl || !email) {
      return res
        .status(400)
        .json({ status: 400, data: req.body, message: "Information Missing" });
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

// this function updates user messages related a specific space
const updateUserMessages = async (req, res) => {
  const { userId } = req.params;
  const { spaceId, talkerId, hostFirstName, hostLastName, message, timestamp } =
    req.body;
  const client = new MongoClient(MONGO_URI, options);

  console.log(req.body);

  // validate new message infos miss
  if (
    !spaceId ||
    !talkerId ||
    !hostFirstName ||
    !hostLastName ||
    !message ||
    !timestamp
  ) {
    return res
      .status(400)
      .json({ status: 400, data: req.body, message: "Information Missing" });
  }

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // start session for transaction
    const session = client.startSession();

    // this function is for transaction
    const transactionResults = await session.withTransaction(async () => {
      // ------------------------------------------------------------------

      // find user data by userId
      const userData = await db
        .collection("users")
        .findOne({ userId }, { session });

      // validate the user exists
      if (!userData) {
        // abort transaction and throw error
        await session.abortTransaction();
        const error = new Error(`User Not Found`);
        error.statusCode = 404;
        throw error;
      }

      // insert a new message into existed ialogue obj related the space
      const insertNewMessage = {
        userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        message,
        timestamp,
      };

      // create a new dialogue obj and a new message related the space
      const createNewMessage = {
        spaceId,
        talkerId,
        hostFirstName,
        hostLastName,
        messagesLog: [
          {
            userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            message,
            timestamp,
          },
        ],
      };

      // validate the space and talker exists in user messages
      const result = userData.messages.find(
        (ele) => ele.spaceId === spaceId && ele.talkerId === talkerId
      );

      if (!result) {
        // if not exists, create
        userData.messages.push(createNewMessage);
      } else {
        // if exists, insert
        const index = userData.messages.indexOf(result);
        userData.messages[index].messagesLog.push(insertNewMessage);
      }

      // modify the users collection
      const newMessagesValues = { $set: { messages: userData.messages } };

      await db
        .collection("users")
        .updateOne({ userId }, newMessagesValues, { session });

      // ------------------------------------------------------------------

      // find talker data by userId
      const talkerData = await db
        .collection("users")
        .findOne({ userId: talkerId }, { session });

      // validate the talker exists
      if (!talkerData) {
        // abort transaction and throw error
        await session.abortTransaction();
        const error = new Error(`Talker Not Found`);
        error.statusCode = 404;
        throw error;
      }

      // create a new dialogue obj and a new message for talker related the space
      const createTalkerNewMessage = {
        spaceId,
        talkerId: userId,
        hostFirstName,
        hostLastName,
        messagesLog: [
          {
            userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            message,
            timestamp,
          },
        ],
      };

      // validate the space and user exists in talker messages
      const talkerResult = talkerData.messages.find(
        (ele) => ele.spaceId === spaceId && ele.talkerId === userId
      );

      if (!talkerResult) {
        // if not exists, create
        talkerData.messages.push(createTalkerNewMessage);
      } else {
        // if exists, insert
        const index = talkerData.messages.indexOf(talkerResult);
        talkerData.messages[index].messagesLog.push(insertNewMessage);
      }

      // modify the users collection
      const newTalkerMessagesValues = {
        $set: { messages: talkerData.messages },
      };

      await db
        .collection("users")
        .updateOne({ userId: talkerId }, newTalkerMessagesValues, { session });

      // ------------------------------------------------------------------
    });

    // commit transaction
    await session.commitTransaction();

    // end session for transaction
    await session.endSession();

    if (transactionResults) {
      // transaction is successful and response status and new space data
      res.status(201).json({
        status: 201,
        data: req.body,
        message: "User Messages Updated",
      });
    } else {
      // transaction fails and abort and response error
      res.status(500).json({ status: 500, message: "Transaction Aborted" });
    }
  } catch (error) {
    // response throwing error status and error message
    if (!error.statusCode) {
      res.status(500).json({ status: 500, message: error.message });
    }

    // response error status and error message
    res
      .status(error.statusCode)
      .json({ status: error.statusCode, message: error.message });
  } finally {
    // close the mongodb
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  getUser,
  addUser,
  getUserFavorites,
  updateUserFavorites,
  updateUserMessages,
};
