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
            <div>
                <form>
                    <label htmlFor="category">Select Category:</label>
                    <select id="category" name="category" value={category} onChange={handleCategoryChange}>
                        <option value="">Select</option>
                        <option value="car">Car</option>
                        <option value="van">Van</option>
                        <option value="bus">Bus</option>
                        <option value="lorry">Lorry</option>
                    </select>
                </form>
                {category && (
                    <form>
                        {category === 'car' && (
                            <div>
                                <label htmlFor="carModel">Car Model:</label>
                                <input type="text" id="carModel" name="carModel" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                            </div>
                        )}
                        {category === 'van' && (
                            <div>
                                <label htmlFor="vanModel">Van Model:</label>
                                <input type="text" id="vanModel" name="vanModel" value={vanModel} onChange={(e) => setVanModel(e.target.value)} />
                            </div>
                        )}
                        {category === 'bus' && (
                            <div>
                                <label htmlFor="busCapacity">Bus Capacity:</label>
                                <input type="number" id="busCapacity" name="busCapacity" value={busCapacity} onChange={(e) => setBusCapacity(e.target.value)} />
                            </div>
                        )}
                        {category === 'lorry' && (
                            <div>
                                <label htmlFor="lorryWeight">Lorry Weight:</label>
                                <input type="number" id="lorryWeight" name="lorryWeight" value={lorryWeight} onChange={(e) => setLorryWeight(e.target.value)} />
                            </div>
                        )}
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    </form>
                )}
            </div>
        );
};
    
export default AddVehicle;
        
