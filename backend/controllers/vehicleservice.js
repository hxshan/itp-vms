const vehicle_service = require('../models/vehicle_service')
const { Vehicles } = require('../models/vehicleModel')

const addservice = async (req, res) => {
    try {
        
        const requiredFields = ['vehicleRegister', 'servicedate', 'lastmilage', 'Snote', 'Scost'];
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
            servicedate: req.body.servicedate,
            lastmilage: req.body.lastmilage,
            Snote: req.body.Snote,
            Scost: req.body.Scost,

        };

        const newservice = await vehicle_service.create(vehicleservice);

        return res.status(201).send(newservice);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};


//Get all Services from system
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
        const {id} = req.params;
        const Services = await vehicle_service.find({ vehicleRegister: id }).populate("vehicleRegister");


        console.log(Services)
        return res.status(201).json(Services);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};
module.exports = { addservice, getallservices, getservicesbytype }