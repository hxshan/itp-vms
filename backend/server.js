require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

//database not initialised dont run yet
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
  });
});
