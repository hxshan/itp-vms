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
    <div className='p-4 bg-slate-200 rounded-md pad'>
      <div>
        <input
          type="text"
          name="Search"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>  
      <table className='w-full border-collapse border-spacing-2 border-black'>
        <thead className='bg-slate-500 text-white'>
          <tr>
            <th className='border border-slate-600'>Vehicle Type</th>
            <th className='border border-slate-600'>Vehicle Model</th>
            <th className='border border-slate-600'>Vehicle Register</th>
            <th className='border border-slate-600'>Actions</th>
            
          </tr>
        </thead>
        <tbody>
        {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
              <tr className="bg-white border-t border-gray-200" key={vehicle._id}>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleType}</td>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleModel}</td>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleRegister}</td>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"><button
                          className="bg-yellow-300 text-white py-1 px-6 rounded-md"
                          id={vehicle._id}
                          onClick={(e) => {
                            navigate(e.target.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-700 text-white py-1 px-6 rounded-md"
                          id={vehicle._id}
                          onClick={(e)=>{deleteVehicle(e)}}
                        >
                          Delete
                        </button></td>
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