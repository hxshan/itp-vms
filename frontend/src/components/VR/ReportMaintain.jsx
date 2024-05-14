import { useState, useEffect } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from 'react-router-dom';
import { ClockLoader } from "react-spinners";

export const ReportMaintain = () => {
    const navigate = useNavigate();
    const [alerts, error, loading, axiosFetch] = useAxios();

    const fetchAlerts = async () => {
        try {
            await axiosFetch({
                axiosInstance: axios,
                method: "GET",
                url: "alert/hire/get",
            });
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
      navigate(`/edit-maintenance/${alert._id}`, { state: { vehicleNumber: alert.vehicle.vehicleRegister } });
  };
  

    return (
        <div className="w-full h-full flex flex-col px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px] ">
            <div className="pt-[10px] pb-8 border-b-2 border-[#37A000] ">
                <h1 className="text-xl font-bold xl:text-xl text-center text-red-700">Requests from Emergency</h1>
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
                        {alerts.length === 0 ? (
                            <td colSpan="6" className="text-center py-4">No data available</td>
                        ) : 
                        alerts.map(alert => (
                            <tr key={alert.id} className="bg-white border-t border-gray-200">
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{alert.vehicle.vehicleRegister}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"> {alert.driver.firstName} {alert.driver.lastName} </td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 ">
                                    <div className="text-center rounded-md bg-red-100 text-red-600 p-1">
                                        {alert.hireStatus.toUpperCase()}
                                    </div>  
                                </td>
                                <td className="px-4 py-4 ">
                                    <button onClick={() => handleEdit(alert)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                        Edit
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
