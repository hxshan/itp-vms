const mongoose = require("mongoose");

const caseFileSchema = new mongoose.Schema(
    {
        caseTitle : {
            type:String,
            required:true
        },
        caseDesc : {
            type:String,
            required:true
        },

        casePriority : {
            type:String,
            required:true
        },
    },
    {
        timestamps:true
    }

);
 const CaseFile = mongoose.model("CaseFile", caseFileSchema);
 module.exports = CaseFile;