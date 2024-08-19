const mongoose = require("mongoose");

const dbConnect = (uri) => {
  //   console.log("connect Db");
  return mongoose.connect(uri);
};

module.exports = dbConnect;
