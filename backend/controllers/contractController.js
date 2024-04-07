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

const getallClients = async(req,res) =>{
  try{
     const clients = await Client.find({});

     if(!clients){
      return res.status(301).json({"error":"there are no clients"});
     }

     return res.status(200).json(clients);
  }catch(error){
    console.error;
    return res.status(400).json({"error":error.message});
  }
}


const createContract = async(req,res)=>{
    try{
        const clientID = req.params.id;
      const {Insurance_Source,Vehical_Type,Vehical,contract_SD,contract_ED,Insurace_provider,Policy_Number,Coverage_Type,Coverage_Amount,Deductible,Insurance_SD,Insurance_ED,Insurance_notes,Payment_Amount,Payment_Plan,Payment_Date,Amount_Payed} = req.body; 
      
      const clientExist = await  Client.findOne({_id:clientID})

      if(!clientExist){
        return res.status(301).json({"error":"client dosent exist"})
      }


      if(!Vehical_Type ||!Vehical || !contract_SD|| !contract_ED|| !Insurance_Source || !Insurace_provider || !Policy_Number || !Coverage_Type || !Coverage_Amount || !Deductible || !Insurance_SD || !Insurance_ED || !Insurance_notes || !Payment_Amount || !Payment_Plan || !Payment_Date || !Amount_Payed){
        return res.status(301).json({"error":"fields are not filled"})
      }

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

    const contractExist = await Contract.findOne({_id:contractID}).populate({path:'clientID',select:'-password'});

    if(!contractExist){
      return res.status(301).json({"error":"contract dosent exist"})
    }

    return res.status(200).json(contractExist)
  }catch(error){
    res.status(400).json({error:error.message})
  }
}

const getallContract = async(req,res) =>{
  try{
    const Contracts = await Contract.find({})
    .populate({path:'clientID',select:'-password'});

    if(!Contracts){
      return res.status(301).json({"error":"No contracts available"});
    }

    return res.status(200).json(Contracts)
  }catch(error){
    return res.status(400).json({"error":error.message})
  }
}

const updateContract = async(req,res) =>{
  try{
    
    const contractID = req.params.id;

    const contract = await Contract.findOne({_id:contractID})

    if(!contract){
      return res.status(301).json({"error":"no contract found"});
    }

    const {Vehical,
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
      Amount_Payed} = req.body.data;

    const updateContract = {
      $set:{
      Vehical:Vehical,
      Vehical_Type:Vehical_Type,
      contract_SD:contract_SD,
      contract_ED:contract_ED,
      Insurance_Source:Insurance_Source,
      Insurace_provider:Insurace_provider,
      Policy_Number:Policy_Number,
      Coverage_Type:Coverage_Type,
      Coverage_Amount:Coverage_Amount,
      Deductible:Deductible,
      Insurance_SD:Insurance_SD,
      Insurance_ED:Insurance_ED,
      Insurance_notes:Insurance_notes,
      Payment_Amount:Payment_Amount,
      Payment_Plan:Payment_Plan,
      Payment_Date:Payment_Date,
      Amount_Payed:Amount_Payed
      }
    };

    const updateSuccess = await Contract.updateOne({_id:contractID},updateContract)

    
    if(updateSuccess.modifiedCount > 0 ){
      return res.status(200).json({"status":"success"})
    }else{
      return res.status(200).json({"status":"failed"})
    }

  }catch(error){
    res.status(400).json({"error":"internal server error"})
  }
}

module.exports = {createContract,createClient,getContractbyID,getClientbyId,getallContract,getallClients,updateContract}