import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    
    validateVehicleId,
    validateVehicleIssue,
    validateVehicleCost,
    validateAdditionalInfo,
    validateEDate

} from './validation';

export const EditMaintainceOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setcategory] = useState('');
    const [vehicleRegister, setvehicleRegister] = useState('');
    const [vrissue, setVrissue] = useState('');
    const [vrcost, setVrcost] = useState('');
    const [vraddit, setVraddit] = useState('');
    const [vrsdate, setVrsdate] = useState();
    const [vredate, setVredate] = useState();
    const [vrnumber, setVrnumber] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehiclemaintain/${id}`)
            .then((response) => {
                const data = response.data;
                setVrnumber(data.vehicleRegister.vehicleRegister)
                setcategory(data.category);
                setvehicleRegister(data.vehicleRegister);
                setVrissue(data.vrissue);
                setVrcost(data.vrcost);
                setVraddit(data.vraddit);
                setVrsdate(data?.vrsdate?.split('T')[0]);
                setVredate(data?.vredate?.split('T')[0]);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    const validateForm = () => {
        return (

            validateVehicleId(vehicleRegister) &&
            validateVehicleIssue(vrissue) &&
            validateVehicleCost(vrcost) &&
            validateAdditionalInfo(vraddit) &&
            validateEDate(vrsdate, vredate)
        );
    };

    const handleSubmit = (e) => {

        if (!validateForm()) {
            // If validation fails, display an alert
            alert('Please fill in all required fields.');
            return;
        }
        e.preventDefault();
        const data = {
            vehicleRegister,
            vrissue,
            vrcost,
            vraddit,
            vrsdate,
            vredate
        };
        axios.put(`http://localhost:3000/api/vehiclemaintain/${id}`, data)
            .then(() => {
                alert("Updated")
                navigate('/Mdashboard');
            })
            .catch((error) => {
                console.log(error);
            });
    };

  

    return (
        <main className='w-full  flex flex-col justify-center items-center '>
            <div className=" sm:w-3/4 bg-white p-10 flex flex-col rounded-2xl ">
                <h1 className='font-bold text-xl'>
                    Edit Maintaince Form
                </h1>
                <form className='flex flex-col gap-4 md:flex-row' onSubmit={handleSubmit}>
                    <div className="w-full">
                        <div className='flex flex-col gap-5 mt-9'>
                            <label className='block  text-md font-bold mb-2'>Vehicle Number</label>
                            <label className='shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'>{vrnumber}</label>
                            <input
                                type="text"
                                id='vehicleRegister'
                                placeholder='AAA1234 OR AA-1234 OR 12-1234'
                                className='hidden'
                                maxLength='7'
                                required
                                readOnly={(e) => setvehicleRegister(e.target.value)}
                        
                                value={vehicleRegister} />
                            <label className='block  text-md font-bold mb-2'>Fault of the Vehicle</label>
                            <textarea
                                type="text"
                                id='vrissue'
                                placeholder='Ex:- Front Arm Vibartion '
                                className='shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
                                required
                                onChange={(e) => setVrissue(e.target.value)}
                                value={vrissue} />
                            <label className='block  text-md font-bold mb-2'>Estimated Cost</label>
                            <input
                                type="number"
                                id='vrcost'
                                placeholder='RS:-10,000'
                                className='shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
                                required
                                onChange={(e) => setVrcost(e.target.value)}
                                value={vrcost} />
                        </div>
                        <div className="flex flex-col gap-5 mt-5">
                            <label className='block  text-md font-bold mb-2'>Additional Info</label>
                            <textarea
                                type="text"
                                id='vraddit'
                                placeholder='Additional Info'

                                className='shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
                                onChange={(e) => setVraddit(e.target.value)}
                                value={vraddit} />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col justify-center items-center w-full">
                        <div className="flex flex-col gap-5 mb-5 items-center">
                            <div className="flex items-center gap-4">
                                <label className='  font-semibold' >Start Date :</label>
                                <input type='date'
                                    id='vrsdate'
                                    className='shadow  rounded   p-2'
                                    readOnly
                                    value={vrsdate}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className='font-semibold'>End Date :</label>
                                <input type='date'
                                    className='shadow  rounded   p-2'
                                    id='vredate'
                                    onChange={(e) => setVredate(e.target.value)}
                                    value={vredate}
                                />
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
                            />
                            <button
                                className='p-3 border border-green-600 rounded-lg font-semibold text-green-600 hover:shadow-lg disabled:opacity-50'
                                type='button'
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </form>
                <div className="flex justify-end  items-center mt-6">
                    <button onClick={handleSubmit}
                        className="bg-actionBlue py-2 px-3 rounded-md text-white font-bold mr-5">
                        Update Maintaince Order
                    </button>
                    <Link to={`/Mdashboard`}>
                        <button className="my-1 mx-1 text-white bg-actionGreen py-2 px-3 rounded-md font-bold">Back</button>
                    </Link>
                </div>


            </div>
        </main>
    );
};
