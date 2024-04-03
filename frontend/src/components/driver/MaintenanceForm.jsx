import { useState } from 'react';
//import useAxiosPost from '@/hooks/useAxiosPost';
import useAxiosGet from '@/hooks/useAxiosGet';

const MaintenanceForm = () => {
  //const { status, error, isLoading, postData } = useAxiosPost();

  const {
    data: vehicles,
    error: getError,
    isLoading: isFetching,
    refetch: Refetch,
  } = useAxiosGet("/vehicles/getallvehicles");



  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleRegisterNumber: '',
    description: ''
  });

  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      // Initialize the form data with the first vehicle type
      setFormData({
        ...formData,
        vehicleType: vehicles[0].type
      });
    }
  }, [vehicles]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     postData('/maintenance/addmaintenance', formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Maintenance Request Form</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {isLoading && <p className="mb-4">Loading...</p>}
      {status && <p className="text-green-500 mb-4">Maintenance request submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="vehicleType" className="block mb-2 font-medium">Vehicle Type:</label>
          <select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
            {vehicles && vehicles.map((vehicle) => (
              <option key={vehicle.type} value={vehicle.type}>{vehicle.type}</option>
            ))}
          </select>
        </div>
        {formData.vehicleType && (
          <div className="mb-4">
            <label htmlFor="vehicleRegisterNumber" className="block mb-2 font-medium">Vehicle Register Number:</label>
            <select id="vehicleRegisterNumber" name="vehicleRegisterNumber" value={formData.vehicleRegisterNumber} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              {vehicles && formData.vehicleType && vehicles.find(vehicle => vehicle.type === formData.vehicleType)?.registrationNumbers.map((number) => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-medium">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default MaintenanceForm;
