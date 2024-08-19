const PlacesSchema = require("../models/place");

const getAllPlaces = async (req, res) => {
  const { category_slugs, name, sort, select } = req.query;

  const queryObject = {};

  if (category_slugs) {
    queryObject.category_slugs = { $regex: category_slugs, $options: "i" };
    console.log(queryObject.category_slugs);
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let apiData = PlacesSchema.find(queryObject);

  if (sort) {
    // let sortFix = sort.replace(",", " ");
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }
  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 6;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const Places = await apiData;
  res.status(200).json({ Places, nbHits: Places.length });
};

const getAllPlacesTesting = async (req, res) => {
  const { category_slugs, name, sort, select } = req.query;

  const queryObject = {};

  if (category_slugs) {
    queryObject.category_slugs = { $regex: category_slugs, $options: "i" };
    console.log(queryObject.category_slugs);
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let apiData = PlacesSchema.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }
  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 6;
  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const Places = await apiData;
  res.status(200).json({ Places, nbHits: Places.length });
};

module.exports = { getAllPlaces, getAllPlacesTesting };
