import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useState, useEffect } from "react";

const MaintenanceForm = () => {
  const [vehicleData, vehicleError, vehicleLoading, vehicleAxiosFetch, vehicleUpdatedAxiosFetch] = useAxios();
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleRegisterNumber: "",
    description: "",
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const getVehicleData = () => {
    vehicleAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/vehicle/`,
    });
  };

  useEffect(() => {
    getVehicleData();
  }, []);

  useEffect(() => {
    if (vehicleData && vehicleData.vehicles) {
      const options = vehicleData.vehicles.map((vehicle) => ({
        value: vehicle._id,
        label: vehicle.category,
      }));
      setVehicleOptions(options);
    }
  }, [vehicleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === "vehicleType") {
      const selectedVehicle = vehicleData.vehicles.find((vehicle) => vehicle.category === value);
      if (selectedVehicle) {
        setFormData({ 
          ...formData, 
          vehicleRegisterNumber: "", // Reset vehicle register number when changing vehicle type
          [name]: value, 
        });
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await vehicleUpdatedAxiosFetch({
        axiosInstance: axios,
        method: "POST",
        url: "/maintenance/createmainform",
        data: {
          ...formData,
          vrissue: formData.description // Include description in the formData
        },
      });
      setStatus("Maintenance request submitted successfully!");
      setFormData({ vehicleType: "", vehicleRegisterNumber: "", description: "" });
    } catch (error) {
      setError("Failed to submit maintenance request. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Maintenance Request Form</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {status && <p className="text-green-500 mb-4">{status}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="vehicleType" className="block mb-2 font-medium">
            Vehicle Category:
          </label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          >
            <option value="">Select Vehicle Category</option>
            {vehicleOptions.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {formData.vehicleType && (
          <div className="mb-4">
            <label htmlFor="vehicleRegisterNumber" className="block mb-2 font-medium">
              Vehicle Register Number:
            </label>
            <select
              id="vehicleRegisterNumber"
              name="vehicleRegisterNumber"
              value={formData.vehicleRegisterNumber}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Select Vehicle Register Number</option>
              {vehicleData.vehicles
                .filter((vehicle) => vehicle.category === formData.vehicleType)
                .map((vehicle) => (
                  <option key={vehicle._id} value={vehicle.vehicleRegister}>
                    {vehicle.vehicleRegister}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-medium">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MaintenanceForm;
