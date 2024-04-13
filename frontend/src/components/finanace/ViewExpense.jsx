import React from "react";
import { FaTimes, FaDownload } from "react-icons/fa";
import html2pdf from 'html2pdf.js';

const ViewExpense = ({ expense, onClose }) => {
  const renderCategorySpecificDetails = () => {
    switch (expense.category) {
      case "Fuel":
        return (
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">Fuel Details</p>
            <p>Total Price: Rs.{expense.fuelDetails.totalPrice.toFixed(2)}</p>
          </div>
        );
      case "Maintenance and Repairs":
        return (
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">Maintenance Details</p>
            <p>Maintenance Cost: Rs.{expense.maintenanceDetails.maintenanceCost.toFixed(2)}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleDownload = () => {
    // Create a div to hold the component content
    const container = document.createElement('div');
    container.innerHTML = `
      <h2>Expense Details</h2>
      <p>Expense Date: ${new Date(expense.date).toLocaleDateString()}</p>
      <p>Associated Vehicle: ${expense.vehicle.vehicleRegister}</p>
      ${expense.trip && `<p>Associated Trip: ${expense.trip.details}</p>`}
      <p>Status: ${expense.status}</p>
      <p>Recorded By: ${expense.recordedBy}</p>
      <p>Notes: ${expense.notes}</p>
      ${renderCategorySpecificDetails()}
    `;

    // Convert the content to PDF
    html2pdf().from(container).save();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-between items-center">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
          <button onClick={handleDownload} className="text-gray-500 hover:text-gray-800">
            <FaDownload />
          </button>
        </div>
        <h2 className="text-2xl font-bold my-4 text-center text-gray-800">Expense Details</h2>
        <hr className="border-t border-gray-200 my-4" />
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Expense Date:</p>
          <p className="text-gray-800">{new Date(expense.date).toLocaleDateString()}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Associated Vehicle:</p>
          <p className="text-gray-800">{expense.vehicle.vehicleRegister}</p>
        </div>
        {expense.trip && (
          <div className="mb-4">
            <p className="text-lg font-semibold mb-1">Associated Trip:</p>
            <p className="text-gray-800">{expense.trip.details}</p>
          </div>
        )}
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Status:</p>
          <p className="text-gray-800">{expense.status}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Recorded By:</p>
          <p className="text-gray-800">{expense.recordedBy}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Notes:</p>
          <p className="text-gray-800">{expense.notes}</p>
        </div>
        {renderCategorySpecificDetails()}
      </div>
    </div>
  );
};

export default ViewExpense;
