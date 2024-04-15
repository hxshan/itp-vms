import { useLocation, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'

import axios from '@/api/axios';
import useAxios from "@/hooks/useAxios";

import { ClipLoader } from "react-spinners";
import Swal from 'sweetalert2';


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
    const [startPointNo, setStartPointNo] = useState(viewHireData.startPoint.no)
    const [startPointStreet, setStartPointSteet] = useState(viewHireData.startPoint.street)
    const [startPointCity, setStartPointCity] = useState(viewHireData.startPoint.city)
    const [endPoint, setEndPoint] = useState(viewHireData.endPoint);
    const [startTime, setStartTime] = useState(viewHireData.startTime);
    const [tripType, setTripType] = useState(viewHireData.tripType);
    const [estimatedDistance, setEstimatedDistance] = useState(viewHireData.estimatedDistance);
    const [cusName, setCusName] = useState(viewHireData.cusName);
    const [cusEmail, setCusEmail] = useState(viewHireData.cusEmail);
    const [cusMobile, setCusMobile] = useState(viewHireData.cusMobile);
    const [cusNic, setCusNic] = useState(viewHireData.cusNic);
    const [hireStatus, setHireStatus] = useState(viewHireData.hireStatus);
    const [finalTotal, setfinalTotal] = useState(viewHireData.finalTotal);

    const [availableVehicles, setAvailableVehicles] = useState(["CHJ-2233", "CGF-5568"])
    const [availableDrivers, setavailableDrivers] = useState(["Chamara" , "Jonny", "Danny", "Chanchala"])

    const [response, error, loading, axiosFetch] = useAxios()
    const [incomeData, incomeError, incomeLoading, incomeAxiosFetch] = useAxios()
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
          startPointNo,
          startPointStreet,
          startPointCity,
          endPoint,
          startTime,
          tripType,
          estimatedDistance,
          cusName,
          cusEmail,
          cusMobile,
          cusNic,
          hireStatus,
          finalTotal
        };


       
        
      
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
          });
          
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, edit it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                //const response = await axios.put(`/hire/edit/${viewHireData._id}`, editedData);
                const response = await axiosFetch({
                    axiosInstance: axios,
                    method: 'PUT',
                    url: `/hire/edit/${viewHireData._id}`,
                    requestConfig: {
                      data: {
                        ...editedData
                      }
                    }
                });
          
                if (response) {
                  swalWithBootstrapButtons.fire({
                    title: "Success",
                    text: "Hire Edited successfully!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                  }).then(() => {
                    navigate('/hires');
                  });
                }
          
              } catch (error) {
                console.error("Error:", error);
                swalWithBootstrapButtons.fire({
                  title: "Error",
                  text: error,
                  icon: "error"
                });
              }
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your operation has been cancelled.",
                timer: 1500,
                showConfirmButton: false,
                icon: "error"
              });
            }
          });
            console.log("Response:", response.data);

            if (hireStatus === "Active") {
                // Create income object
                console.log('cameeee Data:');
                const incomeData = {
                  date: new Date(),
                  vehicle: viewHireData.vehicle, // Assuming viewHireData contains vehicle details
                  recordedBy: viewHireData.driver, // Change to the actual recorded user ID
                  source: 'Hire',
                  hirePayment: {
                    customerName: viewHireData.cusName,
                    hirePaymentType: 'Advance', // Assuming it's an advance payment
                    hire: viewHireData._id,
                  },
                  description: 'Income generated from active hire',
                  amount: viewHireData.advancedPayment,
                  paymentMethod: 'Cash', // Example payment method
                  status: 'Pending', // Income status
                  comments: 'Income generated from advance of active hire',
                };
    
                await incomeAxiosFetch({
                    axiosInstance:axios,
                    method:'PATCH',
                    url:`/income`,
                    requestConfig:{
                        data:{
                        ...incomeData
                      }
                    }
                  })
            }
          } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
          }
        }
      };

      const cancel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to cancel?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
        })
        .then((result) => {
            if(result.isConfirmed) {
                navigate('/hires');
            } 
        }) 
    }

    //Fetch Vehicle Data
  const [vehiclesData, vehiclesError, vehiclesLoading, axiosFetchVehicles] = useAxios()
  

  const fetchVehicleDetails = async () => {
    axiosFetchVehicles({
          axiosInstance: axios,
          method: "GET",
          url: "/vehicle/",
      });
  };

  if(vehiclesError){
    return(
      <p>Can not Vehicle Fetch Data</p>
    )
  }

  //Filter Vehicles
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  
  const filterVehicles = () => {
    console.log("Filter Vehicles")

    console.log("Selected Vehicle : " + vehicleType)
    const selectedVehicles = vehiclesData.vehicles ?.filter((vehicle) => vehicle.category.toLowerCase() === vehicleType.toLowerCase());
    console.log(selectedVehicles)

    setFilteredVehicles(selectedVehicles); 
    if(selectedVehicles.length === 0 ){
      console.log("No vehicles Available")
      alert("No vehicles Available")
    }

    if(vehiclesError){
    return(
      <p>Can not Fetch Data</p>
    )
  }


  }

    //Fetch Drivers
    const [DriversData, DriversError, DriversLoading, axiosFetchDrivers] = useAxios()
    //const [availableDrivers, setavailableDrivers] = useState(["Chamara" , "Jonny", "Danny", "Chanchala"])

    const filterDrivers = () => {
        console.log('Filter Drivers')
        axiosFetchDrivers({
        axiosInstance: axios,
        method: "GET",
        url: "/user/drivers",
    });
    }

    if(DriversError) {
        <p>Can not Fetch Driver Data</p>
    }
    

    useEffect(() => {
        fetchVehicleDetails()
        console.log('vehiclesData')
        console.log(vehiclesData)
        filterDrivers()
    }, [])

    useEffect(() => {
        if (vehiclesData && vehiclesData.vehicles) {
            filterVehicles();
        }
    }, [vehiclesData]);

    if(loading || vehiclesLoading || DriversLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
              <div className="sweet-loading">
                <ClipLoader color="#10971D" loading={true}  size={50} />
              </div>
            </div>
          );
          
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
                                {filteredVehicles.map((vehicle) => (
                                <option key={vehicle.id} value={vehicle._id}>{vehicle.vehicleRegister}</option>
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
                                
                                {DriversData.map((driver) => (
                                    <option key={driver.id} value={driver}>{driver.firstName}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className='flex justify-between align-baseline mb-5'>
                    <div>
                        <div className='mb-2'><h2 className='font-medium text-black  text-base'>Start Point : </h2></div>
                        
                        <div>
                            <div className='flex justify-between align-baseline mb-7'>
                                <div className=" flex flex-col justify-between align-baseline mr-2 xl:flex-row xl:flex-1 xl:mr-14">

                                    <label htmlFor="startPointNo" 
                                    className="block font-medium text-black  text-base xl:mr-7">
                                    No
                                    </label>

                                    <input type="text" id="startPointNo" name="startPointNo" 
                                    value={startPointNo}
                                    onChange={(e) => setStartPointNo(e.target.value)} 
                                    placeholder='House Number'
                                    className='border-2 rounded border-black px-4'
                                    required
                                    />

                                </div> 
                            

                                <div className=" flex flex-1 flex-col justify-between align-baseline xl:flex-row xl:flex-1">

                                    <label htmlFor="startPointStreet" 
                                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                                    Street
                                    </label>

                                    <input type="text" id="startPointStreet" name="startPointStreet" 
                                    value={startPointStreet}
                                    onChange={(e) => setStartPointSteet(e.target.value)} 
                                    placeholder='Street'
                                    className='border-2 rounded border-black px-4'
                                    required
                                    />

                                </div>
                            
                            </div>

                            <div className='flex justify-between align-baseline mb-7'>
                                <div className=" flex  flex-col align-baseline xl:flex-row xl:flex-1">

                                    <label htmlFor="startPointCity" 
                                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                                    City
                                    </label>

                                    <input type="text" id="startPointCity" name="startPointCity" 
                                    value={startPointCity}
                                    onChange={(e) => setStartPointCity(e.target.value)} 
                                    placeholder='City'
                                    className='border-2 rounded border-black px-4 ml-10'
                                    required
                                    />

                                </div>
                            </div>
                        </div>

                        

                        <div className='flex justify-between align-baseline'>

                            <div className=" flex flex-col  align-baseline xl:flex-row xl:flex-1">

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

                            <div className=" flex flex-col ml-7  align-baseline xl:flex-row xl:flex-1">

                                <label htmlFor="startTime" 
                                className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                                Start Time
                                </label>

                                <input type="time" id="startTime" name="startTime" 
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)} 
                                className='border-2 rounded border-black px-4'
                                required
                                />

                            </div>

                        </div>

                        

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
                            value={estimatedDistance}
                            onChange={(e) => setEstimatedDistance(e.target.value)} 
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

                        <div>
                            <div className="mb-5  flex flex-col  align-baseline xl:flex-row xl:flex-1">

                                <label htmlFor="finalTotal" 
                                className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                                Final Fare
                                </label>

                                <input type="number"  id="finalTotal" name="finalTotal" 
                                value={finalTotal}
                                onChange={(e) => setfinalTotal(e.target.value)} 
                                placeholder='Rs. '
                                className='border-2 px-2 ml-8 rounded border-black xl:px-4
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
                            className="px-7 py-2 bg-actionGreen text-white rounded-md mr-4"
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
