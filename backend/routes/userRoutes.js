const express = require('express')  
const {createUser,getAllUsers,getUserById,resetPassword,getDrivers,setUserAsDeleted,updateUserPersonal,deleteContact} = require('../controllers/userController')
const Auth =require('../middleware/Auth')


const router = express.Router()

const multer = require('multer');


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
router.get('/',Auth,getAllUsers)
router.get('/drivers',getDrivers)
router.get('/:id',getUserById)

//POST
router.post('/',upload.fields([{name:'nicDocument',maxCount:1},{name:'licenceDoc',maxCount:1},{name:'empPhoto',maxCount:1}]),createUser)

//PATCH
router.patch('/password/:id',resetPassword)
router.patch('/delete/:id',setUserAsDeleted)
router.patch('/personal/:id',updateUserPersonal)

//DELETE
router.patch('/contacts/:id',deleteContact)





module.exports = router;