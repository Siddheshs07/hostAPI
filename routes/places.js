const express = require("express");
const placeRouter = express.Router();
const { getAllPlaces, getAllPlacesTesting } = require("../controllers/places");
placeRouter.route("/").get(getAllPlaces);
placeRouter.route("/testing").get(getAllPlacesTesting);

module.exports = placeRouter;
