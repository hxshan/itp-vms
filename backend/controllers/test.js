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

const mailOptions = {
  from: '"j.chmaod914@gmail.com', // sender address
  to: "chamod914@gmail.com", // receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

const sendmail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email Sent");
  } catch (error) {
    console.log(error);
  }
};

sendmail(transporter, mailOptions);
