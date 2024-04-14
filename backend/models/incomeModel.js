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
    type: String, 

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
   
    hirePaymentType: String,
    hire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hire'
    },
    
  },
  contractIncome: {
  
    rentalType: String,
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Contract'
    }
    
  },
  description: {
    type: String
  },
  amount: {
    type: Number,
    
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
