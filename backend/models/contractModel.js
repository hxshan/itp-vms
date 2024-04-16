const  mongoose  = require("mongoose");

const Schema = mongoose.Schema

const contractSchema = new Schema({
    clientID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client',
    },
    Vehical_Type:{
        type:String,
    },
    Vehical:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicles' 
    },
    contract_SD:{
        type:Date,
    },
    contract_ED:{
        type:Date,
    },
    Insurance_Source:{
        type:String,
    },
    Insurace_provider:{
        type:String,
    },
    Policy_Number:{
        type:String,
    },
    Coverage_Type:{
        type:String,
    },
    Coverage_Amount:{
        type:String,
    },
    Deductible:{
        type:String,
    },
    Insurance_SD:{
        type:Date,
    },
    Insurance_ED:{
        type:Date,
    },
    Insurance_notes:{
        type:String,
    },
    Payment_Amount:{
        type:String,
    },
    Payment_Plan:{
        type:String,
    },
    Payment_Date:{
        type:Date,
    },
    Amount_Payed:{
        type:String,
    },
    Status:{
        type:String,
    }
})

module.exports = mongoose.model('Contract',contractSchema)
