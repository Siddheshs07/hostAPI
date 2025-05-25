const express = require("express");
const placeRouter = express.Router();
const {
  getAllPlaces,
  getAllPlacesTesting,
  updatePlaces,
  deletePlaces,
} = require("../controllers/places");
placeRouter.route("/").get(getAllPlaces);
placeRouter.route("/testing").get(getAllPlacesTesting);
placeRouter.route("/update-names").put(updatePlaces);
placeRouter.route("/delete").delete(deletePlaces);

module.exports = placeRouter;
