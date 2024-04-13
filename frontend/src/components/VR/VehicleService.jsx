import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VehicleService = () => {
  const [data, error, loading, axiosFetch] = useAxios()

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { vehicles = [] } = data;

  const handleAddnoteClick = (id) => {
    navigate(`/addnote/${id}`);
  };


  const getData = ()=>{
    axiosFetch({
      axiosInstance:axios,
      method:'GET',
      url:'/vehicle/'
    })
  }

    

  useEffect(() => {
    getData();
  }, []);

  if(loading){
    return(
      <p className="flex flex-col items-center justify-center h-screen text-center text-lg font-bold text-black" >Loading...</p>
    )
  }
  if(error){
    return(
      <p>Unexpected Error has occured!</p>
    )
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchTerm = search.toLowerCase().trim();
    if (searchTerm === "") {
      return true; 
    } else {
      
      if (vehicle.vehicleRegister && vehicle.vehicleRegister.toLowerCase() === searchTerm) {
        return true;
      }
   
      return (
        (vehicle.vehicleType && vehicle.vehicleType.toLowerCase().includes(searchTerm)) ||
        (vehicle.vehicleModel && vehicle.vehicleModel.toLowerCase().includes(searchTerm)) ||
        (vehicle.vehicleRegister && vehicle.vehicleRegister.toLowerCase().includes(searchTerm)) ||
        (vehicle.category && vehicle.category.toLowerCase().includes(searchTerm))
      );
    }
  });



  return (
    <div className='w-full place-content-center space-y-4 mt-8 bg-cover bg-center bg-white mb-10 rounded-xl'>
      
        <div className="border-b-4 border-black w-full"></div>
        <div className='text-2xl font-bold text-black mt-4 text-center'>Reminders for Services</div>

        <ToastContainer />
        
        <div className='flex justify-end'>
        <input
          type="text"
          name="Search"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 "
        />
        </div>
     
      <table className='w-full border-collapse border-spacing-2 border-black rounded-md pad shadow-xl p-5'>
        <thead className='bg-gray-800 text-white'>
          <tr>
          <th className='border border-white p-2'>Vehicle Catagory</th>
            <th className='border border-white p-2'>Vehicle Model</th>
            <th className='border border-white p-2'>Vehicle Number</th>
            <th className='border border-white p-2'>Vehicle Last-Milage</th>
            <th className='border border-white p-2'>Actions</th>
            
          </tr>
        </thead>
        <tbody>
        {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
              <tr className="bg-white border-t border-gray-200" key={vehicle._id}>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center">{vehicle.category}</td>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center">{vehicle.vehicleModel}</td>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center">{vehicle.vehicleRegister}</td>
                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center">{vehicle.lastMileage}km</td>
                <td className="px-2 py-2 whitespace-nowrap border-r border-gray-200 flex justify-center">
                        <button className="my-1 mx-1 bg-blue-700 text-white py-1 px-4 rounded-md text-sm font-semibold"
                        id={vehicle._id}
                        onClick={() => handleAddnoteClick(vehicle._id)}>
                          Add Note
                        </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 whitespace-nowrap">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
     
  </div>

  );
}

export default VehicleService