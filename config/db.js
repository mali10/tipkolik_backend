require('dotenv').config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log(err));

