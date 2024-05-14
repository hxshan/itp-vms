import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContractpopup = ({ isOpen, TogleOpen, clients }) => {
  const navigate = useNavigate();

  const [Search, SetSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState(clients);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  console.log(results);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "searchData") {
      SetSearch(value);
    }
  };

  const handleSearch = () => {
    const filteredContracts = clients.filter(
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

  useEffect(() => {
    if (clients) {
      setResults(clients);
    }
  }, [clients]);

  const titles = ["Client NIC", "Client Name", "Email", "Options"];

  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } flex flex-col bg-dimWhite fixed left-0 pt-[20px] items-center w-full h-screen  `}
    >
      <div
        className="flex bg-white flex-col ml-[260px] h-fit py-4 px-12 rounded-lg w-[1000px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-4 border-b-2 ">
          <h1 className=" text-[20px] font-bold ">Choose a Client</h1>
        </div>

        <div className=" text-blue-500 font-semibold flex justify-between mb-4">
          <p>{searchError ? searchError : "Search something"}</p>

          <div className="flex items-center justify-center gap-3">
            <input
              type="text"
              className="shadow appearance-none border rounded min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

        <div className="py-2">
          <p className=" text-red-600">
            *Note these clients do not have a contract
          </p>
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
            {currentItems ? (
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

                      <td className="px-6 py-2 whitespace-nowrap justify-center gap-3 flex">
                        <button
                          className="bg-actionBlue text-white py-1 px-6 rounded-md"
                          id={row._id}
                          onClick={() => navigate(`/viewClient/${row._id}`)}
                        >
                          View
                        </button>
                        <button
                          className="bg-actionGreen text-white py-1 px-6 rounded-md"
                          onClick={() => {
                            navigate(`/Contract/${row._id}`);
                          }}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={currentItems.length < 0}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <ul className="flex list-none border border-gray-300 rounded-md">
            {Array.from({
              length: Math.ceil(clients.length / itemsPerPage),
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

        <div className="flex justify-center ">
          <button
            className=" bg-orange-600 px-5 py-2 rounded-lg w-[150px] mt-5 font-bold text-white"
            onClick={TogleOpen}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContractpopup;
