import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from './data';
import { ReactToPrint } from 'react-to-print';

export const Kilometer_based = () => {
    const [rangeend, setRangeend] = useState(5000);
    const [search, setSearch] = useState('');
    const [applyFilter, setApplyFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items to display per page

    const resetState = () => {
        setRangeend(5000);
        setSearch('');
        setApplyFilter(false);
    };

    const handleFilterClick = () => {
        setApplyFilter(prevState => !prevState);
    };

    const componentRef = React.createRef();

    // Calculate index of the first and last item of the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the current page items from the data array
    const currentItems = data.filter(item => {
        return (
            search.toLowerCase() === '' ||
            item.category.toLowerCase().includes(search.toLowerCase()) ||
            item.vehicleRegister.toLowerCase().includes(search.toLowerCase())
        );
    })
    .filter(item => !applyFilter || (item.vrcost > rangeend && item.vrcost <= rangeend + 2000))
    .slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <main>
            <div className="flex items-center justify-evenly w-[800px] flex-col mt-2 mb-2 md:flex-row">
                <form>
                    <input
                        type='search'
                        placeholder='Type or Number'
                        className='p-2 rounded-lg text-center font-semibold bg-slate-100 outline-none'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <div className="flex gap-3 items-center">
                    <label className="font-semibold">Endrange :</label>
                    <input
                        type='number'
                        className='bg-slate-100 w-28 p-1 rounded-lg text-center'
                        value={rangeend}
                        onChange={(e) => setRangeend(parseInt(e.target.value))}
                    />
                </div>
                <button
                    type="button"
                    className="bg-red-500 text-white rounded-lg px-4 py-2"
                    onClick={resetState}
                >
                    Reset
                </button>
                <button
                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                    onClick={handleFilterClick}
                >
                    {applyFilter ? "Remove Filter" : "Apply Filter"}
                </button>
                <ReactToPrint
                    trigger={() => (
                        <button className="bg-blue-500 text-white rounded-lg px-4 py-2">Generate a Report</button>
                    )}
                    content={() => componentRef.current}
                />
            </div>
            <div ref={componentRef}>
                <table className='border-separate border-spacing-2 overflow-hidden'>
                    <thead>
                        <tr>
                            <th className='border border-slate-700 rounded-md p-2'>No</th>
                            <th className='border border-slate-700 rounded-md p-2'>Vehicle Type</th>
                            <th className='border border-slate-700 rounded-md p-2'>Number Plate</th>
                            <th className='border border-slate-700 rounded-md p-2'>Last Mileage</th>
                            <th className='border border-slate-700 rounded-md p-2'>Status</th>
                            <th className='border border-slate-700 rounded-md p-2'>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item._id} className='h-8 '>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {item.category}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {item.vehicleRegister}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {item.vrcost}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {item.vrcost <= rangeend ? (
                                            <p className='bg-blue-100 font-semibold'>Done</p>
                                        ) : item.vrcost <= rangeend + 2000 ? (
                                            <p className='bg-yellow-100 font-semibold'>Under Range</p>
                                        ) : (
                                            <p className='bg-red-100 font-semibold'>Still Not Close to Range</p>
                                        )}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className="flex justify-center gap-x-4">
                                            <Link to=''>
                                                <button className='border bg-blue-500 text-zinc-50 rounded-lg p-1 mt-2 mb-2 mr-1 ml-1'>Add a Note</button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='text-center'>No Service Records available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
    {data.length > itemsPerPage && (
        <ul className="pagination flex gap-3  ">
            {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(number => (
                <li key={number} className={`page-item bg-slate-100 rounded-lg p-1 ${currentPage === number + 1 ? 'active bg-slate-400 p-1' : ''}`}>
                    <button onClick={() => paginate(number + 1)} className={`page-link ${currentPage === number + 1 ? 'active-button' : ''}`}>{number + 1}</button>
                </li>
            ))}
        </ul>
    )}
</div>


        </main>
    );
};
