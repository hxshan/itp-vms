const vehicleMaintain = require ('../models/vehicleMaintananceModel')
const {Vehicles} = require('../models/vehicleModel')


//Add maintain to the system
const createmaintain = async (req, res) => {
    try {
       
        const requiredFields = ['vehicleRegister', 'vrissue', 'vrcost', 'vrsdate', 'vredate', 'availability'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).send({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        const currentDate = new Date();
        
        const vehicle = await Vehicles.findOne({ vehicleRegister: req.body.vehicleRegister });

        if (!vehicle) {
            return res.status(400).send({ message: "Invalid category or vehicle register provided." });
        }

        const maintain = {
           
            vehicleRegister: vehicle._id,
            vrvehicleRegister:req.body.vehicleRegister,
            vrissue: req.body.vrissue,
            vrcost: req.body.vrcost,
            vraddit: req.body.vraddit,
            vrsdate: req.body.vrsdate,
            vredate: req.body.vredate,
            availability: req.body.availability
        };

       
        if (currentDate >= new Date(maintain.vrsdate) && currentDate <= new Date(maintain.vredate)) {
            maintain.availability = 'unavailable';
        } else {
            maintain.availability = 'available';
        }

       
        const newMaintain = await vehicleMaintain.create(maintain);
        
        return res.status(201).send(newMaintain);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

//Get all maintains 
const getallmaintains = async(req , res)=>{
    try{
        const maintains = await vehicleMaintain.find({});
        return res.status(201).json(maintains);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
};

//get OneMaintain
const getonemaintain = async(req, res)=>{
    try {
        const { id } = req.params;

        // Find the maintenance record by its _id
        const maintain = await vehicleMaintain.findById(id);

        // If no maintenance record found, return a message
        if (!maintain) {
            return res.status(404).json({ message: 'Maintenance record not found.' });
        }

        // Extract vehicleRegister from the found maintenance record
        const vehicleRegisterId = maintain.vehicleRegister;

        // Find all maintenance records associated with the vehicleRegister
        const maintains = await vehicleMaintain.find({ vehicleRegister: vehicleRegisterId });

        // Handle cases where no matching records are found
        if (!maintains.length) {
            return res.status(200).json({ message: 'No maintenance records found for this vehicle.' });
        }

        res.status(200).json(maintains); // Return all matching maintenance records
    } catch (error) {
        console.error('Error fetching maintenance records:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

//Edit Maintain
const editmaintain = async (req, res)=>{
    try {
        if (
            !req.body.vehicleRegister||
            !req.body.vrissue||
            !req.body.vrcost||
            !req.body.vraddit||
            !req.body.vredate

        ) {
            return res.status(400).send({ message: 'Send All required Filds' });
        }
        const { id } = req.params;

        const result = await vehicleMaintain.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Not found the Maintain' });

        }
        return res.status(200).send(result)
        
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

//delete Maintain
const deletemaintain = async (req , res) =>{
    try {

        const { id } = req.params;

        const result = await vehicleMaintain.findByIdAndDelete(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'NOt found the Maintain' });

        }
        return res.status(200).send("Deleted Maintain");

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

const driverMaintenanceRequest = async (req, res) => {
    console.log('came in to driver')
    try {
        // Check if all required fields are provided in the request body
        const requiredFields = ['vrvehicleRegister', 'vrissue'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).send({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Find the vehicle based on the provided vehicleRegisterNumber
        const vehicle = await Vehicles.findOne({ vehicleRegister: req.body.vrvehicleRegister});

        if (!vehicle) {
            return res.status(400).send({ message: "Invalid vehicle register number provided." });
        }

        // Create the maintenance request object
        const maintenanceRequest = {
            vehicleRegister: vehicle._id,
            vrvehicleRegister: req.body.vrvehicleRegister,
            vrissue: req.body.vrissue,
            vrsdate: new Date(), // Set the start date of maintenance request to current date
            availability: 'unavailable' // Set availability to 'unavailable' by default
        };

        // Create a new maintenance request record
        const newMaintenanceRequest = await vehicleMaintain.create(maintenanceRequest);

        return res.status(201).send(newMaintenanceRequest);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = {createmaintain, getallmaintains, getonemaintain , editmaintain , deletemaintain, driverMaintenanceRequest}