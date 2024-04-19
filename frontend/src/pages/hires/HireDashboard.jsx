import HireList from "@/components/hires/HireList"
import SearchHire from "@/components/hires/SearchHire";
import Report from "@/components/hires/Report"
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import { ClockLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HireDashboard = () => {
    const navigate = useNavigate();

    // Handle Search function
    const [searchTerm , setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('');

    const handleSearch = (vehicle, searchT) => {
        setSearchTerm(vehicle);
        setSearchType(searchT);
    }

    // Fetch hire data using useAxios hook
    const [hireData, error, loading, axiosFetch] = useAxios();

    useEffect(() => {
        const fetchHires = async () => {
            axiosFetch({
                axiosInstance: axios,
                method: "GET",
                url: "/hire",
            });
        };

        fetchHires();
    }, []);

    //Filter function Dropdown

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Function to generate report

    const [reportData, setReportData] = useState(null);
    const [showReport, setShowReport] = useState(false)

    const generateReport = async () => {
        setShowReport(true)
        try {
            console.log("Sending request to /hire/report...")
            const response = await axios.get("/hire/report")
            console.log("Received response:", response)
            setReportData(response.data);
            console.log(reportData)
            toast.success('Report generated successfully!')
        } catch (error) {
            console.error('Error generating report:', error)
            toast.error('Error generating report. Please try again.')
        }
    };

    

    

    if(error){
        return(
          <p>Can not Fetch Data</p>
        )
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

    return (
        <div className="container py-7">
            <div>
                <div className="pt-[10px] pb-[6px] border-b-2">
                    <h1 className="text-xl font-bold">Hire List</h1>
                </div>

                <div className="flex justify-between items-baseline pt-5">
                    <SearchHire onSearch={handleSearch} />

                    <div className="flex justify-between items-baseline">
                        <div className="mr-8">
                            <button 
                                className="py-2 px-6 text-white bg-actionBlue rounded-md hover:bg-gray-800 focus:outline-none"
                                onClick={toggleDropdown}
                            >
                                Filter
                            </button>
                        </div>

                        <div className="pt-5 mr-8">
                            <button 
                                className="py-2 px-6 text-white bg-actionBlue rounded-md hover:bg-gray-800 focus:outline-none"
                                onClick={generateReport}
                            >
                                Report
                            </button>
                        </div>

                        {showReport && reportData && (
                            <div className="mt-5">
                                <Report reportData={reportData} setShowReport={setShowReport}/>
                            </div>
                        )}


                        <div className="pt-[10px]">
                            <button className="py-2 px-6 text-white bg-actionBlue rounded-md hover:bg-gray-800 focus:outline-none" onClick={()=>{navigate('/hires/add')}}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <HireList hireData={hireData.slice().reverse()} searchTerm={searchTerm} searchType={searchType} axiosFetch={axiosFetch} showDropdown={showDropdown}/>
                </div>
                

            </div>

            <ToastContainer />
            
        </div>
    )
}

export default HireDashboard;
