const vehicleservice = require('../models/vehicle_service')
const { Vehicles } = require('../models/vehicleModel')

const addservice = async (req, res) => {
    try {
        // Check if all required fields are provided in the request body
        const requiredFields = ['vehicleRegister', 'Snote', 'Scost'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).send({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        const vehicle = await Vehicles.findOne({ vehicleRegister: req.body.vehicleRegister });

        if (!vehicle) {
            return res.status(400).send({ message: "Invalid category or vehicle register provided." });
        }

        
        const vehicleservice = {

            vehicleRegister: vehicle._id,
            Snote: req.body.Snote,
            Scost: req.body.Scost,

        };

        const newservice = await vehicleservice.create(vehicleservice);

        return res.status(201).send(newservice);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};
