const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Role = require("../models/roleModel")



const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      status: "active",
      role,
    });

    await user.save();

    res.status(200).json({ msg: "User created succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async(req,res)=>{
    try {
      
        const users = await User.find();
    
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


module.exports = {createUser,getAllUsers,getAllRoles };
