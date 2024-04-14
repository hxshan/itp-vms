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
const roleRoutes = require('./routes/roleRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const vehicleMaintain = require('./routes/vehicleMaintainRoutes')
const contractRoutes = require('./routes/contractRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const incomeRoutes = require('./routes/incomeRoutes')
const authRoutes = require('./routes/authRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
const hireRoutes = require('./routes/hireRoutes')

const { caseFileRouter } = require('./routes/caseFileRoutes')
const vehicleService = require('./routes/vehicleservice')



app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/role',roleRoutes)
app.use('/api/vehicle',vehicleRoutes)
app.use('/api/vehiclemaintain',vehicleMaintain)
app.use('/api/contract',contractRoutes)
app.use('/api/expense', expenseRoutes)
app.use('/api/income', incomeRoutes)
app.use('/api/hire', hireRoutes)
app.use('/api/caseFiles', caseFileRouter)
app.use('/api/vehicleService', vehicleService)



app.use(notFound)
app.use(errorHandler)



mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
  });
});
