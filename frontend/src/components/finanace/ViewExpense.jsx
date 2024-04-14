import React from "react";
import { FaTimes, FaDownload } from "react-icons/fa";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

const MyDocument = ({ expense, renderCategorySpecificDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Expense Details</Text>
        <Text style={styles.text}>Expense Date: {new Date(expense.date).toLocaleDateString()}</Text>
        <Text style={styles.text}>Associated Vehicle: {expense.vehicle.vehicleRegister}</Text>
        {expense.trip && <Text style={styles.text}>Associated Trip: {expense.trip.details}</Text>}
        <Text style={styles.text}>Status: {expense.status}</Text>
        <Text style={styles.text}>Recorded By: {expense.recordedBy}</Text>
        <Text style={styles.text}>Notes: {expense.notes}</Text>
        {renderCategorySpecificDetails()}
      </View>
    </Page>
  </Document>
);

const ViewExpense = ({ expense, onClose }) => {
  const renderCategorySpecificDetails = () => {
    switch (expense.category) {
      case "Fuel":
        return (
          <View style={styles.section}>
            <Text style={styles.text}>Fuel Details</Text>
            <Text style={styles.text}>Total Price: Rs.{expense.fuelDetails.totalPrice.toFixed(2)}</Text>
          </View>
        );
      case "Maintenance and Repairs":
        return (
          <View style={styles.section}>
            <Text style={styles.text}>Maintenance Details</Text>
            <Text style={styles.text}>Maintenance Cost: Rs.{expense.maintenanceDetails.maintenanceCost.toFixed(2)}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const handleDownload = () => {
    html2canvas(document.getElementById('expense-details')).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("expense_details.pdf");
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96" id="expense-details">
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
 