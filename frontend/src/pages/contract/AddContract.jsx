import React, { useState } from 'react'


const AddContract = () => {

const [clientdet,setClientdet]  = useState({  
    id:"loading",
    first_name:"",
    last_name:"",
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

const [ContractData,setContractData] = useState({
    Vehical_Type:"",
    Vehical_Inst:""
})


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



  return (
    <div>


        <div>
            <p className=' text-[30px] font-bold'>Contract Info</p>
        </div>
        <div>
        <div>
            <p className=' text-[20px] font-bold'>Client details</p>
        </div>

        <div>
            <p>Client name</p>
            <p>{clientdet.first_name == ""? "loading":clientdet.first_name +" " +clientdet.last_name}</p>
        </div>

        <div>
            <p>Phone number</p>
            <p>{clientdet.number}</p>
        </div>

        <div>
            <p>Client email</p>
            <p>{clientdet.email}</p>
        </div>

        <div>
            <p>Client National ID</p>
            <p>{clientdet.client_NIC}</p>
        </div>
        </div>

        <div>
            <div>
                <p className='text-[20px] font-bold'>Rental Info</p>
            </div>

            <div>
                <label>Vehical Type</label>
                <select name='Vehical_Type' onChange={HandleInput}>
                    <option className='hidden'>Please select</option>
                    {vehicals.map((item,index)=>(
                        <option key={index} value={item._id} >{item.name}</option>
                    ))}
                </select>
            </div>

            <div>
            <div>
                <label>Start date</label>
                <input type='date'/>
            </div>

            <div>
                <label>End date</label>
                <input type='date'/>
            </div>

            <p>Estimated duration</p>
            <p>loading..</p>
            </div>

            <div>

            </div>


        </div>

        <div>
            <div>
            <p className='text-[20px] font-bold'>Insurance Info</p>
            </div>

            <div>
                <label>Insurance source</label>
                <select>
                    <option className='hidden'>please select</option>
                    <option>Client</option>
                    <option>Company</option>
                </select>
            </div>

            <div>
               <label>Name of Insurance provider</label>
               <input type='text'/> 
            </div>

            <div>
               <label>Policy number</label>
               <input type='text'/> 
            </div>

            <div>
               <label>Coverage Type</label>

               <select>
                <option className='hidden'>please select</option>
                <option>Liability</option>
                <option>comprehensive</option>
                <option>collision</option>
               </select>
            </div>

            <div>
                <label>Coverage amount</label>
                <input type='number'/>
            </div>

            <div>
                <label>Deductible</label>
                <input type='number'/>
            </div>

            <div>
            <div>
                <label>Start date</label>
                <input type='date'/>
            </div>

            <div>
                <label>End date</label>
                <input type='date'/>
            </div>
            </div>

            <div className='flex flex-col'>
                <label>Additianol notes</label>
                <textarea className='h-[200px] w-[300px]  border-2 border-black'></textarea>
            </div>
        </div>

        <div>
            <div>
                <p className='text-[20px] font-bold'>Vehical Info</p>
            </div>

            <div>
                <p>Vehical Instance</p>
                <select name='Vehical_Inst' onChange={HandleInput}>
                    <option className='hidden' >please select</option>
                    {vehicalInstance.map((item,index)=>(
                        <option value={item._id} className={`${item.vehicalID === ContractData.Vehical_Type?'':'hidden' }`}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <p>Vehical identification number</p>
                <p>{vehicalDet.year}</p>
            </div>

            <div>
                <p>Year manufactured</p>
                <p>{vehicalDet.year}</p>
            </div>
            
           <div>
            <p>Model</p>
            <p>{vehicalDet.model}</p>
           </div>
           
        </div>
    </div>
  )
}

export default AddContract