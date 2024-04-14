import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const AddContractpopup = ({isOpen,TogleOpen,clients}) => {

    const navigate = useNavigate()



    const [Search, SetSearch] = useState("");
    const [searchError,setSearchError] = useState('')

    const handleInput = (e) => {
        const { name, value } = e.target;
    
        if (name === "searchData") {
          SetSearch(value);
        }
      };

      const handleSearch = () => {
        const filteredContracts = clients.filter(client =>
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
    

    const titles = [
        { name: "Client NIC", width: "w-[200px]" },
        { name: "Client Name", width: "w-[200px]" },
        { name: "Email", width: "w-[200px]" },
        { name: "Options", width: "w-[200px]" },
      ];


  return (
    <div className={`${isOpen ? '': 'hidden'} flex flex-col bg-dimWhite fixed left-0 pt-[20px] items-center w-full h-screen  `}>

        <div className='flex bg-white flex-col ml-[260px] h-fit py-4 rounded-lg w-[1000px]' onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center mb-4 ">
            <h1 className=" text-[20px] font-bold ">Choose a Client</h1>
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
      <div className=" text-blue-500 font-semibold  px-12">
        <p>{searchError ? searchError : "Search something"}</p>
      </div>

      <div className='px-12 py-2'>
        <p className=' text-red-600'>*Note these clients do not have a contract</p>
      </div>

        <div className="flex flex-col justify-center px-12">
        <div className=" grid grid-cols-4 w-full ">
          {titles.map((item, index) => (
            <p
              key={index}
              className={`${item.width} text-center font-semibold text-[16px]`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>

        <div className="flex flex-col items-center px-12 h-[320px] overflow-y-auto">
        {clients ? clients
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
          .map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 text-center w-full bg-[#D9D9D9] my-2 p-2 items-center rounded-xl  text-[15px] "
            >
              <p className="w-[200px] ">NIC{item.nicNumber}</p>
              <p className="w-[200px]">
                {item.firstName} {item.lastName}
              </p>
              <p className="w-[200px]">{item.email}</p>

              <div className="flex justify-center items-center w-[200px] gap-3">
                <button className={` bg-yellow-300  px-5 py-2 rounded-xl`} onClick={()=> navigate(`/viewClient/${item._id}`)}>
                  View
                </button>
                <button className={` bg-red-500 px-5 py-2 rounded-xl`} onClick={()=>{navigate(`/Contract/${item._id}`)}}>
                  Add
                </button>
              </div>
            </div>
          )) : <div>No available clients for contract</div>}
      </div>


          <div className='flex justify-center '>
      <button className=" bg-orange-600 px-5 py-2 rounded-xl w-[120px]" onClick={TogleOpen}>
              Close
            </button>
            </div>

        </div>
    </div>
    
  )
}

export default AddContractpopup