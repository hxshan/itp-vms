const express = require('express')

const {getCaseFileById, getCaseFiles, createCaseFile, deleteCaseFile, updateCaseFile} = require('../controllers/CaseFileController')

const router = express.Router()



router.get('/:id', getCaseFileById)

router.get('/', getCaseFiles)

router.post('/',createCaseFile)

router.delete('/:id', deleteCaseFile)

router.patch('/:id', updateCaseFile)




module.exports = router