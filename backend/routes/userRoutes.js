const express = require('express')  
//const Auth = require('../middleware/Auth')
const {createUser,getAllUsers,deleteUser,getUserById,resetPassword,getDrivers} = require('../controllers/userController')
//const verifyJWT = require("../middleware/verifyJWT")
const Auth =require('../middleware/Auth')
const router = express.Router()

const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/nic_documents'); // Specify the upload directory
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

router.post('/',upload.single('nicDocument'),createUser)
//router.delete('/',deleteUser)



module.exports = router;