import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { ReactToPrint } from 'react-to-print';

const VehicleService = () => {
  const [data, error, loading, axiosFetch] = useAxios();
  const [rangeend, setRangeend] = useState(50000);
  const [search, setSearch] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const { vehicles = [] } = data;
  const componentRef = React.createRef();
  const handleAddnoteClick = (id) => {
    navigate(`/addnote/${id}`);
  };

  const resetState = () => {
    setRangeend(5000);
    setSearch('');
    setApplyFilter(false);
  };

  const handleFilterClick = () => {
    setApplyFilter((prevState) => !prevState);
  };

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/vehicle/',
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <p className="flex flex-col items-center justify-center h-screen text-center text-3xl font-bold text-black">Loading...</p>;
  }
  if (error) {
    return <p>Unexpected Error has occurred!</p>;
  }

  const filteredVehicles = vehicles
    .filter((vehicle) => {
      const searchTerm = search.toLowerCase().trim();
      if (searchTerm === '') {
        return true;
      } else {
        return (
          vehicle.vehicleType.toLowerCase().includes(searchTerm) ||
          vehicle.vehicleModel.toLowerCase().includes(searchTerm) ||
          vehicle.vehicleRegister.toLowerCase().includes(searchTerm) ||
          vehicle.category.toLowerCase().includes(searchTerm)
        );
      }
    })
    .filter((item) => !applyFilter || (item.lastMileage > rangeend && item.lastMileage <= rangeend + 2000))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full place-content-center space-y-4 mt-8 bg-cover bg-center">
      <div className="text-xl font-bold text-black mt-4 mb-8">Reminders for Services</div>

      <div className="flex justify-between">
      <div className='flex gap-4 justify-end'>
        
        <ReactToPrint
          trigger={() => <button className="bg-actionRed text-white rounded-lg px-4 py-2">Generate a Report</button>}
          content={() => componentRef.current}
        />
        </div>
        
        
      </div>
      <div className='flex flex-row justify-end gap-4 '>
        <input
          type="text"
          name="Search"
          placeholder="Search by Type or Number"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className=" shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0"
        />
        <div className="flex gap-2">
          <div className=" shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 bg-white">
          <label className="font-bold mr-2">Endrange :</label>
          <input
            type="number"
            className="bg-slate-100 w-28 p-1 rounded-lg text-center"
            value={rangeend}
            onChange={(e) => setRangeend(parseInt(e.target.value))}
          />
          </div>
          <button className="bg-actionBlue text-white rounded-lg px-4 py-2 font-bold" onClick={handleFilterClick}>
          {applyFilter ? 'Remove Filter' : 'Apply Filter'}
        </button>
          <button type="button" className="bg-actionRed text-white rounded-lg px-4 py-2 font-bold" onClick={resetState}>
          Reset
        </button>
        </div>
        </div>


      <div ref={componentRef}>
        <h1 className="text-center font-bold text-xl mb-3"> End Range : {rangeend}Km</h1>
        <div className="border-b-4 border-black w-full mb-6"></div>
        <table className="w-full   border-black  shadow-xl p-5">
          <thead className="bg-secondary   text-white">
            <tr>
              <th className="border border-white p-2">Vehicle Category</th>
              <th className="border border-white p-2">Vehicle Number</th>
              <th className="border border-white p-2">Vehicle Last-Mileage</th>
              <th className="border border-white p-2">Status</th>
              <th className="border border-white p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr className="bg-white border-t border-gray-200" key={vehicle._id}>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center">{vehicle.category}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center">{vehicle.vehicleRegister}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 text-center">{vehicle.lastMileage}km</td>
                  <td className="border rounded-md text-center">
                    {vehicle.lastMileage <= rangeend ? (
                      <p className='bg-green-200 text-green-800 font-semibold rounded-md mx-4'>Done</p>
                    ) : vehicle.lastMileage <= rangeend + 2000 ? (
                      <p className='bg-yellow-200 text-yellow-800 font-semibold rounded-md mx-4'>Under Range</p>
                    ) : (
                      <p className='bg-red-200 text-red-800 font-semibold rounded-md mx-4'>Still Not Close to Range</p>
                    )}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap border-r border-gray-200 flex justify-center">
                    <button
                      className="my-1 mx-1 bg-blue-700 text-white py-1 px-4 rounded-md text-sm font-semibold"
                      id={vehicle._id}
                      onClick={() => handleAddnoteClick(vehicle._id)}
                    >
                      Add Note
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {vehicles.length > itemsPerPage && (
          <ul className="pagination flex gap-3">
            {[...Array(Math.ceil(vehicles.length / itemsPerPage)).keys()].map((number) => (
              <li
                key={number}
                className={`page-item bg-slate-100 rounded-lg p-1 ${currentPage === number + 1 ? 'active bg-slate-400 p-1' : ''}`}
              >
                <button
                  onClick={() => paginate(number + 1)}
                  className={`page-link ${currentPage === number + 1 ? 'active-button' : ''}`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VehicleService;
