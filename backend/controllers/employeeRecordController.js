const User = require("../models/userModel");
const EmpRecord = require("../models/employeeRecordModel");

const createRecord = async (req, res) => {
  try {
    const { selectedDriver, description, type, date } = req.body.data;

    if(!selectedDriver || !description || !type || !date)  return res.status(400).json({ message: "Not all feilds are filled" });

    const record=new EmpRecord({
        user:selectedDriver,
        recordType:type,
        description,
        occurenceDate:date
    })
    await record.save();


  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    createRecord
}