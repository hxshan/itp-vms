const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const EmergencyContact = require("../models/emergencyContactModel");
const Role = require("../models/roleModel");

//TODO:add validation use REGEX 
const createUser = async (req, res) => {
  try {
    
    const {
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      phoneNumber,
      nicNumber,
      role,
      department,
      jobTitle,
      empDate,
      baseSal,
      licenceNum,
      status,
      email,
      password,
      emergencyContacts,
    } = req.body;

 
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
  

    const userExist = await User.findOne({ email: email.toLowerCase()});

    if (userExist)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (!req.files.nicDocument) {
      return res.status(400).json({ message: 'NIC document is required' });
    }

    const nicDocumentPath = req.files.nicDocument[0].path||null;
    
    const empPhotoName=req.files.empPhoto[0].filename;
    console.log(empPhotoName)
    //match front and back names
    const user = new User({
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      phoneNumber,
      nicNumber,
      nicDocument:nicDocumentPath,
      status,
      department,
      jobTitle,
      emergencyContacts:[],
      employmentDate: empDate,
      baseSalary: baseSal,
      licenceNumber: licenceNum,
      email:email.toLowerCase(),
      password: passwordHash,
      role,
      empPhoto:empPhotoName
    });
    const parsedEmergencyContacts = JSON.parse(emergencyContacts);

    try {//create the emergency contact first then the user
      const emergencyContactPromises = parsedEmergencyContacts.map(async (contact) => {
        const EmContact = new EmergencyContact({
          name: contact.emergencyName,
          number: contact.emergencyContact,
        });
        let newContact = await EmContact.save();
        return newContact._id
      });
      const emergencyContactIds = await Promise.all(emergencyContactPromises);
      user.emergencyContacts = emergencyContactIds;
      
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    console.log(user)
    await user.save();
    console.log('saved')


    return res.status(200).json({ message: "User created succesfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const updateUserPersonal = async(req,res) =>{
  try {
    const {id} =req.params;
    const {
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      phoneNumber,
      nicNumber,
      role,
      department,
      jobTitle,
      empDate,
      baseSal,
      licenceNum,
      status,
    } = req.body;

 
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
  
    try{
      const updatedUser = await User.findByIdAndUpdate(id,{
        firstName,
        middleName,
        lastName,
        gender,
        dob,
        phoneNumber,
        nicNumber,
        role,
        department,
        jobTitle,
        empDate,
        baseSal,
        licenceNum,
        status,
      })

      if (!updatedUser) {
        return res.status(500).json({ message: "Update Failed" });
      }
      res.status(200).json(updatedUser);

    }catch(err){
      res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ message: "User Updated succesfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }

}



const getAllUsers = async (req, res) => {
  try {
    let users = await User.find().populate("role");

    if (!users) {
      return res.json([{}]);
    }
    users=users.filter(user=>user.status !='deleted')
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const setUserAsDeleted=async (req,res)=>{
  const {id}=req.params
  console.log(id)
  try{
    const updateduser= await User.findByIdAndUpdate(id,{status:'deleted'})
    if(!updateduser) return res.status(500).json({ message: "Update Failed" });
    res.status(200).json(updateduser);
  }catch(err){
    return res.status(500).json({message:"Internal Sever Error"})
  }
}

const getDrivers= async (req,res)=>{
  try{
    const driverRole= await Role.findOne({name:'DRIVER'}).exec()
    if(!driverRole) return res.status(404).json({message:'No such Role Exists in the System'})

    const drivers=await User.find({role:driverRole._id}).exec()

    if (!drivers) {
      return res.json([{}]);
    }

    return res.status(200).json(drivers);  

  }catch(error){
    console.log(error)
  }
  
}

const getUserById = async (req,res)=>{
  
  try{
    const {id} = req.params;
  
    const user = await User.findById(id).populate('emergencyContacts').exec()
    if(!user) return res.status(404).json({message:'User Not Found'})
    return res.status(200).json(user)
  }catch(error){
    console.log(error);
    return res.status(404).json({message:JSON.stringify(error.message)})
  }
    
}


//TODO:add validation use REGEX
const resetPassword = async(req,res)=>{
  try{
    const {id} = req.params
    const {currentPwd,newPwd} =req.body.data;

    if(!currentPwd) return res.status(401).json({message:'Enter Current Password'})
    if(!newPwd) return res.status(401).json({message:'Enter New Password'})

    const userpwd= await User.findById(id)
    if(!userpwd) return res.status(401).json({message:'User Not Found'})
    const match = await bcrypt.compare(currentPwd,userpwd.password)
    
    if(!match) return res.status(401).json({message:'Current Password is Wrong'})

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPwd, salt);
    const user = User.findByIdAndUpdate(id,{password:passwordHash})

    if(!user) return res.status(500).json({message:'Update Failed'})

    return res.status(200).json({message:'succesfull'})
    
  }catch(error){
    return res.status(500).json({message:'internal server Error'})
  }
}

module.exports = { createUser, getAllUsers,getUserById,resetPassword,getDrivers,setUserAsDeleted,updateUserPersonal};
