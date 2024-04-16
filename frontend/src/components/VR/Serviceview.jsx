import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';
import { ReactToPrint } from 'react-to-print';

export const Serviceview = () => {
  const [error, loading, axiosFetch] = useAxios();
  const [services, setServices] = useState([]);
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
    <main>
      <div className="flex flex-col items-center">
        <h1 className='font-bold text-xl mb-6'>
          Past Service Records
        </h1>  <ReactToPrint
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
      <div ref={componentRef}>
        <table className='w-full border-collapse   rounded-md pad shadow-xl p-5 mb-10 mt-5'>
          <thead className='bg-secondary text-white border-white'>
            <tr>
              <th className='border  p-2'>No</th>
              <th className='border  p-2'>Vehicle Number</th>
              <th className='border  p-2'>Date</th>
              <th className='border  p-2'>Last-Milage</th>
              <th className='border  p-2'>Expense</th>
              <th className='border  p-2'>Note</th>
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
                  <td className='border border-slate-700 rounded-md text-center p-2'>{item.Scost}</td>
                  <td className='border border-slate-700 rounded-md text-center p-2'>{item.Snote}</td>
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
        </table>
      </div>
    </main>
  );
};
