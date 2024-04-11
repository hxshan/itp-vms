const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeeRecordShema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
      },
     recordType:{
        type:String,
        enum: ['positive', 'negative']
     },
     description:{
        type:String
     },
     occurenceDate:{
        type:Date
     },
     timestamp: {
      type: Date,
      default: Date.now
    } 
})

module.exports = mongoose.model('EmployeeRecord',EmployeeRecordShema)