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

const updatePlaces = async (req, res) => {
  const updates = Array.isArray(req.body) ? req.body : [];

  if (updates.length === 0) {
    return res
      .status(400)
      .json({ message: "An array of updates is required." });
  }

  try {
    const results = await Promise.all(
      updates.map(async (update) => {
        const { id, ...fieldsToUpdate } = update;

        if (!id || Object.keys(fieldsToUpdate).length === 0) return null;

        return PlacesSchema.updateOne(
          { id: String(id) },
          { $set: fieldsToUpdate },
          { upsert: true }
        );
      })
    );

    const modifiedCount = results.filter(
      (r) => r && r.modifiedCount > 0
    ).length;
    const upsertedCount = results.filter(
      (r) => r && r.upsertedCount > 0
    ).length;

    res.status(200).json({
      message: `${modifiedCount} updated, ${upsertedCount} inserted.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating places", error });
  }
};

const deletePlaces = async (req, res) => {
  const { id } = req.body;

  if (!id || !Array.isArray(id)) {
    return res.status(400).json({ message: "An array of IDs is required." });
  }

  try {
    const result = await PlacesSchema.deleteMany({ id: { $in: id } });

    res.status(200).json({
      message: `${result.deletedCount} place(s) deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting places", error });
  }
};

module.exports = {
  getAllPlaces,
  getAllPlacesTesting,
  updatePlaces,
  deletePlaces,
};
