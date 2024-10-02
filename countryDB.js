require("dotenv").config();

const dbConnect = require("./db/connect");
const CountrySchema = require("./models/country");
const countryJson = require("./country.json");

const start = async () => {
  try {
    await dbConnect(process.env.EXHIBITION_APP);
    await CountrySchema.create(countryJson);
    console.log("Success");
  } catch (error) {
    console.error(error);
  }
};

start();
