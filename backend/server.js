require("dotenv").config("");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const csrf = require('csurf'); 
const corsOptions = require("./config/corsOptions");
const cookieParser = require('cookie-parser'); 
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// Configure CSRF protection
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});


app.use(express.json());
app.use(express.static('uploads'));
app.use(cors(corsOptions));
app.use(cookieParser()); // Fixed typo

// Apply CSRF protection after cookieParser but before routes
app.use(csrfProtection);

// Make CSRF token available to all routes
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const vehicleMaintain = require('./routes/vehicleMaintainRoutes');
const contractRoutes = require('./routes/contractRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const authRoutes = require('./routes/authRoutes');
const {notFound,errorHandler} = require('./middleware/errorMiddleware');
const hireRoutes = require('./routes/hireRoutes');
const alertRoutes = require('./routes/alertRoutes');
const { caseFileRouter } = require('./routes/caseFileRoutes');
const vehicleService = require('./routes/vehicleservice');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/vehiclemaintain', vehicleMaintain);
app.use('/api/contract', contractRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/hire', hireRoutes);
app.use('/api/caseFiles', caseFileRouter);
app.use('/api/vehicleService', vehicleService);
app.use('/api/alert', alertRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Add CSRF error handler (important!)
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      error: 'Invalid CSRF token',
      message: 'Form tampered with or session expired'
    });
  }
  next(err);
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
  });
});