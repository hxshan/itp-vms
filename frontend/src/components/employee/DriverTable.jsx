import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useEffect, useState } from "react"
import { useAuthContext } from "@/hooks/useAuthContext";

const DriverTable = () => {
const { user } = useAuthContext()
const columns=["Name","Email","Role","Status"]
const [search,setSearch]=useState('')
const [users, error, loading, axiosFetch] = useAxios()
const [reload,setReload]= useState(0)
const [startIdx, setStartIdx] = useState(0);
const [endIdx, setEndIdx] = useState(6);

const getData = ()=>{
    axiosFetch({
      axiosInstance:axios,
      method:'GET',
      url:'/user/drivers',
      headers:{
        authorization:`Bearer ${user?.accessToken}`
      }
    })
}

const deleteData =async(e) => {
  e.preventDefault()
  if(confirm("Are you sure you want to Delete the following user")){
    await axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: `/user/${e.target.id}`,
    });
    if(!error){
      setReload(reload + 1);
    } 
  }
};

useEffect(()=>{
  if(user?.accessToken)
    getData()
},[user])

  if(loading){
    return(
      <p>Loading...</p>
    )
  }
  if(error){
    return(
      <p>Unexpected Error has occured!</p>
    )
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <h2 className="font-bold text-xl underline mb-4">Driver List</h2>
        <div className="flex gap-4 w-fit">
          <button 
          className="w-[130px] bg-blue-600 p-1 px-1 rounded-lg shadow-md text-sm text-white font-bold">
            Add Driver
          </button>
          
          <input type="text" name="Search" 
          placeholder="Search"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-500">
          <tr>
            {columns.map((col,index) => {
              return <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider" key={index}>{col}</th>
            })}
            <th className="relative px-6 py-3">
              <span className="text-center text-xs font-bold text-white uppercase tracking-wider">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {(users!=null && users.length>0)  ?(users.filter((user)=>{
            return search.toLowerCase === ''? 
            user:
            user.firstName.toLowerCase().includes(search);
          }).slice(startIdx,endIdx)
          .map((row) => {
            return (
                <tr className="bg-white border-t border-gray-200" key={row._id}>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.firstName}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.email}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.role.name}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded -full ${row.status=='active'?'text-green-500 bg-green-100':'text-red-500 bg-red-100'}`}>
                      {row.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap justify-between flex">
                  <button className="bg-blue-600 text-white py-1 px-6 rounded-md">View</button>
                    <button className="bg-yellow-300 text-white py-1 px-6 rounded-md">Edit</button>
                    <button type="submit" onClick={(e)=>deleteData(e)} className="bg-red-700 text-white py-1 px-6 rounded-md">Delete</button>
                  </td>   
              </tr>
            );
          })):(
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className="w-full flex justify-end">
        <button
          className={`${
            startIdx == 0 ? "hidden" : ""
          } py-1 px-2 border border-gray-600 rounded-md mt-4`}
        
          onClick={() => {
            setStartIdx(startIdx - 6);
            setEndIdx(endIdx - 6);
          }}
          type="button"
        >
          Previous
        </button>
        <button
          className={`${
            users.length - endIdx <= 0 ? "hidden" : " "
          } ml-8 py-1 px-2 border border-gray-600 rounded-md mt-4`}    
          onClick={() => {
            setStartIdx(startIdx + 6);
            setEndIdx(endIdx + 6);
          }}
          type="button"
        >
          Next
        </button>
      </div>
    </div>

  );
};

export default DriverTable;
