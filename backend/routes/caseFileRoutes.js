const express = require("express");
const { CaseFile } = require("../models/caseFileModel.js");
const { createCaseFile,
         getCaseFiles,
         getCaseFileById,
         updateCaseFileById,
         deleteCaseFileById,   
        } = require("../controllers/CaseFileController.js");




const router = express.Router(); 

router.post("/create", createCaseFile);
router.get("/", getCaseFiles);
router.get("/:id", getCaseFileById);
router.put("/:id", updateCaseFileById);
router.delete("/:id", deleteCaseFileById);





module.exports = { caseFileRouter: router};