import PropTypes from 'prop-types';
import { useState } from 'react';

import axios from '@/api/axios';
import useAxios from "@/hooks/useAxios";


const EditHireRates = ({setEditRates, editHireData, reload}) => {

    const [rateId , setRateId] = useState(editHireData._id)
    const [vehicleCatagory , setVehicleSubcategory] = useState(editHireData.vehicleCatagory)
    const [baseRate , setBaseRate] = useState(editHireData.baseRate)
    const [basedDistance , setBaseDistance] = useState(editHireData.basedDistance)
    const [additionalRate, setAdditionalRate] = useState(editHireData.additionalRate)
    const [acBaseRate , setAcBaseRate] = useState(editHireData.acBaseRate)
    const [acAdditionalRate, setAcAdditionalRate] = useState(editHireData.acAdditionalRate)

    const [response, error, loading, axiosFetch] = useAxios()

    const handleEditSubmit = async () => {

        const editedRates = {
            vehicleCatagory,
            basedDistance,
            baseRate,
            additionalRate,
            acBaseRate,
            acAdditionalRate
        }

        setEditRates(false)
        
        await axiosFetch({
            axiosInstance:axios,
            method:'PUT',
            url:`/hire/rates/edit/${rateId}`,
            requestConfig:{
            data:{
                ...editedRates
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

          

        
        console.log("Edited Data")
        console.log(editedRates)
    }

    const handleCancle = () => {
        setEditRates(false)
    }

    if(loading){
        return(
          <h1>Loading ...</h1>
        )
      }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="text-center pb-4 border-b">
                    <h1 className="text-2xl font-semibold xl:text-4xl">Edit Vehicle Rates - {vehicleCatagory}</h1>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleEditSubmit}>
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

EditHireRates.propTypes = {
    setEditRates: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
    editHireData: PropTypes.object.isRequired
};

export default EditHireRates;
