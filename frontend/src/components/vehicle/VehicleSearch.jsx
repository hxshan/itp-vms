import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ClockLoader } from "react-spinners";
import { useAuthContext } from "@/hooks/useAuthContext";

const VehicleSearch = () => {
  const [data, error, loading, axiosFetch] = useAxios();
  const { user } = useAuthContext()
  const [reload, setReload] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const { vehicles = [] } = data;
  const [availabilityStatuses, setAvailabilityStatuses] = useState({});
  const [stateFilter, setStateFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  const handleViewClick = (id) => {
    navigate(`view/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`edit/${id}`);
  };

  const deactiveVehicle = async (id) => {
    if (confirm("Are you sure you want to deactive the following vehicle?")) {
      try {
        await axios.patch(`/vehicle/delete/${id}`,{},{
          headers:{
          withCredentials:true,
          authorization:`Bearer ${user?.accessToken}`
          }
        });
        setReload(reload + 1);
        alert('Vehicle deactivated successfully!');
      } catch (error) {
        toast.error('Failed to deactivate vehicle. Please try again later.');
      }
    }
  };

  const recoverVehicle = async (id) => {
    if (confirm("Are you sure you want to active the following vehicle?")) {
      try {
        await axios.patch(`/vehicle/recover/${id}`,{},{
          headers:{
          withCredentials:true,
          authorization:`Bearer ${user?.accessToken}`
          }
        });
        setReload(reload + 1);
        alert('Vehicle activated successfully!');
      } catch (error) {
        toast.error('Failed to activate vehicle. Please try again later.');
      }
    }
  };

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/vehicle/'
    });
  }

  useEffect(() => {
    getData();
  }, [reload]);

  const getAvailabilityData = async () => {
    try {
      const statuses = {};
      for (const vehicle of vehicles) {
        const response = await axios.get(`/vehicle/availability/${vehicle._id}`);
        const vehicleAvailability = response.data;
        let status = "Available";
        for (const availabilityRecord of vehicleAvailability) {
          const startDate = new Date(availabilityRecord.unavailableStartDate);
          const endDate = new Date(availabilityRecord.unavailableEndDate);
          const currentDate = new Date();
          const avaStatus = availabilityRecord.status

          if (currentDate >= startDate && currentDate <= endDate) {
            status =  avaStatus ;
            break; 
          }
        }
        statuses[vehicle._id] = status;
      }
      setAvailabilityStatuses(statuses);
    } catch (error) {
      console.error('Error fetching availability data:', error);
  
    }
  };

  useEffect(() => {
    getAvailabilityData();
  }, [vehicles]);


  useEffect(() => {
    getData();
  }, [reload]);
  

  if (loading) {
    return (
      <div className="p-10 w-full flex items-center justify-center h-full bg-white">
        <ClockLoader
            color="#36d7b7"
            height={50}
            width={10}
          />
      </div>
    )
  }
  if (error) {
    return (
      <p>Unexpected Error has occurred!</p>
    )
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchTerm = search.toLowerCase().trim();
    const stateFilterLowerCase = stateFilter.toLowerCase();
    const matchSearch = (
        vehicle.vehicleType.toLowerCase().includes(searchTerm) ||
        vehicle.vehicleModel.toLowerCase().includes(searchTerm) ||
        vehicle.vehicleRegister.toLowerCase().includes(searchTerm) ||
        vehicle.category.toLowerCase().includes(searchTerm)
    );

    // If state filter is selected, apply additional filtering based on vehicle state
    const matchStateFilter = !stateFilterLowerCase || vehicle.statusVehicle.toLowerCase() === stateFilterLowerCase;

    // If availability filter is selected, apply additional filtering based on availability
    const matchAvailabilityFilter = !availabilityFilter || availabilityStatuses[vehicle._id] === availabilityFilter;

    return matchSearch && matchStateFilter && matchAvailabilityFilter;
  });
    

  const chunkSize = 10;
  const totalPages = Math.ceil(filteredVehicles.length / chunkSize);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const startIndex = currentPage * chunkSize;
  const endIndex = Math.min(startIndex + chunkSize, filteredVehicles.length);
  const currentChunk = filteredVehicles.slice(startIndex, endIndex);

  return (
    <div className='w-full flex mx-0 flex-col justify-center mt-8 bg-cover bg-center mb-10'>

      <div className="border-b-4 border-black w-full"></div>
      <div className='text-2xl font-bold  mt-4'>Search Vehicle</div>

      <ToastContainer />

      <div className='flex justify-end items-center'>

      <div className="text-xm font-semibold  mr-5">Search by</div>  

      <select
        value={stateFilter}
        onChange={(e) => setStateFilter(e.target.value)}
        className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Deactive">Deactive</option>
      </select>

      <select
        value={availabilityFilter}
        onChange={(e) => setAvailabilityFilter(e.target.value)}
        className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">All</option>
        <option value="Available">Available</option>
        <option value="Hire">Hire</option>
        <option value="Maintain">Maintain</option>
        <option value="Contract">Contract</option>
        <option value="reserved">reserved</option>
      </select>


      <input
        type="text"
        name="Search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 "
      />
   
      </div>

      <table className='min-w-full divide-y divide-gray-200 mb-5'>
        <thead className='bg-secondary text-white'>
          <tr>
            <th className='border border-white p-2'>Vehicle Category</th>
            <th className='border border-white p-2'>Vehicle Type</th>
            <th className='border border-white p-2'>Vehicle Model</th>
            <th className='border border-white p-2'>Vehicle Register</th>
            <th className='border border-white p-2'>Vehicle State</th>
            <th className='border border-white p-2'>Avalability</th>
            <th className='border border-white p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentChunk.map(vehicle => (
            <tr className="bg-white border-t border-gray-200 dark:bg-tablebackgroundDark" key={vehicle._id}>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{vehicle.category}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{vehicle.vehicleType}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{vehicle.vehicleModel}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{vehicle.vehicleRegister}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${vehicle.statusVehicle === 'Active' ? 'text-green-500 bg-green-100' : vehicle.statusVehicle === 'Deactive' ? 'text-red-600 bg-red-100' : 'text-orange-600 bg-orange-100'}`}>
                  {vehicle.statusVehicle.toUpperCase()}
                </span>
              </td>
              <td className={`px-6 py-2 whitespace-nowrap border-r text-center font-semibold border-gray-200 ${vehicle.statusVehicle === 'Active' ? (availabilityStatuses[vehicle._id] === 'Available' || availabilityStatuses[vehicle._id] === '' ? 'text-green-500 bg-green-100' : 'text-red-600 bg-red-300') : ''}`}>
                {vehicle.statusVehicle === 'Active' ? 
                  (availabilityStatuses[vehicle._id] || 'Available') : 
                  (availabilityStatuses[vehicle._id] === 'Unavailable' ? 'Unavailable' : availabilityStatuses[vehicle._id])}
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-r border-gray-200 flex justify-center">
                    {vehicle.statusVehicle === 'Active' && (
                    <>
                      <button className="my-1 mx-1 bg-actionBlue text-white py-1 px-4 rounded-md text-sm" onClick={() => handleViewClick(vehicle._id)}>
                          View
                      </button>
                      <button className="my-1 mx-1 bg-yellow-300 text-white py-1 px-4 rounded-md text-sm" onClick={() => handleEditClick(vehicle._id)}>
                          Edit
                      </button>
                      <button className="my-1 mx-1 bg-actionRed text-white py-1 px-4 rounded-md text-sm" onClick={() => deactiveVehicle(vehicle._id)}>
                          Deactive
                      </button>
                    </>
                    )}
                    {vehicle.statusVehicle === 'Deactive' && (
                    <> 
                    <button className="my-1 mx-1 bg-actionBlue text-white py-1 px-9 rounded-md text-sm" onClick={() => handleViewClick(vehicle._id)}>
                       View
                    </button>
                     
                    <button className="my-1 mx-1 bg-green-500 text-white py-1 px-9 rounded-md text-sm" onClick={() => recoverVehicle(vehicle._id)}>
                        Active
                    </button>
                    </> 
                     )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <button className=" bg-gray-200 py-2 px-4  text-black text-xs font-bold hover:bg-gray-300 rounded-s-full" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
          
          {Array.from(Array(totalPages).keys()).map((pageIndex) => (
            <button key={pageIndex} className={` bg-null py-2 px-4 bg-gray-200  text-black text-sm font-bold ${pageIndex === currentPage ? 'bg-gray-300' : ''}`} onClick={() => handlePageClick(pageIndex)}>
              {pageIndex + 1}
            </button>
          ))}
          <button className="bg-gray-200 py-2 px-4  text-black text-xs font-bold hover:bg-gray-300 rounded-e-full" onClick={handleNextPage} disabled={currentPage === totalPages - 4}>Next</button>
        </div>
      )}

    </div>
  );
}

export default VehicleSearch;
