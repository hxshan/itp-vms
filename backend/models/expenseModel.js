const mongoose = require('mongoose');

// Define a schema for the Expense document
const expenseSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    
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
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hire'
  },
  category: { 
    type: String, 
    enum: ['Fuel', 'Maintenance and Repairs', 'Insurance', 'Licensing and Permits', 'Driver Wages','Tolls and Parking','Driver Hire Expense','Other'], 
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
  // Fuel specific fields
  odometerReading: { 
    type: Number, 
    required: function () { return this.category === 'Fuel'; } 
  },
  fuelType: { 
    type: String, 
    enum: ['Petrol', 'Diesel', 'Electric','']
  },
  fuelQuantity: { 
    type: Number, 
    required: function () { return this.category === 'Fuel'; } 
  },
  fuelPricePerUnit: { 
    type: Number, 
    required: function () { return this.category === 'Fuel'; } 
  },
  totalFuelPrice: { 
    type: Number, 
    required: function () { return this.category === 'Fuel'; } 
  },
  // Maintenance and Repairs specific fields
  maintenanceDescription: { 
    type: String, 
    required: function () { return this.category === 'Maintenance and Repairs'; } 
  },
  serviceProvider: { 
    type: String, 
    required: function () { return this.category === 'Maintenance and Repairs'; } 
  },
  invoiceNumber: { 
    type: String, 
    required: function () { return this.category === 'Maintenance and Repairs'; } 
  },
  maintenanceCost: { 
    type: Number, 
    required: function () { return this.category === 'Maintenance and Repairs'; } 
  },
  // Insurance specific fields
  insuaranceProvider: { 
    type: String, 
    required: function () { return this.category === 'Insurance'; } 
  },
  policyNumber: { 
    type: Number, 
    required: function () { return this.category === 'Insurance'; } 
  },
  premiumAmount: { 
    type: Number, 
    required: function () { return this.category === 'Insurance'; } 
  },
  // Licensing and Permits specific fields
  licenseType: { 
    type: String, 
    enum: ['Vehicle Registration', 'Vehicle Emmission Testing', 'Taxi Permit', 'other',''], 
    required: function () { return this.category === 'Licensing and Permits'; } 
  },
  otherLicensingDescription: { 
    type: String, 
    required: function () { return this.category === 'Licensing and Permits'} 
  },
  licenseCost: { 
    type: Number, 
    required: function () { return this.category === 'Licensing and Permits'; } 
  },
  // Driver Wages specific fields
  driverName: { 
    type : mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: function () { return this.category === 'Driver Wages'; } 
  },
  wagepercentage: { 
    type: Number, 
    required: function () { return this.category === 'Driver Wages'; } 
  },
  tripAmount: { 
    type: Number, 
    required: function () { return this.category === 'Driver Wages'; } 
  },
  totalEarning: { 
    type: Number, 
    required: function () { return this.category === 'Driver Wages'; } 
  },
  // Other category specific fields
  otherDescription: { 
    type: String, 
    required: function () { return this.category === 'Other'; } 
  },
  otherAmount: { 
    type: Number, 
    required: function () { return this.category === 'Other'; } 
  },
  isReimbursement: {
    type: Boolean,
    default: false
  },
  reimbursementAmount: {
    type: Number
  },
  reimbursmentPerson:{
    type : mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  reimbursementStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Paid', 'Rejected']
  }
}, { timestamps: true }); // Adding timestamps option to automatically manage createdAt and updatedAt fields

// Middleware to update updatedAt field before saving the document
expenseSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Middleware to clear reimbursement-related fields if isReimbursement is false
expenseSchema.pre('save', function(next) {
  if (!this.isReimbursement) {
    this.reimbursementAmount = undefined;
    this.reimbursmentPerson = undefined;
    this.reimbursementStatus = undefined;
  }
  next();
});


// Middleware to clear non-related fields if category is changed
expenseSchema.pre('validate', function(next) {
  const category = this.category;
  const fieldsToClear = ['odometerReading', 'fuelType', 'fuelQuantity', 'fuelPricePerUnit', 'totalFuelPrice',
                         'maintenanceDescription', 'serviceProvider', 'invoiceNumber', 'maintenanceCost',
                         'insuaranceProvider', 'policyNumber', 'premiumAmount',
                         'licenseType', 'otherLicensingDescription', 'licenseCost',
                         'driverName', 'hoursWorked', 'hourlyRate', 'totalEarning',
                         'otherDescription', 'otherAmount'];

  if (category === 'Fuel') {
      // Retain fuel-related fields and clear others
      fieldsToClear.forEach(field => {
          if (!['odometerReading', 'fuelType', 'fuelQuantity', 'fuelPricePerUnit', 'totalFuelPrice'].includes(field)) {
              this[field] = undefined;
          }
      });
  } else if (category === 'Maintenance and Repairs') {
      // Retain maintenance-related fields and clear others
      fieldsToClear.forEach(field => {
          if (!['maintenanceDescription', 'serviceProvider', 'invoiceNumber', 'maintenanceCost'].includes(field)) {
              this[field] = undefined;
          }
      });
  } else if (category === 'Insurance') {
      // Retain insurance-related fields and clear others
      fieldsToClear.forEach(field => {
          if (!['insuaranceProvider', 'policyNumber', 'premiumAmount'].includes(field)) {
              this[field] = undefined;
          }
      });
  } else if (category === 'Licensing and Permits') {
      // Retain licensing-related fields and clear others
      fieldsToClear.forEach(field => {
          if (!['licenseType', 'otherLicensingDescription', 'licenseCost'].includes(field)) {
              this[field] = undefined;
          }
      });
  } else if (category === 'Driver Wages') {
      // Retain driver wages related fields and clear others
      fieldsToClear.forEach(field => {
          if (!['driverName', 'hoursWorked', 'hourlyRate', 'totalEarning'].includes(field)) {
              this[field] = undefined;
          }
      });
  } else if (category === 'Other') {
      // Retain other related fields and clear others
      fieldsToClear.forEach(field => {
          if (!['otherDescription', 'otherAmount'].includes(field)) {
              this[field] = undefined;
          }
      });
  }

  next();
});


module.exports = mongoose.model('Expense', expenseSchema);
