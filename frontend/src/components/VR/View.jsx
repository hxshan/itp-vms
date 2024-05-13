import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { ReactToPrint } from 'react-to-print';

export const View = () => {
    const [order, setOrder] = useState({});
    const [maintenanceData, setMaintenanceData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehiclemaintain/all/${id}`)
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        if (Array.isArray(order) && order.length > 0) {
            const maintenanceCounts = {};
            const today = new Date();
            order.forEach(item => {
                const month = new Date(item.vrsdate).getMonth(); // Get the month (0-indexed)
                if (new Date(item.vrsdate) < today) {
                    maintenanceCounts[month] = (maintenanceCounts[month] || 0) + 1; // Past maintenance
                } else {
                    maintenanceCounts[month] = (maintenanceCounts[month] || 0) - 1; // Ongoing or future maintenance
                }
            });
            setMaintenanceData(maintenanceCounts);
        }
    }, [order]);

    const componentRef = React.createRef();

    return (
    <div className="">
        <div className="flex justify-end items-center">
            <div className=""> <Link to={`/Mdashboard`}>
                <button className="my-1 mx-1 bg-actionBlue text-white rounded-lg px-4 py-2">Back</button>
            </Link></div>
       
        <ReactToPrint
                trigger={() => (
                    <button
                        className="bg-actionRed text-white rounded-lg px-4 py-2"
                    >
                        Generate a Report
                    </button>
                )}
                content={() => componentRef.current}
            />  
            
        </div>
        <div ref={componentRef}>
        <div className='w-full  rounded-md   p-5 mb-10 mt-5'>
                        {order && order.length > 0 && (
                            
                                <h1  className='bg-slate-300 text-center p-2 shadow-xl font-bold rounded-t-xl text-xl w-full'>{order[0].vrvehicleRegister}</h1>
                            
                        )}
                    </div>
        <div className="flex flex-col justify-center items-center mt-5 ">
                <div className="w-full h-full">
                    {Object.keys(maintenanceData).length > 0 && (
                        <div style={{ width: '80%', margin: 'auto' }}>
                            <Bar
                                data={{
                                    labels: Object.keys(maintenanceData).map(month => new Date(0, month).toLocaleString('default', { month: 'long' })),
                                    datasets: [
                                        {
                                            label: 'Maintenance Records',
                                            data: Object.values(maintenanceData).map(value => Math.abs(value)), // Use absolute values for both ongoing and future maintenance
                                            backgroundColor: Object.values(maintenanceData).map(value => value < 0 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)'), // Red for ongoing/future and blue for past
                                            borderColor: Object.values(maintenanceData).map(value => value < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'),
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    scales: {
                                        yAxes: [
                                            {
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            },
                                        ],
                                    },
                                }}
                            />
                        </div>
                    )}
                </div>
                <table className='w-full border-collapse rounded-md pad shadow-xl p-5 mb-10 mt-5'>
                    <thead className='bg-secondary text-white border-white'>
                        <tr>
                            <th className='border p-2'>No</th>
                            <th className='border p-2'>Issue</th>
                            <th className='border p-2'>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(order) && order.length > 0 ? (
                            order.map((item, index) => (
                                <tr key={item._id} className='h-8 '>
                                    <td className='border border-slate-700 rounded-md text-center p-2'>{index + 1}</td>
                                    <td className='border border-slate-700 rounded-md text-center p-2'>{item.vrissue}</td>
                                    <td className='border border-slate-700 rounded-md text-center p-2'>Rs.{item.vrcost}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className='text-center p-3'>
                                    No Maintenance Records available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>


            </div>
           
        </div>
        </div>

    );
};
