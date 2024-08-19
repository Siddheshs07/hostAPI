const express = require("express");

const catRouter = express.Router();

const {
  getAllCategories,
  getAllCategoriesTesting,
} = require("../controllers/categories");

catRouter.route("/").get(getAllCategories);
catRouter.route("/testing").get(getAllCategoriesTesting);

module.exports = catRouter;
