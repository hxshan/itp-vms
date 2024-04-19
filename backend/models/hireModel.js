const mongoose = require('mongoose');

const hireSchema = new mongoose.Schema({
  hireStatus: {
    type: String, 
    required: true
  },
  startDate: { 
    type: Date, 
    required: true 
},
  endDate: { 
    type: Date, 
    required: true 
},
  vehicleType: { 
    type: String, 
    required: true 
},
  passengerCount: { 
    type: Number, 
    required: true 
},
  airCondition: { 
    type: Boolean, 
    required: true 
},
  vehicle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicles',
},
  driver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
},
  startPoint: { 
    no: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
},
  endPoint: { 
    type: String, 
    required: true 
},
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    default: null 
  },
  tripType: { 
    type: Boolean, 
    required: true 
},
  estimatedDistance: { 
    type: Number, 
    required: true 
},
  actualDistance: { 
    type: Number, 
    default: null
  },
  actualTimeTaken: { 
    type: String, 
    default: null
  },
  cusName: { 
    type: String, 
    required: true 
},
  cusEmail: { 
    type: String, 
    required: true 
},
  cusMobile: { 
    type: String, 
    required: true 
},
  cusNic: { 
    type: String, 
    required: true 
},
  estimatedTotal: {
    type: Number,
    required: true
},
  finalTotal: {
    type: Number, 
    default: null
},
  advancedPayment: {
    type : Number,
    required: true 
},
  intialOdometerReading: {
    type: Number, 
    default: null
},
  intialOdometerPic: {
    type:String, 
    default: null
},
  finalOdometerReading: {
  type: Number, 
  default: null
},
  finalOdometerPic: {
    type:String, 
    default: null
},
  createdAt: {
  type: Date,
  default: Date.now,
},
});

module.exports = mongoose.model('Hire', hireSchema);