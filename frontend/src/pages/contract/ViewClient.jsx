import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";


const ViewClient = () => {

    const params = useParams();

    const navigate = useNavigate();

    const clientID = params.id;

    const [ConExist,setConExist] = useState();

    

    const [deleClient,delError,delLoading,fetchDel] = useAxios()

    const DeleteClient = async ()=>{

      await fetchDel({
        axiosInstance: axios,
        method: "DELETE",
        url: `/contract/deleteClient/${clientID}`,  
      })
    }

    const HandleDelete =() => {
      
      const confirm = window.confirm("This client will be deleted")

      if(confirm){
    
         DeleteClient().then(function (res){
          console.log(res)
          
         })

        
      }else{
        return;
      }
      
    }

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

    const [client,clientError,clientLoading,clientFetch] = useAxios();
    const [allContracts,contractError,contLoading,contFetch] = useAxios();

    const getallContracts = ()=>{
        contFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/contract/getAllContracts`,  
        })
    }

    const getClient = () =>{
        clientFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/contract/getClient/${clientID}`,
        })
    }
    useEffect(()=>{
      if(!delLoading){
        if(delError){
          alert(delError)
        }else if(deleClient.message === "Client and contrat deleted successfully" ){
          alert("Client and contrat deleted successfully")
          navigate('/client')
        }else if(deleClient.message === "Theres a ongoing contract" ){
          alert("Theres a ongoing contract")
        }else if(deleClient.message === "Client deleted successfully"){
          alert("Client deleted successfully")
          navigate('/client')
        }
      }
    },[delLoading])

    
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
                Comp_Available:client.Comp_Available
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

    
    useEffect(()=>{
        if(allContracts){
            const existContract = allContracts.some(contract => contract.clientID._id === clientID);
            setConExist(existContract)
        }
    },[allContracts,clientID])


    useEffect(()=>{
        getClient();
        getallContracts();
    },[])

if(contLoading){
  return(
    <div>Loading</div>
  )
}

  return (
    <div className='flex flex-col   items-center'>
      <div className="flex items-center justify-center mb-5">
        <h1 className=" text-[50px] font-bold ">Client View</h1>
      </div>

      <div className="bg-[#D9D9D9] w-[90%] h-fit rounded-lg py-4 flex flex-col  ">
        <div className='flex justify-between px-5 mb-4'>
        <button
              className=" bg-yellow-600 px-5 py-2 rounded-xl w-[120px] "
              onClick={()=>{navigate('/client')}}
            >
              Dashboard
            </button>
      <div className='flex gap-4'>
      <button className=" bg-red-600 px-5 py-2 rounded-xl" onClick={HandleDelete}>Delete</button>
      <button className=" bg-green-600 px-5 py-2 rounded-xl" onClick={()=>{navigate(`/EditClient/${clientID}`)}}>Edit</button>
      </div>
      </div>
      <div className='flex justify-evenly'>
        <div>
          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>First Name</label>
              <p>{clientData.firstName}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label>Last Name</label>
              <p>{clientData.lastName}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>Gender</label>
              <p>{clientData.gender}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label>Date of Birth</label>
              <p>{clientData.dob}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>Phone number</label>
              <p>{clientData.phoneNumber}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label>NIC number</label>
              <p>{clientData.nicNumber}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <p>{clientData.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label>licence number</label>
              <p>{clientData.licenceNumber}</p>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label>Address</label>
            <p>{clientData.Address}</p>
          </div>

          <div className="flex flex-col mb-4">
            <label>Contract Available</label>
            <p>{ConExist ? 'Available':'Not Available'}</p>
          </div>

        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div>
              <div className="flex flex-col gap-1 mb-3">
                <label>Company Available</label>
                <p>{clientData.Comp_Available ? "Yes": "No"}</p>
              </div>

    
                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1 ">
                    <label>Company name</label>
                    <p>{compData.Comp_Name ? compData.Comp_Name : 'None'}</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Registration number</label>
                    <p>{compData.Reg_Num ? compData.Reg_Num : 'None'}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1">
                    <label>Tax number</label>
                    <p>{compData.Tax_Num ? compData.Tax_Num : 'None'}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Legal structure</label>
                    <p>{compData.Legal_struc ? compData.Legal_struc:'None'}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1">
                    <label>Company email</label>
                    <p>{compData.Comp_Email ? compData.Comp_Email :'None'}</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Company phone</label>
                    <p>{compData.Comp_Phone ? compData.Comp_Phone:'None'}</p>
                  </div>
                </div>

                <div className="flex flex-col mb-4">
                  <label>Address</label>
                  <p>{compData.Comp_Address ? compData.Comp_Address:'None'}</p>
                </div>
              
            </div>
          </div>
          
        </div>
        </div>
        <div className="flex justify-end mr-5 gap-4">
        <button
              className={` ${ConExist ? ' hidden': ''} bg-red-600 px-5 py-2 rounded-xl w-[150px] `}
              onClick={()=>{navigate(`/Contract/${clientID}`)}}
            >
              Add contract
            </button>
            <button
              className=" bg-blue-600 px-5 py-2 rounded-xl w-[120px] "
            >
              Print
            </button>
          </div>
      </div>
        </div>
  )
}

export default ViewClient