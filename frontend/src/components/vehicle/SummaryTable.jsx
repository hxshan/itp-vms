import React from 'react'

const SummaryTable = ({ category, filteredData }) => {
  return (
    <div className='mt-4' key={category}>
      <h2 className='text-l font-bold'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <table className='w-full border-collapse border-spacing-2 border-black'>
        <thead className=' bg-slate-500 text-white'>
          <tr>
            <th className='border border-slate-600'>Vehicle Type</th>
            <th className='border border-slate-600'>Vehicle Model</th>
            <th className='border border-slate-600'>Vehicle Register</th>
            <th className='border border-slate-600'>Licence End Date</th>
            <th className='border border-slate-600'>Insurance End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((vehicle) => (
            <tr key={vehicle._id}>
              <td className='border border-slate-700'>{vehicle.vehicleType}</td>
              <td className='border border-slate-700'>{vehicle.vehicleModel}</td>
              <td className='border border-slate-700'>{vehicle.vehicleRegister}</td>
              <td className='border border-slate-700'>{new Date(vehicle.licEndDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
              <td className='border border-slate-700'>{new Date(vehicle.insEndDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SummaryTable
