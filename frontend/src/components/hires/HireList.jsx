import HireTable from "./HireTable"
import PropTypes from 'prop-types';
import SearchHire from "./SearchHire";
import { useState } from "react";


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

 
                <HireTable  vehicleNo = {vehicleNo} searchType = {searchType} setResults = {setResults} results ={results}/>
            </div>
        </div>
    
  )
}

export default HireList