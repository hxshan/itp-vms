const mongoose = require('mongoose')

const Schema = mongoose.Schema 


const expenseSchema = new Schema ({

    
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tourVehicles',
        required: true
      },
      type: {
        type: String,
        enum: ['Fuel', 'Maintenance', 'Insurance', 'Repairs', 'Other'],
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      receiptImage: {
        type: String,
         
      },
      notes: {
        type: String
      },
      fuelDetails: {
        type: {
          fuelType: {
            type: String,
            enum: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']
          },
          fuelQuantity: Number,
          fuelPricePerUnit: Number
        }
      },
      maintenanceDetails: {
        type: {
          description: String,
          partsCost: Number,
          laborCost: Number
        }
      }
   

} , { timestamps: true });


module.exports = mongoose.model('expense', expenseSchema)