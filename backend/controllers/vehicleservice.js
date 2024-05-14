const vehicle_service = require('../models/vehicle_service')
const { Vehicles } = require('../models/vehicleModel')
const Expense =require('../models/expenseModel')

const addservice = async (req, res) => {
    try {
        const vehicle = await Vehicles.findOne({ vehicleRegister: req.body.vehicleRegister });

        if (!vehicle) {
            return res.status(400).send({ message: "Invalid category or vehicle register provided." });
        }
        const existingServiceByLastMileage = await vehicle_service.findOne({
            vehicleRegister: vehicle._id,
            lastmilage: req.body.lastmilage
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
            servicedate: req.body.servicedate,
            lastmilage: req.body.lastmilage,
            kilometerLimit: req.body.kilometerLimit,
            Snote: req.body.Snote,
            Scost: req.body.Scost,
        });

        console.log("SErvice done")
       
        const expenseService =  await new Expense({
            date:req.body.servicedate,
            vehicle:vehicle._id,
            recordedBy:"Shenal",
            category:'Maintenance and Repairs',
            status:'Approved',
            maintenanceDescription:req.body.Snote,
            serviceProvider:"VMS-Service",
            invoiceNumber:'0',
            maintenanceCost:req.body.Scost
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
        const Services = await vehicle_service.find({ vehicleRegister: id }).populate("vehicleRegister");

        console.log(Services)
        return res.status(201).json(Services);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};

module.exports = { addservice, getallservices, getservicesbytype }