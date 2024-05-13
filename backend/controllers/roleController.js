const Role = require("../models/roleModel");
const logUserActivity = require("../middleware/logUserActivity");

//used to set all perms to false 
const defaultPermObj = {
  Create: false,
  Read: false,
  Update: false,
  Delete: false,
};

const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id).exec();

    if (!role) {
      return res.status(500).json({ message: "No such Role found" });
    }
    return res.status(200).json(role);
  } catch (error) {
    console.log(error);
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
      hirePermissions,
      contractPermissions,
      financePermissions,
      emergencyPermissions,
      isDriver,
    } = req.body.data;

    if (name === "" || name === null)
      return res.status(501).json({ message: "Role must be given a name" });

    const roleExist = await Role.findOne({ name: name.toUpperCase() });

    if (roleExist)
      return res
        .status(400)
        .json({ message: "An Role with this name already exists." });

    let roleObj = {};
    //if user is a driver all other perms are false
    if (isDriver)
      roleObj = {
        name: name.toUpperCase(),
        userPermissions: defaultPermObj,
        vehiclePermissions: defaultPermObj,
        vehicleMaintenencePermissions: defaultPermObj,
        hirePermissions: defaultPermObj,
        contractPermissions: defaultPermObj,
        emergencyPermissions: defaultPermObj,
        financePermissions: defaultPermObj,
        isDriver,
      };
    else
      roleObj = {
        name: name.toUpperCase(),
        userPermissions,
        vehiclePermissions,
        vehicleMaintenencePermissions,
        hirePermissions,
        contractPermissions,
        emergencyPermissions,
        financePermissions,
        isDriver,
      };

    const role = new Role(roleObj);
    await role.save();
    //create activity log 
    await logUserActivity(req,200,'CREATE',`created new role ${name}`)

    return res.status(200).json({ message: "Role created succesfully" });
  } catch (err) {
    console.log(error);
    await logUserActivity(req,500,'CREATE','role creation error')
    return res.status(500).json({ message: err.message });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    userPermissions,
    vehiclePermissions,
    vehicleMaintenencePermissions,
    hirePermissions,
    contractPermissions,
    financePermissions,
    emergencyPermissions,
  } = req.body.data;

  try {
    updatedRole = await Role.findByIdAndUpdate(
      id,
      {
        name: name.toUpperCase(),
        userPermissions,
        vehiclePermissions,
        vehicleMaintenencePermissions,
        hirePermissions,
        contractPermissions,
        financePermissions,
        emergencyPermissions,
      },
      { new: true }
    );
    if (!updateRole) {
      return res.status(500).json({ message: "Update Failed" });
    }
    await logUserActivity(req,200,'UPDATE',`updated role to ${name}`)
    return res.status(200).json(updateRole);
  } catch (error) {
    console.log(error);
    await logUserActivity(req,500,'UPDATE',`updated role failed`)
    res.status(500).json({ message: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(500).json({ message: "Role not found" });
    }
    const role = await Role.findOne({_id:id})
    if(role.isSystemRole)
      return res.status(500).json({ message: "System Roles cannot be changed" });

    await Role.findByIdAndDelete({_id:id});
    await logUserActivity(req,200,'DELETE',`deleted Role`)
    return res.status(200).json({ message: "Role Deleted Successfully"});
  } catch (error) {
    await logUserActivity(req,500,'DELETE',`delete role failed`)
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllRoles, addrole, getRoleById, deleteRole, updateRole };
