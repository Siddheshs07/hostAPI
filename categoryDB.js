require("dotenv").config();

const dbConnect = require("./db/connect");
const CategorySchema = require("./models/category");
const categoriesJson = require("./categories.json");

const start = async () => {
  try {
    await dbConnect(process.env.EXHIBITION_APP);
    await CategorySchema.create(categoriesJson);
    console.log("Success");
  } catch (error) {
    console.error(error);
  }
};

start();
