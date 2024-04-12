const Contract = require("../models/contractModel");
const Client = require("../models/clientModel");
const bcrypt = require("bcrypt");


const createClient = async(req,res)=>{
  try{
    const {firstName,lastName,email,gender,dob,phoneNumber,nicNumber,licenceNumber,Address,Comp_Available,Comp_Name,Reg_Num,Tax_Num,Legal_struc,Comp_Email,Comp_Phone,Comp_Address} = req.body.data;


   if( !firstName || !lastName || !email || !gender || !dob || !phoneNumber || !nicNumber || !Address || Comp_Available === ""){
      return res.status(400).json({message:"fields are not filled"})
  }

    if(Comp_Available){
      if(Comp_Available === "true"){
        if( !Comp_Name || !Reg_Num || !Tax_Num || !Legal_struc || !Comp_Email || !Comp_Phone || !Comp_Address){
          return res.status(400).json({message:"company fields are not filled"})
        }
      }
    }

    

    const clientExist = await  Client.findOne({nicNumber:nicNumber})

    if(clientExist){
      return res.status(400).json({message:"Account available for this nic number"})
    }

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
      status:'active'
    })

    await client.save();

    res.status(200).json({message:"client created succesfully"})
  }catch(error){
    res.status(500).json({error:error.message})
  }
}

const getClientbyId = async(req,res) =>{
  try{
    const clientID = req.params.id;

    const ExistinClient = await Client.findOne({_id:clientID})

    if(!ExistinClient){
      return res.status(400).json({"error":"client dosent exist"})
    }

    return res.status(200).json(ExistinClient);
  }catch(error){
    return res.status(500).json({error:error.message})
  }
}


const getallClients = async(req,res) =>{
  try{
     const clients = await Client.find({});

     if(!clients){
      return res.status(400).json({"error":"there are no clients"});
     }

     return res.status(200).json(clients);
  }catch(error){
    console.error;
    return res.status(500).json({"error":error.message});
  }
}

const updateClient = async(req,res)  =>{
  try{

    const clientID = req.params.id;

    const clientExist = await Client.findOne({_id:clientID})

    if(!clientExist){
      return res.status(400).json({message:"there is no client"})
    }

    

    const {firstName,
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
} = req.body.data

console.log(req.body.data)


if(!firstName || !lastName || !email || !gender || !dob || !phoneNumber || !nicNumber || !Address || Comp_Available === ""){
  return res.status(400).json({message:"client fields are not filled"});
  
}

if(Comp_Available){
  if(Comp_Available){
    if( !Comp_Name || !Reg_Num || !Tax_Num || !Legal_struc || !Comp_Email || !Comp_Phone || !Comp_Address){
      return res.status(400).json({message:"company fields are not filled"})
    }
  }
}




const updateclientData = {
  $set:{
    firstName:firstName,
    lastName:lastName,
    gender:gender,
    dob:dob,
    phoneNumber:phoneNumber,
    nicNumber:nicNumber,
    email:email,
    licenceNumber:licenceNumber,
    Address:Address,
    Comp_Available:Comp_Available,
    Comp_Name:Comp_Name,
    Reg_Num:Reg_Num,
    Tax_Num:Tax_Num,
    Legal_struc:Legal_struc,
    Comp_Email:Comp_Email,
    Comp_Phone:Comp_Phone,
    Comp_Address:Comp_Address,
  }
};

const updateSuccess = await Client.updateOne({_id:clientID},updateclientData)

if(updateSuccess.modifiedCount > 0 ){
  return res.status(200).json({message:"successful"})
}else{
  return res.status(200).json({message:"failed"})
}


  }catch(error){
    res.status(500).json({error:"internal server error"})
  }
}

const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const clientExist = await Client.findOne({_id: clientId});

    if (!clientExist) {
      return res.status(400).json({message: "Client doesn't exist"});
    }

    const contractExist = await Contract.findOne({clientID:clientId});

    if(contractExist){
      if(contractExist.Status === "Terminated"){
        await Contract.deleteOne({clientID: clientId})
        await Client.deleteOne({_id:clientId})
        return res.status(200).json({message:"Client and contrat deleted successfully"})
      }else{
        return res.status(400).json({message:"Theres a ongoing contract"})
      }
    }
      await Client.deleteOne({_id:clientId})

    return res.status(200).json({message: "Client deleted successfully"});
  } catch (error) {
    return res.status(500).json({error: "Internal server error"});
  }
};


const createContract = async(req,res)=>{
    try{
        const clientID = req.params.id;
      const {Insurance_Source,Vehical_Type,Vehical,contract_SD,contract_ED,Insurace_provider,Policy_Number,Coverage_Type,Coverage_Amount,Deductible,Insurance_SD,Insurance_ED,Insurance_notes,Payment_Amount,Payment_Plan,Payment_Date,Amount_Payed} = req.body.data; 
      
      const clientExist = await  Client.findOne({_id:clientID})

      if(!clientExist){
        return res.status(400).json({message:"client dosent exist"})
      }

      const existContract = await Contract.findOne({clientID:clientID})

      if(existContract){
        return res.status(400).json({message:"A contract exist for this client"})
      }


      if(!Vehical_Type ||!Vehical || !contract_SD|| !contract_ED|| !Insurance_Source || !Insurace_provider || !Policy_Number || !Coverage_Type || !Coverage_Amount || !Deductible || !Insurance_SD || !Insurance_ED || !Payment_Amount || !Payment_Plan || !Payment_Date || !Amount_Payed){
        return res.status(400).json({message:"fields are not filled"})
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
        Amount_Payed,
        Status:"Newly Added"
      });

      await contract.save()


      res.status(200).json({message:"contract created successfully"})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getContractbyID = async(req,res) =>{
  try{
    const contractID  = req.params.id;

    const contractExist = await Contract.findOne({_id:contractID}).populate('clientID');

    if(!contractExist){
      return res.status(400).json({"error":"contract dosent exist"})
    }


    //const newCont = await Contract.findOne({_id:contractID}).populate('clientID')

    return res.status(200).json(contractExist)
  }catch(error){
    res.status(500).json({error:error.message})
  }
}

const getallContract = async(req,res) =>{
  try{
    const Contracts = await Contract.find({})
    .populate('clientID');

    if(!Contracts){
      return res.status(400).json({"error":"No contracts available"});
    }

    const currentDate = new Date();
    Contracts.forEach(async (contract) => {
      if(contract.Status === "Terminated"){
        await Contract.updateOne({ _id: contract._id }, { $set: { Status: "Terminated" } });
      }else if (contract.contract_ED < currentDate) {
        await Contract.updateOne({ _id: contract._id }, { $set: { Status: "waiting for termination" } });
      } else if (contract.contract_SD <= currentDate) {
        await Contract.updateOne({ _id: contract._id }, { $set: { Status: "ongoing" } });
      } else if (contract.contract_SD > currentDate) {
        await Contract.updateOne({ _id: contract._id }, { $set: { Status: "Newly Added" } });
      }
    });

    return res.status(200).json(Contracts)
  }catch(error){
    return res.status(500).json({"error":error.message})
  }
}

const updateContract = async(req,res) =>{
  try{
    
    const contractID = req.params.id;

    const contract = await Contract.findOne({_id:contractID})

    if(!contract){
      return res.status(400).json({message:"no contract found"});
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
      return res.status(200).json({message:"success"})
    }else{
      return res.status(200).json({message:"failed"})
    }

  }catch(error){
    res.status(500).json({"error":"internal server error"})
  }
}

const deleteContract = async(req,res) =>{
  try{
    const contractID = req.params.id; 

    const contractExist = await Contract.findOne({_id:contractID})

    if(!contractExist){
      return res.status(400).json({message:"contract does not exist"})
    }

    if(contractExist.Status === "waiting for termination"){
      
      await Contract.updateOne({_id:contractID},{$set:{Status:"Terminated"}})
      return res.status(200).json({message:"contract succesfully set to terminated"})
    }

  }catch(error){
    return res.status(400).json({error:"Internal server error "})
  }
}

module.exports = {createContract,createClient,getContractbyID,getClientbyId,getallContract,getallClients,updateContract,updateClient,deleteClient,deleteContract}