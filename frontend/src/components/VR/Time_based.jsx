import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { data } from './data'

export const Time_based = () => {

    const currentDate = new Date();
    const [rangeend, setRangeend] = useState(currentDate.toISOString().split('T')[0]);
    const [serach, setSearch] = useState('');
    const [applyFilter, setApplyFilter] = useState(false);
    const rangeStart = new Date(rangeend);
rangeStart.setMonth(rangeStart.getMonth() - 1);
    
    const resetState = () => {
        setRangeend(currentDate.toISOString().split('T')[0]);
        setSearch('');
        setApplyFilter(false); 
    };


    const handleFilterClick = () => {
        setApplyFilter(prevState => !prevState); 
    };
  return (
    <main>
     <div className="flex items-center justify-evenly w-[800px] flex-col mt-2 mb-2 md:flex-row">
              
                <form>
                    <input
                        type='search'
                        placeholder='Search.....'
                        className='p-2 rounded-lg text-center font-semibold bg-slate-100 outline-none'
                        onChange={(e) => setSearch(e.target.value)} />
                </form>



                <div className="flex gap-3 items-center">
                    <label className="font-semibold">EndDate :</label>
                    <input
                        type='date'
                        className='bg-slate-100 w-28 p-1 rounded-lg text-center'
                        value={rangeend}
                        onChange={(e) => setRangeend(e.target.value)}
                    />
                </div>
                
                <button
                    type="button"
                    className="bg-red-500 text-white rounded-lg px-4 py-2"
                    onClick={resetState} >
                    Reset
                </button>

                <button
                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                    onClick={handleFilterClick}
                >
                    {applyFilter ? "Remove Filter" : "Apply Filter"}
                </button>
            </div>

            <table className=' border-separate border-spacing-2 overflow-hidden'>
                <thead>
                    <tr>
                        <th className='border border-slate-700 rounded-md p-2'>No</th>
                        <th className='border border-slate-700 rounded-md  p-2'>Vehicle Type</th>
                        <th className='border border-slate-700 rounded-md  p-2'>Number Plate</th>
                        <th className='border border-slate-700 rounded-md  p-2'>EndDate</th>
                        <th className='border border-slate-700 rounded-md p-2'>Status</th>
                        <th className='border border-slate-700 rounded-md p-2'>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (data.filter((item) => {
                        return serach.toLowerCase() === '' ? item : item.vrtype.toLowerCase().includes(serach) || serach.toLowerCase() === '' ? item : item.vrid.toLowerCase().includes(serach)

                    }).map((item, index) => {
                        // Filter data only if applyFilter is true
                        if (applyFilter && !(item.vredate < rangeend)) {
                            return null; // Return null for records that don't meet the filter criteria
                        }
                        return (
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
                                    {item.vredate}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {item.vredate <= rangeend && item.vredate >= rangeStart ? (<p className='bg-red-100 font-semibold'>Under the Range</p>) : (<p className='bg-blue-100 font-semibold'>Stil Not close to Range</p>)}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className="flex justify-center gap-x-4">
                                        <Link to="">
                                            <button className='border bg-blue-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Mark AS Completed </button>
                                        </Link>
                                        <Link to={``}>
                                            <button className='border bg-green-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Edit </button>
                                        </Link>

                                    </div>
                                </td>
                            </tr>
                        );
                    })
                    ) : (
                        <tr>
                            <td colSpan="4" className='text-center'>
                                No Service Records available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </main>
        
  )
}
