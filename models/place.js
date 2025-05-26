const mongoose = require("mongoose");

const PlaceSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  category_slugs: {
    type: [String],
    default: [],
  },
  building: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  website: {
    type: String,
    default: null,
  },
  linkedin: {
    type: String,
    default: null,
  },
  phones: {
    type: [String],
    default: [],
  },
  country: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
