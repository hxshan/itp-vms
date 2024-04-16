import React, { useEffect, useRef, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/api/axios";
import ReactToPrint from "react-to-print";

const PrintReport = () => {
    const params = useParams()

    const navigate = useNavigate()

    const clientID = params.id

    const [clientData,setclientData] = useState({
        firstName: "loading",
        lastName: "loading",
        gender: "loading",
        dob: "loading",
        phoneNumber: "loading",
        nicNumber: "loading",
        email: "loading",
        licenceNumber: "loading",
        Address: "loading",
        Comp_Available: "loading",
        Contract_Available:"loading"
        }) 
    
    const [compData,setcompData] = useState({
        Comp_Name: "loading",
        Reg_Num: "loading",
        Tax_Num: "loading",
        Legal_struc: "loading",
        Comp_Email: "loading",
        Comp_Phone: "loading",
        Comp_Address: "loading",
    })


    const [contracts,contError,ConLoading,ContFetch] = useAxios();
    const [client,clientError,clientLoading,clientFetch] = useAxios();
    
    const [allcontracts,setContracts] = useState([]);
    const [clientContracts,setclientContracts] = useState([]);
    const [contractTerminated,setContractsTerminated] = useState('');
    const [contractMade,setcontractMade] = useState('');
    const [ongoingContract,setOngoingContract] = useState({
      Payment_Amount:'',
      Payment_Plan:'',
      Payment_Date:'',
      Amount_Payed:'',
      DateCreated:''
    });

    const ref = useRef(null);
   


    const getContracts =()=>{
        ContFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/contract/getAllContracts`,
          });
    }
    

    useEffect(()=>{

        if(contracts){
            setContracts(contracts)
        }else if(contError){
            alert(contError)
        }

    },[contracts])

    useEffect(() => {
        const clientContracts = allcontracts.filter(contract => contract.clientID._id === clientID);
        if(clientContracts){
            const numMade = clientContracts.length;
            const numTerminated = clientContracts.filter(contract => contract.Status === "Terminated").length;
            const ongoingCont = clientContracts.find(contract => contract.Status === "ongoing" || contract.Status === "Newly Added")

            console.log(ongoingCont)
            setcontractMade(numMade)
            setContractsTerminated(numTerminated)
            setclientContracts(clientContracts)

            if(ongoingCont){
            setOngoingContract({
              Payment_Amount:ongoingCont.Payment_Amount,
              Payment_Plan:ongoingCont.Payment_Plan,
              Payment_Date:ongoingCont.Payment_Date,
              Amount_Payed:ongoingCont.Amount_Payed,
              DateCreated:new Date(ongoingCont.DateCreated).toLocaleDateString()
            })
          }
        }else{
            setclientContracts(null)
        }
    }, [allcontracts, clientID]);

   

    useEffect(()=>{
        getContracts()
        getClient()
    },[])

    const getClient = () =>{
        clientFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/contract/getClient/${clientID}`,
        })
    }

    useEffect(()=>{
        if(client){
            setclientData({
                firstName:client.firstName,
                lastName:client.lastName,
                gender:client.gender,
                dob:new Date(client.dob).toLocaleDateString(),
                phoneNumber:client.phoneNumber,
                nicNumber:client.nicNumber,
                email:client.email,
                licenceNumber:client.licenceNumber,
                Address:client.Address,
                Comp_Available:client.Comp_Available,
                Contract_Available:client.Contract_Available
            })
            if(client.Comp_Available){
                setcompData({
                    Comp_Name:client.Comp_Name,
                    Reg_Num:client.Reg_Num,
                    Tax_Num:client.Tax_Num,
                    Legal_struc:client.Legal_struc,
                    Comp_Email:client.Comp_Email,
                    Comp_Phone:client.Comp_Phone,
                    Comp_Address:client.Comp_Address
                })
            }else{
                setcompData({
                    Comp_Name:'',
                    Reg_Num:'',
                    Tax_Num:'',
                    Legal_struc:'',
                    Comp_Email:'',
                    Comp_Phone:'',
                    Comp_Address:''
                })
            }
        }
    },[client])

    const temp = true


  return (
    
    <div className='flex flex-col   items-center' >

      <div className="flex items-center justify-center mb-5">
        <h1 className=" text-[50px] font-bold ">Client Report</h1>
      </div>

        
        <div  className="bg-[#D9D9D9] w-[90%] h-fit rounded-lg py-4 flex justify-evenly"  ref={ref} >

        <div className="min-w-[700px] bg-white shadow-md rounded-md p-6">
      <div className="text-2xl font-bold text-center mb-6">User Report</div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Personal Information:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="font-semibold">First Name</span>
            <span>{clientData.firstName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Last Name</span>
            <span>{clientData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Gender</span>
            <span>{clientData.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date of Birth</span>
            <span>{clientData.dob}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone Number</span>
            <span>{clientData.phoneNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">NIC Number</span>
            <span>{clientData.nicNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email</span>
            <span>{clientData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">License Number</span>
            <span>{clientData.licenceNumber ? clientData.licenceNumber : "not available"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Address</span>
            <span>{clientData.Address}</span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Company Information:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="font-semibold">Company Available</span>
            <span>{clientData.Comp_Available ? "Yes": "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Company Name</span>
            <span>{compData.Comp_Name ? compData.Comp_Name : 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Registration Number</span>
            <span>{compData.Reg_Num ? compData.Reg_Num : 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tax Number</span>
            <span>{compData.Tax_Num ? compData.Tax_Num : 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Legal Structure</span>
            <span>{compData.Legal_struc ? compData.Legal_struc:'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Company Email</span>
            <span>{compData.Comp_Email ? compData.Comp_Email :'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Company Phone</span>
            <span>{compData.Comp_Phone ? compData.Comp_Phone:'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Company Address</span>
            <span>{compData.Comp_Address ? compData.Comp_Address:'None'}</span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Contract Information:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="font-semibold">Number of Contracts Made</span>
            <span>{contractMade}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Number of Contracts Terminated</span>
            <span>{contractTerminated}</span>
          </div>
        </div>
      </div>
      <div className={`${ongoingContract ? '': 'hidden'}`}>
        <h3 className="text-xl font-semibold mb-2">Ongoing Contract:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total Contract Amount</span>
            <span>{ongoingContract.Payment_Amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment Plan</span>
            <span>{ongoingContract.Payment_Plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Amount Paid</span>
            <span>{ongoingContract.Amount_Payed}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date Contract Created</span>
            <span>{ongoingContract.DateCreated}</span>
          </div>
        </div>
      </div>
    </div>
        

            
            

            
    </div>


      <div>
        <button className=" bg-orange-600 px-5 py-2 rounded-xl w-[120px] mr-4" onClick={()=>{navigate('/Report')}}>Cancel</button>
    <ReactToPrint bodyClass='print-agreement' content={()=>ref.current} trigger={()=>(<button
              className=" bg-blue-600 px-5 py-2 rounded-xl w-[120px] my-5"
            >
              Print
            </button>)}/>
            </div>

            
    </div>
  )
}

export default PrintReport