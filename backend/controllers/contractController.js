const Contract = require("../models/contractModel");
const Client = require("../models/clientModel");
const ClientRequest = require("../models/clientRequestModel");
const bcrypt = require("bcrypt");
const { Vehicles } = require("../models/vehicleModel");
const Availability = require("../models/vehicleAvailability");
const Income = require("../models/incomeModel")
const logUserActivity = require("../middleware/logUserActivity");

const createClient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      dob,
      phoneNumber,
      nicNumber,
      licenceNumber,
      Address,
      Comp_Available,
      Comp_Name,
      Reg_Num,
      Tax_Num,
      Legal_struc,
      Comp_Email,
      Comp_Phone,
      Comp_Address,
    } = req.body.data;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !dob ||
      !phoneNumber ||
      !nicNumber ||
      !Address ||
      Comp_Available === ""
    ) {
      return res.status(400).json({ message: "fields are not filled" });
    }

    if (Comp_Available) {
      if (Comp_Available === "true") {
        if (
          !Comp_Name ||
          !Reg_Num ||
          !Tax_Num ||
          !Legal_struc ||
          !Comp_Email ||
          !Comp_Phone ||
          !Comp_Address
        ) {
          return res
            .status(400)
            .json({ message: "company fields are not filled" });
        }
      }
    }

    const clientExist = await Client.findOne({ nicNumber: nicNumber });

    if (clientExist) {
      return res
        .status(400)
        .json({ message: "Account available for this nic number" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(nicNumber, salt);

    const client = new Client({
      firstName,
      lastName,
      email,
      gender,
      dob,
      phoneNumber,
      nicNumber,
      licenceNumber,
      Address,
      Comp_Available,
      Comp_Name,
      Reg_Num,
      Tax_Num,
      Legal_struc,
      Comp_Email,
      Comp_Phone,
      Comp_Address,
      status: "active",
      Contract_Available: "unAvailable",
      password:passwordHash
    });

    

    await client.save();
    await logUserActivity(req,200,'CREATE',"client created")

    res.status(200).json({ message: "client created succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientbyId = async (req, res) => {
  try {
    const clientID = req.params.id;

    const ExistinClient = await Client.findOne({ _id: clientID });

    if (!ExistinClient) {
      return res.status(400).json({ message: "client dosent exist" });
    }

    return res.status(200).json(ExistinClient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getallClients = async (req, res) => {
  try {
    const clients = await Client.find({});

    if (!clients) {
      return res.status(400).json({ error: "there are no clients" });
    }

    return res.status(200).json(clients);
  } catch (error) {
    console.error;
    return res.status(500).json({ error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const clientID = req.params.id;

    const clientExist = await Client.findOne({ _id: clientID });

    if (!clientExist) {
      return res.status(400).json({ message: "there is no client" });
    }

    const {
      firstName,
      lastName,
      gender,
      dob,
      phoneNumber,
      nicNumber,
      email,
      licenceNumber,
      Address,
      Comp_Available,
      Comp_Name,
      Reg_Num,
      Tax_Num,
      Legal_struc,
      Comp_Email,
      Comp_Phone,
      Comp_Address,
    } = req.body.data;

    console.log(req.body.data);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !dob ||
      !phoneNumber ||
      !nicNumber ||
      !Address ||
      Comp_Available === ""
    ) {
      return res.status(400).json({ message: "client fields are not filled" });
    }

    if (Comp_Available) {
      if (Comp_Available) {
        if (
          !Comp_Name ||
          !Reg_Num ||
          !Tax_Num ||
          !Legal_struc ||
          !Comp_Email ||
          !Comp_Phone ||
          !Comp_Address
        ) {
          return res
            .status(400)
            .json({ message: "company fields are not filled" });
        }
      }
    }

    const updateclientData = {
      $set: {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: dob,
        phoneNumber: phoneNumber,
        nicNumber: nicNumber,
        email: email,
        licenceNumber: licenceNumber,
        Address: Address,
        Comp_Available: Comp_Available,
        Comp_Name: Comp_Name,
        Reg_Num: Reg_Num,
        Tax_Num: Tax_Num,
        Legal_struc: Legal_struc,
        Comp_Email: Comp_Email,
        Comp_Phone: Comp_Phone,
        Comp_Address: Comp_Address,
      },
    };

    const updateSuccess = await Client.updateOne(
      { _id: clientID },
      updateclientData
    );

    if (updateSuccess.modifiedCount > 0) {
      return res.status(200).json({ message: "successful" });
    } else {
      return res.status(200).json({ message: "failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const clientExist = await Client.findOne({ _id: clientId });

    if (!clientExist) {
      return res.status(400).json({ message: "Client doesn't exist" });
    }

    const contractExist = await Contract.findOne({ clientID: clientId });

    if (contractExist) {
      if (contractExist.Status === "Terminated") {
        await Contract.deleteOne({ clientID: clientId });
        await Client.deleteOne({ _id: clientId });
        return res
          .status(200)
          .json({ message: "Client and contrat deleted successfully" });
      } else {
        return res.status(400).json({ message: "Theres a ongoing contract" });
      }
    }
    await Client.deleteOne({ _id: clientId });

    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createContract = async (req, res) => {
  try {
    const clientID = req.params.id;
    const {
      Insurance_Source,
      Vehical_Type,
      Vehical,
      contract_SD,
      contract_ED,
      Insurace_provider,
      Policy_Number,
      Coverage_Type,
      Coverage_Amount,
      Deductible,
      Insurance_SD,
      Insurance_ED,
      Insurance_notes,
      Payment_Amount,
      Payment_Plan,
      Payment_Date,
      Amount_Payed,
    } = req.body.data;

    const clientExist = await Client.findOne({ _id: clientID });

    if (!clientExist) {
      return res.status(400).json({ message: "client dosent exist" });
    }

    const activeContracts = await Contract.findOne({
      clientID: clientID,
      Status: { $ne: "Terminated" },
    });

    if (activeContracts) {
      return res.status(400).json({
        message: "An active contract exists for this client",
      });
    }

    if (
      !Vehical_Type ||
      !Vehical ||
      !contract_SD ||
      !contract_ED ||
      !Insurance_Source ||
      !Insurace_provider ||
      !Policy_Number ||
      !Coverage_Type ||
      !Coverage_Amount ||
      !Deductible ||
      !Insurance_SD ||
      !Insurance_ED ||
      !Payment_Amount ||
      !Payment_Plan ||
      !Payment_Date ||
      !Amount_Payed
    ) {
      return res.status(400).json({ message: "fields are not filled" });
    }

    const currentDate = new Date();

    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes

    const contract = new Contract({
      clientID,
      Vehical_Type,
      Vehical,
      contract_SD,
      contract_ED,
      Insurance_Source,
      Insurace_provider,
      Policy_Number,
      Coverage_Type,
      Coverage_Amount,
      Deductible,
      Insurance_SD,
      Insurance_ED,
      Insurance_notes,
      Payment_Amount,
      Payment_Plan,
      Payment_Date,
      Amount_Payed,
      Status: "Newly Added",
      DateCreated: currentDate,
    });

    await contract.save();

    const incomeData = new Income({
      date : Payment_Date,
      vehicle : Vehical,
      recordedBy : req?.user?._id,
      source : "Rental Income",
      contractIncome:{
        contract:clientID,
        rentalType:Payment_Plan,
        rentalAmount:Amount_Payed
      } ,
      description:"contract income from active contract",
      paymentMethod:"suit case(v bucks)",
      status:"Received",
      comments:"contract money"
    })

    
    const newAvailability = new Availability({
      vehicle: Vehical,
      status: "Contract",
      unavailableStartDate: contract_SD,
      unavailableEndDate: contract_ED,
    });

    await newAvailability.save();

    await Vehicles.updateOne(
      { _id: Vehical },
      { $push: { availability: newAvailability._id } }
    );

    await Client.updateOne(
      { _id: clientID },
      { $set: { Contract_Available: "Available" } }
    );


    await incomeData.save();
    await logUserActivity(req,200,'CREATE',"created new contract")

    res.status(200).json({ message: "contract created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContractbyID = async (req, res) => {
  try {
    const contractID = req.params.id;

    const contractExist = await Contract.findOne({ _id: contractID }).populate(
      "clientID"
    );

    if (!contractExist) {
      return res.status(400).json({ error: "contract dosent exist" });
    }

    const currentDate = new Date();

    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes

    let newStatus;
    if (contractExist.Status === "Terminated") {
      newStatus = "Terminated";
    } else if (contractExist.contract_ED <= currentDate) {
      newStatus = "waiting for termination";
    } else if (contractExist.contract_SD <= currentDate) {
      newStatus = "ongoing";
    } else {
      newStatus = "Newly Added";
    }

    await Contract.updateOne(
      { _id: contractExist._id },
      { $set: { Status: newStatus } }
    );
    contractExist.Status = newStatus;

    return res.status(200).json(contractExist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContractbyClientID = async (req, res) => {
  try {
    const clientID = req.params.id;

    const contractExist = await Contract.findOne({ clientID: clientID }).populate(
      "clientID"
    );

    if (!contractExist) {
      return res.status(200).json(contractExist);
    }

    const currentDate = new Date();

    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes

    let newStatus;
    if (contractExist.Status === "Terminated") {
      newStatus = "Terminated";
    } else if (contractExist.contract_ED <= currentDate) {
      newStatus = "waiting for termination";
    } else if (contractExist.contract_SD <= currentDate) {
      newStatus = "ongoing";
    } else {
      newStatus = "Newly Added";
    }

    await Contract.updateOne(
      { _id: contractExist._id },
      { $set: { Status: newStatus } }
    );
    contractExist.Status = newStatus;

    return res.status(200).json(contractExist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getallContract = async (req, res) => {
  try {
    const Contracts = await Contract.find({}).populate("clientID");

    if (!Contracts) {
      return res.status(400).json({ message: "No contracts available" });
    }

    const currentDate = new Date();

    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes

    for (const contract of Contracts) {
      let newStatus;
      if (contract.Status === "Terminated") {
        newStatus = "Terminated";
      } else if (contract.contract_ED <= currentDate) {
        newStatus = "waiting for termination";
      } else if (contract.contract_SD <= currentDate) {
        newStatus = "ongoing";
      } else {
        newStatus = "Newly Added";
      }

      await Contract.updateOne(
        { _id: contract._id },
        { $set: { Status: newStatus } }
      );
      contract.Status = newStatus;
    }

    return res.status(200).json(Contracts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateContract = async (req, res) => {
  try {
    const contractID = req.params.id;

    const contract = await Contract.findOne({ _id: contractID });

    if (!contract) {
      return res.status(400).json({ message: "no contract found" });
    }

    const {
      Vehical,
      Vehical_Type,
      contract_SD,
      contract_ED,
      Insurance_Source,
      Insurace_provider,
      Policy_Number,
      Coverage_Type,
      Coverage_Amount,
      Deductible,
      Insurance_SD,
      Insurance_ED,
      Insurance_notes,
      Payment_Amount,
      Payment_Plan,
      Payment_Date,
      Amount_Payed,
    } = req.body.data;

    const updateContract = {
      $set: {
        Vehical: Vehical,
        Vehical_Type: Vehical_Type,
        contract_SD: contract_SD,
        contract_ED: contract_ED,
        Insurance_Source: Insurance_Source,
        Insurace_provider: Insurace_provider,
        Policy_Number: Policy_Number,
        Coverage_Type: Coverage_Type,
        Coverage_Amount: Coverage_Amount,
        Deductible: Deductible,
        Insurance_SD: Insurance_SD,
        Insurance_ED: Insurance_ED,
        Insurance_notes: Insurance_notes,
        Payment_Amount: Payment_Amount,
        Payment_Plan: Payment_Plan,
        Payment_Date: Payment_Date,
        Amount_Payed: Amount_Payed,
      },
    };

    const updateSuccess = await Contract.updateOne(
      { _id: contractID },
      updateContract
    );

    await Availability.updateOne(
      { vehicle: Vehical, status: "Contract" },
      { $set: { unavailableEndDate: contract_ED } }
    );
    await logUserActivity(req,200,'UPDATE',"updated contract")

    if (updateSuccess.modifiedCount > 0) {
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(200).json({ message: "failed" });
    }
    
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteContract = async (req, res) => {
  try {
    const contractID = req.params.id;

    const contractExist = await Contract.findOne({ _id: contractID });

    if (!contractExist) {
      return res.status(400).json({ message: "contract does not exist" });
    }
    await logUserActivity(req,200,'DELETE',"contract deleted")

    if (contractExist.Status === "waiting for termination") {
      await Contract.updateOne(
        { _id: contractID },
        { $set: { Status: "Terminated" } }
      );
      await Client.updateOne(
        { _id: contractExist.clientID },
        { $set: { Contract_Available: "unAvailable" } }
      );
      return res
        .status(200)
        .json({ message: "contract succesfully set to terminated" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Internal server error " });
  }
};

const fetchVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicles.find({}).populate("availability");
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicles = await Vehicles.findById({ _id: vehicleId });

    if (!vehicles) {
      return res.status(400).json({ message: "vehical does not exist" });
    } else res.status(200).json(vehicles);
  } catch (error) {
    return res.status(400).json({ error: "Internal server error " });
  }
};

const createRequest = async(req,res) =>{

  try{
    const {
      clientID,
      ContractID,
      renew_ED,
      Status
    } = req.body.data;

    console.log(clientID)

    const Request = new ClientRequest({
      clientID,
      ContractID,
      renew_ED,
      Status
    });

    

    await Request.save();

    res.status(200).json({ message: "client request added succesfully" });
  }catch(error){
    res.status(500).json({ error: "Internal server error " })
  }
}

const getallRequests = async(req,res) =>{
  try{

    const Requests = await ClientRequest.find({}).populate("clientID");

    res.status(200).json(Requests);
  }catch(error){
    res.status(500).json({ error: "Internal server error " })
  }
}

const deleteRequest = async(req,res) =>{
  try{
    const RequestID = req.params.id;
    await ClientRequest.deleteOne({ _id: RequestID });

    return res.status(200).json({message:"Request deleted"})
  }catch(error){
    return res.status(500).json({error:"Internal server error"})
  }
}

const getRequestbyID = async(req,res) =>{
  try{
    const ID = req.params.id;
    
    const request = await ClientRequest.find({ clientID: ID });
    
      res.status(200).json(request)
    
  }catch(error){
    
    return res.status(500).json({error:"Internal server error"})
  }
}

module.exports = {
  createContract,
  createClient,
  getContractbyID,
  getClientbyId,
  getallContract,
  getallClients,
  updateContract,
  updateClient,
  deleteClient,
  deleteContract,
  fetchVehicles,
  getVehicle,
  createRequest,
  getallRequests,
  deleteRequest,
  getRequestbyID,
  getContractbyClientID
};
