import React, { useState, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';


const AllVehicle = () => {
  const [data, error, loading, axiosFetch] = useAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [category, setCategory] = useState(''); // Add category state
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [vehicleGearSys, setVehicleGearSys] = useState('');
  const [licEndDate, setLicEndDate] = useState('');
  const [insEndDate, setInsEndDate] = useState('');
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
      const lowerCaseCategory = vehicle.category ? vehicle.category.toLowerCase() : ''; 
      const lowerCaseVehicleType = vehicle.vehicleType.toLowerCase();
      const lowerCaseVehicleModel = vehicle.vehicleModel.toLowerCase();
      const lowerCaseFuelType = vehicle.fuelType.toLowerCase();
      const lowerCaseGearType = vehicle.vehicleGearSys.toLowerCase();
      const formattedLicEndDate = formatDate(vehicle.licEndDate);
      const formattedInsEndDate = formatDate(vehicle.insEndDate);
  
      return (
        (searchStatus === '' || vehicle.statusVehicle === searchStatus) &&
        (category === '' || lowerCaseCategory === category.toLowerCase()) && 
        (vehicleType === '' || lowerCaseVehicleType === vehicleType.toLowerCase()) &&
        (vehicleModel === '' || lowerCaseVehicleModel === vehicleModel.toLowerCase()) &&
        (fuelType === '' || lowerCaseFuelType === fuelType.toLowerCase()) &&
        (vehicleGearSys === '' || lowerCaseGearType === vehicleGearSys.toLowerCase())&&
        (licEndDate === '' || formattedLicEndDate === formatDate(licEndDate)) &&
        (insEndDate === '' || formattedInsEndDate === formatDate(insEndDate)) &&
        (searchTerm === '' || 
          lowerCaseVehicleRegister.includes(searchTerm.toLowerCase()) ||
          lowerCaseVehicleType.includes(searchTerm.toLowerCase()) ||
          lowerCaseVehicleModel.includes(searchTerm.toLowerCase()) ||
          lowerCaseFuelType.includes(searchTerm.toLowerCase()))
      );

    });
  
    setSearchResults(filteredResults);
  },[searchStatus, category, vehicleType, vehicleModel, fuelType, licEndDate, insEndDate, searchTerm,vehicleGearSys, data]);
  
  

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleStatusChange = event => {
    setSearchStatus(event.target.value);
  };

  const handleLicEndDateChange = event => {
    setLicEndDate(event.target.value);
  };

  const handleInsEndDateChange = event => {
    setInsEndDate(event.target.value);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const formatDate = dateString => {
    const dateObject = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return dateObject.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="relaive w-full h-screen bg-white flex justify-center items-center rounded-md">
          <div className="p-8">
             <ClockLoader color="#36d7b7" size={60} />
          </div>
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
    
    <select value={searchStatus} onChange={handleStatusChange} className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <option value="">All Statuses</option>
      <option value="Active">Active</option>
      <option value="Deactive">Deactive</option>
    </select>

    <select value={category} onChange={handleCategoryChange} className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <option value="">All Categories</option>
      <option value="car">Car</option>
      <option value="van">Van</option>
      <option value="bus">Bus</option>
      <option value="truck">Truck</option>
      <option value="lorry">Lorry</option>
      <option value="others">Others</option>
    </select>

    <input 
          type="date" 
          value={licEndDate} 
          onChange={handleLicEndDateChange} 
          className="mb-3 mr-4 shadow grow-0 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />

    <input 
          type="date" 
          value={insEndDate} 
          onChange={handleInsEndDateChange} 
          className="mb-3 mr-4 shadow grow-0 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />


    <input 
          type="text" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Search by Vehicle Registration Number" 
          className="mb-3 mr-4 shadow grow-0 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

    </div>
    <table className='w-full border-collapse border-spacing-2 border-black rounded-md pad shadow-xl p-5'>
    <thead className='bg-secondary text-white'>
            <tr>
              <th className='border border-white p-2'>Vehicle Registration Number</th>
              <th className='border border-white p-2'>Vehicle Model</th>
              <th className='border border-white p-2'>Fuel Type</th>
              <th className='border border-white p-2'>Number of Seats</th>
              <th className='border border-white p-2'>Gear System</th>
              <th className='border border-white p-2'>Licence End Date</th>
              <th className='border border-white p-2'>Insurance End Date</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(data => (
              <tr key={data._id} className="bg-white border-t border-gray-200">
                <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.vehicleRegister}</td>
                <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.vehicleModel }</td>
                <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.fuelType}</td>
                <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.numOfSeats }</td>
                <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{data.vehicleGearSys}</td>
                <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{formatDate(data.licEndDate)}</td>
                <td className="px-6 text-center font-semibold py-2 whitespace-nowrap border-r border-gray-200">{formatDate(data.insEndDate) }</td>
              </tr>
            ))}
          </tbody>
    </table>
  </div>
   );          
}

export default AllVehicle