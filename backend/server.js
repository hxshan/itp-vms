require("dotenv").config("");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const coookieParser = require('cookie-parser')

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(coookieParser())
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const authRoutes = require('./routes/authRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/vehicle',vehicleRoutes)

app.use(notFound)
app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
  });
});
