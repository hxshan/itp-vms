import { useEffect, useState } from "react";
import ViewHire from "./ViewHire";
import {hire1, hire2, hire3} from "./testdata"
import PropTypes from 'prop-types'

const HireTable = ({vehicleNo , setResults, results}) => {

    HireTable.propTypes = {
        setResults: PropTypes.func.isRequired,
        vehicleNo: PropTypes.string.isRequired,
        results: PropTypes.array.isRequired
      };

    const [hireData, setHireData] = useState([{
        id : 0,
        startDate: new Date(),
        endDate: new Date(),
        vehicleType: "",
        vehicleSubcategory: "",
        passengerCount: 0,
        airCondition: false,
        vehicle: "",
        driver: "",
        startPoint: "",
        endPoint: "",
        tripType: false,
        distence: 0,
        cusName: "",
        cusEmail: "",
        cusMobile: "",
        cusNic: ""
    }])

    useEffect(() => {
        setHireData([hire1, hire2, hire3]);
    }, [])

    const [viewHire, setViewHire] = useState(false)
    const [viewHireData, setViewHireData] = useState(null)

    const handleView = (hId) => {
        const selected = hireData.find((hire) => hire.id === hId);
        setViewHireData(selected)
        setViewHire(!viewHire)
    }

    //Search function

    useEffect(() => {
        const result = hireData.filter((hire) => 
        hire.vehicle.toLowerCase().includes(vehicleNo.toLowerCase()))
        setResults(result)
    }, [hireData, vehicleNo])

  return (
    <div className="w-full h-full flex px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px] ">
           <table className="w-full text-center ">
                    <thead className="border-b-2 border-black">
                        <tr>
                            <th className="px-4 py-2">Hire ID</th>
                            <th className="px-4 py-2">Vehicle No</th>
                            <th className="px-4 py-2">Start Date</th>
                            <th className="px-4 py-2">End Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(vehicleNo ? results : hireData).map((hire) => 
                            <tr key={hire.id} className="border-b-2 border-black">
                                <td className="px-4 py-2">{hire.id}</td>
                                <td className="px-4 py-2">{hire.vehicle}</td>
                                <td className="px-4 py-2">{new Date(hire.startDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(hire.endDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">Active</td>
                                <td className="px-4 py-4 flex justify-between items-baseline">
                                    <button 
                                    className="px-2 py-1 bg-[#D4D800] text-white rounded-md mr-2"
                                    onClick={() => handleView(hire.id)}>
                                        View
                                    </button>
                                    <button className="hidden xl:grid px-2 py-1 bg-[#0E6300] text-white rounded-md mr-2">Edit</button>
                                    <button className="hidden xl:grid px-2 py-1 bg-[#A90000] text-white rounded-md">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>


                {viewHire && <ViewHire setViewHire = {setViewHire} viewHireData = {viewHireData}/>}
                
    </div>
  );
};

export default HireTable;
