import React, { useState , useEffect } from 'react'
import useAxios from "@/hooks/useAxios";
import { useNavigate } from 'react-router-dom';
import axios from "@/api/axios";


const ClientDashboard = () => {

  const navigate = useNavigate();

  const [allClients,setallClients] = useState([]);
  const [Search,setSearch] = useState("");

  const titles = [
    { name: "Client NIC", width: "w-[200px]" },
    { name: "Client Name", width: "w-[200px]" },
    { name: "Email", width: "w-[200px]" },
    { name: "Phone number", width: "w-[200px]" },
    { name: "Status", width: "w-[200px]" },
    { name: "Options", width: "w-[200px]" },
  ];

  const [data, error, loading, axiosFetch] = useAxios()

  const getClients =()=>{
    axiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/contract/getClients`,
   });
 }
  

  const handleInput = (e)=>{

    const { name, value } = e.target;

    if (name === "searchData") {
      setSearch(value);
    }
    }

 

    useEffect(() => {
      if(error){
        alert(error)
      }
      else if (data) {
        setallClients(data);
      }
    }, [data]);
  
    useEffect(()=>{
      getClients()
    },[])
  
    if(loading){
      return(
        <h1>Loading ...</h1>
      )
    }

  return (
    <div className="w-full h-full py-5">
        <div className="flex items-center justify-center ">
            <h1 className=" text-[50px] font-bold ">Client Dashboard</h1>
        </div>
        <div className='flex justify-end'>
        <button className=" bg-red-500 px-5 py-2 rounded-xl " onClick={()=>{navigate(`/addClient`)}} >Add client</button>
        </div>

        <div className="flex items-center justify-center mb-10">
        <input
          type="text"
          className="bg-slate-400 px-4 py-3 rounded-l-md focus:outline-none w-[500px] placeholder-gray-950 text-[18px]"
          placeholder="Search eg:-NIC,Name,Email"
          name="searchData"
          onChange={handleInput}
        />
        <button
          className="px-4 py-3 bg-slate-500 text-white rounded-r-md hover:bg-slate-600 focus:outline-none text-[18px]"
          
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

      <div className="flex flex-col items-center w-full ">
        {allClients
          .filter((item) => {
            const searchLowerCase = Search.toLowerCase();
            const firstNameLowerCase = item.firstName.toLowerCase();
            const nicNumber = item.nicNumber.toString();
            const email = item.email.toLowerCase();
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
              className="grid grid-cols-6 text-center min-w-full bg-[#D9D9D9] my-2 p-2 items-center rounded-xl  text-[15px] "
            >
              <p className="w-[200px] ">NIC{item.nicNumber}</p>
              <p className="w-[200px]">
                {item.firstName} {item.lastName}
              </p>
              <p className="w-[200px]">{item.email}</p>
              <p className="w-[200px]">{item.phoneNumber}</p>
              <p className="w-[200px] text-green-500 font-bold">{item.status === "active" ? "Active" : "Offline"}</p>

              <div className="flex justify-center items-center w-[200px] gap-3  ">
                <button className=" bg-yellow-300 px-5 py-2 rounded-xl" onClick={()=>{navigate(`/viewClient/${item._id}`)}} >
                  View
                </button>
                <button className=" bg-green-600 px-5 py-2 rounded-xl" onClick={()=>{navigate(`/EditClient/${item._id}`)}}>
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>



    </div>
  )
}

export default ClientDashboard