import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();
import Registration from "../models/user.model.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "../utils/emailTemplates.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls:{
      rejectUnauthorized: false,
    }
});


export const sendOtp=async(email,otp)=>{
  let mailOptions = {
    from: process.env.EMAIL_USER,  // Sender's email
    to: email,                 // Recipient's email
    subject: 'OTP Verification Code',  // Subject line
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",otp),
};
  try {
    let info = await transporter.sendMail(mailOptions);
        
    return info; 
  } catch (error) {
    console.error(`Error: ${error}`);
    return { success: false, message: "Failed to send email" }; 
  }
}

export const sendWelcomeEmail=async(email,name,ticketId,whatsappNumber,department,year,rollNo)=>{
  try {
    const html = WELCOME_EMAIL_TEMPLATE
      .replace(/\$\{name\}/g, name || "there")
      .replace(/\{platformUrl\}/g, process.env.PLATFORM_URL || process.env.FRONTEND_URL || "/");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to TEDxNERIST",
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
    
} catch (error) {
    console.error(`Error: ${error}`);
    return { success: false, message: "Failed to send email" }; 
  }
}

export const sendEmail = async (email, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: htmlContent,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};
