const mongoose = require('mongoose')

const Schema = mongoose.Schema

const caseFileSchema = new Schema({
    caseTitle : {type:String,required:true},
    caseType : {type:String,required:true},
    caseDesc : {type:String,required:true},
    caseStatus : {type:String,required:true},
    casePriority : {type:String,required:true},
    caseAssignedTo : {type:String,required:true},
    caseAssignedBy : {type:String,required:true},
    caseDueDate : {type:Date,required:true},
    caseClosedDate : {type:Date,required:true},
    caseFileImage : {type:String,required:true},
    caseFileDoc : {type:String,required:true},
    caseFileVideo : {type:String,required:true},
    caseFileAudio : {type:String,required:true},
    caseFileLocation : {type:String,required:true},
    caseFileDate : {type:Date,required:true},
},

{timestamps:true})

module.exports = mongoose.model('CaseFile',caseFileSchema)
