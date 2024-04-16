const express = require("express");
const { CaseFile } = require("../models/caseFileModel.js");
const { createCaseFile,
         getCaseFiles,
         getCaseFileById,
         updateCaseFileById,
         deleteCaseFileById,
         driverCreateEmergency   
        } = require("../controllers/CaseFileController.js");




const router = express.Router(); 

router.post("/create", createCaseFile);
router.post("/driverCreateEmergency",  driverCreateEmergency );
router.get("/", getCaseFiles);
router.get("/:id", getCaseFileById);
router.put("/:id", updateCaseFileById);
router.delete("/:id", deleteCaseFileById);





module.exports = { caseFileRouter: router};