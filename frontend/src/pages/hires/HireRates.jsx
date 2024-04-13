import { useState, useEffect } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import EditHireRates from "@/components/hires/EditHireRates";
import AddHireRate from '@/components/hires/AddHireRate'

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

    if (loading) {
        return <p>Loading...</p>;
    }


    const handleEdit = (id) => {
        const selected = rates.find((rate) => rate._id === id)
        setEditHireData(selected)
        setEditRates(true);
    };

    const handleAddForm = () => {
        setShowAddForm(true);
    };

    return (
        <div className="w-full h-full flex flex-col px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px] ">
            <div className="text-center pt-[10px] pb-8 border-b-2 border-[#37A000] ">
                <h1 className="text-2xl font-semibold xl:text-4xl">Vehicle Rates</h1>
            </div>

            <div className="flex justify-end my-5">
                <button
                className="px-2 py-1 bg-[#D4D800] text-white rounded-md mr-2"
                onClick={handleAddForm}
                >
                    Add
                </button>

            </div>
            <div>
                <table className="w-full text-center ">
                    <thead className="border-b-2 border-black">
                        <tr>
                            <th className="px-4 py-2">Vehicle Category</th>
                            <th className="px-4 py-2">Base Rate</th>
                            <th className="px-4 py-2">Additional Rate</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map(rate => (
                            <tr key={rate.vehicleCategory} className="border-b-2 border-black">
                                <td className="px-4 py-2">{rate.vehicleCatagory}</td>
                                <td className="px-4 py-2"> {rate.baseRate} </td>
                                <td className="px-4 py-2"> {rate.additionalRate} </td>
                                <td className="px-4 py-4 ">
                                    <button
                                        className="px-2 py-1 bg-[#D4D800] text-white rounded-md mr-2"
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
