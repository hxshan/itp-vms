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
        <main className='shadow-xl rounded flex flex-col items-center mt-8'>
            <Serviceview />
            
                
                <form className='bg-white mt-6 px-8 pt-6 pb-8 mb-4 w-full' onSubmit={handleSubmit}>
                <h1 className="font-bold text-2xl w-fit mt-5 mb-8">
                    Add Service Note
                </h1>
                    <div className="w-full">
                        <div className='flex flex-col gap-5 mt-9'>
                            <div className="flex  gap-3">
                                <label className="block text-gray-700 text-md font-bold mb-2">Vehicle Number : </label>
                                <span>{vehinumber}</span>
                            </div>
                            <div className="flex  gap-3">
                                <label className="block text-gray-700 text-md font-bold mb-2">Last-Milage : </label>
                                <span> {lastmilage}km</span>
                            </div>
                            <label className="block text-gray-700 text-md font-bold mb-2">Date :</label>
                            <input
                                type="date"
                                id='servicedate'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                required
                                onChange={handlechange}
                                value={formdata.servicedate} />
                            <label className="block text-gray-700 text-md font-bold mb-2">Service Note :</label>
                            <textarea
                                type="text"
                                id='Snote'
                                placeholder=' '
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                required
                                onChange={handlechange}
                                value={formdata.Snote} />
                            <label className="block text-gray-700 text-md font-bold mb-2">Cost :</label>
                            <input
                                type="number"
                                id='Scost'
                                placeholder='RS:-10,000'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                required
                                onChange={handlechange}
                                value={formdata.Scost} />
                        </div>
                    </div>
                </form>
                <button onClick={handleSubmit} className='bg-actionBlue py-2 px-6 rounded-md text-white font-bold mt-2"'>
                    Add Service Note
                </button>
            
        </main>
    );
};
