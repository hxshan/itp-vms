import React, { useEffect, useState } from "react";
import user_pfp from "../../assets/user_profile.png";
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import {useNavigate , useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useLogout } from "@/hooks/useLogout";
import Swal from "sweetalert2";
import banner from '../../assets/banner.jpg'

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
    var pwdregex = /^(?=.*[0-9])(?=.*[!@#$%^&*()-_=+{};:<,.>?])(?=.*[a-zA-Z]).{8,}$/;
    if (!newPwd.match(pwdregex)){
      toast.error("New Password is Invalid (please use a strong password)")
      return
    }
    await resetPassword()
   
  }
  useEffect(()=>{
    if(!(resetResponse.length<=0) && !pwdErr){
      console.log(!pwdErr)
      setMenuOpen(false)
      Swal.fire({
        title: "Success!",
        text: "Password changed successfully",
        icon: "success"
      });
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
console.log(data)
  return (
    <div className="container w-full flex justify-center pt-14 min-h-full">
      <ToastContainer/>
      <div className="w-fit h-fit relative flex flex-col items-center rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg bg-white">
        <div className="flex flex-col h-[12rem] w-full mb-[4rem] relative">
          <img src={banner} className="w-full h-full" alt="" />
          <div className="flex h-[10rem] rounded-full overflow-hidden absolute left-1/2 transform -translate-x-1/2 top-1/2 p-1 bg-white">
            <img className="w-full h-full" src={data.empPhoto?`http://localhost:3000/employee_picture/${data.empPhoto}`:user_pfp} alt="profile image" />
          </div>
        </div>
        <div className=" flex flex-col justify-center">

            <div className="w-full">
              <p className="text-center text-xl font-bold">{data.firstName} {data.lastName}</p>
            </div>

            <div className="w-full mt-2">
              <p className="text-center text-lg font-bold">{data.role?.name}</p>
            </div>

            <div className="w-full flex justify-between mt-16 mb-4">
              
              <div className="mx-8 text-center ">
              <p className="text-sm font-semibold">User email :</p>
              <p className="text-center text-xl font-bold">{data.email}</p>
              </div>

              <div className="mx-8 text-center">
              <p className="text-sm font-semibold">User mobile :</p>
              <p className="text-center text-xl font-bold">{data.phoneNumber}</p>
              </div>
            </div>  
        </div>
        <button onClick={()=>setMenuOpen(true)} className="bg-blue-600 px-2 py-2 my-4 rounded-md text-white font-bold">
          Change Password
        </button>
        <div className={`${!menuOpen?'hidden':''} w-fit p-12 gap-4 flex flex-col absolute items-center rounded-md border-2 border-gray-300 shadow-lg bg-white h-fit`}> 
            <button 
            onClick={()=>{setMenuOpen(false);setCurrentPwd('');setNewPwd('')}} 
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
