const CaseFile = require("../models/caseFileModel");


//create Case File
 const createCaseFile = async (req, res) => {

        try{
            if(
                !req.body.caseTitle ||
                !req.body.caseDesc ||
                !req.body.casePriority
            ){
                return res.status(400).send("Missing required fields");
            }
    
            const newCaseFile = {
                caseTitle: req.body.caseTitle,
                caseDesc: req.body.caseDesc,
                casePriority: req.body.casePriority
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
    
        try{
            if(
                !req.body.caseTitle ||
                !req.body.caseDesc ||
                !req.body.casePriority
            ){
                return res.status(400).send("Missing required fields");
            }
        
            const { id } = req.params;
        
            const updatedCaseFile = await CaseFile.findByIdAndUpdate(id, req.body);
        
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
