const vehicle_service = require('../models/vehicle_service')
const { Vehicles } = require('../models/vehicleModel')

const addservice = async (req, res) => {
    try {
        // Check if the vehicle exists
        const vehicle = await Vehicles.findOne({ vehicleRegister: req.body.vehicleRegister });

        if (!vehicle) {
            return res.status(400).send({ message: "Invalid category or vehicle register provided." });
        }

        // Check if a service with the same lastmilage or servicedate already exists
        const existingService = await vehicle_service.findOne({ vehicleRegister: vehicle._id })
            .or([{ lastmilage: req.body.lastmilage }, { servicedate: req.body.servicedate }]);

        if (existingService) {
            return res.status(400).send({ message: "Service with the same lastmilage or servicedate already exists for this vehicle." });
        }

        // Create a new service
        const newService = await vehicle_service.create({
            vehicleRegister: vehicle._id,
            servicedate: req.body.servicedate,
            lastmilage: req.body.lastmilage,
            kilometerLimit: req.body.kilometerLimit,
            Snote: req.body.Snote,
            Scost: req.body.Scost,
        });

        return res.status(201).send(newService);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};



//Get all Services 
const getallservices = async (req, res) => {
    try {
        const Services = await vehicle_service.find().populate("vehicleRegister");
        console.log(Services)
        return res.status(201).json(Services);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};

const getservicesbytype = async (req, res) => {
    try {
        const { id } = req.params;
        const Services = await vehicle_service.find({ vehicleRegister: id }).populate("vehicleRegister");

        console.log(Services)
        return res.status(201).json(Services);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};

module.exports = { addservice, getallservices, getservicesbytype }