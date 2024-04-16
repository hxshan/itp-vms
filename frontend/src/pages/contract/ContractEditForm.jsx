import useAxios from '@/hooks/useAxios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "@/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";


const ContractEditForm = () => {

  const params = useParams();

  const navigate = useNavigate()

  const contractID = params.id;

  const [formatSD,setformatSD] = useState('');
  const [formatED,setformatED] = useState('');
  const [InsuranceSD,setInsuranceSD] = useState('');
  const [InsuranceED,setInsuranceED] = useState('');
  const [paymentDate,setpaymentDate] = useState('');

  const [openTemination,setOpenTermination] = useState(false);

  const [delContract,ContError,ContLoading,delFetch] = useAxios()

  const DeleteContract = async () => {
    await delFetch({
        axiosInstance: axios,
        method: "DELETE",
        url: `/contract/deleteContract/${contractID}`,  
    })
  }


  const HandleTerminate = ()=>{
    const confirm = window.confirm("This contract will be terminated")

      if(confirm){
    
        DeleteContract().then(function (res){
          console.log(res)
          
         })

        
      }else{
        return;
      }
  }

  
    const [EstimatedDays,setEstimatedDays] = useState('');

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
    Status:"",
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

    if(name === "contract_SD" || name === "contract_ED"){
      if(name === "contract_SD" && contractData.contract_ED){
          const result = inRange(value,contractData.contract_ED)
          if(result === 'INRANGE'){
            setEstimatedDays(calculateDateDiff(new Date(value),new Date(contractData.contract_ED)))
          }else{
            setEstimatedDays(result)
          }
      }else if(name === "contract_ED" && contractData.contract_SD){
          const result = inRange(contractData.contract_SD,value)
          if(result === 'INRANGE'){
            setEstimatedDays(calculateDateDiff(new Date(contractData.contract_SD),new Date(value)))
          }else{
            setEstimatedDays(result)
          }
      }
  }


    setContractData({
        ...contractData,
        [name]:value
    })
  }

  const calculateDateDiff = (startDate,endDate)=>{

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    var diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24));

    let output = [];

    
    if (diffDays >= 365) {
        const diffYears = Math.floor(diffDays / 365);
        output.push(`${diffYears} year${diffYears !== 1 ? 's' : ''}`);
        diffDays -= diffYears * 365;
    }

    if (diffDays >= 30) {
        const diffMonths = Math.floor(diffDays / 30);
        output.push(`${diffMonths} month${diffMonths !== 1 ? 's' : ''}`);
        diffDays -= diffMonths * 30;
    }

    if (diffDays > 0) {
        output.push(`${diffDays} day${diffDays !== 1 ? 's' : ''}`);
    }
    
    return output.join(' and ');
}

const inRange = (startDate,endDate) =>{
  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  const minstartDate = tommorow.toISOString().split('T')[0];

if(endDate < minstartDate){
      return "Contract end date connot be lower than contract start date"
  }else if(startDate > endDate){
      return "contract start date cannot be greater than contract end date"
  }else if(startDate === endDate){
      return "contract end date should be one day after Contract start date"
  }else{
      return "INRANGE"
  }
}


  
  const [Contract, error, loading, axiosFetch] = useAxios()
  const [updateData,updateError,updLoading,updateCon] = useAxios()

  const getContract =()=>{
    axiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/contract/getContract/${contractID}`,
   });
 }

 const updateContract = async () =>{
  await updateCon({
    axiosInstance:axios,
    method:'PATCH',
    url:`/contract/updateContract/${contractID}`,
    requestConfig:{
      data:contractData,
     }
  })
 }

 useEffect(()=>{
    if(!ContLoading){
      if(ContError){
        alert(ContError)
      }else if(delContract.message === "contract succesfully set to terminated" ){
        alert("Contract Terminated")
        navigate('/Contract/Dashbored')
      }else if(delContract.message === "contract does not exist" ){
        alert("contract does not exist")
      }
    }
  },[ContLoading])

  console.log(contractData.contract_ED)
  console.log(formatED)

  useEffect(()=>{
    if(!updLoading){
      if(updateError){
        alert(updateError)
      }else if(updateData.message === "no contract found" ){
        alert("No contract found")
      }else if(updateData.message === "success" ){
        if(openTemination){
          alert("Contract succesfully Renewed")
          navigate(`/viewContract/${contractID}`)
        }else{
        alert("Contract updated succesfully")
        navigate(`/viewContract/${contractID}`)
        }
      }else if(updateData.message === "failed"){
        alert(`No changes detected "Redirecting to contract page" `)
        navigate(`/viewContract/${contractID}`)
      }
    }
  },[updLoading])

 const HandleSubmit = async(e)=>{

  let compareED

  if(contractData.contract_ED === formatED){
    compareED = true
  }else{
    compareED = false
  }

  const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    const minstartDate = tommorow.toISOString().split('T')[0];

    const Insu_pov = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/
    const pol_num = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/
    const cov_num = /^\d+(\.\d+)?$/

    e.preventDefault();
    

    if (!contractData.Vehical_Type) {
        toast.error("Please select vehical type");
        return;
    }else if(!contractData.contract_ED){
        toast.error("Invalid contract end date")
        return;
    }else if(contractData.contract_ED < minstartDate){
        toast.error("Contract end date connot be lower than contract start date")
        return;
    }else if(new Date(contractData.contract_SD).toISOString().split('T')[0] === new Date(contractData.contract_ED ).toISOString().split('T')[0]){
        toast.error("contract end date should be one day after Contract start date")
        return;
    }else if(!contractData.Vehical){
        toast.error("please select vehical")
        return;
    }else if(!contractData.Insurance_Source){
        toast.error("please select Insurance source")
        return;
    }else if(!contractData.Insurace_provider || !contractData.Insurace_provider.match(Insu_pov)){
        toast.error("Invalid insurance provider")
        return;
    }else if(!contractData.Policy_Number  || !contractData.Policy_Number.match(pol_num)){
        toast.error("Invalid policy number")
        return;
    }else if(!contractData.Coverage_Type){
        toast.error("please select coverage type")
        return;
    }else if(!contractData.Coverage_Amount  || !contractData.Coverage_Amount.match(cov_num)){
        toast.error("Invalid coverage amount")
        return;
    }else if(!contractData.Deductible  || !contractData.Deductible.match(cov_num)){
        toast.error("Invalid detuctible amount")
        return;
    }else if(!contractData.Insurance_SD){
        toast.error("Enter isurance start date")
        return;
    }else if(!contractData.Insurance_ED){
        toast.error("Enter insurance end date")
        return;
    }else if(contractData.Insurance_ED < minstartDate){
        toast.error("Insurance end date connot be lower than Insurance start date")
        return;
    }else if(contractData.Insurance_SD > contractData.Insurance_ED ){
        toast.error("Insurance start date cannot be greater than Insurance end date")
        return
    }else if(contractData.contract_SD === contractData.Insurance_ED ){
        toast.error("Insurance end date should be one day after Insurance start date")
        return
    }else if(!contractData.Payment_Amount  || !contractData.Payment_Amount.match(cov_num)){
        toast.error("Invalid payment amount")
        return;
    }else if(!contractData.Payment_Plan){
        toast.error("please select payment plan")
        return;
    }else if(!contractData.Payment_Date){
        toast.error("please enter payment date")
        return;
    }else if(!contractData.Amount_Payed || !contractData.Amount_Payed.match(cov_num)){
        toast.error("Invalid amount payed")
        return;
    }

    let confirmMsg 

    if(openTemination){
      confirmMsg = "Renew contract"
    }else{
      confirmMsg = "Update contract ?"
    }

    const confirm = window.confirm(confirmMsg)

    if(confirm){
      await updateContract()
    }
  
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
        Status:Contract.Status,
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

      if(Contract.contract_ED && Contract.contract_SD){
        setEstimatedDays(calculateDateDiff(new Date(Contract.contract_SD),new Date(Contract.contract_ED)))
      }

      if(Contract.Status){
        if(Contract.Status === "waiting for termination"){
            setOpenTermination(true)
        }else{
            setOpenTermination(false)
        }
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

if(loading){
  return(
    <div className="flex justify-center items-center h-screen">
      <div className="sweet-loading">
        <ClipLoader color="#10971D" loading={true}  size={50} />
      </div>
    </div>
  );
}

  return (
    <div className='w-full flex flex-col justify-center items-center py-5' >


    <div className='flex items-center justify-center mb-4 border-b-2'>
        <p className=' text-[50px] font-bold '>EDIT CONTRACT</p>
    </div>
    <ToastContainer/>
    <div className='shadow-xl bg-white w-[90%] h-fit rounded-lg py-8 flex flex-col'>
    
    <div className='flex justify-evenly'>
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
    <div className='flex gap-12 mt-3'>
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
            <select name='Vehical_Type' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Vehical_Type} onChange={HandleInput}>
                    {vehicals.map((item,index)=>(
                        <option key={index} value={item.name} >{item.name}</option>
                    ))}
                </select>
        </div>

        <div>
        <div className='flex mt-3 gap-12'>
        <div className='flex flex-col gap-1'>
            <label className=' text-red-500'>* Start date</label>
            <p>{formatSD}</p>
        </div>

        <div className='flex flex-col gap-1'>
            <label>End date</label>
            <input type='date' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='contract_ED' value={formatED}  onChange={HandleInput} />
        </div>
        </div>
        
        <div className='flex flex-col mt-3'>
        <p>Estimated duration</p>
        <p className=' text-red-500 font-bold'>{EstimatedDays ? EstimatedDays : ''}</p>
        </div>

        <div className='flex flex-col gap-1 mt-3'>
            <label >Status</label>
            <p className=' text-blue-500 font-bold' >{contractData.Status}</p>
        </div>

        <div className={` ${openTemination ? "": "hidden" }`}>
            <button onClick={HandleTerminate} className=" bg-red-600 px-5 py-2 rounded-xl">Terminate</button>
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
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Insurance_Source} name='Insurance_Source'  onChange={HandleInput}>
                    <option value={"Client"}>Client</option>
                    <option value={"Company"}>Company</option>
                </select>
        </div>
        
        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
           <label>Name of Insurance provider</label>
           <input type='text' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Insurace_provider} name='Insurace_provider'  onChange={HandleInput}/>
        </div>

        <div className='flex flex-col gap-1'>
           <label>Policy number</label>
           <input type='text' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Policy_Number} name='Policy_Number'  onChange={HandleInput}/>
        </div>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
           <label>Coverage Type</label>
           <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Coverage_Type} name='Coverage_Type'  onChange={HandleInput}>
                <option value={"Liability"}>Liability</option>
                <option value={"comprehensive"}>comprehensive</option>
                <option value={"collision"}>collision</option>
               </select>
          
        </div>

        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Coverage amount</label>
            <input type='text' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Coverage_Amount} name='Coverage_Amount'  onChange={HandleInput}/>
        </div>

        <div className='flex flex-col gap-1'>
            <label>Deductible</label>
            <input type='text' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Deductible} name='Deductible'  onChange={HandleInput}/>
        </div>
        </div>

        <div className='flex gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Start date</label>
            <input type='date' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={InsuranceSD} name='Insurance_SD'  onChange={HandleInput}/>
        </div>

        <div className='flex flex-col gap-1'>
            <label>End date</label>
            <input type='date' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={InsuranceED} name='Insurance_ED' onChange={HandleInput}/>
        </div>
        </div>

        <div className='flex flex-col mt-3'>
            <label>Additianol notes</label>
            <textarea className='h-[200px] w-[456px]  shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={contractData.Insurance_notes} name='Insurance_notes'  onChange={HandleInput}></textarea>
        </div>
    </div>
    <div className='  w-fit h-fit rounded-xl '>
        <div>
            <p className='text-[25px] font-bold'>Payment Info</p>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <label>Amount</label>
            <input type='text' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Payment_Amount} name='Payment_Amount' onChange={HandleInput}/>
        </div>
        
        <div className='flex gap-12 mt-3'>
        <div className='flex flex-col gap-1'>
            <label>Payment plan</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Payment_Plan} name='Payment_Plan'  onChange={HandleInput}>
                    <option value={"upFront"}>upFront</option>
                </select>
        </div>

        <div className='flex flex-col gap-1'>
            <label>Payment date</label>
            <input type='date' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={paymentDate} name='Payment_Date'  onChange={HandleInput}/>
        </div>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <label>Amount payed</label>
            <input type='text' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contractData.Amount_Payed} name='Amount_Payed'  onChange={HandleInput}/>
        </div>

        <div className='flex flex-col mt-3 gap-1'>
            <p>Amount Due</p>
            <p>{contractData.Amount_Payed && contractData.Payment_Amount ? contractData.Payment_Amount - contractData.Amount_Payed : "Calculating"}</p>
        </div>
    </div>
    </div>
    </div>
    <div className="flex justify-end gap-4 mx-12">
            <button
              className=" bg-actionBlue text-white font-bold px-5 py-2 rounded-xl w-[120px] "
              onClick={HandleSubmit}
            >
              Submit
            </button>
            <button
              className=" bg-actionRed text-white font-bold px-5 py-2 rounded-xl w-[120px] "
              onClick={() => {
                navigate(`/viewContract/${contractID}`);
              }}
            >
              Cancel
            </button>
          </div>
  
    </div>
</div>
  )
}

export default ContractEditForm 