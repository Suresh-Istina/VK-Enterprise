import Customer from "../models/Customer.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Initialize nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send notification when booking is created
export function bookingSuccessNotification(
  customerId,
  slotId,
  time,
  vehicleNo,
  bookingId
) {
  // Fetch customer's contact information from the database
  Customer.findByPk(customerId)
    .then((customer) => {
      if (customer) {
        const contactInfo = {
          email: customer.email,
          name: customer.name,
        };

        // Send notification using nodemailer
        const mailOptions = {
          from: "greenwebsdp@gmail.com",
          to: contactInfo.email,
          subject: "Booking Confirmation",
          text: `Dear ${contactInfo.name},\n\nYour booking has been confirmed and the details are as mentioned below.
          \n\nBooking Number : ${bookingId}
          \nSlot ID :  ${slotId} \nTruck Number :  ${vehicleNo} \nReserved Time :  ${time}
          \n\nWe kindly remind you that your booking will be automatically cancelled if you do not Check In within 15 minutes of the booked time. This policy is in place to ensure fair allocation of resources for all customers. We appreciate your understanding and cooperation. If you anticipate any delays, please feel free to contact us. Thank you for choosing our services. 
          \n\n Best Regards,\n\n VK Enterprise \n 0112436891/0777323796`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching customer information:", err);
    });
}

// Function to send notification when booking is cancelled
export async function bookingCancelledNotification(
  customerId,
  slotId,
  time,
  vehicleNo,
  bookingId
) {
  // Fetch customer's contact information from the database
  Customer.findByPk(customerId)
    .then((customer) => {
      if (customer) {
        const contactInfo = {
          email: customer.email,
          name: customer.name,
        };

        // Send notification using nodemailer
        const mailOptions = {
          from: "greenwebsdp@gmail.com",
          to: contactInfo.email,
          subject: "Booking Cancellation",
          text: `Dear ${contactInfo.name},
          \n\nBooking Number : ${bookingId}
          \nSlot ID :  ${slotId} \nTruck Number :  ${vehicleNo} \nReserved Time :  ${time}
          \n\nWe hope this email finds you well. We regret to inform you that your booking with us has been cancelled as you did not check in on time. We understand that circumstances may arise, and we're here to assist you with any further details or assistance you may need. Please feel free to contact us at 0112436891 for any queries. We apologize for any inconvenience this may have caused. \n\nThank you for choosing our services, and we look forward to serving you in the future.
           
          \n\n Best Regards,\n\n VK Enterprise \n 0112436891/0777323796 `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching customer information:", err);
    });
}

// Function to send ebill
export async function checkOutNotification(
  customerId,
  slotId,
  time,
  actualTimeIn,
  actualTimeOut,
  vehicleNo,
  bookingId,
  amount,
  employeeId,
  name,
  paymentDate,
  paymentId,
  days,
  remainingHours,
  perDay,
  perHour
) {
  // Fetch customer's contact information from the database
  Customer.findByPk(customerId)
    .then((customer) => {
      if (customer) {
        const contactInfo = {
          email: customer.email,
          name: customer.name,
        };
        const dateOnly = new Date(
          paymentDate.getFullYear(),
          paymentDate.getMonth(),
          paymentDate.getDate()
        );

        // Formatting the date to display as "dd/mm/yyyy"
        const day = String(dateOnly.getDate()).padStart(2, "0");
        const month = String(dateOnly.getMonth() + 1).padStart(2, "0"); // Month is zero-based
        const year = dateOnly.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        // Send notification using nodemailer
        const mailOptions = {
          from: "greenwebsdp@gmail.com",
          to: contactInfo.email,
          subject: "E-Bill",
          text: `Dear ${contactInfo.name},\n\nPlease find your E-Bill below.
          \nBooking Number : ${bookingId} \tInvoice Number :  ${paymentId} \nInvoice Date :  ${formattedDate} \nInvoiced By :  ${name}  \t  ID : ${employeeId}
          \nSlot ID :  ${slotId} \nTruck Number :  ${vehicleNo} \nActual Time In :  ${actualTimeIn}
          \nReserved Time :  ${time}  \nActual Time Out :  ${actualTimeOut} 
          
          Daily Rate : ${days} x ${perDay} 
          Hourly Rate : ${remainingHours}  x ${perHour}
          ----------------------------------------------
          Total Payable : Rs.${amount}
          ----------------------------------------------

          \nThank you for choosing our services !
          \nBest Regards,\n\n VK Enterprise \n 0112436891/0777323796 `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            throw error;
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching customer information:", err);
    });
}

// Function to send notification when booking is created
export function checkedInNotification(
  customerId,
  slotId,
  time,
  vehicleNo,
  bookingId,
  actualTimeIn
) {
  // Fetch customer's contact information from the database
  Customer.findByPk(customerId)
    .then((customer) => {
      if (customer) {
        const contactInfo = {
          email: customer.email,
          name: customer.name,
        };

        // Send notification using nodemailer
        const mailOptions = {
          from: "greenwebsdp@gmail.com",
          to: contactInfo.email,
          subject: "Checked In Confirmation",
          text: `Dear ${contactInfo.name},\n\nWe're pleased to confirm that you've successfully checked in and your parking spot is reserved. If you require any assistance during your stay, whether it's directions to your designated spot or any additional services, our team is here to help. The details are as mentioned below.
          \n\nBooking Number : ${bookingId}
          \nSlot ID :  ${slotId} \nTruck Number :  ${vehicleNo} \nReserved Time :  ${time} \nChecked In Time :  ${actualTimeIn}
          \n\n Best Regards,\n\n VK Enterprise \n 0112436891/0777323796`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching customer information:", err);
    });
}
