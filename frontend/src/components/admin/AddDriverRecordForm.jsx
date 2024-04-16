import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { data } from "autoprefixer";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ClockLoader } from "react-spinners";
import Swal from "sweetalert2";

const AddDriverRecordForm = ({ isOpen, setIsOpen,reload,setReload }) => {
  const [drivers, error, loading, axiosFetch] = useAxios();
  const [record, recordError, recordLoading, axiosRecordFetch] = useAxios();
  const [selectedDriver,setSelectedDriver]=useState('')
  const [description,setDescription]=useState('')
  const [date,setDate]=useState('')
  const [type,setType]=useState('')

  const getData=()=>{
    axiosFetch({
        axiosInstance:axios,
        method:'GET',
        url:'/user/drivers'
    })
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
    if(selectedDriver === '' ) {Swal.fire({
        title: "Hold on",
        text: "Driver is not selected",
        icon: "warning"
      });
        return
    }
    if(description === '' ) {Swal.fire({
        title: "Hold on",
        text: "There is no description given",
        icon: "warning"
      });
        return
    }
    if(selectedDriver === '' ) {Swal.fire({
        title: "Hold on",
        text: "Record Type is not selected",
        icon: "warning"
      });
        return
    }
    if(selectedDriver === '' ) {Swal.fire({
        title: "Hold on",
        text: "Driver is not selected",
        icon: "warning"
      });
        return
    }
try{
    axiosRecordFetch({
        axiosInstance:axios,
        method:'POST',
        url:'/user/record',
        requestConfig:{
            data:{
                selectedDriver,
                description,
                type,
                date
            }
        }
    })
    setReload(reload+1)
}catch(err){
    console.log(err)
}
  }

useEffect(()=>{
    getData()
},[reload])

  if (loading) {
    return (
      <div className={"absolute top-0 left-0 w-full z-20 flex justify-center"}>
        <div className="bg-white rounded-md w-fit p-8 h-full relative">
          <ClockLoader color="#36d7b7" size={60} />
        </div>
      </div>
    );
  }

  return (
    <div className={isOpen ? "absolute top-0 left-0 w-full z-20 flex justify-center" : "hidden"}>
      <div className="bg-white rounded-md p-8 w-fit mt-8 h-full relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 border border-gray-500 rounded-full hover:bg-red-600 hover:text-white"
        >
          <div className="w-8 h-8 flex justify-center items-center">
            <span>X</span>
          </div>
        </button>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <div className="grid grid-cols-2 gap-x-4 min-w-[400px]">
            <div className="col-span-2 w-full flex flex-col mb-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="driver"
              >
                Driver
              </label>
              <select 
              name='driver' 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedDriver}
              onChange={(e)=>{setSelectedDriver(e.target.value)}}>
                <option  value="">
                  Select Driver
                </option>
                {drivers && drivers.length>0 && drivers.map((driver) => {
                  return (
                    <option key={driver._id} value={driver._id}>
                      {driver.firstName} {driver.lastName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-span-2 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                placeholder="Write a description"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="description"
              >
                Record Type
              </label>

              <select 
              name='driver' 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={type}
              onChange={(e)=>{setType(e.target.value)}}>
                <option  value=""> Select Driver</option>
                <option  value="positive"> Postive </option>
                <option  value="negative"> Negative</option>
              </select>
              
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="description"
              >
                Date of Occurrence
              </label>
              <input type="date"
               name="occurenceDate" 
               value={date}
               onChange={(e)=>{setDate(e.target.value)}}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>
          {
            recordError && <div className="col-span-1 w-full flex flex-col mb-4 ">
                <p className="text-red-500">{recordError}</p>
            </div>
          }

        <button type="submit" className="bg-actionBlue mx-2 py-2 px-6 rounded-md text-white whitespace-nowrap font-bold ">Create</button>   


        </form>
      </div>
    </div>
  );
};

export default AddDriverRecordForm;
