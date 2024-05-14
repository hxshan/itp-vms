import React, { useState, useEffect } from 'react';
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { ClockLoader } from "react-spinners";

const MaintainSummary = () => {

  const [data, error, loading, axiosFetch] = useAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      axiosFetch({
        axiosInstance: axios,
        method: "GET",
        url: "/vehiclemaintain/allmaintains/",
      });
    };

    fetchServices();
  }, []);


  useEffect(() => {
    if (data && Array.isArray(data)) {
      let filteredResults = data;
  
      if (searchTerm !== '') {
        filteredResults = filteredResults.filter(maintain => maintain.vrvehicleRegister.toLowerCase().includes(searchTerm.toLowerCase()));
      }
  
      setSearchResults(filteredResults);
    }
  }, [searchTerm, data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  if (loading) {
    return (
      <div className="relaive w-full h-screen bg-white flex justify-center items-center rounded-md">
          <div className="p-8">
             <ClockLoader color="#36d7b7" size={60} />
          </div>
      </div>
    )
  }

  if (error) {
    return (
      <p className="flex flex-col items-center justify-center h-screen text-center text-lg font-bold text-black">Unexpected Error has occurred!</p>
    )
  }


   
  return(
   
    <div className='w-full place-content-center space-y-4 mt-8 bg-cover bg-center mb-10'>
      <h1 className='text-2xl font-bold text-black mt-4'>All Maintaince</h1>
      <div className='flex justify-end items-center'>
        <div className="text-xm font-semibold text-black mr-5">Search by</div>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by Vehicle Registration Number" className="mb-3 mr-4 shadow grow-0 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <table className='w-full border-collapse border-spacing-2 border-black rounded-md pad shadow-xl p-5'>
        <thead className='bg-secondary text-white'>
          <tr>
            <th className='border border-white p-2'>Vehicle Registration Number</th>
            <th className='border border-white p-2'>Serviced Date</th>
            <th className='border border-white p-2'>Vehicle Last Milage</th>
            <th className='border border-white p-2'>Next Service Milage</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(maintain => (
            <tr key={maintain._id} className="bg-white border-t border-gray-200" >
              <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{maintain.vrvehicleRegister}</td>
              <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">
                 {maintain.vraddit} 
              </td>
              <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{maintain.vrissue}</td>
              <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{maintain.vrcost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default MaintainSummary;
