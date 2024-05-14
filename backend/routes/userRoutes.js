const express = require('express')  
const {
  deleteRecord,
  createUser,
  getAllUsers,
  getUserById,
  resetPassword,
  getDrivers,
  setUserAsDeleted
  ,updateUserPersonal,
  deleteContact,
  updateContact,
  updateDocuments,
  getUserDetailsFull,
  getRecords,
  getRecordByRecordId} = require('../controllers/userController')

const {createRecord,updateRecord }=require('../controllers/employeeRecordController')
const Auth =require('../middleware/Auth')


const router = express.Router()

const multer = require('multer');
const logUserActivity = require('../middleware/logUserActivity')


const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    let path='';
    if(file.fieldname =='nicDocument')
      path='uploads/nic_documents'
    else if(file.fieldname == 'licenceDoc')
      path='uploads/licence_documents'
    else
      path='uploads/employee_picture'
    
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});


const upload = multer({ storage });



//GET
//router.get('/',Auth,getAllUsers)
router.get('/',Auth,getAllUsers)
router.get('/drivers',getDrivers)
router.get('/drivers/records',getRecords)
router.get('/drivers/records/:id',getRecordByRecordId)
router.get('/:id',getUserById)
router.get('/report/:id',getUserDetailsFull)
router.get('/activity')

//POST
router.post('/',upload.fields([{name:'nicDocument',maxCount:1},{name:'licenceDoc',maxCount:1},{name:'empPhoto',maxCount:1}]),Auth,createUser)
router.post('/record',createRecord)

//PATCH
router.patch('/password/:id',resetPassword)
router.patch('/delete/:id',Auth,setUserAsDeleted)
router.patch('/personal/:id',updateUserPersonal)
router.patch('/addcontacts/:id',updateContact)
router.patch('/editdocs/:id',upload.fields([{name:'nicDocument',maxCount:1},{name:'licenceDoc',maxCount:1},{name:'empPhoto',maxCount:1}]),updateDocuments)
router.patch('/drivers/records/:id',updateRecord)

//DELETE
router.patch('/contacts/:id',Auth,deleteContact)
router.delete('/drivers/records/:id',deleteRecord)





module.exports = router;