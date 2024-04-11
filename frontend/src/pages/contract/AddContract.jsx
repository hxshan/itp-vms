import React, { useEffect, useState } from 'react'
import useAxios from '@/hooks/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "@/api/axios";

const AddContract = () => {

    const params = useParams();

    const navigate = useNavigate()

    const clientID = params.id;

const [clientdet,setClientdet]  = useState({  
    id:"loading",
    first_name:"Shaheed ",
    last_name:"Wajee",
    number:"loading",
    email:"loading",
    client_NIC:"loading"
})

const [vehicalDet,setVehicalDet] = useState({
    vehical_ID:"loading",
    year:"loading",
    VIN:"loading",
    model:"loading"
})


const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [estimatedDuration,setestimatedDuration] = useState('pending');

const [ContractData,setContractData] = useState({
    clientID:"",
    Vehical_Type:"",
    Vehical:"",
    contract_SD:"",
    contract_ED:"",
    Insurance_Source:"",
    Insurace_provider:"",
    Policy_Number:"",
    Coverage_Type:"",
    Coverage_Amount:"",
    Deductible:"",
    Insurance_SD:"",
    Insurance_ED:"",
    Insurance_notes:"",
    Payment_Amount:"",
    Payment_Plan:"",
    Payment_Date:"",
    Amount_Payed:"",
})

const [client,clientError,clientLoading,clientFetch] = useAxios();
const [contract,conError,conLoading,conFetch] = useAxios();


const getClient = ()=>{
    clientFetch({
    axiosInstance: axios,
     method: "GET",
     url: `/contract/getClient/${clientID}`,
    })
}

const HandleInput = (e)=>{
    const {name,value} = e.target;

    setContractData({
        ...ContractData,
        [name] : value
    })
}

const HandleSubmit = async (e)=>{
    console.log(ContractData)

    e.preventDefault();

    await conFetch({
        axiosInstance: axios,
        method: "POST",
        url: `/contract/${clientID}/create`,
        requestConfig: {
            data: { ...ContractData },
          },
    });
    

}

console.log(conError)

useEffect(()=>{
    if(client){
        setClientdet({
            first_name:client.firstName,
            last_name:client.lastName,
            number:client.phoneNumber,
            email:client.email,
            client_NIC:client.nicNumber
        })

        setContractData({
            ...ContractData,
            clientID:client._id
        })
    }
},[client])

useEffect(()=>{
    getClient();
},[])


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

const vehicalInstance = [
    {"_id":"6616da7001edec9b690f0fa6",
    "type":"Abulance",
    "vehicalID":"1111111",
    "name":"ambulance 1",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"6616da7001edec9b690f0fa6",
    "type":"Abulance",
    "vehicalID":"1111111",
    "name":"ambulance 2",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"6616da7001edec9b690f0fa6",
    "type":"Bus",
    "vehicalID":"2222222",
    "name":"Bus 1",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"6616da7001edec9b690f0fa6",
    "type":"Bus",
    "vehicalID":"2222222",
    "name":"Bus 2",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"6616da7001edec9b690f0fa6",
    "type":"Car",
    "vehicalID":"3333333",
    "name":"Car 1",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"6616da7001edec9b690f0fa6",
    "type":"Car",
    "vehicalID":"3333333",
    "name":"Car 2",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"6616da7001edec9b690f0fa6",
    "type":"Van",
    "vehicalID":"4444444",
    "name":"Van 1",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"6616da7001edec9b690f0fa6",
    "type":"Van",
    "vehicalID":"4444444",
    "name":"Van 2",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"}
]





  return (
    <div className='w-full flex flex-col justify-center items-center py-5' >


        <div className='flex items-center justify-center mb-4'>
            <p className=' text-[50px] font-bold '>ADD CONTRACT</p>
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
            <p className=' text-[#000ac2] font-semibold'>{clientdet.first_name == ""? "loading":clientdet.first_name +" " +clientdet.last_name}</p>
        </div>

        
        </div>


        <div className='flex flex-col gap-3'>
        <div className='flex gap-10 mt-3'>
        <div>
            <p>Client email</p>
            <p className=' text-[#000ac2] font-semibold'>{clientdet.email}</p>
        </div>

        <div>
            <p>Client National ID</p>
            <p className=' text-[#000ac2] font-semibold'>{clientdet.client_NIC}</p>
        </div>
        </div>
        <div>
            <p>Phone number</p>
            <p className=' text-[#000ac2] font-semibold'>{clientdet.number}</p>
        </div>
        </div>

        
        </div>

        <div className='  w-fit h-fit  pb-8 rounded-xl '>
            <div>
                <p className='text-[25px] font-bold'>Rental Info</p>
            </div>

            <div className='flex flex-col mt-3 gap-1'>
                <label>Vehical Type</label>
                <select name='Vehical_Type' onChange={HandleInput} className='w-[150px]  rounded-lg  bg-white border-none p-2'>
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
                <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2' name='contract_SD' onChange={HandleInput}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label>End date</label>
                <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 ' name='contract_ED' onChange={HandleInput}/>
            </div>
            </div>
            
            <div className='flex flex-col mt-3'>
            <p>Estimated duration</p>
            <p>null</p>
            </div>
            </div>

        </div>

        <div className='  w-fit h-fit  rounded-xl '>
            <div>
                <p className='text-[25px] font-bold'>Vehical Info</p>
            </div>

            <div className='flex flex-col gap-1 mt-3'>
                <p>Vehical Instance</p>
                <select name='Vehical' onChange={HandleInput} className='w-[150px]  rounded-lg  bg-white border-none p-2'>
                    <option className='hidden' >please select</option>
                    {vehicalInstance.map((item,index)=>(
                        <option value={item._id} className={`${item.vehicalID === ContractData.Vehical_Type?'':'hidden' }`}>{item.name}</option>
                    ))}
                </select>
            </div>
            
            <div className='flex gap-12 my-3'>
            <div>
                <p>Vehical identification number</p>
                <p className=' text-[#000ac2] font-semibold'>{vehicalDet.year}</p>
            </div>

            <div>
                <p>Year manufactured</p>
                <p className=' text-[#000ac2] font-semibold'>{vehicalDet.year}</p>
            </div>
            </div>
            
           <div>
            <p>Model</p>
            <p className=' text-[#000ac2] font-semibold'>{vehicalDet.model}</p>
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
                <select className='w-[150px]  rounded-lg  bg-white border-none p-2' name='Insurance_Source' onChange={HandleInput}>
                    <option className='hidden' value="" >please select</option>
                    <option value="Client" >Client</option>
                    <option value="Company" >Company</option>
                </select>
            </div>
            
            <div className='flex gap-4 mt-3'>
            <div className='flex flex-col gap-1'>
               <label>Name of Insurance provider</label>
               <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='Insurace_provider' onChange={HandleInput}/> 
            </div>

            <div className='flex flex-col gap-1'>
               <label>Policy number</label>
               <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='Policy_Number' onChange={HandleInput}/> 
            </div>
            </div>

            <div className='flex flex-col mt-3 gap-1'>
               <label>Coverage Type</label>

               <select className='w-[150px]  rounded-lg  bg-white border-none p-2' name='Coverage_Type' onChange={HandleInput}>
                <option className='hidden' value="" >please select</option>
                <option value="Liability" >Liability</option>
                <option value="comprehensive" >comprehensive</option>
                <option value="collision" >collision</option>
               </select>
            </div>

            <div className='flex gap-4 mt-3'>
            <div className='flex flex-col gap-1'>
                <label>Coverage amount</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='Coverage_Amount' onChange={HandleInput}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label>Deductible</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='Deductible' onChange={HandleInput}/>
            </div>
            </div>

            <div className='flex gap-4 mt-3'>
            <div className='flex flex-col gap-1'>
                <label>Start date</label>
                <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 ' name='Insurance_SD' onChange={HandleInput}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label>End date</label>
                <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 ' name='Insurance_ED' onChange={HandleInput}/>
            </div>
            </div>

            <div className='flex flex-col mt-3'>
                <label>Additianol notes</label>
                <textarea className='h-[200px] w-[456px]  border-none rounded-lg mt-1' name='Insurance_notes' onChange={HandleInput}></textarea>
            </div>
        </div>
        <div className='  w-fit h-fit rounded-xl '>
            <div>
                <p className='text-[25px] font-bold'>Payment Info</p>
            </div>

            <div className='flex flex-col mt-3 gap-1'>
                <label>Amount</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='Payment_Amount' onChange={HandleInput}/>
            </div>
            
            <div className='flex gap-12 mt-3'>
            <div className='flex flex-col gap-1'>
                <label>Payment plan</label>
                <select className='w-[150px]  rounded-lg  bg-white border-none p-2' name='Payment_Plan' onChange={HandleInput}>
                    <option className='hidden' value="" >Please select</option>
                    <option value="upFront">upFront</option>
                    <option value="Monthly" >Monthly</option>
                </select>
            </div>

            <div className='flex flex-col gap-1'>
                <label>Payment date</label>
                <input type='date' className='w-[150px]  rounded-lg  bg-white border-none p-2' name='Payment_Date' onChange={HandleInput}/>
            </div>
            </div>

            <div className='flex flex-col mt-3 gap-1'>
                <label>Amount payed</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='Amount_Payed' onChange={HandleInput}/>
            </div>

            <div className='flex flex-col mt-3 gap-1'>
                <p>Amount Due</p>
                <p>Loading</p>
            </div>

           
        </div>
        <div className="flex justify-end gap-4">
            <button
              className=" bg-green-600 px-5 py-2 rounded-xl w-[120px] "
              onClick={HandleSubmit}
            >
              Add
            </button>
            <button
              className=" bg-orange-600 px-5 py-2 rounded-xl w-[120px] "
              onClick={() => {
                navigate(`/client`);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      


        
        </div>
    </div>
  )
}

export default AddContract