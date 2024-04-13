const mongoose = require('mongoose')

const hireRates = new mongoose.Schema ({
    vehicleCatagory: {
        type: String, 
        required: true
      },
      baseDistence: { 
        type: Number, 
        required: true 
    },
      baseRate: { 
        type: Number, 
        required: true 
    },
      additionalRate: { 
        type: Number, 
        required: true 
    },
    acBaseRate : {
      type: Number, 
      required: true
    },
    acAdditionalRate : {
      type: Number, 
      required: true
    }
})

module.exports = mongoose.model('hireRates', hireRates)