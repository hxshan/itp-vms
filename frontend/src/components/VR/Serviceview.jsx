import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';
import { ReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';

export const Serviceview = () => {

  const [data, setDate] = useState();
  const { id } = useParams();


  useEffect(() => {
    axios.get(`http://localhost:3000/api/vehicleService/getservices/${id}`)
      .then(response => {
        setDate(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const componentRef = React.createRef();

  return (
    <main className='w-full'>
      <div className="flex  items-center justify-between">
        <div className="">
          <h1 className='font-bold text-xl mb-6'>
            Past Service Records
          </h1>
        </div>
        <div className='flex ml-1.5 gap-4 '>
          <Link to={`/VehicleService`}>
            <button className=" bg-actionBlue text-white rounded-lg px-4 py-2">Back</button>
          </Link>
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
      <div className="border-b-4 border-black w-full mb-8 dark:border-white"></div>
      <div ref={componentRef}>
        <div className='w-full  rounded-md  '>
          {data && data.length > 0 && (
            <h1 className='bg-slate-300 text-center p-2 shadow-xl font-bold dark:text-black rounded-t-xl text-xl w-full'>Past Services of vehicle Number : {data[0].vehicleRegister.vehicleRegister}</h1>
          )}
        </div>
        <table className='w-full border-collapse   rounded-md pad shadow-xl p-5 mb-10 mt-5'>
          <thead className='bg-secondary text-white border-white'>
            <tr>
              <th className='border  p-2'>No</th>
              <th className='border  p-2'>Vehicle Number</th>
              <th className='border  p-2'>Date</th>
              <th className='border  p-2'>Last-Milage</th>
              <th className='border  p-2'>Expense</th>
              <th className='border  p-2'>Note</th>
              <th className='border  p-2'>limit</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item._id} className='h-8 '>
                  <td className='border border-slate-700 rounded-md text-center p-2'>{index + 1}</td>
                  <td className='border border-slate-700 rounded-md text-center p-2'>{item.vehicleRegister.vehicleRegister}</td>
                  <td className='border border-slate-700 rounded-md text-center p-2'>{new Date(item.servicedate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}</td>
                  <td className='border border-slate-700 rounded-md text-center p-2'>{item.lastmilage}km</td>
                  <td className='border border-slate-700 rounded-md text-center p-2'>Rs.{item.Scost}</td>
                  <td className='border border-slate-700 rounded-md text-center p-2'>{item.Snote}</td>
                  <td className='border border-slate-700 rounded-md text-center p-2'>{item.kilometerLimit}Km</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className='text-center p-3'>
                  No Maintenance Records available
                </td>
              </tr>
            )}
          </tbody>
          {Array.isArray(data) && data.length > 0 && (
            <tfoot>
              <td colSpan="4" className='border border-slate-700 rounded-md text-center p-2'>Total</td>
              <td className='border border-slate-700 rounded-md text-center p-2'>Rs.
                {data.reduce((total, item) => total + item.Scost, 0)}
              </td>
              <td colSpan="2" className='border border-slate-700 rounded-md text-center p-2'></td>
            </tfoot>
          )}

        </table>
      </div>
    </main>
  );
};
