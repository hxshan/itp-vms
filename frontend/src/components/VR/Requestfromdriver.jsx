import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';
import { ReactToPrint } from 'react-to-print';

export const Requestfromdriver = () => {
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
        return <p className="flex flex-col items-center justify-center h-screen text-center text-3xl font-bold text-black">Loading...</p>;
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

    const componentRef = React.createRef();

    return (
        <div className="w-full flex flex-col items-center md:w-full">
             <h1 className='font-bold text-3xl mt-3 mb-5'>Reuests from Driver</h1>
            <div className="flex flex-col ">
                <div className="flex gap-7 items-center mb-3  flex-col md:flex-row">
                    <form>
                        <input
                            type='search'
                            placeholder='Search By Number'
                            className='p-2 rounded-lg text-center font-semibold bg-slate-50 outline-none'
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                        className="p-2 rounded-lg text-center font-semibold bg-slate-50 outline-none"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                        className="p-2 rounded-lg text-center font-semibold bg-slate-50 outline-none"
                    />
                    <button
                        type="button"
                        className="bg-red-500 text-white rounded-lg px-4 py-2"
                        onClick={resetState}
                    >
                        Reset
                    </button>
                </div>
                <div className="flex gap-7 items-center mb-3 justify-evenly">
                    <button
                        className="bg-blue-500 text-white rounded-lg px-4 py-2"
                        onClick={handleFilterClick2}
                    >
                        Apply Filter
                    </button>
                    <button
                        className="bg-blue-500 text-white rounded-lg px-4 py-2"
                        onClick={handleFilterClick}
                    >
                        {applyFilter ? "Done" : "All Records"}
                    </button>
                    <ReactToPrint
                        trigger={() => (
                            <button
                                className="bg-blue-500 text-white rounded-lg px-4 py-2"
                            >
                                Generate a Report
                            </button>
                        )}
                        content={() => componentRef.current}
                    />
                </div>
            </div>
            <div ref={componentRef}>
                <div className="flex justify-center items-center gap-3 bg-slate-50 shadow-lg rounded-md  m-5 p-3" >  <h1 className="text-center font-semibold text-2xl "> Date Range :  From {new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</h1>
                    <h1 className="text-center font-semibold text-2xl "> to {new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</h1>
                </div>
                <table className='border-separate border-spacing-2 mb-16 shadow-xl rounded-lg w-[760px] mt-10'>
                    <thead>
                        <tr>
                            <th className='border border-slate-700 rounded-md p-2'>Number Plate</th>
                            <th className='border border-slate-700 rounded-md p-2'>Date</th>
                            <th className='border border-slate-700 rounded-md p-2'>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintains && maintains.length > 0 ? (
                            maintains.filter((item) => {
                                return search.toLowerCase() === '' ? item : item.vrvehicleRegister.toLowerCase().includes(search)
                                    || search.toUpperCase() === '' ? item : item.vrvehicleRegister.toUpperCase().includes(search);
                            }).map((item, index) => {
                                const sDate = new Date(item.vrsdate);
                                const eDate = new Date(item.vrsdate);
                                if (applyFilter &&
                                    !(sDate < currentDate && eDate < currentDate)
                                ) {
                                    return null;
                                }
                            
                                if (!item.vrcost || !item.vraddit || !item.vredate) {
                                    return (
                                        <tr key={item._id} className='h-8 '>
                                            <td className='border border-slate-700 rounded-md text-center p-2'>{item.vrvehicleRegister}</td>
                                            <td className='border border-slate-700 rounded-md text-center p-2'>
                                                {new Date(item.vrsdate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                            </td>
                                            <td className='border border-slate-700 rounded-md text-center p-2'>
                                                <div className="flex justify-center gap-x-4 pr-3 pl-3 p-1">
                                                
                                                    <Link to={`/vehiclemaintain/edit/${item._id}`}>
                                                        <button className='border bg-green-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Update</button>
                                                    </Link>
                                                    <button className='border bg-red-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2' id={item._id} onClick={deleteData}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                } 
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
        </div>
    );
};
