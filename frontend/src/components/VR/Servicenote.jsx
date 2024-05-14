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
    const [kilometerLimit, setKilometerLimit] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehicle/${id}`)
            .then(response => {
                setVehinumber(response.data.vehicleRegister);
                setLastmilage(response.data.lastMileage);
                setKilometerLimit(response.data.kilometerLimit);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split('T')[0];

    const [formdata, setFormdata] = useState({
        vehicleRegister: '',
        servicedate: currentDate,
        lastmilage: '',
        kilometerLimit: '',
        Snote: '',
        Scost: '',
    });

    useEffect(() => {
        setFormdata(prevState => ({
            ...prevState,
            vehicleRegister: vehinumber,
            lastmilage: lastmilage,

        }));
    }, [vehinumber, lastmilage]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the new kilometerLimit is greater than the previous kilometerLimit
        if (parseInt(formdata.kilometerLimit) <= parseInt(lastmilage)) {
            alert('New kilometerLimit must be greater than the previous kilometerLimit.');
            return;
        }

        if (!formdata.vehicleRegister) {
            console.error('Vehicle register is empty');
            return;
        }

        axios.post(`http://localhost:3000/api/vehicleService/addservicenote`, formdata)
            .then(response => {
                console.log('Submission successful:', response);
                setFormdata({
                    vehicleRegister: vehinumber,
                    servicedate: currentDate,
                    lastmilage: lastmilage,
                    kilometerLimit: '',
                    Snote: '',
                    Scost: '',
                });
                navigate('/VehicleService');
            })
            .catch(error => {
                // Handle error response
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

    const handleChange = (e) => {
        setFormdata(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <main className='w-full flex flex-col justify-center items-center'>
            <Serviceview />
            <div className="border-b-4 border-black w-full mb-8"></div>
            <div className="sm:w-1/2 bg-white p-10 flex flex-col rounded-2xl ">
                <h1 className='font-bold text-xl mb-6 text-center'>
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
                                className='border p-2 rounded-lg shadow'
                                required
                                readOnly={handleChange}
                                value={formdata.servicedate}
                            />
                            <label className='font-semibold'>Service Note :</label>
                            <textarea
                                type="text"
                                id='Snote'
                                placeholder=' '
                                className='border p-2 rounded-lg shadow'
                                required
                                onChange={handleChange}
                                value={formdata.Snote}
                            />
                            <label className='font-semibold'>Cost :</label>
                            <input
                                type="number"
                                id='Scost'
                                placeholder='RS:-10,000'
                                className='border p-2 rounded-lg shadow'
                                required
                                onChange={handleChange}
                                value={formdata.Scost}
                            />
                            <label className='font-semibold'>Kilometer Limit :</label>
                            <input
                                type="number"
                                id='kilometerLimit'
                                className='border p-2 rounded-lg shadow'
                                required
                                onChange={handleChange}
                                value={formdata.kilometerLimit}
                            />
                        </div>
                    </div>
                </form>
                <button onClick={handleSubmit} className='hover:opacity-80 mt-10 bg-actionBlue p-3 rounded-lg text-white font-bold'>
                    Add Service Note
                </button>
            </div>
        </main>
    );
};
