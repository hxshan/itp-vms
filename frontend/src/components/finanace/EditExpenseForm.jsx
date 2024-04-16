// EditExpenseForm.js
import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from 'jwt-decode';



const EditExpenseForm = ({ expense, onSave, onCancel }) => {
  // State to hold edited expense data
  const [editedExpense, setEditedExpense] = useState({ ...expense });
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehicleData,vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios()
  const { user } = useAuthContext()

  console.log(user)

  const [name,setName]=useState('')
 
  useEffect(() => {
    const decodedToken = jwtDecode(user?.accessToken);
    setName(decodedToken?.UserInfo?.name);
  }, [user]);
  

  useEffect(() => {
    if (expense.date) {
      const dateObject = new Date(expense.date);
      const dateString = dateObject.toISOString().split('T')[0]; // Extract YYYY-MM-DD
      setEditedExpense({ ...editedExpense, date: dateString });
    }
  }, [expense]);


  const getVehicleData =()=>{
    vehicleAxiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/vehicle/`,
   });
 }

 useEffect(() => {
  getVehicleData();
}, []); 

  useEffect(() => {
    if (vehicleData && vehicleData.vehicles) {
      const options = vehicleData.vehicles.map(vehicle => ({
        value: vehicle._id,
        label: `${vehicle.vehicleRegister} - ${vehicle.vehicleType}`,
      }));
      setVehicleOptions(options);
    }
  }, [vehicleData]);


  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense({ ...editedExpense, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...editedExpense, editedBy: name });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
  <div className="bg-white rounded-lg p-8 max-w-md w-full sm:w-3/4 lg:w-1/2 xl:max-w-lg xl:max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={editedExpense.date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
              Vehicle:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vehicle"
              name="vehicle"
              value={editedExpense.vehicle._id} 
              onChange={handleChange}
            >
              
              <option value={editedExpense.vehicle._id}>
                {`${editedExpense.vehicle.vehicleRegister} - ${editedExpense.vehicle.vehicleType}`}
              </option>
             
              {vehicleOptions
                .filter(option => option.value !== editedExpense.vehicle._id)
                .map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="recordedBy" className="block text-sm font-medium text-gray-700">Edited By</label>
            <input
              id="editedBy"
              type="text"
              name="editedBy"
              value={name}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>


          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;
