const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const EmergencyContact = require("../models/emergencyContactModel");
const Role = require("../models/roleModel")



const createUser = async (req, res) => {
  try {
    const {firstName,middleName,lastName, gender,dob,phoneNumber,nicNumber,role,department,empDate,baseSal,licenceNum,status,email,password,emergencyContacts} = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //match front and back names
    const user = new User({
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      phoneNumber,
      nicNumber,
      status,
      department,
      employmentDate:empDate,
      baseSalary:baseSal,
      licenceNumber:licenceNum,
      email,
      password: passwordHash,
      status: "active",
      role,
    });

    try{
      emergencyContacts.forEach(async (contact) => {
        
        const EmContact= new EmergencyContact({
          name:contact.emergencyName,
          number:contact.emergencyContact
        })
         let newContact =await EmContact.save()
         user.emergencyContacts.push(newContact._id);
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }

    await user.save();
    
    return res.status(200).json({ message: "User created succesfully" });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async(req,res)=>{
    try {
      
        const users = await User.find().populate('role');
    
        if (!users) {
          return res.json([{}]);
        }
    
        res.status(200).json(users);
      } catch (error) {
       
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const getAllRoles = async(req,res)=>{
    try {
      
        const roles = await Role.find();
    
        if (!roles) {
          return res.json({});
        }
    
        res.status(200).json(roles);
      } catch (error) {
       
        console.error('Error fetching Roles:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const addrole = async(req,res)=>{
  try {
    const {name,userPermissions,vehiclePermissions,vehicleMaintenencePermissions,HirePermissions,ContractPermissions,FinancePermissions}=req.body

    if(name==='' || name ===null)res.status(501).json({message:"Role must be given a name"})

    const roleExist = await Role.findOne({ name: name });

    if (roleExist)
      return res
        .status(400)
        .json({ message: "An Role with this name already exists." });

    const role = new Role({
      name,
      userPermissions,
      vehiclePermissions,
      vehicleMaintenencePermissions,
      HirePermissions,
      ContractPermissions,
      FinancePermissions
    })
    await role.save()
    return res.status(200).json({ message: "Role created succesfully" });
  }catch(err){
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {createUser,getAllUsers,getAllRoles,addrole };
