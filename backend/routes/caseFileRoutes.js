const express = require("express");
const { CaseFile } = require("../models/caseFileModel.js");
const { createCaseFile,
         getCaseFiles,
         getCaseFileById,
         updateCaseFileById,
         deleteCaseFileById,
         driverCreateEmergency,   
         getDriverAlerts,
         getDriverAlertById
        } = require("../controllers/CaseFileController.js");




const router = express.Router(); 

router.post("/create", createCaseFile);
router.post("/driverCreateEmergency",  driverCreateEmergency );
router.get("/", getCaseFiles);
router.get("/driverAlerts", getDriverAlerts);
router.get("/:id", getCaseFileById);
router.get("/driverAlerts/:id", getDriverAlertById);
router.put("/:id", updateCaseFileById);
router.delete("/:id", deleteCaseFileById);





module.exports = { caseFileRouter: router};