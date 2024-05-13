import React, { useEffect, useRef, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/api/axios";
import ReactToPrint from "react-to-print";
import { ClipLoader } from "react-spinners";



const ViewContract = () => {
  const params = useParams();

  const navigate = useNavigate()

  const contractID = params.id;

  //const [timeDiff,setTimeDiff] = useState(null)
  const [countdown, setCountdown] = useState(null);
  const [EstimatedDays,setEstimatedDays] = useState('')
  const [countError,setError] = useState('')
  const [ContStatus,setContStatus] = useState('')


  const [contractData, setContractData] = useState({
    _id: "",
    Vehical: "",
    Vehical_Type:"loading",
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
    Status:"loading",
  });

  const ref = useRef(null);

  const [clientData, setclientData] = useState({
    _id: "",
    firstName: "loading",
    lastName: "loading",
    phoneNumber: "loading",
    nicNumber: "loading",
    email: "loading",
  });

  const [data, error, loading, axiosFetch] = useAxios()

  const getContract =()=>{
    axiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/contract/getContract/${contractID}`,
   });
 }
//(contractData.Deductible).toLocaleString()
 console.log( contractData.Deductible === "loading" ? "failed" : Number(contractData.Deductible).toLocaleString())

 useEffect(() => {

if (data) {
      setContractData({
        _id: data._id,
        Vehical_Type:data.Vehical_Type,
        Vehical: data.Vehical,
        contract_SD:new Date(data.contract_SD).toLocaleDateString(),
        contract_ED:new Date(data.contract_ED).toLocaleDateString(),
        Insurance_Source: data.Insurance_Source,
        Insurace_provider: data.Insurace_provider,
        Policy_Number: data.Policy_Number,
        Coverage_Type: data.Coverage_Type,
        Coverage_Amount: data.Coverage_Amount,
        Deductible: data.Deductible,
        Insurance_SD:new Date(data.Insurance_SD).toLocaleDateString(),
        Insurance_ED:new Date(data.Insurance_ED).toLocaleDateString(),
        Insurance_notes: data.Insurance_notes,
        Payment_Amount: data.Payment_Amount,
        Payment_Plan: data.Payment_Plan,
        Payment_Date:new Date(data.Payment_Date).toLocaleDateString(),
        Amount_Payed: data.Amount_Payed,
        Status:data.Status,
      });

      if(data.contract_ED && data.contract_SD){
        calculateTimeDiff(new Date(data.contract_SD),new Date(contractData.contract_ED))
        setEstimatedDays(calculateDateDiff(new Date(data.contract_SD),new Date(contractData.contract_ED)))
      }
      if(data.Status){
        setContStatus(data.Status);
      }

      if (data.clientID) {
        setclientData({
          _id: data.clientID._id,
          firstName: data.clientID.firstName,
          lastName: data.clientID.lastName,
          phoneNumber: data.clientID.phoneNumber,
          nicNumber: data.clientID.nicNumber,
          email: data.clientID.email,
        });
      }
    }
  }, [data]);

  useEffect(()=>{
    getContract();
  },[])

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

const calculateTimeDiff = (startDate, endDate) => {
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  const currentDateTime = new Date();

  startDateTime.setHours(startDateTime.getHours() - 5);
  startDateTime.setMinutes(startDateTime.getMinutes() - 30);

  if (startDateTime > currentDateTime) {
    setError("Can't start because start date is yet to come");
  } else {
    const diffMilliseconds = endDateTime - currentDateTime;

    if (diffMilliseconds >= 0) {
      setCountdown(diffMilliseconds);

      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prevCountdown - 1000;
        });
      }, 1000);
    } else {
      // If the end date has already passed, set countdown to 0
      setCountdown(0);
    }
  }
};

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
    <div>
      <div className="flex items-center justify-center ">
        <h1 className=" text-[50px] font-bold ">Contract View</h1>
      </div>
      
     
      <div className="bg-[#D9D9D9] h-fit rounded-lg py-4 flex flex-col justify-evenly my-4 w-full">
        <div className="flex w-full justify-between px-5 mb-5">
        <button
              className=" bg-yellow-600 px-5 py-2 rounded-xl w-[120px] "
              onClick={()=>{navigate('/Contract/Dashbored')}}
            >
              Dashboard
            </button>
        <button className={`${contractData.Status === "Terminated"? "hidden" : "" } bg-green-600 px-5 py-2 rounded-xl`} onClick={()=> navigate(`/EditContract/${contractData._id}`)}>Edit</button>
        </div>
        <div className="flex justify-evenly" ref={ref}>
        <div >
          <div className=" w-fit h-fit  pb-8 rounded-xl">
            <div>
              <p className=" text-[25px] font-bold">Client details</p>
            </div>

            <div className="flex mt-3">
              <div>
                <p>Client name</p>
                <p className=" text-[#000ac2] font-semibold">
                {clientData.firstName} {clientData.lastName}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-12 mt-3">
                <div>
                  <p>Client email</p>
                  <p className=" text-[#000ac2] font-semibold">
                    {clientData.email}
                  </p>
                </div>

                <div>
                  <p>Client National ID</p>
                  <p className=" text-[#000ac2] font-semibold">
                    {clientData.nicNumber}
                  </p>
                </div>
              </div>
              <div>
                <p>Phone number</p>
                <p className=" text-[#000ac2] font-semibold">
                  {clientData.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="  w-fit h-fit  pb-8 rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Rental Info</p>
            </div>

            <div>
              <p>Vehical Type</p>
              <p className=" text-[#000ac2] font-semibold">
                {contractData.Vehical_Type}
              </p>
            </div>
            <div className="flex gap-20">
            <div >
              <p>Contract Start Date</p>
              <p className=" text-[#000ac2] font-semibold">
                {contractData.contract_SD}
              </p>
            </div>
            <div>
              <p>Contract End Date</p>
              <p className=" text-[#000ac2] font-semibold">
                {contractData.contract_ED}
              </p>
            </div>
            </div>
            <div>
              <p>Contract Estimated duration</p>
              <p className=" text-[#000ac2] font-semibold">
                {EstimatedDays ? EstimatedDays : 'loading'}
              </p>
            </div>
            <div>
              <p>Contract Time remaining</p>
              <p className=" text-[#000ac2] font-semibold">
                {countdown ? <p>{Math.floor(countdown / (1000 * 60 * 60 * 24)) + ' days ' + Math.floor((countdown / (1000 * 60 * 60)) % 24) + ' hours ' + Math.floor((countdown / (1000 * 60)) % 60) + ' minutes ' + Math.floor((countdown / 1000) % 60) + ' seconds ' }</p> : countError  }
              </p>
            </div>

            <div>
              <p>Contract Status</p>
              <p className=" text-[#000ac2] font-semibold">
                {ContStatus}
              </p>
            </div>
          </div>

          <div className="  w-fit h-fit  rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Vehical Info</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
        
          <div className="  w-fit h-fit  pb-8 rounded-xl">
            <div>
              <p className="text-[25px] font-bold">Insurance Info</p>
              
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <label>Insurance source</label>
              <p>{contractData.Insurance_Source}</p>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Name of Insurance provider</label>
                <p>{contractData.Insurace_provider}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Policy number</label>
                <p>{contractData.Policy_Number}</p>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Coverage Type</label>
              <p>{contractData.Coverage_Type}</p>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Coverage amount</label>
                <p>{ contractData.Coverage_Amount === "loading" ? "loading" : Number(contractData.Coverage_Amount).toLocaleString()}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Deductible</label>
                <p>{ contractData.Deductible === "loading" ? "loading" : Number(contractData.Deductible).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Start date</label>
                <p>{contractData.Insurance_SD}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label>End date</label>
                <p>{contractData.Insurance_ED}</p>
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <label>Additianol notes</label>
              <p>{contractData.Insurance_notes}</p>
            </div>
          </div>
          <div className="  w-fit h-fit rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Payment Info</p>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Amount</label>
              <p>{contractData.Payment_Amount === "loading" ? "loading" : Number(contractData.Payment_Amount).toLocaleString()}</p>
            </div>

            <div className="flex gap-12 mt-3">
              <div className="flex flex-col gap-1">
                <label>Payment plan</label>
                <p>{contractData.Payment_Plan}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Payment date</label>
                <p>{contractData.Payment_Date}</p>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Amount payed</label>
              <p>{contractData.Amount_Payed === "loading" ? "loading" : Number(contractData.Amount_Payed).toLocaleString()}</p>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <p>Amount Due</p>
              <p>{contractData.Payment_Amount === "loading" || contractData.Amount_Payed === "loading" ? "loading" : Number(contractData.Payment_Amount - contractData.Amount_Payed).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-5 gap-4">
      <ReactToPrint bodyClass='print-agreement' content={()=>ref.current} trigger={()=>(<button
              className=" bg-blue-600 px-5 py-2 rounded-xl w-[120px] "
            >
              Print
            </button>)}/>
          </div> 
      </div>
    </div>
  );
};

export default ViewContract;
