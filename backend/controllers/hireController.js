const Hire = require("../models/hireModel");
const { Vehicles } = require("../models/vehicleModel");
const Availability = require("../models/vehicleAvailability");

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

//Fetch all vehicles
const fetchVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicles.find({ statusVehicle: 'Active' }).populate('availability');
    //console.log(vehicles)
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
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
      vehicleNo,
      driverName
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
    });

    
    await newHire.save();

    const newAvailability = new Availability({
      vehicle: vehicle,
      status: 'Hire',
      unavailableStartDate: startDate,
      unavailableEndDate: endDate
    });

    await newAvailability.save();

    await Vehicles.findByIdAndUpdate(vehicle, { $push: { availability: newAvailability._id } });
    
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
      advancedPayment,
      vehicleNo,
      driverName
    });

    res.status(201).json({ message: 'Hire added successfully' });
  } catch (error) {
    console.error('Error adding hire:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Delete hire automatically
const cron = require('node-cron');

const deletePendingHires = async () => {
  try {
    console.log("Running Auto")
    const dateCount = new Date();
    dateCount.setDate(dateCount.getDate() - 1);

    const pendingHires = await Hire.find({
      hireStatus: 'Pending',
      createdAt: { $lte: dateCount },
    });

    if (pendingHires.length > 0) {
      for (const hire of pendingHires) {
        await Hire.findByIdAndUpdate(hire._id, { hireStatus: 'Cancelled' });
        console.log(`Updated hire status to cancelled for ID: ${hire._id}`);
      }
    }
  } catch (error) {
    console.error('Error updating pending hires to cancelled:', error);
  }
};


cron.schedule('0 23 * * *', deletePendingHires, {
  timezone: 'Asia/Colombo',
});


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

/*
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
};*/

const deleteHire = async (req, res) => {
  try {
    const hireId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(hireId)) {
      return res.status(400).json({ message: 'Invalid hire ID' });
    }

    const hire = await Hire.findById(hireId);
    if (!hire) {
      return res.status(404).json({ message: 'Hire not found' });
    }

    // Get the vehicle and startDate from the hire document
    const { vehicle, startDate } = hire;

    // Find and update the corresponding availability document
    const updatedAvailability = await Availability.findOneAndUpdate(
      {
        vehicle,
        unavailableStartDate: startDate,
      },
      
    );

    if (updatedAvailability) {
      // Update the availability array in the Vehicles collection
      await Vehicles.updateOne(
        { _id: vehicle },
        { $set: { 'availability.$[elem]': updatedAvailability } },
        { arrayFilters: [{ 'elem._id': updatedAvailability._id }] }
      );
      await Hire.findByIdAndUpdate(hire._id, { hireStatus: 'Cancelled' })
    }

    res.json({ message: 'Hire status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hire status', error: error.message });
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

  // Add header
  //const logoPath = 'path/to/your/logo.png';
  const companyName = 'Your Company Name';

  // Add header
  //pdfDoc.image(logoPath, 50, 25, { width: 50 });
  pdfDoc.fontSize(16).text(companyName, { align: 'center' });
  pdfDoc.moveTo(50, 90)
    .lineTo(550, 90)
    .stroke();
  pdfDoc.moveDown();

  // Add content to PDF
  pdfDoc.fontSize(20).text('Hire Confirmation', { align: 'center' , lineGap: 15 });

  // Greeting and Introductory Message
  pdfDoc.fontSize(16).text(`Dear ${hireData.cusName},`, { lineGap: 10 });
  pdfDoc.fontSize(12).text('Thank you for choosing our services. We appreciate your trust in us.', { lineGap: 15 });

  // Booking Details
  pdfDoc.fontSize(12).text(`Start Date: ${hireData.startDate}`, { lineGap: 10 });
  pdfDoc.fontSize(12).text(`End Date: ${hireData.endDate}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Air Condition: ${hireData.airCondition ? 'Yes' : 'No'}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Vehicle: ${hireData.vehicleNo}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Driver: ${hireData.driverName}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Start Point: ${hireData.startPoint.no} ${hireData.startPoint.street} ${hireData.startPoint.city}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`End Point: ${hireData.endPoint}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Estimated Distance: ${hireData.estimatedDistance}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Estimated Total: ${hireData.estimatedTotal}`, { lineGap: 5 });
  pdfDoc.fontSize(12).text(`Advanced Payment: ${hireData.advancedPayment}`, { lineGap: 25 });

  pdfDoc.fontSize(12).text('We kindly request you to pay the advanced payment within 3 days to secure your booking. If not, unfortunately, the booking will be canceled.', { lineGap: 5 });

  pdfDoc.fontSize(12).text('We wish you a safe and pleasant journey.', { lineGap: 15 });

  pdfDoc.fontSize(12).text('For any queries or assistance, please contact us at:', { lineGap: 10 });
  pdfDoc.fontSize(12).text('Email: hiremanahement1@gmail.com', { lineGap: 5 });
  pdfDoc.fontSize(12).text('Phone: 78 555 9658', { lineGap: 5 });


  // End the PDF creation
  pdfDoc.end();

};

  // Generate Report 
  const generateCombinedReport = async (req, res) => {
  try {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    const allHires = await Hire.find()

     // Filter hires to only include hires with the same month and year as today
    const filteredHires = allHires.filter(hire => {
      const hireMonth = hire.createdAt.getMonth() + 1;  // getMonth() returns 0-indexed month
      const hireYear = hire.createdAt.getFullYear();
      
      return hireMonth === todayMonth && hireYear === todayYear;
    });

     // Count hires with each status
     const activeCount = filteredHires.filter(hire => hire.hireStatus === 'Active').length;
     const pendingCount = filteredHires.filter(hire => hire.hireStatus === 'Pending').length;
     const canceledCount = filteredHires.filter(hire => hire.hireStatus === 'Cancelled').length;
     const completedCount = filteredHires.filter(hire => hire.hireStatus === 'Completed').length;

      const totalHires = filteredHires.length;
      const totalRevenue = filteredHires.reduce((acc, hire) => acc + hire.finalTotal, 0);
      const averageDistance = filteredHires.reduce((acc, hire) => acc + hire.actualDistance, 0) / totalHires;
      const averageTimeTaken = filteredHires.reduce((acc, hire) => acc + parseFloat(hire.actualTimeTaken), 0) / totalHires;
      const totalAdvancedPayments = filteredHires.reduce((acc, hire) => acc + hire.advancedPayment, 0);
      const averageAdvancedPayment = totalAdvancedPayments / totalHires;

      // Fetch unique customers
      const uniqueCustomers = [...new Set(filteredHires.map(hire => hire.cusEmail))];

      // Customer Metrics
      const totalCustomers = uniqueCustomers.length;

      // Calculate metrics for top spending customers
      const topCustomers = uniqueCustomers.slice(0, 5); // Assuming top 5 customers
      const topCustomersHires = filteredHires.filter(hire => topCustomers.includes(hire.cusEmail));
      const totalRevenueTopCustomers = topCustomersHires.reduce((acc, hire) => acc + hire.finalTotal, 0);
      const averageDistanceTopCustomers = topCustomersHires.reduce((acc, hire) => acc + hire.actualDistance, 0) / topCustomersHires.length;
      const averageTimeTakenTopCustomers = topCustomersHires.reduce((acc, hire) => acc + parseFloat(hire.actualTimeTaken), 0) / topCustomersHires.length;
      const averageSpendingPerHireTopCustomers = totalRevenueTopCustomers / topCustomersHires.length;

      // Combined Metrics
      const percentageRevenueTopCustomers = (totalRevenueTopCustomers / totalRevenue) * 100;

      // Generate Report
      const report = {
        hireCounts: {
          totalHires,
          active: activeCount,
          pending: pendingCount,
          canceled: canceledCount,
          completed: completedCount
        },

          businessPerformance: {
              totalRevenue,
              averageDistance,
              averageTimeTaken,
              totalAdvancedPayments,
              averageAdvancedPayment
          },
          customerMetrics: {
              totalCustomers,
              topCustomers: topCustomers.length ? topCustomers : 'No top customers found',
              totalRevenueTopCustomers,
              averageDistanceTopCustomers,
              averageTimeTakenTopCustomers,
              averageSpendingPerHireTopCustomers
          },
          combinedMetrics: {
              percentageRevenueTopCustomers
          }
      };

      //console.log(report);

      res.status(200).json(report);
      return report;

  } catch (error) {
      console.error('Error generating combined report:', error);
      res.status(500).json({ message: 'Internal Server Error' });
      throw error;
  }
};



module.exports = { addHire, fetchHires, editHire, deleteHire, generateCombinedReport, fetchVehicles };

