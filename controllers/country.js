const CountrySchema = require("../models/country");

const getAllCountries = async (req, res) => {
  const Countries = await CountrySchema.find(req.query);
  res.status(200).json({ Countries, nbHits: Countries.length });
};

const getAllCountriesTesting = async (req, res) => {
  const Countries = await CountrySchema.find(req.query);
  res.status(200).json({ Countries, nbHits: Countries.length });
};

module.exports = { getAllCountries, getAllCountriesTesting };
