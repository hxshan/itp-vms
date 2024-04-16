const mongoose = require("mongoose");

const caseFileSchema = new mongoose.Schema(
    {

        caseType: {
            type: String,
            enum:["accident", "emergency", "other"],
        },
        caseTitle : {
            type:String,
            
        },
       
        location : {
            type:String,
            
        },

        timeOfIncident:{
            type:Date,
            
        },

        

        
           
            licencePlate : {
                type: String,
                
            },
            currentCondition : {
                type: String,
                
            },
    
           
                driverID: {
                    type: String,
                    
                
                },
                 driverName: {
                    type: String,
                   
                },
                driverLicenceNumber: {
                    type: String,
                    
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

           
              incidentDescription: {
                    type: String,
                   
                },
                severity: {
                    type: String,
                    enum: ["minor", "moderate" , "severe"],
                    
                },
               
                    injuriesDiscription : {
                        type: String,
                        
                    
                    },
               
        
          
            witnessesContactInformation: { 
                    type: String 
                },
                witnessesStatement: { 
                    type: String 
                },
          

            
                emergencyServicesContacted: { 
                   type: String,
                   enum:["Yes", "No"],
                },
                emergencyServicesResponseTime: { 
                    type: String 
                },
                emergencyServicesActionsTaken: { 
                    type: String 
                },
            

            photographicEvidence: {
                type: String,
            },

            
               
                insuranceCompaniesContactInfo: { 
                    type: String 
                },
                insuranceStatus: {
                    type: String,
                    enum: ["pending", "completed"],
                    default: "pending"
                    
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