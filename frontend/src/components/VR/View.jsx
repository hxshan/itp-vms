import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';



export const View = () => {

    const [order, setOrder] = useState([]);
    const { id } = useParams();

    // useEffect(() => {

    //     axios
    //       .get(`http://localhost:3000/api/vehiclemaintain/${id}`)
    //       .then((response) => {
    //         setOrder(response.data);

    //       })
    //       .catch((error) => {
    //         console.log(error);

    //       })
    //   }, []);
    return (
        (
            <div className="flex justify-center items-center ">
                <div className="flex flex-col border-2 border-sky-800 rounded-xl w-fit p-4">
                    <div className="my-4">
                        <span className='text-xl mr-4 text-gray-500'>Vehicle Type :</span>
                        <span >{ }</span>
                    </div>
                    <div className="my-4">
                        <span className='text-xl mr-4 text-gray-500'>Vehicle Number :</span>
                        <span>{ }</span>
                    </div>
                    <div className="my-4">
                        <span className='text-xl mr-4 text-gray-500'>Vehicle Issue :</span>
                        <span>{ }</span>
                    </div>
                    <div className="my-4">
                        <span className='text-xl mr-4 text-gray-500'>Estimated Cost : Rs.</span>
                        <span>{ }</span>
                    </div>
                    <div className="my-4">
                        <span className='text-xl mr-4 text-gray-500'>Additional Details : </span>
                        <span>{ }</span>
                    </div>
                </div>
            </div>
        )
    )
}
