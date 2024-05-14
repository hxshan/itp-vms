import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useEffect, useState} from "react"
import { useAuthContext } from "@/hooks/useAuthContext";
import { ClockLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";
import EditDriverRecordFrom from "./EditDriverRecordFrom";


const DriverRecordTable = ({isopen,setIsOpen,reload,setReload}) => {

    const { user } = useAuthContext()
    const columns=["Driver Name","Date of Occurence","Record Type"]
    const navigate=useNavigate()
    const [search,setSearch]=useState('')
    const [statusFilter,setStatusFilter]=useState('')
    const [recordData, error, loading, axiosFetch] = useAxios()
    const [records,setRecords]=useState([])

    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(6);

    const [recordOpen,setRecordOpen]= useState(false)
    const [editId,setEditId]=useState('')
  

    
    const getData = ()=>{
        axiosFetch({
          axiosInstance:axios,
          method:'GET',
          url:'/user/drivers/records',
          headers:{
            authorization:`Bearer ${user?.accessToken}`
          }
        })
    }
    


    const deleteData =async(e) => {
      e.preventDefault()
      if(confirm("Are you sure you want to Delete the following Record")){
        await axiosFetch({
          axiosInstance: axios,
          method: "DELETE",
          url: `/user/drivers/records/${e.target.id}`,
          headers:{
            withCredentials:true,
            authorization:`Bearer ${user?.accessToken}`
          }
        });

        setReload(reload+1)
      }
    };

    const openForm = (e)=>{
      e.preventDefault()
      setEditId(e.target.id)
      setRecordOpen(true)
    }
    
    useEffect(()=>{
      if(recordData)
        setRecords(recordData)   
    },[recordData])
    
    useEffect(()=>{
      if(user?.accessToken){
        getData()
        setRecordOpen(false)
      }
    },[user,reload])
    
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
      <>
      {
        recordOpen &&
        <EditDriverRecordFrom driverid={editId} isOpen={recordOpen} setIsOpen={setRecordOpen} reload={reload} setReload={setReload}/>
      }
        <div className="w-full mt-8">
          <div className="w-full flex justify-between mb-4">
            <h2 className="font-bold text-xl underline mb-4">Driver Record List</h2>
            <div className="flex w-fit">
              <select name="status"
              value={statusFilter}
              onChange={(e)=>setStatusFilter(e.target.value)}
               className="shadow appearance-none border rounded w-full min-w-40 mx-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select Type</option>
                <option value="positive">Postive</option>
                <option value="negative">Negative</option>
              </select>
              <input type="text" name="Search" 
              placeholder="Search"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              className="shadow appearance-none border rounded mx-2 min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

               <button type="button" onClick={()=>setIsOpen(!isopen)} className="bg-actionBlue mx-2 py-2 px-6 rounded-md text-white whitespace-nowrap font-bold ">Add Record</button>   
            </div>
          </div>
          
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary">
              <tr>
                {columns.map((col,index) => {
                  return <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider" key={index}>{col}</th>
                })}
                <th className="relative px-6 py-3">
                  <span className="text-center text-xs font-bold text-white uppercase tracking-wider">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {(records!=null && records.length>0)  ?(records.filter((record)=>{
                  if (search.toLowerCase === '' && statusFilter === '' )
                    return record
                  if (statusFilter != '' && !search.toLowerCase === '')
                    return record.user.firstName.toLowerCase().includes(search) && record.recordType === statusFilter
                  if(statusFilter != '')
                    return record.recordType === statusFilter
                  if(search.toLowerCase != '')
                   return record.user.firstName.toLowerCase().includes(search) 
              }).slice(startIdx,endIdx)
              .map((row) => {
                return (
                    <tr className="bg-white border-t border-gray-200" key={row._id}>
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.user.firstName}</td>
                      {/* <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.recordType}</td> */}
                      <td className={`px-6 py-2 whitespace-nowrap border-r border-gray-200`}>{row.occurenceDate.split('T')[0]}</td>
                      <td className={`px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center font-bold  ${row.recordType=='positive'?'text-green-500 bg-green-100':'text-red-600 bg-red-100'}`}>
                        <span className={`px-2 inline-flex text-xs leading-4 tracking-wider`}>
                            {row.recordType.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap justify-between flex">
                      <button className="bg-actionBlue text-white py-1 px-6 rounded-md" id={row._id} onClick={(e)=>navigate(`/admin/userreport/${e.target.id}`) }>View</button>
                        <button className="bg-actionGreen text-white py-1 px-6 rounded-md" id={row.user._id} onClick={(e)=>openForm(e)}>Edit</button>
                        <button type="submit" id={row._id} onClick={(e)=>deleteData(e)} className="bg-actionRed text-white py-1 px-6 rounded-md">Delete</button>
                      </td>   
                  </tr>
                );
              })):(
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200" colSpan={columns.length}>No data available</td>
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
                records.length - endIdx <= 0 ? "hidden" : " "
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
      </>
      );
}

export default DriverRecordTable