const Contract = require("../models/contractModel");
const Client = require("../models/clientModel");
const bcrypt = require("bcrypt");


const createClient = async(req,res)=>{
  try{
    const {firstName,lastName,email,gender,dob,phoneNumber,nicNumber,licenceNumber,password} = req.body;

    if( !firstName || !lastName || !email || !gender || !dob || !phoneNumber || !nicNumber || !licenceNumber){
      return res.status(301).json({"error":"fields are not filled"})
    }

    const clientExist = await  Client.findOne({nicNumber:nicNumber})

    if(clientExist){
      return res.status(301).json({"error":"Account available for this nic number"})
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const client = new Client({
      firstName,
      lastName,
      email,
      gender,
      dob,
      phoneNumber,
      nicNumber,
      licenceNumber,
      password:passwordHash,
      status:'active'
    })

    await client.save();

    res.status(200).json({"status":"sucess"})
  }catch(error){
    res.status(400).json({error:error.message})
  }
}

const getClientbyId = async(req,res) =>{
  try{
    const clientID = req.params.id;

    const ExistinClient = await Client.findOne({_id:clientID})

    if(!ExistinClient){
      return res.status(301).json({"error":"client dosent exist"})
    }

    return res.status(200).json(ExistinClient);
  }catch(error){
    return res.status(400).json({error:error.message})
  }
}


const createContract = async(req,res)=>{
    try{
        const clientID = req.params.id;
      const {Insurance_Source,Vehical,contract_SD,contract_ED,Insurace_provider,Policy_Number,Coverage_Type,Coverage_Amount,Deductible,Insurance_SD,Insurance_ED,Insurance_notes,Payment_Amount,Payment_Plan,Payment_Date,Amount_Payed} = req.body; 
      
      const clientExist = await  Client.findOne({_id:clientID})

      if(!clientExist){
        return res.status(301).json({"error":"client dosent exist"})
      }


      if(!Vehical || !contract_SD|| !contract_ED|| !Insurance_Source || !Insurace_provider || !Policy_Number || !Coverage_Type || !Coverage_Amount || !Deductible || !Insurance_SD || !Insurance_ED || !Insurance_notes || !Payment_Amount || !Payment_Plan || !Payment_Date || !Amount_Payed){
        return res.status(301).json({"error":"fields are not filled"})
      }

      const contract = new Contract({
        clientID,
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
        Amount_Payed
      });

      await contract.save()

      await Client.updateOne({ _id: clientID }, { $push: { contractID: contract._id } });


      res.status(200).json({"status":"success"})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getContractbyID = async(req,res) =>{
  try{
    const contractID  = req.params.id;

    const contractExist = await Contract.findOne({_id:contractID})

    if(!contractExist){
      return res.status(301).json({"error":"contract dosent exist"})
    }

    return res.status(200).json(contractExist)
  }catch(error){
    res.status(400).json({error:error.message})
  }
}

module.exports = {createContract,createClient,getContractbyID,getClientbyId}