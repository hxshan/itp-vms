import  { useState } from "react";

const CaseFileForm = () => {
  const [formData, setFormData] = useState({
    caseType: "",
    date: "",
    time: "",
    location: "",
    driverID: "",
    vehicleNo: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the server
    console.log("Form Submitted", formData);
    // Reset form data
   
  };

  const handleReset = () => {
    // Reset form data
    setFormData({
      caseType: "",
      date: "",
      time: "",
      location: "",
      driverID: "",
      vehicleNo: "",
      description: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-semibold mb-4">
        Car Accident or Emergency Details Form
      </h2>
      <div className="w-full max-w-4xl flex">
        <div className="w-1/2 mr-4">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Select the type of the case</label>
                <select
                  name="caseType"
                  value={formData.caseType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="">Select...</option>
                  <option value="accident">Accident</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Time:</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/2 ml-4">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Driver ID:</label>
                <input
                  type="text"
                  name="driverID"
                  value={formData.driverID}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">Vehicle No:</label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md"
                  type="reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-md"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseFileForm;
