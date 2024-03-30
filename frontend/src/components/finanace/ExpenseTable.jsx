import React from 'react';

const ExpenseTable = ({ data,isLoading }) => {
  const columns = ["Vehicle Name", "Type", "Amount", "Date", "Action"];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(data)
  return (
    <div>
      <table className="border border-black">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data!=null && data.length>0  ?(data.map((expense) => (
              <tr key={expense._id}>
                <td className="px-6 py-4 whitespace-nowrap">{expense.vehicleName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{expense.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{expense.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">View</button>
                  <button className="bg-yellow-300 text-white px-4 py-2 rounded-md">Edit</button>
                  <button className="bg-red-700 text-white px-4 py-2 rounded-md">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
