import React, { useState } from 'react';

const PastTripTable = ({ data, isLoading, error, refetch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const columns = ["Date", "Start Time", "End Time", "Start Location", "End Location", "Fare", "Actions"];

  const canEditTrip = (endTime) => {
    const oneHourInMillis = 60 * 60 * 1000;
    const tripEndTime = new Date(endTime).getTime();
    const currentTime = new Date().getTime();
    return currentTime - tripEndTime < oneHourInMillis;
  };

  useEffect(() => {
    refetch(); // Fetch past trips data when the component mounts
  }, [refetch]);

  const filteredData = data.filter((trip) =>
    Object.values(trip).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => setSearchTerm('')}>Clear</button>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.length > 0 ? (
            filteredData.map((trip) => (
              <tr key={trip.id}>
                <td className="px-6 py-4 whitespace-nowrap">{trip.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trip.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trip.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trip.startLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trip.endLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trip.fare}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {canEditTrip(trip.endTime) && (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2">Edit</button>
                  )}
                  <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">View Summary</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap" colSpan={columns.length}>No matching data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PastTripTable;
