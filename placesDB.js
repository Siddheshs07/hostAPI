require("dotenv").config();

const dbConnect = require("./db/connect");
const PlaceSchema = require("./models/place");
const placesJson = require("./places.json");

const start = async () => {
  try {
    await dbConnect(process.env.EXHIBITION_APP);
    await PlaceSchema.create(placesJson);
    console.log("Success");
  } catch (error) {
    console.error(error);
  }
};

start();
