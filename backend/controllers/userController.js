const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const EmergencyContact = require("../models/emergencyContactModel");
const Role = require("../models/roleModel");
const Hire = require("../models/hireModel")
const EmpRecord = require('../models/employeeRecordModel')
const UserActivity = require('../models/userActivityModel')
const isAuth = require('../middleware/isAuth');
const logUserActivity = require("../middleware/logUserActivity");


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

 
    const nicDocumentPath = "";
    const empPhotoName=req?.files?.empPhoto[0]?.filename;
    console.log("nic passed")
    // console.log(empPhotoName)
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

    //  console.log(user)
    await user.save();
     console.log('saved')

    // await logUserActivity(req,200,'CREATE',`created new user ${user.email}`)
    return res.status(200).json({ message: "User created succesfully" });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const mongoose = require('mongoose')
const updateUserPersonal = async(req,res) =>{
  try {
    const {id} =req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
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
    } = req.body.data;

    let passwordToStore=''
    console.log(req.body.data);
    if (!firstName || !lastName || !email)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    
    const user=  await User.findById(id)
    const match = await bcrypt.compare(password,user.password)

    if(!match && password ){
      const salt = await bcrypt.genSalt();
      passwordToStore = await bcrypt.hash(password, salt);
    }else{
      //console.log(match)
      passwordToStore=user.password
    }
    
      const updatedUser = await User.findByIdAndUpdate(id,{
        firstName,
        middleName,
        lastName,
        email,
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
        password:passwordToStore
      })

      if (!updatedUser) {
        return res.status(500).json({ message: "Update Failed" });
      }
      //await logUserActivity(req,200,'UPDATE',`Updated a users (${firstName}) info`)
      return res.status(200).json(updatedUser);

    //return res.status(200).json({ message: "User Updated succesfully" });
  } catch (err) {
     console.log(err);
    return res.status(500).json({ message: err.message });
  }

}

const deleteContact = async(req,res) =>{
  const {id}= req.params
  try{
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const { ContactId } = req.body.data;
    const user = await User.findById(id)

    if(!user) return res.status(400).json({ message: 'No User Found' });
    
    const deleteContact = await EmergencyContact.findByIdAndDelete(ContactId);
    if(!deleteContact) return res.status(500).json({ message: 'Delete Failed' });
    
    const newContactArr = user.emergencyContacts.filter((id)=>{
      return id.toString() !== deleteContact._id.toString()
    })

    const updatedUser = await User.findByIdAndUpdate(id,{emergencyContacts:newContactArr})

    if(!updatedUser) return res.status(500).json({ message: 'Update Failed' });
    await logUserActivity(req,200,'DELETE','deleted a Emergency contact') 
    return res.status(200).json({ message: 'Delete Succesfull' });
    
  }catch(err){
    return res.status(500).json({ message: err.message });
  }
}

const updateContact = async(req,res) =>{
  try{  
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    const { emergencyContacts } = req.body.data;
    
    const user= await User.findById(id)
    if(!user) return res.status(400).json({ message: 'No User Found' });

    let contacts = user.emergencyContacts

    //const parsedEmergencyContacts = JSON.parse(emergencyContacts);
    
    const emergencyContactPromises = emergencyContacts.map(async (contact) => {
        if(contact._id ===''){
          const EmContact = new EmergencyContact({
            name: contact.name,
            number: contact.number,
          });
          let newContact = await EmContact.save();
          return newContact._id
         }
    });
   //Change This to not update with Null
    const emergencyContactIds = await Promise.all(emergencyContactPromises);
    let filteredid=emergencyContactIds.filter((id)=>id!=null)

    // console.log(filteredid)

    filteredid.forEach(ContactId => {
      if(ContactId != null){
        contacts.push(ContactId)
      }
    });


    const updatedUser = await User.findByIdAndUpdate(id,{emergencyContacts:contacts})

    if (!updatedUser) {
      return res.status(500).json({ message: "Update Failed" });
    }

    return res.status(200).json({ message: "Update Succesfull" });
  }catch(error){
    return res.status(500).json({ message: "Internal Server Error"});
  }
}

const updateDocuments = async(req,res) =>{

  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

  try{

    const user = await User.findById(id).exec()
    if(!user) return res.status(400).json({message:'User not found'})

    //TODO: make this shorter with the ? for now keep it so it works
    let  newNicDocumentName =user.nicDocument
    let newEmpPhotoName =user.empPhoto
    let newLicenceName =user.licenceDoc||null

    if(req?.files?.empPhoto !== undefined)
     newEmpPhotoName=req.files.empPhoto[0].filename
    else
      newEmpPhotoName=user?.empPhoto||null

    if(req.files?.nicDocument !== undefined)
      newNicDocumentName=req.files.nicDocument[0].filename
    else
      newNicDocumentName=user?.empPhoto||null

    if(req.files?.licenceDoc !== undefined)
      newLicenceName=req.files.licenceDoc[0].filename 
    else
      newLicenceName=user?.licenceDoc ||null;


    const updatedUser = await User.findByIdAndUpdate(id,{nicDocument:newNicDocumentName,empPhoto:newEmpPhotoName,licenceDoc:newLicenceName})

    if(!updatedUser) return res.status(500).json({message:'Update failed'})
    
    return res.status(200).json({message:'Success'})
  }catch(error){
    // console.log(error)
    return res.status(500).json({message:JSON.stringify(error)})
  }

}

//not logged
const getAllUsers = async (req, res) => {
  try {
    const  user = req.user
   
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


const getDashboardData = async (req, res) => {
  try {
  
    let users = await User.find().populate("role").sort({id:1});
    
    let active= 0
    let inactive = 0
    let suspended = 0    
    
    if(users.length){
      inactive = users.filter((user)=>{ return user.status.toLowerCase() == "inactive"}).length
      suspended = users.filter((user)=>{return user.status.toLowerCase() == "suspended"}).length
      active = users.filter((user)=>{return user.status.toLowerCase() == "active"}).length
      total=active+inactive+suspended
    }

    latestusers=users.slice(users?.length - 2)
    let activity = await UserActivity.find().populate('user').sort({date:-1}).limit(6)

    res.status(200).json({latestusers,active,inactive,suspended,total,activity});

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}


//
const setUserAsDeleted=async (req,res)=>{
  const {id}=req.params
  console.log(req)
  try{
    const updateduser= await User.findByIdAndUpdate(id,{status:'deleted'})
    if(!updateduser) return res.status(500).json({ message: "Update Failed" });
    await logUserActivity(req,200,'DELETE','deleted a user') 
    return res.status(200).json(updateduser);
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
    // console.log(error)
  }
  
}

const getUserById = async (req,res)=>{
  
  try{
    const {id} = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
  
    const user = await User.findById(id).populate('emergencyContacts').populate('role').exec()
    if(!user) return res.status(404).json({message:'User Not Found'})
    return res.status(200).json(user)
  }catch(error){
    // console.log(error);
    return res.status(404).json({message:JSON.stringify(error.message)})
  }
    
}

const getUserDetailsFull = async (req,res)=>{
  try{
    const {id} = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
  
    const user = await User.findById(id).populate('emergencyContacts').populate('role').exec()
    if(!user) return res.status(404).json({message:'User Not Found'})

    const userHires = await Hire.find({driver:user._id})
    let totalHire= 0
    let completedHires = 0
    let cancelled=0
    let pendingHires = 0    
    
    if(userHires.length){
       totalHire= userHires.length
       completedHires = userHires.filter((hire)=>{ return hire.hireStatus.toLowerCase() == "completed" || hire.hireStatus.toLowerCase() == "ended"})
       pendingHires = userHires.filter((hire)=>{return hire.hireStatus.toLowerCase() == "pending"})
       cancelled = userHires.filter((hire)=>{return hire.hireStatus.toLowerCase() == "cancelled"})
    }

    const records = await EmpRecord.find({user:user._id})
    const userDetail={totalHire,completedHires,pendingHires,cancelled,records,personal:user}  
    return res.status(200).json(userDetail)
  }catch(error){
    return res.status(404).json({message:JSON.stringify(error.message)})
  }
} 

const getRecords = async (req,res) =>{
  try{
    const records = await EmpRecord.find().populate('user').exec()
    
    if (records?.length<=0) {
      return res.status(200).json([]);
    }
    const activeRecords= records.filter(record=>{return record.user.status == 'active'})
    
    return res.status(200).json(activeRecords);

  }catch(error){
    console.log(error)
    return res.status(500).json({message:'Internal Server Error'})
  }
}

const getRecordByRecordId = async (req,res)=>{
  try{
    const {id}=req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    const record = await EmpRecord.findById(id).exec()

    if(!record) return res.status(400).json({message:'no record found'});
    return res.status(200).json(record);

  }catch(err){
    return res.status(500).json({message:'Internal Server Error'})
  }
}

const deleteRecord = async(req,res)=>{
  const { id } = req.params
  try{
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    if (!id) {
      return res.status(500).json({ message: "Record not found" });
    }
    await EmpRecord.findByIdAndDelete({_id:id});
    await logUserActivity(req,200,'DELETE',`deleted performance record`)
    return res.status(200).json({ message: "Record Deleted Successfully"});
  }catch(err){
    return res.status(500).json({ message: "Unexpected error occured"});
  }
}

//TODO:add validation use REGEX
const resetPassword = async(req,res)=>{
  try{
    const {id} = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
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

    await logUserActivity(req,200,'UPDATE',`Reset their password`)  
    return res.status(200).json({message:'succesfull'})
  }catch(error){
    return res.status(500).json({message:'internal server Error'})
  }
}


const getUserActivity=async(req,res)=>{
  try {
    let activity = await UserActivity.find().populate('user').sort({date:-1})
    if (!activity) {
      return res.json([{}]);
    }
   
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activity" });
  }
}
const getLatestUserActivity=async(req,res)=>{
  try {
    let activity = await UserActivity.find().populate('user').sort({date:1}).limit(5)
    if (!activity) {
      return res.json([{}]);
    }
    res.status(200).json(activity);
  } catch (error) {

    res.status(500).json({ message: "Error fetching activity" });
  }
}

module.exports = {
  getDashboardData,
  getLatestUserActivity,
  getUserActivity,
  getRecordByRecordId,
  deleteRecord,
  getRecords,
  getUserDetailsFull, 
  createUser, 
  getAllUsers,
  getUserById,
  resetPassword,
  getDrivers,
  setUserAsDeleted,
  updateUserPersonal,
  deleteContact,
  updateContact,
  updateDocuments,
};
