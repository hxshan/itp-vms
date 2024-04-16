import React, { useEffect, useState } from "react";
import user_pfp from "../../assets/user_profile.png";
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import {useNavigate , useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useLogout } from "@/hooks/useLogout";

const UserProfile = () => {
  const { id } = useParams();
  const [data, error, loading, axiosFetch] = useAxios()
  const [resetResponse,pwdErr, pwdLoading, resetPwd] = useAxios()
  const {logout} = useLogout()
  const [menuOpen,setMenuOpen]=useState(false)
  const[currentPwd,setCurrentPwd]=useState('')

  const[newPwd,setNewPwd]=useState('')
  const [reload,setReload]=useState(0)

  const getData= ()=>{
    axiosFetch({
      axiosInstance:axios,
      method:'GET',
      url:`/user/${id}`
    })
  }

  const resetPassword = async ()=>{
      await resetPwd({
        axiosInstance:axios,
        method:'PATCH',
        url:`/user/password/${id}`,
        requestConfig:{
          data:{
            currentPwd,
            newPwd
          }
        }
      })

     
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    await resetPassword()
   
  }
  useEffect(()=>{
    if(!(resetResponse.length<=0) && !pwdErr){
      console.log(!pwdErr)
      setMenuOpen(false)
      alert('Password Reset Successfully.You will now be logged out!!')
      logout()
    }
  },[resetResponse,pwdErr])

  useEffect(()=>{
    getData()
  },[reload])

  if(loading){
    return(
      <p>loading ...</p>
    )
  }

  if(error){
    return(
      <p>{error}</p>
    )
  } 

  return (
    <div className="container w-full flex justify-center pt-14 min-h-full">
      <ToastContainer/>
      <div className="w-fit h-fit relative p-10 flex flex-col items-center rounded-md border-2 border-gray-300 shadow-lg bg-white">
        <div className="flex h-[10rem] w-[10rem] mb-8">
          <img className="w-full h-full" src={user_pfp} alt="profile image" />
        </div>
        <div className="flex flex-col gap-12 py-4">
          <div className="w-full flex items-center gap-8">
            <div className="w-full flex flex-col">
              <label className="font-bold text-gray-700 mb-1" htmlFor="firstName">First Name</label>
              <input
                type="text"
                readOnly={true}
                value={data?.firstName||''}
                name="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-bold text-gray-700 mb-1" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                value={data?.lastName||''}
                readOnly={true}
                name="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              />
            </div>
          </div>
          <div className="w-full flex items-center gap-8">
            <div className="w-full flex flex-col">
              <label className="font-bold text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                type="text"
                value={data?.email||''}
                readOnly={true}
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-bold text-gray-700 mb-1" htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                value={data?.phoneNumber||''}
                readOnly={true}
                name="phoneNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              />
            </div>
          </div>
        </div>
        <button onClick={()=>setMenuOpen(true)} className="bg-blue-600 px-2 py-2 mt-4 rounded-md text-white font-bold">
          Change Password
        </button>
        <div className={`${!menuOpen?'hidden':''} w-fit p-12 gap-4 flex flex-col absolute items-center rounded-md border-2 border-gray-300 shadow-lg bg-white h-fit`}> 
            <button 
            onClick={()=>setMenuOpen(false)} 
            className="absolute top-3 right-3 border border-gray-500 rounded-full hover:bg-red-600 hover:text-white">
              <div className="w-8 h-8 flex justify-center items-center">
                <span>X</span>
              </div>
            </button>
            
            <div className="w-full flex flex-col mt-4">
              <label className="font-bold text-gray-700 mb-1" htmlFor="currentpwd">Current Password</label>
              <input
                type="password"
                name="currentpwd"
                onChange={(e)=>setCurrentPwd(e.target.value)}
                value={currentPwd}
                className="outline-none border py-2 px-2 bg-gray-100 border-black rounded-md"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-bold text-gray-700 mb-1" htmlFor="newpwd">New Password</label>
              <input
                type="password"
                onChange={(e)=>setNewPwd(e.target.value)}
                value={newPwd}
                name="newpwd"
                className="outline-none border py-2 px-2 bg-gray-100 border-black rounded-md"
              />
            </div>
            {
              pwdErr && <p className="text-red-600 font-bold">{pwdErr}</p>
            }
          <button className="bg-blue-600 px-8 py-1 rounded-md text-white font-bold tracking-wide" type="submit" onClick={(e)=>handleSubmit(e)}>Save</button>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
