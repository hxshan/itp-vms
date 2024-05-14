import React from "react";
import { FaTimes, FaDownload } from "react-icons/fa";

const ViewExpense = ({ expense, onClose }) => {
  const renderCategorySpecificDetails = () => {
    switch (expense.category) {
      case "Fuel":
        return (
          <div className="mb-4">
            <p className="text-lg font-semibold mb-1">Fuel Details</p>
            <div className="mb-4">
  <p className="text-lg font-semibold mb-1">Fuel Type: <span className="text-gray-800  font-normal">{expense.fuelType}</span></p>
</div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-lg font-semibold mb-1">Quantity</p>
                <p className="text-gray-800">{expense.fuelQuantity}</p>
              </div>
              <div>
                <p className="text-lg font-semibold mb-1">Price Per Unit</p>
                <p className="text-gray-800">{expense.fuelPricePerUnit}</p>
              </div>
              <div>
                <p className="text-lg font-semibold mb-1">Total Price</p>
                <p className="text-gray-800">{expense.totalFuelPrice}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md" id="expense-details" style={{ width: '60rem' }}><div className="flex justify-between items-center">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
          <button  className="text-gray-500 hover:text-gray-800">
            <FaDownload />
          </button>
        </div>
        <h2 className="text-2xl font-bold my-4 text-center text-gray-800">Expense Details</h2>
        <hr className="border-t border-gray-200 my-4" />
        <div className="flex mb-4">
          <div className="w-1/2 pr-4">
            <p className="text-lg font-semibold mb-1">Expense Date: <span className="text-gray-800  font-normal">{new Date(expense.date).toLocaleDateString()}</span></p>
            
          </div>
          <div className="w-1/2 pl-4">
            <p className="text-lg font-semibold mb-1">Recorded By: <span className="text-gray-800  font-normal">{expense.recordedBy}</span></p>
            
          </div>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Associated Vehicle: <span className="text-gray-800  font-normal">{expense.vehicle.vehicleRegister}</span></p>
         
        </div>
        {expense.tripId && (
          <div className="mb-4">
            <p className="text-lg font-semibold mb-1">Associated Trip: <span className="text-gray-800  font-normal">{expense.fuelType}</span></p>
          
          </div>
        )}
        <div className="flex mb-4">
          <div className="w-1/2 pr-4">
            <p className="text-lg font-semibold mb-1">Status:<span className="text-gray-800  font-normal">{expense.status}</span></p>
            
          </div>
          <div className="w-1/2 pl-4">
            <p className="text-lg font-semibold mb-1">Category: <span className="text-gray-800  font-normal">{expense.category}</span></p>
            
          </div>
          
        </div>

        {renderCategorySpecificDetails()}
        {expense.isReimbursement && (
         <div>
          <p className="text-lg font-semibold mb-1">Reimbursment Details</p>
          
          <div className="flex mb-4">
          <div className="w-1/2 pr-4">
            <p className="text-lg font-semibold mb-1">Reimbursement Amount: <span className="text-gray-800  font-normal">{expense.reimbursementAmount}</span></p>
            
          </div>
          <div className="w-1/2 pl-4">
            <p className="text-lg font-semibold mb-1">Reimbursement To: <span className="text-gray-800  font-normal">{expense.reimbursmentPerson.firstName}</span></p>
            
          </div>
          <div className="w-1/2 pl-4">
            <p className="text-lg font-semibold mb-1">Reimbursement Status: <span className="text-gray-800  font-normal">{expense. reimbursementStatus}</span></p>
            
          </div>
        </div>
        </div>
        )}
      </div>
      
    </div>
  );
};

export default ViewExpense;
