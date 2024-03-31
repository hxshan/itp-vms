import React from 'react'
import { Link } from 'react-router-dom';

export const MaintainOrderTable = ({maintains}) => {
    console.log('table')
  return (
    <div className="w-full flex items-center">  
    <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-700 rounded-md'>No</th>
                    <th className='border border-slate-700 rounded-md'>Vehicle Type</th>
                    <th className='border border-slate-700 rounded-md'>Number Plate</th>
                    <th className='border border-slate-700 rounded-md'>Estimeted Cost</th>
                    <th className='border border-slate-700 rounded-md'>Options</th>
                </tr>
            </thead>
            <tbody>
                {maintains && maintains.length > 0 ?
                    (maintains.map((vehicleMaintananceModel ,index) => (
                        
                        <tr key={vehicleMaintananceModel._id} className='h-8 '>
                            <td className='border border-slate-700 rounded-md text-center'>
                            {index+1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {vehicleMaintananceModel.vrtype}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {vehicleMaintananceModel.vrid}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {vehicleMaintananceModel.vrcost}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className="flex justify-center gap-x-4">
                                <Link to="">
                                  <button className='border bg-blue-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>View </button>
                              </Link>
                              <Link to={`/vehiclemaintain/edit/${vehicleMaintananceModel._id}`}>
                                  <button className='border bg-green-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Edit </button>
                              </Link>
                              <Link to="/Vrform">
                                  <button className='border bg-red-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Delete </button>
                              </Link>
                                </div>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="4" className='text-center'>
                                No Maintanice Recordes available 
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
        </div>
  )
}
