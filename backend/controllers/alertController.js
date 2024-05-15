const Alert = require('../models/alertModel')

const sendAlert = async (req , res) => {
    try {

      console.log("insitekfjdfgkjnfgkjdfg")
        const {
            driver,
            vehicle,
            hire,
            caseFile
        } = req.body.data;

        const newAlert = new Alert ({
            driver,
            vehicle,
            hire,
            caseFile
        })
        console.log(newAlert)

        
        await newAlert.save()

        res.status(201).json({ message: 'Alert Sent' });
    } catch (error) {
        console.error('Error sending alert:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const getAlertHire = async (req, res) => {
    try {
      const alerts = await Alert.find({ hireStatus: 'Pending' })
        .populate('driver')
        .populate('vehicle')
        .populate('hire')
        .exec();
  
      res.json(alerts);
    } catch (error) {
      console.error('Error fetching Alerts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  const getAlertCaseFileById = async (req, res) => {
  const caseFileId = req.params.id; // Retrieve the caseFile ID from the URL parameters
  console.log("CaseFile ID:", caseFileId);
  
  try {
    // Search for alerts that have the specified caseFile ID
    const alerts = await Alert.find({ caseFile: caseFileId })
      .populate('driver')
      .populate('vehicle')
      .populate('hire')
      .exec();

      console.log("Fetched Alerts:", alerts);
    // Respond with the found alerts
    return res.status(200).json(alerts);
  } catch (error) {
    console.error('Error fetching Alerts:', error);
    // Respond with an error message if something goes wrong
    res.status(500).json({ message: 'Internal server error' });
  }
}



  const updateHireStatus = async (req, res) => {
    const alertId = req.params.id; // Assuming you're passing the alert ID in the request parameters
  
    try {
      // Find the alert document by ID and update the hireStatus to "Completed"
      const updatedAlert = await Alert.findByIdAndUpdate(
        alertId,
        { hireStatus: 'Completed' },
        { new: true }
      );
  
      if (!updatedAlert) {
        return res.status(404).json({ error: 'Alert not found' });
      }
  
      res.status(200).json(updatedAlert);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

module.exports = {sendAlert, getAlertHire, updateHireStatus, getAlertCaseFileById}