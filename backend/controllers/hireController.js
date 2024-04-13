const Hire = require("../models/hireModel");
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

//Fetch all the hires
const fetchHires = async (req, res) => {
  try {
    Hire.find()
        .populate('vehicle')
        .populate('driver')
        .then(hires => res.json(hires))
  } catch (error) {
    console.error('Error fetching hire:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Add new hire
const addHire = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      vehicleType,
      vehicleSubcategory,
      passengerCount,
      airCondition,
      vehicle,
      driver,
      startPointNo,
      startPointStreet,
      startPointCity,
      endPoint,
      startTime,
      tripType,
      distance,
      cusName,
      cusEmail,
      cusMobile,
      cusNic,
      estimatedTotal,
      finalTotal,
      advancedPayment,
      hireStatus
    } = req.body.data;

    const newHire = new Hire({
      startDate,
      endDate,
      vehicleType,
      vehicleSubcategory,
      passengerCount,
      airCondition,
      vehicle,
      driver,
      startPoint : {
        no: startPointNo,
        street: startPointStreet,
        city: startPointCity
      },
      endPoint,
      startTime,
      tripType,
      distance,
      cusName,
      cusEmail,
      cusMobile,
      cusNic,
      estimatedTotal,
      finalTotal,
      advancedPayment,
      hireStatus
    });

    await newHire.save();
    /*sendmail(transporter, {
      startDate,
      endDate,
      airCondition,
      vehicle,
      driver,
      startPoint,
      endPoint,
      distence,
      cusName,
      cusEmail,
      cusMobile,
      cusNic,
      estimatedTotal,
      advancedPayment
    });*/

    res.status(201).json({ message: 'Hire added successfully' });
  } catch (error) {
    console.error('Error adding hire:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Edit Hire
const editHire = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, vehicleType, vehicleSubcategory, passengerCount, airCondition, vehicle, driver, startPoint, endPoint, tripType, distance, cusName, cusEmail, cusMobile, cusNic, estimatedTotal, finalTotal, advancedPayment, hireStatus } = req.body.data;
  try {
    const hire = await Hire.findByIdAndUpdate(id, { startDate, endDate, vehicleType, vehicleSubcategory, passengerCount, airCondition, vehicle, driver, startPoint, endPoint, tripType, distance, cusName, cusEmail, cusMobile, cusNic, estimatedTotal, finalTotal, advancedPayment, hireStatus }, { new: true });
    if (!hire) {
      return res.status(404).json({ message: 'Hire not found' });
    }
    res.json({ message: 'Hire updated successfully', hire });
  } catch (error) {
    console.error('Error updating hire:', error);
    res.status(500).json({ message: 'Error updating hire', error: error.message });
  }
};

//Delete Hire
const deleteHire = async (req, res) => {
  try {
    const hireId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(hireId)) {
      return res.status(400).json({ message: 'Invalid hire ID' });
    }
    const hire = await Hire.findByIdAndDelete(hireId);
    if (!hire) {
      return res.status(404).json({ message: 'Hire not found' });
    }
    res.json({ message: 'Hire deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hire', error: error.message });
  }
};

//Confirmation Email
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false 
  },
  auth: {
    user: 'j.chamod914@gmail.com',
    pass: 'mrebuhdxrmxwrgfp',
  },
});

const sendmail = async (transporter, hireData) => {
  const mailOptions = {
    from: '"j.chmaod914@gmail.com', // sender address
    to: hireData.cusEmail, // receivers
    subject: "Hire Confirmation eka hutto", // Subject line
    html: `
      <h1>Thank You for Choosing Us!</h1>
      <h4>Dear ${hireData.cusName},</h4>
      <p>We are thrilled to confirm your booking with us. Your trust in our services means a lot to us.</p>
      <p>Below are the details of your booking:</p>
      <p>Start Date: ${hireData.startDate}</p>
      <p>End Date: ${hireData.endDate}</p>
      <p>Air Condition: ${hireData.airCondition ? 'Yes' : 'No'}</p>
      <p>Vehicle: ${hireData.vehicle.vehicleRegister}</p>
      <p>Driver: ${hireData.driver}</p>
      <p>Start Point: ${hireData.startPoint}</p>
      <p>End Point: ${hireData.endPoint}</p>
      <p>Distance: ${hireData.distence}</p>
      <p>Customer Name: ${hireData.cusName}</p>
      <p>Customer Email: ${hireData.cusEmail}</p>
      <p>Customer Mobile: ${hireData.cusMobile}</p>
      <p>Customer NIC: ${hireData.cusNic}</p>
      <p>Estimated Total: ${hireData.estimatedTotal}</p>
      <p>Advanced Payment: ${hireData.advancedPayment}</p>
      <p>Safe journey and we look forward to serving you!</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email Sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addHire, fetchHires, editHire, deleteHire };
