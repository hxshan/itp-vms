const  mongoose  = require("mongoose");
const CaseFile = require("../models/caseFileModel");
const nodemailer = require('nodemailer');
const EmpRecord = require('../models/employeeRecordModel');


//create Case File
/* const createCaseFile = async (req, res) => {

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
    
};*/


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
                 
                 witnessesStatement,
                 emergencyServicesContacted,
                 emergencyServicesResponseTime,
                 emergencyServicesActionsTaken,
                 photographicEvidence,
                 insuranceCompaniesContactInfo,
                 insuranceStatus,
                 policeReport,
                isDriverFault} = req.body.data;
        
        try{
            
        
           
        
            const updatedCaseFile = await CaseFile.findByIdAndUpdate(id, { 
                
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
                
                 witnessesStatement,
                 emergencyServicesContacted,
                 emergencyServicesResponseTime,
                 emergencyServicesActionsTaken,
                 photographicEvidence,
                 insuranceCompaniesContactInfo,
                 insuranceStatus,
                 policeReport,
                 isDriverFault
            
        }, { new: true });
        
            if(!updatedCaseFile){
                return res.status(404).send("Case file not found");
            }

            if(isDriverFault){
                
                const record=new EmpRecord({
                    user:selectedDriver,
                    recordType:"negative",
                    description:incidentDescription,
                    occurenceDate:timeOfIncident,
                    caseFile:updatedCaseFile._id
                })
                console.log(record)
                await record.save();
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


const driverCreateCaseFile = async (req, res) => {

    
    try {
      const {
        caseType,
        caseTitle,
        location,
        timeOfIncident,
        licencePlate,
        driver,
        hire,
        vehicle,
        passengerCount,
        status,
        incidentDescription,
        severity

      } = req.body.data;

      console.log(req.body.data)
  
      if (!caseType || !caseTitle || !timeOfIncident || !driver  || !licencePlate || !passengerCount || !location || !incidentDescription || !hire || !severity) {
        console.log()
        return res.status(400).send("Missing required fields");
      }
  
      const newCaseFile = {
        caseType,
        caseTitle,
        location,
        timeOfIncident,
        licencePlate,
        driver,
        hire,
        vehicle,
        passengerCount,
        status ,
        incidentDescription,
        severity
        
       
      };
      
     
      const createdCaseFile = await CaseFile.create(newCaseFile);


      const populatedCaseFile = await CaseFile.findById(createdCaseFile._id).populate('driver').populate('hire');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        tls: {
            rejectUnauthorized: false,
        },
        auth: {
            user: 'adithyaperera983@gmail.com',
            pass: 'bkxosfghilscpzqg'
        },

      });


      sendmail(transporter,populatedCaseFile)

      return res.status(201).send(createdCaseFile);
    } catch (error) {
        console.error("Error creating case file", error);
        return res.status(500).send("Internal server error");
      }
  
      
     
    };

      const sendmail = async (transporter, populatedCaseFile) => {
        try {

            

            
        
        
        const mailOptions = {
            from: 'adithyaperera983@gmail.com',
            to: ['adithyaperera456@gmail.com', 'j.chamod914@gmail.com','malithgihan000@gmail.com','galgodageheshan@gmail.com'],
            subject: "Incident alert Reported!",
            html: `<h1>${populatedCaseFile.driver ? populatedCaseFile.driver.firstName : 'N/A'} Reported an incident</h1> 
            <p> Case File Details</p>
            <p>Case Type: ${populatedCaseFile.caseType}</p>
            <p>Case Title: ${populatedCaseFile.caseTitle}</p>
            <p>Time Of Incident: ${populatedCaseFile.timeOfIncident}</p>
            <p>Driver Name: ${populatedCaseFile.driver ? populatedCaseFile.driver.firstName : 'N/A'}${populatedCaseFile.driver ? populatedCaseFile.driver.lastName : 'N/A'}</p>
            <p>Customer Name: ${populatedCaseFile.hire ? populatedCaseFile.hire.cusName : 'N/A'}</p>
            <p>Customer Number: ${populatedCaseFile.hire ? populatedCaseFile.hire.cusMobile : 'N/A'}</p>
            <p>Passenger Count: ${populatedCaseFile.passengerCount}</p>
            <p>Location: ${populatedCaseFile.location}</p>
            <p>Licence Plate: ${populatedCaseFile.licencePlate}</p>
            <p>Incident Description: ${populatedCaseFile.incidentDescription}</p>
            <p>Severity: ${populatedCaseFile.severity}</p>
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }catch(error){
        console.log(error)
    }
    };

      
      
    
  //fetch all driver alerts

  const getDriverAlerts = async (req, res) => {
    try {
        const driverAlerts = await CaseFile.find({}).populate("driver").populate("hire");
        return res.status(200).send(driverAlerts);
    } catch (error) {
        console.log("Error getting driver alerts", error);
        return res.status(500).send("Internal server error");
    }
};

    //get a specific driver alert by its id
    const getDriverAlertById = async (req, res) => {
        try {
          const { id } = req.params;
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid case file id");
          }
          const caseFile = await CaseFile.findById(id).populate("driver") .populate("hire");
            console.log(caseFile)
      
          if (!caseFile) {
            return res.status(404).send("Case file not found");
          }
          return res.status(200).json(caseFile);
        } catch (error) {
          console.log("Error getting case files", error);
          return res.status(500).send("Internal server error");
        }
      };

   /* const getdriverDetailsById = async (req, res) => {
        try {
            const {id} = req.params;
            const Services = await CaseFile.find({ hire: id }).populate("");
    
    
            console.log(Services)
            return res.status(201).json(Services);
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message })
        }
    };*/
  

module.exports = { getCaseFiles, getCaseFileById, updateCaseFileById, deleteCaseFileById, driverCreateCaseFile, getDriverAlerts,getDriverAlertById};

