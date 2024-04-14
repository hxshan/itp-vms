import { useEffect, useState } from "react";
import ViewHire from "./ViewHire";
import axios from "@/api/axios";

import PropTypes from 'prop-types';

import Swal from 'sweetalert2';


const HireList = ({ hireData, searchTerm, searchType }) => {
    const [viewHire, setViewHire] = useState(false);
    const [viewHireData, setViewHireData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [results, setResults] = useState([]);
    const [itemsPerPage] = useState(5); 

    const handleView = (hId) => {
        const selected = hireData.find((hire) => hire._id === hId);
        setViewHireData(selected);
        setViewHire(true);
    };

    const deleteHire = async (id) => {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
        });
         /*
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
    };*/
        if (result.isConfirmed) {
            try {
                await axios.delete(`/hire/${id}`);
                window.location.reload()
                console.log('Hire deleted successfully');
            } catch (error) {
                console.error('Error deleting hire: ' + error);
            }
        }
    };

    // Search function
    useEffect(() => {
        const result = hireData.filter((hire) => {
            if (searchType === 'vehicleNumber') {
                return hire.vehicle?.vehicleRegister?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
                //return hire.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchType === 'customerMobile') {
                return hire.cusMobile.includes(searchTerm);
            }
            return hireData;
        });
        setResults(result);
    }, [hireData, searchTerm, searchType]);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="w-full h-full bg-white">
            <div className="w-full h-full flex px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px] ">
                <table className="w-full text-center ">
                    {/* Table header */}
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
                    {/* Table body */}
                    <tbody>
                        {currentItems.map((hire) => (
                            <tr key={hire._id} className="border-b-2 border-black">
                                <td className="px-4 py-2"> {hire.vehicle?.vehicleRegister || 'N/A'}</td>

                                <td className="px-4 py-2">{new Date(hire.startDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(hire.endDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{hire.cusMobile}</td>
                                <td className="px-4 py-2">{hire.hireStatus}</td>
                                <td className="px-4 py-4 flex justify-between items-baseline">
                                    <button className="px-2 py-1 bg-actionBlue text-white rounded-md mr-2" onClick={() => handleView(hire._id)}>View</button>
                                    <button className="hidden xl:grid px-2 py-1 bg-actionRed text-white rounded-md" onClick={() => deleteHire(hire._id)}>Delete</button>
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
            
            {/* View Hire modal */}
            {viewHire && <ViewHire setViewHire={setViewHire} viewHireData={viewHireData} />}
        </div>
    );
}

HireList.propTypes = {
    hireData: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    searchType: PropTypes.string.isRequired,
};

export default HireList;
