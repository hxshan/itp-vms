const CaseFile = require("../models/caseFileModel");


//create Case File
 const createCaseFile = async (req, res) => {

        try{
            if(
                !req.body.caseTitle ||
                !req.body.location ||
                !req.body.timeOfIncident ||
                !req.body.licencePlate ||
                !req.body.currentCondition ||
                !req.body.passengerCount ||
                !req.body.incidentDescription ||
                !req.body.severity ||
                !req.body.injuriesDiscription ||
                !req.body.status


            ){
                return res.status(400).send("Missing required fields");
            }
    
            const newCaseFile = {
                caseTitle: req.body.caseTitle,
                location: req.body.location,
                timeOfIncident: req.body.timeOfIncident,
                licencePlate: req.body.licencePlate,
                currentCondition: req.body.currentCondition,
                passengerCount: req.body.passengerCount,
                incidentDescription: req.body.incidentDescription,
                severity: req.body.severity,
                injuriesDiscription: req.body.injuriesDiscription,
                status : req.body.status || "incomplete",
                driverID: req.body.driverID,
                driverName: req.body.driverName,
                driverLicenceNumber: req.body.driverLicenceNumber,
                witnessesContactInformation: req.body.witnessesContactInformation,
                witnessesStatement: req.body.witnessesStatement,
                emergencyServicesContacted: req.body.emergencyServicesContacted,
                emergencyServicesResponseTime: req.body.emergencyServicesResponseTime,
                emergencyServicesActionsTaken: req.body.emergencyServicesActionsTaken,
                photographicEvidence: req.body.photographicEvidence,
                insuranceCompaniesContactInfo: req.body.insuranceCompaniesContactInfo,
                insuranceStatus: req.body.insuranceStatus,
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
        const  { caseTitle, 
                 location, 
                 timeOfIncident, 
                 passengerCount, 
                 licencePlate, 
                 currentCondition, 
                 driverID, 
                 driverName, 
                 driverLicenceNumber,  
                 status, 
                 incidentDescription , 
                 severity,
                 injuriesDiscription,
                 witnessesContactInformation,
                 witnessesStatement,
                 emergencyServicesContacted,
                 emergencyServicesResponseTime,
                 emergencyServicesActionsTaken,
                 photographicEvidence,
                 insuranceCompaniesContactInfo,
                 insuranceStatus,
                 policeReport} = req.body;
        
        try{
            
        
           
        
            const updatedCaseFile = await CaseFile.findByIdAndUpdate(id, { 
                caseTitle,
                location, 
                 timeOfIncident, 
                 passengerCount, 
                 licencePlate, 
                 currentCondition, 
                 driverID, 
                 driverName, 
                 driverLicenceNumber,  
                 status, 
                 incidentDescription , 
                 severity,
                 injuriesDiscription,
                 witnessesContactInformation,
                 witnessesStatement,
                 emergencyServicesContacted,
                 emergencyServicesResponseTime,
                 emergencyServicesActionsTaken,
                 photographicEvidence,
                 insuranceCompaniesContactInfo,
                 insuranceStatus,
                 policeReport
            
        }, { new: true });
        
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
