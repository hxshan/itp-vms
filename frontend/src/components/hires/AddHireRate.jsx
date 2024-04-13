import PropTypes from 'prop-types';
import { useState } from 'react';

import axios from '@/api/axios';
import useAxios from "@/hooks/useAxios";


const AddHireRates = ({setShowAddForm, reload}) => {

    const [vehicleCatagory , setVehicleSubcategory] = useState('')
    const [baseRate , setBaseRate] = useState('')
    const [basedDistance , setBaseDistance] = useState('')
    const [additionalRate, setAdditionalRate] = useState('')
    const [acBaseRate , setAcBaseRate] = useState('')
    const [acAdditionalRate, setAcAdditionalRate] = useState('')

    const [response, error, loading, axiosFetch] = useAxios()

    const handleEditSubmit = async () => {

        const hireRates = {
            vehicleCatagory,
            baseRate,
            basedDistance,
            additionalRate,
            acBaseRate,
            acAdditionalRate           
        }

        setShowAddForm(false)
        
        await axiosFetch({
            axiosInstance:axios,
            method:'POST',
            url:`/hire/rates/add`,
            requestConfig:{
            data:{
                ...hireRates
            }
            }
        })

        if(error){
            alert(error)
          }
          if(response){
            reload()
            console.log("Data:", response);
            alert("successfully updated")
          }  

          

        
        console.log("Data")
        console.log(hireRates)
    }

    const handleCancle = () => {
        setShowAddForm(false)
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="text-center pb-4 border-b">
                    <h1 className="text-2xl font-semibold xl:text-4xl">Add Vehicle Rate</h1>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleEditSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Vehicle Catagory</label>
                            <input type="text" className="border rounded-md px-3 py-2 w-full" 
                            value={vehicleCatagory}
                            onChange={(e) => setVehicleSubcategory(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Base Distance</label>
                            <input type="number" className="border rounded-md px-3 py-2 w-full" 
                            value={basedDistance}
                            onChange={(e) => setBaseDistance(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Base Rate</label>
                            <input type="number" className="border rounded-md px-3 py-2 w-full" 
                            value={baseRate}
                            onChange={(e) => setBaseRate(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Additional Rate</label>
                            <input type="number" className="border rounded-md px-3 py-2 w-full" 
                            value={additionalRate}
                            onChange={(e) => setAdditionalRate(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Base Rate(AC)</label>
                            <input type="number" className="border rounded-md px-3 py-2 w-full" 
                            value={acBaseRate}
                            onChange={(e) => setAcBaseRate(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Additional Rate(AC)</label>
                            <input type="number" className="border rounded-md px-3 py-2 w-full" 
                            value={acAdditionalRate}
                            onChange={(e) => setAcAdditionalRate(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="text-center">
                                <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                onClick={handleCancle}
                                >
                                    Cancle
                                </button>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="bg-actionGreen text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

AddHireRates.propTypes = {
    setShowAddForm: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
};

export default AddHireRates;
