const Hire = require("../models/hireModel");
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const PDFDocument = require('pdfkit');
const fs = require('fs');

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
      estimatedDistance,
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
      estimatedDistance,
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
    /*
    sendmail(transporter, {
      startDate,
      endDate,
      airCondition,
      vehicle,
      driver,
      startPoint : {
        no: startPointNo,
        street: startPointStreet,
        city: startPointCity
      },
      endPoint,
      estimatedDistance,
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
    estimatedDistance,
    cusName,
    cusEmail,
    cusMobile,
    cusNic,
    estimatedTotal,
    finalTotal,
    advancedPayment,
    hireStatus,
  } = req.body.data;
  try {
    const hire = await Hire.findByIdAndUpdate(id, { 
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
      estimatedDistance,
      cusName,
      cusEmail,
      cusMobile,
      cusNic,
      estimatedTotal,
      finalTotal,
      advancedPayment,
      hireStatus,
 }, { new: true });
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
  // Create PDF
  const pdfDoc = new PDFDocument();
  const buffers = [];

  // Listen to 'data' event to collect PDF content into buffers
  pdfDoc.on('data', buffers.push.bind(buffers));
  
  // When PDF creation ends, concatenate buffers into a single buffer
  pdfDoc.on('end', () => {
    const pdfBuffer = Buffer.concat(buffers);

    // Email options with PDF attachment
    const mailOptions = {
      from: '"j.chmaod914@gmail.com',
      to: hireData.cusEmail,
      subject: "Hire Confirmation",
      html: `
        <h1>Thank You for Choosing Us!</h1>
        <h4>Dear ${hireData.cusName},</h4>
        <p>We are thrilled to confirm your booking with us.</p>
        <p>Please find the attached PDF for your booking details.</p>
        <p>Safe journey and we look forward to serving you!</p>
      `,
      attachments: [{
        filename: `${hireData.cusName}_HireConfirmation.pdf`,
        content: pdfBuffer  // Attach the PDF buffer
      }]
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email Sent:', info.response);
      }
    });
  });

  // Add content to PDF
  pdfDoc.fontSize(20).text('Hire Confirmation', { align: 'center' , lineGap: 15 });

  // Greeting and Introductory Message
  pdfDoc.fontSize(16).text(`Dear ${hireData.cusName},`, { lineGap: 10 });
  pdfDoc.fontSize(12).text('Thank you for choosing our services. We appreciate your trust in us.', { lineGap: 15 });

  // Booking Details
  pdfDoc.fontSize(12).text(`Start Date: ${hireData.startDate}`, { lineGap: 10 });
  pdfDoc.fontSize(12).text(`End Date: ${hireData.endDate}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Air Condition: ${hireData.airCondition ? 'Yes' : 'No'}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Vehicle: ${hireData.vehicle.vehicleRegister}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Driver: ${hireData.driver.firstName}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Start Point: ${hireData.startPoint.no} ${hireData.startPoint.street} ${hireData.startPoint.city}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`End Point: ${hireData.endPoint}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Estimated Distance: ${hireData.estimatedDistance}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Estimated Total: ${hireData.estimatedTotal}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Advanced Payment: ${hireData.advancedPayment}`, { lineGap: 25 });

  pdfDoc.fontSize(12).text('We kindly request you to pay the advanced payment within 3 days to secure your booking. If not, unfortunately, the booking will be canceled.', { lineGap: 25 });

  pdfDoc.fontSize(12).text('We wish you a safe and pleasant journey.', { lineGap: 15 });

  pdfDoc.fontSize(12).text('For any queries or assistance, please contact us at:', { lineGap: 10 });
  pdfDoc.fontSize(12).text('Email: hiremanahement1@gmail.com', { lineGap: 5 });
  pdfDoc.fontSize(12).text('Phone: 78 555 9658', { lineGap: 5 });


  // End the PDF creation
  pdfDoc.end();

};

module.exports = { addHire, fetchHires, editHire, deleteHire };

