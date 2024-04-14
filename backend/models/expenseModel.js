const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  vehicle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicles', 
    required: true 
  },
  recordedBy: { 
    type: String, 
    required: true 
  },
  editedBy: { 
    type: String,
    default: ''
     
  },
  tripId: { 
    type: String
   
  },
  category: { 
    type: String, 
    enum: ['Fuel', 'Maintenance and Repairs', 'Insurance', 'Licensing and Permits', 'Driver Wages','Other'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Paid', 'Rejected'], 
    required: true 
  },
  receiptImage: { 
    type: String 
  },
  notes: {
    type: String 
  },
  fuelDetails: {
    odometerReading: Number,
    fuelType: { 
      type: String, 
      enum: ['Petrol', 'Diesel', 'Electric',''] 
    },
    fuelQuantity: Number,
    fuelPricePerUnit: Number,
    totalPrice : Number
  },
  maintenanceDetails: {
    description: String,
    serviceProvider: String,
    invoiceNumber: String,
    maintenanceCost: Number
  },
  insuranceDetails: {
    insuaranceProvider: String,
    policyNumber: Number,
    premiumAmount: Number
  },
  licensingDetails: {
    licenseType: { 
      type: String, 
      enum: ['Vehicle Registration', 'Vehicle Emmission Testing', 'Taxi Permit', 'other',''] 
    },
    otherDescription:String,
    licenseCost: Number
  },
  driverWages: {
    driverName: String,
    hoursWorked: Number,
    hoursWorked: Number,
    hourlyRate: Number,
    totalEarning: Number

  },
  other: {
    description: String,
    amount: Number
  }
}, { timestamps: true }); // Adding timestamps option to automatically manage createdAt and updatedAt fields

// Middleware to update updatedAt field before saving the document
expenseSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});


module.exports = mongoose.model('Expense', expenseSchema);

