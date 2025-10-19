const vehicle_service = require('../models/vehicle_service')
const { Vehicles } = require('../models/vehicleModel')
const Expense =require('../models/expenseModel')
const mongoose = require('mongoose')

const addservice = async (req, res) => {
    try {
        const { vehicleRegister, lastmilage, servicedate, kilometerLimit, Snote, Scost } = req.body;
        if (typeof vehicleRegister !== 'string' || typeof Snote !== 'string') {
            return res.status(400).send({ message: 'Invalid input' });
        }
        if (/^\$/.test(vehicleRegister)) {
            return res.status(400).send({ message: 'Invalid vehicleRegister' });
        }
        const vehicle = await Vehicles.findOne({ vehicleRegister: vehicleRegister.trim() });

        if (!vehicle) {
            return res.status(400).send({ message: "Invalid category or vehicle register provided." });
        }
        const existingServiceByLastMileage = await vehicle_service.findOne({
            vehicleRegister: vehicle._id,
            lastmilage: lastmilage
        });

        if (existingServiceByLastMileage) {
            return res.status(400).send({ message: "Service with the same last mileage already exists for this vehicle." });
        }

        // Check if a service with the same service date already exists
        // const existingServiceByServiceDate = await vehicle_service.findOne({
        //     vehicleRegister: vehicle._id,
        //     servicedate: req.body.servicedate
        // });

        // if (existingServiceByServiceDate) {
        //     return res.status(400).send({ message: "Service with the same service date already exists for this vehicle." });
        // }

        // Create a new service
        const newService = await vehicle_service.create({
            vehicleRegister: vehicle._id,
            servicedate: servicedate,
            lastmilage: lastmilage,
            kilometerLimit: kilometerLimit,
            Snote: Snote,
            Scost: Scost,
        });

        console.log("SErvice done")
       
        const expenseService =  await new Expense({
            date: servicedate,
            vehicle: vehicle._id,
            recordedBy:"Shenal",
            category:'Maintenance and Repairs',
            status:'Pending',
            maintenanceDescription: Snote,
            serviceProvider:"VMS-Service",
            invoiceNumber:'0',
            maintenanceCost: Scost
        });
        console.log(expenseService)
        await expenseService.save(expenseService);

        return res.status(201).send(newService);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};



//Get all Services 
const getallservices = async (req, res) => {
    try {
        const Services = await vehicle_service.find();
        return res.status(201).json(Services);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};

const getservicesbytype = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' });
        }
        const Services = await vehicle_service.find({ vehicleRegister: id }).populate("vehicleRegister");

        console.log(Services)
        return res.status(201).json(Services);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};

module.exports = { addservice, getallservices, getservicesbytype }