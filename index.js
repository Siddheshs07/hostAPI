require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const placesRoutes = require("./routes/places");
const categoriesRoutes = require("./routes/categories");
const countriesRoutes = require("./routes/country");
const dbConnect = require("./db/connect");
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => {
  res.send("We are Live Now");
});

app.use("/api/places", placesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/countries", countriesRoutes);

const start = async () => {
  try {
    await dbConnect(process.env.EXHIBITION_APP);
    app.listen(PORT, () => {
      console.log(`Connected To Port ${PORT} Successfully`);
    });
  } catch (error) {
    console.error("Failed to Start", error);
  }
};

start();
