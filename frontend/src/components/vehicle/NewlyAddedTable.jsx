import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const NewlyAddedTable = ({ category, categoryData }) => {


  if (categoryData.length === 0) {
    return <p className='mt-6 p-3 font-medium text-sm text-white bg-red-500 rounded-md pad mb-10'>Vehicles not found. </p>;
  }

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Vehicle Type', 'Vehicle Model', 'Vehicle Register', 'Add Date', 'Last Updated Date']],
      body: categoryData.map(vehicle => [
        vehicle.vehicleType,
        vehicle.vehicleModel,
        vehicle.vehicleRegister,
        new Date(vehicle.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        new Date(vehicle.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
      ]),
    });
    doc.save(`New_Vehicle_Table_Report.pdf`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(categoryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, `New_Vehicle_Table_Report.xlsx`);
  };

  return (
  <div className='flex flex-col p-0 mb-10 dark:text-white'> 
    <div className='mt-4' key={category}>
    
      <div className='p-4'>
      <h2 className='mb-2 text-xl font-bold '>New added vehicles</h2>
      <table className='w-full border-collapse border-spacing-2 border-black rounded-md pad shadow-xl p-5 mb-3'>
        <thead className='bg-secondary text-white'>
          <tr>
            <th className='border border-white p-2'>Vehicle Type</th>
            <th className='border border-white p-2'>Vehicle Model</th>
            <th className='border border-white p-2'>Vehicle Register</th>
            <th className='border border-white p-2'>Add Date</th>
            <th className='border border-white p-2'>last Updated Date</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((vehicle) => (
            <tr className="bg-white border-t border-gray-200 dark:bg-tablebackgroundDark" key={vehicle._id}>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{vehicle.vehicleType}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{vehicle.vehicleModel}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{vehicle.vehicleRegister}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{new Date(vehicle.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</td>
              <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold text-center">{new Date(vehicle.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className='flex justify-end mt-2'>
          <button onClick={exportToPdf} className='px-2 py-1 text-white bg-actionBlue h-fit hover:bg-gray-800 focus:outline-none rounded-md mr-4 text-xs font-semibold'>
            Export to PDF
          </button>
          <button onClick={exportToExcel} className='px-2 py-1 text-white bg-actionBlue h-fit hover:bg-gray-800 focus:outline-none rounded-md mr-4 text-xs font-semibold'>
            Export to Excel
          </button>
         </div>
      </div>
      
  </div>
  );
};

export default NewlyAddedTable