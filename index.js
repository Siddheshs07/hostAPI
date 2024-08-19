require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const placesRoutes = require("./routes/places");
const categoriesRoutes = require("./routes/categories");
const dbConnect = require("./db/connect");
app.get("/", (req, res) => {
  res.send("We are Live Now");
});

app.use("/api/places", placesRoutes);
app.use("/api/categories", categoriesRoutes);

const start = async () => {
  try {
    await dbConnect(process.env.EXHIBITION_APP);
    app.listen(PORT, () => {
      console.log(`Connected To Port ${PORT} Sucessfully`);
    });
  } catch (error) {
    console.error("Failed to Start", error);
  }
};

start();
