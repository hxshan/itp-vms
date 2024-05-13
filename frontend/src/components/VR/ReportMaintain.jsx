import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { ClockLoader } from "react-spinners";
import { Pie } from 'react-chartjs-2';

export const ReportMaintain = ({ serviceLimit }) => {
    const [data, error, loading, axiosFetch] = useAxios();
    const [maintains, setMaintains] = useState([]);
    const navigate = useNavigate();
    const handleAddnoteClick = (id) => {
        navigate(`/addnote/${id}`);
    };
    const getData = async () => {
        await axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: "/vehicleService/getservices/",
        });
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (data && data.length > 0)
            setMaintains(data);
    }, [data]);

    return (
        <table className='w-full border-collapse rounded-md pad shadow-xl p-5 mb-10'>
           <thead className='bg-secondary text-white border-white'>
                <tr>
                    <th className='border p-2'>Number Plate</th>
                    <th className='border p-2'>Last Milage</th>
                    <th className='border p-2'>Status</th>
                    <th className='border p-2'>Service Limit</th>
                    <th className='border p-2'>View</th>
                </tr>
            </thead>
            <tbody>
                {maintains && maintains.length > 0 ? (
                    maintains.map((item, index) => {
                        return (
                            <tr key={item._id} className='h-8 '>
                                <td className='border border-slate-700 rounded-md text-center p-2'>{item.vehicleRegister.vehicleRegister}</td>
    
                  <td className='border border-slate-700 rounded-md text-center p-2'>{item.lastmilage}km</td> 
                  <td className='border border-slate-700 rounded-md text-center p-2'>
                                    {item.lastmilage >= item.kilometerLimit ? (
                                        <p className='bg-red-200 text-red-800 font-semibold rounded-md mx-4'>To be serviced</p>
                                    ) : (
                                        <p className='bg-green-200 text-green-800 font-semibold rounded-md mx-4'>Done</p>
                                    )}
                                </td>
                  <td className='border border-slate-700 rounded-md text-center p-2'>{item.kilometerLimit}Km</td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className="flex justify-center gap-x-4 pr-3 pl-3 p-1">
                                    <button
                                     id={item._id}
                                     onClick={() => handleAddnoteClick(item._id)}
                                        className="my-1 mx-1 bg-actionBlue text-white py-1 px-4 rounded-md text-sm"
                                    >
                                    Add Note
                                    </button>
                                            
                                    </div>
                                </td>                       
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="4" className='text-center'>
                            No Maintenance Records available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
