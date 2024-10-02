const express = require("express");

const catRouter = express.Router();

const {
  getAllCountries,
  getAllCountriesTesting,
} = require("../controllers/country");

catRouter.route("/").get(getAllCountries);
catRouter.route("/testing").get(getAllCountriesTesting);

module.exports = catRouter;
