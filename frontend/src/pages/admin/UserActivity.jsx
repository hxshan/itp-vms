import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useEffect, useState} from "react"
import { useAuthContext } from "@/hooks/useAuthContext";
import { ClockLoader } from 'react-spinners'



const UserActivity = () => {

  const [activitydata, error, loading, axiosFetch] = useAxios()
  const [activity,setActivity]=useState([])
  const { user } = useAuthContext()
  const columns=["Email","Endpoint","Action","Action Type","Status"]

  const getData = ()=>{
    axiosFetch({
      axiosInstance:axios,
      method:'GET',
      url:'/user/activity',
      headers:{
        authorization:`Bearer ${user?.accessToken}`
      }
    })
}


useEffect(()=>{
  
console.log(activity)
  if(activitydata)
    setActivity(activitydata)   
},[activitydata])

useEffect(()=>{
  if(user?.accessToken){
    getData()
  }
},[user])



if(loading){
  return(
    <div className="w-full h-[300px] bg-white shadow-lg border border-gray-200 flex justify-center items-center">
       
      <ClockLoader
        color="#36d7b7"
        size={60}
      />
    </div>
    
  )
}
if(error){
  return(
    <p>Unexpected Error has occured!</p>
  )
}


  return (
    <div className="container mx-auto py-10 min-h-full">
        <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <h2 className="font-bold text-xl underline mb-4">Activity List</h2>
       
      </div>
      
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-secondary">
          <tr>
            {columns.map((col,index) => {
              return <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider" key={index}>{col}</th>
            })}
           
          </tr>
        </thead>
        <tbody>
          {
          activity.length>0 && activity?.map((row) => {
            return (
                <tr className="bg-white dark:bg-secondaryDark dark:text-white border-t border-gray-200" key={row._id}>
                  <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">{row.user.email}</td>
                  <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">{row.endpoint}</td>
                  <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">{row.action}</td>
                  <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">{row.requestType}</td>
                  <td
                   className={`px-6 py-3 whitespace-nowrap border-r border-gray-200 text-center font-semibold leading-5 ${row.status=='success'?'text-green-500 bg-green-100':'text-red-600 bg-red-100'}`}>

                      {row.status.toUpperCase()}
                  </td>
                 
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    
    </div>
    </div>
  )
}

export default UserActivity