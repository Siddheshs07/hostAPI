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
  floor: {
    type: String,
    default: null,
  },
  slug: {
    type: String,
    required: true,
  },
  connected_pois: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    default: null,
  },
  panorama: {
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
  vendor_id: {
    type: String,
    required: true,
  },
  booth_codes: {
    type: [String],
    default: [],
  },
  hall_names: {
    type: [String],
    default: [],
  },
  buttons: {
    type: [String],
    default: [],
  },
  media: {
    type: [String],
    default: [],
  },
  subheader: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    required: true,
  },
  description_trans: {
    type: String,
    default: null,
  },
  description_ai_summary: {
    type: String,
    default: null,
  },
  description_ai_summary_trans: {
    type: String,
    default: null,
  },
  swapcard_logo: {
    type: String,
    default: null,
  },
  swapcard_logo_bg_color: {
    type: String,
    default: "#FFFFFF",
  },
  website: {
    type: String,
    default: null,
  },
  instagram: {
    type: String,
    default: null,
  },
  twitter: {
    type: String,
    default: null,
  },
  facebook: {
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
  is_booth_code_visible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
