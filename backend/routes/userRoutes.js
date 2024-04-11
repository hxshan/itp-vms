const express = require('express')  
//const Auth = require('../middleware/Auth')
const {createUser,getAllUsers,getUserById,resetPassword,getDrivers,setUserAsDeleted} = require('../controllers/userController')
//const verifyJWT = require("../middleware/verifyJWT")
const Auth =require('../middleware/Auth')
const router = express.Router()

const multer = require('multer');
// Set up Multer storage configuration
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

// Initialize Multer with the storage configuration
const upload = multer({ storage });




router.get('/',Auth,getAllUsers)
router.get('/drivers',getDrivers)
router.get('/:id',getUserById)
router.patch('/password/:id',resetPassword)
router.patch('/delete/:id',setUserAsDeleted)

router.post('/',upload.fields([{name:'nicDocument',maxCount:1},{name:'licenceDoc',maxCount:1},{name:'empPhoto',maxCount:1}]),createUser)
//router.delete('/',deleteUser)





module.exports = router;