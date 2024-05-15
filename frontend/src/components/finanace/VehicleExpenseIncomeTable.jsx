import React, { useState, useEffect, useRef } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import IncomeExpenseBarChart from './incomeExpenseBarChart'; // Corrected import with uppercase initial letter
import ReactToPrint from 'react-to-print'; // Changed import to default import

function VehicleExpenseIncomeTable() {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [expenseOptions, setExpenseOptions] = useState([]);
  const [selectedVehicleDetails, setselectedVehicleDetails] = useState(null);
  const [incomeOptions, setIncomeOptions] = useState([]);
  
  const [selectedStatusOptions, setSelectedStatusOptions] = useState(['All']); // Initially set 'All'

  const [expenseData, expenseError, expenseLoading, expenseAxiosFetch] = useAxios();
  const [incomeData, incomeError, incomeLoading, incomeAxiosFetch] = useAxios();
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehicleData, vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios();

  const chartRef = useRef(null);


  const getVehicleData = () => {
    vehicleAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/vehicle/`,
    });
  }

  useEffect(() => {
    getVehicleData();
  }, []);

  useEffect(() => {
    if (vehicleData && vehicleData.vehicles) {
      const options = vehicleData.vehicles.map(vehicle => ({
        value: vehicle._id,
        label: `${vehicle.vehicleRegister}`,
      }));
      setVehicleOptions(options);
    }
  }, [vehicleData]);

  

  const getExpenseData = (vehicleId) => {
    expenseAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/expense/vehicleExpense/${vehicleId}`,
    });
  }

  const getIncomeData = (vehicleId) => {
    incomeAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/income/vehicleIncome/${vehicleId}`,
    });
  }

 

  

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

  const handleVehicleChange = (event) => {
    const selectedVehicleId = event.target.value;
    setSelectedVehicle(selectedVehicleId);
    const selectedVehicleDetails = vehicleData.vehicles.find(vehicle => vehicle._id === selectedVehicleId);
    if (selectedVehicleId) {
        setselectedVehicleDetails(selectedVehicleDetails);
      getIncomeData(selectedVehicleId);
      getExpenseData(selectedVehicleId)
    }
  };

  console.log(selectedVehicleDetails)
//   useEffect(() => {
//     // When selectedTrip changes, find and assign the details of the selected trip
//     const selectedVehicleDetails = vehicleData.vehicles.find(vehicle => vehicle._id === selectedVehicle);
//     setselectedVehicleDetails(selectedVehicleDetails);
//   }, [selectedVehicle, vehicleData]);

 console.log(incomeOptions)
 console.log(expenseOptions)
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
      analysisResult = 'The bar chart provides a clear visual representation of the vehicles financial performance, revealing that income consistently surpasses expenses. This positive trend indicates effective management and operational efficiency. The sustained profitability suggests that the vehicles revenue streams are robust and well-aligned with its expenditure structure. Consequently, the vehicles operation is generating a surplus, contributing to overall financial health and viability. In summary, the analysis underscores the successful balance between income generation and expense management, positioning the vehicle for continued success in its operations.';
      tag ='Profit'
    } else if (netIncome === 0) {
      analysisResult = 'Expenses equal income according to the bar chart, it indicates a break-even point in the vehicles financial performance. This equilibrium suggests that the vehicles operations generate enough revenue to cover its expenses, resulting in neither profit nor loss. While achieving a balance between income and expenses is desirable, its essential to continually assess and optimize operational efficiency to enhance profitability. Additionally, maintaining financial stability at the break-even point allows for strategic planning and investment in future growth opportunities. Therefore, the analysis indicates a stable financial position but emphasizes the importance of ongoing monitoring and improvement efforts to sustain competitiveness and profitability in the long term.';
      tag ='Profit/Loss'
    } else {
      analysisResult = 'The bar chart vividly illustrates that expenses consistently exceed income, indicating a concerning trend in the vehicles financial performance. This imbalance suggests potential issues with revenue generation or inefficient cost management. It is crucial to address these discrepancies promptly to avoid financial strain and ensure the sustainability of the vehicles operations. Strategies such as cost reduction measures or revenue enhancement initiatives may be necessary to realign the vehicles financial trajectory. In conclusion, the analysis underscores the urgent need for corrective action to mitigate losses and restore financial equilibrium in the vehicles operations';
      tag ='Loss'
    }
  
    return (
      <div className="print:bg-blue-100 print:border print:border-blue-200 print:p-4 print:rounded-md print:mt-4">
        <h4 className="text-transparent print:text-lg print:font-semibold print:mb-2">Financial Analysis</h4>
        <p className="text-transparent print:text-lg print:text-gray-700 print:mb-2">This report provides a detailed analysis of the expenses and income for the selected vehicle based on the relevant statuses of income and expense.</p>
        <p className=" text-transparent print:text-lg print:text-gray-700 print:mb-2">Cumulative Income: {cumulativeIncome}</p>
        <p className="text-transparent print:text-lg print:text-gray-700 print:mb-2">Cumulative Expense: {cumulativeExpense}</p>
        <p className="text-transparent print:text-lg print:text-gray-700 print:mb-2">{tag}: {netIncome}</p>
        <p className="text-transparent print:text-lg print:text-gray-700 print:mb-0">Analysis: {analysisResult}</p>
      </div>
    );
  };
  const getAmountBasedOnSource = (source,income) => {
    switch (source) {
      case 'Hire Income':
        return income.hirePayment.hireAmount;
      case 'Rental Income':
        return income.contractIncome.rentalAmount;
      default:
        return 'Unknown';
    }
  };
  
  

  const expenseTotal = filteredExpenseOptions ? filteredExpenseOptions.reduce((acc, expense) => acc + getCategoryAmount(expense.category, expense), 0) : 0;
  const incomeTotal = filteredIncomeOptions ? filteredIncomeOptions.reduce((acc, income) => acc + getAmountBasedOnSource(income.source,income), 0) : 0;
  
console.log(expenseTotal)
console.log(incomeTotal)
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-xl font-semibold mb-2">Finance Analysis Based on Vehicle</h3>
      

      <div className="mb-4">
        <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
          Vehicle:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="vehicle"
          name="vehicle"
          value={selectedVehicle}
          onChange={handleVehicleChange}
        >
          <option value="">Select Vehicle</option>
          {vehicleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      

      {selectedVehicle && (
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
          
          {selectedVehicleDetails && (
              <div className="print:mt-4 m-0">
                <h3 className="text-transparent print:text-black print:text-xl print:font-semibold print:mb-2 m-0">Selected Vehicle : {selectedVehicleDetails.vehicleRegister} ({selectedVehicleDetails.vehicleModel})</h3>
               
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
                  <th className="border px-4 py-2">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over combined list of filtered expenses and income */}
                {[...filteredExpenseOptions.map(expense => ({ ...expense, type: 'Expense' })), ...filteredIncomeOptions.map(income => ({ ...income, type: 'Income' }))].map(item => (
                  <tr key={item._id} style={{ color: item.type === 'Income' ? 'green' : 'red' }}>
                    <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{item.type}</td>
                    <td className="border px-4 py-2">{item.type === 'Expense' ? item.category : item.source}</td>
                    <td className="border px-4 py-2">{item.status}</td>
                    <td className="border px-4 py-2">{item.type === 'Expense' ? getCategoryAmount(item.category, item) : getAmountBasedOnSource(item.source,item)}</td>
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

export default  VehicleExpenseIncomeTable;
