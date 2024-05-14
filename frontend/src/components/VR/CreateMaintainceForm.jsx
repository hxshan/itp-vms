import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';
import { Link } from 'react-router-dom';
import {
    validateVehicleType,
    // validateVehicleId,
    validateVehicleIssue,
    validateVehicleCost,
    validateAdditionalInfo,
    validateSDate,
    validateEDate

} from './validation';


export const CreateMaintainceForm = () => {
    const [files, setFiles] = useState([]);
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

        axios.post('http://localhost:3000/api/vehiclemaintain/createmainform', formdata)
            .then(response => {
                console.log('Submission successful:', response);
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
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    // Show message using alert
                    alert(error.response.data.message);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };


    const validateForm = () => {
        return (

            // validateVehicleId(formdata.vehicleRegister) &&
            validateVehicleIssue(formdata.vrissue) &&
            validateVehicleCost(formdata.vrcost) &&
            validateAdditionalInfo(formdata.vraddit) &&
            // validateSDate(formdata.vrsdate)&&
            validateEDate(formdata.vrsdate, formdata.vredate)
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

        <main className='w-full  flex flex-col justify-center items-center'>
            <div className=" sm:w-3/4 bg-white p-10 flex flex-col rounded-2xl ">
                <h1 className='font-bold text-xl'>
                    Create Maintaince Form
                </h1>
                <form className='flex flex-col gap-4 md:flex-row' onSubmit={handleSubmit}>
                    <div className="w-full">


                        <div className='flex flex-col gap-5 mt-9'>
                            <label className="block  text-md font-bold mb-2">Vehicle Number</label>
                            <input
                                type="text"
                                id='vehicleRegister'
                                placeholder='AAA1234 OR AA-1234 OR 12-1234'
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
                                required
                                onChange={handlechange}
                                value={formdata.vehicleRegister} />
                            <label className="block  text-md font-bold mb-2">Fault of the Vehicle</label>
                            <textarea
                                type="text"
                                id='vrissue'
                                placeholder='Ex:- Front Arm Vibartion '
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
                                required
                                onChange={handlechange}
                                value={formdata.vrissue} />
                            <label className="block  text-md font-bold mb-2">Estimated Cost</label>
                            <input
                                type="number"
                                id='vrcost'
                                placeholder='RS:-10,000'
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
                                required
                                onChange={handlechange}
                                value={formdata.vrcost} />
                        </div>

                        <div className="flex flex-col gap-5 mt-5">
                            <label className="block  text-md font-bold mb-2">Additional Info</label>
                            <textarea
                                type="text"
                                id='vraddit'
                                placeholder='Additional Info'
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
                                onChange={handlechange}
                                value={formdata.vraddit} />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col justify-center items-center w-full">

                        <div className="flex flex-col gap-5 mb-5 items-center">
                            <div className="flex items-center gap-4">
                                <label className="  text-md font-bold" >Start Date :</label>
                                <input type='date'
                                    id='vrsdate'
                                    className="shadow  rounded   p-2"
                                    onChange={handlechange}
                                    value={formdata.vrsdate} />
                            </div>
                            <div className="flex  items-center gap-4">
                                <label className="block  text-md font-bold mb-2">End Date :</label>
                                <input type='date'
                                    className="shadow  rounded   p-2"
                                    id='vredate'
                                    onChange={handlechange}
                                    value={formdata.vredate} />
                            </div>
                            <div className='flex gap-4 justify-between items-center'>
                                <label className="block  text-md font-bold mb-2">Availability:</label>
                                <select
                                    id='availability'
                                    className="shadow  rounded   p-2"
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
                <div className="flex justify-end  items-center mt-6">
                    <button onClick={handleSubmit}
                        className="bg-actionBlue py-2 px-3 rounded-md text-white font-bold mr-5">
                        Add To Maintaince List
                    </button>
                    <Link to={`/Mdashboard`}>
                        <button className="my-1 mx-1 text-white bg-actionGreen py-2 px-3 rounded-md font-bold">Back</button>
                    </Link>
                </div>
            </div>
        </main>

    )
}
