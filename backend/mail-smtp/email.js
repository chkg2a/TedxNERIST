import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "../utils/emailTemplates.js";
import dotenv from "dotenv";
dotenv.config();




let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,  
    },
    tls: {
        rejectUnauthorized: false 
    }
});

export const sendOtp=async(userEmail,otp)=>{
    
    let mailOptions = {
        from: process.env.EMAIL_USER,  // Sender's email
        to: userEmail,                 // Recipient's email
        subject: 'OTP Verification Code',  // Subject line
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",otp),
    };
    try {
        let info = await transporter.sendMail(mailOptions);
        
        return info; 
    } catch (error) {
        console.error(`Error: ${error}`);
        throw error;  
    }
}



export const sendWelcomeEmail=async(email,name)=>{
    console.log("route hitted")
    const reciepient=[{email}];
    const data=reciepient[0].email;
    console.log(reciepient);
    let mailOptions = {
        from: process.env.EMAIL_USER,  // Sender's email
        to: data,                 // Recipient's email
        subject: 'Weclome email',  // Subject line
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TEDxNERIST</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  
  <!-- Main Container -->
  <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header with TEDx Branding -->
    <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 50px 30px; text-align: center; position: relative;">
      <div style="display: inline-block; background-color: #EB0028; padding: 10px 24px; border-radius: 4px; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 1px;">TED<span style="font-size: 28px;">x</span>NERIST</h1>
      </div>
      <p style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 0.5px;">Welcome to Our Community</p>
      <div style="width: 80px; height: 3px; background-color: #EB0028; margin: 20px auto 0 auto; border-radius: 2px;"></div>
    </div>
    
    <!-- Content Section -->
    <div style="padding: 40px 35px; background-color: #ffffff;">
      
      <p style="color: #333; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">Hi ${name},</p>
      
      <p style="color: #666; font-size: 15px; margin: 0 0 20px 0; line-height: 1.7;">
        We're thrilled to welcome you to <strong>TEDxNERIST</strong> – a platform dedicated to spreading <strong>ideas worth spreading</strong> within our vibrant campus community!
      </p>
      
      <!-- Feature Highlights -->
      <div style="background: linear-gradient(to right, #f9f9f9, #ffffff); border-left: 4px solid #EB0028; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #000; font-size: 16px; margin: 0 0 15px 0; font-weight: 700;">What Awaits You:</h3>
        <ul style="color: #666; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.9;">
          <li><strong>Inspiring Talks:</strong> Access to thought-provoking presentations and speaker events</li>
          <li><strong>Engage & Connect:</strong> Network with innovators, thinkers, and changemakers at NERIST</li>
          <li><strong>Exclusive Updates:</strong> Stay informed about upcoming TEDx events and opportunities</li>
          <li><strong>Community Impact:</strong> Be part of a movement that celebrates ideas and innovation</li>
        </ul>
      </div>
      
      <!-- Call to Action -->
      <div style="text-align: center; margin: 35px 0;">
        <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">Ready to dive into the world of ideas?</p>
        <a href="{platformUrl}" style="display: inline-block; background-color: #EB0028; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 16px; transition: background-color 0.3s;">Explore TEDxNERIST</a>
      </div>
      
      <!-- Support Section -->
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 30px 0 25px 0;">
        <p style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">Have Questions?</p>
        <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.6;">
          We're here to help! Whether you want to attend an event, become a speaker, or get involved, feel free to <a href="mailto:neriststore@gmail.com" style="color: #EB0028; text-decoration: none; font-weight: 600;">reach out to us</a>.
        </p>
      </div>
      
      <!-- Quote Section -->
      <div style="border-left: 3px solid #EB0028; padding-left: 20px; margin: 30px 0;">
        <p style="color: #666; font-size: 14px; font-style: italic; margin: 0; line-height: 1.6;">
          "Ideas are the currency of the twenty-first century. Some people are really good at it, some people aren't."
        </p>
        <p style="color: #999; font-size: 12px; margin: 8px 0 0 0;">— Robert Metcalfe</p>
      </div>
      
      <p style="color: #333; font-size: 15px; margin: 25px 0 5px 0;">Welcome to the community of idea-spreaders!</p>
      <p style="color: #333; font-size: 15px; margin: 0;">
        Best regards,<br>
        <strong>The TEDxNERIST Team</strong>
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="background-color: #000000; padding: 30px; text-align: center;">
      <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Ideas Worth Spreading</p>
      <p style="color: #999; font-size: 12px; margin: 0 0 15px 0;">
        Join us in celebrating innovation, creativity, and meaningful conversations
      </p>
      <p style="color: #666; font-size: 11px; margin: 0;">
        © 2025 TEDxNERIST. This independent TEDx event is operated under license from TED.<br>
        All rights reserved.
      </p>
    </div>
    
  </div>
  
  <!-- Disclaimer -->
  <div style="text-align: center; margin-top: 20px; padding: 10px;">
    <p style="color: #888; font-size: 12px; margin: 0; line-height: 1.6;">
      You're receiving this email because you joined TEDxNERIST.<br>
      This is an automated message, please do not reply to this email.
    </p>
  </div>
  
</body>
</html>
`,  // HTML content (can be a template)
    };
    try {
        // Send email with defined transport object, now using async/await
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;  // Optionally return the info if needed
    } catch (error) {
        console.error(`Error: ${error}`);
        throw error;  // Optionally rethrow the error to handle it outside
    }
}
