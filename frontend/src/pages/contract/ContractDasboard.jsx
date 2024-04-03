import React from "react";
import useAxiosGet from "@/hooks/useAxiosGet";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const ContractDasboard = () => {


  const navigate = useNavigate();


  const {
    data: Contracts,
    error,
    isLoading,
    refetch,
  } = useAxiosGet("/contract/getAllContracts");


  const [allContracts, SetallContracts] = useState([]);
  const [Search, SetSearch] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "searchData") {
      SetSearch(value);
    }
  };

  const handleSearch = () => {
    console.log(Search);
  };

  useEffect(() => {
    if (Contracts) {
      SetallContracts(Contracts);
    }
  }, [Contracts]);

  const titles = [
    { name: "Client NIC", width: "w-[200px]" },
    { name: "Client Name", width: "w-[200px]" },
    { name: "Email", width: "w-[200px]" },
    { name: "Time", width: "w-[200px]" },
    { name: "Status", width: "w-[200px]" },
    { name: "Options", width: "w-[200px]" },
  ];

  return (
    <div className="w-full h-full py-5">
      <div className="flex items-center justify-center ">
        <h1 className=" text-[50px] font-bold ">Contract Dashboard</h1>
      </div>

      <div className="flex items-center justify-center my-12">
        <input
          type="text"
          className="bg-slate-400 px-4 py-3 rounded-l-md focus:outline-none w-[500px] placeholder-gray-950 text-[18px]"
          placeholder="Search eg:-NIC,Name,Email"
          name="searchData"
          onChange={handleInput}
        />
        <button
          className="px-4 py-3 bg-slate-500 text-white rounded-r-md hover:bg-slate-600 focus:outline-none text-[18px]"
          onClick={handleSearch}
        >
          Search
        </button>
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

      <div className="flex flex-col items-center ">
        {allContracts
          .filter((item) => {
            const searchLowerCase = Search.toLowerCase();
            const firstNameLowerCase = item.clientID.firstName.toLowerCase();
            const nicNumber = item.clientID.nicNumber.toString();
            const email = item.clientID.email.toLowerCase();
            return (
              searchLowerCase === "" ||
              firstNameLowerCase.includes(searchLowerCase) ||
              nicNumber.includes(searchLowerCase) ||
              email.includes(searchLowerCase)
            );
          })
          .map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-6 text-center w-full bg-[#D9D9D9] my-2 p-2 items-center rounded-xl  text-[15px]"
            >
              <p className="w-[200px] ">NIC{item.clientID.nicNumber}</p>
              <p className="w-[200px]">
                {item.clientID.firstName} {item.clientID.lastName}
              </p>
              <p className="w-[200px]">{item.clientID.email}</p>
              <p className="w-[200px]">null</p>
              <p className="w-[200px]">null</p>

              <div className="flex justify-center items-center w-[200px] gap-3">
                <button className=" bg-yellow-300 px-5 py-2 rounded-xl" onClick={()=> navigate(`/viewContract/${item._id}`)}>
                  View
                </button>
                <button className=" bg-green-600 px-5 py-2 rounded-xl" onClick={()=> navigate(`/EditContract/${item._id}`)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContractDasboard;