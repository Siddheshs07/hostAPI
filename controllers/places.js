const PlacesSchema = require("../models/place");
const mongoose = require("mongoose");
const getAllPlaces = async (req, res) => {
  const { category_slugs, name, sort, select, id, from, to, country } =
    req.query;

  const queryObject = {};
  const paramsArray = Array.isArray(category_slugs)
    ? category_slugs
    : category_slugs
    ? category_slugs.split(",")
    : [];

  if (category_slugs) {
    queryObject.category_slugs = { $in: paramsArray };
    console.log(queryObject.category_slugs);
  }

  const paramsArray1 = Array.isArray(country)
    ? country
    : country
    ? country.split(",")
    : [];

  if (country) {
    queryObject.country = { $in: paramsArray1 };
    console.log(queryObject.country);
  }

  if (id) {
    queryObject.id = id;
  }
  // if (from) {
  //   queryObject.id = queryObject.id || {};
  //   queryObject.id = from;
  // }
  // if (to) {
  //   queryObject.id = queryObject.id || {};
  //   queryObject.id = to;
  // }

  if (from || to) {
    const ids = [];
    if (mongoose.Types.ObjectId.isValid(from)) {
      ids.push(new mongoose.Types.ObjectId(from));
    }
    if (mongoose.Types.ObjectId.isValid(to)) {
      ids.push(new mongoose.Types.ObjectId(to));
    }

    if (ids.length > 0) {
      queryObject.id = { $in: ids };
    }
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

  const Places = await apiData;
  res.status(200).json({ Places, nbHits: Places.length });
};

const getAllPlacesTesting = async (req, res) => {
  const { category_slugs, name, sort, select, id, from, to, country } =
    req.query;

  const queryObject = {};
  const paramsArray = Array.isArray(category_slugs)
    ? category_slugs
    : category_slugs
    ? category_slugs.split(",")
    : [];

  if (category_slugs) {
    queryObject.category_slugs = { $in: paramsArray };
    console.log(queryObject.category_slugs);
  }

  const paramsArray1 = Array.isArray(country)
    ? country
    : country
    ? country.split(",")
    : [];

  if (country) {
    queryObject.country = { $in: paramsArray1 };
    console.log(queryObject.country);
  }

  if (id) {
    queryObject.id = id;
  }
  // if (from) {
  //   queryObject.id = queryObject.id || {};
  //   queryObject.id = from;
  // }
  // if (to) {
  //   queryObject.id = queryObject.id || {};
  //   queryObject.id = to;
  // }
  if (from || to) {
    const ids = [];
    if (mongoose.Types.ObjectId.isValid(from)) {
      ids.push(new mongoose.Types.ObjectId(from));
    }
    if (mongoose.Types.ObjectId.isValid(to)) {
      ids.push(new mongoose.Types.ObjectId(to));
    }

    if (ids.length > 0) {
      queryObject.id = { $in: ids };
    }
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

  // let page = Number(req.query.page) || 1;
  // let limit = Number(req.query.limit) || 6;

  // let skip = (page - 1) * limit;

  // apiData = apiData.skip(skip).limit(limit);

  const Places = await apiData;
  res.status(200).json({ Places, nbHits: Places.length });
};

module.exports = { getAllPlaces, getAllPlacesTesting };
