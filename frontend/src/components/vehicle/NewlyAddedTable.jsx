import React from 'react'
import { ReactToPrint } from 'react-to-print';

const NewlyAddedTable = ({ category, categoryData }) => {

  const componentRef = React.createRef();

  if (categoryData.length === 0) {
    return <p className='mt-6 p-3 font-medium text-sm text-white bg-red-500 rounded-md pad mb-10'>Vehicles not found. </p>;
  }

  return (
  <div className='flex flex-col p-0 mb-10'> 
    <div className='mt-4' key={category}>
    <div ref={componentRef}>
      <div className='p-4'>
      <h2 className='mb-2 text-xl font-bold text-black'>New added vehicles</h2>
      <table className='w-full border-collapse border-spacing-2 border-black rounded-md pad shadow-xl p-5 mb-3'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='border border-white p-2'>Vehicle Type</th>
            <th className='border border-white p-2'>Vehicle Model</th>
            <th className='border border-white p-2'>Vehicle Register</th>
            <th className='border border-white p-2'>Add Date</th>
            <th className='border border-white p-2'>last Updated Date</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((vehicle) => (
            <tr className="bg-white border-t border-gray-200" key={vehicle._id}>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleType}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleModel}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{vehicle.vehicleRegister}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(vehicle.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(vehicle.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-end mt-4'>
        <ReactToPrint
                    trigger={() => (
                        <button
                            className="mx-2 px-3 py-1 rounded-md bg-actionRed text-white text-sm text-bold"
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)} Vehicle Table Report
                        </button>
                    )}
                    content={() => componentRef.current}
                />
         </div>
      </div>
      </div>
    </div>
  </div>
  );
};

export default NewlyAddedTable