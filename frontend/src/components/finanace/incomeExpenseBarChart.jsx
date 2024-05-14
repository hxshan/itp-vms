import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const IncomeExpenseBarChart = ({ expenses, incomes }) => {
  useEffect(() => {
    // Do any necessary initialization or cleanup here
  }, []);

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
  // Calculate the cumulative amounts for expenses and incomes
  const expenseTotal = expenses.reduce((acc, expense) => acc + getCategoryAmount(expense.category, expense), 0);
  const incomeTotal = incomes.reduce((acc, income) => acc + income.hirePayment.hireAmount, 0);

  // Data for the bar chart
  const data = {
    labels: ['Expense', 'Income'],
    datasets: [
      {
        label: ['Cumulative Amount'],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(75, 192, 192, 0.4)'],
        hoverBorderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        data: [expenseTotal, incomeTotal],
      },
    ],
  };

  // Options for the bar chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'black', // Set font color for legend labels
        generateLabels: function(chart) {
          const legendLabels = [];
          chart.data.datasets.forEach((dataset, index) => {
            legendLabels.push({
              text: dataset.label, // Use dataset label as legend text
              fillStyle: dataset.backgroundColor, // Use dataset background color as legend color
              index: index,
            });
          });
          return legendLabels;
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default IncomeExpenseBarChart;
