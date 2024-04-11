const mongoose = require("mongoose");

const caseFileSchema = new mongoose.Schema(
    {
        caseTitle : {
            type:String,
            required:true
        },
       
        location : {
            type:String,
            required:true
        },

        timeOfIncident:{
            type:Date,
            required:true
        },

        

        Vehicle : {
            vin: {
                type: String,
                required: true
            },
            licencePlate : {
                type: String,
                required: true
            },
            currentCondition : {
                type: String,
                required: true
            }
            },

            driver : {
                driverID: {
                    type: String,
                    
                
                },
                name: {
                    type: String,
                   
                },
                licenceNumber: {
                    type: String,
                    
                },
            },

           
                passengerCount: {
                    type: Number,
                    required: true
                
                },
        
            
            status: {
                type: String,
                enum: ["completed", "incomplete"],
                default: "incomplete"
            },

            incident: {
                description: {
                    type: String,
                    required: true
                },
                severity: {
                    type: String,
                    enum: ["minor", "moderate" , "severe"],
                    required: true
                },
                injuries: [{
                    inDiscription : {
                        type: String,
                        required: true
                    
                    }
                }],
            },
            witnesses: [{
                contactInformation: { 
                    type: String 
                },
                statement: { 
                    type: String 
                }
            }],

            emergencyServices: {
                contacted: { 
                    type: Boolean, 
                    default: false 
                },
                responseTime: { 
                    type: String 
                },
                actionsTaken: { 
                    type: String 
                }
            },

            photographicEvidence: [{
                type: String,
            }],

            insuranceInformation: {
                driverInsuranceDetails: { 
                    type: String 
                },
                insuranceCompaniesContactInfo: { 
                    type: String 
                },
                insuranceStatus: {
                    type: String,
                    enum: ["pending", "completed"],
                    default: "pending"
                    
                }
            },

            policeReport: {
                type: String, // link to the document
            }

        },

        
       
    
    {
        timestamps:{ currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
    }

);
 const CaseFile = mongoose.model("CaseFile", caseFileSchema);
 module.exports = CaseFile;