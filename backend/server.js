require("dotenv").config("");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const coookieParser = require('cookie-parser')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const path = require('path')


const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: { defaultSrc: ["'self'"] }
}));
app.use(mongoSanitize()); // strips keys starting with $ or containing .

mongoose.set('sanitizeFilter', true);

app.use(express.json());
// Security headers + CSP
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'same-site' }
}))
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', 'blob:'],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    frameAncestors: ["'self'"],
  }
}))
// NoSQL injection sanitization
app.use(mongoSanitize())
// Safer static serving for uploads (prevent inline SVG execution)
app.use('/uploads', express.static('uploads', {
  setHeaders: (res, filepath) => {
    if (path.extname(filepath).toLowerCase() === '.svg') {
      res.setHeader('Content-Type', 'application/octet-stream')
      res.setHeader('Content-Disposition', 'attachment')
    }
  }
}))
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
const alertRoutes = require('./routes/alertRoutes')

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
app.use('/api/alert', alertRoutes)



app.use(notFound)
app.use(errorHandler)



// Sanitize filters at mongoose layer
mongoose.set('sanitizeFilter', true)
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
  });
});
