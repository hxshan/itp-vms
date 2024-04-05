import { useLocation, useParams, useNavigate  } from 'react-router-dom'
import { useState } from 'react'

import axios from '@/api/axios';
import useAxios from "@/hooks/useAxios";


const EditHire = () => {

    const location = useLocation()
    const viewHireData = location.state.viewHireData

    const navigate = useNavigate();


    const [startDate, setStartDate] = useState(viewHireData.startDate);
    const [endDate, setEndDate] = useState(viewHireData.endDate);
    const [vehicleType, setVehicleType] = useState(viewHireData.vehicleType);
    const [vehicleSubcategory, setVehicleSubcategory] = useState(viewHireData.vehicleSubcategory);
    const [airCondition, setAirCondition] = useState(viewHireData.airCondition);
    const [passengerCount, setPassengerCount] = useState(viewHireData.passengerCount);
    const [vehicle, setVehicle] = useState(viewHireData.vehicle);
    const [driver, setDriver] = useState(viewHireData.driver);
    const [startPoint, setStartPoint] = useState(viewHireData.startPoint);
    const [endPoint, setEndPoint] = useState(viewHireData.endPoint);
    const [tripType, setTripType] = useState(viewHireData.tripType);
    const [distance, setDistance] = useState(viewHireData.distance);
    const [cusName, setCusName] = useState(viewHireData.cusName);
    const [cusEmail, setCusEmail] = useState(viewHireData.cusEmail);
    const [cusMobile, setCusMobile] = useState(viewHireData.cusMobile);
    const [cusNic, setCusNic] = useState(viewHireData.cusNic);
    const [hireStatus, setHireStatus] = useState(viewHireData.hireStatus);

    const [availableVehicles, setAvailableVehicles] = useState(["CHJ-2233", "CGF-5568"])
    const [availableDrivers, setavailableDrivers] = useState(["Chamara" , "Jonny", "Danny", "Chanchala"])

    const [response, error, loading, axiosFetch] = useAxios()

    const handleEdit = async (e) => {
        e.preventDefault();
      
        const editedData = {
          startDate,
          endDate,
          vehicleType,
          vehicleSubcategory,
          airCondition,
          passengerCount,
          vehicle,
          driver,
          startPoint,
          endPoint,
          tripType,
          distance,
          cusName,
          cusEmail,
          cusMobile,
          cusNic,
          hireStatus,
        };
      
        const confirm = window.confirm("Are you sure?");
        if (confirm) {
          console.log('Edited Data:', editedData);
          try {
            //const response = await axios.put(`/hire/edit/${viewHireData._id}`, editedData);
            await axiosFetch({
                axiosInstance:axios,
                method:'PUT',
                url:`/hire/edit/${viewHireData._id}`,
                requestConfig:{
                    response:{
                    ...editedData
                  }
                }
              })
            console.log("Response:", response);
            alert("Successfully updated");
          } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
          }
        }

      };
    
      if(loading){
        return(
          <h1>Loading ...</h1>
        )
      }

      const cancel = () => {
        const confirmCancel = window.confirm("Are you sure you want to cancel?");
        if (confirmCancel) {
            navigate('/hires');
        }
    }
      

  return (
    <div>
        <div>
            <div className="text-center pt-[10px] pb-8 border-b-2 border-[#37A000] ">
                <h1 className="text-2xl font-semibold xl:text-4xl">Edit Hire</h1>
            </div>

            <div className="w-full h-full flex bg-gray-200 px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px]">
                <form className="w-full h-full bg-white px-3 py-5 xl:px-10">
                    <div className="mb-6">
                        <label htmlFor="hireStatus" className="block text-lg font-semibold mb-1">Status</label>
                        <select
                        id="hireStatus"
                        value={hireStatus}
                        onChange={(e) => setHireStatus(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className='flex justify-between align-baseline mb-5 '>
                        <div className=" flex flex-col justify-between align-baseline xl:flex-1 xl:mr-14 xl:flex-row">

                            <label htmlFor="AssignVehicle" 
                            className="block font-medium text-black mr-[10px] text-base">
                                Select Vehicle
                            </label>

                            <select id="vehicle" name="vehicle" 
                            value={vehicle} onChange={(e) => setVehicle(e.target.value)} 
                            className='border-2 rounded border-black px-14'
                            required
                            >
                                <option value="">Select Vehicle</option>
                                {availableVehicles.map((type) => (
                                    <option key={type.id} value={type}>{type}</option>
                                ))}

                            </select>

                        </div>

                        <div className=" flex flex-col justify-between align-baseline xl:flex-1 xl:flex-row">
                            <label htmlFor="assignDriver" 
                            className="block font-medium text-black mr-[10px] text-base">
                                Select Driver
                            </label>

                            <select id="driverList" name="driverList" 
                            value={driver} onChange={(e) => setDriver(e.target.value)} 
                            className='border-2 rounded border-black px-14'
                            required
                            >
                                <option value="">Select Driver</option>
                                {availableDrivers.map((type) => (
                                    <option key={type.id} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className='flex justify-between align-baseline mb-5'>
                        <div className=" flex flex-col justify-between align-baseline mr-2 xl:flex-row xl:flex-1 xl:mr-14">

                            <label htmlFor="startPoint" 
                            className="block font-medium text-black  text-base xl:mr-7">
                            Starting Point
                            </label>

                            <input type="text" id="startPoint" name="startPoint" 
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)} 
                            placeholder='From'
                            className='border-2 rounded border-black px-4'
                            required
                            />

                        </div> 

                        <div className=" flex flex-col justify-between align-baseline xl:flex-row xl:flex-1">

                            <label htmlFor="endPoint" 
                            className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                            End Point
                            </label>

                            <input type="text" id="endPoint" name="endPoint" 
                            value={endPoint}
                            onChange={(e) => setEndPoint(e.target.value)} 
                            placeholder='To'
                            className='border-2 rounded border-black px-4'
                            required
                            />

                        </div>
                        
                    </div>

                    <div  className='flex justify-between align-baseline xl:justify-start'>  
                        <div className="mb-6 flex justify-start align-baseline xl:mr-16">

                            <label htmlFor="tripType" 
                            className="block font-medium text-black text-base mr-8">
                            Round Trip
                            </label>

                            <input type="checkbox" id="roundtrip" name="roundtrip" 
                            checked={tripType} onChange={(e) => setTripType(e.target.checked)} 
                            className=''
                            required
                            />

                            </div>

                            <div className="mb-6 flex justify-between align-baseline xl:justify-start">

                            <label htmlFor="distence" 
                            className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                            Distence
                            </label>

                            <input type="number" id="distence" name="distence" 
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)} 
                            placeholder='Estimate Distence'
                            className='border-2 rounded border-black px-4'
                            required
                            />

                        </div>
                    </div>

                    <div className='mt-7'> 
                        <div className=''> 
                        <div className="mb-7 flex justify-start align-baseline xl:justify-start">

                            <label htmlFor="cusName" 
                            className="block mr-7 font-medium text-black text-base ">
                            Name
                            </label>

                            <input type="text" id="cusName" name="cusName" 
                            value={cusName}
                            onChange={(e) => setCusName(e.target.value)} 
                            placeholder='Customer Name'
                            className='border-2 rounded border-black w-[100%] px-2 xl:px-4'
                            required
                            />

                        </div>

                        <div className="mb-7 flex jjustify-start align-baseline xl:justify-start">

                            <label htmlFor="cusEmail" 
                            className="block font-medium text-black mr-7 text-base xl:mr-7">
                            Email
                            </label>

                            <input type="email" id="cusEmail" name="cusEmail" 
                            value={cusEmail}
                            onChange={(e) => setCusEmail(e.target.value)} 
                            placeholder='Customer Email'
                            className='border-2 rounded border-black w-[100%] px-2 xl:px-4'
                            required
                            />

                        </div>

                        </div>

                        <div className='flex justify-between'>

                        <div className="mb-5  flex flex-col justify-between align-baseline xl:flex-row xl:flex-1 xl:mr-14">

                            <label htmlFor="cusMobile" 
                            className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                            Mobile
                            </label>

                            <input type="tel" id="cusMobile" name="cusMobile" 
                            value={cusMobile}
                            onChange={(e) => setCusMobile(e.target.value)} 
                            placeholder='Customer Mobile No'
                            className='border-2 px-2 rounded border-black xl:px-4'
                            required
                            />

                        </div>

                        <div className="mb-5  flex flex-col justify-between align-baseline xl:flex-row xl:flex-1">

                            <label htmlFor="cusNic" 
                            className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                            Nic
                            </label>

                            <input type="text" id="cusNic" name="cusNic" 
                            value={cusNic}
                            onChange={(e) => setCusNic(e.target.value)} 
                            placeholder='Customer NIC'
                            className='border-2 px-2 rounded border-black xl:px-4
                            required
                            '
                            />

                        </div> 
                        
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="px-7 py-2 bg-[#0E6300] text-white rounded-md mr-4"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={cancel}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4"
                        >
                            Cancel
                        </button>
                    </div>


                </form>
            </div>

            

        </div>
        
    </div>
  )
}

export default EditHire
