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

// this function returns an array of all spaces
const getSpaces = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // find spaces data
    const spacesData = await db.collection("spaces").find().toArray();

    // validate the spaces exist
    if (spacesData.length === 0) {
      return res.status(404).json({ status: 404, message: "Spaces Not found" });
    }

    // response status and spaces data
    res.status(200).json({ status: 200, data: spacesData });
  } catch (error) {
    // response error status and error message
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    // close the mongodb
    client.close();
    console.log("disconnected!");
  }
};

// this function returns a single space
const getSpace = async (req, res) => {
  const { spaceId } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // find space data by spaceId
    const spaceData = await db.collection("spaces").findOne({ spaceId });

    // response status and space data or space not found
    spaceData
      ? res.status(200).json({ status: 200, data: spaceData })
      : res
          .status(404)
          .json({ status: 404, spaceId, message: "Space Not Found" });
  } catch (error) {
    // response status and error message
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    // close the mongodb
    client.close();
    console.log("disconnected!");
  }
};

// this function creates a new space
const addSpace = async (req, res) => {
  const { spaceDetails, host } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  // generate an unique id for new space
  const createId = uuidv4();

  // create data for new space
  const newSpace = {
    spaceId: createId,
    ...req.body,
  };

  // validate new space infos miss
  if (
    !spaceDetails.imageSrc ||
    spaceDetails.availableDate.length === 0 ||
    spaceDetails.needs.length === 0 ||
    spaceDetails.addressDetails === undefined ||
    !spaceDetails.addressDetails.address ||
    !spaceDetails.addressDetails.city ||
    !spaceDetails.addressDetails.region ||
    !spaceDetails.addressDetails.country ||
    !spaceDetails.addressDetails.postal ||
    !host
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
      // find user data by userId
      const userData = await db
        .collection("users")
        .findOne({ userId: host }, { session });

      // validate the user exists
      if (!userData) {
        // abort transaction and throw error
        await session.abortTransaction();
        const error = new Error(`User ${host} Not Found`);
        error.statusCode = 404;
        throw error;
      }

      // modify the users collection
      userData.spaces.push(createId);
      const newSpacesValues = { $set: { spaces: userData.spaces } };

      await db
        .collection("users")
        .updateOne({ userId: host }, newSpacesValues, { session });

      // modify the spaces collection, insert new space data
      await db.collection("spaces").insertOne(newSpace, { session });
    });

    // commit transaction
    await session.commitTransaction();

    // end session for transaction
    await session.endSession();

    if (transactionResults) {
      // transaction is successful and response status and new space data
      res.status(201).json({
        status: 201,
        data: newSpace,
        message: "Space Added",
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

// this function updates a specified space
const updateSpace = async (req, res) => {
  const { spaceId } = req.params;
  const { imageSrc, availableDate, needs } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  // validate updated space infos miss
  if (!imageSrc || availableDate.length === 0 || needs.length === 0) {
    return res
      .status(400)
      .json({ status: 400, data: req.body, message: "Information Missing" });
  }

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // find space data by spaceId
    const spaceData = await db.collection("spaces").findOne({ spaceId });

    // validate the space exists
    if (!spaceData) {
      return res
        .status(404)
        .json({ status: 404, spaceId, message: "Space Not Found" });
    }

    // modify the spaces collection
    const newSpaceValues = {
      $set: { spaceDetails: { ...spaceData.spaceDetails, ...req.body } },
    };
    await db.collection("spaces").updateOne({ spaceId }, newSpaceValues);

    // response status and body data
    res
      .status(200)
      .json({ status: 200, data: req.body, message: "Space Updated" });
  } catch (error) {
    // response error status and error message
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    // close the mongodb
    client.close();
    console.log("disconnected!");
  }
};

// this function deletes a specified space
const deleteSpace = async (req, res) => {
  const { spaceId } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the mongodb
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // start session for transaction
    const session = client.startSession();

    // this function is for transaction
    const transactionResults = await session.withTransaction(async () => {
      // find space data by spaceId
      const spaceData = await db
        .collection("spaces")
        .findOne({ spaceId }, { session });

      // validate the space exists
      if (!spaceData) {
        // abort transaction and throw error
        await session.abortTransaction();
        const error = new Error(`Space ${spaceId} Not Found`);
        error.statusCode = 404;
        throw error;
      }

      // find user data by userId
      const userData = await db
        .collection("users")
        .findOne({ userId: spaceData.host }, { session });

      // validate the user exists
      if (!userData) {
        // abort transaction and throw error
        await session.abortTransaction();
        const error = new Error(`User ${spaceData.host} Not Found`);
        error.statusCode = 404;
        throw error;
      }

      // get space index of the user spaces array by spaceId
      const spaceIndex = userData.spaces.indexOf(spaceId);

      // validate the spaces exists in the user spaces array
      if (spaceIndex > -1) {
        // if exists, remove
        userData.spaces.splice(spaceIndex, 1);
      } else {
        // if not exsits, throw error
        await session.abortTransaction();
        const error = new Error(`Space ${spaceId} Not Found In User Spaces`);
        error.statusCode = 404;
        throw error;
      }

      // modify the users collection
      const newSpacesValues = { $set: { spaces: userData.spaces } };
      await db
        .collection("users")
        .updateOne({ userId: spaceData.host }, newSpacesValues, { session });

      // modify the spaces collection
      const result = await db
        .collection("spaces")
        .deleteOne({ spaceId }, { session });
      console.log(result.deletedCount);
    });

    // commit transaction
    await session.commitTransaction();

    // end session for transaction
    await session.endSession();

    if (transactionResults) {
      // transaction is successful and response status
      res.status(200).json({ status: 200, message: "Space Deleted" });
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

module.exports = { getSpaces, getSpace, addSpace, updateSpace, deleteSpace };
