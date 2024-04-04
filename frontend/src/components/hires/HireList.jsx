import PropTypes from 'prop-types';
import SearchHire from "./SearchHire";
import { useEffect, useState } from "react";
import ViewHire from "./ViewHire";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";


const HireList = ({showForm ,setShowForm}) => {

    HireList.propTypes = {
        showForm: PropTypes.bool.isRequired,
        setShowForm: PropTypes.func.isRequired,
        setShowEditForm: PropTypes.func.isRequired
    };


    //Handle Search function

    const [vehicleNo , setVehicleNo] = useState('')
    const [searchType, setSearchType] = useState('')
    const [results, setResults] = useState([])

    const handleSearch = (vehicle, searchT) => {
        setVehicleNo(vehicle)
        setSearchType(searchT)
    }

    const [hireData, error, loading, axiosFetch] = useAxios();

    useEffect(() => {
        const fetchHires = async () => {

            axiosFetch({
                axiosInstance: axios,
                method: "GET",
                url: "/hire",
              });
              
            /*try {
                const response = await axios.get('http://localhost:3000/api/hire');
                setHireData(response.data);
            } catch (error) {
                console.error('Error fetching data in Hire: ' + error);
            }*/
        };

        fetchHires();
    }, []);

    const [viewHire, setViewHire] = useState(false);
    const [viewHireData, setViewHireData] = useState(null);
    const [reload, setReload] = useState(0);

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

    const deleteHire =async(id) => {
        if(confirm("Are you sure you want to Delete the following")){
          await axiosFetch({
            axiosInstance: axios,
            method: "DELETE",
            url: `/hire/${id}`,
          });
          if(!error){
            setReload(reload + 1);
          } 
        }
      };
    
    
      if (loading) {
        return <p>Loading...</p>;
      }

  return (
    <div className="w-full h-full flex bg-gray-200 px-[20px] py-[20px] justify-center items-center">
            <div className="w-full h-full bg-white">
                <div className="text-center pt-[10px] pb-[6px] border-b-2">
                    <h1 className="text-2xl font-semibold">Hire List</h1>
                </div>

                <div className="flex justify-between items-baseline px-5 pt-5 xl:px-14">
                    <SearchHire onSearch={handleSearch}/>

                    <div className="pt-[10px]">
                        <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none" onClick={()=>{setShowForm(!showForm)}}>
                            Add
                        </button>
                    </div>

                </div>

                <div>
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
                </div>

 
                
            </div>
        </div>
    
  )
}

export default HireList