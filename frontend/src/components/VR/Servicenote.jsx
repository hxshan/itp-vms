import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useAxios from '@/hooks/useAxios';
import { Serviceview } from './Serviceview';

export const Servicenote = () => {
    const [data, error, loading, axiosFetch] = useAxios();
    const { id } = useParams();
    const [vehinumber, setVehinumber] = useState('');
    const [lastmilage, setLastmilage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehicle/${id}`)
            .then(response => {

                setVehinumber(response.data.vehicleRegister)
                setLastmilage(response.data.lastMileage)
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split('T')[0];

    const [formdata, setFormdata] = useState({
        vehicleRegister: vehinumber,
        servicedate: currentDate,
        lastmilage: lastmilage,
        Snote: '',
        Scost: '',
    });

    useEffect(() => {
        setFormdata(prevState => ({
            ...prevState,
            vehicleRegister: vehinumber,
            lastmilage: lastmilage

        }));
    }, [vehinumber, lastmilage]);

    const handleSubmit = () => {
        if (!formdata.vehicleRegister) {
            console.error('Vehicle register is empty');
            return;
        }

        axios.post(`http://localhost:3000/api/vehicleService/addservicenote`, formdata)
            .then(response => {
                console.log('Submission successful:', response);
                setFormdata({
                    vehicleRegister: vehinumber,
                    Snote: '',
                    servicedate: '',
                    lastmilage: lastmilage,
                    Scost: '',

                });
                navigate('/VehicleService');
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    };

    const handlechange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.id]: e.target.value
        });
    };

    return (
        <main className='w-full flex flex-col justify-center items-center bg-slate-200'>
            <Serviceview />
            <div className="sm:w-1/2 bg-slate-300 p-10 flex flex-col rounded-2xl ">
                <h1 className='text-3xl font-semibold text-center '>
                    Add Service Note
                </h1>
                <form className='flex flex-col gap-4 md:flex-row' onSubmit={handleSubmit}>
                    <div className="w-full">
                        <div className='flex flex-col gap-5 mt-9'>
                            <div className="flex justify-center gap-3">
                                <label className='font-semibold'>Vehicle Number : </label>
                                <span>{vehinumber}</span>
                            </div>
                            <div className="flex justify-center gap-3">
                                <label className='font-semibold'>Last-Milage : </label>
                                <span> {lastmilage}km</span>
                            </div>
                            <label className='font-semibold'>Date :</label>
                            <input
                                type="date"
                                id='servicedate'
                                className='border p-2 rounded-lg'
                                required
                                onChange={handlechange}
                                value={formdata.servicedate} />
                            <label className='font-semibold'>Service Note :</label>
                            <textarea
                                type="text"
                                id='Snote'
                                placeholder=' '
                                className='border p-2 rounded-lg'
                                required
                                onChange={handlechange}
                                value={formdata.Snote} />
                            <label className='font-semibold'>Cost :</label>
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
                <button onClick={handleSubmit} className='hover:opacity-80 mt-10 bg-slate-800 p-3 rounded-lg text-white font-bold'>
                    Add Service Note
                </button>
            </div>
        </main>
    );
};
