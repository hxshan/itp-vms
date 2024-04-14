import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useState, useEffect } from "react";


const IncomeTable = () => {
  const [income, setIncome] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterSource, setFilterSource] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [reload, setReload] = useState(0);

   const [selectedExpense, setSelectedExpense] = useState(null);
   const [EditselectedExpense, setEditSelectedExpense] = useState(null);

  const [incomesData, incomesError, incomesLoading, incomesAxiosFetch] = useAxios();
  const [deleteResponse, deleteError, deleteLoading, deleteAxiosFetch] = useAxios();
    const [updateResponse, updateError, updateLoading, updateAxiosFetch] = useAxios();
  

  useEffect(() => {
    incomesAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/income/",
    });
  }, [reload]);

  useEffect(() => {
    console.log("Expenses data updated:", incomesData);
    if (incomesData && incomesData.length > 0) {
      const filteredIncomes = incomesData.filter((income) => {
        return (
          (filterDate === "" || new Date(income.date).toLocaleDateString() === filterDate) &&
          (filterSource === "All" || income.source === filterSource) &&
          (filterStatus === "All" || income.status === filterStatus)
        );
      });
      setIncome(filteredIncomes);
    }
  }, [incomesData, filterDate, filterSource, filterStatus]);

  useEffect(() => {
    if (updateResponse) {
      // If editing was successful, increment reload to trigger a reload
      setReload(prevReload => prevReload + 1);
    }
  }, [updateResponse]);


 

  



  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center space-x-4">
    
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
           <option value="All">All Sources</option>
          <option value="Hire Income">Hire Income</option>
          <option value="Rental Income">Rental Income</option>
         
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Received">Received</option>
          <option value="Confirmed">Confirmed</option>
          
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Vehicle</th>
            <th className="px-4 py-2">Source</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {income.map((income, index) => (
            <tr key={index} className="border-t border-gray-300">
              <td className="px-4 py-2">{new Date(income.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
              <td className="px-4 py-2">{income.vehicle.vehicleRegister}</td>
              <td className="px-4 py-2">{income.source}</td>
              <td className="px-4 py-2">{income.status}</td>
              <td className="px-4 py-2">{income.amount}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleViewExpense(income)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-1"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditExpense()}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense()}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default IncomeTable;
