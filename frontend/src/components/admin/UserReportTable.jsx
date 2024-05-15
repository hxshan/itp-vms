import React from 'react'
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useEffect, useState} from "react"
import { useAuthContext } from "@/hooks/useAuthContext";
import { ClockLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaRegFileExcel } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'



const UserReportTable = ({reload}) => {
    const { user } = useAuthContext()
    const columns=["Name","Email","Role","Employment Date","Status"]

    const [search,setSearch]=useState('')
    const [statusFilter,setStatusFilter]=useState('')
    const [empFrom,setEmpFrom]=useState('')
    const [roleFilter,setRoleFilter]=useState('')

    const [usersdata, error, loading, axiosFetch] = useAxios()
    const [roledata, roleerror, roleloading, axiosroleFetch] = useAxios()

    const [users,setUsers]=useState([])
    const [filteredUsers,setFilteredusers]=useState([])
    const [roles,setRoles]=useState([])

    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(6);
    
    const getData =async ()=>{
        await axiosFetch({
          axiosInstance:axios,
          method:'GET',
          url:'/user/',
          headers:{
            authorization:`Bearer ${user?.accessToken}`
          }
        })
    }
    const getRoleData =async ()=>{
     await axiosroleFetch({
        axiosInstance:axios,
        method:'GET',
        url:'/role/',
        headers:{
          authorization:`Bearer ${user?.accessToken}`
        }
      })
  }

  const exportToPdf = () => {

    const headers = ["First Name","Email","Role","Employment Date","Status"]
    var props=["firstName","email","role","employmentDate","status"]
  
    var columnStyles = {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' },
  } 
    var doc = new jsPDF();
  
    var filteredData = filteredUsers.map((row) => {
      return headers.map((header, index) => {
        if (index === 2) {
            return row?.role?.name;
        } else {
            return row[props[index]];
        }
    });
    });

    autoTable(doc,{
      head: [headers],
      body: filteredData,
      styles: { overflow: 'linebreak' },
      columnStyles: columnStyles,
      
  });

  doc.save('User_Report.pdf');
  }

    const exportToExcel = () => {
      var data=filteredUsers
      var propertiesToExport=["firstName","email","role","employmentDate","status"]

      var filteredData = data.map(function(row) {
        var filteredRow = {};
        propertiesToExport.forEach(function(prop) {
            filteredRow[prop] = row[prop].name? row[prop].name: row[prop];
        });
        return filteredRow;
    });

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Buffer to store the generated Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
      saveAs(blob, "users.xlsx");
  };

    const filterData=()=>{
       var basefiltered=users.filter((user)=>{
        if (search.toLowerCase === '' && statusFilter === '' && roleFilter=='')
          return user
        if (statusFilter != '' && !search.toLowerCase === '')
          return user.firstName.toLowerCase().includes(search) && user.status === statusFilter
        if(statusFilter != '')
          return user.status === statusFilter
        if(search.toLowerCase != '')
         return user.firstName.toLowerCase().includes(search)
        })
        if(empFrom !== ''){  
          
          basefiltered=basefiltered.filter(user => {
            const employmentDate = new Date(user.employmentDate);
            const fromDate = new Date(empFrom);
            return employmentDate >= fromDate;
          });
          
        }
        if(roleFilter !== ""){
          basefiltered=basefiltered.filter(user => {
            return user.role?.name == roleFilter;
          });
        }
        
        setFilteredusers(basefiltered)
        
    }
    
    
    useEffect(()=>{
      if(usersdata){
        setUsers(usersdata)
        setFilteredusers(usersdata) 
      }
      if(roledata){
        setRoles(roledata)
      }
    },[usersdata,roledata])

    useEffect(() => {
      filterData();
    }, [search, statusFilter, empFrom, roleFilter]);
    
    useEffect(()=>{
      if(user?.accessToken){
         getData()
          getRoleData()
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
        <div className="w-full dark:text-white">
          <div className="w-full flex justify-between mb-4 gap-4 items-end">
            <h2 className="font-bold text-xl underline mb-4 w-fit text-nowrap">Users List</h2> 
            <div className="flex gap-2 w-full items-end justify-end">
            <button 
                onClick={exportToPdf}
                className="px-4 py-2 text-white bg-actionBlue h-fit text-nowrap hover:bg-gray-800 focus:outline-none rounded-md mr-4">
                  <div className='flex gap-1 items-center'>
                  Export Pdf
                  <FaRegFileExcel />
                  </div>
              </button>
              <button 
                  onClick={exportToExcel}
                  className="px-4 py-2 text-white bg-actionBlue h-fit hover:bg-gray-800 focus:outline-none rounded-md mr-4">
                  <div className='flex gap-1 items-center'>
                    Export Excel
                    <FaRegFileExcel />
                  </div>
              </button>
              <div className='flex flex-col'>
                <label  className="block text-gray-700 text-md font-bold mb-2 px-2 dark:text-white" htmlFor="empfrom">Employed From</label>
                <input
                    value={empFrom}
                    onChange={(e)=>{setEmpFrom(e.target.value)}}
                    className="shadow appearance-none border rounded w-40 h-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date" name="empto" id="empfrom" 
                />
              </div>
             
              <div className='flex flex-col'>
                <label className="block text-gray-700 text-md font-bold mb-2 px-2 dark:text-white" htmlFor="rolefilter">Role</label>
                <select name="rolefilter"
                value={roleFilter}
                onChange={(e)=>{setRoleFilter(e.target.value)}}
                className="shadow appearance-none border rounded h-fit w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
                  <option value="">Select Role</option>
                  {
                    roles.map(role=>{
                      return(
                        <option key={role?._id} value={role?.name}>{role?.name}</option>
                      )
                    })
                  }
                </select>
              </div>

              <div className='flex flex-col'>
                <label className="block text-gray-700 text-md font-bold mb-2 px-2 dark:text-white" htmlFor="status">Status</label>
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
              className="w-[180px] shadow appearance-none border rounded h-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 dark:bg-secondaryDark">{row?.firstName}</td>
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 dark:bg-secondaryDark">{row?.email}</td>
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 dark:bg-secondaryDark">{row?.role?.name}</td>
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 dark:bg-secondaryDark">{row?.employmentDate?.split('T')[0]}</td>
                      <td className={`px-6 py-2 whitespace-nowrap border-r border-gray-200 dark:bg-secondaryDark text-center font-bold ${row.status=='active'?'text-green-500 bg-green-100': row.status=='inactive'?'text-red-600 bg-red-100':'text-orange-600 bg-orange-100'}`}>
                        <span className={`px-2 inline-flex text-xs leading-4 tracking-wider`}>
                          {row?.status?.toUpperCase()}
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