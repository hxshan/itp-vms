import useAxios from '@/hooks/useAxios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "@/api/axios";


const ContractEditForm = () => {

  const params = useParams();

  const navigate = useNavigate()

  const contractID = params.id;

  const [formatSD,setformatSD] = useState('');
  const [formatED,setformatED] = useState('');
  const [InsuranceSD,setInsuranceSD] = useState('');
  const [InsuranceED,setInsuranceED] = useState('');
  const [paymentDate,setpaymentDate] = useState('');

  const [contractData, setContractData] = useState({
    Vehical_Type:"",
    Vehical: "",
    contract_SD: "",
    contract_ED: "",
    Insurance_Source: "",
    Insurace_provider: "",
    Policy_Number: "",
    Coverage_Type: "",
    Coverage_Amount: "",
    Deductible: "",
    Insurance_SD: "",
    Insurance_ED: "",
    Insurance_notes: "",
    Payment_Amount: "",
    Payment_Plan: "",
    Payment_Date: "",
    Amount_Payed: "",
  });

  const [clientData, setclientData] = useState({

    firstName: "loading",
    lastName: "loading",
    phoneNumber: "loading",
    nicNumber: "loading",
    email: "loading",
  });


  const HandleInput = (e)=>{
    const {name,value} = e.target;

    setContractData({
        ...contractData,
        [name]:value
    })
  }

  const [Contract, error, loading, axiosFetch] = useAxios()

  const getContract =()=>{
    axiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/contract/getContract/${contractID}`,
   });
 }

  useEffect(() => {
    if (Contract) {
      setContractData({
        Vehical_Type:Contract.Vehical_Type,
        Vehical: Contract.Vehical,
        contract_SD:Contract.contract_SD,
        contract_ED: Contract.contract_ED,
        Insurance_Source: Contract.Insurance_Source,
        Insurace_provider: Contract.Insurace_provider,
        Policy_Number: Contract.Policy_Number,
        Coverage_Type: Contract.Coverage_Type,
        Coverage_Amount: Contract.Coverage_Amount,
        Deductible: Contract.Deductible,
        Insurance_SD:Contract.Insurance_SD,
        Insurance_ED:Contract.Insurance_ED,
        Insurance_notes: Contract.Insurance_notes,
        Payment_Amount: Contract.Payment_Amount,
        Payment_Plan: Contract.Payment_Plan,
        Payment_Date: Contract.Payment_Date,
        Amount_Payed: Contract.Amount_Payed,
      });
      if(Contract.contract_SD){
        setformatSD(new Date(Contract.contract_SD).toISOString().split('T')[0]);
      }
      if(Contract.contract_ED){
        setformatED(new Date(Contract.contract_ED).toISOString().split('T')[0])
      }
      if(Contract.Insurance_SD){
        setInsuranceSD(new Date(Contract.Insurance_SD).toISOString().split('T')[0])
      }
      if(Contract.Insurance_ED){
        setInsuranceED(new Date(Contract.Insurance_ED).toISOString().split('T')[0])
      }
      if(Contract.Payment_Date){
        setpaymentDate(new Date(Contract.Payment_Date).toISOString().split('T')[0])
      }

    if(Contract.clientID){
      setclientData({
        firstName: Contract.clientID.firstName,
        lastName: Contract.clientID.lastName,
        phoneNumber: Contract.clientID.phoneNumber,
        nicNumber: Contract.clientID.nicNumber,
        email: Contract.clientID.email,
      });
    }
    }
  }, [Contract]);

  useEffect(()=>{
    getContract();
  },[])

  useEffect(()=>{
    if(contractData.contract_SD){
        setformatSD(new Date(contractData.contract_SD).toISOString().split('T')[0] )
    }
    if(contractData.contract_ED){
        setformatED(new Date(contractData.contract_ED).toISOString().split('T')[0])
    }
    if(contractData.Insurance_SD){
        setInsuranceSD(new Date(contractData.Insurance_SD).toISOString().split('T')[0])
    }
    if(contractData.Insurance_ED){
        setInsuranceED(new Date(contractData.Insurance_ED).toISOString().split('T')[0])
    }
    if(contractData.Payment_Date){
        setpaymentDate(new Date(contractData.Payment_Date).toISOString().split('T')[0])
    }
  },[contractData])

  
  
  console.log(contractData);

  const vehicals = [
    {
        "_id":"1111111",
        "name":"Abulance",
    },
    {
        "_id":"2222222",
        "name":"Bus"
    },
    {
        "_id":"3333333",
        "name":"Car"
    },
    {
        "_id":"4444444",
        "name":"Van"
    }
]

  return (
    <div className='w-full flex flex-col justify-center items-center py-5' >


    <div className='flex items-center justify-center mb-4'>
        <p className=' text-[50px] font-bold '>EDIT CONTRACT</p>
    </div>
    <div className='bg-[#D9D9D9] w-[90%] h-fit rounded-lg py-8 flex justify-evenly'>
    
    <div>
    <div className=' w-fit h-fit  pb-8 rounded-xl'>
    <div>
        <p className=' text-[25px] font-bold'>Client details</p>
    </div>

    <div className='flex mt-3'>
    <div>
        <p>Client name</p>
        <p className=' text-[#000ac2] font-semibold'>{clientData.firstName} {clientData.lastName}</p>
    </div>

    
    </div>


    <div className='flex flex-col gap-3'>
    <div className='flex gap-28 mt-3'>
    <div>
        <p>Client email</p>
        <p className=' text-[#000ac2] font-semibold'>{clientData.email}</p>
    </div>

    <div>
        <p>Client National ID</p>
        <p className=' text-[#000ac2] font-semibold'>{clientData.nicNumber}</p>
    </div>
    </div>
    <div>
        <p>Phone number</p>
        <p className=' text-[#000ac2] font-semibold'>{clientData.phoneNumber}</p>
    </div>
    </div>

    
    </div>

    <div className='  w-fit h-fit  pb-8 rounded-xl '>
        <div>
            <p className='text-[25px] font-bold'>Rental Info</p>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <label>Vehical Type</label>
            <select name='Vehical_Type' className='w-[150px]  rounded-lg  bg-white border-none p-2' value={contractData.Vehical_Type} onChange={HandleInput}>
                    {vehicals.map((item,index)=>(
                        <option key={index} value={item.name} >{item.name}</option>
                    ))}
                </select>
        </div>

        <div>
        <div className='flex mt-3 gap-12'>
        <div className='flex flex-col gap-1'>
            <label>Start date</label>
            <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2' name='contract_SD' value={formatSD}  onChange={HandleInput} />
        </div>

        <div className='flex flex-col gap-1'>
            <label>End date</label>
            <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 ' name='contract_ED' value={formatED}  onChange={HandleInput} />
        </div>
        </div>
        
        <div className='flex flex-col mt-3'>
        <p>Estimated duration</p>
        </div>
        </div>

    </div>

    <div className='  w-fit h-fit  rounded-xl '>
        <div>
            <p className='text-[25px] font-bold'>Vehical Info</p>
        </div>
            
    </div>
    </div>

    <div className='flex flex-col'>
    <div className='  w-fit h-fit  pb-8 rounded-xl '>
        <div>
        <p className='text-[25px] font-bold'>Insurance Info</p>
        </div>

        <div className='flex flex-col gap-1 mt-3'>
            <label>Insurance source</label>
            <select className='w-[150px]  rounded-lg  bg-white border-none p-2' value={contractData.Insurance_Source} name='Insurance_Source'  onChange={HandleInput}>
                    <option value={"Client"}>Client</option>
                    <option value={"Company"}>Company</option>
                </select>
        </div>
        
        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
           <label>Name of Insurance provider</label>
           <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' value={contractData.Insurace_provider} name='Insurace_provider'  onChange={HandleInput}/>
        </div>

        <div className='flex flex-col gap-1'>
           <label>Policy number</label>
           <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' value={contractData.Policy_Number} name='Policy_Number'  onChange={HandleInput}/>
        </div>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
           <label>Coverage Type</label>
           <select className='w-[150px]  rounded-lg  bg-white border-none p-2' value={contractData.Coverage_Type} name='Coverage_Type'  onChange={HandleInput}>
                <option value={"Liability"}>Liability</option>
                <option value={"comprehensive"}>comprehensive</option>
                <option value={"collision"}>collision</option>
               </select>
          
        </div>

        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Coverage amount</label>
            <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' value={contractData.Coverage_Amount} name='Coverage_Amount'  onChange={HandleInput}/>
        </div>

        <div className='flex flex-col gap-1'>
            <label>Deductible</label>
            <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' value={contractData.Deductible} name='Deductible'  onChange={HandleInput}/>
        </div>
        </div>

        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Start date</label>
            <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 ' value={InsuranceSD} name='Insurance_SD'  onChange={HandleInput}/>
        </div>

        <div className='flex flex-col gap-1'>
            <label>End date</label>
            <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 ' value={InsuranceED} name='Insurance_ED' onChange={HandleInput}/>
        </div>
        </div>

        <div className='flex flex-col mt-3'>
            <label>Additianol notes</label>
            <textarea className='h-[200px] w-[456px]  border-none rounded-lg mt-1' value={contractData.Insurance_notes} name='Insurance_notes'  onChange={HandleInput}></textarea>
        </div>
    </div>
    <div className='  w-fit h-fit rounded-xl '>
        <div>
            <p className='text-[25px] font-bold'>Payment Info</p>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <label>Amount</label>
            <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' value={contractData.Payment_Amount} name='Payment_Amount' onChange={HandleInput}/>
        </div>
        
        <div className='flex gap-12 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Payment plan</label>
            <select className='w-[150px]  rounded-lg  bg-white border-none p-2' value={contractData.Payment_Plan} name='Payment_Plan'  onChange={HandleInput}>
                    <option value={"upFront"}>upFront</option>
                    <option value={"Monthly"}>Monthly</option>
                </select>
        </div>

        <div className='flex flex-col gap-1'>
            <label>Payment date</label>
            <input type='date' className='w-[150px]  rounded-lg  bg-white border-none p-2' value={paymentDate} name='Payment_Date'  onChange={HandleInput}/>
        </div>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <label>Amount payed</label>
            <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' value={contractData.Amount_Payed} name='Amount_Payed'  onChange={HandleInput}/>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <p>Amount Due</p>
            <p>Loading</p>
        </div>
    </div>
    </div>
  


    
    </div>
</div>
  )
}

export default ContractEditForm 