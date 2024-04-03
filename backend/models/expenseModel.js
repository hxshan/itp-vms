const mongoose = require('mongoose');

// Define main expense schema with embedded documents for category-specific details
const expenseSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true 
  },
  vehicle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'vehicles', 
    required: true 
  },
  recordedBy: { 
    type: String, 
    required: true 
  },
  tripId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'hires' 
  },
  category: { 
    type: String, 
    enum: ['Fuel', 'Maintenance and Repairs', 'Insurance', 'Licensing and Permits', 'Other'], 
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
      enum: ['Petrol', 'Diesel', 'Electric'] 
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
      enum: ['Vehicle Registration', 'Vehicle Emmission Testing', 'Taxi Permit'] 
    },
    licenseCost: Number
  },
  driverWages: {
    driverName: String,
    hoursWorked: Number,
    hoursWorked: Number,
    hourlyRate: Number,
    totalEarning: Number

  },
  otherDetails: {
    description: String,
    amount: Number
  }
});

// Create expense model
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
