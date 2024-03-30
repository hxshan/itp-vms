import React from "react";
import useAxiosGet from "@/hooks/useAxiosGet"
import { useState, useEffect } from "react";


const ContractDasbored = () => {

  

  const titles = [
    { name: "Client NIC", width: "w-[200px]" },
    { name: "Client Name", width: "w-[200px]" },
    { name: "Email", width: "w-[200px]" },
    { name: "Time", width: "w-[200px]" },
    { name: "Status", width: "w-[200px]" },
    { name: "Options", width: "w-[200px]" },
  ];

  const testData = [
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    {
      clientNIC: "123456789",
      clientName: "cristiano ronaldo",
      Email: "ronaldo@gmail.com",
      time: "loading",
      status: "loading",
    },
    
  ];

  return (
    <div className="w-full h-full py-5">
      <div className='flex items-center justify-center mb-4'>
      <h1 className=" text-[50px] font-bold ">Contract Dashboard</h1>
      </div>

      <div className="flex items-center justify-center my-8">
        <input
          type="text"
          className="bg-slate-400 px-4 py-2 rounded-l-md focus:outline-none w-[500px]"
          placeholder="Search"
        />
        <button className="px-4 py-2 bg-slate-500 text-white rounded-r-md hover:bg-slate-600 focus:outline-none">
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
        {testData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 text-center w-full bg-[#D9D9D9] my-2 p-2 items-center rounded-xl  text-[15px]"
          >
            <p className="w-[200px] ">NIC{item.clientNIC}</p>
            <p className="w-[200px]">{item.clientName}</p>
            <p className="w-[200px]">{item.Email}</p>
            <p className="w-[200px]">{item.time}</p>
            <p className="w-[200px]">{item.status}</p>

            <div className="flex justify-center items-center w-[200px] gap-3">
              <button className=" bg-yellow-300 px-5 py-2 rounded-xl">
                View
              </button>
              <button className=" bg-green-600 px-5 py-2 rounded-xl">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractDasbored;
