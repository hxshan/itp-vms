import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import axios from "@/api/axios";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";



const GenerateReport = () => {

    const navigate = useNavigate()
    const chartRef = useRef(null);
    const [contractCounts, setContractCounts] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [maxContracts, setMaxContracts] = useState(0);
    const [allContracts,setAllContract] = useState([]);
    const [clients,setallClients] = useState([])
    const [itemsPerPage] = useState(5); 
    const [currentPage, setCurrentPage] = useState(1);
    const [results, setResults] = useState([]);

    const [Search,setSearch] = useState("");
  const [searchError,setSearchError] = useState('')

    const [data, error, loading, axiosFetch] = useAxios();
    const [clientsdata, clienterror, clientloading, clientsFetch] = useAxios()

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    const titles = ["Client NIC", "Client Name" , "Email", "Phone number", "Status", "Options"]

    const getContracts = () => {
        axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/contract/getAllContracts`,
        });
    }

    const getClients =()=>{
        clientsFetch({
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

    useEffect(() => {
        getContracts();
        getClients();
    }, []);

    useEffect(() => {
        if(clienterror){
          alert(clienterror)
        }
        else if (clientsdata) {
          setallClients(clientsdata);
          setResults(clientsdata);
        }
      }, [clientsdata]);

    useEffect(() => {
        if (data) {
            setAllContract(data)
            const countContractsByMonth = () => {
                const counts = {};
                let max = 0;
                data.forEach(contract => {
                    const year = new Date(contract.DateCreated).getFullYear();
                    const month = new Date(contract.DateCreated).getMonth() + 1;
                    const key = `${year}-${month}`;
                    counts[key] = (counts[key] || 0) + 1;
                    if (counts[key] > max) {
                        max = counts[key];
                    }
                });
                setMaxContracts(max);
                setContractCounts(counts);
            };
            countContractsByMonth();
        }

    }, [data]);

    useEffect(() => {
        if (chartRef.current && Object.keys(contractCounts).length !== 0) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                let sortedLabels = Object.keys(contractCounts).sort(); // Sort labels based on year and month
                const labels = sortedLabels.map(label => {
                    const [year, month] = label.split('-');
                    return `${month}/${year}`;
                });
                const data = Object.values(contractCounts);

                // Check if a previous chart exists and destroy it before creating a new one
                if (chartRef.current.chart) {
                    chartRef.current.chart.destroy();
                }

                // Create a new chart instance
                chartRef.current.chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Contracts Made',
                                data: data,
                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Number of Contracts',
                                },
                                ticks: {
                                    stepSize: 1,
                                    max: maxContracts + 1, // Add 1 to ensure max value fits
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Month/Year',
                                },
                            },
                        },
                    },
                });
            }
        }
    }, [contractCounts, maxContracts]);

    const handleMonthClick = (event) => {
        const activeElement = chartRef.current.chart.getElementsAtEvent(event)[0];
        if (activeElement) {
            const label = activeElement.label;
            setSelectedMonth(label.split('/')[0]); // Extract month from label
            setSelectedYear(label.split('/')[1]); // Extract year from label
        }
    };

    const handleNextYear = () => {
        // Increment selected year by 1
        setSelectedYear(prevYear => {
            return parseInt(prevYear) + 1;
        });
    };

    const handlePreviousYear = () => {
        // Decrement selected year by 1
        setSelectedYear(prevYear => {
            return parseInt(prevYear) - 1;
        });
    };

    if(loading || clientloading){
        return(
          <div className="flex justify-center items-center h-screen">
            <div className="sweet-loading">
              <ClipLoader color="#10971D" loading={true}  size={50} />
            </div>
          </div>
        );
      }

    return (
        <div className='flex flex-col justify-center '>
            <div className="flex items-center justify-center mb-5 border-b-2">
                <h1 className=" text-[50px] font-bold ">Report</h1>
            </div>

            
            <div className='w-full h-[500px]'>
            <canvas
                id="contractHistogram"
                ref={chartRef}
                onClick={handleMonthClick}
                
            ></canvas>
            </div>


            <div>

            <div className="flex items-left mb-5 border-b-2">
        <h1 className=" text-[50px] font-bold ">clients</h1>
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

      <table className="min-w-full divide-y divide-gray-200 mb-5">
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
        <tr className="bg-white border-t border-gray-200" key={row._id}>
          <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">NIC {row.nicNumber}</td>
          <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.firstName} {row.lastName}</td>
          <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.email}</td>
          <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{row.phoneNumber}</td>
          <td className={`px-2 text-xs font-semibold text-center ${row.status=='active'?'text-green-500 bg-green-100': row.status=='inactive'?'text-red-600 bg-red-100':'text-orange-600 bg-orange-100'}`}>{row.status.toUpperCase()}</td>
          <td className="px-6 py-2 whitespace-nowrap justify-center gap-3 flex">
            <button className="bg-actionBlue text-white py-1 px-6 rounded-md" id={row._id} onClick={() => { navigate(`/viewClient/${row._id}`) }}>View</button>
            <button className="bg-actionGreen text-white py-1 px-6 rounded-md" onClick={()=>{navigate(`/PrintReport/${row._id}`)}}>Generate</button>
          </td>
        </tr>
      );
    }) : (
      <tr>
        <td colSpan={currentItems.length}>No data available</td>
      </tr>
    )
  }
</tbody>
      </table>

      <div className="flex justify-center my-6">
                <ul className="flex list-none border border-gray-300 rounded-md">
                    {Array.from({ length: Math.ceil(clients.length / itemsPerPage) }).map((_, index) => (
                        <li key={index} className={`cursor-pointer px-4 py-2 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`} onClick={() => paginate(index + 1)}>{index + 1}</li>
                    ))}
                </ul>
            </div>


            </div>
        </div>


    );
}

export default GenerateReport;