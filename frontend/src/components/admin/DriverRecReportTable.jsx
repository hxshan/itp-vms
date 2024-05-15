
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useEffect, useState} from "react"
import { useAuthContext } from "@/hooks/useAuthContext";
import { ClockLoader } from 'react-spinners'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaRegFileExcel } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

const DriverRecReportTable = ({reload}) => {
  const { user } = useAuthContext()
  const columns=["Driver Name","Date of Occurence","Record Type"]
  const [search,setSearch]=useState('')
  const [statusFilter,setStatusFilter]=useState('')
  const [driverFilter,setDriverFilter]=useState('')

  const [recordData, error, loading, axiosFetch] = useAxios()
  const [driverData, drivererror, driverloading, axiosdriverFetch] = useAxios()

  const [records,setRecords]=useState([])
  const [drivers,setDrivers]=useState([])

  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(6);
  const [filteredRecords,setFilteredRecords]=useState([])

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
const getDriverData = ()=>{
  axiosdriverFetch({
    axiosInstance:axios,
    method:'GET',
    url:'/user/drivers/',
    headers:{
      authorization:`Bearer ${user?.accessToken}`
    }
  })
}

const exportToPdf = () => {

  const headers = ["Driver Name","description","occurenceDate","recordType"]
  var props=["user.firstName","description","occurenceDate","recordType"]

  var columnStyles = {
    0: { cellWidth: 'auto' },
    1: { cellWidth: 40 },
    2: { cellWidth: 'auto' },
    3: { cellWidth: 'auto' },
} 
  var doc = new jsPDF();

  var filteredData = filteredRecords.map((row) => {
    return headers.map((header, index) => {
      if (index === 0) {
          return row.user.firstName;
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

  doc.save('Driver_Record_Report.pdf');

}


const filterData=()=>{
  var basefiltered=records.filter((record)=>{
    if (search.toLowerCase === '' && statusFilter === '' && driverFilter === '' )
      return record
    if (statusFilter != '' && !search.toLowerCase === '')
      return record.user.firstName.toLowerCase().includes(search) && record.recordType === statusFilter
    if(statusFilter != '')
      return record.recordType === statusFilter
    if(search.toLowerCase != '')
     return record.user.firstName.toLowerCase().includes(search) 
  })
  setFilteredRecords(basefiltered)
  if(driverFilter !== ""){
    setFilteredRecords(()=>{
      return basefiltered.filter(record => {
        return record.user.firstName === driverFilter;
      });
    })
  }
}
    const exportToExcel = () => {
      var data=filteredRecords
      var propertiesToExport=["user","description","occurenceDate","recordType"]

      var filteredData = data.map(function(row) {
        var filteredRow = {};
        propertiesToExport.forEach(function(prop) {
            filteredRow[prop] = row[prop].firstName? row[prop].firstName: row[prop];
        });
        return filteredRow;
    });
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Buffer to store the generated Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

      saveAs(blob, "driverRecords.xlsx");
  }

useEffect(()=>{
  if(recordData){
    setRecords(recordData)   
    setFilteredRecords(recordData)
  }
  if(driverData){
    setDrivers(driverData)
  }
},[recordData,driverData])

useEffect(()=>{
  if(user?.accessToken){
    getData()
    getDriverData()
  }
},[user,reload])

useEffect(() => {
  filterData();
}, [search, statusFilter,driverFilter]);

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
    <div className="w-full mt-8 dark:text-white">
      <div className="w-full flex justify-between mb-4 gap-4 items-end">
      <h2 className="font-bold text-xl underline mb-4 w-fit text-nowrap">Driver Records List</h2> 
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
              className="px-4 py-2 text-white bg-actionBlue h-fit text-nowrap hover:bg-gray-800 focus:outline-none rounded-md mr-4">
                <div className='flex gap-1 items-center'>
                Export Excel
                <FaRegFileExcel />
                </div>
              </button>
              <div className='flex flex-col'>
                <label className="block text-gray-700 text-md font-bold mb-2 px-2 dark:text-white" htmlFor="driver">Driver</label>
                <select name="driver"
                value={driverFilter}
                onChange={(e)=>setDriverFilter(e.target.value)}
                className="shadow appearance-none border rounded w-full min-w-40 mx-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select Driver</option>
                  {
                    drivers.map((driver)=>{
                      return(
                        <option key={driver._id} value={driver.firstName}>{driver.firstName}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className='flex flex-col'>
                <label className="block text-gray-700 text-md font-bold mb-2 px-2 dark:text-white" htmlFor="status">Record Type</label>
                <select name="status"
                value={statusFilter}
                onChange={(e)=>setStatusFilter(e.target.value)}
                className="shadow appearance-none border rounded w-full min-w-40 mx-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select Type</option>
                  <option value="positive">Postive</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
          <input type="text" name="Search" 
          placeholder="Search"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          className="shadow appearance-none border rounded mx-2 min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

          
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
          {(records!=null && records.length>0)  ?(filteredRecords.slice(startIdx,endIdx)
          .map((row) => {
            return (
                <tr className="bg-white border-t border-gray-200" key={row._id}>
                  <td className="px-6 py-2 whitespace-nowrap border-r dark:bg-secondaryDark border-gray-200">{row.user.firstName}</td>
                  {/* <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.description}</td> */}
                  <td className="px-6 py-2 whitespace-nowrap border-r dark:bg-secondaryDark border-gray-200">{row.occurenceDate.split('T')[0]}</td>
                  <td className={`px-6 py-2 whitespace-nowrap border-r dark:bg-secondaryDark border-gray-200 text-center font-bold  ${row.recordType=='positive'?'text-green-500 bg-green-100':'text-red-600 bg-red-100'}`}>
                    <span className={`px-2 inline-flex text-xs leading-4 tracking-wider`}>
                        {row.recordType.toUpperCase()}
                    </span>
                  </td>
              </tr>
            );
          })):(
            <tr className="bg-white border-t border-gray-200">
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 dark:bg-secondaryDark" colSpan={columns.length}>No data available</td>
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

  );
}

export default DriverRecReportTable