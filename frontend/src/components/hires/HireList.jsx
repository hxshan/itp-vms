import { useEffect, useState } from "react";
import ViewHire from "./ViewHire";
import axios from "@/api/axios";

import PropTypes from 'prop-types';

const HireList = ({ hireData, searchTerm, searchType, axiosFetch }) => {
    const [viewHire, setViewHire] = useState(false);
    const [viewHireData, setViewHireData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); 

    const handleView = (hId) => {
        const selected = hireData.find((hire) => hire._id === hId);
        setViewHireData(selected);
        setViewHire(true);
    };

    const deleteHire = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`/hire/${id}`);
                console.log('Hire deleted successfully');
            } catch (error) {
                console.error('Error deleting hire: ' + error);
            }
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, searchType]);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = hireData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="w-full h-full bg-white">
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
                        {currentItems.map((hire) => (
                            <tr key={hire._id} className="border-b-2 border-black">
                                <td className="px-4 py-2">{hire.vehicle}</td>
                                <td className="px-4 py-2">{new Date(hire.startDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(hire.endDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{hire.cusMobile}</td>
                                <td className="px-4 py-2">{hire.hireStatus}</td>
                                <td className="px-4 py-4 flex justify-between items-baseline">
                                    <button className="px-2 py-1 bg-[#D4D800] text-white rounded-md mr-2" onClick={() => handleView(hire._id)}>View</button>
                                    <button className="hidden xl:grid px-2 py-1 bg-[#A90000] text-white rounded-md" onClick={() => deleteHire(hire._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <ul className="flex list-none border border-gray-300 rounded-md">
                    {Array.from({ length: Math.ceil(hireData.length / itemsPerPage) }).map((_, index) => (
                        <li key={index} className={`cursor-pointer px-4 py-2 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`} onClick={() => paginate(index + 1)}>{index + 1}</li>
                    ))}
                </ul>
            </div>
            {viewHire && <ViewHire setViewHire={setViewHire} viewHireData={viewHireData} />}
        </div>
    );
}

HireList.propTypes = {
    hireData: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    searchType: PropTypes.string.isRequired,
    axiosFetch: PropTypes.func.isRequired,
};

export default HireList;
