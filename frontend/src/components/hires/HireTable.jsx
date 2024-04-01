// HireTable.jsx
import { useEffect, useState } from "react";
import ViewHire from "./ViewHire";
import PropTypes from 'prop-types'
import axios from "@/api/axios";

const HireTable = ({ vehicleNo,searchType, setResults, results }) => {

    HireTable.propTypes = {
        setResults: PropTypes.func.isRequired,
        vehicleNo: PropTypes.string.isRequired,
        searchType: PropTypes.string.isRequired,
        results: PropTypes.array.isRequired
    };

    const [hireData, setHireData] = useState([]);

    useEffect(() => {
        const fetchHires = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/hire');
                setHireData(response.data);
            } catch (error) {
                console.error('Error fetching data in Hire: ' + error);
            }
        };

        fetchHires();
    }, []);

    const [viewHire, setViewHire] = useState(false);
    const [viewHireData, setViewHireData] = useState(null);

    const handleView = (hId) => {
        const selected = hireData.find((hire) => hire._id === hId);
        setViewHireData(selected);
        setViewHire(true);
    };

    // Search function
    useEffect(() => {
        const result = hireData.filter((hire) => {
            if (searchType === 'vehicleNumber') {
                return hire.vehicle.toLowerCase().includes(vehicleNo.toLowerCase());
            } else if (searchType === 'customerMobile') {
                return hire.cusMobile.includes(vehicleNo);
            }
            return false;
        });
        setResults(result);
    }, [hireData, vehicleNo, searchType, setResults]);
    

    // Handle Delete
    const deleteHire = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/hire/${id}`);
            const updatedHireData = hireData.filter((hire) => hire._id !== id);
            setHireData(updatedHireData);
            setResults(updatedHireData); // Update the results with the new data
            console.log('Hire deleted successfully');
        } catch (error) {
            console.error('Error deleting hire: ' + error);
        }
    };

    return (
        <div className="w-full h-full flex px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px] ">
            <table className="w-full text-center ">
                <thead className="border-b-2 border-black">
                    <tr>
                        <th className="px-4 py-2">Vehicle No</th>
                        <th className="px-4 py-2">Start Date</th>
                        <th className="px-4 py-2">End Date</th>
                        <th className="px-4 py-2">Cus Mobile</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(vehicleNo ? results : hireData).map((hire) =>
                        <tr key={hire._id} className="border-b-2 border-black">
                            <td className="px-4 py-2">{hire.vehicle}</td>
                            <td className="px-4 py-2">{new Date(hire.startDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2">{new Date(hire.endDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2">{hire.cusMobile}</td>
                            <td className="px-4 py-2">{hire.hireStatus}</td>
                            <td className="px-4 py-4 flex justify-between items-baseline">
                                <button
                                    className="px-2 py-1 bg-[#D4D800] text-white rounded-md mr-2"
                                    onClick={() => handleView(hire._id)}>
                                    View
                                </button>
                                <button
                                    className="hidden xl:grid px-2 py-1 bg-[#A90000] text-white rounded-md"
                                    onClick={() => deleteHire(hire._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {viewHire && <ViewHire setViewHire={setViewHire} viewHireData={viewHireData} />}

        </div>
    );
};

export default HireTable;
