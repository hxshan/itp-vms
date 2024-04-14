import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';

export const Servicenote = () => {

    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split('T')[0];

    const [formdata, setFormdata] = useState({
        vehicleRegister: '',
        servicedate:currentDate,
        lastmilage:'',
        Snote: '',
        Scost: '',
    });

    

    const handleSubmit = () => {
        // if (!validateForm()) {
        //     // If validation fails, display an alert
        //     alert('Please fill in all required fields.');
        //     return;
        // }
        // Assuming you want to submit formdata somewhere using Axios

        axios.post('http://localhost:3000/api/vehicleService/addservicenote', formdata)
            .then(response => {
                console.log('Submission successful:', response);
                // Optionally, you can reset the form after successful submission
                
                setFormdata({
                    vehicleRegister: '',
                    Snote: '',
                    servicedate:'',
                    lastmilage:'',
                    Scost: '',
                });

                navigate('/VehicleServiceList');
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Handle errors here
            });
    };
    const handlechange = (e) => {
       
        if (e.target.id === 'vehicleRegister' || e.target.id === 'Snote' || e.target.id === 'Scost' || e.target.id === 'servicedate' || e.target.id === 'lastmilage' ) {
            setFormdata({
                ...formdata,
                [e.target.id]: e.target.value
            })
        }
    }
    return (
    
        <main className='w-full  flex flex-col justify-center items-center bg-slate-200'>
        <h1 className='text-3xl font-semibold  my-9'>
           Add Service Note
        </h1>
        <div className=" sm:w-3/4 bg-slate-300 p-10 flex flex-col rounded-2xl ">
            <form className='flex flex-col gap-4 md:flex-row' onSubmit={handleSubmit}>
                <div className="w-full">

                   
                    <div className='flex flex-col gap-5 mt-9'>
                        <label className='  font-semibold  '>Vehicle Number</label>
                        <input
                            type="text"
                            id='vehicleRegister'
                            placeholder='AAA1234 OR AA-1234 OR 12-1234'
                            className='border p-2 rounded-lg'
                            maxLength='7'
                            required
                            onChange={handlechange}
                            value={formdata.vehicleRegister} />
                            <label className='  font-semibold  '>Date :</label>
                        <input
                            type="date"
                            id='servicedate'
                            className='border p-2 rounded-lg'
                            required
                            onChange={handlechange}
                            value={formdata.servicedate} />
                            <label className='  font-semibold  '>Last-Milage :</label>
                        <input
                            type="number"
                            id='lastmilage'
                            placeholder='10000km'
                            className='border p-2 rounded-lg'
                            required
                            onChange={handlechange}
                            value={formdata.lastmilage} />
                        <label className='  font-semibold  '>Service Note :</label>
                        <textarea
                            type="text"
                            id='Snote'
                            placeholder=' '
                            className='border p-2 rounded-lg'
                            required
                            onChange={handlechange}
                            value={formdata.Snote} />
                        <label className='  font-semibold  '>Cost :</label>
                        <input
                            type="number"
                            id='Scost'
                            placeholder='RS:-10,000'
                            className='border p-2 rounded-lg'
                            required
                            onChange={handlechange}
                            value={formdata.Scost} />
                    </div>
                    
                </div>
            </form>
            <button onClick={handleSubmit}
                className='hover:opacity-80 mt-10 bg-slate-800 p-3 rounded-lg text-white font-bold'>
                Add Service Note
            </button>

        </div>
    </main>

  )
}
