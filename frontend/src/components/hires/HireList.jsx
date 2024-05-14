import { useEffect, useState } from "react";
import ViewHire from "./ViewHire";
import axios from "@/api/axios";

import PropTypes from 'prop-types';
import { useAuthContext } from "@/hooks/useAuthContext";
import Swal from 'sweetalert2';


const HireList = ({ hireData, searchTerm, searchType, showDropdown, setFilteredData }) => {
    const [viewHire, setViewHire] = useState(false);
    const [viewHireData, setViewHireData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [results, setResults] = useState([]);
    const [itemsPerPage] = useState(5); 
    const { user } = useAuthContext()


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
                await axios.put(`/hire/cancel/${id}`,{},
                {
                    headers:{
                        withCredentials:true,
                        authorization:`Bearer ${user?.accessToken}`
                    }
                }
                );
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
          if (hire.hireStatus.toLowerCase() !== 'cancelled') {
            if (searchType === 'vehicleNumber') {
              return hire.vehicle?.vehicleRegister?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
            } else if (searchType === 'customerMobile') {
              return hire.cusMobile.includes(searchTerm);
            }
            return true;
          }
          return false;
        });
        setResults(result);
      }, [hireData, searchTerm, searchType]);

    //Filter Function
    const [showFilter, setShowFilter] = useState(false);
    const [filterCategory, setFilterCategory] = useState('');

    const filterByStatus = (status) => {
        const filterData = hireData.filter((hire) => hire.hireStatus.toLowerCase() === status.toLowerCase());
        setResults(filterData);
        setShowFilter(false);
        //setFilteredData(filterData)
    };

    const resetFilter = () => {
        setResults(hireData);
        setFilterCategory('')
    };

    const toggleFilter = (category) => {
        setShowFilter(!showFilter); // Toggle the filter dropdown visibility
        setFilterCategory(category); // Reset filter status
    };

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=" mt-5">

            {showDropdown && (
                <div className="flex justify-between flex-wrap w-full h-full p-4 bg-slate-400 mb-5 rounded-md">
                    <div className="flex justify-end ">
                        <div className="relative">
                            <label htmlFor="status" className="mr-2">
                                Status:
                            </label>
                            <select 
                                id="status" 
                                className="px-4  bg-white border rounded-md"
                                onChange={(e) => filterByStatus(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="ongoing">OnGoing</option>
                                <option value="ended">Ended</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button 
                            className="px-2 py-1 bg-actionRed text-white rounded-md"
                            onClick={resetFilter}
                        >
                            Reset
                        </button>
                    </div>


                </div>
                
            )}

            


            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg min-h-[350px]">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Table header */}
                    <thead className="bg-secondary">
                        <tr>
                            <th className="relative px-6 py-3 border-r border-white text-white">Vehicle No</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Start Date</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">End Date</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Cus Mobile</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Status</th>
                            <th className="relative px-6 py-3 border-r border-white text-white">Actions</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {results.length === 0 ? (
                              <td colSpan="6" className="text-center py-4">No data available</td>
                        ) : 
                        currentItems.map((hire) => (
                            <tr key={hire._id} className="bg-white border-t border-gray-200">
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"> {hire.vehicle?.vehicleRegister || 'N/A'}</td>

                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(hire.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(hire.endDate).toLocaleDateString()}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{hire.cusMobile}</td>
                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                                    <div className={` text-center rounded-md ${hire.hireStatus.toLowerCase() === 'active' ? 'text-green-600 bg-green-100' : hire.hireStatus.toLowerCase() === 'pending' ? 'text-yellow-600 bg-yellow-100' : hire.hireStatus.toLowerCase() === 'ongoing' ? 'text-green-600 bg-green-100' : hire.hireStatus.toLowerCase() === 'completed' ? 'text-blue-600 bg-blue-100' : 'text-orange-600 bg-orange-100'}`}>
                                        {hire.hireStatus.toUpperCase()}
                                    </div>
                                    
                                </td>
                                <td className="px-4 py-4 flex justify-between items-baseline">
                                    <button className="py-2 px-6 bg-actionBlue text-white rounded-md mr-2" onClick={() => handleView(hire._id)}>View</button>
                                    <button className="hidden xl:grid py-2 px-6 bg-actionRed text-white rounded-md" onClick={() => deleteHire(hire._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                        
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <ul className="flex list-none border border-gray-300 rounded-md">
                    {Array.from({ length: Math.ceil(results.length / itemsPerPage) }).map((_, index) => (
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
    setFilteredData: PropTypes.func.isRequired,
};

export default HireList;
