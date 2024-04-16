import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    validateVehicleType,
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


    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehiclemaintain/${id}`)
            .then((response) => {
                const data = response.data;
                setcategory(data.category);
                setvehicleRegister(data.vehicleRegister);
                setVrissue(data.vrissue);
                setVrcost(data.vrcost);
                setVraddit(data.vraddit);
                setVrsdate(new Date(data.vrsdate).toISOString().split('T')[0]);
                setVredate(new Date(data.vredate).toISOString().split('T')[0]);
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
        <main className='w-full  flex flex-col justify-center items-center bg-slate-200'>
            <h1 className='text-3xl font-semibold  my-9'>
                Edit Maintaince Form
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
                                readOnly={(e) => setvehicleRegister(e.target.value)}
                                value={vehicleRegister} />
                            <label className='  font-semibold  '>Fault of the Vehicle</label>
                            <textarea
                                type="text"
                                id='vrissue'
                                placeholder='Ex:- Front Arm Vibartion '
                                className='border p-2 rounded-lg'
                                required
                                onChange={(e) => setVrissue(e.target.value)}
                                value={vrissue} />
                            <label className='  font-semibold  '>Estimated Cost</label>
                            <input
                                type="number"
                                id='vrcost'
                                placeholder='RS:-10,000'
                                className='border p-2 rounded-lg'
                                required
                                onChange={(e) => setVrcost(e.target.value)}
                                value={vrcost} />
                        </div>
                        <div className="flex flex-col gap-5 mt-5">
                            <label className='  font-semibold  '>Additional Info</label>
                            <textarea
                                type="text"
                                id='vraddit'
                                placeholder='Additional Info'

                                className='border p-4 rounded-lg'
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
                                    className='rounded-lg p-2'
                                    readOnly
                                    value={vrsdate}
                                />
                            </div>
                            <div className="flex  items-center gap-4">
                                <label className='  font-semibold'>End Date :</label>
                                <input type='date'
                                    className='rounded-lg p-2'
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
                <button onClick={handleSubmit}
                    className='hover:opacity-80 mt-10 bg-slate-800 p-3 rounded-lg text-white font-bold'>
                    Update Maintaince Order
                </button>

            </div>
        </main>
    );
};
