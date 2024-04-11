const CaseFile = require("../models/caseFileModel");


//create Case File
 const createCaseFile = async (req, res) => {

        try{
            if(
                !req.body.caseTitle ||
                !req.body.location ||
                !req.body.timeOfIncident ||
                !req.body.Vehicle.vin ||
                !req.body.Vehicle.licencePlate ||
                !req.body.Vehicle.currentCondition ||
                !req.body.passengerCount ||
                !req.body.incident.description ||
                !req.body.incident.severity ||
                !req.body.incident.injuries 


            ){
                return res.status(400).send("Missing required fields");
            }
    
            const newCaseFile = {
                caseTitle: req.body.caseTitle,
                location: req.body.location,
                Vehicle : {
                    vin: req.body.Vehicle.vin,
                    licencePlate: req.body.Vehicle.licencePlate,
                    currentCondition: req.body.Vehicle.currentCondition
                },

                passengerCount: req.body.passengerCount,

                incident: {
                    description: req.body.incident.description,
                    severity: req.body.incident.severity,
                    injuries: req.body.incident.injuries
                },

                status : req.body.status || "incomplete",

                witnesses: {
                    contactInformation: req.body.witnesses.contactInformation,
                    statement: req.body.witnesses.statement
                },

                emergencyServices: {
                    contacted: req.body.emergencyServices.contacted || false,
                    responseTime: req.body.emergencyServices.responseTime,
                    actionsTaken: req.body.emergencyServices.actionsTaken
                },

                photographicEvidence: req.body.photographicEvidence || [],

                insuranceInformation: {
                    driverInsuranceDetails: req.body.insuranceInformation.driverInsuranceDetails,
                    insuranceCompaniesContactInfo: req.body.insuranceInformation.insuranceCompaniesContactInfo,
                    insuranceStatus : req.body.insuranceInformation.insuranceStatus || "pending"
                },

                policeReport : req.body.policeReport


            };
    
            const createdCaseFile = await CaseFile.create(newCaseFile);
            
            return res.status(201).send(createdCaseFile);
                
        }catch(error){
            console.log("Error creating case file", error);
            return res.status(500).send("Internal server error");
        }
    
};


//fetch all case files
const getCaseFiles = async (req, res) => {
    
        try{
            const caseFiles = await CaseFile.find({});
            return res.status(200).send(caseFiles);
        
        }catch(error){
            console.log("Error getting case files", error);
            return res.status(500).send("Internal server error");
        
        }
        
    };

 const getCaseFileById = async (req, res) => {
    
        try{
        
            const { id} = req.params;
            const caseFile = await CaseFile.findById(id);
            return res.status(200).send(caseFile);
        
        }catch(error){
            console.log("Error getting case files", error);
            return res.status(500).send("Internal server error");
        
        }
        
};

 const updateCaseFileById = async (req, res) => {
    

        const { id } = req.params;
        const  { caseTitle, location, Vehicle, passengerCount, incident, status, witnesses, emergencyServices, photographicEvidence, insuranceInformation, policeReport } = req.body;
        
        try{
            
        
           
        
            const updatedCaseFile = await CaseFile.findByIdAndUpdate(id, { caseTitle, location, Vehicle, passengerCount, incident, status, witnesses, emergencyServices, photographicEvidence, insuranceInformation, policeReport }, { new: true });
        
            if(!updatedCaseFile){
                return res.status(404).send("Case file not found");
            }
        
            return res.status(200).send({ message: "Case file updated successfully"});
        }catch(error){
            console.log("Error updating case file", error);
            return res.status(500).send("Internal server error");
        }
        
        
};

 const deleteCaseFileById = async (req, res) => {
    
        try{
            const { id } = req.params;
            const deletedCaseFile = await CaseFile.findByIdAndDelete(id);
        
            if(!deletedCaseFile){
                return res.status(404).send("Case file not found");
            }
        
            return res.status(200).send({ message: "Case file deleted successfully"});
        }catch(error){
            console.log("Error deleting case file", error);
            return res.status(500).send("Internal server error");
        }
        
};

module.exports = {createCaseFile, getCaseFiles, getCaseFileById, updateCaseFileById, deleteCaseFileById};
