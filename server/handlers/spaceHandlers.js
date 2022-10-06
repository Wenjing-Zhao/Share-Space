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
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

// return a single space
const getSpace = async (req, res) => {
  const { spaceId } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("sharespace");
    console.log("connected!");

    const spaceData = await db.collection("spaces").findOne({ spaceId });

    spaceData
      ? res.status(200).json({ status: 200, data: spaceData })
      : res
          .status(404)
          .json({ status: 404, spaceId, message: "Space Not Found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

// creates a new space
const addSpace = async (req, res) => {
  const { spaceDetails, host } = req.body;
  const createId = uuidv4();
  const client = new MongoClient(MONGO_URI, options);

  const newSpace = {
    spaceId: createId,
    ...req.body,
  };

  // validate if any info missing
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

  console.log(newSpace);

  try {
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    const session = client.startSession();

    const transactionResults = await session.withTransaction(async () => {
      // find user data
      const userData = await db
        .collection("users")
        .findOne({ userId: host }, { session });

      // validate if the user exist
      if (!userData) {
        await session.abortTransaction();
        const error = new Error(`User ${host} Not Found`);
        error.statusCode = 404;
        throw error;
      }

      // modify the users collection
      userData.spaces.push(createId);
      const newSpacesValues = { $set: { spaces: userData.spaces } };

      const result = await db
        .collection("users")
        .updateOne({ userId: host }, newSpacesValues, { session });

      console.log(result);

      // modify the spaces collection
      await db.collection("spaces").insertOne(newSpace, { session });
    });

    // validate transaction
    await session.commitTransaction();

    if (transactionResults) {
      res.status(201).json({
        status: 201,
        data: newSpace,
        message: "Space Added",
      });
    } else {
      res.status(500).json({ status: 500, message: "Transaction Aborted" });
    }

    await session.endSession();
  } catch (error) {
    if (!error.statusCode) {
      res.status(500).json({ status: 500, message: error.message });
    }

    res
      .status(error.statusCode)
      .json({ status: error.statusCode, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

// updates a specified space
const updateSpace = async (req, res) => {
  const { spaceId } = req.params;
  const { imageSrc, availableDate, needs } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  // validate if any info missing
  if (!imageSrc || availableDate.length === 0 || needs.length === 0) {
    return res
      .status(400)
      .json({ status: 400, data: req.body, message: "Information Missing" });
  }

  try {
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    // find space data
    const spaceData = await db.collection("spaces").findOne({ spaceId });

    // validate if the space exist
    if (!spaceData) {
      return res
        .status(404)
        .json({ status: 404, spaceId, message: "Space Not Found" });
    }

    // modify the spaces collection
    const newSpaceValues = {
      $set: { spaceDetails: { ...spaceData.spaceDetails, ...req.body } },
    };

    const result = await db
      .collection("spaces")
      .updateOne({ spaceId }, newSpaceValues);

    console.log(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

// deletes a specified space
const deleteSpace = async (req, res) => {
  const { spaceId } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("sharespace");
    console.log("connected!");

    const session = client.startSession();

    const transactionResults = await session.withTransaction(async () => {
      // find space data
      const spaceData = await db
        .collection("spaces")
        .findOne({ spaceId }, { session });

      // validate if the space exist
      if (!spaceData) {
        await session.abortTransaction();
        const error = new Error(`Space ${spaceId} Not Found`);
        error.statusCode = 404;
        throw error;
      }

      // find user data
      const userData = await db
        .collection("users")
        .findOne({ userId: spaceData.host }, { session });

      // validate if the user exist
      if (!userData) {
        await session.abortTransaction();
        const error = new Error(`User ${spaceData.host} Not Found`);
        error.statusCode = 404;
        throw error;
      }

      // modify the users collection
      const spaceIndex = userData.spaces.indexOf(spaceId);

      // only splice user spaces array when space is found
      if (spaceIndex > -1) {
        userData.spaces.splice(spaceIndex, 1);
      } else {
        await session.abortTransaction();
        const error = new Error(`Space ${spaceId} Not Found In User Spaces`);
        error.statusCode = 404;
        throw error;
      }

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

    await session.commitTransaction();

    if (transactionResults) {
      res.status(200).json({ status: 200, message: "Space Deleted" });
    } else {
      res.status(500).json({ status: 500, message: "Transaction Aborted" });
    }

    await session.endSession();
  } catch (error) {
    if (!error.statusCode) {
      res.status(500).json({ status: 500, message: error.message });
    }

    res
      .status(error.statusCode)
      .json({ status: error.statusCode, message: error.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { getSpaces, getSpace, addSpace, updateSpace, deleteSpace };
