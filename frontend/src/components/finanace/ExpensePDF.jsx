import React from "react";
import { Document, Page, Text, View, PDFViewer, Font } from "@react-pdf/renderer";

const ExpensePDF = ({ expense }) => {
  // Register the Arial font dynamically
  Font.registerHyphenationCallback(word => [word]);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4">
          <View style={{ padding: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 5 }}>Expense Details</Text>
            <Text style={{ fontSize: 12, marginBottom: 3 }}>Date: {new Date(expense.date).toLocaleDateString()}</Text>
            <Text style={{ fontSize: 12, marginBottom: 3 }}>Associated Vehicle: {expense.vehicle.vehicleRegister}</Text>
            {expense.trip && <Text style={{ fontSize: 12, marginBottom: 3 }}>Associated Trip: {expense.trip.details}</Text>}
            <Text style={{ fontSize: 12, marginBottom: 3 }}>Status: {expense.status}</Text>
            <Text style={{ fontSize: 12, marginBottom: 3 }}>Recorded By: {expense.recordedBy}</Text>
            <Text style={{ fontSize: 12, marginBottom: 3 }}>Notes: {expense.notes}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ExpensePDF;
