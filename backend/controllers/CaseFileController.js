const CaseFile = require('../models/caseFileModel')
const mongoose = require('mongoose')


//get all case files
const getCaseFiles = async (req,res) => {
    const caseFiles = await CaseFile.find({}).sort({createdAt:-1})

    res.status(200).json({caseFiles})
}

//get single case file by id
const getCaseFileById = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message:'Invalid Case File ID'})
    }

    const caseFile = await CaseFile.findById(id)

    if (!caseFile) {
        return res.status(404).json({message:'Case File Not Found'})
        
    }

    res.status(200).json({caseFile})
}

//create new case file

const createCaseFile = async (req,res) => {
    try{
    const{
        caseTitle,
        caseType,
        caseDesc,
        caseStatus,
        casePriority,
        caseAssignedTo,
        caseAssignedBy,
        caseDueDate,
        caseClosedDate,
        caseFileImage,
        caseFileDoc,
        caseFileVideo,
        caseFileAudio,
        caseFileLocation,
        caseFileDate
    } = req.body

    const newCaseFile = new CaseFile({
        caseTitle,
        caseType,
        caseDesc,
        caseStatus,
        casePriority,
        caseAssignedTo,
        caseAssignedBy,
        caseDueDate,
        caseClosedDate,
        caseFileImage,
        caseFileDoc,
        caseFileVideo,
        caseFileAudio,
        caseFileLocation,
        caseFileDate
    });

    await newCaseFile.save()

    res.status(201).json({message:'Case File Created Successfully'});

    }catch(error){
        console.error('Error Creating New Case File: ', error);
        res.status(500).json({message:'Server Error'});
    }

}

//delete case file 
const deleteCaseFile = async (req,res) => {
    try{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message:'No Case File Found'})
    }

    const caseFile = await CaseFile.findOneAndDelete({_id:id})

    if (!caseFile) {
        return res.status(404).json({message:'Case File Not Found'})
        
    }

    res.status(200).json({message:'Case File Deleted Successfully'})
    }catch(error){
        console.error('Error Deleting Case File: ', error);
        res.status(500).json({message:'Server Error'});
    
    }
}

//update caseFile

const updateCaseFile = async (req,res) => {
    try{
    const {id} = req.params
    const {caseTitle,caseType,caseDesc,caseStatus,casePriority,caseAssignedTo,caseAssignedBy,caseDueDate,caseClosedDate,caseFileImage,caseFileDoc,caseFileVideo,caseFileAudio,caseFileLocation,caseFileDate} = req.body

    const caseFile = await CaseFile.findAndUpdate({_id:id},{...req.body},{new:true})

    if (!caseFile) {
        return res.status(404).json({message:'Case File Not Found'})
        
    }

    res.status(200).json({message:'Case File Updated Successfully'})
}catch(error){
    console.error('Error Updating Case File: ', error);
    res.status(500).json({message:'Server Error'});

}


}



module.exports = {
    getCaseFiles,
    getCaseFileById,
    createCaseFile,
    deleteCaseFile,
    updateCaseFile
}