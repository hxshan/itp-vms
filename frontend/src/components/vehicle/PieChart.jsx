import React, { useState, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';

const PieChart = () => {
  const [data, error, loading, axiosFetch] = useAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [category, setCategory] = useState(''); // Add category state
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/vehicle/'
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let filteredResults = data.vehicles || [];

    filteredResults = filteredResults.filter(vehicle => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const lowerCaseVehicleRegister = vehicle.vehicleRegister.toLowerCase();
      const lowerCaseCategory = vehicle.category.toLowerCase();
      const lowerCaseVehicleType = vehicle.vehicleType.toLowerCase();
      const lowerCaseVehicleModel = vehicle.vehicleModel.toLowerCase();
      const lowerCaseFuelType = vehicle.fuelType.toLowerCase();

      return (
        (searchTerm === '' || lowerCaseVehicleRegister.includes(lowerCaseSearchTerm)) &&
        (searchStatus === '' || vehicle.statusVehicle === searchStatus) &&
        (category === '' || lowerCaseCategory === category.toLowerCase()) &&
        (vehicleType === '' || lowerCaseVehicleType === vehicleType.toLowerCase()) &&
        (vehicleModel === '' || lowerCaseVehicleModel === vehicleModel.toLowerCase()) &&
        (fuelType === '' || lowerCaseFuelType === fuelType.toLowerCase())
      );
    });

    setSearchResults(filteredResults);
  }, [searchTerm, searchStatus, category, vehicleType, vehicleModel, fuelType, data]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = event => {
    setSearchStatus(event.target.value);
  };

  const formatDate = dateString => {
    const dateObject = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return dateObject.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-full bg-white">
        <ClockLoader color="#36d7b7" height={50} width={10} />
      </div>
    );
  }
  if (error) {
    return (
      <p className="flex flex-col items-center justify-center h-screen text-center text-lg font-bold text-black">
        Unexpected Error has occurred!
      </p>
    );
  }


  return (
    <div className='w-full place-content-center space-y-4 mt-8 bg-cover bg-center mb-10'>
    <h1 className='text-2xl font-bold text-black mt-4'>All Vehicles</h1>
    <div className='flex justify-end items-center'>
    <div className="text-xm font-semibold text-black mr-5">Search by</div> 
    
    <select value={searchStatus} onChange={handleStatusChange}  className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <option value="">All Statuses</option>
      <option value="Active">Active</option>
      <option value="Deactive">Deactive</option>
    </select>

    <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by Vehicle Registration Number" className="mb-3 mr-4 shadow grow-0 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

    </div>
    <table className='w-full border-collapse border-spacing-2 border-black rounded-md pad shadow-xl p-5'>
      <thead className='bg-secondary text-white'>
        <tr>
          <th className='border border-white p-2'>Vehicle Registration Number</th>
          <th className='border border-white p-2'>Status</th>
          <th className='border border-white p-2'>Start Date</th>
          <th className='border border-white p-2'>End Date</th>
          <th className='border border-white p-2'>Passenger Count</th>
          <th className='border border-white p-2'>Estimated Distance</th>
          <th className='border border-white p-2'>Initial Odometer Reading</th>
        </tr>
      </thead>
      <tbody>
      {searchResults.map(data => (
      <tr key={data._id} className="bg-white border-t border-gray-200">
        <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.vehicleRegister}</td>
        <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.vehicleModel }</td>
        <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{formatDate(data.licEndDate)}</td>
        <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{formatDate(data.insEndDate) }</td>
        <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.numOfSeats }</td>
        <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.vehicleGearSys}</td>
        <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.fuelType}</td>
      </tr>
     ))}
      </tbody>
    </table>
  </div>
   );          
}

export default PieChart