import { useState, useEffect } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import EditHireRates from "@/components/hires/EditHireRates";
import AddHireRate from '@/components/hires/AddHireRate'

import { ClockLoader } from "react-spinners";

const HireRates = () => {
    const [rates, error, loading, axiosFetch] = useAxios();
    const [editRates, setEditRates] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editHireData, setEditHireData] = useState()

    const fetchHireRates = async () => {
        axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: "/hire/rates",
        });
    };

    useEffect(() => { 
        fetchHireRates();
    }, []);

    const reload = () => {
        fetchHireRates();
    }

    if (error) {
        return <p>Cannot Fetch Data</p>;
    }

    const handleEdit = (id) => {
        const selected = rates.find((rate) => rate._id === id)
        setEditHireData(selected)
        setEditRates(true);
    };

    const handleAddForm = () => {
        setShowAddForm(true);
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


    return (
        <div className="w-full h-full flex flex-col px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px] ">
            <div className="pt-[10px] pb-8 border-b-2 border-[#37A000] ">
                <h1 className="text-xl font-bold xl:text-xl">Vehicle Rates</h1>
            </div>

            <div className="flex justify-end my-5">
                <button
                className="py-2 px-6 bg-actionBlue text-white rounded-md mr-2"
                onClick={handleAddForm}
                >
                    Add
                </button>

            </div>
            <div>
                <table className="w-full divide-y divide-gray-200 ">
                    <thead className="bg-secondary">
                        <tr>
                            <th className="relative px-6 py-3 border-r border-white text-white">Vehicle Category</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Base Rate</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Additional Rate</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Base Rate(AC)</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Additional Rate(AC)</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.length === 0 ? (
                            <td colSpan="6" className="text-center py-4">No data available</td>
                        ) : 
                        rates.map(rate => (
                            <tr key={rate.vehicleCategory} className="bg-white border-t border-gray-200">
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{rate.vehicleCatagory}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"> {rate.baseRate} </td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"> {rate.additionalRate} </td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"> {rate.acBaseRate} </td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"> {rate.acAdditionalRate} </td>
                                <td className="px-4 py-4 ">
                                    <button
                                        className="py-2 px-6 bg-actionGreen text-white rounded-md mr-2"
                                        onClick={() => handleEdit(rate._id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
            {editRates && <div><EditHireRates setEditRates={setEditRates} editHireData={editHireData} reload={reload}/></div>}
            {showAddForm && <div><AddHireRate reload={reload} setShowAddForm={setShowAddForm}/></div>}
        </div>
    );
};

export default HireRates;
