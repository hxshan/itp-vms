import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';
import { Link } from 'react-router-dom';
import {

    // validateVehicleId,
    validateVehicleIssue,
    validateVehicleCost,
    validateAdditionalInfo,
    validateSDate,
    validateEDate

} from './validation';


export const CreateMaintainceForm = () => {
    const [data, error, loading, axiosFetch] = useAxios()
    const currentDate = new Date().toISOString().split('T')[0];
    const location = useLocation();
    const navigate = useNavigate();
    const vehicleId = location?.state?.vehicleId;


    const [formdata, setFormdata] = useState({
        //type change into category

        vehicleRegister: vehicleId || '',
        vrissue: '',
        vrcost: '',
        vraddit: '',
        vrsdate: currentDate,
        vredate: '',
        availability: 'Unavailable'
    });


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
                    vehicleRegister: vehicleId || '',
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




    return (

        <main className='w-full  flex flex-col justify-center items-center '>
            <div className=" sm:w-3/4 bg-white p-10 flex flex-col rounded-2xl dark:text-white dark:bg-slate-500">
                <h1 className='font-bold text-xl'>
                    Create Maintaince Form
                </h1>
                <form className='flex flex-col gap-4 md:flex-row dark:text-white' onSubmit={handleSubmit}>
                    <div className="w-full">


                        <div className='flex flex-col gap-5 mt-9'>
                            <label className="block text-gray-700 text-md font-bold mb-2 dark:text-white">Vehicle Number</label>
                            <input
                                type="text"
                                id='vehicleRegister'
                                placeholder='AAA1234 OR AA-1234 OR 12-1234'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                onChange={handlechange}
                                value={formdata.vehicleRegister} />
                            <label className="block text-gray-700 text-md font-bold mb-2 dark:text-white">Fault of the Vehicle</label>
                            <textarea
                                type="text"
                                id='vrissue'
                                placeholder='Ex:- Front Arm Vibartion '
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                onChange={handlechange}
                                value={formdata.vrissue} />
                            <label className="block text-gray-700 text-md font-bold mb-2 dark:text-white">Estimated Cost</label>
                            <input
                                type="number"
                                id='vrcost'
                                placeholder='RS:-10,000'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                onChange={handlechange}
                                value={formdata.vrcost} />
                        </div>

                        <div className="flex flex-col gap-5 mt-5">
                            <label className="block text-gray-700 text-md font-bold mb-2 dark:text-white">Additional Info</label>
                            <textarea
                                type="text"
                                id='vraddit'
                                placeholder='Additional Info'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handlechange}
                                value={formdata.vraddit} />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col justify-center items-center w-full">

                        <div className="flex flex-col gap-5 mb-5 items-center">
                            <div className="flex items-center gap-4">
                                <label className=" text-gray-700 text-md font-bold dark:text-white" >Start Date :</label>
                                <input type='date'
                                    id='vrsdate'
                                    className="shadow  rounded  text-gray-700 p-2"
                                    onChange={handlechange}
                                    value={formdata.vrsdate} />
                            </div>
                            <div className="flex  items-center gap-4">
                                <label className="block text-gray-700 text-md font-bold mb-2 dark:text-white">End Date :</label>
                                <input type='date'
                                    className="shadow  rounded  text-gray-700 p-2"
                                    id='vredate'
                                    onChange={handlechange}
                                    value={formdata.vredate} />
                            </div>
                            <div className='flex gap-4 justify-between items-center'>
                                <label className="block text-gray-700 text-md font-bold mb-2 dark:text-white">Availability:</label>
                                <select
                                    id='availability'
                                    className="shadow  rounded  text-gray-700 p-2"
                                    onChange={handlechange}
                                    value={formdata.availability}>
                                    <option value='Unavailable'>Unavailable</option>
                                </select>
                            </div>
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
