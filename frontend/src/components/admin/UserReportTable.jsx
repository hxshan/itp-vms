import React from 'react'
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useEffect, useState} from "react"
import { useAuthContext } from "@/hooks/useAuthContext";
import { ClockLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const UserReportTable = ({reload,setReload}) => {
    const { user } = useAuthContext()
    const columns=["Name","Email","Role","Employment Date","Status"]
    const navigate=useNavigate()

    const [search,setSearch]=useState('')
    const [statusFilter,setStatusFilter]=useState('')
    const [empFrom,setEmpFrom]=useState('')
    
    const [usersdata, error, loading, axiosFetch] = useAxios()
    const [users,setUsers]=useState([])
    const [filteredUsers,setFilteredusers]=useState([])
    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(6);
    
    const getData = ()=>{
        axiosFetch({
          axiosInstance:axios,
          method:'GET',
          url:'/user/',
          headers:{
            authorization:`Bearer ${user?.accessToken}`
          }
        })
    }
    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Buffer to store the generated Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
      saveAs(blob, "data.xlsx");
  };

    const filterData=()=>{
       var basefiltered=users.filter((user)=>{
        if (search.toLowerCase === '' && statusFilter === '' )
          return user
        if (statusFilter != '' && !search.toLowerCase === '')
          return user.firstName.toLowerCase().includes(search) && user.status === statusFilter
        if(statusFilter != '')
          return user.status === statusFilter
        if(search.toLowerCase != '')
         return user.firstName.toLowerCase().includes(search)
        })

        if(empFrom !== ''){  
          setFilteredusers(()=>{
            basefiltered.filter(user => {
              const employmentDate = new Date(user.employmentDate);
              const fromDate = new Date(empFrom);
              return employmentDate >= fromDate;
            });
          })
        }else{
          setFilteredusers(basefiltered)
        }
    }
    
    
    useEffect(()=>{
      if(usersdata)
        setUsers(usersdata)
        setFilteredusers(usersdata)   
    },[usersdata])
    useEffect(() => {
      // Logic to update filtered data
      filterData();
    }, [search, statusFilter, empFrom]);
    
    useEffect(()=>{
      if(user?.accessToken)
        getData()
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
        <div className="w-full">
          <div className="w-full flex justify-between mb-4 gap-4 items-end">
            <h2 className="font-bold text-xl underline mb-4 w-fit text-nowrap">Users List</h2> 
            <div className="flex gap-6 w-full items-end justify-end">
              <button 
              onClick={exportToExcel}
              className="px-4 py-2 text-white bg-actionBlue h-fit hover:bg-gray-800 focus:outline-none rounded-md mr-4">
                Export Excel
              </button>
              <div className='flex flex-col'>
                <label  className="block text-gray-700 text-md font-bold mb-2 px-2" htmlFor="empfrom">Employment From</label>
                <input
                    value={empFrom}
                    onChange={(e)=>{setEmpFrom(e.target.value)}}
                    className="shadow appearance-none border rounded w-40 h-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date" name="empto" id="empfrom" 
                />
              </div>
             
              <div className='flex flex-col'>
                <label className="block text-gray-700 text-md font-bold mb-2 px-2" htmlFor="status">Status</label>
                <select name="status"
                value={statusFilter}
                onChange={(e)=>{setStatusFilter(e.target.value)}}
                className="shadow appearance-none border rounded h-fit w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              
              <input type="text" name="Search" 
              placeholder="Search"
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value); 
              }}
              className="shadow appearance-none border rounded h-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
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
              {(filteredUsers!=null && filteredUsers.length>0) ?(filteredUsers.slice(startIdx,endIdx)
              .map((row) => {
                
                return (
                    <tr className="bg-white border-t border-gray-200" key={row._id}>
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.firstName}</td>
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.email}</td>
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.role.name}</td>
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.employmentDate.split('T')[0]}</td>
                      <td className={`px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center  font-bold ${row.status=='active'?'text-green-500 bg-green-100': row.status=='inactive'?'text-red-600 bg-red-100':'text-orange-600 bg-orange-100'}`}>
                        <span className={`px-2 inline-flex text-xs leading-4 tracking-wider`}>
                          {row.status.toUpperCase()}
                        </span>
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

export default UserReportTable