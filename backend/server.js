require("dotenv").config("");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')

app.use('/api/user',userRoutes)
app.use('/api/vehicle',vehicleRoutes)
app.use('/api/expense', expenseRoutes)

app.use(notFound)
app.use(errorHandler)



mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
  });
});
