import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import axios from "@/api/axios";
import { useNavigate } from 'react-router-dom';



const GenerateReport = () => {

    const navigate = useNavigate()
    const chartRef = useRef(null);
    const [contractCounts, setContractCounts] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [maxContracts, setMaxContracts] = useState(0);
    const [allContracts,setAllContract] = useState([]);
    const [clients,setallClients] = useState([])

    const [data, error, loading, axiosFetch] = useAxios();
    const [clientsdata, clienterror, clientloading, clientsFetch] = useAxios()



    const titles = [
        { name: "Client NIC", width: "w-[200px]" },
        { name: "Client Name", width: "w-[300px]" },
        { name: "Email", width: "w-[300px]" },
        { name: "Status", width: "w-[440px]" },
        { name: "Options", width: "w-[400px]" },
      ];

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

    console.log(clientsdata)

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

    return (
        <div className='flex flex-col justify-center '>
            <div className="flex items-center justify-center mb-5">
                <h1 className=" text-[50px] font-bold ">Report</h1>
            </div>

            
            <div className='w-full h-[700px]'>
            <canvas
                id="contractHistogram"
                ref={chartRef}
                onClick={handleMonthClick}
                
            ></canvas>
            </div>


            <div>

            <div className="flex items-left mb-5">
        <h1 className=" text-[50px] font-bold ">clients</h1>
      </div>

            <div className="flex flex-col justify-center">
        <div className=" grid grid-cols-6 w-full ">
          {titles.map((item, index) => (
            <p
              key={index}
              className={`${item.width} text-center font-bold text-[18px] ml-4`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>


            <div className="flex flex-col items-center ">
        {clientsdata && clientsdata.length > 0  ? clientsdata
          //.filter((item) => {
          //  const searchLowerCase = Search.toLowerCase();
          //  const firstNameLowerCase = item.clientID.firstName.toLowerCase();
          //  const lastNameLowerCase = item.clientID.lastName.toLowerCase();
          //  const nicNumber = item.clientID.nicNumber.toString();
          //  const email = item.clientID.email.toLowerCase();
          //  return (
           //   searchLowerCase === "" ||
           //   firstNameLowerCase.includes(searchLowerCase) ||
           //   lastNameLowerCase.includes(searchLowerCase) ||
           //   nicNumber.includes(searchLowerCase) ||
           //   email.includes(searchLowerCase)
//);
        //  })
          .map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 text-center w-full bg-[#D9D9D9] my-2 p-2 items-center rounded-xl  text-[15px]"
            >
              <p className="w-[200px] ">NIC{item.nicNumber}</p>
              <p className="w-[200px]">
                {item.firstName} {item.lastName}
              </p>
              <p className="w-[200px]">{item.email}</p>
              <p className="w-[200px] ml-6 text-green-500 font-semibold">{item.status}</p>

              <div className="flex justify-center items-center w-[200px] gap-3">
              <button
              className={" bg-orange-400 w-[160px]   px-5 py-2 rounded-xl"}
              onClick={()=>{navigate(`/PrintReport/${item._id}`)}}
            >
             Generate Report
            </button>
              </div>
            </div>
          )):(<div className="mt-10 font-bold text-red-500">
            <p>No contracts available</p>
            </div>)}
            </div>
            </div>
        </div>


    );
}

export default GenerateReport;