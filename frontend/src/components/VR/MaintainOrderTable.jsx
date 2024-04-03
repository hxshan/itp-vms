import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { data } from './data'

export const MaintainOrderTable = ({ maintains }) => {

    const [serach, setSearch] = useState('');
    const resetState = () => {
        setSearch('');

    };

    console.log(data)
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex gap-7 items-center mb-3">
                <form>
                    <input
                        type='search'
                        placeholder='Search'
                        className='p-2 rounded-lg text-center font-semibold bg-slate-200 outline-none'
                        onChange={(e) => setSearch(e.target.value)} />
                </form>
                <button
                    type="button"
                    className="bg-red-500 text-white rounded-lg px-4 py-2"
                    onClick={resetState} >
                    Reset
                </button>
            </div>

            <table className=' border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-700 rounded-md p-2'>No</th>
                        <th className='border border-slate-700 rounded-md  p-2'>Vehicle Type</th>
                        <th className='border border-slate-700 rounded-md  p-2'>Number Plate</th>
                        <th className='border border-slate-700 rounded-md  p-2'>Time(From - To)</th>
                        <th className='border border-slate-700 rounded-md  p-2'>Estimeted Cost</th>
                        <th className='border border-slate-700 rounded-md p-2'>Options</th>
                    </tr>
                </thead>
                <tbody>

                    {data && data.length > 0 ? (data.filter((item) => {
                        return serach.toLowerCase() === '' ? item : item.vrtype.toLowerCase().includes(serach) || serach.toLowerCase() === '' ? item : item.vrid.toLowerCase().includes(serach)

                    }).map((item, index) => (
                        <tr key={item._id} className='h-8 '>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {item.vrtype}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {item.vrid}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>

                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {item.vrcost}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className="flex justify-center gap-x-4">
                                    <Link to="">
                                        <button className='border bg-blue-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>View </button>
                                    </Link>
                                    <Link to={`/api/vehiclemaintain/${item._id}`}>
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
