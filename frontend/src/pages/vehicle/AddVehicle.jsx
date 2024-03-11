import React, { useState } from 'react';

const AddVehicle = () => {
        const [category, setCategory] = useState('');
        const [carModel, setCarModel] = useState('');
        const [vanModel, setVanModel] = useState('');
        const [busCapacity, setBusCapacity] = useState('');
        const [lorryWeight, setLorryWeight] = useState('');
    
        const handleCategoryChange = (event) => {
            setCategory(event.target.value);
        };
    
        const handleSubmit = () => {
            // Construct formData object based on selected category
            const formData = {
                category,
                carModel: category === 'car' ? carModel : '',
                vanModel: category === 'van' ? vanModel : '',
                busCapacity: category === 'bus' ? busCapacity : '',
                lorryWeight: category === 'lorry' ? lorryWeight : ''
            };
    
            // Send formData to backend (e.g., via fetch or axios)
            fetch('/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Data saved successfully');
                    // Optionally, show a success message to the user
                } else {
                    console.error('Failed to save data');
                    // Optionally, show an error message to the user
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Optionally, show an error message to the user
            });
        };
    
        return (
            <div class="place-content-center m-8 bg-cover bg-center bg-white" >
                <form class="space-y-12 m-3 p-3  bg-slate-200 rounded-md pad">
                    <h1 class="">Select your vehicle category</h1>
                    <label htmlFor="category">Select Category:</label>
                    <select class="" id="category" name="category" value={category} onChange={handleCategoryChange}>
                        <option value="">Select</option>
                        <option value="car">Car</option>
                        <option value="van">Van</option>
                        <option value="bus">Bus</option>
                        <option value="lorry">Lorry</option>
                    </select>
                </form>
                {category && (
                    <form class="space-y-12 m-3 p-3  bg-slate-200 rounded-md pad">
                        {category === 'car' && (
                            <div>
                                <h1 class="mb-3">Fill follow vehicle details</h1>
                                <label htmlFor="carModel">Car Model:</label>
                                <input type="text" id="carModel" name="carModel" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                                
                                <label htmlFor="image">Upload Image:</label>
                                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                            </div>
                        )}
                        {category === 'van' && (
                            <div>
                                <h1 class="mb-3">Fill follow vehicle details</h1>
                                <label htmlFor="vanModel">Van Model:</label>
                                <input type="text" id="vanModel" name="vanModel" value={vanModel} onChange={(e) => setVanModel(e.target.value)} />
                        
                                <label htmlFor="image">Upload Image:</label>
                                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                             </div>
                        )}
                        {category === 'bus' && (
                            <div>
                                <h1 class="mb-3">Fill follow vehicle details</h1>
                                <label htmlFor="busCapacity">Bus Capacity:</label>
                                <input type="number" id="busCapacity" name="busCapacity" value={busCapacity} onChange={(e) => setBusCapacity(e.target.value)} />
                            
                                <label htmlFor="image">Upload Image:</label>
                                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                            </div>
                        )}
                        {category === 'lorry' && (
                            <div>
                                <h1 class="mb-3">Fill follow vehicle details</h1>
                                <label htmlFor="lorryWeight">Lorry Weight:</label>
                                <input type="number" id="lorryWeight" name="lorryWeight" value={lorryWeight} onChange={(e) => setLorryWeight(e.target.value)} />
                            
                                <label htmlFor="image">Upload Image:</label>
                                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                            </div>
                        )}
                        <button className='p-1 bg-black text-center text-white text-sm rounded-md' type="button" onClick={handleSubmit}>Add vehicle</button>
                    </form>
                )}
            </div>
        );
};
    
export default AddVehicle;
        
