import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const View = () => {
    const [order, setOrder] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehiclemaintain/${id}`)
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <div className="flex justify-center items-center ">
            <div className="flex flex-col border-2 md:w-[350px] shadow-2xl rounded-xl lg:w-[400px] w-full h-full p-5 items-center">
                <div className="my-4 text-center">
                    <span className='text-xl mr-4 text-gray-900 font-semibold'>Vehicle Type :</span>
                    <span className='text-lg mr-4 text-gray-900 font-semibold'>{order.vrtype}</span>
                </div>
                <div className="my-4 text-center">
                    <span className='text-xl mr-4 text-gray-900 font-semibold'>Vehicle Number :</span>
                    <span className='text-lg mr-4 text-gray-900 font-semibold'>{order.vrid}</span>
                </div>
                <div className="my-4 text-center">
                    <span className='text-xl mr-4 text-gray-900 font-semibold'>Vehicle Issue :</span>
                    <span className='text-lg mr-4 text-gray-900 font-semibold'>{order.vrissue}</span>
                </div>
                <div className="my-4 text-center">
                    <span className='text-xl mr-4 text-gray-900 font-semibold'>Estimated Cost :</span>
                    <span className='text-lg mr-4 text-gray-900 font-semibold'> Rs. {order.vrcost}</span>
                </div>
                <div className="my-4 text-center">
                    <span className='text-xl mr-4 text-gray-900 font-semibold'>Additional Details : </span>
                    <span className='text-lg mr-4 text-gray-900 font-semibold'>{order.vraddit}</span>
                </div>
                <div className="my-4 text-center">
                    <span className='text-xl mr-4 text-gray-900 font-semibold'>Start Date : </span>
                    <span className='text-lg mr-4 text-gray-900 font-semibold'>{new Date(order.vrsdate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}</span>
                </div>
                <div className="my-4 text-center">
                    <span className='text-xl mr-4 text-gray-900 font-semibold'>End Date : </span>
                    <span className='text-lg mr-4 text-gray-900 font-semibold'>{new Date(order.vredate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}</span>
                </div>

                <Link to={`/Mdashboard`}>
                    <button className='border bg-green-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2 mt-4 mb-4'>Cancel </button>
                </Link>
            </div>
        </div>
    );
};
