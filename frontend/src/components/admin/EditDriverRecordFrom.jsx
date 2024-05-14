import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import { useEffect } from "react";
import { ClockLoader } from "react-spinners";
import Swal from "sweetalert2";

const EditDriverRecordFrom = ({ isOpen, setIsOpen,reload,setReload,driverid }) => {
  const [driversData, error, loading, axiosFetch] = useAxios();
  const [record, recordError, recordLoading, axiosRecordFetch] = useAxios();

  const [drivers,setDrivers]=useState([])
  const [selectedDriver,setSelectedDriver]=useState(isOpen?driverid:'')
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

  const getRecordData=()=>{
    axiosRecordFetch({
        axiosInstance:axios,
        method:'GET',
        url:`/user/drivers/records/${driverid}`
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
        method:'PATCH',
        url:`/user/drivers/records/${record._id}`,
        requestConfig:{
            data:{
                selectedDriver,
                description,
                type,
                date
            }
        }
    })
    setSelectedDriver('')
    setDescription('')
    setType('')
    setDate('')
    setReload(reload+1)
}catch(err){
    console.log(err)
}
  }

useEffect(()=>{
    if(driverid !=='' && isOpen){
        getData()
        getRecordData()
    }
},[reload,isOpen])

useEffect(()=>{
    if(driversData){
        setDrivers(driversData)
    }
    if(record){
        setDescription(record.description)
        setType(record.recordType)
        setDate(record.occurenceDate?.split('T')[0])
        console.log(record)
    }
},[record,driversData])

  if (loading || recordLoading) {
    return (
      <div className={"absolute top-0 left-0 w-full z-20 flex justify-center"}>
        <div className="bg-white rounded-md w-fit p-8 h-full relative">
          <ClockLoader color="#36d7b7" size={60} />
        </div>
      </div>
    );
  }
console.log(selectedDriver)
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
                className="block  text-md font-bold mb-2"
                htmlFor="driver"
              >
                Driver
              </label>
              <select 
              name='driver' 
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
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
                className="block  text-md font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
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
                className="block  text-md font-bold mb-2"
                htmlFor="recordType"
              >
                Record Type
              </label>

              <select 
              name='recordType' 
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
              value={type}
              onChange={(e)=>{setType(e.target.value)}}>
                <option  value=""> Select Type</option>
                <option  value="positive"> Postive </option>
                <option  value="negative"> Negative</option>
              </select>
              
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block  text-md font-bold mb-2"
                htmlFor="description"
              >
                Date of Occurrence
              </label>
              <input type="date"
               name="occurenceDate" 
               value={date}
               onChange={(e)=>{setDate(e.target.value)}}
               className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
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

export default EditDriverRecordFrom;

 
 
 