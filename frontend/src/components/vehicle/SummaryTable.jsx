import React from 'react'

const SummaryTable = ({ category, filteredData }) => {


  
  if (filteredData.length === 0) {
    return <p className=' mb-10 p-3 font-medium text-sm text-white bg-red-500 rounded-md pad'>{category.charAt(0).toUpperCase() + category.slice(1)} not found. </p>;
  }

  return (
  
  <div className='flex flex-col p-0 mb-10 mt-3'>  
   <div className="border-b-4 border-black w-full mb-4"></div>
    
    <div className='mt-4 p-2' key={category}>
      <h2 className='mb-2 text-xl font-bold text-black'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <table className='w-full border-collapse border-spacing-2 border-black rounded-md pad shadow-xl p-5 mb-3'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='border border-white p-2'>Vehicle Type</th>
            <th className='border border-white p-2'>Vehicle Model</th>
            <th className='border border-white p-2'>Vehicle Register</th>
            <th className='border border-white p-2'>Vehicle Fuel Type</th>
            <th className='border border-white p-2'>Add Date</th>
            <th className='border border-white p-2'>last Updated Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((vehicle) => (
            <tr className="bg-white border-t border-gray-200" key={vehicle._id}>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleType}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleModel}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleRegister}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.fuelType}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(vehicle.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(vehicle.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default SummaryTable
