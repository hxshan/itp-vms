import React from 'react'

const NewlyAddedTable = ({ category, categoryData }) => {

  if (categoryData.length === 0) {
    return <p className='mt-3 p-3 font-medium text-sm text-white bg-red-500 rounded-md pad'>Vehicles not found. </p>;
  }

  return (
  <div className='p-4 bg-slate-200 rounded-md pad'> 
    <div className='mt-4' key={category}>
      <h2 className='text-l font-bold mb-3'>New added vehicles</h2>
      <table className='w-full border-collapse border-spacing-2 border-black'>
        <thead className='bg-slate-500 text-white'>
          <tr>
            <th className='border border-slate-600'>Vehicle Type</th>
            <th className='border border-slate-600'>Vehicle Model</th>
            <th className='border border-slate-600'>Vehicle Register</th>
            <th className='border border-slate-600'>Licence End Date</th>
            <th className='border border-slate-600'>Insurance End Date</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((vehicle) => (
            <tr key={vehicle._id}>
              <td className='border border-slate-700'>{vehicle.vehicleType}</td>
              <td className='border border-slate-700'>{vehicle.vehicleModel}</td>
              <td className='border border-slate-700'>{vehicle.vehicleRegister}</td>
              <td className='border border-slate-700'>{new Date(vehicle.licEndDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</td>
              <td className='border border-slate-700'>{new Date(vehicle.insEndDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default NewlyAddedTable