import React from "react";
import useAxios from "@/hooks/useAxios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "@/api/axios";
import AddContractpopup from "./AddContractpopup";


const ContractDasboard = () => {


  const navigate = useNavigate();

  
  const [openAddcont,setopenAddcont] = useState(false);
  const [AllClients,setAllClients] = useState([])
  const [searchError,setSearchError] = useState('');

  const [data, error, loading, axiosFetch] = useAxios()
  const [clients,clientError, clientLoading, clientsFetch] = useAxios();

  const getallClients = ()=>{
    clientsFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/contract/getClients`,
    });
  }

  const getContracts =()=>{
    axiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/contract/getAllContracts`,
   });
 }

  


  const [allContracts, SetallContracts] = useState([]);
  const [Search, SetSearch] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "searchData") {
      SetSearch(value);
    }
  };

  const handleSearch = () => {
    const filteredContracts = allContracts.filter(contract =>
      contract.clientID.nicNumber.toLowerCase().includes(Search.toLowerCase()) ||
      contract.clientID.firstName.toLowerCase().includes(Search.toLowerCase()) ||
      contract.clientID.lastName.toLowerCase().includes(Search.toLowerCase()) ||
      contract.clientID.email.toLowerCase().includes(Search.toLowerCase())
    );
  
    if (filteredContracts.length > 0) {
      setSearchError(`${filteredContracts.length} items found.`);
    } else {
      setSearchError("No items found.");
    }
  };

  useEffect(() => {
    if(error){
      alert(error)
    }
    else if (data) {
      SetallContracts(data);
    }
  }, [data]);

  useEffect(() => {
    if (clientError) {
      alert(clientError);
    } else if (clients) {
      const availableClients = clients.filter(client => client.Contract_Available === "unAvailable");
      setAllClients(availableClients);
    }
  }, [clients]);

  useEffect(()=>{
    getContracts()
    getallClients()
  },[])


  const titles = [
    { name: "Client NIC", width: "w-[200px]" },
    { name: "Client Name", width: "w-[200px]" },
    { name: "Email", width: "w-[200px]" },
    { name: "Time", width: "w-[240px]" },
    { name: "Status", width: "w-[240px]" },
    { name: "Options", width: "w-[200px]" },
  ];

  const calculateTimeDiff = (startDate, endDate) => {
    const startDateTime = new Date(startDate);
    let endDateTime = new Date(endDate);
    const currentDateTime = new Date();

    endDateTime = new Date(endDateTime.getTime() - (5*60*60*1000) - (30*60*1000));

    if (startDateTime > currentDateTime) {
      return "Pending Start";
    } else if (endDateTime < currentDateTime) {
      return "Expired";
    } else {
      const diffMilliseconds = endDateTime - currentDateTime;
      const days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000);
      return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      SetallContracts((prevContracts) => {
        return prevContracts.map((contract) => {
          return {
            ...contract,
            timeLeft: calculateTimeDiff(contract.contract_SD, contract.contract_ED),
          };
        });
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  


  if(loading && clientLoading){
    return(
      <h1>Loading ...</h1>
    )
  }

  

  return (
    <div>
      <AddContractpopup isOpen={openAddcont} TogleOpen={()=>{setopenAddcont(!openAddcont)}} clients={AllClients}/>
    <div className="w-full h-full py-5">
      
      <div className="flex items-center justify-center ">
        <h1 className=" text-[50px] font-bold ">Contract Dashboard</h1>
      </div>
      <div className='flex justify-end'>
        <button className=" bg-red-500 px-5 py-2 rounded-xl " onClick={()=>{setopenAddcont(!openAddcont)}} >Add Contract</button>
        </div>


      
      <div className="flex items-center justify-center mb-5">
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

      <div className=" text-blue-500 font-semibold mb-5">
        <p>{searchError ? searchError : "Search something"}</p>
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
            const lastNameLowerCase = item.clientID.lastName.toLowerCase();
            const nicNumber = item.clientID.nicNumber.toString();
            const email = item.clientID.email.toLowerCase();
            return (
              searchLowerCase === "" ||
              firstNameLowerCase.includes(searchLowerCase) ||
              lastNameLowerCase.includes(searchLowerCase) ||
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
              <p className="w-[200px] ml-6 text-red-500 font-semibold">{calculateTimeDiff(item.contract_SD, item.contract_ED)}</p>
              <p className="w-[200px] ml-6 text-green-500 font-semibold">{item.Status}</p>

              <div className="flex justify-center items-center w-[200px] gap-3">
                <button className={` ${item.Status === "Terminated" ? " bg-orange-400 w-[140px] " : "bg-yellow-300"}  px-5 py-2 rounded-xl`} onClick={()=> navigate(`/viewContract/${item._id}`)}>
                  View
                </button>
                <button className={` ${item.Status === "Terminated" ? "hidden": ""} bg-green-600 px-5 py-2 rounded-xl`} onClick={()=> navigate(`/EditContract/${item._id}`)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default ContractDasboard;
