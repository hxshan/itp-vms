import React, { useState } from 'react'


const AddContract = () => {

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
    Vehical_Type:"",
    Vehical_Inst:"",
    Start_Date:startDate,
    End_Date:endDate,
    Estimated_duration:estimatedDuration
})

const CalculateTime = () =>{
    const startDatevalue = new Date(startDate);
    const endDatevalue = new Date(endDate);

    if (!isNaN(startDatevalue) && !isNaN(endDatevalue)) {
        const timeDiff = endDatevalue - startDatevalue;
        const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365.25);
        const estimatedYears = Math.round(yearsDiff);

        setestimatedDuration(estimatedYears > 0 ? `${estimatedYears} year(s)` : 'Pending');
    }
}


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
    {"_id":"6172361123",
    "type":"Abulance",
    "vehicalID":"1111111",
    "name":"ambulance 1",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"34234123",
    "type":"Abulance",
    "vehicalID":"1111111",
    "name":"ambulance 2",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"567456456",
    "type":"Bus",
    "vehicalID":"2222222",
    "name":"Bus 1",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"8967456456",
    "type":"Bus",
    "vehicalID":"2222222",
    "name":"Bus 2",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"75467456",
    "type":"Car",
    "vehicalID":"3333333",
    "name":"Car 1",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"6172361123",
    "type":"Car",
    "vehicalID":"3333333",
    "name":"Car 2",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"435234",
    "type":"Van",
    "vehicalID":"4444444",
    "name":"Van 1",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"},

    {"_id":"61723623523423123",
    "type":"Van",
    "vehicalID":"4444444",
    "name":"Van 2",
    "year":"loading",
    "VIN":"loading",
    "model":"loading"}
]

const HandleInput = (e)=>{
    const {name,value} = e.target;

    setContractData({
        ...ContractData,
        [name] : value
    })
}

//const HandleDateInput = (e)=>{
  //  const {name,value} = e.target;

   // if(name === "startdate"){
 //       setStartDate(value)
 //   }else if(name === "enddate"){
  //      setEndDate(value);
 //       if(startDate != ''){
  //          CalculateTime(); 
   //     }
 //   }

//}



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
        <div className='flex gap-28 mt-3'>
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
                <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2' name='startdate' onChange={(e) => {
                            setStartDate(e.target.value);
                            CalculateTime();}}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label>End date</label>
                <input type='date' className='w-[150px] h-10 rounded-lg  bg-white border-none px-2 ' name='enddate' onChange={(e) => {
                            setEndDate(e.target.value);
                            CalculateTime();}}/>
            </div>
            </div>
            
            <div className='flex flex-col mt-3'>
            <p>Estimated duration</p>
            <p>{ContractData.Estimated_duration}</p>
            </div>
            </div>

        </div>

        <div className='  w-fit h-fit  rounded-xl '>
            <div>
                <p className='text-[25px] font-bold'>Vehical Info</p>
            </div>

            <div className='flex flex-col gap-1 mt-3'>
                <p>Vehical Instance</p>
                <select name='Vehical_Inst' onChange={HandleInput} className='w-[150px]  rounded-lg  bg-white border-none p-2'>
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

export default AddContract