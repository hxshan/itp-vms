import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';

export const MaintainOrderTable = () => {

    const [data, error, loading, axiosFetch] = useAxios()

    const [maintains, setMaintains] = useState([]);

    const getData = async () => {
        await axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: "/vehiclemaintain/allmaintains/",
        });

    }

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        console.log(data)
        if (data && data.length > 0)
            setMaintains(data)
    }, [data]);

    const [serach, setSearch] = useState('');
    const resetState = () => {
        setSearch('');

    };
    if (loading) {
        return <p>Loading...</p>;
    }

    const deleteData = async (e) => {
        e.preventDefault()
        if (confirm("Are you sure you want to Delete the following")) {
            await axiosFetch({
                axiosInstance: axios,
                method: "DELETE",
                url: `vehiclemaintain/${e.target.id}`,
            });
            window.location.reload('/Mdashboard');
        }
    };
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

                    {maintains && maintains.length > 0 ? (maintains.filter((item) => {
                        return serach.toLowerCase() === '' ? item : item.vrtype.includes(serach) || serach.toLowerCase() === '' ? item : item.vrid.toLowerCase().includes(serach)

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
                                {new Date(item.vrsdate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })} to   {new Date(item.vredate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {item.vrcost}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className="flex justify-center gap-x-4 pr-3 pl-3 p-1">
                                    <Link to={`/view/${item._id}`}>
                                        <button className='border bg-blue-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>View </button>
                                    </Link>
                                    <Link to={`/vehiclemaintain/edit/${item._id}`}>
                                        <button className='border bg-green-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Edit </button>
                                    </Link>

                                    <button className='border bg-red-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2' id={item._id} onClick={(e) => { deleteData(e) }}
                                    >     Delete
                                    </button>

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
