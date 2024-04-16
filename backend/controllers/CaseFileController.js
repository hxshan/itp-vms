const  mongoose  = require("mongoose");
const CaseFile = require("../models/caseFileModel");


//create Case File
 const createCaseFile = async (req, res) => {

        try{
            if(
                !req.body.caseType ||
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
                caseType: req.body.caseType,
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
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json("Invalid case file id");
            }
            const caseFile = await CaseFile.findById(id);

            if(!caseFile){
                return res.status(404).send("Case file not found");
            }
            return res.status(200).json(caseFile);
        
        }catch(error){
            console.log("Error getting case files", error);
            return res.status(500).send("Internal server error");
        
        }
        
};

 const updateCaseFileById = async (req, res) => {
    

        const { id } = req.params;
        const  { 
                caseType,
                caseTitle, 
                 location, 
                 timeOfIncident, 
                 passengerCount, 
                 licencePlate, 
                 currentCondition, 
                 selectedDriver, 
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
                 policeReport} = req.body.data;
        
        try{
            
        
           
        
            const updatedCaseFile = await CaseFile.findByIdAndUpdate(id, { 
                caseType,
                caseTitle,
                location, 
                 timeOfIncident, 
                 passengerCount, 
                 licencePlate, 
                 currentCondition, 
                 selectedDriver, 
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

const driverCreateEmergency = async (req, res) => {
    try {
      const {
        caseTitle,
        timeOfIncident,
        driverID,
        driverName,
        driverLicenceNumber,
        licencePlate,
        passengerCount,
        location,
        incidentDescription,
        hire, 
        severity
      } = req.body.data;

      console.log(req.body)
  
      if (!caseTitle || !timeOfIncident || !driverID || !driverName || !driverLicenceNumber || !licencePlate || !passengerCount || !location || !incidentDescription || !hire || !severity) {
        return res.status(400).send("Missing required fields");
      }
  
      const newCaseFile = {
        caseTitle,
        timeOfIncident,
        driverID,
        driverName,
        driverLicenceNumber,
        licencePlate,
        passengerCount,
        location,
        incidentDescription,
        hire,
        severity
      };
  
      const createdCaseFile = await CaseFile.create(newCaseFile);
      return res.status(201).send(createdCaseFile);
    } catch (error) {
      console.error("Error creating case file", error);
      return res.status(500).send("Internal server error");
    }

    
   
  };
  //fetch all driver alerts

  const getDriverAlerts = async (req, res) => {
    try{
        const driverAlerts = await CaseFile.find({});
        return res.status(200).send(driverAlerts);
    }catch(error){
        console.log("Error getting driver alerts", error);
        return res.status(500).send("Internal server error");
    }
}

    //get a specific driver alert by its id
    const getDriverAlertById = async (req, res) => {
        try{
            const { id } = req.params;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).send("Invalid driver alert id");
            }
            const driverAlert = await CaseFile.findById(id);
            if(!driverAlert){
                return res.status(404).send("Driver alert not found");
            }
            return res.status(200).send(driverAlert);
        }catch(error){
            console.log("Error getting driver alert", error);
            return res.status(500).send("Internal server error");
        }
    }
  


module.exports = {createCaseFile, getCaseFiles, getCaseFileById, updateCaseFileById, deleteCaseFileById, driverCreateEmergency, getDriverAlerts,getDriverAlertById};
