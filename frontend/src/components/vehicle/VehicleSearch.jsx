import React from 'react'
import { useState } from 'react';

const VehicleSearch = ({ vehicles , deleteVehicle }) => {
  const [search, setSearch] = useState("");

  if (vehicles.length === 0) {
    return <p className='mt-3 p-3 font-medium text-sm text-white bg-red-500 rounded-md pad'>Vehicles not found. </p>;
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchTerm = search.toLowerCase().trim();
    if (searchTerm === "") {
      return true; // Include all vehicles if search term is empty
    } else {
      // Check if the search term matches the registered number exactly
      if (vehicle.vehicleRegister && vehicle.vehicleRegister.toLowerCase() === searchTerm) {
        return true;
      }
      // Check if the search term matches any other properties
      return (
        (vehicle.vehicleType && vehicle.vehicleType.toLowerCase().includes(searchTerm)) ||
        (vehicle.vehicleModel && vehicle.vehicleModel.toLowerCase().includes(searchTerm)) ||
        (vehicle.vehicleRegister && vehicle.vehicleRegister.toLowerCase().includes(searchTerm)) ||
        (vehicle.category && vehicle.category.toLowerCase().includes(searchTerm))
      );
    }
  });

  return (
    <div className='w-full place-content-center space-y-4 mt-8 bg-cover bg-center bg-white mb-10'>
      
        <div className="border-b-4 border-black w-full"></div>
        <div className='text-2xl font-bold text-black mt-4'>Search Vehicle</div>
        
        <div className='flex justify-end'>
        <input
          type="text"
          name="Search"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 "
        />
        </div>
     
      <table className='w-full border-collapse border-spacing-2 border-black rounded-md pad shadow-xl p-5'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='border border-white p-2'>Vehicle Type</th>
            <th className='border border-white p-2'>Vehicle Model</th>
            <th className='border border-white p-2'>Vehicle Register</th>
            <th className='border border-white p-2'>Actions</th>
            
          </tr>
        </thead>
        <tbody>
        {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
              <tr className="bg-white border-t border-gray-200" key={vehicle._id}>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleType}</td>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleModel}</td>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleRegister}</td>
                <td className="px-2 py-2 whitespace-nowrap border-r border-gray-200 flex justify-center">
                        <button className="my-1 mx-1 bg-blue-700 text-white py-1 px-4 rounded-md text-sm">
                          View
                        </button>

                        <button
                          className="my-1 mx-1 bg-yellow-300 text-white py-1 px-4 rounded-md text-sm"
                          id={vehicle._id}
                          onClick={(e) => {
                            navigate(e.target.id);
                          }}
                        >
                          Edit
                        </button>

                        <button className="my-1 mx-1 bg-green-700 text-white py-1 px-4 rounded-md text-sm">
                          Avalability
                        </button>

                        <button
                          className="my-1 mx-1 bg-red-700 text-white py-1 px-4 rounded-md text-sm"
                          id={vehicle._id}
                          onClick={(e)=>{deleteVehicle(e)}}
                        >
                          Delete
                        </button>
          
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 whitespace-nowrap">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>  
  );
}

export default VehicleSearch