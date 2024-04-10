import HireList from "@/components/hires/HireList"
import SearchHire from "@/components/hires/SearchHire";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

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

    

    if(error){
        return(
          <p>Can not Fetch Data</p>
        )
      }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container py-7 px-7 ">
            <div>
                <div className="text-center pt-[10px] pb-[6px] border-b-2">
                    <h1 className="text-2xl font-semibold">Hire List</h1>
                </div>

                <div className="flex justify-between items-baseline px-5 pt-5 xl:px-14">
                    <SearchHire onSearch={handleSearch} />

                    <div className="pt-[10px]">
                        <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none" onClick={()=>{navigate('/hires/add')}}>
                            Add
                        </button>
                    </div>

                </div>

                <div>
                    <HireList hireData={hireData.slice().reverse()} searchTerm={searchTerm} searchType={searchType} axiosFetch={axiosFetch}/>
                </div>
                

            </div>
            
        </div>
    )
}

export default HireDashboard;
