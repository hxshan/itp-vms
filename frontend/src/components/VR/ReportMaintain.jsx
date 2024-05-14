import React, { useState, useEffect } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from 'react-router-dom';
import { ClockLoader } from "react-spinners";

export const ReportMaintain = ({ vehicleId }) => {
    const navigate = useNavigate();
    const [alerts, error, loading, axiosFetch] = useAxios();
    const [completed, setCompleted] = useState(false);

    const fetchAlerts = async () => {
        try {
            await axiosFetch({
                axiosInstance: axios,
                method: "GET",
                url: "alert/hire/get",
            });

            const completionStatus = localStorage.getItem(`completed_${id}`);
                if (completionStatus === 'true') {
                    setCompleted(true);
                }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    if (error) {
        return <p>Cannot Fetch Data</p>;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="sweet-loading">
                    <ClockLoader color="#10971D" loading={true}  size={50} />
                </div>
            </div>
        );
    }

    const handleEdit = (alert) => {
        navigate('/Vrform', { state: { vehicleId: alert.vehicle.vehicleRegister } });
        setCompleted(true);
        localStorage.setItem(`completed_${vehicleId}`, 'true');
    };
    

    return (
        <div className="w-full h-full flex flex-col px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px] dark:text-white">
            <div className="pt-[10px] pb-8 border-b-2 border-[#37A000] ">
                <h1 className="text-xl font-bold xl:text-xl text-center text-black dark:text-white">Requests from Emergency</h1>
            </div>
            <div className="border-b-4 border-black w-full mb-8 dark:border-white"></div>
            <div>
                <table className="w-full divide-y divide-gray-200 ">
                    <thead className="bg-secondary">
                        <tr>
                            <th className=" px-1 py-1 dark:bg-slate-500 border-white text-white text-center">Vehicle No</th>
                            <th className=" px-1 py-1 dark:bg-slate-500 border-gray-200 text-center text-white">Driver</th>
                            <th className=" px-1 py-1 dark:bg-slate-500 border-gray-200 text-center text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length === 0 ? (
                            <td colSpan="6" className="text-center py-4">No data available</td>
                        ) : 
                        alerts.map(alert => (
                            <tr key={alert.id} className="bg-white t text-center dark:bg-slate-500 border-gray-200">
                                <td className="px-1 py-1 text-center border-gray-200">{alert.vehicle.vehicleRegister}</td>
                                <td className="px-1 py-1 text-center border-gray-200"> {alert.driver.firstName} {alert.driver.lastName} </td>
                                {!completed && (
                                <td className="px-4 py-4 flex justify-center ">
                                    <button onClick={() => handleEdit(alert)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-md font-bold">
                                        Edit
                                    </button>
                                </td>
                                 )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


