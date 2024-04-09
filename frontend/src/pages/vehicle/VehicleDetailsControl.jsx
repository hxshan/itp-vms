import { useEffect, useState } from "react";
import { useParams, Link  } from 'react-router-dom';
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { ToastContainer, toast } from 'react-toastify';

const VehicleDetailsControl = () => {

const { id } = useParams(); // Get the id parameter from the URL
const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({
    category : '',
    vehicleType: '',
    vehicleModel: '',
    vehicleRegister: '',
    // Add more fields as needed
});

useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/vehicle/${id}`);
        setData(response.data);
        setFormData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching vehicle data:', error);
        toast.error('Failed to fetch vehicle data. Please try again later.');
      } finally {
        setLoading(false);
      }
};


fetchData();
}, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Unexpected Error has occurred!</p>;
  }


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to update the following vehicle?")) {
      try {
        await axios.patch(`/vehicle/${id}`, formData);
        toast.success('Vehicle updated successfully!');
        // Refresh the data after updating
        setData(formData);
      } catch (error) {
        console.error('Error updating vehicle:', error);
        toast.error('Failed to update vehicle. Please try again later.');
      }
    }
  };


  return (
    <div>
      {data && (
        <>
          <h2>Vehicle Details</h2>
          <form onSubmit={handleUpdateVehicle}>
          <div>
              <label htmlFor="vehicleType">Vehicle Catgory:</label>
              <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="vehicleType">Vehicle Type:</label>
              <input type="text" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="vehicleModel">Vehicle Model:</label>
              <input type="text" id="vehicleModel" name="vehicleModel" value={formData.vehicleModel} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="vehicleRegister">Vehicle Register:</label>
              <input type="text" id="vehicleRegister" name="vehicleRegister" value={formData.vehicleRegister} onChange={handleInputChange} />
            </div>
            {/* Add more fields as needed */}
            <button type="submit">Update</button>
          </form>
          <Link to={`/edit/${id}`}>
            <button>Edit</button>
          </Link>
        </>
      )}
    </div>
  )
}

export default VehicleDetailsControl