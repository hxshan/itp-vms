import React from "react";
import useAxios from "@/hooks/useAxios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "@/api/axios";
import AddContractpopup from "./AddContractpopup";
import { ClipLoader } from "react-spinners";


const ContractDasboard = () => {


  const navigate = useNavigate();

  
  const [openAddcont,setopenAddcont] = useState(false);
  const [AllClients,setAllClients] = useState([])
  const [searchError,setSearchError] = useState('');
  const [statusFilter, setStatusFilter] = useState("");
  const [itemsPerPage] = useState(5); 
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);

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
 
 

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

 
 const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
      setResults(data);
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


  const titles = ["Client NIC", "Client Name" , "Email", "Time", "Status", "Options"]

  const calculateTimeDiff = (startDate, endDate) => {
    const startDateTime = new Date(startDate);
    let endDateTime = new Date(endDate);
    const currentDateTime = new Date();

    endDateTime = new Date(endDateTime.getTime() - (5*60*60*1000) - (30*60*1000));
    startDateTime.setHours(startDateTime.getHours() - 5);
    startDateTime.setMinutes(startDateTime.getMinutes() - 30);
    
    if (startDateTime > currentDateTime) {
      return "Pending Start";
    } else if (endDateTime < currentDateTime) {
      return "Expired";
    } else {
      const diffMilliseconds = endDateTime - currentDateTime;
      const days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     // const minutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
     // const seconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000);
    // ${minutes} minutes ${seconds} seconds
      return `${days} days ${hours} hours`;
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
    }, 1000*60);

    return () => clearInterval(intervalId);
  }, []);
  


  if(loading || clientLoading){
    return(
      <div className="flex justify-center items-center h-screen">
        <div className="sweet-loading">
          <ClipLoader color="#10971D" loading={true}  size={50} />
        </div>
      </div>
    );
  }

  

  return (
    <div>
      <AddContractpopup isOpen={openAddcont} TogleOpen={()=>{setopenAddcont(!openAddcont)}} clients={AllClients}/>
    <div className="w-full h-full py-5">
      
      <div className="flex items-center justify-center border-b-2 mb-4">
        <h1 className=" text-[50px] font-bold ">Contract Dashboard</h1>
      </div>
      <div className='flex justify-end mb-5'>
        <button className=" bg-actionBlue text-white px-5 py-2 rounded-xl text-[16px] font-bold  uppercase " onClick={()=>{setopenAddcont(!openAddcont)}} >Add Contract</button>
        </div>

      <div className=" text-blue-500 font-semibold flex justify-between mb-4">
        <p>{searchError ? searchError : "Search something"}</p>

        <div className="flex items-center justify-center gap-3">
        <select name="status"
          value={statusFilter}
          onChange={(e)=>setStatusFilter(e.target.value)}
           className="shadow appearance-none border rounded min-w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Status</option>
            <option value="Newly Added">Newly Added</option>
            <option value="ongoing">Ongoing</option>
            <option value="waiting for termination" >Waiting for termination</option>
            <option value="Terminated">Terminated</option>
          </select>
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
            {titles.map((col,index) => {
              return <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider" key={index}>{col}</th>
            })}
          </tr>
        </thead>
        <tbody>
  {currentItems && currentItems.length > 0 ? currentItems
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
    .map((row) => {
      return (
        <tr className="bg-white border-t border-gray-200" key={row._id}>
          <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">NIC {row.clientID.nicNumber}</td>
          <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.clientID.firstName} {row.clientID.lastName}</td>
          <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.clientID.email}</td>
          <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{calculateTimeDiff(row.contract_SD, row.contract_ED)}</td>
          <td className={`px-2 text-xs font-semibold text-center ${row.Status ==='Newly Added'? 'text-green-500 bg-green-100': row.Status ==='ongoing'?'text-orange-600 bg-orange-100': row.status ==='waiting for termination'?'text-red-600 bg-red-100': 'text-red-600 bg-red-100'}`}>{row.Status.toUpperCase()}</td>
          <td className="px-6 py-2 whitespace-nowrap justify-center gap-3 flex">
            <button className={` bg-actionBlue text-white py-1 px-6 rounded-md`} id={row._id} onClick={()=> navigate(`/viewContract/${row._id}`)}>View</button>
            <button className={` ${row.Status === "Terminated" ? "hidden": ""} bg-actionGreen text-white  py-1 px-6 rounded-md `}  onClick={()=> navigate(`/EditContract/${row._id}`)}>Edit</button>
          </td>
        </tr>
      );
    }) : (
      <tr>
        <td colSpan={allContracts.length}>No data available</td>
      </tr>
    )
  }
</tbody>
      </table>

      <div className="flex justify-center mt-4">
                <ul className="flex list-none border border-gray-300 rounded-md">
                    {Array.from({ length: Math.ceil(allContracts.length / itemsPerPage) }).map((_, index) => (
                        <li key={index} className={`cursor-pointer px-4 py-2 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`} onClick={() => paginate(index + 1)}>{index + 1}</li>
                    ))}
                </ul>
            </div>
    </div>
    </div>
  );
};

export default ContractDasboard;
