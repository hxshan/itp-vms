import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';

export const EditMaintainceOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [vrtype, setVrtype] = useState('');
    const [vrid, setVrid] = useState('');
    const [vrissue, setVrissue] = useState('');
    const [vrcost, setVrcost] = useState('');
    const [vraddit, setVraddit] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehiclemaintain/${id}`)
            .then((response) => {
                const data = response.data;
                setVrtype(data.vrtype);
                setVrid(data.vrid);
                setVrissue(data.vrissue);
                setVrcost(data.vrcost);
                setVraddit(data.vraddit);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            vrtype,
            vrid,
            vrissue,
            vrcost,
            vraddit
        };

        
        axios.put(`http://localhost:3000/api/vehiclemaintain/${id}`, data)
            .then(() => {
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
                        <h1 className=' text-xl font-semibold m-5 text-center'>Vehicle Type</h1>
                        <div className="flex justify-evenly">
                            <div className="flex ">
                                <input type="checkbox" id="Car" className='w-5'
                                    readOnly={(e) => setVrtype(e.target.value)}
                                    checked={vrtype === 'Car'} />
                                <span className='font-semibold ml-2'>Car</span>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="Van" className='w-5'
                                    readOnly={(e) => setVrtype(e.target.value)}
                                    checked={vrtype === 'Van'} />
                                <span className='font-semibold ml-2'>Van</span>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="Bus" className='w-5'
                                    readOnly={(e) => setVrtype(e.target.value)}
                                    checked={vrtype === 'Bus'} />
                                <span className='font-semibold ml-2'>Bus</span>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="Mover" className='w-5'
                                    readOnly={(e) => setVrtype(e.target.value)}
                                    checked={vrtype === 'Mover'} />
                                <span className='font-semibold ml-2'>Prime Mover</span>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="Lorry" className='w-5'
                                    readOnly={(e) => setVrtype(e.target.value)}
                                    checked={vrtype === 'Lorry'} />
                                <span className='font-semibold ml-2'>Lorry</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 mt-9'>
                            <input
                                type="text"
                              
                                placeholder='Vehicle Number'
                                className='border p-4 rounded-lg'
                                maxLength='7'
                                required
                                readOnly={(e) => setVrid(e.target.value)}
                                value={vrid} />

                            <textarea
                                type="text"
                               
                                placeholder='Fault of the Vehicle'
                                className='border p-4 rounded-lg'
                                required
                                onChange={(e) => setVrissue(e.target.value)}
                                value={vrissue} />

                            <input
                                type="number"
                              
                                placeholder='Estimated Cost'
                                className='border p-4 rounded-lg'
                                required
                                onChange={(e) => setVrcost(e.target.value)}
                                value={vrcost} />
                        </div>
                        <h1
                            className=' text-center text-xl font-semibold m-5'>
                            After Completing Maintenance
                        </h1>
                        <div className="flex flex-col gap-5 mt-9">
                            <textarea
                                type="text"
                              
                                placeholder='Additional Info'
                                className='border p-4 rounded-lg'
                                onChange={(e) => setVraddit(e.target.value)}
                                value={vraddit} />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col justify-center items-center w-full">
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
                                type='submit'
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
