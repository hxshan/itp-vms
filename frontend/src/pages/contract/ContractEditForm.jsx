import useAxios from '@/hooks/useAxios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const ContractEditForm = () => {

  const params = useParams();

  const navigate = useNavigate()

  const contractID = params.id;

  const [contractData, setContractData] = useState({
    _id: "",
    Vehical: "",
    contract_SD: "loading",
    contract_ED: "loading",
    Insurance_Source: "loading",
    Insurace_provider: "loading",
    Policy_Number: "loading",
    Coverage_Type: "loading",
    Coverage_Amount: "loading",
    Deductible: "loading",
    Insurance_SD: "loading",
    Insurance_ED: "loading",
    Insurance_notes: "loading",
    Payment_Amount: "loading",
    Payment_Plan: "loading",
    Payment_Date: "loading",
    Amount_Payed: "loading",
  });

  const [clientData, setclientData] = useState({
    _id: "",
    firstName: "loading",
    lastName: "loading",
    phoneNumber: "loading",
    nicNumber: "loading",
    email: "loading",
  });

  const {
    data: Contract,
    error,
    isLoading,
    refetch,
  } = useAxios(`/contract/getContract/${contractID}`);

  useEffect(() => {
    if (Contract) {
      setContractData({
        _id: Contract._id,
        Vehical: Contract.Vehical,
        contract_SD: Contract.contract_SD,
        contract_ED: Contract.contract_ED,
        Insurance_Source: Contract.Insurance_Source,
        Insurace_provider: Contract.Insurace_provider,
        Policy_Number: Contract.Policy_Number,
        Coverage_Type: Contract.Coverage_Type,
        Coverage_Amount: Contract.Coverage_Amount,
        Deductible: Contract.Deductible,
        Insurance_SD: Contract.Insurance_SD,
        Insurance_ED: Contract.Insurance_ED,
        Insurance_notes: Contract.Insurance_notes,
        Payment_Amount: Contract.Payment_Amount,
        Payment_Plan: Contract.Payment_Plan,
        Payment_Date: Contract.Payment_Date,
        Amount_Payed: Contract.Amount_Payed,
      });

      setclientData({
        _id: Contract.clientID._id,
        firstName: Contract.clientID.firstName,
        lastName: Contract.clientID.lastName,
        phoneNumber: Contract.clientID.phoneNumber,
        nicNumber: Contract.clientID.nicNumber,
        email: Contract.clientID.email,
      });
    }
  }, [Contract]);

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
        <p className=' text-[#000ac2] font-semibold'></p>
    </div>

    <div>
        <p>Client National ID</p>
        <p className=' text-[#000ac2] font-semibold'></p>
    </div>
    </div>
    <div>
        <p>Phone number</p>
        <p className=' text-[#000ac2] font-semibold'></p>
    </div>
    </div>

    
    </div>

    <div className='  w-fit h-fit  pb-8 rounded-xl '>
        <div>
            <p className='text-[25px] font-bold'>Rental Info</p>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <label>Vehical Type</label>
            <select name='Vehical_Type' className='w-[150px]  rounded-lg  bg-white border-none p-2'>
                    <option className='hidden'>Please select</option>
                    {vehicals.map((item,index)=>(
                        <option key={index} value={item._id} >{item.name}</option>
                    ))}
                </select>
        </div>

        <div>
        <div className='flex mt-3 gap-12'>
        <div className='flex flex-col gap-1'>
            <label>Start date</label>
            <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2' name='startdate' />
        </div>

        <div className='flex flex-col gap-1'>
            <label>End date</label>
            <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 ' name='enddate' />
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
            <select className='w-[150px]  rounded-lg  bg-white border-none p-2'>
                    <option className='hidden'>please select</option>
                    <option>Client</option>
                    <option>Company</option>
                </select>
        </div>
        
        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
           <label>Name of Insurance provider</label>
           <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2'/>
        </div>

        <div className='flex flex-col gap-1'>
           <label>Policy number</label>
           <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2'/>
        </div>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
           <label>Coverage Type</label>
           <select className='w-[150px]  rounded-lg  bg-white border-none p-2'>
                <option className='hidden'>please select</option>
                <option>Liability</option>
                <option>comprehensive</option>
                <option>collision</option>
               </select>
          
        </div>

        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Coverage amount</label>
            <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2'/>
        </div>

        <div className='flex flex-col gap-1'>
            <label>Deductible</label>
            <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2'/>
        </div>
        </div>

        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Start date</label>
            <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 '/>
        </div>

        <div className='flex flex-col gap-1'>
            <label>End date</label>
            <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 '/>
        </div>
        </div>

        <div className='flex flex-col mt-3'>
            <label>Additianol notes</label>
            <textarea className='h-[200px] w-[456px]  border-none rounded-lg mt-1'></textarea>
        </div>
    </div>
    <div className='  w-fit h-fit rounded-xl '>
        <div>
            <p className='text-[25px] font-bold'>Payment Info</p>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <label>Amount</label>
            <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2'/>
        </div>
        
        <div className='flex gap-12 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Payment plan</label>
            <select className='w-[150px]  rounded-lg  bg-white border-none p-2'>
                    <option className='hidden'>Please select</option>
                    <option>upFront</option>
                    <option>Monthly</option>
                </select>
        </div>

        <div className='flex flex-col gap-1'>
            <label>Payment date</label>
            <input type='date' className='w-[150px]  rounded-lg  bg-white border-none p-2'/>
        </div>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <label>Amount payed</label>
            <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2'/>
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