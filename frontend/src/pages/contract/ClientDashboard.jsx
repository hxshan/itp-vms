import React, { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { ClipLoader } from "react-spinners";

const ClientDashboard = () => {
  const navigate = useNavigate();

  const [allClients, setallClients] = useState([]);
  const [Search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);

  const titles = [
    "Client NIC",
    "Client Name",
    "Email",
    "Phone number",
    "Status",
    "Options",
  ];

  const [data, error, loading, axiosFetch] = useAxios();

  const getClients = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/contract/getClients`,
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "searchData") {
      setSearch(value);
    }
  };

  const handleSearch = () => {
    const filteredContracts = allClients.filter(
      (client) =>
        client.nicNumber.toLowerCase().includes(Search.toLowerCase()) ||
        client.firstName.toLowerCase().includes(Search.toLowerCase()) ||
        client.lastName.toLowerCase().includes(Search.toLowerCase()) ||
        client.email.toLowerCase().includes(Search.toLowerCase())
    );

    if (filteredContracts.length > 0) {
      setSearchError(`${filteredContracts.length} items found.`);
    } else {
      setSearchError("No items found.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (error) {
      alert(error);
    } else if (data) {
      setallClients(data);
      setResults(data);
    }
  }, [data]);

  useEffect(() => {
    getClients();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="sweet-loading">
          <ClipLoader color="#10971D" loading={true} size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-5">
      <div className="flex items-center justify-center border-b-2 mb-4">
        <h1 className=" text-[50px] font-bold ">Client Dashboard</h1>
      </div>
      <div className="flex justify-end mb-5">
        <button
          className=" bg-actionBlue text-white px-5 py-2 rounded-lg w-[150px] text-[16px] font-bold  uppercase "
          onClick={() => {
            navigate(`/addClient`);
          }}
        >
          Add client
        </button>
      </div>

      <div className=" text-blue-500 font-semibold flex justify-between mb-4">
        <p>{searchError ? searchError : "Search something"}</p>

        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            className="shadow appearance-none border rounded min-w-40 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search"
            name="searchData"
            onChange={handleInput}
          />
          <button
            className="px-4 py-1 rounded-md bg-actionBlue  text-white text-[16px]"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className=" grid grid-cols-6 w-full ">
          {titles.map((item, index) => (
            <p
              key={index}
              className={`${item.width} text-center font-bold text-[18px]`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-secondary">
          <tr>
            {titles.map((col, index) => {
              return (
                <th
                  className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider"
                  key={index}
                >
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0 ? (
            currentItems
              .filter((item) => {
                const searchLowerCase = Search.toLowerCase();
                const firstNameLowerCase = item.firstName.toLowerCase();
                const lastNameLowerCase = item.lastName.toLowerCase();
                const nicNumber = item.nicNumber.toString();
                const email = item.email.toLowerCase();
                return (
                  searchLowerCase === "" ||
                  firstNameLowerCase.includes(searchLowerCase) ||
                  lastNameLowerCase.includes(searchLowerCase) ||
                  nicNumber.includes(searchLowerCase) ||
                  email.includes(searchLowerCase)
                );
              })
              .map((row) => {
                return (
                  <tr
                    className="bg-white border-t border-gray-200"
                    key={row._id}
                  >
                    <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                      NIC {row.nicNumber}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                      {row.firstName} {row.lastName}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                      {row.email}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                      {row.phoneNumber}
                    </td>
                    <td
                      className={`px-2 text-xs font-semibold text-center ${
                        row.status == "active"
                          ? "text-green-500 bg-green-100"
                          : row.status == "inactive"
                          ? "text-red-600 bg-red-100"
                          : "text-orange-600 bg-orange-100"
                      }`}
                    >
                      {row.status.toUpperCase()}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap justify-center gap-3 flex">
                      <button
                        className="bg-actionBlue text-white py-1 px-6 rounded-md"
                        id={row._id}
                        onClick={() => {
                          navigate(`/viewClient/${row._id}`);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="bg-actionGreen text-white py-1 px-6 rounded-md"
                        onClick={() => {
                          navigate(`/EditClient/${row._id}`);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td colSpan={currentItems.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <ul className="flex list-none border border-gray-300 rounded-md">
          {Array.from({
            length: Math.ceil(allClients.length / itemsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`cursor-pointer px-4 py-2 ${
                currentPage === index + 1 ? "bg-gray-200" : ""
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientDashboard;
