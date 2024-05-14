import React, { useState, useEffect, useRef } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import IncomeExpenseBarChart from './incomeExpenseBarChart'; // Corrected import with uppercase initial letter
import ReactToPrint from 'react-to-print'; // Changed import to default import

function TripExpenseIncomeTable() {
  const [selectedTrip, setSelectedTrip] = useState('');
  const [expenseOptions, setExpenseOptions] = useState([]);
  const [selectedTripDetails, setSelectedTripDetails] = useState(null);
  const [incomeOptions, setIncomeOptions] = useState([]);
  const [tripOptions, setTripOptions] = useState([]);
  const [selectedStatusOptions, setSelectedStatusOptions] = useState(['All']); // Initially set 'All'

  const [expenseData, expenseError, expenseLoading, expenseAxiosFetch] = useAxios();
  const [incomeData, incomeError, incomeLoading, incomeAxiosFetch] = useAxios();
  const [tripData, tripError, tripLoading, tripAxiosFetch] = useAxios();

  const chartRef = useRef(null);

  const getTripData = () => {
    tripAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/hire/`,
    });
  }

  const getExpenseData = (tripId) => {
    expenseAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/expense/tripExpense/${tripId}`,
    });
  }

  const getIncomeData = (tripId) => {
    incomeAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/income/tripIncome/${tripId}`,
    });
  }

  useEffect(() => {
    getTripData();
  }, []);

  useEffect(() => {
    if (tripData) {
      const options = tripData.map(hire => ({
        value: hire._id,
        label: `${hire.startPoint.city} - ${hire.endPoint} ${hire.vehicle.vehicleRegister}  (Start Date -${new Date(hire.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}) (Start time - ${hire.startTime}) (Driver - ${hire.driver.firstName})`,
      }));
      setTripOptions(options);
    }
  }, [tripData]);

  useEffect(() => {
    if (expenseData) {
      setExpenseOptions(expenseData);
    }
  }, [expenseData]);

  useEffect(() => {
    if (incomeData) {
      setIncomeOptions(incomeData);
    }
  }, [incomeData]);

  const handleTripChange = (event) => {
    const selectedTripId = event.target.value;
    setSelectedTrip(selectedTripId);
    if (selectedTripId) {
      getIncomeData(selectedTripId);
      getExpenseData(selectedTripId)
    }
  };

  useEffect(() => {
    // When selectedTrip changes, find and assign the details of the selected trip
    const selectedTripDetails = tripData.find(trip => trip._id === selectedTrip);
    setSelectedTripDetails(selectedTripDetails);
  }, [selectedTrip, tripData]);

  const handleStatusChange = (event) => {
    const { value, checked } = event.target;
    if (value === 'All' && checked) {
      setSelectedStatusOptions(['All']); // If 'All' is checked, only set 'All' in the state
    } else if (value === 'All' && !checked) {
      setSelectedStatusOptions([]); // If 'All' is unchecked, clear the state
    } else {
      setSelectedStatusOptions(prevOptions => {
        if (checked && !prevOptions.includes(value)) {
          // If any other status is checked, remove 'All' from the state
          return prevOptions.includes('All') ? [value] : [...prevOptions, value];
        } else if (!checked && prevOptions.includes(value)) {
          return prevOptions.filter(status => status !== value);
        }
        return prevOptions;
      });
    }
  };

  const getCategoryAmount = (category, item) => {
    switch (category) {
      case 'Fuel':
        return item.totalFuelPrice;
      case 'Maintenance and Repairs':
        return item.maintenanceCost;
      case 'Driver Wages':
        return item.totalEarning;
      case 'Insurance':
        return item.premiumAmount;
      case 'Licensing and Permits':
        return item.licenseCost;
      case 'Tolls and Parking':
        return item.otherAmount;
      case 'Driver Hire Expense':
        return item.otherAmount;
      case 'Other':
        return item.otherAmount;
      default:
        return '';
    }
  };

  // Filter expenses and incomes based on selected status options
  const filteredExpenseOptions = selectedStatusOptions.includes('All') ? expenseOptions : expenseOptions.filter(expense => selectedStatusOptions.includes(expense.status));
  const filteredIncomeOptions = selectedStatusOptions.includes('All') ? incomeOptions : incomeOptions.filter(income => selectedStatusOptions.includes(income.status));

  const FinanceAnalysisParagraph = ({ cumulativeExpense, cumulativeIncome }) => {
    // Calculate the net income (income - expense)
    const netIncome = cumulativeIncome - cumulativeExpense;
  
    // Analyze the financial performance based on the net income
    let analysisResult = '';
    let tag ='';
    if (netIncome > 0) {
      analysisResult = 'As seen in the barchart the income bar surpasses that of the expense thus this hire has an income over the expenses so leading to a profit generated from the hire';
      tag ='Profit'
    } else if (netIncome === 0) {
      analysisResult = 'As seen in the barchart the income bar equals that of the expense thus this hire has broken even expense with income so leading to neither a profit nor a loss';
      tag ='Profit/Loss'
    } else {
      analysisResult = 'As seen in the barchart the expense bar surpasses that of the income thus this hire has expenses over income so leading to a loss generated from the hire';
      tag ='Loss'
    }
  
    return (
      <div className="print:bg-blue-100 print:border print:border-blue-200 print:p-4 print:rounded-md print:mt-4">
        <h4 className="text-transparent print:text-lg print:font-semibold print:mb-2">Financial Analysis</h4>
        <p className="text-transparent print:text-lg print:text-gray-700 print:mb-2">This report provides a detailed analysis of the expenses and income for the selected hire based on the relevant statuses of income and expense.</p>
        <p className=" text-transparent print:text-lg print:text-gray-700 print:mb-2">Cumulative Income: {cumulativeIncome}</p>
        <p className="text-transparent print:text-lg print:text-gray-700 print:mb-2">Cumulative Expense: {cumulativeExpense}</p>
        <p className="text-transparent print:text-lg print:text-gray-700 print:mb-2">{tag}: {netIncome}</p>
        <p className="text-transparent print:text-lg print:text-gray-700 print:mb-0">Analysis: {analysisResult}</p>
      </div>
    );
  };

  const tripParagraph = () => {
  
    return (
      <div className="bg-blue-100 border border-blue-200 p-4 rounded-md mt-4">
        
        {selectedTripDetails && (
          <div>
            
            <h1>Trip that commenced on the {new Date(selectedTripDetails.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTripDetails.startTime} from {selectedTripDetails.startPoint.city} and concluded at {selectedTripDetails.endPoint} on {new Date(selectedTripDetails.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTripDetails.endTime}.Our driver, {selectedTripDetails.driver.firstName}, navigated the journey with vehicle {selectedTripDetails.vehicle.vehicleRegister},  ensuring a smooth and secure ride for customer {selectedTripDetails.cusName}.  </h1>
          </div>
        )}
      </div>
    );
  };
  

  const expenseTotal = filteredExpenseOptions.reduce((acc, expense) => acc + getCategoryAmount(expense.category, expense), 0);
  const incomeTotal = filteredIncomeOptions.reduce((acc, income) => acc + income.hirePayment.hireAmount, 0);
  
console.log(expenseTotal)
console.log(incomeTotal)
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-xl font-semibold mb-2">Finance Analysis Based on Hire</h3>
      <div className="mb-4">
        <label htmlFor="tripId" className="block text-gray-700 text-lg font-bold mb-2">Trip:</label>
        <select id="tripId" name="tripId" value={selectedTrip} onChange={handleTripChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
          <option value="">Select Trip</option>
          {tripOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      

      {selectedTrip && (
        <>
          {/* Filter options for status */}
          <ReactToPrint
            trigger={() => (
              <button className="bg-gray-800 text-white py-2 px-4 rounded shadow-md mb-4">Generate Finance Report</button>
            )}
            content={() => document.getElementById('print-content')}
            
          />
          <div id="print-content" className="print:border print:border-white-800 print:border-4 print:p-8 ">
            
          <h3 className="text-transparent print:text-black print:text-2xl print:font-bold print:mb-12 print:underline">Financial Analysis Based on Hire</h3>
          
          {selectedTripDetails && (
              <div className="print:mt-4 m-0">
                <h3 className="text-transparent print:text-black print:text-xl print:font-semibold print:mb-2 m-0">Selected Trip Details</h3>
                <h1 className="text-transparent print:text-black print:text-lg print:mb-16 m-0">Trip that commenced on {new Date(selectedTripDetails.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTripDetails.startTime} from {selectedTripDetails.startPoint.city} and concluded at {selectedTripDetails.endPoint} on {new Date(selectedTripDetails.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTripDetails.endTime}.Our driver, {selectedTripDetails.driver.firstName}, navigated the journey with vehicle {selectedTripDetails.vehicle.vehicleRegister},  ensuring a smooth and secure ride for customer {selectedTripDetails.cusName}.  </h1>
              </div>
            )}
          <div className="status-filter mb-4">
            <label className="text-lg font-bold">Status:</label>
            <div className="flex flex-wrap items-center">
              <label className="checkbox-container mr-8 text-lg">
                <input type="checkbox" value="All" checked={selectedStatusOptions.includes('All')} onChange={handleStatusChange} />All
                <span className="checkmark"></span>
              </label>
              <label className="checkbox-container mr-8 text-lg"><input type="checkbox" value="Pending" onChange={handleStatusChange} />Pending<span className="checkmark"></span></label>
              <label className="checkbox-container mr-8 text-lg"><input type="checkbox" value="Approved" onChange={handleStatusChange} />Approved<span className="checkmark"></span></label>
              <label className="checkbox-container mr-8 text-lg"><input type="checkbox" value="Rejected" onChange={handleStatusChange} />Rejected<span className="checkmark"></span></label>
              <label className="checkbox-container mr-8 text-lg"><input type="checkbox" value="Paid" onChange={handleStatusChange} />Paid<span className="checkmark"></span></label>
              <label className="checkbox-container mr-8 text-lg"><input type="checkbox" value="Received" onChange={handleStatusChange} />Received<span className="checkmark"></span></label>
              <label className="checkbox-container mr-8 text-lg"><input type="checkbox" value="Confirmed" onChange={handleStatusChange} />Confirmed<span className="checkmark"></span></label>
              {/* Add more status options as needed */}
            </div>
          </div>

          {/* Display combined table for expenses and income */}
          
            <table className="w-full table-auto mb-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over combined list of filtered expenses and income */}
                {[...filteredExpenseOptions.map(expense => ({ ...expense, type: 'Expense' })), ...filteredIncomeOptions.map(income => ({ ...income, type: 'Income' }))].map(item => (
                  <tr key={item._id} style={{ color: item.type === 'Income' ? 'green' : 'red' }}>
                    <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{item.type}</td>
                    <td className="border px-4 py-2">{item.type === 'Expense' ? item.category : item.hirePayment.hirePaymentType}</td>
                    <td className="border px-4 py-2">{item.status}</td>
                    <td className="border px-4 py-2">{item.type === 'Expense' ? getCategoryAmount(item.category, item) : item.hirePayment.hireAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Render line chart with filtered data */}
            <div ref={chartRef}>
              <IncomeExpenseBarChart expenses={filteredExpenseOptions} incomes={filteredIncomeOptions} />
            </div>
            <FinanceAnalysisParagraph cumulativeExpense={expenseTotal} cumulativeIncome={incomeTotal} />
            <p className="text-transparent print:text-transparent">This paragraph has invisible text.</p>

            
            
          </div>
        </>
      )}
    </div>
  );
}

export default TripExpenseIncomeTable;
