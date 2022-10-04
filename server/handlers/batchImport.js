const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const spaces = require("../data/spaces.json");
const users = require("../data/users.json");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImportSpaces = async () => {
  console.log(spaces);

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("sharespace");
  console.log("connected!");

  await db.collection("spaces").insertMany(spaces);
  console.log("success!");

  client.close();
  console.log("disconnected!");
};

const batchImportUsers = async () => {
  console.log(users);

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("sharespace");
  console.log("connected!");

  await db.collection("users").insertMany(users);
  console.log("success!");

  client.close();
  console.log("disconnected!");
};

batchImportSpaces();
batchImportUsers();
