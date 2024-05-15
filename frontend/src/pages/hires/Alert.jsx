import { useState, useEffect } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from 'react-router-dom';

import { ClockLoader } from "react-spinners";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = () => {

    const navigate = useNavigate();

    const [alert, error, loading, axiosFetch] = useAxios();

    const fetchAlert = async () => {
        axiosFetch({
        axiosInstance: axios,
        method: "GET",
        url: "alert/hire/get",
    });
    };

        useEffect(() => { 
            fetchAlert();
        }, []);


        if (error) {
            return <p>Cannot Fetch Data</p>;
        }

        /*
        const handleEdit = (id) => {
            const selected = rates.find((rate) => rate._id === id)
            setEditHireData(selected)
            setEditRates(true);
        };*/

        const handleEditHire = async (alert) => {
            console.log('alert.hire:', alert.hire); // Add this line to see the value
            const viewHireData = alert.hire
            console.log("viewHireData" , viewHireData)
        
            if (!alert.hire) {
            console.error('Invalid hire ID');
            return;
            }
        
            navigate(`/hires/edit/${viewHireData._id}`, {state: {viewHireData} })

        };

        if (loading) {
            return (
                <div className="flex justify-center items-center h-screen">
                <div className="sweet-loading">
                    <ClockLoader color="#10971D" loading={true}  size={50} />
                </div>
                </div>
            );
        }

        const handleDone = async(alert) => {
            try{
                axiosFetch({
                    axiosInstance: axios,
                    method: "put",
                    url: `alert//hire/update/${alert._id}`,
                })


                window.location.reload()

            }catch (error) {
                console.error("Error updating hire status:", error);
            }
            
        }


        return (
            <div className="w-full h-full flex flex-col px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px] ">
                <div className="pt-[10px] pb-8 border-b-2 border-[#37A000] ">
                    <h1 className="text-xl font-bold xl:text-xl text-center text-red-700">Alert</h1>
                </div>

                <div>
                    <table className="w-full divide-y divide-gray-200 ">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="relative px-6 py-3 border-r border-white text-white">Vehicle No</th>
                                <th className="relative px-6 py-3 border-r border-white text-white">Driver</th>
                                <th className="relative px-6 py-3 border-r border-white text-white">Status</th>
                                <th className="relative px-6 py-3 border-r border-white text-white">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alert.length === 0 ? (
                                <td colSpan="6" className="text-center py-4">No Alrets</td>
                            ) : 
                            alert.map(alert => (
                                <tr key={alert.id} className="bg-white border-t border-gray-200">
                                    <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{alert.vehicle.vehicleRegister}</td>
                                    <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"> {alert.driver.firstName} {alert.driver.lastName} </td>
                                    <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 ">
                                        <div className="text-center rounded-md bg-red-100 text-red-600 p-1">
                                            {alert.hireStatus.toUpperCase()}
                                        </div>  
                                    </td>
                                    <td className="px-4 py-4 flex justify-between">
                                        <button
                                            className="py-2 px-6 bg-actionGreen text-white rounded-md mr-2"
                                            onClick={() => handleEditHire(alert)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="py-2 px-6 bg-actionRed text-white rounded-md mr-2"
                                            onClick={() => handleDone(alert)}
                                        >
                                            Done
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    export default Alert;
