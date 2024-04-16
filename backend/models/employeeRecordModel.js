const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeeRecordShema = new Schema({
    user:{
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
     caseFile:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'CaseFile'
     },
     timestamp: {
      type: Date,
      default: Date.now
    } 
})

module.exports = mongoose.model('EmployeeRecord',EmployeeRecordShema)