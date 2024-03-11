import React, { useState } from 'react';

const AddVehicle = () => {
    const [category, setCategory] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carMake, setCarMake] = useState('');
    const [carYear, setCarYear] = useState('');
    
    const [vanModel, setVanModel] = useState('');
    const [vanMake, setVanMake] = useState('');
    const [vanYear, setVanYear] = useState('');


    const [busCapacity, setBusCapacity] = useState('');
    const [busMake, setBusMake] = useState('');
    const [busYear, setBusYear] = useState('');

    const [lorryWeight, setLorryWeight] = useState('');
    const [lorryMake, setLorryMake] = useState('');
    const [lorryYear, setLorryYear] = useState('');

    const [carImage, setCarImage] = useState(null);
    const [vanDocImage, setvanDocImage] = useState(null);
    const [busImage, setBusImage] = useState(null);
    const [lorryImage, setLorryImage] = useState(null);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleCarImageChange = (event) => {
        const file = event.target.files[0];
        setCarImage(file);
    };

    const handleVarDocImageChange = (event) => {
        const file = event.target.files[0];
        setvanDocImage(file);
    };

    const handleBusImageChange = (event) => {
        const file = event.target.files[0];
        setBusImage(file);
    };

    const handleLorryImageChange = (event) => {
        const file = event.target.files[0];
        setLorryImage(file);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('category', category);

        switch (category) {
            case 'car':
                formData.append('carModel', carModel);
                formData.append('carMake', carMake);
                formData.append('carYear', carYear);
                formData.append('carImage', carImage);
                break;
            case 'van':
                formData.append('vanModel', vanModel);
                formData.append('vanMake', vanMake);
                formData.append('vanYear', vanYear);
                formData.append('vanDocImage', vanDocImage);
                break;    
            case 'bus':
                formData.append('busCapacity', busCapacity);
                formData.append('busMake', busMake);
                formData.append('busYear', busYear);
                formData.append('busImage', busImage);
                break;
            case 'lorry':
                formData.append('lorryWeight', lorryWeight);
                formData.append('lorryMake', lorryMake);
                formData.append('lorryYear', lorryYear);
                formData.append('lorryImage', lorryImage);
                break;
            default:
                break;
        }

        fetch('/saveData', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Data saved successfully');
            } else {
                console.error('Failed to save data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    return (
            <div class="place-content-center m-8 bg-cover bg-center bg-white" >
                <form class="space-y-12 m-3 p-3  bg-slate-200 rounded-md pad">
                    <h1 class="">Select your vehicle category</h1>
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
                            <label htmlFor="carMake">Car Make:</label>
                            <input type="text" id="carMake" name="carMake" value={carMake} onChange={(e) => setCarMake(e.target.value)} />
                            <label htmlFor="carYear">Car Year:</label>
                            <input type="text" id="carYear" name="carYear" value={carYear} onChange={(e) => setCarYear(e.target.value)} />
                            <label htmlFor="carImage">Car Image:</label>
                            <input type="file" id="carImage" name="carImage" accept="image/*" onChange={handleCarImageChange} />
                        </div>
                    )}
                    {category === 'van' && (
                        <div>
                            <label htmlFor="vanModel">Car Model:</label>
                            <input type="text" id="vanModel" name="vanModel" value={vanModel} onChange={(e) => setVanModel(e.target.value)} />
                            <label htmlFor="vanMake">Car Make:</label>
                            <input type="text" id="vanMake" name="vanMake" value={vanMake} onChange={(e) => setVanMake(e.target.value)} />
                            <label htmlFor="vanYear">Car Year:</label>
                            <input type="text" id="vanYear" name="vanYear" value={vanYear} onChange={(e) => setVanYear(e.target.value)} />
                            <label htmlFor="vanDocImage">Car Image:</label>
                            <input type="file" id="vanDocImage" name="vanDocImage" accept="image/*" onChange={handleVarDocImageChange} />
                        </div>
                    )}
                    {category === 'bus' && (
                        <div>
                            <label htmlFor="busCapacity">Bus Capacity:</label>
                            <input type="number" id="busCapacity" name="busCapacity" value={busCapacity} onChange={(e) => setBusCapacity(e.target.value)} />
                            <label htmlFor="busMake">Bus Make:</label>
                            <input type="text" id="busMake" name="busMake" value={busMake} onChange={(e) => setBusMake(e.target.value)} />
                            <label htmlFor="busYear">Bus Year:</label>
                            <input type="text" id="busYear" name="busYear" value={busYear} onChange={(e) => setBusYear(e.target.value)} />
                            <label htmlFor="busImage">Bus Image:</label>
                            <input type="file" id="busImage" name="busImage" accept="image/*" onChange={handleBusImageChange} />
                        </div>
                    )}
                    {category === 'lorry' && (
                        <div>
                            <label htmlFor="lorryWeight">Lorry Weight:</label>
                            <input type="number" id="lorryWeight" name="lorryWeight" value={lorryWeight} onChange={(e) => setLorryWeight(e.target.value)} />
                            <label htmlFor="lorryMake">Lorry Make:</label>
                            <input type="text" id="lorryMake" name="lorryMake" value={lorryMake} onChange={(e) => setLorryMake(e.target.value)} />
                            <label htmlFor="lorryYear">Lorry Year:</label>
                            <input type="text" id="lorryYear" name="lorryYear" value={lorryYear} onChange={(e) => setLorryYear(e.target.value)} />
                            <label htmlFor="lorryImage">Lorry Image:</label>
                            <input type="file" id="lorryImage" name="lorryImage" accept="image/*" onChange={handleLorryImageChange} />
                        </div>
                    )}
                    
                    <button type="button" onClick={handleSubmit}>Submit</button>
                    </form>
                )}
            </div>
    );
};
    
export default AddVehicle;
        
