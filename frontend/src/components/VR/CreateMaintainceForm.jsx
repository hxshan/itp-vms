import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';

import {
    validateVehicleType,
    validateVehicleId,
    validateVehicleIssue,
    validateVehicleCost,
    validateAdditionalInfo,
    validateSDate,
    validateEDate

} from './validation';


export const CreateMaintainceForm = () => {
    const [files, setFiles] = useState([]);
    const [searchinput, setSearchinput] = useState('');
    const [data, error, loading, axiosFetch] = useAxios()
    const currentDate = new Date().toISOString().split('T')[0];


    const [formdata, setFormdata] = useState({
        //type change into category
        
        vehicleRegister: '',
        vrissue: '',
        vrcost: '',
        vraddit: '',
        vrsdate: currentDate,
        vredate: '',
        availability: 'Unavailable'
    });

    const navigate = useNavigate();
    const handleSubmit = () => {
        if (!validateForm()) {
            // If validation fails, display an alert
            alert('Please fill in all required fields.');
            return;
        }
        // Assuming you want to submit formdata somewhere using Axios
        axios.post('http://localhost:3000/api/vehiclemaintain/createmainform', formdata)
            .then(response => {
                console.log('Submission successful:', response);
                // Optionally, you can reset the form after successful submission
                setFormdata({
                   
                    vehicleRegister: '',
                    vrissue: '',
                    vrcost: '',
                    vraddit: '',
                    vrsdate: '',
                    vredate: '',
                    availability: 'Unavailable'
                });

                navigate('/Mdashboard');
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Handle errors here
            });
    };


    const validateForm = () => {
        return (
           
            validateVehicleId(formdata.vehicleRegister) &&
            validateVehicleIssue(formdata.vrissue) &&
            validateVehicleCost(formdata.vrcost) &&
            validateAdditionalInfo(formdata.vraddit)&&
            // validateSDate(formdata.vrsdate)&&
            validateEDate(formdata.vrsdate,formdata.vredate)
        );
    };
    const handlechange = (e) => {
       
        if (e.target.id === 'vehicleRegister' || e.target.id === 'vrissue' || e.target.id === 'vrcost' || e.target.id === 'vraddit' || e.target.id === 'vrsdate' || e.target.id === 'vredate') {
            setFormdata({
                ...formdata,
                [e.target.id]: e.target.value
            })
        }
        if (e.target.id === 'availability') {
            setFormdata({
                ...formdata,
                availability: e.target.value
            });
        }
    }


    const handleImageSubmit = () => {

    }

    return (

        <main className='w-full  flex flex-col justify-center items-center bg-slate-200'>
            <h1 className='text-3xl font-semibold  my-9'>
                Create Maintaince Form
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
                            <label className='  font-semibold  '>Fault of the Vehicle</label>
                            <textarea
                                type="text"
                                id='vrissue'
                                placeholder='Ex:- Front Arm Vibartion '
                                className='border p-2 rounded-lg'
                                required
                                onChange={handlechange}
                                value={formdata.vrissue} />
                            <label className='  font-semibold  '>Estimated Cost</label>
                            <input
                                type="number"
                                id='vrcost'
                                placeholder='RS:-10,000'
                                className='border p-2 rounded-lg'
                                required
                                onChange={handlechange}
                                value={formdata.vrcost} />
                        </div>

                        <div className="flex flex-col gap-5 mt-5">
                            <label className='  font-semibold  '>Additional Info</label>
                            <textarea
                                type="text"
                                id='vraddit'
                                placeholder='Additional Info'
                                className='border p-2 rounded-lg'
                                onChange={handlechange}
                                value={formdata.vraddit} />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col justify-center items-center w-full">

                        <div className="flex flex-col gap-5 mb-5 items-center">
                            <div className="flex items-center gap-4">
                                <label className='  font-semibold' >Start Date :</label>
                                <input type='date'
                                    id='vrsdate'
                                    className='rounded-lg p-2'
                                    onChange={handlechange}
                                    value={formdata.vrsdate} />
                            </div>
                            <div className="flex  items-center gap-4">
                                <label className='  font-semibold'>End Date :</label>
                                <input type='date'
                                    className='rounded-lg p-2'
                                    id='vredate'
                                    onChange={handlechange}
                                    value={formdata.vredate} />
                            </div>
                            <div className='flex gap-4 justify-between items-center'>
                            <label className='  font-semibold'>Availability :</label>
                            <select
                                id='availability'
                                className='rounded-lg p-2'
                                onChange={handlechange}
                                value={formdata.availability}>
                                <option value='available'>Available</option>
                                <option value='Unavailable'>Unavailable</option>
                            </select>
                        </div>
                        </div>
                        <p className='font-medium'>
                            Format Images :
                            <span
                                className='text-slate-600 font-normal'>
                                If Have any Report or Document
                            </span>
                        </p>

                        <div className="flex gap-4">
                            <input
                                type="file"
                                id='vrdocument'
                                accept='image/*'
                                multiple
                                className='p-3 border border-gray-800 w-full rounded-lg'
                                onChange={(e) => setFiles(e.target.files)} />
                            <button
                                className='p-3 border border-green-600 rounded-lg font-semibold text-green-600 hover:shadow-lg disabled:opacity-50'
                                type='button'
                                onClick={handleImageSubmit}>
                                Upload
                            </button>
                        </div>
                    </div>
                </form>
                <button onClick={handleSubmit}
                    className='hover:opacity-80 mt-10 bg-slate-800 p-3 rounded-lg text-white font-bold'>
                    Add To Maintaince List
                </button>

            </div>
        </main>

    )
}
