import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';
import { ReactToPrint } from 'react-to-print';
import { ClockLoader } from "react-spinners";
import { Pie } from 'react-chartjs-2';

export const MaintainOrderTable = () => {
    const [data, error, loading, axiosFetch] = useAxios();
    const [maintains, setMaintains] = useState([]);
    const currentDate = new Date();
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(currentDate);
    const [applyFilter, setApplyFilter] = useState(false);
    const [applyFilter2, setApplyFilter2] = useState(false);
    const [search, setSearch] = useState('');

    const getData = async () => {
        await axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: "/vehiclemaintain/allmaintains/",
        });
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (data && data.length > 0)
            setMaintains(data);
    }, [data]);

    const resetState = () => {
        setSearch('');
        setStartDate(currentDate);
        setEndDate(currentDate);
        setApplyFilter(false);
        getData();
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center h-full bg-white">
                <ClockLoader
                    color="#36d7b7"
                    height={50}
                    width={10}
                />
            </div>
        );
    }

    const handleFilterClick = () => {
        setApplyFilter(prevState => !prevState);
    };

    const handleFilterClick2 = () => {
        setApplyFilter2(true);
        filterData(startDate, endDate);
    };

    const filterData = (start, end) => {
        if (!start || !end) return;

        const filteredData = maintains.filter(item => {
            const itemDate = new Date(item.vrsdate);
            return itemDate >= start && itemDate <= end;
        });
        setMaintains(filteredData);
    };

    const deleteData = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete the following?")) {
            await axiosFetch({
                axiosInstance: axios,
                method: "DELETE",
                url: `vehiclemaintain/${e.target.id}`,
            });
            window.location.reload('/Mdashboard');
        }
    };

    const prepareChartData = (maintains) => {
        const counts = {
            UnderMaintenance: 0,
            Done: 0,
            RequestsFromDriver: 0
        };

        maintains.forEach(item => {
            const sDate = new Date(item.vrsdate);
            const eDate = item.vredate ? new Date(item.vredate) : null; 
            if (sDate > currentDate) {
                counts.UnderMaintenance++;
            } else if (!eDate) { 
                counts.RequestsFromDriver++;
            } else {
                counts.Done++;
            }
        });

        return {
            labels: ['Under Maintenance', 'Done', 'Requests From Driver'],
            datasets: [{
                data: [counts.UnderMaintenance, counts.Done, counts.RequestsFromDriver],
                backgroundColor: ['#003f5c', '#7a5195', '#ef5675'],
                hoverBackgroundColor: ['#003f5c', '#7a5195', '#ef5675'],
            }]
        };
    };


    const chartData = prepareChartData(maintains);

    const componentRef = React.createRef();

    return (
        <div className="w-full flex flex-col justify-between md:w-full">
            <div className="flex flex-col ">
            <div ref={componentRef}>
                <div className="flex flex-col">
                <div className="flex justify-center items-center gap-3  rounded-md  m-0 p-3" >
                    <h1 className="text-center font-bold text-xl ">
                        Date Range :  From {new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </h1>
                    <h1 className="text-center font-bold text-xl ">
                        to {new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </h1>

                </div>
                <div className="border-b-4 border-black w-full mb-8"></div>

                <div className="flex m-5">
                    <div className=" w-[500px] h-[500px]">
                        <Pie data={chartData} />
                    </div>
                    <div className="w-1/3 flex flex-col h-full mt-32 ml-auto">
                        <div className='bg-gray-500 shadow-md rounded-md text-center p-5 mt-4  '><p className='font-bold text-white text-lg'>Done :</p> <p className='font-bold text-black '>{chartData.datasets[0].data[1]}</p></div>
                        <div className='bg-gray-500 shadow-md rounded-md text-center p-5 mt-2  '><p className='font-bold text-white text-lg'>Under Maintenance :</p> <p className='font-bold text-black '>{chartData.datasets[0].data[0]}</p></div>
                        <div className='bg-gray-500 shadow-md rounded-md text-center p-5 mt-2 '><p className='font-bold text-white text-lg'>Requests From Driver :</p> <p className='font-bold text-black '>{chartData.datasets[0].data[2]}</p></div>
                    </div>
                </div>
                </div>
                </div>
                <div className="flex justify-end mb-4 gap-2 flex-col md:flex-row">
                    <form>
                        <input
                            type='search'
                            placeholder='Search By Number'
                            className='mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 '
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                        className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 "
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                        className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 "
                    />
                    <button
                        type="button"
                        className="bg-actionRed font-bold text-white rounded-lg px-4 mb-3"
                        onClick={resetState}
                    >
                        Reset
                    </button>
                </div>
                <div className="flex gap-4 justify-start mb-6 ">
                    <button
                        className="bg-actionBlue text-white rounded-lg px-4 py-2 "
                        onClick={handleFilterClick2}
                    >
                        Apply Filter
                    </button>
                    <button
                        className="bg-actionBlue text-white rounded-lg px-4 py-2"
                        onClick={handleFilterClick}
                    >
                        {applyFilter ? "Done" : "All Records"}
                    </button>
                    <ReactToPrint
                        trigger={() => (
                            <button
                                className="bg-actionRed text-white rounded-lg px-4 py-2"
                            >
                                Generate a Report
                            </button>
                        )}
                        content={() => componentRef.current}
                    />
                </div>
            </div>
            
                

                <table className='w-full border-collapse   rounded-md pad shadow-xl p-5 mb-10'>
                    <thead className='bg-secondary text-white border-white'>
                        <tr>
                            <th className='border p-2'>Number Plate</th>
                            <th className='border  p-2'>Time(From - To)</th>
                            <th className='border  p-2'>Status</th>
                            <th className='border  p-2'>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintains && maintains.length > 0 ? (
                            maintains.filter((item) => {
                                return search.toLowerCase() === '' ? item : item.vrvehicleRegister.toLowerCase().includes(search)
                                    || search.toUpperCase() === '' ? item : item.vrvehicleRegister.toUpperCase().includes(search);
                            }).map((item, index) => {
                                const sDate = new Date(item.vrsdate);
                                const eDate = new Date(item.vredate);
                                if (!item.vredate) {
                                    return null;
                                }
                                if (applyFilter &&
                                    !(sDate < currentDate && eDate < currentDate)
                                ) {
                                    return null;
                                }
                                return (
                                    <tr key={item._id} className='h-8 '>
                                        <td className='border border-slate-700 rounded-md text-center'>{item.vrvehicleRegister}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            {new Date(item.vrsdate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} to {new Date(item.vredate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                        </td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            {sDate > currentDate ? (
                                                <p className='bg-red-200 text-red-800 font-semibold rounded-md mx-4'>To be Maintaine</p>
                                            ) : (
                                                <p className='bg-green-200 text-green-800 font-semibold rounded-md mx-4'>Done</p>
                                            )}
                                        </td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            <div className="flex justify-center gap-x-4 pr-3 pl-3 p-1">
                                                <Link to={`/view/${item._id}`}>
                                                    <button className="my-1 mx-1 bg-actionBlue text-white py-1 px-4 rounded-md text-sm">View</button>
                                                </Link>
                                                <Link to={`/vehiclemaintain/edit/${item._id}`}>
                                                    <button className="my-1 mx-1 bg-actionGreen text-white py-1 px-4 rounded-md text-sm">Edit</button>
                                                </Link>
                                                <button className="my-1 mx-1 bg-actionRed text-white py-1 px-4 rounded-md text-sm" id={item._id} onClick={deleteData}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className='text-center'>
                                    No Maintenance Records available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
           
        </div>
    );
};
