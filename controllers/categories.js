const CategorySchema = require("../models/category");

const getAllCategories = async (req, res) => {
  const Categories = await CategorySchema.find(req.query);
  res.status(200).json({ Categories, nbHits: Categories.length });
};

const getAllCategoriesTesting = async (req, res) => {
  const Categories = await CategorySchema.find(req.query);
  res.status(200).json({ Categories, nbHits: Categories.length });
};

module.exports = { getAllCategories, getAllCategoriesTesting };
