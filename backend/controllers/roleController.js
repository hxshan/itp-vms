const Role = require("../models/roleModel");


const getRoleById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const role = await Role.findById(id).exec();
  
      if (!role){
        return res.status(500).json({ message: "No such Role found" });
      }
        return res.status(200).json(role);
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  const getAllRoles = async (req, res) => {
    try {
      const roles = await Role.find();
  
      if (!roles) {
        return res.json({});
      }
  
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const addrole = async (req, res) => {
    try {
      const {
        name,
        userPermissions,
        vehiclePermissions,
        vehicleMaintenencePermissions,
        HirePermissions,
        ContractPermissions,
        FinancePermissions,
        EmergencyPermissions
      } = req.body.data;
  
      if (name === "" || name === null)
        res.status(501).json({ message: "Role must be given a name" });
  
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
        EmergencyPermissions,
        FinancePermissions,
      });
      await role.save();
      return res.status(200).json({ message: "Role created succesfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  
  const updateRole = async (req,res) =>{
    const { id } = req.params;
    const {
        name,
        userPermissions,
        vehiclePermissions,
        vehicleMaintenencePermissions,
        HirePermissions,
        ContractPermissions,
        FinancePermissions,
        EmergencyPermissions
      } = req.body.data;

    try {
      updatedRole = await Role.findByIdAndUpdate(id,{
        name,
        userPermissions,
        vehiclePermissions,
        vehicleMaintenencePermissions,
        HirePermissions,
        ContractPermissions,
        FinancePermissions,
        EmergencyPermissions
      }, {new: true})
      if(!updateRole){
        return res.status(500).json({message:"Update Failed"})
      }
      res.status(200).json(updateRole)

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }

  }
  
  const deleteRole = async (req,res) =>{
    try {
        const {id} = req.params;
        console.log(id)
        if(!id){
            return res.status(500).json({message:"Role not found"})
        }
        
        await Role.findByIdAndDelete(id);    
        
        return res.status(200).json({message:""})

    } catch (error) {
        return next (new HttpError(error)) 
    }
  }
  

module.exports = {getAllRoles, addrole,getRoleById,deleteRole,updateRole};
