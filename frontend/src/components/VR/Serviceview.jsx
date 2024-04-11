import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';

export const Serviceview = () => {
    const [ error, loading, axiosFetch] = useAxios();
    const [services, setServices] = useState([]);
    const [data ,setDate] = useState();
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



  
    // const getData = async () => {
    //   await axiosFetch({
    //     axiosInstance: axios,
    //     method: "GET",
    //     url: "/vehicleService/getservices",
    //   });
    // };
  
    // useEffect(() => {
    //   getData();
    // }, []);
  
    // useEffect(() => {
    //   if (data && data.length > 0) {
    //     setServices(data);
    //   }
    // }, [data]);
  
    // if (loading) {
    //   return <p>Loading...</p>;
    // }
  
    return (
      <table className='border-separate border-spacing-2 mb-16'>
        <thead>
          <tr>
            <th className='border border-slate-700 rounded-md p-2'>No</th>
            <th className='border border-slate-700 rounded-md  p-2'>Vehicle Type</th>
            <th className='border border-slate-700 rounded-md  p-2'>Number Plate</th>
            <th className='border border-slate-700 rounded-md  p-2'>Time(From - To)</th>
            <th className='border border-slate-700 rounded-md  p-2'>Status</th>
            <th className='border border-slate-700 rounded-md p-2'>Options</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id} className='h-8 '>
                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                <td className='border border-slate-700 rounded-md text-center'>{item.vehicleRegister.vehicleRegister}</td>
                <td className='border border-slate-700 rounded-md text-center'>{item.servicedate}</td>
                <td className='border border-slate-700 rounded-md text-center'>{item.lastmilage}</td> {/* Assuming you have logic to format servicedate */}
                <td className='border border-slate-700 rounded-md text-center'>
                  {item.Snote}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {/* Logic to display Status based on data structure */}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className="flex justify-center gap-x-4 pr-3 pl-3 p-1">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className='text-center'>
                No Maintenance Records available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
