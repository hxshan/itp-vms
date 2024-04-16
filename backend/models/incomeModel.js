const mongoose = require('mongoose');


const incomeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  vehicle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicles', 
  
  },
  recordedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 

  },
  editedBy: { 
    type: String,
    default: ''
     
  },
  source: {
    type: String,
   
  },
  hirePayment: {
    // Fields specific to hire payments
   
    
    hire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hire'
    },
    hirePaymentType:{
      type: String,
    enum: ['Final Payment','Advance Payment']

    },
    hireAmount:{
      type: Number,

    }
  },
  contractIncome: {
  
    
    
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Contract'
    },
    
    rentalType:{ 
      type: String,
    enum: ['upFront', 'Monthly'],
    },
    rentalAmount:{
      type: Number,

    }

  },
  description: {
    type: String
  },
  
  paymentMethod: {
    type: String,
  
  },
 
 
  status: {
    type: String,
    enum: ['Pending', 'Received', 'Confirmed'],
    default: 'Pending'
  },
  

  comments: {
    type: String
  },
  
  
});

// Create the Income model
const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
